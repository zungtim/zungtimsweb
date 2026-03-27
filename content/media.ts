import { mediaManifest } from './generated/media-manifest';
import type { EntryMediaRef, MediaImage, MediaModule, MediaVariant, MediaVariantKey } from '../types/content';

const variantPreference: MediaVariantKey[] = ['lg', 'md', 'sm'];

export function getMediaEntry(ref: EntryMediaRef | undefined) {
    if (!ref) {
        return undefined;
    }

    return mediaManifest.modules[ref.module]?.[ref.entryId];
}

function pickVariant(image: MediaImage, preferred: MediaVariantKey): MediaVariant {
    if (image.variants[preferred]) {
        return image.variants[preferred];
    }

    const fallback = variantPreference.find((key) => Boolean(image.variants[key]));
    if (!fallback) {
        throw new Error(`No available variants for media image: ${image.id}`);
    }

    return image.variants[fallback];
}

export interface ResolvedMediaImage {
    src: string;
    srcSet: string;
    width: number;
    height: number;
}

export function resolveMediaImage(image: MediaImage | undefined, preferred: MediaVariantKey): ResolvedMediaImage | undefined {
    if (!image) {
        return undefined;
    }

    const variant = pickVariant(image, preferred);
    return {
        src: variant.src,
        srcSet: image.srcSet,
        width: variant.width,
        height: variant.height,
    };
}

export function getModuleCoverUrls(module: MediaModule, preferred: MediaVariantKey = 'md'): string[] {
    const entries = Object.values(mediaManifest.modules[module] ?? {});
    return entries
        .map((entry) => resolveMediaImage(entry.cover, preferred)?.src)
        .filter((url): url is string => Boolean(url));
}
