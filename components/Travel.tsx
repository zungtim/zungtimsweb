import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Calendar, Camera, X, Quote, ZoomIn } from 'lucide-react';
import { ImageLoader } from './ImageLoader';
import { travelEntries } from '../content/travel';
import { getMediaEntry, resolveMediaImage } from '../content/media';
import type { TravelContentEntry } from '../types/content';

// 内容维护提示：新增/修改旅行经历文字请编辑 content/travel.tsx，本文件仅负责渲染。
const LIST_SIZES = '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw';
const MODAL_HERO_SIZES = '100vw';
const MODAL_GRID_SIZES = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';

export const Travel: React.FC = () => {
  const [selectedTrip, setSelectedTrip] = useState<TravelContentEntry | null>(null);
  const [visibleImageCount, setVisibleImageCount] = useState(6);
  const loadMoreTriggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (selectedTrip) {
      setVisibleImageCount(6);
    }
  }, [selectedTrip?.id]);

  useEffect(() => {
    if (selectedTrip) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedTrip]);

  useEffect(() => {
    if (!selectedTrip) {
      return;
    }

    const entryMedia = getMediaEntry(selectedTrip.media);
    const totalImages = entryMedia?.gallery.length ?? 0;
    if (visibleImageCount >= totalImages) {
      return;
    }

    const target = loadMoreTriggerRef.current;
    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleImageCount((prev) => Math.min(prev + 4, totalImages));
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '200px',
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [selectedTrip, visibleImageCount]);

  return (
    <section id="travel" className="py-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-teal-100 dark:bg-teal-900/30 rounded-2xl text-teal-600 dark:text-teal-400 mb-6">
            <Camera className="w-8 h-8" />
          </div>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">旅行足迹</h2>
          <p className="text-slate-500 dark:text-slate-400 font-serif italic text-lg">"The world is a book and those who do not travel read only one page."</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {travelEntries.map((trip, idx) => {
            const entryMedia = getMediaEntry(trip.media);
            const coverImage = resolveMediaImage(entryMedia?.cover, 'md');
            const galleryCount = entryMedia?.gallery.length ?? 0;

            return (
              <div
                key={trip.id}
                onClick={() => setSelectedTrip(trip)}
                className={`break-inside-avoid group cursor-pointer bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition-transform duration-300 hover:-translate-y-1 border border-slate-200 dark:border-slate-700 ${
                  idx === 0 ? 'md:col-span-2' : ''
                }`}
              >
                <div className="relative h-64 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  {coverImage && (
                    <ImageLoader
                      src={coverImage.src}
                      srcSet={coverImage.srcSet}
                      sizes={LIST_SIZES}
                      alt={trip.title}
                      priority={idx < 3}
                      loading={idx < 3 ? 'eager' : 'lazy'}
                      fetchPriority={idx < 3 ? 'high' : 'low'}
                      containerClassName="w-full h-full"
                      className="transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute top-4 right-4 bg-white/80 dark:bg-slate-800/80 px-3 py-1 rounded-full text-xs font-bold text-slate-800 dark:text-slate-200 shadow-sm z-10">
                    {trip.year}
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 text-white flex items-center gap-2 font-semibold bg-black/40 px-4 py-2 rounded-full transition-opacity duration-300">
                      <ZoomIn className="w-4 h-4" /> 查看图集
                    </div>
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-teal-600 dark:text-teal-400 font-semibold mb-2">
                      <Calendar className="w-4 h-4" />
                      {trip.date}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">{trip.title}</h3>
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mb-4">
                      <MapPin className="w-4 h-4" />
                      {trip.location}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center text-slate-400 dark:text-slate-500 text-sm">
                    <span className="flex items-center gap-1">
                      <Camera className="w-3.5 h-3.5" /> {galleryCount} Photos
                    </span>
                    <span className="text-xl opacity-60 group-hover:opacity-100 transition-opacity">{trip.emoji}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {selectedTrip && (() => {
          const selectedMedia = getMediaEntry(selectedTrip.media);
          const selectedCover = resolveMediaImage(selectedMedia?.cover, 'lg');
          const visibleImages = (selectedMedia?.gallery ?? []).slice(0, visibleImageCount);

          return (
            <div
              className="fixed top-16 left-0 right-0 bottom-0 z-[100] flex items-center justify-center p-4 sm:p-6"
              role="dialog"
              aria-modal="true"
            >
              <div
                className="absolute inset-0 bg-slate-900/80 transition-opacity"
                onClick={() => setSelectedTrip(null)}
              />

              <div className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
                <button
                  onClick={() => setSelectedTrip(null)}
                  className="absolute top-4 right-4 z-20 p-2 bg-black/10 hover:bg-black/20 text-slate-800 dark:text-slate-200 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="overflow-y-auto custom-scrollbar">
                  <div className="relative h-64 sm:h-80 w-full shrink-0">
                    {selectedCover && (
                      <ImageLoader
                        src={selectedCover.src}
                        srcSet={selectedCover.srcSet}
                        sizes={MODAL_HERO_SIZES}
                        alt={selectedTrip.title}
                        priority={true}
                        loading="eager"
                        fetchPriority="high"
                        containerClassName="w-full h-full"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <div className="p-8 text-white w-full">
                        <div className="flex items-center gap-2 text-teal-300 font-bold mb-2 uppercase tracking-wide text-sm">
                          <MapPin className="w-4 h-4" /> {selectedTrip.location}
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-2">{selectedTrip.title} {selectedTrip.emoji}</h2>
                        <p className="opacity-90 font-mono text-sm">{selectedTrip.date}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 border-l-4 border-l-teal-500 p-6 rounded-xl mb-10">
                      <Quote className="w-8 h-8 text-teal-200 mb-2" />
                      <div className="text-slate-700 dark:text-slate-300 text-lg font-serif">
                        {selectedTrip.description}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                      <Camera className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                      旅途剪影
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {visibleImages.map((image) => {
                        const mediaImage = resolveMediaImage(image, 'md');
                        if (!mediaImage) {
                          return null;
                        }

                        return (
                          <div key={image.id} className="rounded-xl overflow-hidden group/img relative bg-slate-100 dark:bg-slate-700 aspect-[4/3]">
                            <ImageLoader
                              src={mediaImage.src}
                              srcSet={mediaImage.srcSet}
                              sizes={MODAL_GRID_SIZES}
                              alt={`Gallery ${image.id}`}
                              containerClassName="w-full h-full"
                              className="h-full w-full object-cover transform transition-transform duration-500 group-hover/img:scale-105"
                              loading="lazy"
                              fetchPriority="low"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-colors" />
                          </div>
                        );
                      })}
                    </div>

                    {visibleImageCount < (selectedMedia?.gallery.length ?? 0) && (
                      <div
                        className="h-20 mt-8 flex items-center justify-center"
                        ref={loadMoreTriggerRef}
                      >
                        <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
                          <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    )}

                    <div className="h-12" />
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
};
