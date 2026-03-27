import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..', '..');

const SOURCE_ROOT = path.join(repoRoot, 'public', 'photo-src');
const OUTPUT_ROOT = path.join(repoRoot, 'public', 'photo-gen');
const JSON_MANIFEST_PATH = path.join(OUTPUT_ROOT, 'manifest.json');
const TS_MANIFEST_PATH = path.join(repoRoot, 'content', 'generated', 'media-manifest.ts');
const CACHE_PATH = path.join(repoRoot, '.cache', 'media-cache.json');

const MODULES = [
    { name: 'travel', requireCover: true },
    { name: 'competitions', requireCover: false },
];

const WIDTH_PRESETS = {
    sm: 480,
    md: 960,
    lg: 1600,
};

const INPUT_LIMITS = {
    maxBytes: 12 * 1024 * 1024,
    maxDimension: 6000,
};

const OUTPUT_LIMITS = {
    maxBytes: Math.round(1.5 * 1024 * 1024),
};

const VALID_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

function toPosix(relativePath) {
    return relativePath.split(path.sep).join('/');
}

function isNumericName(fileName) {
    return /^\d+$/.test(fileName);
}

function sortByNumericName(a, b) {
    return Number(a.baseName) - Number(b.baseName);
}

async function readJson(filePath, fallbackValue) {
    try {
        const raw = await fs.readFile(filePath, 'utf8');
        return JSON.parse(raw);
    } catch {
        return fallbackValue;
    }
}

async function ensureDir(dirPath) {
    await fs.mkdir(dirPath, { recursive: true });
}

async function fileExists(filePath) {
    try {
        await fs.access(filePath);
        return true;
    } catch {
        return false;
    }
}

async function validateInputImage(sourcePath) {
    const stat = await fs.stat(sourcePath);
    if (stat.size > INPUT_LIMITS.maxBytes) {
        throw new Error(`Input image too large (>12MB): ${sourcePath}`);
    }

    const metadata = await sharp(sourcePath).metadata();
    const width = metadata.width ?? 0;
    const height = metadata.height ?? 0;
    const longest = Math.max(width, height);
    if (!width || !height) {
        throw new Error(`Cannot read image dimensions: ${sourcePath}`);
    }

    if (longest > INPUT_LIMITS.maxDimension) {
        throw new Error(`Input image dimension too large (>6000px): ${sourcePath}`);
    }

    return { width, height, bytes: stat.size, signature: `${stat.size}:${Math.round(stat.mtimeMs)}` };
}

function buildOutputFilePath(moduleName, entryId, imageId, variantKey) {
    return path.join(OUTPUT_ROOT, moduleName, entryId, `${imageId}-${variantKey}.webp`);
}

function buildPublicUrl(moduleName, entryId, imageId, variantKey) {
    return `/photo-gen/${moduleName}/${entryId}/${imageId}-${variantKey}.webp`;
}

async function buildImageVariants({
    sourcePath,
    moduleName,
    entryId,
    imageId,
    sourceInfo,
    cacheEntry,
}) {
    const variants = {};
    const outputChecks = [];

    for (const variantKey of Object.keys(WIDTH_PRESETS)) {
        const outputFilePath = buildOutputFilePath(moduleName, entryId, imageId, variantKey);
        outputChecks.push(outputFilePath);
    }

    const canUseCache =
        cacheEntry &&
        cacheEntry.signature === sourceInfo.signature &&
        cacheEntry.variants &&
        (await Promise.all(outputChecks.map((filePath) => fileExists(filePath)))).every(Boolean);

    if (canUseCache) {
        return cacheEntry;
    }

    for (const [variantKey, targetWidth] of Object.entries(WIDTH_PRESETS)) {
        const outputFilePath = buildOutputFilePath(moduleName, entryId, imageId, variantKey);
        const resizeWidth = Math.min(sourceInfo.width, targetWidth);

        await sharp(sourcePath)
            .resize({ width: resizeWidth, withoutEnlargement: true })
            .webp({ quality: 82 })
            .toFile(outputFilePath);

        const variantMeta = await sharp(outputFilePath).metadata();
        const outputStat = await fs.stat(outputFilePath);

        if (outputStat.size > OUTPUT_LIMITS.maxBytes) {
            throw new Error(`Generated image too large (>1.5MB): ${outputFilePath}`);
        }

        variants[variantKey] = {
            src: buildPublicUrl(moduleName, entryId, imageId, variantKey),
            width: variantMeta.width ?? resizeWidth,
            height: variantMeta.height ?? sourceInfo.height,
            bytes: outputStat.size,
        };
    }

    return {
        signature: sourceInfo.signature,
        variants,
    };
}

