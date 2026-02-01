import React from 'react';
import { Microscope, Award, FileText, Medal } from 'lucide-react';
import { CompetitionData } from '../types';

const competitions: CompetitionData[] = [
  {
    name: '中国国际大学生创新大赛(2024)',
    role: '第三作者',
    award: '金奖 (国赛)',
    date: '2024.10',
    organizer: '中国教育部',
    level: 'National'
  },
  {
    name: '中国国际大学生创新大赛(2025)广东省分赛',
    role: '第一作者',
    award: '银奖',
    date: '2025.08',
    organizer: '广东省教育厅',
    level: 'Provincial'
  },
  {
    name: '2025年全国大学生数学建模竞赛广东赛区',
    role: '共同一作',
    award: '三等奖',
    date: '2025.10',
    organizer: '广东省教育厅',
    level: 'Provincial'
  },
  {
    name: '第十三届“赢在广州”暨粤港澳大湾区大学生创业大赛',
    role: '第一作者',
    award: '一等奖',
    date: '2025.05',
    organizer: '广州市人社局',
    level: 'Municipal'
  }
];

const getMedalColor = (award: string) => {
    if (award.includes('金')) return 'text-yellow-500 bg-yellow-50 border-yellow-100';
    if (award.includes('银')) return 'text-slate-400 bg-slate-50 border-slate-100';
    if (award.includes('铜') || award.includes('三等')) return 'text-amber-700 bg-amber-50 border-amber-100';
    return 'text-blue-500 bg-blue-50 border-blue-100';
};

export const Research: React.FC = () => {
  return (
    <section id="research" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-10">
        <div className="p-3 bg-purple-100 rounded-lg text-purple-600">
          <Microscope className="w-8 h-8" />
        </div>
        <div>
            <h2 className="text-3xl font-bold text-slate-900">科研与竞赛</h2>
            <p className="text-slate-500 mt-1">Research & Competitions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column: Research & Projects */}
        <div className="md:col-span-7 space-y-8">
          
          {/* Research Item */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-4">
                <Microscope className="w-5 h-5 text-purple-500" />
                <h3 className="text-lg font-bold text-slate-900">科研经历 (Research)</h3>
            </div>
            
            <div className="pl-4 border-l-2 border-purple-100">
                <h4 className="font-semibold text-slate-800 text-lg leading-tight mb-2">
                    聚苯胺-碳纳米管/离子液体/ABS 复合材料的制备及性能研究
                </h4>
                <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-md font-medium">第一负责人</span>
                    <span className="px-2 py-1 bg-slate-50 text-slate-500 text-xs rounded-md">2025.10 - 2026.07</span>
                </div>
                
                <div className="space-y-3 text-sm text-slate-600">
                    <div>
                        <span className="font-semibold text-slate-700">课题描述:</span> 研究导电高分子材料在 ABS 基体中的分散性与导电网络构建机制。
                    </div>
                    <div>
                         <span className="font-semibold text-slate-700">我的工作:</span> 负责实验方案设计、复合材料制备工艺优化及电化学性能测试。
                    </div>
                    <div>
                        <span className="font-semibold text-slate-700">成果:</span> 成功制备出高电导率复合材料，撰写结题报告一份。
                    </div>
                </div>
            </div>
          </div>

          {/* Project / Patent Item */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-bold text-slate-900">项目经历 (Patent)</h3>
            </div>

            <div className="pl-4 border-l-2 border-blue-100">
                 <h4 className="font-semibold text-slate-800 text-lg leading-tight mb-2">
                    一种通过改性硅烷偶联剂增强粘附性的有机硅压敏胶
                </h4>
                <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md font-medium">第二发明人</span>
                    <span className="px-2 py-1 bg-slate-50 text-slate-500 text-xs rounded-md">2025.07.01</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <p className="font-mono text-xs text-slate-600 leading-relaxed">
                        [1] 朱贵有, <span className="font-bold text-slate-900">黄颂添</span>, 刘毅. 一种通过改性硅烷偶联剂增强粘附性的有机硅压敏胶 [P]. 广东省: CN120230511A, 2025-07-01.
                    </p>
                </div>
            </div>
          </div>
        </div>

        {/* Right Column: Competitions */}
        <div className="md:col-span-5">
           <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 h-full">
                <div className="flex items-center gap-2 mb-6">
                    <Award className="w-5 h-5 text-amber-500" />
                    <h3 className="text-lg font-bold text-slate-900">学科竞赛 (Competitions)</h3>
                </div>

                <div className="space-y-6">
                    {competitions.map((comp, idx) => (
                        <div key={idx} className="relative pl-6 pb-2 group">
                            {/* Timeline line */}
                            {idx !== competitions.length - 1 && (
                                <div className="absolute left-[9px] top-2 h-full w-0.5 bg-slate-100 group-hover:bg-slate-200 transition-colors"></div>
                            )}
                            <div className="absolute left-0 top-1.5 w-5 h-5 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold text-slate-800">{comp.name}</h4>
                                <div className="flex flex-wrap items-center gap-2 mt-2 mb-1">
                                    <span className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold border ${getMedalColor(comp.award)}`}>
                                        <Medal className="w-3 h-3" /> {comp.award}
                                    </span>
                                    <span className="text-xs text-slate-500">{comp.role}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs text-slate-400 mt-1">
                                    <span>{comp.organizer}</span>
                                    <span>{comp.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
           </div>
        </div>
      </div>
    </section>
  );
};