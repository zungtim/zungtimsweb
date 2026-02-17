import React, { useState } from 'react';
import { Microscope, FileText, FlaskConical, ChevronRight, Beaker, Cpu, Atom, BarChart3, Image as ImageIcon, Lightbulb, Clock, User } from 'lucide-react';

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
  citation?: string;
}

const researchData: ResearchItem[] = [
  {
    id: '1',
    type: 'research',
    title: '聚苯胺-碳纳米管/离子液体/ABS 复合材料的制备及性能研究',
    role: '第一负责人',
    date: '2025.10 - 2026.07',
    tags: ['SEM', '熔融共混', '电化学阻抗谱', '导电高分子', '材料表征'],
    background: '随着电子器件向轻量化、柔性化方向发展，传统金属导电材料已难以满足复杂场景需求。导电高分子材料因其可调节的电学性能和加工优势成为研究热点，然而如何实现导电填料在 ABS 基体中的均匀分散并构建高效导电网络仍面临挑战。',
    methodology: '本项目采用熔融共混法将聚苯胺-碳纳米管（PANI-MWCNT）导电填料与 ABS 基体复合，通过调控填料含量、偶联剂处理工艺及混合参数，优化复合材料的导电网络结构。利用扫描电镜（SEM）观察复合材料微观形貌，通过电化学阻抗谱（EIS）和四探针法表征其导电性能。',
    metrics: [
      '电导率提升 3 个数量级',
      '渗滤阈值降至 2.5 wt%',
      '室温电导率达 10 S/m'
    ],
    images: [
      { url: 'https://placehold.co/600x400/e2e8f0/475569?text=原理示意图', caption: '导电网络构建机理示意图' },
      { url: 'https://placehold.co/600x400/e2e8f0/475569?text=微观形貌图', caption: 'PANI-MWCNT/ABS 复合材料 SEM 形貌图' }
    ]
  },
  {
    id: '2',
    type: 'patent',
    title: '一种通过改性硅烷偶联剂增强粘附性的有机硅压敏胶',
    role: '第二发明人',
    date: '2025.07.01',
    tags: ['有机合成', '剥离强度测试', '压敏胶', '硅烷偶联剂'],
    background: '有机硅压敏胶广泛应用于电子制造、医疗器械等领域，但现有产品对金属、塑料等基材的粘附力不足，限制了其在复杂环境下的应用。开发高性能增粘剂是解决这一问题的关键。',
    methodology: '本专利通过合成改性硅烷偶联剂作为增粘剂，引入活性基团增强与压敏胶体系的相容性。改性偶联剂中的硅烷氧基可与基材表面形成化学键锚定，同时其有机链段与压敏胶产生物理缠绕，显著提升界面粘附强度。',
    metrics: [
      '剥离强度提升 80%',
      '耐高温性能提高至 200°C',
      '粘接耐久性测试 > 1000h'
    ],
    images: [
      { url: 'https://placehold.co/600x400/e2e8f0/475569?text=专利证书', caption: '专利授权证书' }
    ],
    citation: '朱贵有, 黄颂添, 刘毅. 一种通过改性硅烷偶联剂增强粘附性的有机硅压敏胶 [P]. 广东省: CN120230511A, 2025-07-01.'
  }
];

export const Research: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>(researchData[0].id);
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
                          <BarChart3 className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                          <span className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">Key Metrics</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {currentItem.metrics.map((metric, idx) => (
                            <div 
                              key={idx}
                              className={`bg-gradient-to-br ${colors.accent} bg-opacity-10 p-4 rounded-xl border border-transparent hover:border-current transition-all`}
                            >
                              <div className="text-sm font-medium text-slate-700 dark:text-slate-200">
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {currentItem.images.map((img, idx) => (
                            <div 
                              key={idx}
                              className="group rounded-xl overflow-hidden border border-slate-200 dark:border-slate-600"
                            >
                              <div className="relative aspect-video bg-slate-100 dark:bg-slate-700">
                                <img 
                                  src={img.url} 
                                  alt={img.caption}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                              </div>
                              <div className="p-3 bg-slate-50 dark:bg-slate-700/50">
                                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
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
      </div>
    </section>
  );
};
