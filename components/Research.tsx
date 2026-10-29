import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, ChevronDown, X } from 'lucide-react';
import { getMediaEntry, resolveMediaImage } from '../content/media';
import { researchData } from '../content/research';
import { researchFocus, researchInterests, researchMethods, researchQuestions } from '../content/research-focus';
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

const researchSections = [
  { id: 'research-overview', label: '研究概述' },
  { id: 'research-questions', label: '科学问题' },
  { id: 'research-methods', label: '方法视角' },
  { id: 'research-background', label: '本科背景' },
];
const primaryInterest = researchInterests.find((interest) => interest.id === researchFocus.primaryInterestId);

export const Research: React.FC = () => {
  const [activeSection, setActiveSection] = useState(researchSections[0].id);

  useEffect(() => {
    let frame = 0;
    const updateSection = () => {
      frame = 0;
      let active = researchSections[0].id;
      const activationLine = Math.min(200, window.innerHeight * 0.35);
      for (const section of researchSections) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= activationLine) active = section.id;
      }
      if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) {
        active = researchSections[researchSections.length - 1].id;
      }
      setActiveSection(active);
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(updateSection); };
    updateSection();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  const goToSection = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    section.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' });
    section.focus({ preventScroll: true });
  };

  return (
    <section className="ui-section page-gutter research-page" aria-labelledby="research-page-title">
      <div className="ui-shell">
        <header className="page-heading">
          <div><p className="eyebrow">01 / Academic interests</p><h1 id="research-page-title">Research</h1></div>
          <p className="heading-chinese">研究兴趣</p>
        </header>
        <div className="research-layout">
          <aside className="research-sidebar">
            <nav className="research-section-nav" aria-label="Research 章节">
              {researchSections.map((section, index) => (
                <button key={section.id} type="button" className="ui-focus-ring" aria-controls={section.id} aria-current={activeSection === section.id ? 'location' : undefined} onClick={() => goToSection(section.id)}>
                  <span className="mono" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{section.label}
                </button>
              ))}
            </nav>
            <p className="research-sidebar-field">Physical chemistry<br />Reaction dynamics</p>
          </aside>
          <div className="research-body">
            <section id="research-overview" className="research-section research-overview" tabIndex={-1} aria-labelledby="research-overview-title">
              <p className="eyebrow">Research focus</p>
              <h2 id="research-overview-title">{primaryInterest?.title}</h2>
              <p className="research-focus-english" lang="en">{primaryInterest?.english}</p>
              <p className="research-overview-copy">{researchFocus.overview}</p>
              <dl className="research-context">
                {researchInterests.filter((interest) => interest.id !== researchFocus.primaryInterestId).map((interest) => (
                  <div key={interest.id}><dt>{interest.context}</dt><dd>{interest.title}</dd></div>
                ))}
              </dl>
            </section>

            <section id="research-questions" className="research-section" tabIndex={-1} aria-labelledby="research-questions-title">
              <header className="research-section-heading"><p className="eyebrow">Scientific questions</p><h2 id="research-questions-title">关注的科学问题</h2></header>
              {researchQuestions.map((question) => (
                <article key={question.id} className="research-question">
                  <span className="index-number" aria-hidden="true">Q{question.id}</span>
                  <div>
                    <h3>{question.title}</h3>
                    <p className="research-question-copy">{question.summary}</p>
                    <details className="record-details research-question-details">
                      <summary className="ui-focus-ring" aria-label={'变量与观测：' + question.title}>变量与观测 <ChevronDown size={14} /></summary>
                      <dl>{question.details.map((detail) => <div key={detail.label}><dt>{detail.label}</dt><dd>{detail.body}</dd></div>)}</dl>
                    </details>
                  </div>
                </article>
              ))}
            </section>

            <section id="research-methods" className="research-section" tabIndex={-1} aria-labelledby="research-methods-title">
              <header className="research-section-heading"><p className="eyebrow">Experimental approaches</p><h2 id="research-methods-title">关注的实验方法</h2></header>
              <p className="research-section-copy">{researchFocus.methodsIntro}</p>
              <figure className="research-method-figure">
                <figcaption className="eyebrow">方法框架示意</figcaption>
                <ol className="research-method-flow">
                  {researchMethods.map((method, index) => (
                    <li key={method.id}>
                      <div className="research-method-step"><span className="mono">{method.id}</span>{index < researchMethods.length - 1 && <ArrowRight size={16} aria-hidden="true" />}</div>
                      <h3>{method.title}</h3>
                      <p className="research-method-english" lang="en">{method.english}</p>
                      <p className="research-method-copy">{method.summary}</p>
                    </li>
                  ))}
                </ol>
              </figure>
            </section>

            <section id="research-background" className="research-section research-background-link" tabIndex={-1} aria-labelledby="research-background-title">
              <div><p className="eyebrow">Earlier experience</p><h2 id="research-background-title">本科科研训练</h2><p>功能高分子材料 / 界面调控 / 性能优化</p></div>
              <Link to="/background" className="ui-focus-ring text-link">Background <ArrowUpRight size={16} /></Link>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};
