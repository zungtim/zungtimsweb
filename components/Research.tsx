import React, { useState, useEffect } from 'react';
import { Microscope, FileText, FlaskConical, ChevronRight, Beaker, BarChart3, Image as ImageIcon, Lightbulb, Clock, TrendingDown, Zap, Shield, X } from 'lucide-react';
import { getMediaEntry, resolveMediaImage } from '../content/media';
import type { ResearchImage, ResearchItem } from '../types';

const MetricIcon = ({ index }: { index: number }) => {
  const icons = [TrendingDown, Zap, Shield];
  const Icon = icons[index % icons.length];
  return <Icon className="w-5 h-5" />;
};

const researchIntro = '本科阶段科研实践以 ABS 抗静电复合材料和有机硅压敏胶为主要体系，围绕工程塑料抗静电改性、导电纳米填料分散与导电网络构筑、有机硅压敏胶的硅烷偶联界面粘附增强等方向展开，探究材料微观结构、界面作用与导电性能、力学性能及服役稳定性之间的关系。';

const researchData: ResearchItem[] = [
  {
    id: '1',
    type: 'research',
    title: '苯乙烯-马来酸酐共聚物接枝改性碳纳米管/ABS永久抗静电复合材料的制备及性能研究',
    role: '第一负责人',
    date: '2025.10 - 2026.07',
    status: '中期检查 · 方向调整',
    tags: ['SMA-g-CNT', '苯乙烯-马来酸酐共聚物', '氨基化碳纳米管', '界面相容性', '永久抗静电', 'ABS树脂'],
    sections: [
      {
        title: '研究问题',
        body: 'ABS 树脂具有良好的加工性能、力学性能和尺寸稳定性，但本征绝缘导致静电荷易在表面积聚，限制其在电子电器、精密制造和防静电包装等场景中的应用。碳纳米管具有优异导电性，但在 ABS 基体中易因范德华作用发生团聚，造成导电网络不连续、界面结合弱、应力传递效率不足，并可能引发加工流动性下降和力学性能损失。因此，该研究关注如何在较低 CNT 添加量下构建稳定导电通路，同时兼顾永久抗静电性能、分散稳定性与力学性能。',
      },
      {
        title: '阶段认识与方向调整',
        body: '项目初期以 PANI 包覆改性 CNT 与离子液体协同调控为切入点，尝试改善 CNT 在 ABS 基体中的分散状态并促进导电网络形成。随着实验推进，我发现 PANI 虽能辅助导电网络构筑，但由于 CNT 本身已具有较高导电性，其对体系导电性能提升的边际作用有限；同时，PANI 对 CNT 与 ABS 基体之间界面相容性的改善并不充分，难以有效兼顾抗静电性能与力学性能。基于这一认识，在老师指导下，我将研究重点调整为 SMA 接枝改性氨基化碳纳米管体系。',
      },
      {
        title: '当前技术路线',
        body: '当前路线首先通过混酸氧化在 CNT 表面引入羧基等活性基团，再经多乙烯多胺氨基化处理形成氨基化碳纳米管，为后续界面反应提供反应位点。随后利用 SMA-2000 中马来酸酐基团与氨基化 CNT 表面氨基发生界面反应，使 SMA 分子链接枝于 CNT 表面，制备 SMA-g-CNT 抗静电填料。SMA 的引入一方面有助于降低 CNT 团聚、改善其在 ABS 熔融加工过程中的分散稳定性；另一方面，其苯乙烯结构单元与 ABS 中 SAN 相具有较好的相容性，可在 CNT 与 ABS 基体之间形成界面过渡层，提高界面结合和应力传递效率。',
      },
      {
        title: '关键结果与价值',
        body: '实验结果表明，SMA-g-CNT 在保持 CNT 基本结构的同时改善了其在 ABS 中的分散与相容性，使复合材料在较低添加量下获得抗静电性能。SMA 接枝带来的界面相容性提升有助于增强应力传递效率，使复合材料在拉伸、弯曲和冲击性能方面表现出积极变化。该路线将导电填料分散调控与 ABS 界面相容性设计结合起来，为低添加量、长效型永久抗静电 ABS 工程塑料提供了更具兼容性的设计思路。',
      },
    ],
    metrics: [
      'SMA-g-CNT/ABS 表面电阻可降至约 5.6×10^8 Ω，达到抗静电材料要求',
      'SMA 接枝改善 CNT 在 ABS 中的分散与界面相容性',
      '3–4 wt% 添加量下拉伸与弯曲性能较纯 ABS 最高提升约 23.8% 和 15.2%'
    ],
    images: [
      {
        media: {
          module: 'research',
          entryId: 'antistatic-composite',
        },
        caption: '图1. 初期 PANI-A-CNT 抗静电剂合成及应用示意图'
      },
      {
        media: {
          module: 'research',
          entryId: 'sma-g-cnt-composite',
        },
        caption: '图2. SMA-g-CNT 的氧化、氨基化与 SMA 接枝改性路线示意图'
      }
    ]
  },
  {
    id: '2',
    type: 'patent',
    title: '一种通过改性硅烷偶联剂增强粘附性的有机硅压敏胶',
    role: '第二发明人',
    date: '2025.07.01',
    status: '专利公开',
    tags: ['有机硅压敏胶', 'KH560', '硅烷偶联剂', '界面粘附', '剥离强度', '持粘力'],
    sections: [
      {
        title: '研究问题',
        body: '有机硅压敏胶具有优异的耐高低温、耐候性、低介电性和对低表面能材料的适应性，在电子保护膜、汽车玻璃、制程保护材料等领域具有应用潜力。然而，传统有机硅压敏胶在部分极性或复杂界面基材上仍存在初始粘附不足、剥离强度有限和长期持粘稳定性不足等问题。因此，该研究关注如何通过偶联剂改性和界面增强策略提高有机硅压敏胶的粘附可靠性。',
      },
      {
        title: '技术路线',
        body: '该专利以丙烯酸改性有机硅树脂为主体，引入 KH560 基改性硅烷偶联剂构建界面增强体系。改性硅烷偶联剂通过壳聚糖液、硝酸钇、硅酸钠、氮化硼预处理剂、纳米硅溶胶、羟基磷灰石和盐酸多巴胺等组分协同改性。该设计结合硅烷偶联反应、无机纳米粒子增强、多巴胺类粘附基团以及界面物理嵌锁效应，以提升胶层与基材之间的界面结合强度。',
      },
      {
        title: '实验与评价',
        body: '压敏胶体系由有机硅树脂、丙烯酸酯单体、改性硅烷偶联剂、交联剂和催化剂组成，经共混与热处理得到有机硅压敏胶。专利通过实施例与对比例比较改性硅烷偶联剂及其关键组分对粘附性能的影响，评价指标包括剥离力、持粘力以及不同温度条件下的粘附稳定性。',
      },
      {
        title: '关键结果与应用价值',
        body: '专利文本显示，该体系在常温和高温条件下剥离力可达 1500 gf/inch，在低温和高温条件下可达 1200 gf/inch；持粘性能可达到 1 kg/72 h 无位移，并可在 -50°C 至 100°C 范围内保持较好的粘附性能。该方案通过偶联剂分子设计与多组分界面增强，提高了有机硅压敏胶在复杂服役环境下的粘附可靠性，适用于电子保护、耐温胶带和功能性界面材料等方向。',
      },
    ],
    metrics: [
      '常温和高温条件下剥离力可达 1500 gf/inch',
      '低温和高温条件下剥离力可达 1200 gf/inch',
      '1 kg/72 h 持粘无位移；适用 -50°C 至 100°C'
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

const resolveResearchImage = (image: ResearchImage, preferred: 'md' | 'lg') => {
    if (image.media) {
        return resolveMediaImage(getMediaEntry(image.media)?.cover, preferred);
    }

    return image.url ? { src: image.url, srcSet: undefined } : undefined;
};

const getResearchImageKey = (image: ResearchImage) => {
    return image.media ? `${image.media.module}-${image.media.entryId}` : image.url ?? image.caption;
};

const getSectionIcon = (title: string) => {
    if (title.includes('技术')) {
        return Beaker;
    }

    if (title.includes('实验')) {
        return Microscope;
    }

    if (title.includes('关键')) {
        return BarChart3;
    }

    return Lightbulb;
};

const sectionIconStyles = [
    'text-amber-500 dark:text-amber-400',
    'text-cyan-500 dark:text-cyan-400',
    'text-blue-500 dark:text-blue-400',
    'text-teal-600 dark:text-teal-300',
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
                <div className="mb-12 max-w-4xl">
                    <div className="ui-chip mb-6 inline-flex items-center justify-center rounded-2xl p-3 text-secondary dark:text-slate-300">
                        <Microscope className="h-8 w-8" />
                    </div>
                    <h2 className="mb-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">科研实践</h2>
                    <p className="text-lg font-serif text-slate-500 dark:text-slate-400">Research Direction & Selected Projects</p>
                    <p className="mt-5 max-w-3xl text-base leading-8 text-slate-700 dark:text-slate-300">
                        {researchIntro}
                    </p>
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
                                                <p className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${colors.chip}`}>
                                                    {item.status}
                                                </p>
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
                                    <div className="flex flex-wrap items-center gap-2">
                                        <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] ${activeColors.chip}`}>
                                            {getTypeIcon(currentItem.type)}
                                            {currentItem.type === 'research' ? 'Research Project' : 'Patent'}
                                        </div>
                                        <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${activeColors.chip}`}>
                                            <Shield className="h-3.5 w-3.5" />
                                            项目进度：{currentItem.status}
                                        </div>
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
                                        Evidence Highlights
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

                            {currentItem.sections.map((section, index) => {
                                const SectionIcon = getSectionIcon(section.title);
                                const iconStyle = sectionIconStyles[index % sectionIconStyles.length];

                                return (
                                    <section
                                        key={section.title}
                                        className="grid gap-4 border-t border-slate-200/80 py-6 md:grid-cols-[170px_minmax(0,1fr)] dark:border-slate-700/80"
                                    >
                                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                                            <SectionIcon className={`h-4 w-4 ${iconStyle}`} />
                                            {section.title}
                                        </div>
                                        <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">{section.body}</p>
                                    </section>
                                );
                            })}

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
                                        {currentItem.images.map((image) => {
                                            const resolvedImage = resolveResearchImage(image, 'md');
                                            if (!resolvedImage) {
                                                return null;
                                            }

                                            return (
                                                <div
                                                    key={getResearchImageKey(image)}
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
                                                            src={resolvedImage.src}
                                                            srcSet={resolvedImage.srcSet}
                                                            sizes="(max-width: 1024px) 100vw, 900px"
                                                            alt={image.caption}
                                                            className="h-auto w-full object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                                                        />
                                                    </div>
                                                    <div className="border-t border-slate-200/80 px-4 py-3 dark:border-slate-700/80">
                                                        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">{image.caption}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </section>
                            )}
                        </div>
                    </article>
                </div>

                {selectedImage && (
                    (() => {
                        const resolvedImage = resolveResearchImage(selectedImage, 'lg');
                        if (!resolvedImage) {
                            return null;
                        }

                        return (
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
                                        src={resolvedImage.src}
                                        srcSet={resolvedImage.srcSet}
                                        sizes="100vw"
                                        alt={selectedImage.caption}
                                        className="max-h-[calc(100%-40px)] max-w-full rounded-2xl object-contain shadow-2xl"
                                    />
                                    <p className="mt-3 text-center text-sm font-medium text-white/80">{selectedImage.caption}</p>
                                </div>
                            </div>
                        );
                    })()
                )}
            </div>
        </section>
    );
};
