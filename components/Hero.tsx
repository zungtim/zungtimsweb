import React, { useEffect, useState } from 'react';
import { BookOpen, Mail, FlaskConical, Laptop, ArrowRight, Globe, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
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
    <section id="about" className="ui-section flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="ui-shell">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column - Avatar & Quick Stats */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-center space-y-6 animate-fade-in">
            {/* Avatar with glow effect */}
            <div className="relative">
              <div className="absolute -inset-3 rounded-full border border-slate-200/90 dark:border-slate-700/90" />
              <div className="relative">
                <img
                  src="/photo/avatar.jpg"
                  alt="ZungTim's Avatar"
                  className="w-40 h-40 lg:w-48 lg:h-48 rounded-full border-4 border-white dark:border-slate-900 shadow-lg object-cover hover:scale-[1.03] transition-transform duration-300"
                />
                <div className="absolute -bottom-2 -right-2 w-11 h-11 bg-green-500 rounded-full border-4 border-white dark:border-slate-800 flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl">✨</span>
                </div>
              </div>
            </div>

            {/* Role Tags */}
            <div className="flex flex-col gap-3 w-full max-w-[280px] lg:max-w-[300px]">
              <div className="ui-surface rounded-2xl p-3 text-center">
                <div className="flex items-center justify-center gap-2">
                  <FlaskConical className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">ChemEng Undergrad</span>
                </div>
              </div>
              <div className="ui-surface rounded-2xl p-3 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Laptop className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">CS Enthusiast</span>
                </div>
              </div>
              <div className="ui-surface rounded-2xl p-3 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Globe className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Geo Enthusiast</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-8 text-center lg:text-left space-y-6 animate-slide-up">
            {/* Name */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
              Hi, I'm <br />
              <span className="ui-text-gradient">Zungtim Wong</span>
            </h1>

            {/* Bio */}
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed text-left max-w-3xl">
              Hi，我是黄颂添，Zungtim Wong，一名热衷于探索世界、热爱生活的"奔三青年"。
               </p>
               <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              虽然我的本专业是<span className="font-semibold text-slate-800 dark:text-slate-200">化学工程</span>，但我对其他学科领域也充满热情，包括但不限于<span className="font-semibold text-slate-800 dark:text-slate-200">计算机科学</span>、<span className="font-semibold text-slate-800 dark:text-slate-200">电子科学</span>和<span className="font-semibold text-slate-800 dark:text-slate-200">地理科学</span>。无论是探究化学过程的精细控制，还是构建一个系统的前后端逻辑，亦或是用眼睛和脚步丈量世界的尺寸，我都始终保持着 <span className="text-xl italic font-serif text-slate-800 dark:text-slate-200 font-semibold">"Stay Hungry, Stay Foolish"</span> 的态度。
            </p>
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <button
                type="button"
                onClick={() => setIsContactOpen(true)}
                aria-haspopup="dialog"
                aria-expanded={isContactOpen}
                className="ui-focus-ring ui-primary-btn group inline-flex items-center justify-center gap-2 px-7 py-3.5 font-semibold"
              >
                <Mail className="w-5 h-5" />
                Get in Touch
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <Link 
                to="/travel"
                className="ui-focus-ring ui-ghost-btn inline-flex items-center justify-center gap-2 px-7 py-3.5 font-semibold"
              >
                <BookOpen className="w-5 h-5" />
                Explore My Journey
              </Link>
            </div>

            {isContactOpen && (
              <div className="fixed inset-0 z-[80] flex items-center justify-center px-4" role="dialog" aria-modal="true" aria-label="Contact email">
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
                    className="ui-focus-ring absolute top-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                    aria-label="Close contact popup"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
                    <Mail className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Contact Email</h3>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">You can reach me via:</p>
                  <div className="mt-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-4 py-3">
                    <span className="font-mono text-sm text-slate-800 dark:text-slate-200">zungtim@163.com</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
