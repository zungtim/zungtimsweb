import React, { useState } from 'react';
import { Microscope, FileText, FlaskConical, ChevronRight, Beaker, BarChart3, Image as ImageIcon, Lightbulb, Clock, TrendingDown, Zap, Shield, X } from 'lucide-react';

const MetricIcon = ({ index }: { index: number }) => {
  const icons = [TrendingDown, Zap, Shield];
  const Icon = icons[index % icons.length];
  return <Icon className="w-5 h-5" />;
};

interface ResearchImage {
  url: string;
  caption: string;
}

interface ResearchItem {
  id: string;
  type: 'research' | 'patent';
  title: string;
  role: string;
  date: string;
  tags: string[];
  background: string;
  methodology: string;
  metrics: string[];
  images: ResearchImage[];
  citation?: React.ReactNode;
}

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
  const currentItem = researchData.find(item => item.id === activeItem) || researchData[0];

  const getTypeIcon = (type: 'research' | 'patent') => {
    return type === 'research' ? <FlaskConical className="w-6 h-6" /> : <FileText className="w-6 h-6" />;
  };

  const getTypeColor = (type: 'research' | 'patent') => {
    return type === 'research'
      ? { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-600 dark:text-purple-400', border: 'border-purple-300 dark:border-purple-600', accent: 'from-purple-500 to-indigo-500' }
      : { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-300 dark:border-blue-600', accent: 'from-blue-500 to-cyan-500' };
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-purple-100 dark:bg-purple-900/30 rounded-2xl text-purple-600 dark:text-purple-400 mb-6">
            <Microscope className="w-8 h-8" />
          </div>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">科研实践</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg">Research & Projects Portfolio</p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Navigation */}
          <div className="lg:col-span-4 space-y-4">
            {researchData.map((item) => {
              const colors = getTypeColor(item.type);
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(item.id)}
                  className={`w-full text-left p-5 rounded-2xl transition-all duration-300 border ${
                    activeItem === item.id
                      ? `bg-white dark:bg-slate-800 shadow-lg ${colors.border}`
                      : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2.5 rounded-xl ${colors.bg} ${colors.text}`}>
                      {getTypeIcon(item.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs font-semibold uppercase tracking-wider mb-1 ${colors.text}`}>
                        {item.type === 'research' ? 'Research' : 'Patent'}
                      </div>
                      <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-2 text-sm">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`px-2 py-0.5 text-xs rounded-full ${colors.bg} ${colors.text}`}>
                          {item.role}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform flex-shrink-0 mt-1 ${
                      activeItem === item.id ? 'rotate-90 text-purple-500' : 'text-slate-400'
                    }`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-3xl p-8 h-full shadow-md hover:shadow-xl transition-all duration-300">
              {(() => {
                const colors = getTypeColor(currentItem.type);
                return (
                  <>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
                      <div>
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 ${colors.bg} ${colors.text}`}>
                          {getTypeIcon(currentItem.type)}
                          {currentItem.type === 'research' ? 'Research Project' : 'Patent'}
                        </div>
                        <h3 className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                          {currentItem.title}
                        </h3>
                      </div>
                      <div className="text-right flex-shrink-0 ml-4">
                        <div className="flex items-center gap-1.5 text-sm font-mono text-slate-500 dark:text-slate-400">
                          <Clock className="w-4 h-4" />
                          {currentItem.date}
                        </div>
                        <div className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text}`}>
                          {currentItem.role}
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 flex-wrap">
                        {currentItem.tags.map((tag, idx) => (
                          <span 
                            key={idx} 
                            className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium rounded-full border border-slate-200 dark:border-slate-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Metrics Highlight */}
                    {currentItem.metrics.length > 0 && (
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                          <BarChart3 className={`w-4 h-4 ${colors.text}`} />
                          <span className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">Key Metrics</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {currentItem.metrics.map((metric, idx) => (
                            <div 
                              key={idx}
                              className={`flex items-start gap-3 bg-gradient-to-br ${colors.accent.includes('purple') ? 'from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20' : 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20'} p-4 rounded-xl border ${colors.border} hover:shadow-md transition-all`}
                            >
                              <div className={`p-2 rounded-lg ${colors.bg} ${colors.text}`}>
                                <MetricIcon index={idx} />
                              </div>
                              <div className="text-sm font-medium text-slate-700 dark:text-slate-200 leading-snug">
                                {metric}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Background */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Lightbulb className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                        <span className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">Background</span>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-5 border border-slate-200 dark:border-slate-600">
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                          {currentItem.background}
                        </p>
                      </div>
                    </div>

                    {/* Methodology */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Beaker className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                        <span className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">Methodology</span>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-5 border border-slate-200 dark:border-slate-600">
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                          {currentItem.methodology}
                        </p>
                      </div>
                    </div>

                    {/* Citation for Patent */}
                    {currentItem.type === 'patent' && currentItem.citation && (
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                          <FileText className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                          <span className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">Citation</span>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl border border-blue-200 dark:border-blue-800">
                          <p className="font-mono text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            {currentItem.citation}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Image Gallery */}
                    {currentItem.images.length > 0 && (
                      <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-2 mb-4">
                          <ImageIcon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                          <span className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">Gallery</span>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                          {currentItem.images.map((img, idx) => (
                            <div 
                              key={idx}
                              onClick={() => setSelectedImage(img)}
                              className="group cursor-pointer rounded-xl overflow-hidden border border-slate-200 dark:border-slate-600 hover:shadow-lg transition-all"
                            >
                              <div className="relative bg-slate-100 dark:bg-slate-700">
                                <img 
                                  src={img.url} 
                                  alt={img.caption}
                                  className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                                />
                              </div>
                              <div className="p-3 bg-slate-50 dark:bg-slate-700/50">
                                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium text-center">
                                  {img.caption}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 pt-20 pb-4 px-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="fixed top-20 right-4 z-10 p-3 rounded-full bg-white/90 text-slate-700 hover:bg-white shadow-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div 
              className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage.url} 
                alt={selectedImage.caption}
                className="max-w-full max-h-[calc(100%-40px)] object-contain rounded-lg shadow-2xl"
              />
              <p className="text-sm text-white/80 font-medium text-center mt-3">
                {selectedImage.caption}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
