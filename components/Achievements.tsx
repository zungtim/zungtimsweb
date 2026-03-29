import React, { useEffect, useState } from 'react';
import { Trophy, Medal, Star, Crown, TrendingUp, Camera, X } from 'lucide-react';
import { achievementEntries } from '../content/achievements';
import { getMediaEntry, resolveMediaImage } from '../content/media';
import { ImageLoader } from './ImageLoader';
import type { AchievementContentEntry } from '../types/content';
import type { ResolvedMediaImage } from '../content/media';

const getAwardConfig = (award: string) => {
  if (award.includes('金')) {
    return {
      accent: 'bg-amber-500',
      text: 'text-amber-700 dark:text-amber-300',
      badge: 'bg-amber-50 dark:bg-amber-900/25 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-700/40',
      icon: Crown,
      size: 'large'
    };
  }
  if (award.includes('银')) {
    return {
      accent: 'bg-slate-400',
      text: 'text-slate-700 dark:text-slate-300',
      badge: 'bg-slate-100 dark:bg-slate-700/70 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600',
      icon: Medal,
      size: 'medium'
    };
  }
  if (award.includes('铜') || award.includes('三等')) {
    return {
      accent: 'bg-orange-500',
      text: 'text-orange-700 dark:text-orange-300',
      badge: 'bg-orange-50 dark:bg-orange-900/25 text-orange-700 dark:text-orange-300 border border-orange-200/80 dark:border-orange-700/40',
      icon: Star,
      size: 'medium'
    };
  }
  return {
    accent: 'bg-teal-500',
    text: 'text-teal-700 dark:text-teal-300',
    badge: 'bg-teal-50 dark:bg-teal-900/25 text-teal-700 dark:text-teal-300 border border-teal-200/80 dark:border-teal-700/40',
    icon: Trophy,
    size: 'medium'
  };
};

function isPortraitImage(image: ResolvedMediaImage | undefined): boolean {
  if (!image) {
    return false;
  }
  return image.height > image.width;
}

function getImageAspectStyle(image: ResolvedMediaImage | undefined): React.CSSProperties | undefined {
  if (!image) {
    return undefined;
  }

  return {
    aspectRatio: `${image.width} / ${image.height}`,
  };
}

