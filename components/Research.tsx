import React, { useState } from 'react';
import { Microscope, FileText, FlaskConical, ChevronRight } from 'lucide-react';

interface ResearchItem {
  id: string;
  type: 'research' | 'patent';
  title: string;
  role: string;
  date: string;
  description?: string;
  details?: { label: string; content: string }[];
  citation?: React.ReactNode;
}

const researchData: ResearchItem[] = [
  {
    id: '1',
    type: 'research',
    title: '聚苯胺-碳纳米管/离子液体/ABS 复合材料的制备及性能研究',
    role: '第一负责人',
    date: '2025.10 - 2026.07',
    details: [
      { label: '课题描述', content: '研究导电高分子材料在 ABS 基体中的分散性与导电网络构建机制，探索复合材料微观结构与宏观性能的构效关系。' },
      { label: '核心工作', content: '负责实验方案的整体设计、复合材料制备工艺（熔融共混与溶液混合）的优化，以及电化学性能（电导率、阻抗谱）的测试与分析。' },
      { label: '项目成果', content: '成功制备出低渗滤阈值的高电导率复合材料，并在校级科研展示中获得优秀评价，撰写结题报告一份。' }
    ]
  },
  {
    id: '2',
    type: 'patent',
    title: '一种通过改性硅烷偶联剂增强粘附性的有机硅压敏胶',
    role: '第二发明人',
    date: '2025.07.01',
    description: '该项目主要针对现有有机硅压敏胶对基材粘附力不足的问题，通过合成新型改性硅烷偶联剂作为增粘剂，显著提升了压敏胶的剥离强度和耐高温性能。',
    citation: '[1] 朱贵有, 黄颂添, 刘毅. 一种通过改性硅烷偶联剂增强粘附性的有机硅压敏胶 [P]. 广东省: CN120230511A, 2025-07-01.'
  }
];

export const Research: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>(researchData[0].id);
  const currentItem = researchData.find(item => item.id === activeItem) || researchData[0];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-purple-100 dark:bg-purple-900/30 rounded-2xl text-purple-600 dark:text-purple-400 mb-6">
            <Microscope className="w-8 h-8" />
          </div>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">科研实践</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg">Research & Projects Practice</p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Navigation */}
          <div className="lg:col-span-4 space-y-4">
            {researchData.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`w-full text-left p-6 rounded-3xl transition-all duration-300 border border-slate-200 dark:border-slate-700 ${
                  activeItem === item.id
                    ? 'bg-white dark:bg-slate-800 shadow-lg border-purple-300 dark:border-purple-600'
                    : 'bg-white dark:bg-slate-800/80 hover:border-purple-200 dark:hover:border-purple-800 hover:shadow-md'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${
                    item.type === 'research' 
                      ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                      : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  }`}>
                    {item.type === 'research' ? <FlaskConical className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-xs font-semibold uppercase tracking-wider mb-1 ${
                      item.type === 'research' ? 'text-purple-600 dark:text-purple-400' : 'text-blue-600 dark:text-blue-400'
                    }`}>
                      {item.type === 'research' ? 'Research Experience' : 'Patent'}
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-2 text-sm">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        item.type === 'research'
                          ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                          : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      }`}>
                        {item.role}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-transform ${
                    activeItem === item.id ? 'rotate-90 text-purple-500' : 'text-slate-400'
                  }`} />
                </div>
              </button>
            ))}
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-3xl p-8 h-full shadow-md hover:shadow-xl transition-all duration-300">
              {/* Header */}
              <div className="flex items-start justify-between mb-8 pb-6 border-b border-slate-200 dark:border-slate-700">
                <div>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 ${
                    currentItem.type === 'research'
                      ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                      : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                  }`}>
                    {currentItem.type === 'research' ? <FlaskConical className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                    {currentItem.type === 'research' ? 'Research Project' : 'Patent Publication'}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                    {currentItem.title}
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-sm font-mono text-slate-500 dark:text-slate-400">{currentItem.date}</div>
                  <div className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                    currentItem.type === 'research'
                      ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                      : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                  }`}>
                    {currentItem.role}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-6">
                {currentItem.type === 'patent' && currentItem.citation && (
                  <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-200 dark:border-blue-800/50">
                    <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">Citation</div>
                    <p className="font-mono text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {currentItem.citation}
                    </p>
                  </div>
                )}

                {currentItem.description && (
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                      Project Overview
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {currentItem.description}
                    </p>
                  </div>
                )}

                {currentItem.details && (
                  <div className="space-y-4">
                    {currentItem.details.map((detail, idx) => (
                      <div key={idx} className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-600">
                        <h4 className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-2">
                          {detail.label}
                        </h4>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                          {detail.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Decorative Element */}
              <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between text-sm text-slate-400 dark:text-slate-500">
                  <span>Research Field</span>
                  <span className="font-medium text-slate-600 dark:text-slate-400">Materials Science & Engineering</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
