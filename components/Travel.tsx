import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Camera, MapPin } from 'lucide-react';
import { TravelGallery } from './TravelGallery';
import { travelEntries } from '../content/travel';
import { getMediaEntry, getMediaImages, resolveMediaImage } from '../content/media';

const trips = travelEntries.map((trip) => {
  const media = getMediaEntry(trip.media);
  return { trip, cover: resolveMediaImage(media?.cover, 'lg'), thumbnail: resolveMediaImage(media?.cover, 'sm'), count: getMediaImages(media).length };
});
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
const MIN_VISIBLE_COVER = 0.65;

export const Travel: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const selectedTrip = travelEntries.find((trip) => trip.id === searchParams.get('trip'));
  const [activeIndex, setActiveIndex] = useState(0);
  const [stageRatio, setStageRatio] = useState<number | null>(null);
  const activeRef = useRef(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const pointerFrame = useRef(0);
  const initialTrip = useRef(selectedTrip?.id);
  const current = trips[activeIndex];
  const coverRatio = current?.cover ? current.cover.width / current.cover.height : 1;
  // Preserve portrait compositions and avoid filling when more than a third would be cropped.
  const containCover = coverRatio < 1 || (stageRatio !== null && Math.min(coverRatio / stageRatio, stageRatio / coverRatio) < MIN_VISIBLE_COVER);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const updateRatio = () => {
      const { width, height } = stage.getBoundingClientRect();
      if (height > 0) setStageRatio(width / height);
    };
    updateRatio();
    const observer = new ResizeObserver(updateRatio);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  const sceneOffset = (index: number) => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return 0;
    const stickyTop = Number.parseFloat(window.getComputedStyle(stage).top) || 0;
    const range = Math.max(1, track.offsetHeight - stage.offsetHeight);
    return track.getBoundingClientRect().top + window.scrollY - stickyTop + range * index / Math.max(1, trips.length - 1);
  };

  const jumpTo = (index: number) => {
    window.scrollTo({
      top: sceneOffset(clamp(index, 0, trips.length - 1)),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  };

  useEffect(() => {
    let frame = 0;
    const updateScene = () => {
      frame = 0;
      const track = trackRef.current;
      const stage = stageRef.current;
      if (!track || !stage) return;
      const stickyTop = Number.parseFloat(window.getComputedStyle(stage).top) || 0;
      const range = Math.max(1, track.offsetHeight - stage.offsetHeight);
      const progress = clamp((stickyTop - track.getBoundingClientRect().top) / range, 0, 1);
      const position = progress * Math.max(1, trips.length - 1);
      const index = Math.round(position);
      stage.style.setProperty('--scene-shift', `${(position - index) * 18}px`);
      stage.style.setProperty('--travel-progress', String(progress));
      if (index !== activeRef.current) {
        activeRef.current = index;
        setActiveIndex(index);
      }
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(updateScene); };
    const initialIndex = trips.findIndex(({ trip }) => trip.id === initialTrip.current);
    frame = window.requestAnimationFrame(() => {
      if (initialIndex > 0) window.scrollTo({ top: sceneOffset(initialIndex), behavior: 'instant' });
      updateScene();
    });
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(pointerFrame.current);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    const button = nav?.querySelector<HTMLElement>(`[data-scene-index="${activeIndex}"]`);
    if (nav && button) nav.scrollTo({ left: button.offsetLeft - (nav.clientWidth - button.offsetWidth) / 2, behavior: 'instant' });
  }, [activeIndex]);

  const openTrip = () => {
    setSearchParams({ trip: current.trip.id }, { state: { travelGalleryOpened: true } });
  };
  const closeTrip = () => {
    if (location.state?.travelGalleryOpened) navigate(-1);
    else setSearchParams({}, { replace: true });
  };

  if (!current) return null;

  return (
    <section className="travel-page" aria-label="Travel">
      <div ref={trackRef} className="travel-scroll-track" style={{ '--trip-count': trips.length } as React.CSSProperties}>
        <div
          ref={stageRef}
          className="travel-stage"
          data-cover-fit={containCover ? 'contain' : 'cover'}
          onPointerMove={(event) => {
            if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            const rect = event.currentTarget.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            window.cancelAnimationFrame(pointerFrame.current);
            pointerFrame.current = window.requestAnimationFrame(() => {
              const stage = stageRef.current;
              if (!stage) return;
              stage.style.setProperty('--pointer-x', `${(x / rect.width - 0.5) * 18}px`);
              stage.style.setProperty('--pointer-y', `${(y / rect.height - 0.5) * 12}px`);
              stage.style.setProperty('--cursor-x', `${x}px`);
              stage.style.setProperty('--cursor-y', `${y}px`);
            });
          }}
          onPointerLeave={() => {
            window.cancelAnimationFrame(pointerFrame.current);
            stageRef.current?.style.setProperty('--pointer-x', '0px');
            stageRef.current?.style.setProperty('--pointer-y', '0px');
          }}
        >
          <div className="travel-scene-images" aria-hidden="true">
            {trips.map(({ trip, cover }, index) => cover && Math.abs(index - activeIndex) <= 1 && (
              <img key={trip.id} className={index === activeIndex ? 'scene-image is-active' : 'scene-image'} src={cover.src} srcSet={cover.srcSet} sizes={containCover ? '(max-width: 767px) calc(100vw - 40px), 54vw' : '100vw'} width={cover.width} height={cover.height} alt="" loading={index === activeIndex ? 'eager' : 'lazy'} fetchPriority={index === activeIndex ? 'high' : 'low'} />
            ))}
          </div>
          <div className="travel-scene-shade" />
          <div className="scene-topline"><div><p className="scene-eyebrow">Travel archive</p><h1>Travel</h1></div><span className="scene-sequence">{String(activeIndex + 1).padStart(2, '0')} / {String(trips.length).padStart(2, '0')}</span></div>
          <button type="button" className="ui-focus-ring scene-open-target" onClick={openTrip} aria-label={`Open ${current.trip.title} travel gallery`} aria-haspopup="dialog" />
          <div className="scene-content" key={current.trip.id}>
            <p className="scene-location"><MapPin size={16} />{current.trip.location}</p>
            <h2>{current.trip.title}</h2>
            <div className="scene-meta"><span>{current.trip.date}</span><span><Camera size={15} />{current.count} 张照片</span></div>
            <button type="button" className="scene-gallery-link ui-focus-ring" onClick={openTrip} aria-label={`查看${current.trip.title}图集`}><span>查看图集</span><ArrowUpRight size={20} /></button>
          </div>
          <div className="scene-cursor" aria-hidden="true"><ArrowUpRight size={24} /></div>
          <div className="scene-bottom">
            <div className="scene-navigation" ref={navRef} role="group" aria-label="旅行场景">
              {trips.map(({ trip, thumbnail }, index) => (
                <button key={trip.id} type="button" data-scene-index={index} className="ui-focus-ring scene-stop" onClick={() => jumpTo(index)} aria-label={`前往${trip.title}`} aria-pressed={activeIndex === index} title={trip.location}>
                  {thumbnail && <img src={thumbnail.src} alt="" loading="lazy" width="76" height="48" />}
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </button>
              ))}
            </div>
            <button type="button" onClick={() => jumpTo(activeIndex === trips.length - 1 ? 0 : activeIndex + 1)} className="ui-focus-ring scene-next" aria-label={activeIndex === trips.length - 1 ? '回到第一段旅程' : '下一段旅程'} title={activeIndex === trips.length - 1 ? '回到第一段旅程' : '下一段旅程'}><ArrowDown size={20} /></button>
          </div>
          <div className="scene-progress" aria-hidden="true"><span /></div>
        </div>
      </div>
      {selectedTrip && <TravelGallery key={selectedTrip.id} trip={selectedTrip} onClose={closeTrip} />}
    </section>
  );
};
