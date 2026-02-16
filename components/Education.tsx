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

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-4 border border-slate-200 dark:border-slate-600">
                  <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">GPA</div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">3.46<span className="text-lg text-slate-400 font-normal">/5.0</span></div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-4 border border-slate-200 dark:border-slate-600">
                  <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Year 1 Ranking</div>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">Top 1.28%</div>
                  <div className="text-sm text-slate-500">2 / 156</div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-4 border border-slate-200 dark:border-slate-600">
                  <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Year 2 Ranking</div>
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">Top 1.95%</div>
                  <div className="text-sm text-slate-500">3 / 154</div>
                </div>
              </div>

              {/* Progress Bars */}
              <div className="space-y-4 mb-8">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600 dark:text-slate-400">Year 1 Progress</span>
                    <span className="font-semibold text-slate-900 dark:text-white">98.7%</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full" style={{ width: '98.7%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600 dark:text-slate-400">Year 2 Progress</span>
                    <span className="font-semibold text-slate-900 dark:text-white">98.1%</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full" style={{ width: '98.1%' }} />
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
