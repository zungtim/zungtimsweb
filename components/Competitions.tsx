import React from 'react';
import { Trophy, Medal, Star, Crown, TrendingUp } from 'lucide-react';
import { competitionEntries } from '../content/competitions';
import { getMediaEntry, resolveMediaImage } from '../content/media';
import { ImageLoader } from './ImageLoader';

const getAwardConfig = (award: string) => {
  if (award.includes('金')) {
    return {
      accent: 'bg-amber-500',
      text: 'text-amber-700 dark:text-amber-300',
      badge: 'bg-amber-50 dark:bg-amber-900/25 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-700/40',
      icon: Crown,
      size: 'large'
    };
  }
  if (award.includes('银')) {
    return {
      accent: 'bg-slate-400',
      text: 'text-slate-700 dark:text-slate-300',
      badge: 'bg-slate-100 dark:bg-slate-700/70 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600',
      icon: Medal,
      size: 'medium'
    };
  }
  if (award.includes('铜') || award.includes('三等')) {
    return {
      accent: 'bg-orange-500',
      text: 'text-orange-700 dark:text-orange-300',
      badge: 'bg-orange-50 dark:bg-orange-900/25 text-orange-700 dark:text-orange-300 border border-orange-200/80 dark:border-orange-700/40',
      icon: Star,
      size: 'medium'
    };
  }
  return {
    accent: 'bg-teal-500',
    text: 'text-teal-700 dark:text-teal-300',
    badge: 'bg-teal-50 dark:bg-teal-900/25 text-teal-700 dark:text-teal-300 border border-teal-200/80 dark:border-teal-700/40',
    icon: Trophy,
    size: 'medium'
  };
};

export const Competitions: React.FC = () => {
  const goldAwards = competitionEntries.filter((entry) => entry.award.includes('金'));

  return (
    <section className="ui-section px-4 sm:px-6 lg:px-8">
      <div className="ui-shell">
        <div className="ui-section-head">
          <div className="ui-chip inline-flex items-center justify-center p-3 rounded-2xl text-secondary dark:text-slate-300 mb-6">
            <Trophy className="w-8 h-8" />
          </div>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">竞赛经历</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-serif">Competition Experience</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="ui-surface rounded-2xl p-5 text-center">
            <div className="text-3xl font-bold text-secondary dark:text-slate-200 mb-1">{competitionEntries.length}</div>
            <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Total Awards</div>
          </div>
          <div className="ui-surface rounded-2xl p-5 text-center">
            <div className="text-3xl font-bold text-secondary dark:text-slate-200 mb-1">{goldAwards.length}</div>
            <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Gold Awards</div>
          </div>
          <div className="ui-surface rounded-2xl p-5 text-center">
            <div className="text-3xl font-bold text-secondary dark:text-slate-200 mb-1">
              {competitionEntries.filter((entry) => entry.level === 'National').length}
            </div>
            <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">National Level</div>
          </div>
          <div className="ui-surface rounded-2xl p-5 text-center">
            <div className="text-3xl font-bold text-secondary dark:text-slate-200 mb-1">100%</div>
            <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Win Rate</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {competitionEntries.map((entry) => {
            const config = getAwardConfig(entry.award);
            const Icon = config.icon;
            const isLarge = config.size === 'large';
            const entryMedia = getMediaEntry(entry.media);
            const coverImage = resolveMediaImage(entryMedia?.cover, 'md');

            return (
              <div
                key={entry.id}
                className={`group ui-surface relative overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1 ${
                  isLarge ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className={`absolute top-0 left-0 right-0 h-1 ${config.accent}`} />
                <Icon className={`absolute -right-6 -bottom-6 w-40 h-40 opacity-5 rotate-12 transition-transform duration-500 group-hover:rotate-0 ${config.text}`} />

                {coverImage && (
                  <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
                    <ImageLoader
                      src={coverImage.src}
                      srcSet={coverImage.srcSet}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      alt={entry.title}
                      loading="lazy"
                      fetchPriority="low"
                      containerClassName="w-full h-full"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                <div className="relative p-8">
                  <div className="flex justify-between items-start mb-6">
                    <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold ${config.badge}`}>
                      <Icon className="w-4 h-4" />
                      {entry.award}
                    </span>
                    <span className="text-sm font-mono text-slate-500 dark:text-slate-400 tracking-wide">{entry.date}</span>
                  </div>

                  <h3 className={`font-bold text-slate-900 dark:text-white mb-4 leading-snug ${isLarge ? 'text-xl' : 'text-lg'}`}>
                    {entry.title}
                  </h3>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                      <div className="w-8 h-8 rounded-lg ui-subtle-panel flex items-center justify-center">
                        <Medal className={`w-4 h-4 ${config.text}`} />
                      </div>
                      <span><span className="font-semibold text-slate-900 dark:text-white">Role:</span> {entry.role}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                      <div className="w-8 h-8 rounded-lg ui-subtle-panel flex items-center justify-center">
                        <TrendingUp className={`w-4 h-4 ${config.text}`} />
                      </div>
                      <span><span className="font-semibold text-slate-900 dark:text-white">Organizer:</span> {entry.organizer}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
                    <span className={`text-xs font-bold uppercase tracking-wider ${config.text}`}>
                      {entry.level} Level
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
