import React from 'react';
import { Education } from './Education';
import { ResearchArchive } from './Research';
import { Achievements } from './Achievements';

export const Background: React.FC = () => (
  <section className="ui-section page-gutter">
    <div className="ui-shell">
      <header className="page-heading"><div><p className="eyebrow">02 / Education & experience</p><h1>Background</h1></div><p className="heading-chinese">教育与经历</p></header>
      <section className="background-section" aria-labelledby="education-title"><h2 id="education-title">教育背景 <span className="muted text-sm ml-3">Education</span></h2><Education /></section>
      <section className="background-section" aria-labelledby="archive-title"><h2 id="archive-title">本科科研训练 <span className="muted text-sm ml-3">Research archive</span></h2><ResearchArchive /></section>
      <section aria-labelledby="honors-title"><h2 id="honors-title" className="text-xl font-medium mb-7">代表性荣誉 <span className="muted text-sm ml-3">Honors</span></h2><Achievements /></section>
    </div>
  </section>
);
