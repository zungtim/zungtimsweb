import React, { useState, useEffect } from 'react';
import { Microscope, FileText, FlaskConical, ChevronRight, Beaker, BarChart3, Image as ImageIcon, Lightbulb, Clock, TrendingDown, Zap, Shield, X } from 'lucide-react';
import type { ResearchImage, ResearchItem } from '../types';

const MetricIcon = ({ index }: { index: number }) => {
  const icons = [TrendingDown, Zap, Shield];
  const Icon = icons[index % icons.length];
  return <Icon className="w-5 h-5" />;
};

const researchData: ResearchItem[] = [
  {
    id: '1',
    type: 'research',
    title: '聚苯胺-氨基化碳纳米管/离子液体/ABS 抗静电复合材料的制备及性能研究',
    role: '第一负责人',
    date: '2025.10 - 2026.07',
    tags: ['原位聚合', '熔融共混', 'SEM表征', '高分子复合材料', '抗静电技术'],
    background: 'ABS 树脂作为通用工程塑料，因高绝缘性易积聚静电而限制了其在精密电子领域的应用。传统碳纳米管 (CNT) 填料虽导电性好，但极易团聚，导致添加量大且严重损害材料力学性能。本课题旨在开发一种低添加量、高分散性且机械性能优异的新型抗静电复合材料。',
    methodology: '采用"核壳结构设计 + 离子液体协同"双重策略。首先通过原位乳液聚合，将导电聚苯胺 (PANI) 接枝于氨基化碳纳米管表面，构建 PANI-A-CNT 核壳结构以改善界面相容性；随后引入离子液体 (C12mimBr) 作为分散助剂，通过熔融共混法制备复合材料，成功构建了高效的三维导电网络。',
    metrics: [
      '表面电阻率降至 10⁸ Ω (抗静电级)',
      '填料分散性显著提升 (SEM证实)',
      '耐水洗性能与力学强度同步增强'
    ],
    images: [
      { url: '/photo/Research/1.png', caption: '图1. PANI-A-CNT抗静电剂的合成路线及在ABS基体中的分散机理示意图' }
    ]
  },
  {
    id: '2',
    type: 'patent',
    title: '一种通过改性硅烷偶联剂增强粘附性的有机硅压敏胶',
    role: '第二发明人',
    date: '2025.07.01',
    tags: ['有机合成', '改性硅烷', '仿生粘附', '压敏胶(PSA)', 'CN发明专利'],
    background: '随着电子工业的发展，对耐高温胶带的需求日益增加。传统的有机硅压敏胶虽然耐候性好，但对聚酰亚胺（PI）、聚酯（PET）等极性基材的初始粘附力较差，且在高温高湿环境下容易出现残胶或脱落现象，难以满足高端制程保护的需求。',
    methodology: '本项目创新性地引入"仿生化学"理念。首先利用盐酸多巴胺、纳米硅溶胶和羟基磷灰石制备复合改性液，对硅烷偶联剂（KH-570）进行表面功能化修饰，合成了一种新型增粘剂。随后将其与有机硅树脂、丙烯酸酯单体进行交联共聚。该改性剂利用多巴胺的强粘附基团和纳米粒子的锚定作用，在胶层与基材界面形成了牢固的化学键合与物理嵌锁。',
    metrics: [
      '显著提升剥离强度 (Peel Strength)',
      '优异的耐高温性能 (180°C/24h无残胶)',
      '解决了传统胶粘剂对极性基材界面结合力差的痛点'
    ],
    images: [
      { url: '/photo/Research/patent-cert.png', caption: '图2. 发明专利公开说明书首页 (CN 120230511 A)' }
    ],
    citation: (
      <>
        [1] 朱贵有, <span className="font-bold text-slate-900 dark:text-slate-100 border-b-2 border-blue-300 dark:border-blue-600">黄颂添</span>, 刘毅. 一种通过改性硅烷偶联剂增强粘附性的有机硅压敏胶 [P]. 广东省: CN120230511A, 2025-07-01.
      </>
    )
  }
];