export const Achievements: React.FC = () => {
  const [selectedEntry, setSelectedEntry] = useState<AchievementContentEntry | null>(null);

  useEffect(() => {
    if (!selectedEntry) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedEntry(null);
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [selectedEntry]);

  const selectedMedia = selectedEntry ? getMediaEntry(selectedEntry.media) : undefined;
  const selectedCover = resolveMediaImage(selectedMedia?.cover, 'lg');
  const selectedGallery = selectedMedia
    ? [selectedMedia.cover, ...selectedMedia.gallery.filter((image) => image.id !== selectedMedia.cover.id)]
    : [];

  return (
    <section className="ui-section px-4 sm:px-6 lg:px-8">
      <div className="ui-shell">
        <div className="ui-section-head">
          <div className="ui-chip inline-flex items-center justify-center p-3 rounded-2xl text-secondary dark:text-slate-300 mb-6">
            <Trophy className="w-8 h-8" />
          </div>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">个人成就</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-serif">Achievements</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievementEntries.map((entry) => {
            const config = getAwardConfig(entry.award);
            const Icon = config.icon;
            const isLarge = config.size === 'large';
            const entryMedia = getMediaEntry(entry.media);
            const coverImage = resolveMediaImage(entryMedia?.cover, 'md');
            const galleryCount = entryMedia ? 1 + entryMedia.gallery.length : 0;
            const coverIsPortrait = isPortraitImage(coverImage);

            return (
              <div
                key={entry.id}
                className={`group ui-surface relative overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1 ${
                  isLarge ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className={`absolute top-0 left-0 right-0 h-1 ${config.accent}`} />
                <Icon className={`absolute -right-6 -bottom-6 w-40 h-40 opacity-5 rotate-12 transition-transform duration-500 group-hover:rotate-0 ${config.text}`} />

                {coverImage && (
                  <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
                    <ImageLoader
                      src={coverImage.src}
                      srcSet={coverImage.srcSet}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      alt={entry.title}
                      loading="lazy"
                      fetchPriority="low"
                      containerClassName="w-full h-full"
                      className={`h-full w-full ${coverIsPortrait ? 'object-contain p-1' : 'object-cover'}`}
                    />
                  </div>
                )}

                <div className="relative p-8">
                  <div className="flex justify-between items-start mb-6">
                    <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold ${config.badge}`}>
                      <Icon className="w-4 h-4" />
                      {entry.award}
                    </span>
                    <span className="text-sm font-mono text-slate-500 dark:text-slate-400 tracking-wide">{entry.date}</span>
                  </div>

                  <h3 className={`font-bold text-slate-900 dark:text-white mb-4 leading-snug ${isLarge ? 'text-xl' : 'text-lg'}`}>
                    {entry.title}
                  </h3>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                      <div className="w-8 h-8 rounded-lg ui-subtle-panel flex items-center justify-center">
                        <Medal className={`w-4 h-4 ${config.text}`} />
                      </div>
                      <span><span className="font-semibold text-slate-900 dark:text-white">Role:</span> {entry.role}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                      <div className="w-8 h-8 rounded-lg ui-subtle-panel flex items-center justify-center">
                        <TrendingUp className={`w-4 h-4 ${config.text}`} />
                      </div>
                      <span><span className="font-semibold text-slate-900 dark:text-white">Organizer:</span> {entry.organizer}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
                    <div className="flex items-center justify-between gap-3">
                      <span className={`text-xs font-bold uppercase tracking-wider ${config.text}`}>
                        {entry.level} Level
                      </span>
                      {galleryCount > 0 && (
                        <button
                          type="button"
                          onClick={() => setSelectedEntry(entry)}
                          className="ui-focus-ring inline-flex items-center gap-1 rounded-full border border-slate-200/80 dark:border-slate-600 px-3 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100/70 dark:hover:bg-slate-700/60"
                          aria-label={`Open ${entry.title} photo gallery`}
                        >
                          <Camera className="h-3.5 w-3.5" />
                          {galleryCount} Photos
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {selectedEntry && (
          <div
            className="fixed top-16 left-0 right-0 bottom-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedEntry.title} achievement gallery`}
          >
            <button
              type="button"
              className="absolute inset-0 bg-slate-900/80"
              onClick={() => setSelectedEntry(null)}
              aria-label="Close achievement gallery overlay"
            />
            <div className="relative w-full max-w-5xl max-h-[90vh] ui-surface rounded-3xl overflow-hidden flex flex-col">
              <button
                type="button"
                onClick={() => setSelectedEntry(null)}
                className="ui-focus-ring absolute top-4 right-4 z-20 p-2 bg-black/20 hover:bg-black/30 text-slate-100 rounded-full transition-colors"
                aria-label="Close achievement gallery"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-y-auto">
                {selectedCover && (
                  <div className="relative h-56 sm:h-72 w-full bg-slate-100 dark:bg-slate-800">
                    <ImageLoader
                      src={selectedCover.src}
                      srcSet={selectedCover.srcSet}
                      sizes="100vw"
                      alt={selectedEntry.title}
                      loading="eager"
                      fetchPriority="high"
                      containerClassName="w-full h-full"
                      className={`h-full w-full ${isPortraitImage(selectedCover) ? 'object-contain p-1' : 'object-cover'}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider opacity-90">
                        <Camera className="h-3.5 w-3.5" />
                        Achievement Gallery
                      </div>
                      <h3 className="mt-2 text-xl sm:text-2xl font-bold leading-snug">{selectedEntry.title}</h3>
                    </div>
                  </div>
                )}

                <div className="p-6 sm:p-8">
                  <div className="columns-1 sm:columns-2 lg:columns-3 [column-gap:1rem]">
                    {selectedGallery.map((image) => {
                      const mediaImage = resolveMediaImage(image, 'md');
                      if (!mediaImage) {
                        return null;
                      }

                      return (
                        <div
                          key={image.id}
                          className="mb-4 [break-inside:avoid]"
                        >
                          <ImageLoader
                            src={mediaImage.src}
                            srcSet={mediaImage.srcSet}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            alt={`${selectedEntry.title} gallery ${image.id}`}
                            loading="lazy"
                            fetchPriority="low"
                            containerClassName="w-full rounded-xl bg-slate-100 dark:bg-slate-800"
                            containerStyle={getImageAspectStyle(mediaImage)}
                            className="h-full w-full rounded-xl object-cover transition-transform duration-500 hover:scale-[1.02]"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

