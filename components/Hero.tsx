import React from 'react';
import { BookOpen, Mail, Map, FlaskConical, Laptop, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
  return (
    <section id="about" className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Avatar & Quick Stats */}
          <div className="flex flex-col items-center lg:items-start space-y-8 animate-fade-in">
            {/* Avatar with glow effect */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 rounded-full opacity-20 blur-2xl animate-pulse-slow" />
              <div className="relative">
                <img
                  src="/photo/avatar.jpg"
                  alt="ZungTim's Avatar"
                  className="w-48 h-48 lg:w-56 lg:h-56 rounded-full border-4 border-white dark:border-slate-800 shadow-2xl object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-green-500 rounded-full border-4 border-white dark:border-slate-800 flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl">✨</span>
                </div>
              </div>
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
              <div className="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-3xl p-4 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">3.46</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">GPA Score</div>
              </div>
              <div className="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-3xl p-4 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">Top 2%</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Class Ranking</div>
              </div>
              <div className="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-3xl p-4 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">4+</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Awards Won</div>
              </div>
              <div className="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-3xl p-4 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">8+</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Places Traveled</div>
              </div>
            </div>
          </div>

          {/* Right Column - Main Content */}
          <div className="text-center lg:text-left space-y-6 animate-slide-up">
            {/* Greeting */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Available for opportunities
            </div>

            {/* Name */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
              Hi, I'm <br />
              <span className="text-gradient">Zungtim Wong</span>
            </h1>

            {/* Role Tags */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
                <FlaskConical className="w-4 h-4" />
                <span className="text-sm font-medium">ChemEng Undergrad</span>
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-100 dark:border-purple-800">
                <Laptop className="w-4 h-4" />
                <span className="text-sm font-medium">CS Enthusiast</span>
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 border border-teal-100 dark:border-teal-800">
                <Map className="w-4 h-4" />
                <span className="text-sm font-medium">Traveler</span>
              </span>
            </div>

            {/* Bio */}
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
              我是黄颂添，一名热衷于探索世界的"奔三青年"。虽然主修
              <span className="font-semibold text-slate-800 dark:text-slate-200">化学工程</span>，
              但对<span className="font-semibold text-slate-800 dark:text-slate-200">计算机科学</span>和
              <span className="font-semibold text-slate-800 dark:text-slate-200">地理科学</span>
              同样充满热情。始终保持着 <span className="italic font-serif text-slate-800 dark:text-slate-200">"Stay Hungry, Stay Foolish"</span> 的态度。
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <a 
                href="mailto:zungtimwong@gmail.com" 
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-semibold hover:shadow-xl hover:shadow-slate-900/20 dark:hover:shadow-white/20 transition-all duration-300 hover:-translate-y-1"
              >
                <Mail className="w-5 h-5" />
                Get in Touch
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link 
                to="/travel"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 glass-card rounded-2xl font-semibold text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 hover:-translate-y-1"
              >
                <BookOpen className="w-5 h-5" />
                Explore My Journey
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
