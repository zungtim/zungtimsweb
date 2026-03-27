import { useEffect } from 'react';

const preloadedUrls = new Set<string>();
const startedBatches = new Set<string>();

function preloadSingleImage(url: string): Promise<void> {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = url;
    });
}

async function preloadWithConcurrency(urls: string[], concurrency: number): Promise<void> {
    const queue = urls.filter((url) => !preloadedUrls.has(url));
    if (queue.length === 0) {
        return;
    }

    let cursor = 0;
    const workerCount = Math.max(1, Math.min(concurrency, queue.length));
    const workers = Array.from({ length: workerCount }, async () => {
        while (cursor < queue.length) {
            const index = cursor;
            cursor += 1;
            const url = queue[index];
            preloadedUrls.add(url);
            await preloadSingleImage(url);
        }
    });

    await Promise.all(workers);
}

export function useImagePreloadQueue(urls: string[], concurrency: number = 4): void {
    useEffect(() => {
        const uniqueUrls = Array.from(new Set(urls.filter(Boolean)));
        if (uniqueUrls.length === 0) {
            return;
        }

        const batchKey = uniqueUrls.join('|');
        if (startedBatches.has(batchKey)) {
            return;
        }
        startedBatches.add(batchKey);

        const timer = window.setTimeout(() => {
            void preloadWithConcurrency(uniqueUrls, concurrency);
        }, 0);

        return () => {
            window.clearTimeout(timer);
        };
    }, [urls, concurrency]);
}
