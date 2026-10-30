import type { ReactNode } from 'react';

export type MediaModule = 'travel' | 'achievements' | 'research';

export type MediaVariantKey = 'sm' | 'md' | 'lg';

export interface MediaVariant {
    src: string;
    width: number;
    height: number;
    bytes: number;
}

export interface MediaImage {
    id: string;
    variants: Record<MediaVariantKey, MediaVariant>;
    srcSet: string;
}

export interface MediaEntry {
    cover: MediaImage;
    gallery: MediaImage[];
}

export interface MediaManifest {
    generatedAt: string;
    modules: Record<MediaModule, Record<string, MediaEntry>>;
}

export interface EntryMediaRef {
    module: MediaModule;
    entryId: string;
}

export interface ContentEntry {
    id: string;
    title: string;
    media?: EntryMediaRef;
}

export interface TravelContentEntry extends ContentEntry {
    year: number;
    date: string;
    location: string;
    emoji: string;
    description: ReactNode;
}

export interface AchievementContentEntry extends ContentEntry {
    role: string;
    award: string;
    date: string;
    organizer: string;
    level: 'National' | 'Provincial' | 'Municipal';
}

export interface ResearchInterestEntry {
    id: string;
    context: string;
    title: string;
    english: string;
}

export interface ResearchArchiveEntry {
    id: string;
    type: 'research' | 'patent';
    title: string;
    subtitle: string;
    role: string;
    date: string;
    summary: string;
    publicationNumber?: string;
    status?: string;
}

export interface ResearchQuestionEntry {
    id: string;
    title: string;
    summary: string;
    details: { label: string; body: string }[];
}

export interface ResearchMethodEntry {
    id: string;
    title: string;
    english: string;
    summary: string;
}

