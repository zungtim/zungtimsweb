import React from 'react';
import { GraduationCap, BookOpen, Award, TrendingUp, Calendar } from 'lucide-react';

export const Education: React.FC = () => {
  return (
    <section className="ui-section px-4 sm:px-6 lg:px-8">
      <div className="ui-shell max-w-6xl">
        {/* Section Header */}
        <div className="ui-section-head">
          <div className="ui-chip inline-flex items-center justify-center p-3 rounded-2xl text-secondary dark:text-slate-300 mb-6">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">教育背景</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-serif">Education Background</p>
        </div>

        <div className="mb-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="ui-surface rounded-2xl p-4 sm:p-5">
            <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Degree Track</div>
            <div className="mt-2 text-sm sm:text-base font-semibold text-slate-900 dark:text-white">Chemical Engineering</div>
          </div>
          <div className="ui-surface rounded-2xl p-4 sm:p-5">
            <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Current GPA</div>
            <div className="mt-2 text-2xl font-bold text-secondary dark:text-slate-200">3.46</div>
          </div>
          <div className="ui-surface rounded-2xl p-4 sm:p-5">
            <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Best Ranking</div>
            <div className="mt-2 text-2xl font-bold text-secondary dark:text-slate-200">Top 1.28%</div>
          </div>
          <div className="ui-surface rounded-2xl p-4 sm:p-5">
            <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Secondary Track</div>
            <div className="mt-2 text-sm sm:text-base font-semibold text-slate-900 dark:text-white">PCB Innovation Program</div>
          </div>
        </div>

        {/* Timeline Container */}
        <div className="space-y-8">
          {/* Timeline Line */}
          <div className="hidden" />

          {/* Main Degree - Larger Card */}
          <div className="relative">
            {/* Timeline Dot */}
            <div className="absolute left-4 top-8 w-8 h-8 bg-secondary rounded-full border-4 border-white dark:border-slate-900 hidden items-center justify-center shadow-lg z-10">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>

            {/* Card */}
            <div className="ui-surface rounded-3xl p-8">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
                <div className="flex items-start gap-4">
                  {/* School Logo */}
                  <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-600">
                    <img 
                      src="/photo/education/gdutlogo.png" 
                      alt="广东工业大学校徽"
                      className="w-full h-full object-contain bg-white dark:bg-slate-100"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">广东工业大学</h3>
                    <p className="text-lg text-secondary dark:text-slate-300 font-medium">化学工程与工艺</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Bachelor of Engineering (工学学士)</p>
                    <span className="inline-block mt-2 px-3 py-1 ui-chip text-sm font-semibold rounded-full">
                      学科评估 B+
                    </span>
                  </div>
                </div>
                <div className="ui-chip flex items-center gap-2 px-4 py-2 text-sm">
                  <Calendar className="w-4 h-4" />
                  2023.09 - 2027.06
                </div>
              </div>

              {/* Stats Visualization */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* GPA Circle */}
                <div className="ui-subtle-panel rounded-2xl p-5 flex flex-col items-center">
                  <div className="relative w-28 h-28 mb-3">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" className="text-slate-100 dark:text-slate-700" />
                      <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray={`${(3.46/5) * 251.2} 251.2`} strokeLinecap="round" className="text-secondary dark:text-slate-300" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-secondary dark:text-slate-300">3.46</span>
                      <span className="text-xs text-slate-400">/ 5.0</span>
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-secondary dark:text-slate-300">GPA</div>
                  <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">69.2%</div>
                </div>

                {/* Year 1 Ranking */}
                <div className="ui-subtle-panel rounded-2xl p-5 flex flex-col justify-between min-h-[180px]">
                  <div className="text-center">
                    <div className="text-xs text-secondary dark:text-slate-300 font-medium">大一综合测评</div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider">Year 1 Ranking</div>
                  </div>
                  <div className="text-center py-2">
                    <span className="text-4xl font-black text-secondary dark:text-slate-300">Top 1.28%</span>
                    <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">Rank: 2 / 156</div>
                  </div>
                  <div className="relative">
                    <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full">
                      <div 
                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-secondary rounded-full shadow-[0_0_10px_rgba(53,84,111,0.35)]"
                        style={{ left: 'calc(2% + 0.5%)' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Year 2 Ranking */}
                <div className="ui-subtle-panel rounded-2xl p-5 flex flex-col justify-between min-h-[180px]">
                  <div className="text-center">
                    <div className="text-xs text-secondary dark:text-slate-300 font-medium">大二综合测评</div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider">Year 2 Ranking</div>
                  </div>
                  <div className="text-center py-2">
                    <span className="text-4xl font-black text-secondary dark:text-slate-300">Top 1.95%</span>
                    <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">Rank: 3 / 154</div>
                  </div>
                  <div className="relative">
                    <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full">
                      <div 
                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-secondary rounded-full shadow-[0_0_10px_rgba(53,84,111,0.35)]"
                        style={{ left: 'calc(3% + 0.5%)' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Courses */}
              <div>
                <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
                  <BookOpen className="w-4 h-4" /> 主修课程
                </h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['化工原理', '化学反应工程', '分离工程', '化工热力学', '物理化学', '分析化学', '有机化学', '无机化学'].map((course) => (
                    <span key={course} className="px-3 py-1.5 ui-subtle-panel text-secondary dark:text-slate-300 text-sm rounded-lg">
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              {/* Campus Experience */}
              <div>
                <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
                  <Award className="w-4 h-4" /> 在校经历
                </h4>
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
                    <span className="text-slate-500 dark:text-slate-400 font-mono whitespace-nowrap">2024.09 — 2025.07</span>
                    <span className="text-slate-700 dark:text-slate-300">化工专业第二党支部党支部副书记</span>
                    <span className="text-slate-500 dark:text-slate-400">| 总体负责支部日常事务处理与党员管理</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
                    <span className="text-slate-500 dark:text-slate-400 font-mono whitespace-nowrap">2024.09 — 2025.07</span>
                    <span className="text-slate-700 dark:text-slate-300">轻工化工学院团委学生副书记</span>
                    <span className="text-slate-500 dark:text-slate-400">| 总体负责学院团委科技创新板块事务</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Minor Degree - Smaller Card */}
          <div className="relative">
            {/* Timeline Dot */}
            <div className="absolute left-4 top-8 w-8 h-8 bg-accent rounded-full border-4 border-white dark:border-slate-900 hidden items-center justify-center shadow-lg z-10">
              <Award className="w-4 h-4 text-white" />
            </div>

            {/* Card */}
            <div className="ui-surface rounded-3xl p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div className="flex items-start gap-4 flex-1">
                  {/* School Logo */}
                  <div className="w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-600">
                    <img 
                      src="/photo/education/gdutlogo.png" 
                      alt="广东工业大学校徽"
                      className="w-full h-full object-contain bg-white dark:bg-slate-100"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">印制电子电路技术 (PCB) 创新学院</h3>
                      <span className="px-3 py-1 ui-chip text-xs font-semibold rounded-full">
                        辅修
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">广东工业大学 · 辅修专业</p>
                    
                    {/* 简短描述 */}
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                      对印制电子电路制造工艺进行学习，拓宽专业视野并探索学科交叉可能性
                    </p>

                    {/* Courses */}
                    <div className="flex flex-wrap gap-2">
                      {['印制电子电路原理与工艺', '电子装联工艺', '印制电路板加工技术', '印制电路板电镀技术'].map((course) => (
                        <span key={course} className="px-3 py-1.5 ui-subtle-panel text-secondary dark:text-slate-300 text-sm rounded-lg">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="ui-chip flex items-center gap-2 px-4 py-2 text-sm whitespace-nowrap">
                  <Calendar className="w-4 h-4" />
                  2025.09 - 2026.09
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
