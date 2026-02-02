import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Camera, X, Quote, ZoomIn } from 'lucide-react';

// 1. 定义数据接口
interface Trip {
  id: string;
  year: number;
  date: string; // 显示的具体日期
  title: string; // 标题
  location: string;
  emoji: string;
  description: string; // 详细感想
  coverImage: string; // 卡片封面图路径
  galleryImages: string[]; // 详情页图集路径数组
}

// 2. 模拟数据
const trips: Trip[] = [
  {
    id: 'sz-2026',
    year: 2026,
    date: '2026.01.30',
    title: '鲲鹏十九径之深圳天文台海岸徒步', // ✅ 已更新
    location: '深圳天文台 (Shenzhen Observatory)', // ✅ 已更新
    emoji: '🌊',
    // ✅ 已更新为你提供的最新文案
    description: '在海浪与礁石碰撞的狭缝中攀爬前行，少年的眼中没有对日落缺席海天之际的失望，只有在逐渐降临的夜幕中迎着海风与浪潮不断向前的激动，直到终点海岸微弱灯光照在脸上。',
    
    // ✅ 保持你正确的本地图片路径
    coverImage: '/photo/travel/2026.01.30sz/cover.jpg', 
    galleryImages: [
      '/photo/travel/2026.01.30sz/1.jpg',
      '/photo/travel/2026.01.30sz/2.jpg',
      '/photo/travel/2026.01.30sz/3.jpg',
      '/photo/travel/2026.01.30sz/4.jpg',
      '/photo/travel/2026.01.30sz/5.jpg',
      '/photo/travel/2026.01.30sz/6.jpg',
      '/photo/travel/2026.01.30sz/7.jpg',
    ]
  },
  {
    id: 'hokkaido-2024',
    year: 2024,
    date: '2024.12.15',
    title: 'xxxxxxx',
    location: '########',
    emoji: '❄️',
    description: '零下20度的世界，时间仿佛被冻结。小樽运河边的煤气灯，札幌的拉面，还有漫天飞舞的粉雪，构成了一幅绝美的冬日画卷。',
    
    // ⚠️ 暂未修改：保留网络图片，等你上传本地图片后记得来改这里
    coverImage: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=800&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548263594-a71ea1995027?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516466723877-e462d7300aa0?q=80&w=800&auto=format&fit=crop',
    ]
  },
  {
    id: 'guilin-2023',
    year: 2023,
    date: '2023.07.10',
    title: 'xxxxxx',
    location: '########',
    emoji: '⛰️',
    description: '舟行碧波上，人在画中游。喀斯特地貌的奇峰林立，遇龙河的竹筏漂流，大自然的鬼斧神工令人叹为观止。',
    
    // ⚠️ 暂未修改：保留网络图片
    coverImage: 'https://images.unsplash.com/photo-1528695085352-d17b5c874254?q=80&w=800&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1627448897723-690225101258?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=800&auto=format&fit=crop',
    ]
  }
];

export const Travel: React.FC = () => {
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

  // 禁用/启用背景滚动
  useEffect(() => {
    if (selectedTrip) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedTrip]);

  return (
    <section id="travel" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-teal-100 rounded-full text-teal-600 mb-4 shadow-sm">
            <Camera className="w-8 h-8" />
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-3 tracking-tight">旅行足迹</h2>
          <p className="text-slate-500 font-serif italic text-lg">"The world is a book and those who do not travel read only one page."</p>
        </div>

        {/* Gallery Grid (Level 1) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trips.map((trip) => (
            <div 
              key={trip.id}
              onClick={() => setSelectedTrip(trip)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-slate-100 flex flex-col h-full"
            >
              {/* Cover Image Wrapper */}
              <div className="relative h-64 overflow-hidden bg-slate-100"> 
                 {/* ✅ 保持修改：无 animate-pulse，防止频闪 */}
                 
                 <img 
                    src={trip.coverImage} 
                    alt={trip.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                 />
                 <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm z-10">
                    {trip.year}
                 </div>
                 {/* Overlay hint */}
                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 text-white flex items-center gap-2 font-semibold bg-black/40 px-4 py-2 rounded-full backdrop-blur-md transition-opacity duration-300">
                        <ZoomIn className="w-4 h-4" /> 查看图集
                    </div>
                 </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-sm text-teal-600 font-semibold mb-2">
                    <Calendar className="w-4 h-4" />
                    {trip.date}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-1">{trip.title}</h3>
                  <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
                    <MapPin className="w-4 h-4" />
                    {trip.location}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-slate-400 text-sm">
                    <span className="flex items-center gap-1">
                        <Camera className="w-3.5 h-3.5" /> {trip.galleryImages.length} Photos
                    </span>
                    <span className="text-xl filter grayscale group-hover:grayscale-0 transition-all">{trip.emoji}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal (Level 2) */}
        {selectedTrip && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
          >
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-slate-900/80 backdrop-blur-md transition-opacity"
                onClick={() => setSelectedTrip(null)}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
                
                {/* Close Button */}
                <button 
                    onClick={() => setSelectedTrip(null)}
                    className="absolute top-4 right-4 z-20 p-2 bg-black/10 hover:bg-black/20 text-slate-800 rounded-full transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Modal Header & Content Scroll Area */}
                <div className="overflow-y-auto custom-scrollbar">
                    
                    {/* Hero Section of Modal */}
                    <div className="relative h-64 sm:h-80 w-full shrink-0">
                        <img 
                            src={selectedTrip.coverImage} 
                            alt={selectedTrip.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                            <div className="p-8 text-white w-full">
                                <div className="flex items-center gap-2 text-teal-300 font-bold mb-2 uppercase tracking-wide text-sm">
                                    <MapPin className="w-4 h-4" /> {selectedTrip.location}
                                </div>
                                <h2 className="text-3xl sm:text-4xl font-bold mb-2">{selectedTrip.title} {selectedTrip.emoji}</h2>
                                <p className="opacity-90 font-mono text-sm">{selectedTrip.date}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        {/* Text Description */}
                        <div className="bg-slate-50 border-l-4 border-teal-500 p-6 rounded-r-xl mb-10">
                            <Quote className="w-8 h-8 text-teal-200 mb-2" />
                            <p className="text-slate-700 text-lg leading-relaxed font-serif">
                                {selectedTrip.description}
                            </p>
                        </div>

                        {/* Masonry Gallery Grid */}
                        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Camera className="w-5 h-5 text-teal-600" /> 
                            旅途剪影
                        </h3>
                        
                        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
                            {selectedTrip.galleryImages.map((img, idx) => (
                                <div key={idx} className="break-inside-avoid rounded-xl overflow-hidden group/img relative">
                                    <img 
                                        src={img} 
                                        alt={`Gallery ${idx}`}
                                        loading="lazy"
                                        className="w-full h-auto object-cover transform transition-transform duration-500 group-hover/img:scale-105"
                                    />
                                    {/* Optional: download or view icon on hover */}
                                    <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-colors" />
                                </div>
                            ))}
                        </div>

                        {/* Footer Spacer */}
                        <div className="h-12" />
                    </div>
                </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};