export const Research: React.FC = () => {
    const [activeItem, setActiveItem] = useState<string>(researchData[0].id);
    const [selectedImage, setSelectedImage] = useState<ResearchImage | null>(null);
    const currentItem = researchData.find((item) => item.id === activeItem) || researchData[0];

    useEffect(() => {
        if (!selectedImage) {
            return;
        }

        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setSelectedImage(null);
            }
        };

        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [selectedImage]);

    const getTypeIcon = (type: 'research' | 'patent') => {
        return type === 'research' ? <FlaskConical className="h-5 w-5" /> : <FileText className="h-5 w-5" />;
    };

    const getTypeColor = (type: 'research' | 'patent') => {
        return type === 'research'
            ? {
                chip: 'bg-slate-100 text-secondary dark:bg-slate-800 dark:text-slate-300',
                text: 'text-secondary dark:text-slate-300',
                border: 'border-secondary/25 dark:border-slate-500',
                accent: 'bg-secondary',
            }
            : {
                chip: 'bg-teal-50 text-teal-700 dark:bg-teal-900/25 dark:text-teal-300',
                text: 'text-teal-700 dark:text-teal-300',
                border: 'border-teal-300/70 dark:border-teal-700/60',
                accent: 'bg-teal-500',
            };
    };

    const activeColors = getTypeColor(currentItem.type);

    return (
        <section className="ui-section px-4 sm:px-6 lg:px-8">
            <div className="ui-shell">
                <div className="mb-12 max-w-2xl">
                    <div className="ui-chip mb-6 inline-flex items-center justify-center rounded-2xl p-3 text-secondary dark:text-slate-300">
                        <Microscope className="h-8 w-8" />
                    </div>
                    <h2 className="mb-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">科研实践</h2>
                    <p className="text-lg font-serif text-slate-500 dark:text-slate-400">Research & Projects Portfolio</p>
                </div>

                <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
                    <aside className="self-start lg:sticky lg:top-24">
                        <div className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                            Selected Work
                        </div>
                        <div className="space-y-3">
                            {researchData.map((item, index) => {
                                const colors = getTypeColor(item.type);
                                const isActive = activeItem === item.id;

                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => setActiveItem(item.id)}
                                        className={`ui-focus-ring relative w-full overflow-hidden rounded-[1.5rem] border px-4 py-4 text-left transition-all duration-300 ${
                                            isActive
                                                ? `border-slate-300/90 bg-white/85 shadow-sm dark:border-slate-600 dark:bg-slate-900/70 ${colors.text}`
                                                : 'border-transparent bg-transparent hover:border-slate-200/80 hover:bg-white/45 dark:hover:border-slate-700/80 dark:hover:bg-slate-900/35'
                                        }`}
                                    >
                                        <div className={`absolute inset-y-4 left-0 w-1 rounded-full ${isActive ? colors.accent : 'bg-transparent'}`} />
                                        <div className="flex items-start gap-3">
                                            <div className="mt-0.5 text-xs font-mono text-slate-400 dark:text-slate-500">0{index + 1}</div>
                                            <div className="min-w-0 flex-1">
                                                <div className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${colors.chip}`}>
                                                    {getTypeIcon(item.type)}
                                                    {item.type === 'research' ? 'Research' : 'Patent'}
                                                </div>
                                                <h3 className="mt-3 line-clamp-2 text-sm font-semibold leading-relaxed text-slate-900 dark:text-white">
                                                    {item.title}
                                                </h3>
                                                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{item.role}</p>
                                            </div>
                                            <ChevronRight className={`mt-1 h-4 w-4 shrink-0 transition-transform ${isActive ? 'rotate-90 text-slate-500 dark:text-slate-300' : 'text-slate-300 dark:text-slate-600'}`} />
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </aside>

                    <article className="ui-surface overflow-hidden rounded-[2rem]">
                        <div className="border-b border-slate-200/80 px-6 py-7 dark:border-slate-700/80 sm:px-8 sm:py-8">
                            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                                <div className="min-w-0">
                                    <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] ${activeColors.chip}`}>
                                        {getTypeIcon(currentItem.type)}
                                        {currentItem.type === 'research' ? 'Research Project' : 'Patent'}
                                    </div>
                                    <h3 className="mt-4 text-2xl font-bold leading-tight text-slate-900 dark:text-white sm:text-[2rem]">
                                        {currentItem.title}
                                    </h3>
                                </div>

                                <div className="flex shrink-0 flex-col gap-2 text-sm text-slate-500 dark:text-slate-400 lg:items-end">
                                    <div className="inline-flex items-center gap-1.5 font-mono">
                                        <Clock className="h-4 w-4" />
                                        {currentItem.date}
                                    </div>
                                    <div className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${activeColors.chip}`}>
                                        {currentItem.role}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 sm:px-8">
                            <section className="py-6">
                                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Keywords</div>
                                <div className="mt-4 flex flex-wrap gap-2.5">
                                    {currentItem.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-full border border-slate-200/80 bg-white/70 px-3 py-1.5 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </section>

                            {currentItem.metrics.length > 0 && (
                                <section className="border-t border-slate-200/80 py-6 dark:border-slate-700/80">
                                    <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                                        <BarChart3 className={`h-4 w-4 ${activeColors.text}`} />
                                        Key Metrics
                                    </div>
                                    <div className="grid gap-4 lg:grid-cols-3">
                                        {currentItem.metrics.map((metric, index) => (
                                            <div
                                                key={metric}
                                                className={`rounded-[1.5rem] border p-4 ${activeColors.border} bg-slate-50/80 dark:bg-slate-800/70`}
                                            >
                                                <div className={`mb-3 inline-flex rounded-xl p-2 ${activeColors.chip}`}>
                                                    <MetricIcon index={index} />
                                                </div>
                                                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">{metric}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            <section className="grid gap-4 border-t border-slate-200/80 py-6 md:grid-cols-[170px_minmax(0,1fr)] dark:border-slate-700/80">
                                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                                    <Lightbulb className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                                    Background
                                </div>
                                <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">{currentItem.background}</p>
                            </section>

                            <section className="grid gap-4 border-t border-slate-200/80 py-6 md:grid-cols-[170px_minmax(0,1fr)] dark:border-slate-700/80">
                                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                                    <Beaker className="h-4 w-4 text-cyan-500 dark:text-cyan-400" />
                                    Methodology
                                </div>
                                <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">{currentItem.methodology}</p>
                            </section>

                            {currentItem.type === 'patent' && currentItem.citation && (
                                <section className="grid gap-4 border-t border-slate-200/80 py-6 md:grid-cols-[170px_minmax(0,1fr)] dark:border-slate-700/80">
                                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                                        <FileText className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                                        Citation
                                    </div>
                                    <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50/80 p-5 text-sm leading-7 text-slate-700 dark:border-slate-700 dark:bg-slate-900/45 dark:text-slate-300">
                                        {currentItem.citation}
                                    </div>
                                </section>
                            )}

                            {currentItem.images.length > 0 && (
                                <section className="border-t border-slate-200/80 py-6 dark:border-slate-700/80">
                                    <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                                        <ImageIcon className="h-4 w-4" />
                                        Gallery
                                    </div>
                                    <div className="grid gap-5">
                                        {currentItem.images.map((image) => (
                                            <div
                                                key={image.url}
                                                onClick={() => setSelectedImage(image)}
                                                className="ui-focus-ring group cursor-pointer overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-slate-50/60 transition-all duration-300 hover:border-slate-300 hover:shadow-md dark:border-slate-700/80 dark:bg-slate-900/45"
                                                tabIndex={0}
                                                role="button"
                                                onKeyDown={(event) => {
                                                    if (event.key === 'Enter' || event.key === ' ') {
                                                        event.preventDefault();
                                                        setSelectedImage(image);
                                                    }
                                                }}
                                            >
                                                <div className="bg-slate-100 dark:bg-slate-800">
                                                    <img
                                                        src={image.url}
                                                        alt={image.caption}
                                                        className="h-auto w-full object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                                                    />
                                                </div>
                                                <div className="border-t border-slate-200/80 px-4 py-3 dark:border-slate-700/80">
                                                    <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">{image.caption}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>
                    </article>
                </div>

                {selectedImage && (
                    <div
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 px-4 pb-4 pt-20"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            type="button"
                            onClick={() => setSelectedImage(null)}
                            className="ui-focus-ring fixed right-4 top-20 z-10 rounded-full bg-white/90 p-3 text-slate-700 shadow-lg transition-colors hover:bg-white"
                            aria-label="Close research image preview"
                        >
                            <X className="h-6 w-6" />
                        </button>
                        <div
                            className="relative flex h-full w-full max-w-5xl flex-col items-center justify-center"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <img
                                src={selectedImage.url}
                                alt={selectedImage.caption}
                                className="max-h-[calc(100%-40px)] max-w-full rounded-2xl object-contain shadow-2xl"
                            />
                            <p className="mt-3 text-center text-sm font-medium text-white/80">{selectedImage.caption}</p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};
