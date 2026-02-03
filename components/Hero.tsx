import React from 'react';
import { BookOpen, Mail, Map, FlaskConical, Laptop } from 'lucide-react';


export const Hero: React.FC = () => {
  return (
    <section id="about" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
      <div className="relative mb-8 group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <img
          src="public/photo/avatar.jpg"
          alt="ZungTim's Avatar"
          className="relative w-40 h-40 rounded-full border-4 border-white shadow-xl object-cover"
        />
      </div>

      <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
        Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Zungtim Wong</span> 👋
      </h1>

      <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm sm:text-base text-slate-600 font-medium">
        <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100">
          <FlaskConical className="w-4 h-4" /> ChemEng Undergrad / 化工本科生
        </span>
        <span className="flex items-center gap-1 bg-purple-50 text-purple-700 px-3 py-1 rounded-full border border-purple-100">
          <Laptop className="w-4 h-4" /> CS Enthusiast / 计算机科学爱好者
        </span>
        <span className="flex items-center gap-1 bg-amber-50 text-amber-700 px-3 py-1 rounded-full border border-amber-100">
          <Map className="w-4 h-4" /> GeoSci & Travel / 地理科学及旅行爱好者
        </span>
      </div>

      <p className="max-w-2xl text-lg text-slate-600 leading-relaxed mb-8">
        Hi，我是黄颂添，Zungtim Wong，一名热衷于探索世界、热爱生活的“奔三青年”。
        虽然我的本专业是<span className="font-semibold text-slate-800">化学工程</span>，但我对其他学科领域也充满热情，包括但不限于<span className="font-semibold text-slate-800">计算机科学、电子科学</span>和<span className="font-semibold text-slate-800">地理科学</span>。无论是探究化学过程的精细控制，还是构建复杂系统的后端逻辑，亦或是用眼睛和脚步丈量世界的尺寸，
        我都始终保持着 <span className="italic font-serif text-slate-800">"Stay Hungry, Stay Foolish"</span> 的态度。
      </p>

      <div className="flex gap-4">
        <a href="mailto:zungtimwong@gmail.com" className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
          <Mail className="w-5 h-5" />
          Email Me
        </a>
        <a 
          href="#" // 用占位符先顶替一下
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-white text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
        >
          <BookOpen className="w-5 h-5" />
          My Blog
        </a>
      </div>
    </section>
  );
};