function buildSrcSet(variants) {
    return ['sm', 'md', 'lg']
        .map((variantKey) => `${variants[variantKey].src} ${variants[variantKey].width}w`)
        .join(', ');
}

async function collectModuleManifest(moduleConfig, cacheState, nextCacheState) {
    const moduleName = moduleConfig.name;
    const moduleRoot = path.join(SOURCE_ROOT, moduleName);
    const moduleManifest = {};

    if (!(await fileExists(moduleRoot))) {
        return moduleManifest;
    }

    const dirents = await fs.readdir(moduleRoot, { withFileTypes: true });
    const entryDirs = dirents.filter((dirent) => dirent.isDirectory());

    for (const entryDir of entryDirs) {
        const entryId = entryDir.name;
        const sourceEntryPath = path.join(moduleRoot, entryId);
        const outputEntryPath = path.join(OUTPUT_ROOT, moduleName, entryId);
        await ensureDir(outputEntryPath);

        const files = await fs.readdir(sourceEntryPath, { withFileTypes: true });
        const imageFiles = files
            .filter((file) => file.isFile())
            .map((file) => {
                const ext = path.extname(file.name).toLowerCase();
                const baseName = path.basename(file.name, ext);
                return {
                    name: file.name,
                    ext,
                    baseName,
                    fullPath: path.join(sourceEntryPath, file.name),
                };
            })
            .filter((file) => VALID_EXTENSIONS.has(file.ext));

        if (imageFiles.length === 0) {
            continue;
        }

        for (const file of imageFiles) {
            if (file.baseName !== 'cover' && !isNumericName(file.baseName)) {
                throw new Error(`Invalid filename in ${sourceEntryPath}: ${file.name}. Only 'cover' and numeric names are allowed.`);
            }
        }

        const coverSource = imageFiles.find((file) => file.baseName === 'cover');
        const gallerySources = imageFiles.filter((file) => isNumericName(file.baseName)).sort(sortByNumericName);

        if (moduleConfig.requireCover && !coverSource) {
            throw new Error(`Missing cover image in ${sourceEntryPath}. Expected file name 'cover.*'.`);
        }

        if (!coverSource && gallerySources.length === 0) {
            continue;
        }

        const coverFile = coverSource ?? gallerySources[0];
        const allImages = [coverFile, ...gallerySources];
        const dedupedImages = allImages.filter((image, index, list) => list.findIndex((item) => item.name === image.name) === index);

        const imageManifestMap = {};

        for (const image of dedupedImages) {
            const sourceInfo = await validateInputImage(image.fullPath);
            const cacheKey = toPosix(path.join(moduleName, entryId, image.name));
            const cached = cacheState.files?.[cacheKey];

            const buildResult = await buildImageVariants({
                sourcePath: image.fullPath,
                moduleName,
                entryId,
                imageId: image.baseName,
                sourceInfo,
                cacheEntry: cached,
            });

            nextCacheState.files[cacheKey] = buildResult;
            imageManifestMap[image.baseName] = {
                id: image.baseName,
                variants: buildResult.variants,
                srcSet: buildSrcSet(buildResult.variants),
            };
        }

        moduleManifest[entryId] = {
            cover: imageManifestMap[coverFile.baseName],
            gallery: gallerySources.map((file) => imageManifestMap[file.baseName]).filter(Boolean),
        };
    }

    return moduleManifest;
}

async function main() {
    await ensureDir(path.dirname(CACHE_PATH));
    await ensureDir(path.dirname(JSON_MANIFEST_PATH));
    await ensureDir(path.dirname(TS_MANIFEST_PATH));

    const cacheState = await readJson(CACHE_PATH, { files: {} });
    const nextCacheState = { files: {} };

    const manifest = {
        generatedAt: new Date().toISOString(),
        modules: {
            travel: {},
            competitions: {},
        },
    };

    for (const moduleConfig of MODULES) {
        manifest.modules[moduleConfig.name] = await collectModuleManifest(moduleConfig, cacheState, nextCacheState);
    }

    const jsonContent = `${JSON.stringify(manifest, null, 4)}\n`;
    await fs.writeFile(JSON_MANIFEST_PATH, jsonContent, 'utf8');

    const tsContent = `import type { MediaManifest } from '../../types/content';\n\nexport const mediaManifest: MediaManifest = ${JSON.stringify(manifest, null, 4)};\n`;
    await fs.writeFile(TS_MANIFEST_PATH, tsContent, 'utf8');

    await fs.writeFile(CACHE_PATH, `${JSON.stringify(nextCacheState, null, 2)}\n`, 'utf8');

    console.log(`[media] generated manifest at ${toPosix(path.relative(repoRoot, JSON_MANIFEST_PATH))}`);
}

main().catch((error) => {
    console.error(`[media] build failed: ${error.message}`);
    process.exit(1);
});
