import React from 'react';
import { Award, BookOpen, Calendar, GraduationCap } from 'lucide-react';

export const Education: React.FC = () => {
    return (
        <section className="ui-section px-4 sm:px-6 lg:px-8">
            <div className="ui-shell max-w-6xl">
                <div className="mb-12 max-w-2xl">
                    <div className="ui-chip mb-6 inline-flex items-center justify-center rounded-2xl p-3 text-secondary dark:text-slate-300">
                        <GraduationCap className="h-8 w-8" />
                    </div>
                    <h2 className="mb-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">教育背景</h2>
                    <p className="text-lg font-serif text-slate-500 dark:text-slate-400">Education Background</p>
                </div>

                <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div className="ui-surface rounded-2xl p-4 sm:p-5">
                        <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Degree Track</div>
                        <div className="mt-2 text-sm font-semibold text-slate-900 dark:text-white sm:text-base">Chemical Engineering</div>
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
                        <div className="mt-2 text-sm font-semibold text-slate-900 dark:text-white sm:text-base">PCB Innovation Program</div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="hidden" />

                    <div className="relative">
                        <div className="absolute left-4 top-8 hidden h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-secondary shadow-lg dark:border-slate-900 z-10">
                            <GraduationCap className="h-4 w-4 text-white" />
                        </div>

                        <div className="ui-surface rounded-3xl p-8">
                            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                <div className="flex items-start gap-4">
                                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-600">
                                        <img
                                            src="/photo/education/gdutlogo.png"
                                            alt="广东工业大学校徽"
                                            className="h-full w-full bg-white object-contain dark:bg-slate-100"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="mb-1 text-2xl font-bold text-slate-900 dark:text-white">广东工业大学</h3>
                                        <p className="text-lg font-medium text-secondary dark:text-slate-300">化学工程与工艺</p>
                                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Bachelor of Engineering (工学学士)</p>
                                        <span className="ui-chip mt-2 inline-block rounded-full px-3 py-1 text-sm font-semibold">
                                            学科评估 B+
                                        </span>
                                    </div>
                                </div>
                                <div className="ui-chip flex items-center gap-2 px-4 py-2 text-sm">
                                    <Calendar className="h-4 w-4" />
                                    2023.09 - 2027.06
                                </div>
                            </div>

                            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                                <div className="ui-subtle-panel flex flex-col items-center rounded-2xl p-5">
                                    <div className="relative mb-3 h-28 w-28">
                                        <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                                            <circle
                                                cx="50"
                                                cy="50"
                                                r="40"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="8"
                                                className="text-slate-100 dark:text-slate-700"
                                            />
                                            <circle
                                                cx="50"
                                                cy="50"
                                                r="40"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="8"
                                                strokeDasharray={`${(3.46 / 5) * 251.2} 251.2`}
                                                strokeLinecap="round"
                                                className="text-secondary dark:text-slate-300"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-2xl font-bold text-secondary dark:text-slate-300">3.46</span>
                                            <span className="text-xs text-slate-400">/ 5.0</span>
                                        </div>
                                    </div>
                                    <div className="text-sm font-semibold text-secondary dark:text-slate-300">GPA</div>
                                    <div className="mt-1 text-xs text-slate-400 dark:text-slate-500">69.2%</div>
                                </div>

                                <div className="ui-subtle-panel flex min-h-[180px] flex-col justify-between rounded-2xl p-5">
                                    <div className="text-center">
                                        <div className="text-xs font-medium text-secondary dark:text-slate-300">大一综合测评</div>
                                        <div className="text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Year 1 Ranking</div>
                                    </div>
                                    <div className="py-2 text-center">
                                        <span className="text-4xl font-black text-secondary dark:text-slate-300">Top 1.28%</span>
                                        <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">Rank: 2 / 156</div>
                                    </div>
                                    <div className="relative">
                                        <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-700">
                                            <div
                                                className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-secondary shadow-[0_0_10px_rgba(53,84,111,0.35)]"
                                                style={{ left: 'calc(2% + 0.5%)' }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="ui-subtle-panel flex min-h-[180px] flex-col justify-between rounded-2xl p-5">
                                    <div className="text-center">
                                        <div className="text-xs font-medium text-secondary dark:text-slate-300">大二综合测评</div>
                                        <div className="text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Year 2 Ranking</div>
                                    </div>
                                    <div className="py-2 text-center">
                                        <span className="text-4xl font-black text-secondary dark:text-slate-300">Top 1.95%</span>
                                        <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">Rank: 3 / 154</div>
                                    </div>
                                    <div className="relative">
                                        <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-700">
                                            <div
                                                className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-secondary shadow-[0_0_10px_rgba(53,84,111,0.35)]"
                                                style={{ left: 'calc(3% + 0.5%)' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                    <BookOpen className="h-4 w-4" /> 主修课程
                                </h4>
                                <div className="mb-6 flex flex-wrap gap-2">
                                    {['化工原理', '化学反应工程', '分离工程', '化工热力学', '物理化学', '分析化学', '有机化学', '无机化学'].map((course) => (
                                        <span key={course} className="ui-subtle-panel rounded-lg px-3 py-1.5 text-sm text-secondary dark:text-slate-300">
                                            {course}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                    <Award className="h-4 w-4" /> 在校经历
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex flex-col gap-2 text-sm sm:flex-row sm:items-center">
                                        <span className="font-mono whitespace-nowrap text-slate-500 dark:text-slate-400">2024.09 — 2025.07</span>
                                        <span className="text-slate-700 dark:text-slate-300">化工专业第二党支部党支部副书记</span>
                                        <span className="text-slate-500 dark:text-slate-400">| 总体负责支部日常事务处理与党员管理</span>
                                    </div>
                                    <div className="flex flex-col gap-2 text-sm sm:flex-row sm:items-center">
                                        <span className="font-mono whitespace-nowrap text-slate-500 dark:text-slate-400">2024.09 — 2025.07</span>
                                        <span className="text-slate-700 dark:text-slate-300">轻工化工学院团委学生副书记</span>
                                        <span className="text-slate-500 dark:text-slate-400">| 总体负责学院团委科技创新板块事务</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute left-4 top-8 hidden h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-accent shadow-lg dark:border-slate-900 z-10">
                            <Award className="h-4 w-4 text-white" />
                        </div>

                        <div className="ui-surface rounded-3xl p-6">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                <div className="flex flex-1 items-start gap-4">
                                    <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-600">
                                        <img
                                            src="/photo/education/gdutlogo.png"
                                            alt="广东工业大学校徽"
                                            className="h-full w-full bg-white object-contain dark:bg-slate-100"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="mb-1 flex items-center gap-3">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">印制电子电路技术 (PCB) 创新学院</h3>
                                            <span className="ui-chip rounded-full px-3 py-1 text-xs font-semibold">
                                                辅修
                                            </span>
                                        </div>
                                        <p className="mb-3 text-sm text-slate-500 dark:text-slate-400">广东工业大学 · 辅修专业</p>

                                        <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
                                            对印制电子电路制造工艺进行学习，拓宽专业视野并探索学科交叉可能性
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            {['印制电子电路原理与工艺', '电子装联工艺', '印制电路板加工技术', '印制电路板电镀技术'].map((course) => (
                                                <span key={course} className="ui-subtle-panel rounded-lg px-3 py-1.5 text-sm text-secondary dark:text-slate-300">
                                                    {course}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="ui-chip flex items-center gap-2 px-4 py-2 text-sm whitespace-nowrap">
                                    <Calendar className="h-4 w-4" />
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
