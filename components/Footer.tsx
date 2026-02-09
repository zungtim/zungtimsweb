import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
            <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">ZungTim.</span>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Chemical Engineering x Computer Science
            </p>
        </div>
        <div className="text-center md:text-right text-sm text-slate-500 dark:text-slate-400">
          <p>&copy; {new Date().getFullYear()} ZungTim Wong. All rights reserved.</p>
          <p className="mt-1">
            Built with React & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
};