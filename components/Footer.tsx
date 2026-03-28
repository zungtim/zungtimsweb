import React from 'react';
import { Heart, Github, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 border-t border-slate-200/80 dark:border-slate-800/80 py-10 mt-auto">
      <div className="ui-shell px-4 sm:px-6 lg:px-8">
        <div className="ui-surface rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="text-center md:text-left">
              <span className="ui-text-gradient text-2xl font-semibold tracking-tight">ZungTim.</span>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                ChemEng <span className="mx-1">x</span> CS <span className="mx-1">x</span> GeoSci
              </p>
            </div>

            <div className="flex items-center justify-center gap-3">
              <a
                href="mailto:zungtimwong@gmail.com"
                className="ui-focus-ring ui-ghost-btn inline-flex h-10 w-10 items-center justify-center"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="ui-focus-ring ui-ghost-btn inline-flex h-10 w-10 items-center justify-center"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="ui-focus-ring ui-ghost-btn inline-flex h-10 w-10 items-center justify-center"
                aria-label="Location"
              >
                <MapPin className="h-4 w-4" />
              </a>
            </div>

            <div className="text-center md:text-right">
              <p className="text-sm text-slate-500 dark:text-slate-400">&copy; {new Date().getFullYear()} ZungTim Wong</p>
              <p className="mt-1 flex items-center justify-center gap-1 text-xs text-slate-400 dark:text-slate-500 md:justify-end">
                Made with <Heart className="h-3 w-3 text-rose-500" /> using React & Tailwind
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
