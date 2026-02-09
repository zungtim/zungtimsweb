import React from 'react';
import { GraduationCap, BookOpen, Trophy, TrendingUp } from 'lucide-react';

export const Education: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 min-h-[calc(100vh-64px)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">教育背景</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Education Background</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main Major */}
          <div className="bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">广东工业大学 (GDUT)</h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium">化学工程与工艺 (Chemical Engineering & Tech)</p>
                <span className="inline-block mt-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold rounded-full">
                  学科评估 B+
                </span>
              </div>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-700 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-600 shadow-sm">
                2023.09 - 2027.06
              </span>
            </div>

            <div className="mb-6">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                <BookOpen className="w-4 h-4" /> 主修课程 (Core Courses)
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                化工原理、反应工程、分离工程、化工热力学、物理化学等
              </p>
            </div>

            <div className="mb-6">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-4">
                <Trophy className="w-4 h-4" /> 课程成绩 (Academic Performance)
              </h4>
              
              {/* GPA Card */}
              <div className="flex items-center gap-4 mb-6">
                 <div className="bg-white dark:bg-slate-700 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-600 flex-1">
                  <span className="block text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-1">GPA Score</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-slate-900 dark:text-white">3.46</span>
                    <span className="text-sm text-slate-400 dark:text-slate-500">/ 5.0</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Ranking Visualization */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-2">
                    <TrendingUp className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                    <span className="font-medium">综合测评专业排名 (Comprehensive Assessment Ranking)</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Year 1 Ranking */}
                    <div className="bg-white dark:bg-slate-700 p-5 rounded-xl border border-slate-200 dark:border-slate-600 shadow-sm hover:border-blue-200 dark:hover:border-blue-500 transition-colors">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Year 1</span>
                                <div className="flex items-baseline gap-1 mt-1">
                                    <span className="text-2xl font-bold text-slate-900 dark:text-white">2</span>
                                    <span className="text-sm text-slate-400 dark:text-slate-500 font-normal">/ 156</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-lg border border-blue-100 dark:border-blue-800">
                                <span className="text-[10px] font-bold text-blue-500 dark:text-blue-400 uppercase">Top</span>
                                <span className="text-lg font-bold text-blue-700 dark:text-blue-400 leading-none">1.28%</span>
                            </div>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-600 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '98.7%' }}></div>
                        </div>
                    </div>

                    {/* Year 2 Ranking */}
                    <div className="bg-white dark:bg-slate-700 p-5 rounded-xl border border-slate-200 dark:border-slate-600 shadow-sm hover:border-blue-200 dark:hover:border-blue-500 transition-colors">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Year 2</span>
                                <div className="flex items-baseline gap-1 mt-1">
                                    <span className="text-2xl font-bold text-slate-900 dark:text-white">3</span>
                                    <span className="text-sm text-slate-400 dark:text-slate-500 font-normal">/ 154</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-lg border border-blue-100 dark:border-blue-800">
                                <span className="text-[10px] font-bold text-blue-500 dark:text-blue-400 uppercase">Top</span>
                                <span className="text-lg font-bold text-blue-700 dark:text-blue-400 leading-none">1.95%</span>
                            </div>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-600 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '98.1%' }}></div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>

          {/* Minor Degree */}
          <div className="bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow h-fit">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">广东工业大学 (GDUT)</h3>
                <p className="text-purple-600 dark:text-purple-400 font-medium">印制电子电路技术(PCB)创新学院</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Printed Circuit Board Technology / 辅修</p>
              </div>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-700 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-600 shadow-sm">
                2025.09 - 2026.09
              </span>
            </div>

            <div className="mt-6">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                <BookOpen className="w-4 h-4" /> 主修课程 (Core Courses)
              </h4>
              <ul className="space-y-2">
                {['印制电子电路原理与工艺', '电子装联工艺', '印制电路板加工技术', '印制电路板电镀技术'].map((course) => (
                    <li key={course} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                        {course}
                    </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
