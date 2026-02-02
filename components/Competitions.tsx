import React from 'react';
import { Trophy, Medal, Award, Crown } from 'lucide-react';
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

const getAwardStyle = (award: string) => {
    if (award.includes('金')) {
        return {
            bg: 'bg-yellow-50',
            border: 'border-yellow-200',
            text: 'text-yellow-700',
            iconColor: 'text-yellow-500',
            badge: 'bg-yellow-100 text-yellow-800'
        };
    }
    if (award.includes('银')) {
        return {
            bg: 'bg-slate-50',
            border: 'border-slate-300',
            text: 'text-slate-700',
            iconColor: 'text-slate-500',
            badge: 'bg-slate-200 text-slate-700'
        };
    }
    if (award.includes('铜') || award.includes('三等')) {
        return {
            bg: 'bg-orange-50',
            border: 'border-orange-200',
            text: 'text-orange-800',
            iconColor: 'text-orange-600',
            badge: 'bg-orange-100 text-orange-800'
        };
    }
    // Default blue for others
    return {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-700',
        iconColor: 'text-blue-500',
        badge: 'bg-blue-100 text-blue-800'
    };
};

export const Competitions: React.FC = () => {
  return (
    <section id="competitions" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[calc(100vh-64px)]">
      <div className="flex items-center gap-3 mb-12 justify-center text-center">
        <div className="p-3 bg-amber-100 rounded-full text-amber-600 shadow-sm">
          <Trophy className="w-8 h-8" />
        </div>
        <div className="text-left">
            <h2 className="text-3xl font-bold text-slate-900">竞赛经历</h2>
            <p className="text-slate-500 font-medium mt-1">Competition Experience</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {competitions.map((comp, idx) => {
            const style = getAwardStyle(comp.award);
            return (
                <div key={idx} className={`relative overflow-hidden rounded-2xl p-6 border transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${style.bg} ${style.border}`}>
                    {/* Background Icon Decoration */}
                    <Crown className={`absolute -right-4 -bottom-4 w-32 h-32 opacity-5 rotate-12 ${style.iconColor}`} />
                    
                    <div className="relative z-10">
                        <div className="flex justify-between items-start gap-4 mb-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${style.badge}`}>
                                <Medal className="w-3.5 h-3.5" />
                                {comp.award}
                            </span>
                            <span className="text-xs font-mono text-slate-500 bg-white/60 px-2 py-1 rounded border border-white/50">
                                {comp.date}
                            </span>
                        </div>

                        <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug min-h-[3.5rem] flex items-center">
                            {comp.name}
                        </h3>

                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-slate-600">
                                <Award className="w-4 h-4 text-slate-400" />
                                <span className="font-semibold">角色:</span> {comp.role}
                            </div>
                            <div className="flex items-center gap-2 text-slate-600">
                                <Crown className="w-4 h-4 text-slate-400" />
                                <span className="font-semibold">主办方:</span> {comp.organizer}
                            </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-200/50 flex justify-between items-center">
                             <span className={`text-xs font-bold uppercase tracking-wider ${style.text}`}>
                                {comp.level} Level
                             </span>
                        </div>
                    </div>
                </div>
            );
        })}
      </div>
    </section>
  );
};