import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Camera, ImageOff, LoaderCircle, MapPin, RotateCw } from 'lucide-react';
import { TravelGallery } from './TravelGallery';
import { travelEntries } from '../content/travel';

import { getMediaEntry, getMediaImages, resolveMediaImage } from '../content/media';
import type { ResolvedMediaImage } from '../content/media';

const trips = travelEntries.map((trip) => {
  const media = getMediaEntry(trip.media);
  return { trip, cover: resolveMediaImage(media?.cover, 'lg'), thumbnail: resolveMediaImage(media?.cover, 'sm'), count: getMediaImages(media).length };
});
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
const TRANSITION_MS = 420;
const MIN_VISIBLE_COVER = 0.65;
const SCENE_THRESHOLD = 0.58;

interface SceneFrame {
  index: number;
  failed: boolean;
}

interface SceneState extends SceneFrame {
  previous: SceneFrame | null;
  revision: number;
}

const containImage = (cover: ResolvedMediaImage | undefined, stageRatio: number | null) => {
  if (!cover) return true;
  const ratio = cover.width / cover.height;
  return ratio < 1 || (stageRatio !== null && Math.min(ratio / stageRatio, stageRatio / ratio) < MIN_VISIBLE_COVER);
};

const imageSizes = (cover: ResolvedMediaImage | undefined, stageRatio: number | null) => containImage(cover, stageRatio)
  ? '(max-width: 767px) calc(100vw - 40px), 54vw'
  : '100vw';

function prepareCover(index: number, stageRatio: number | null, priority: 'high' | 'low' = 'high') {
  const cover = trips[index]?.cover;
  let cancel = () => {};
  const promise = new Promise<void>((resolve, reject) => {
    if (!cover) {
      reject(new Error('Travel cover is missing.'));
      return;
    }
    const image = new Image();
    let settled = false;
    const finish = (error?: Error) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      image.onload = null;
      image.onerror = null;
      if (error) reject(error);
      else resolve();
    };
    const timeout = window.setTimeout(() => finish(new Error('Travel cover timed out.')), 15000);
    const decode = () => { void image.decode().then(() => finish(), () => finish(new Error('Travel cover could not be decoded.'))); };
    cancel = () => finish(new Error('Travel cover request cancelled.'));
    image.decoding = 'async';
    image.fetchPriority = priority;
    image.onload = decode;
    image.onerror = () => finish(new Error('Travel cover could not be loaded.'));
    image.sizes = imageSizes(cover, stageRatio);
    image.srcset = cover.srcSet;
    image.src = cover.src;
    if (image.complete && image.naturalWidth > 0) decode();
  });
  return { promise, cancel: () => cancel() };
}

interface TravelSceneProps {
  frame: SceneFrame;
  phase: 'still' | 'entering' | 'exiting';
  stageRatio: number | null;
  onOpen: () => void;
  onRetry: () => void;
  onSettled?: () => void;
}

const TravelScene: React.FC<TravelSceneProps> = ({ frame, phase, stageRatio, onOpen, onRetry, onSettled }) => {
  const item = trips[frame.index];
  if (!item) return null;
  const { trip, cover, count } = item;
  const inactive = phase === 'exiting';
  const fit = frame.failed || containImage(cover, stageRatio) ? 'contain' : 'cover';

  return (
    <div
      className={'travel-scene scene-' + phase}
      data-cover-fit={fit}
      data-scene-index={frame.index}
      data-trip-id={trip.id}
      aria-hidden={inactive || undefined}
      inert={inactive || undefined}
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget && event.animationName === 'travel-scene-enter') onSettled?.();
      }}
    >
      <div className="travel-scene-images" aria-hidden="true">
        {cover && !frame.failed && <img className="scene-image" src={cover.src} srcSet={cover.srcSet} sizes={imageSizes(cover, stageRatio)} width={cover.width} height={cover.height} alt="" loading="eager" fetchPriority="high" />}
        {frame.failed && <div className="scene-load-error"><ImageOff size={28} /><p>封面暂时无法加载</p></div>}
      </div>
      <div className="travel-scene-shade" />
      <button type="button" className="ui-focus-ring scene-open-target" onClick={onOpen} disabled={inactive} tabIndex={inactive ? -1 : 0} aria-label={'Open ' + trip.title + ' travel gallery'} aria-haspopup="dialog" />
      <div className="scene-content">
        <p className="scene-location"><MapPin size={16} />{trip.location}</p>
        <h2 id={inactive ? undefined : 'travel-current-title'}>{trip.title}</h2>
        <div className="scene-meta"><span>{trip.date}</span><span><Camera size={15} />{count} 张照片</span></div>
        <div className="scene-actions">
          <button type="button" data-scene-action className="scene-gallery-link ui-focus-ring" onClick={onOpen} disabled={inactive} tabIndex={inactive ? -1 : 0} aria-label={'查看' + trip.title + '图集'}><span>查看图集</span><ArrowUpRight size={20} /></button>
          {frame.failed && <button type="button" className="scene-retry ui-focus-ring" onClick={onRetry} disabled={inactive} tabIndex={inactive ? -1 : 0} aria-label="重试加载封面" title="重试加载封面"><RotateCw size={18} /></button>}
        </div>
      </div>
    </div>
  );
};

