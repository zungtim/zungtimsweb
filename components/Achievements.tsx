import React, { useEffect, useMemo, useState } from 'react';
import { Building2, CalendarDays, Camera, Crown, Medal, Star, Trophy, X } from 'lucide-react';
import { achievementEntries } from '../content/achievements';
import { getMediaEntry, resolveMediaImage } from '../content/media';
import { ImageLoader } from './ImageLoader';
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

    const metaChips = useMemo(() => {
        const years = Array.from(new Set(achievementEntries.map((entry) => entry.date.slice(0, 4))));
        const levels = Array.from(new Set(achievementEntries.map((entry) => entry.level)));
        return [...years, ...levels];
    }, []);

    const selectedMedia = selectedEntry ? getMediaEntry(selectedEntry.media) : undefined;
    const selectedCover = resolveMediaImage(selectedMedia?.cover, 'lg');
    const selectedGallery = selectedMedia
        ? [selectedMedia.cover, ...selectedMedia.gallery.filter((image) => image.id !== selectedMedia.cover.id)]
        : [];

    return (
        <section className="ui-section px-4 sm:px-6 lg:px-8">
            <div className="ui-shell">
                <div className="mb-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                    <div className="max-w-2xl">
                        <div className="ui-chip mb-6 inline-flex items-center justify-center rounded-2xl p-3 text-secondary dark:text-slate-300">
                            <Trophy className="h-8 w-8" />
                        </div>
                        <h2 className="mb-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">个人成就</h2>
                        <p className="text-lg font-serif text-slate-500 dark:text-slate-400">Achievements</p>
                    </div>

                    <div className="flex flex-wrap gap-2 lg:justify-end">
                        {metaChips.map((chip) => (
                            <span key={chip} className="ui-chip rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]">
                                {chip}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    {achievementEntries.map((entry) => {
                        const config = getAwardConfig(entry.award);
                        const AwardIcon = config.icon;
                        const entryMedia = getMediaEntry(entry.media);
                        const coverImage = resolveMediaImage(entryMedia?.cover, 'md');
                        const galleryCount = entryMedia ? 1 + entryMedia.gallery.length : 0;

                        return (
                            <article
                                key={entry.id}
                                className="group overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/90 shadow-[0_1px_2px_rgba(15,39,66,0.04),0_18px_34px_rgba(15,39,66,0.06)] transition-all duration-300 hover:border-slate-300/80 hover:-translate-y-1 dark:border-slate-700/80 dark:bg-slate-900/90 dark:shadow-[0_1px_2px_rgba(0,0,0,0.2),0_18px_34px_rgba(0,0,0,0.22)]"
                            >
                                <div className="grid lg:grid-cols-[280px_minmax(0,1fr)]">
                                    {coverImage && (
                                        <button
                                            type="button"
                                            onClick={() => setSelectedEntry(entry)}
                                            className="ui-focus-ring group/cover relative block cursor-pointer overflow-hidden border-b border-slate-200/80 bg-slate-100 p-0 text-left dark:border-slate-700/80 dark:bg-slate-800 lg:border-b-0 lg:border-r"
                                            aria-label={`Open ${entry.title} photo gallery`}
                                        >
                                            <ImageLoader
                                                src={coverImage.src}
                                                srcSet={coverImage.srcSet}
                                                sizes="(max-width: 1024px) 100vw, 280px"
                                                alt={entry.title}
                                                loading="lazy"
                                                fetchPriority="low"
                                                containerClassName="h-full min-h-[220px] w-full"
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center bg-slate-950/0 transition-colors duration-300 group-hover/cover:bg-slate-950/35 group-focus-visible/cover:bg-slate-950/35">
                                                <span className="inline-flex translate-y-2 items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-sm font-semibold text-white opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover/cover:translate-y-0 group-hover/cover:opacity-100 group-focus-visible/cover:translate-y-0 group-focus-visible/cover:opacity-100">
                                                    <Camera className="h-4 w-4" />
                                                    View Gallery
                                                </span>
                                            </div>
                                            <div className={`absolute left-0 top-0 h-full w-1 ${config.accent}`} />
                                        </button>
                                    )}

                                    <div className="p-6 sm:p-7">
                                        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                                            <div className="min-w-0">
                                                <div className="flex flex-wrap items-center gap-2.5">
                                                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${config.badge}`}>
                                                        <AwardIcon className="h-3.5 w-3.5" />
                                                        {entry.award}
                                                    </span>
                                                    <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                                                        <CalendarDays className="h-3.5 w-3.5" />
                                                        {entry.date}
                                                    </span>
                                                </div>

                                                <h3 className="mt-4 text-xl font-bold leading-snug text-slate-900 dark:text-white sm:text-2xl">
                                                    {entry.title}
                                                </h3>
                                            </div>

                                            {galleryCount > 0 && (
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedEntry(entry)}
                                                    className="ui-focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-slate-200/80 bg-white/60 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100/80 dark:border-slate-600 dark:bg-slate-800/70 dark:text-slate-200 dark:hover:bg-slate-800"
                                                    aria-label={`Open ${entry.title} photo gallery`}
                                                >
                                                    <Camera className="h-4 w-4" />
                                                    {galleryCount} Photos
                                                </button>
                                            )}
                                        </div>

                                        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] xl:items-end">
                                            <div className="border-t border-slate-200/80 pt-4 dark:border-slate-700/80">
                                                <div className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Role</div>
                                                <div className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-slate-800 dark:text-slate-200">
                                                    <Medal className={`h-4 w-4 ${config.text}`} />
                                                    {entry.role}
                                                </div>
                                            </div>

                                            <div className="border-t border-slate-200/80 pt-4 dark:border-slate-700/80">
                                                <div className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Organizer</div>
                                                <div className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-slate-800 dark:text-slate-200">
                                                    <Building2 className={`h-4 w-4 ${config.text}`} />
                                                    {entry.organizer}
                                                </div>
                                            </div>

                                            <div className="border-t border-slate-200/80 pt-4 text-left xl:text-right dark:border-slate-700/80">
                                                <div className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Level</div>
                                                <div className={`mt-2 text-sm font-semibold uppercase tracking-[0.16em] ${config.text}`}>
                                                    {entry.level}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>

                {selectedEntry && (
                    <div
                        className="fixed inset-x-0 bottom-0 top-16 z-[100] flex items-center justify-center p-4 sm:p-6"
                        role="dialog"
                        aria-modal="true"
                        aria-label={`${selectedEntry.title} achievement gallery`}
                    >
                        <button
                            type="button"
                            className="absolute inset-0 bg-slate-950/80"
                            onClick={() => setSelectedEntry(null)}
                            aria-label="Close achievement gallery overlay"
                        />
                        <div className="ui-surface relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-[2rem]">
                            <button
                                type="button"
                                onClick={() => setSelectedEntry(null)}
                                className="ui-focus-ring absolute right-4 top-4 z-20 rounded-full bg-black/20 p-2 text-slate-100 transition-colors hover:bg-black/30"
                                aria-label="Close achievement gallery"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <div className="overflow-y-auto">
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

                                <div className="p-6 sm:p-8">
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
                                                        containerClassName="w-full rounded-2xl bg-slate-100 dark:bg-slate-800"
                                                        containerStyle={getImageAspectStyle(mediaImage)}
                                                        className="h-full w-full rounded-2xl object-cover transition-transform duration-500 hover:scale-[1.02]"
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
