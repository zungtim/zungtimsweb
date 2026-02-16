import { useEffect, useState, useRef, RefObject } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
): [RefObject<T | null>, boolean] {
  const { threshold = 0.1, rootMargin = '50px', triggerOnce = true } = options;
  const ref = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsIntersecting(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isIntersecting];
}

// 用于预加载的 Hook
export function usePreloadImage(src: string | undefined): void {
  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.src = src;
  }, [src]);
}

// 用于分批加载的 Hook
export function useBatchLoad<T>(
  items: T[],
  batchSize: number = 6
): [T[], () => void, boolean] {
  const [visibleCount, setVisibleCount] = useState(batchSize);
  const [hasMore, setHasMore] = useState(items.length > batchSize);

  const loadMore = () => {
    const newCount = visibleCount + batchSize;
    if (newCount >= items.length) {
      setVisibleCount(items.length);
      setHasMore(false);
    } else {
      setVisibleCount(newCount);
    }
  };

  const visibleItems = items.slice(0, visibleCount);

  return [visibleItems, loadMore, hasMore];
}
