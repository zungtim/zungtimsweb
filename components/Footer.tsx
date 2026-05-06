import React, { useEffect, useState } from 'react';
import { Heart, Github, Mail, MapPin, X } from 'lucide-react';

export const Footer: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    if (!isContactOpen) {
      return;
    }

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsContactOpen(false);
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isContactOpen]);

  return (
    <>
      <footer className="relative border-t border-slate-200/80 dark:border-slate-800/80 py-10 mt-auto">
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
                <button
                  type="button"
                  onClick={() => setIsContactOpen(true)}
                  aria-haspopup="dialog"
                  aria-expanded={isContactOpen}
                  className="ui-focus-ring ui-ghost-btn inline-flex h-10 w-10 items-center justify-center"
                  aria-label="Open contact email"
                >
                  <Mail className="h-4 w-4" />
                </button>
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

      {isContactOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center px-4" role="dialog" aria-modal="true" aria-label="Contact email">
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/50"
            onClick={() => setIsContactOpen(false)}
            aria-label="Close contact popup overlay"
          />
          <div className="relative ui-surface w-full max-w-sm rounded-2xl p-6 text-left">
            <button
              type="button"
              onClick={() => setIsContactOpen(false)}
              className="ui-focus-ring absolute top-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              aria-label="Close contact popup"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
              <Mail className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Contact Email</h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">You can reach me via:</p>
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/60">
              <span className="font-mono text-sm text-slate-800 dark:text-slate-200">zungtim@163.com</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
