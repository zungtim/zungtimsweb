import React, { useState, useEffect } from 'react';
import { Image, Loader2 } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface ImageLoaderProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean; // 是否优先加载（首屏内容）
  onLoad?: () => void;
  onError?: () => void;
}

type LoadingState = 'idle' | 'loading' | 'loaded' | 'error';

export const ImageLoader: React.FC<ImageLoaderProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  priority = false,
  onLoad,
  onError,
}) => {
  const [ref, isInView] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: '100px',
    triggerOnce: true,
  });
  const [state, setState] = useState<LoadingState>(priority ? 'loading' : 'idle');

  // 当进入视口时开始加载
  useEffect(() => {
    if ((isInView || priority) && state === 'idle') {
      setState('loading');
    }
  }, [isInView, priority, state]);

  // 图片加载处理
  const handleLoad = () => {
    setState('loaded');
    onLoad?.();
  };

  const handleError = () => {
    setState('error');
    onError?.();
  };

  const shouldLoad = state === 'loading' || state === 'loaded';

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${containerClassName}`}
    >
      {/* 骨架屏 */}
      {state !== 'loaded' && (
        <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      )}

      {/* 加载中图标 */}
      {state === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-slate-400 dark:text-slate-500 animate-spin" />
        </div>
      )}

      {/* 错误状态 */}
      {state === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-800">
          <Image className="w-12 h-12 text-slate-400 dark:text-slate-500 mb-2" />
          <span className="text-sm text-slate-500 dark:text-slate-400">加载失败</span>
        </div>
      )}

      {/* 实际图片 */}
      {shouldLoad && (
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`
            w-full h-full object-cover
            transition-opacity duration-500 ease-out
            ${state === 'loaded' ? 'opacity-100' : 'opacity-0'}
            ${className}
          `}
        />
      )}
    </div>
  );
};
