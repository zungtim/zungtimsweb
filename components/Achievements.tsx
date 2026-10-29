import React, { useState } from 'react';
import { Camera, Crown, Medal, Star, Trophy, X } from 'lucide-react';
import { achievementEntries } from '../content/achievements';
import { getMediaEntry, resolveMediaImage } from '../content/media';
import { ImageLoader } from './ImageLoader';
import { useDialog } from '../hooks/useDialog';
import type { ResolvedMediaImage } from '../content/media';
import type { AchievementContentEntry } from '../types/content';

const getAwardConfig = (award: string) => {
    if (award.includes('金')) {
        return {
            accent: 'bg-amber-500',
            text: 'text-amber-700 dark:text-amber-300',
            badge: 'bg-amber-50 text-amber-700 border border-amber-200/90 dark:bg-amber-900/25 dark:text-amber-300 dark:border-amber-700/40',
            icon: Crown,
        };
    }

    if (award.includes('银')) {
        return {
            accent: 'bg-slate-400',
            text: 'text-slate-700 dark:text-slate-300',
            badge: 'bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-700/70 dark:text-slate-300 dark:border-slate-600',
            icon: Medal,
        };
    }

    if (award.includes('铜') || award.includes('三等')) {
        return {
            accent: 'bg-orange-500',
            text: 'text-orange-700 dark:text-orange-300',
            badge: 'bg-orange-50 text-orange-700 border border-orange-200/90 dark:bg-orange-900/25 dark:text-orange-300 dark:border-orange-700/40',
            icon: Star,
        };
    }

    return {
        accent: 'bg-teal-500',
        text: 'text-teal-700 dark:text-teal-300',
        badge: 'bg-teal-50 text-teal-700 border border-teal-200/90 dark:bg-teal-900/25 dark:text-teal-300 dark:border-teal-700/40',
        icon: Trophy,
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
  const dialogRef = useDialog(selectedEntry !== null, () => setSelectedEntry(null));
  const selectedMedia = selectedEntry ? getMediaEntry(selectedEntry.media) : undefined;
  const selectedCover = resolveMediaImage(selectedMedia?.cover, 'lg');
  const selectedGallery = selectedMedia
    ? [selectedMedia.cover, ...selectedMedia.gallery.filter((image) => image.id !== selectedMedia.cover.id)]
    : [];

  return (
    <>
      <div className="achievement-list">
        {achievementEntries.map((entry) => {
          const config = getAwardConfig(entry.award);
          const AwardIcon = config.icon;
          const media = getMediaEntry(entry.media);
          const photoCount = media ? new Set([media.cover.id, ...media.gallery.map((image) => image.id)]).size : 0;
          return <article key={entry.id} className="achievement-row">
            <p className="record-date">{entry.date}</p>
            <div><h3>{entry.title}</h3><div className="achievement-meta"><span className={`award-label ${config.text}`}><AwardIcon className="h-3.5 w-3.5" />{entry.award}</span><span>{entry.role}</span><span>{entry.organizer}</span><span>{entry.level}</span></div></div>
            {photoCount > 0 && <button type="button" onClick={() => setSelectedEntry(entry)} className="ui-focus-ring icon-button" aria-label={`Open ${entry.title} photo gallery`} aria-haspopup="dialog" title={`查看图集 · ${photoCount} 张照片`}><Camera className="h-[18px] w-[18px]" /></button>}
          </article>;
        })}
      </div>
                {selectedEntry && (
                    <div
                        className="ui-gallery-overlay"
                    >
                        <button
                            type="button"
                            className="absolute inset-0 bg-slate-950/80"
                            tabIndex={-1}
                            onClick={() => setSelectedEntry(null)}
                            aria-label="Close achievement gallery overlay"
                        />
                        <div
                            ref={dialogRef}
                            className="ui-surface ui-gallery-panel relative flex w-full max-w-5xl flex-col overflow-hidden"
                            role="dialog"
                            aria-modal="true"
                            aria-label={`${selectedEntry.title} achievement gallery`}
                            tabIndex={-1}
                        >
                            <button
                                type="button"
                                onClick={() => setSelectedEntry(null)}
                                data-dialog-close
                                className="ui-focus-ring ui-dialog-close absolute right-4 top-4 z-20"
                                aria-label="Close achievement gallery"
                                title="Close gallery"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <div className="min-h-0 overflow-y-auto overscroll-contain">
                                {selectedCover && (
                                    <div className="relative h-56 w-full bg-slate-100 dark:bg-slate-800 sm:h-72">
                                        <ImageLoader
                                            src={selectedCover.src}
                                            srcSet={selectedCover.srcSet}
                                            sizes="100vw"
                                            alt={selectedEntry.title}
                                            loading="eager"
                                            fetchPriority="high"
                                            containerClassName="h-full w-full"
                                            className={`h-full w-full ${isPortraitImage(selectedCover) ? 'object-contain p-1.5' : 'object-cover'}`}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
                                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] opacity-90">
                                                <Camera className="h-3.5 w-3.5" />
                                                Achievement Gallery
                                            </div>
                                            <h3 className="mt-2 text-xl font-bold leading-snug sm:text-2xl">{selectedEntry.title}</h3>
                                        </div>
                                    </div>
                                )}

                                <div className="p-5 sm:p-8">
                                    <div className="columns-1 [column-gap:1rem] sm:columns-2 lg:columns-3">
                                        {selectedGallery.map((image) => {
                                            const mediaImage = resolveMediaImage(image, 'md');
                                            if (!mediaImage) {
                                                return null;
                                            }

                                            return (
                                                <div key={image.id} className="mb-4 [break-inside:avoid]">
                                                    <ImageLoader
                                                        src={mediaImage.src}
                                                        srcSet={mediaImage.srcSet}
                                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                        alt={`${selectedEntry.title} gallery ${image.id}`}
                                                        loading="lazy"
                                                        fetchPriority="low"
                                                        containerClassName="w-full rounded-md bg-slate-100 dark:bg-slate-800"
                                                        containerStyle={getImageAspectStyle(mediaImage)}
                                                        className="h-full w-full rounded-md object-cover transition-transform duration-500 hover:scale-[1.02]"
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
    </>
  );
};
