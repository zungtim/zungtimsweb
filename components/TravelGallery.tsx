import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Camera, MapPin, RotateCcw, X, ZoomIn, ZoomOut } from 'lucide-react';
import { ImageLoader } from './ImageLoader';
import { getMediaEntry, getMediaImages, resolveMediaImage } from '../content/media';
import { useDialog } from '../hooks/useDialog';
import type { TravelContentEntry } from '../types/content';

export const TravelGallery: React.FC<{ trip: TravelContentEntry; onClose: () => void }> = ({ trip, onClose }) => {
  const media = getMediaEntry(trip.media);
  const images = useMemo(() => getMediaImages(media), [media]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const gridButtons = useRef<Array<HTMLButtonElement | null>>([]);
  const stripButtons = useRef<Array<HTMLButtonElement | null>>([]);
  const gridPosition = useRef(0);
  const lastGridIndex = useRef<number | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const isViewer = selectedIndex !== null;
  const activeImage = selectedIndex !== null ? resolveMediaImage(images[selectedIndex], 'lg') : undefined;
  const cover = resolveMediaImage(media?.cover, 'md');

  const returnToGrid = () => {
    setSelectedIndex(null);
    setZoom(1);
  };
  const dialogRef = useDialog(true, () => isViewer ? returnToGrid() : onClose());

  const openPhoto = (index: number) => {
    gridPosition.current = gridRef.current?.scrollTop ?? 0;
    lastGridIndex.current = index;
    setZoom(1);
    setSelectedIndex(index);
  };

  const movePhoto = (delta: number) => {
    setZoom(1);
    setSelectedIndex((index) => index === null ? null : Math.max(0, Math.min(images.length - 1, index + delta)));
  };

  useEffect(() => {
    if (!isViewer) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        setZoom(1);
        setSelectedIndex((index) => index === null ? null : Math.max(0, Math.min(images.length - 1, index + (event.key === 'ArrowRight' ? 1 : -1))));
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isViewer, images.length]);

  useLayoutEffect(() => {
    if (selectedIndex === null) {
      gridRef.current?.scrollTo({ top: gridPosition.current, behavior: 'instant' });
      if (lastGridIndex.current !== null) gridButtons.current[lastGridIndex.current]?.focus({ preventScroll: true });
      return;
    }
    // The grid is unmounted in the viewer; keep focus inside the same dialog.
    if (!dialogRef.current?.contains(document.activeElement)) canvasRef.current?.focus({ preventScroll: true });
    const strip = stripRef.current;
    const thumb = stripButtons.current[selectedIndex];
    if (strip && thumb) strip.scrollTo({ left: thumb.offsetLeft - (strip.clientWidth - thumb.offsetWidth) / 2, behavior: 'instant' });
  }, [selectedIndex, dialogRef]);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) canvas.scrollTo({ left: (canvas.scrollWidth - canvas.clientWidth) / 2, top: (canvas.scrollHeight - canvas.clientHeight) / 2, behavior: 'instant' });
  }, [selectedIndex, zoom]);

  return createPortal(
    <div className="ui-gallery-overlay travel-gallery-overlay">
      <button type="button" tabIndex={-1} className="dialog-backdrop" onClick={onClose} aria-label="Close travel gallery overlay" />
      <div
        ref={dialogRef}
        className={`travel-dialog ${isViewer ? 'travel-dialog-viewer' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={`${trip.title} travel gallery`}
        tabIndex={-1}
      >
        <header className="travel-dialog-header">
          {isViewer && <button type="button" className="ui-focus-ring icon-button" onClick={returnToGrid} aria-label="返回图集" title="返回图集"><ArrowLeft size={18} /></button>}
          <div className="travel-dialog-title"><span className="eyebrow">{isViewer ? 'Photo viewer' : 'Travel archive'}</span><h2>{trip.title}</h2></div>
          <span className="photo-counter" aria-live="polite">{selectedIndex !== null ? `${selectedIndex + 1} / ${images.length}` : `${images.length} 张照片`}</span>
          <button type="button" data-dialog-close onClick={onClose} className="ui-focus-ring icon-button" aria-label="Close travel gallery" title="关闭图集"><X size={20} /></button>
        </header>

        {isViewer && activeImage ? (
          <>
            <div className="viewer-toolbar">
              <button type="button" className="ui-focus-ring icon-button" onClick={() => setZoom((value) => Math.max(1, value - 0.5))} disabled={zoom === 1} aria-label="缩小照片" title="缩小"><ZoomOut size={18} /></button>
              <output className="zoom-value">{Math.round(zoom * 100)}%</output>
              <button type="button" className="ui-focus-ring icon-button" onClick={() => setZoom((value) => Math.min(3, value + 0.5))} disabled={zoom === 3} aria-label="放大照片" title="放大"><ZoomIn size={18} /></button>
              <button type="button" className="ui-focus-ring icon-button" onClick={() => setZoom(1)} disabled={zoom === 1} aria-label="重置缩放" title="重置缩放"><RotateCcw size={16} /></button>
            </div>
            <div className="viewer-body">
              <button type="button" className="ui-focus-ring viewer-arrow" onClick={() => movePhoto(-1)} disabled={selectedIndex === 0} aria-label="上一张照片" title="上一张"><ChevronLeft size={26} /></button>
              <div
                ref={canvasRef}
                className="ui-focus-ring viewer-canvas"
                role="region"
                aria-label="照片预览"
                tabIndex={0}
                style={{ touchAction: zoom === 1 ? 'pan-y pinch-zoom' : 'auto' }}
                onTouchStart={(event) => {
                  const touch = event.touches[0];
                  touchStart.current = zoom === 1 && event.touches.length === 1 && touch ? { x: touch.clientX, y: touch.clientY } : null;
                }}
                onTouchCancel={() => { touchStart.current = null; }}
                onTouchEnd={(event) => {
                  const start = touchStart.current;
                  const touch = event.changedTouches[0];
                  touchStart.current = null;
                  if (!start || !touch || zoom !== 1) return;
                  const dx = touch.clientX - start.x;
                  const dy = touch.clientY - start.y;
                  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 2) movePhoto(dx < 0 ? 1 : -1);
                }}
              >
                <div className="viewer-image-stage" style={{ width: `${zoom * 100}%`, height: `${zoom * 100}%` }}>
                  <ImageLoader key={images[selectedIndex].id} src={activeImage.src} srcSet={activeImage.srcSet} sizes={`${zoom * 100}vw`} alt={`${trip.title} · 照片 ${selectedIndex + 1}`} priority containerClassName="viewer-image" className="object-contain" />
                </div>
              </div>
              <button type="button" className="ui-focus-ring viewer-arrow" onClick={() => movePhoto(1)} disabled={selectedIndex === images.length - 1} aria-label="下一张照片" title="下一张"><ChevronRight size={26} /></button>
            </div>
            <div ref={stripRef} className="photo-strip" aria-label="照片缩略图">
              {images.map((image, index) => {
                const thumbnail = resolveMediaImage(image, 'sm');
                if (!thumbnail) return null;
                return <button key={image.id} ref={(element) => { stripButtons.current[index] = element; }} type="button" className="ui-focus-ring photo-thumb" aria-label={`查看照片 ${index + 1}`} aria-pressed={selectedIndex === index} onClick={() => { setZoom(1); setSelectedIndex(index); }}><img src={thumbnail.src} alt="" loading="lazy" width="72" height="52" /></button>;
              })}
            </div>
          </>
        ) : (
          <div ref={gridRef} className="travel-gallery-scroll">
            <div className="travel-trip-summary">
              {cover && <ImageLoader src={cover.src} srcSet={cover.srcSet} sizes="(max-width: 640px) 100vw, 320px" alt={trip.location} priority containerClassName="trip-summary-cover" className="object-cover" />}
              <div><p className="record-date">{trip.date}</p><p className="trip-summary-location"><MapPin size={16} />{trip.location}</p><span className="trip-summary-count"><Camera size={15} />{images.length} 张照片</span></div>
            </div>
            <details className="record-details trip-description"><summary className="ui-focus-ring">旅行记录 <ChevronRight size={16} /></summary><div>{trip.description}</div></details>
            {images.length > 0 ? <div className="travel-photo-grid">
              {images.map((image, index) => {
                const photo = resolveMediaImage(image, 'md');
                if (!photo) return null;
                return <button key={image.id} ref={(element) => { gridButtons.current[index] = element; }} type="button" onClick={() => openPhoto(index)} className="ui-focus-ring gallery-photo" aria-label={`打开照片 ${index + 1}`}><ImageLoader src={photo.src} srcSet={photo.srcSet} sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" alt={`${trip.title} · 照片 ${index + 1}`} containerClassName="gallery-photo-image" /><span className="gallery-photo-number">{String(index + 1).padStart(2, '0')}</span><ZoomIn className="gallery-photo-zoom" size={18} /></button>;
              })}
            </div> : <p className="gallery-empty muted">暂无可显示的照片。</p>}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
