import React from 'react';
import { Microscope, FileText, FlaskConical } from 'lucide-react';

export const Research: React.FC = () => {
  return (
    <section id="research" className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto min-h-[calc(100vh-64px)]">
      <div className="flex items-center gap-3 mb-12">
        <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl text-purple-600 dark:text-purple-400 shadow-sm">
          <Microscope className="w-8 h-8" />
        </div>
        <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">科研实践</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">Research & Projects Practice</p>
        </div>
      </div>

      <div className="space-y-10">
        
        {/* Research Item */}
        <div className="group relative bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-purple-200 dark:hover:border-purple-700 transition-all duration-300">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-purple-500 rounded-l-2xl"></div>
          
          <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                <FlaskConical className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">科研经历 (Research Experience)</h3>
          </div>
          
          <div className="pl-2">
              <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200 leading-tight mb-3 group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">
                  聚苯胺-碳纳米管/离子液体/ABS 复合材料的制备及性能研究
              </h4>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-sm rounded-full font-semibold">第一负责人</span>
                  <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-sm rounded-full font-mono">2025.10 - 2026.07</span>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-5 space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed border border-slate-100 dark:border-slate-600">
                  <div className="flex gap-3">
                      <span className="font-semibold text-slate-900 dark:text-slate-200 shrink-0">课题描述:</span> 
                      <span>研究导电高分子材料在 ABS 基体中的分散性与导电网络构建机制，探索复合材料微观结构与宏观性能的构效关系。</span>
                  </div>
                  <div className="flex gap-3">
                       <span className="font-semibold text-slate-900 dark:text-slate-200 shrink-0">核心工作:</span> 
                       <span>负责实验方案的整体设计、复合材料制备工艺（熔融共混与溶液混合）的优化，以及电化学性能（电导率、阻抗谱）的测试与分析。</span>
                  </div>
                  <div className="flex gap-3">
                      <span className="font-semibold text-slate-900 dark:text-slate-200 shrink-0">项目成果:</span> 
                      <span>成功制备出低渗滤阈值的高电导率复合材料，并在校级科研展示中获得优秀评价，撰写结题报告一份。</span>
                  </div>
              </div>
          </div>
        </div>

        {/* Project / Patent Item */}
        <div className="group relative bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-300">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500 rounded-l-2xl"></div>

          <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">项目经历 (Project & Patent)</h3>
          </div>

          <div className="pl-2">
               <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200 leading-tight mb-3 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                  一种通过改性硅烷偶联剂增强粘附性的有机硅压敏胶
              </h4>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm rounded-full font-semibold">第二发明人</span>
                  <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-sm rounded-full font-mono">2025.07.01</span>
              </div>
              
              <div className="bg-blue-50/50 dark:bg-blue-900/20 p-5 rounded-xl border border-blue-100/50 dark:border-blue-800/50">
                  <p className="font-mono text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      <span className="inline-block bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs px-2 py-0.5 rounded mr-2 align-middle">专利</span>
                      [1] 朱贵有, <span className="font-bold text-slate-900 dark:text-slate-200 border-b-2 border-blue-300 dark:border-blue-600">黄颂添</span>, 刘毅. 一种通过改性硅烷偶联剂增强粘附性的有机硅压敏胶 [P]. 广东省: CN120230511A, 2025-07-01.
                  </p>
              </div>
              <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                该项目主要针对现有有机硅压敏胶对基材粘附力不足的问题，通过合成新型改性硅烷偶联剂作为增粘剂，显著提升了压敏胶的剥离强度和耐高温性能。
              </p>
          </div>
        </div>

      </div>
    </section>
  );
};