export const Travel: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const selectedTrip = travelEntries.find((trip) => trip.id === searchParams.get('trip'));
  const initialIndex = useRef(Math.max(0, trips.findIndex(({ trip }) => trip.id === selectedTrip?.id))).current;
  const [targetIndex, setTargetIndex] = useState(initialIndex);
  const [scene, setScene] = useState<SceneState>({ index: initialIndex, failed: false, previous: null, revision: 0 });
  const [ready, setReady] = useState<SceneFrame>({ index: initialIndex, failed: false });
  const [pending, setPending] = useState(false);
  const [retryToken, setRetryToken] = useState(0);
  const [stageRatio, setStageRatio] = useState<number | null>(null);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const targetRef = useRef(initialIndex);
  const pausedRef = useRef(Boolean(selectedTrip));
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const pointerFrame = useRef(0);
  const restoreSceneFocus = useRef(false);
  const current = trips[scene.index];
  const activeFit = scene.failed || containImage(current?.cover, stageRatio) ? 'contain' : 'cover';

  const finishScene = useCallback((revision: number) => {
    setScene((value) => value.revision === revision && value.previous ? { ...value, previous: null } : value);
  }, []);

  useLayoutEffect(() => { pausedRef.current = Boolean(selectedTrip); }, [selectedTrip]);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let lastSize = '';
    const updateRatio = () => {
      const { width, height } = stage.getBoundingClientRect();
      const size = Math.round(width) + ':' + Math.round(height);
      if (height <= 0 || size === lastSize) return;
      lastSize = size;
      setStageRatio(width / height);
      setScene((value) => value.previous ? { ...value, previous: null } : value);
    };
    updateRatio();
    const observer = new ResizeObserver(updateRatio);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(preference.matches);
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!trips.length) return;
    let cancelled = false;
    setPending(true);
    const request = prepareCover(targetIndex, stageRatio);
    void request.promise.then(() => {
      if (cancelled) return;
      setReady({ index: targetIndex, failed: false });
      setPending(false);
    }).catch(() => {
      if (cancelled) return;
      setReady({ index: targetIndex, failed: true });
      setPending(false);
    });
    return () => { cancelled = true; request.cancel(); };
  }, [targetIndex, stageRatio, retryToken]);

  useEffect(() => {
    if (selectedTrip || scene.previous || ready.index !== targetIndex) return;
    if (ready.index === scene.index && ready.failed === scene.failed) return;
    restoreSceneFocus.current = Boolean(document.activeElement?.closest('.travel-scene'));
    // Keep at most one pending destination; never replay every intermediate stop.
    setScene({
      ...ready,
      previous: reducedMotion || ready.index === scene.index ? null : { index: scene.index, failed: scene.failed },
      revision: scene.revision + 1,
    });
  }, [ready, targetIndex, scene, reducedMotion, selectedTrip]);

  useLayoutEffect(() => {
    if (!restoreSceneFocus.current) return;
    restoreSceneFocus.current = false;
    stageRef.current?.querySelector<HTMLElement>('.travel-scene:not([inert]) [data-scene-action]')?.focus({ preventScroll: true });
  }, [scene.revision]);

  useEffect(() => {
    if (!scene.previous) return;
    if (reducedMotion) { finishScene(scene.revision); return; }
    const timeout = window.setTimeout(() => finishScene(scene.revision), TRANSITION_MS + 80);
    return () => window.clearTimeout(timeout);
  }, [scene.previous, scene.revision, reducedMotion, finishScene]);

  useEffect(() => {
    if (scene.index + 1 >= trips.length) return;
    const next = prepareCover(scene.index + 1, stageRatio, 'low');
    void next.promise.catch(() => {});
    return () => next.cancel();
  }, [scene.index, stageRatio]);

  const sceneOffset = (index: number) => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return 0;
    const stickyTop = Number.parseFloat(window.getComputedStyle(stage).top) || 0;
    const range = Math.max(1, track.offsetHeight - stage.offsetHeight);
    return track.getBoundingClientRect().top + window.scrollY - stickyTop + range * index / Math.max(1, trips.length - 1);
  };

  const jumpTo = (index: number) => {
    const target = clamp(index, 0, trips.length - 1);
    targetRef.current = target;
    setTargetIndex(target);
    // The scene crossfade supplies motion; the document jumps straight to its destination.
    window.scrollTo({ top: sceneOffset(target), behavior: 'instant' });
  };

  useEffect(() => {
    let frame = 0;
    const updateScene = () => {
      frame = 0;
      const track = trackRef.current;
      const stage = stageRef.current;
      if (!track || !stage || pausedRef.current) return;
      const stickyTop = Number.parseFloat(window.getComputedStyle(stage).top) || 0;
      const range = Math.max(1, track.offsetHeight - stage.offsetHeight);
      const progress = clamp((stickyTop - track.getBoundingClientRect().top) / range, 0, 1);
      const position = progress * Math.max(1, trips.length - 1);
      stage.style.setProperty('--scene-shift', String((position - Math.round(position)) * 18) + 'px');
      stage.style.setProperty('--travel-progress', String(progress));
      if (Math.abs(position - targetRef.current) > SCENE_THRESHOLD) {
        const index = Math.round(position);
        targetRef.current = index;
        setTargetIndex(index);
      }
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(updateScene); };
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
  }, [initialIndex]);

  useEffect(() => {
    const nav = navRef.current;
    const button = nav?.querySelector<HTMLElement>('[data-scene-index="' + scene.index + '"]');
    if (nav && button) nav.scrollTo({ left: button.offsetLeft - (nav.clientWidth - button.offsetWidth) / 2, behavior: 'instant' });
  }, [scene.index]);

  const openTrip = () => {
    if (!current) return;
    window.scrollTo({ top: window.scrollY, behavior: 'instant' });
    targetRef.current = scene.index;
    setTargetIndex(scene.index);
    finishScene(scene.revision);
    setSearchParams({ trip: current.trip.id }, { state: { travelGalleryOpened: true } });
  };
  const closeTrip = () => {
    if (location.state?.travelGalleryOpened) navigate(-1);
    else setSearchParams({}, { replace: true });
  };
  const retryCover = () => {
    targetRef.current = scene.index;
    setTargetIndex(scene.index);
    setRetryToken((value) => value + 1);
  };

  if (!current) return null;

  return (
    <section className="travel-page" aria-label="Travel">
      <div ref={trackRef} className="travel-scroll-track" style={{ '--trip-count': trips.length } as React.CSSProperties}>
        <div
          ref={stageRef}
          className="travel-stage"
          data-active-fit={activeFit}
          data-target-index={targetIndex}
          onPointerMove={(event) => {
            if (event.pointerType !== 'mouse' || reducedMotion) return;
            const rect = event.currentTarget.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            window.cancelAnimationFrame(pointerFrame.current);
            pointerFrame.current = window.requestAnimationFrame(() => {
              const stage = stageRef.current;
              if (!stage) return;
              stage.style.setProperty('--pointer-x', String((x / rect.width - 0.5) * 18) + 'px');
              stage.style.setProperty('--pointer-y', String((y / rect.height - 0.5) * 12) + 'px');
              stage.style.setProperty('--cursor-x', String(x) + 'px');
              stage.style.setProperty('--cursor-y', String(y) + 'px');
            });
          }}
          onPointerLeave={() => {
            window.cancelAnimationFrame(pointerFrame.current);
            stageRef.current?.style.setProperty('--pointer-x', '0px');
            stageRef.current?.style.setProperty('--pointer-y', '0px');
          }}
        >
          <div className="scene-topline"><div><p className="scene-eyebrow">Travel archive</p><h1>Travel</h1></div><span className="scene-sequence">{String(scene.index + 1).padStart(2, '0')} / {String(trips.length).padStart(2, '0')}</span></div>
          {scene.previous && <TravelScene key={trips[scene.previous.index].trip.id} frame={scene.previous} phase="exiting" stageRatio={stageRatio} onOpen={() => {}} onRetry={() => {}} />}
          <TravelScene key={current.trip.id} frame={scene} phase={scene.previous ? 'entering' : 'still'} stageRatio={stageRatio} onOpen={openTrip} onRetry={retryCover} onSettled={() => finishScene(scene.revision)} />
          {pending && <div className="scene-loading" role="status"><LoaderCircle size={16} /><span className="sr-only">正在加载旅程封面</span></div>}
          <div className="scene-cursor" aria-hidden="true"><ArrowUpRight size={24} /></div>
          <div className="scene-bottom">
            <div className="scene-navigation" ref={navRef} role="group" aria-label="旅行场景">
              {trips.map(({ trip, thumbnail }, index) => (
                <button key={trip.id} type="button" data-scene-index={index} className="ui-focus-ring scene-stop" onClick={() => jumpTo(index)} aria-label={'前往' + trip.title} aria-pressed={scene.index === index} title={trip.location}>
                  {thumbnail && <img src={thumbnail.src} alt="" loading="lazy" width="76" height="48" />}
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </button>
              ))}
            </div>
            <button type="button" onClick={() => jumpTo(targetRef.current === trips.length - 1 ? 0 : targetRef.current + 1)} className="ui-focus-ring scene-next" aria-label={scene.index === trips.length - 1 ? '回到第一段旅程' : '下一段旅程'} title={scene.index === trips.length - 1 ? '回到第一段旅程' : '下一段旅程'}><ArrowDown size={20} /></button>
          </div>
          <div className="scene-progress" aria-hidden="true"><span /></div>
        </div>
      </div>
      {selectedTrip && <TravelGallery key={selectedTrip.id} trip={selectedTrip} onClose={closeTrip} />}
    </section>
  );
};
