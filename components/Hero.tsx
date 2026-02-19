import React from 'react';
import { BookOpen, Mail, FlaskConical, Laptop, ArrowRight, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
  return (
    <section id="about" className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column - Avatar & Quick Stats */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-center space-y-6 animate-fade-in">
            {/* Avatar with glow effect */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 rounded-full opacity-20 blur-2xl animate-pulse-slow" />
              <div className="relative">
                <img
                  src="/photo/avatar.jpg"
                  alt="ZungTim's Avatar"
                  className="w-40 h-40 lg:w-48 lg:h-48 rounded-full border-4 border-white dark:border-slate-800 shadow-2xl object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute -bottom-2 -right-2 w-11 h-11 bg-green-500 rounded-full border-4 border-white dark:border-slate-800 flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl">✨</span>
                </div>
              </div>
            </div>

            {/* Role Tags */}
            <div className="flex flex-col gap-3 w-full max-w-[280px] lg:max-w-[300px]">
              <div className="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-3 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-center gap-2">
                  <FlaskConical className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">ChemEng Undergrad</span>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-3 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-center gap-2">
                  <Laptop className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">CS Enthusiast</span>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-3 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-center gap-2">
                  <Globe className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Geo Enthusiast</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-8 text-center lg:text-left space-y-5 animate-slide-up">
            {/* Name */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
              Hi, I'm <br />
              <span className="text-gradient">Zungtim Wong</span>
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
