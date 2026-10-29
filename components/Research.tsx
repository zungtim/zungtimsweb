import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronDown, X } from 'lucide-react';
import { getMediaEntry, resolveMediaImage } from '../content/media';
import { researchData } from '../content/research';
import { researchInterests } from '../content/profile';
import { useDialog } from '../hooks/useDialog';
import type { ResearchImage } from '../types';

const resolveResearchImage = (image: ResearchImage, preferred: 'md' | 'lg') => image.media
  ? resolveMediaImage(getMediaEntry(image.media)?.cover, preferred)
  : image.url ? { src: image.url, srcSet: undefined } : undefined;

export const ResearchArchive: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ResearchImage | null>(null);
  const dialogRef = useDialog(selectedImage !== null, () => setSelectedImage(null));
  const previewImage = selectedImage ? resolveResearchImage(selectedImage, 'lg') : undefined;

  return (
    <>
      {researchData.map((item) => (
        <article key={item.id} className="archive-record">
          <div className="archive-heading">
            <div className="record-date">{item.date}<p>{item.type === 'patent' ? 'Patent' : 'Research training'}</p></div>
            <div><h3>{item.title}</h3><p>{item.subtitle} · {item.role}{item.type === 'patent' ? ' · 专利公开' : ''}</p><p>{item.tags.join(' / ')}</p></div>
          </div>
          <details className="record-details">
            <summary className="ui-focus-ring">原始记录与图片 <ChevronDown className="h-4 w-4" /></summary>
            <div className="archive-detail-body">
              <p className="record-copy">记录状态：{item.status}</p>
              {item.sections.map((section) => <section key={section.title}><h4>{section.title}</h4><p>{section.body}</p></section>)}
              <section><h4>结果记录</h4><ul>{item.metrics.map((metric) => <li key={metric}>{metric}</li>)}</ul></section>
              {item.citation && <section className="record-copy">{item.citation}</section>}
              <div className="research-figures">
                {item.images.map((image) => {
                  const resolved = resolveResearchImage(image, 'md');
                  if (!resolved) return null;
                  return <button key={image.caption} type="button" className="ui-focus-ring research-figure" onClick={() => setSelectedImage(image)} aria-label={image.caption} aria-haspopup="dialog"><img src={resolved.src} srcSet={resolved.srcSet} sizes="(max-width: 640px) 100vw, 400px" alt={image.caption} loading="lazy" /><span>{image.caption}</span></button>;
                })}
              </div>
            </div>
          </details>
        </article>
      ))}
      {selectedImage && previewImage && <div ref={dialogRef} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 px-4 pb-6 pt-20" onClick={() => setSelectedImage(null)} role="dialog" aria-modal="true" aria-label={selectedImage.caption} tabIndex={-1}>
        <button type="button" onClick={() => setSelectedImage(null)} data-dialog-close className="ui-focus-ring ui-dialog-close absolute right-4 top-4 z-10" aria-label="Close research image preview" title="关闭"><X className="h-6 w-6" /></button>
        <div className="relative flex h-full w-full max-w-5xl flex-col items-center justify-center" onClick={(event) => event.stopPropagation()}><img src={previewImage.src} srcSet={previewImage.srcSet} sizes="100vw" alt={selectedImage.caption} className="min-h-0 w-full flex-1 object-contain" /><p className="mt-3 shrink-0 text-center text-sm text-white/90">{selectedImage.caption}</p></div>
      </div>}
    </>
  );
};

export const Research: React.FC = () => (
  <section className="ui-section page-gutter">
    <div className="ui-shell">
      <header className="page-heading"><div><p className="eyebrow">01 / Academic interests</p><h1>Research</h1></div><p className="heading-chinese">研究兴趣</p></header>
      <div>
        {researchInterests.map((interest) => <article key={interest.id} className="research-interest"><span className="index-number">{interest.id}</span><div><h2>{interest.title}</h2><p>{interest.english}</p></div></article>)}
      </div>
      <div className="research-background-link"><div><h2>本科科研训练</h2><p>功能高分子材料 / 界面调控 / 性能优化</p></div><Link to="/background" className="ui-focus-ring text-link">Background <ArrowUpRight className="h-4 w-4" /></Link></div>
    </div>
  </section>
);
