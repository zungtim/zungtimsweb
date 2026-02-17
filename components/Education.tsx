import React from 'react';
import { GraduationCap, BookOpen, Award, TrendingUp, Calendar } from 'lucide-react';

export const Education: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl text-blue-600 dark:text-blue-400 mb-6">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">教育背景</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg">Education Background</p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 timeline-line hidden md:block" />

          {/* Main Degree - Larger Card */}
          <div className="relative mb-12 md:pl-20">
            {/* Timeline Dot */}
            <div className="absolute left-4 top-8 w-8 h-8 bg-blue-500 rounded-full border-4 border-white dark:border-slate-900 hidden md:flex items-center justify-center shadow-lg z-10">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>

            {/* Card */}
            <div className="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">广东工业大学</h3>
                  <p className="text-lg text-blue-600 dark:text-blue-400 font-medium">化学工程与工艺</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-semibold rounded-full">
                    学科评估 B+
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/50 px-4 py-2 rounded-full text-sm border border-slate-200 dark:border-slate-600">
                  <Calendar className="w-4 h-4" />
                  2023.09 - 2027.06
                </div>
              </div>

              {/* Stats Visualization */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* GPA Circle */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800 flex flex-col items-center">
                  <div className="relative w-28 h-28 mb-3">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" className="text-blue-100 dark:text-blue-800" />
                      <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray={`${(3.46/5) * 251.2} 251.2`} strokeLinecap="round" className="text-blue-600 dark:text-blue-400" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-blue-700 dark:text-blue-300">3.46</span>
                      <span className="text-xs text-blue-500 dark:text-blue-400">/ 5.0</span>
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-blue-700 dark:text-blue-300">GPA</div>
                  <div className="text-xs text-blue-500 dark:text-blue-400 mt-1">69.2%</div>
                </div>

                {/* Year 1 Ranking */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-4 border border-green-100 dark:border-green-800 flex flex-col justify-between min-h-[180px]">
                  <div className="text-center">
                    <div className="text-xs text-green-600 dark:text-green-400 font-medium">大一综合测评</div>
                    <div className="text-xs text-green-500 dark:text-green-500 uppercase tracking-wider">Year 1 Ranking</div>
                  </div>
                  <div className="text-center py-2">
                    <span className="text-3xl font-bold text-green-700 dark:text-green-300">Top 1.28%</span>
                  </div>
                  <div>
                    <div className="relative h-5 border-2 border-dashed border-green-300 dark:border-green-600 rounded-full overflow-hidden mb-1">
                      <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-400 via-emerald-400 to-teal-300 rounded-full" style={{ width: '98.7%' }} />
                    </div>
                    <div className="text-center text-green-600 dark:text-green-400 text-sm font-medium">
                      2 / 156
                    </div>
                  </div>
                </div>

                {/* Year 2 Ranking */}
                <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-2xl p-4 border border-purple-100 dark:border-purple-800 flex flex-col justify-between min-h-[180px]">
                  <div className="text-center">
                    <div className="text-xs text-purple-600 dark:text-purple-400 font-medium">大二综合测评</div>
                    <div className="text-xs text-purple-500 dark:text-purple-500 uppercase tracking-wider">Year 2 Ranking</div>
                  </div>
                  <div className="text-center py-2">
                    <span className="text-3xl font-bold text-purple-700 dark:text-purple-300">Top 1.95%</span>
                  </div>
                  <div>
                    <div className="relative h-5 border-2 border-dashed border-purple-300 dark:border-purple-600 rounded-full overflow-hidden mb-1">
                      <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-300 rounded-full" style={{ width: '98.1%' }} />
                    </div>
                    <div className="text-center text-purple-600 dark:text-purple-400 text-sm font-medium">
                      3 / 154
                    </div>
                  </div>
                </div>
              </div>

              {/* Courses */}
              <div>
                <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
                  <BookOpen className="w-4 h-4" /> 主修课程
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['化工原理', '反应工程', '分离工程', '化工热力学', '物理化学'].map((course) => (
                    <span key={course} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm rounded-lg border border-slate-200 dark:border-slate-700">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Minor Degree - Smaller Card */}
          <div className="relative md:pl-20">
            {/* Timeline Dot */}
            <div className="absolute left-4 top-8 w-8 h-8 bg-purple-500 rounded-full border-4 border-white dark:border-slate-900 hidden md:flex items-center justify-center shadow-lg z-10">
              <Award className="w-4 h-4 text-white" />
            </div>

            {/* Card */}
            <div className="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 md:ml-12">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">印制电子电路技术 (PCB) 创新学院</h3>
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-semibold rounded-full">
                      辅修
                    </span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">广东工业大学</p>

                  {/* Courses */}
                  <div className="flex flex-wrap gap-2">
                    {['印制电子电路原理与工艺', '电子装联工艺', '印制电路板加工技术', '印制电路板电镀技术'].map((course) => (
                      <span key={course} className="px-3 py-1.5 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-sm rounded-lg border border-purple-200 dark:border-purple-800">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/50 px-4 py-2 rounded-full text-sm whitespace-nowrap border border-slate-200 dark:border-slate-600">
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
