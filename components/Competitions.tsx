import React from 'react';
import { Trophy, Medal, Star, Crown, TrendingUp } from 'lucide-react';
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
    name: '第十三届"赢在广州"暨粤港澳大湾区大学生创业大赛',
    role: '第一作者',
    award: '一等奖',
    date: '2025.05',
    organizer: '广州市人社局',
    level: 'Municipal'
  }
];

const getAwardConfig = (award: string) => {
  if (award.includes('金')) {
    return {
      bg: 'bg-white dark:bg-slate-800',
      border: 'border border-slate-200 dark:border-slate-700',
      accent: 'bg-yellow-500',
      text: 'text-yellow-700 dark:text-yellow-400',
      badge: 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300',
      icon: Crown,
      size: 'large' // Gold award gets larger card
    };
  }
  if (award.includes('银')) {
    return {
      bg: 'bg-white dark:bg-slate-800',
      border: 'border border-slate-200 dark:border-slate-700',
      accent: 'bg-slate-400',
      text: 'text-slate-700 dark:text-slate-300',
      badge: 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300',
      icon: Medal,
      size: 'medium'
    };
  }
  if (award.includes('铜') || award.includes('三等')) {
    return {
      bg: 'bg-white dark:bg-slate-800',
      border: 'border border-slate-200 dark:border-slate-700',
      accent: 'bg-orange-500',
      text: 'text-orange-700 dark:text-orange-400',
      badge: 'bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-300',
      icon: Star,
      size: 'medium'
    };
  }
  return {
    bg: 'bg-white dark:bg-slate-800',
    border: 'border border-slate-200 dark:border-slate-700',
    accent: 'bg-blue-500',
    text: 'text-blue-700 dark:text-blue-400',
    badge: 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300',
    icon: Trophy,
    size: 'medium'
  };
};

export const Competitions: React.FC = () => {
  const goldAwards = competitions.filter(c => c.award.includes('金'));
  const otherAwards = competitions.filter(c => !c.award.includes('金'));

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-amber-100 dark:bg-amber-900/30 rounded-2xl text-amber-600 dark:text-amber-400 mb-6">
            <Trophy className="w-8 h-8" />
          </div>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">竞赛经历</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg">Competition Experience</p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-1">{competitions.length}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">Total Awards</div>
          </div>
          <div className="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">{goldAwards.length}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">Gold Awards</div>
          </div>
          <div className="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
              {competitions.filter(c => c.level === 'National').length}
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">National Level</div>
          </div>
          <div className="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">100%</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">Win Rate</div>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {competitions.map((comp, idx) => {
            const config = getAwardConfig(comp.award);
            const Icon = config.icon;
            const isLarge = config.size === 'large';

            return (
              <div
                key={idx}
                className={`group relative overflow-hidden rounded-3xl shadow-md ${config.bg} ${config.border} transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                  isLarge ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                {/* Accent Bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${config.accent}`} />

                {/* Background Icon */}
                <Icon className={`absolute -right-6 -bottom-6 w-40 h-40 opacity-5 rotate-12 transition-transform duration-500 group-hover:rotate-0 ${config.text}`} />

                <div className="relative p-8">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-6">
                    <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold ${config.badge}`}>
                      <Icon className="w-4 h-4" />
                      {comp.award}
                    </span>
                    <span className="text-sm font-mono text-slate-500 dark:text-slate-400">
                      {comp.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={`font-bold text-slate-900 dark:text-white mb-4 leading-snug ${isLarge ? 'text-xl' : 'text-lg'}`}>
                    {comp.name}
                  </h3>

                  {/* Details */}
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                      <div className={`w-8 h-8 rounded-lg ${config.bg} flex items-center justify-center`}>
                        <Medal className={`w-4 h-4 ${config.text}`} />
                      </div>
                      <span><span className="font-semibold text-slate-900 dark:text-white">Role:</span> {comp.role}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                      <div className={`w-8 h-8 rounded-lg ${config.bg} flex items-center justify-center`}>
                        <TrendingUp className={`w-4 h-4 ${config.text}`} />
                      </div>
                      <span><span className="font-semibold text-slate-900 dark:text-white">Organizer:</span> {comp.organizer}</span>
                    </div>
                  </div>

                  {/* Level Badge */}
                  <div className="mt-6 pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
                    <span className={`text-xs font-bold uppercase tracking-wider ${config.text}`}>
                      {comp.level} Level
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
