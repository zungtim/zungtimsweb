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
  // 🌟 修改点 1：改为 ReactNode，这样既能存普通文字，也能存带样式的 JSX 代码
  description: React.ReactNode; 
  coverImage: string; // 卡片封面图路径
  galleryImages: string[]; // 详情页图集路径数组
}

// 2. 模拟数据
const trips: Trip[] = [
  {
    id: 'sz-2026',
    year: 2026,
    date: '2026.01.30',
    title: '鲲鹏十九径之深圳天文台海岸徒步',
    location: '深圳天文台 (Shenzhen Observatory)',
    emoji: '🌊',
    // 普通文本描述：依然完美支持
    description: '定位在北纬22°29′、东经114°32′的大鹏半岛南端，我们沿着西涌崎岖的海岸线，在海浪与礁石碰撞的狭缝中攀爬前行。少年的眼中没有对日落缺席海天之际的失望，只有在逐渐降临的夜幕中迎着海风与浪潮不断向前的激动，直到终点海岸微弱灯光照在脸上。',
    
    coverImage: '/photo/travel/2026.01.30sz/cover.webp', 
    galleryImages: [
      '/photo/travel/2026.01.30sz/3.webp',
      '/photo/travel/2026.01.30sz/2.webp',
      '/photo/travel/2026.01.30sz/4.webp',
      '/photo/travel/2026.01.30sz/5.webp',
      '/photo/travel/2026.01.30sz/6.webp',
      '/photo/travel/2026.01.30sz/1.webp',
      '/photo/travel/2026.01.30sz/7.webp',
      '/photo/travel/2026.01.30sz/8.webp',
      '/photo/travel/2026.01.30sz/9.webp',
      '/photo/travel/2026.01.30sz/10.webp',
      '/photo/travel/2026.01.30sz/11.webp',
      '/photo/travel/2026.01.30sz/12.webp',
      '/photo/travel/2026.01.30sz/13.webp',
    ]
  },
  {
    id: 'htx&wdh-2025',
    year: 2025,
    date: '2025.10.05',
    title: '虎跳峡&无底湖徒步',
    location: '云南丽江&迪庆 (Lijiang & Diqing)',
    emoji: '⛰️',
    // 🌟 修改点 2：使用 JSX 代码块来实现标题加粗和分段排版
    description: (
      <>
        {/* 第一段标题：加粗 + 间距 */}
        <div className="font-bold text-slate-900 dark:text-slate-200 mb-2">
          北纬27°13′、东经100°07′ | 金沙江畔 [ 山河鸣响之虎跳峡高路徒步 ]
        </div>
        {/* 第一段正文：底部留白分隔下一段 */}
        <p className="mb-8 leading-relaxed">
          "行走在哈巴雪山与玉龙雪山的裂缝之间，脚下是咆哮奔涌的金沙江，耳畔是千年来未曾停歇的山谷回响。脚步从未因悬崖峭壁的险峻而迟疑，只有在登顶俯瞰那一道'虎跳'时，对大自然鬼斧神工的敬畏与征服自我的快意在胸中激荡，直到晚霞温柔地覆盖了整座神山。"
        </p>

        {/* 第二段标题：加粗 + 间距 */}
        <div className="font-bold text-slate-900 dark:text-slate-200 mb-2">
          北纬27°48′、东经99°54′ | 香格里拉深处 [ 秘境寻踪之迪庆无底湖森林徒步 ]
        </div>
        {/* 第二段正文 */}
        <p className="leading-relaxed">
          “深入香格里拉未被惊扰的腹地，穿过挂满长松萝的原始森林，那一汪湛蓝的无底湖如同地球坠落的一滴眼泪。眼中没有对路途漫长孤寂的疲惫，只有在轻触冰凉湖水那一刻，感受万物静默、神山共鸣的空灵与纯粹。夕阳隐入林海，满天繁星是这一路最慷慨的慰藉。”
        </p>
      </>
    ),
    
    coverImage:  '/photo/travel/2025.10.05/cover.webp',
    galleryImages: [
      '/photo/travel/2025.10.05/1.webp',
      '/photo/travel/2025.10.05/2.webp',
      '/photo/travel/2025.10.05/3.webp',
      '/photo/travel/2025.10.05/4.webp',
      '/photo/travel/2025.10.05/5.webp',
      '/photo/travel/2025.10.05/6.webp',
      '/photo/travel/2025.10.05/7.webp',
      '/photo/travel/2025.10.05/8.webp',
      '/photo/travel/2025.10.05/9.webp',
      '/photo/travel/2025.10.05/10.webp',
    ]
  },
  
  {
    id: 'meili-2025',
    year: 2025,
    date: '2025.10.02',
    title: '雪神的仪仗队——卡瓦格博',
    location: '梅里雪山 (Meri Snow Mountain)',
    emoji: '🗻',
    description: (
      <>
        {/* 第一段标题 */}
        <div className="font-bold text-slate-900 dark:text-slate-200 mb-2">
          北纬28°26′、东经98°41′ | 滇藏界·云端之上 [ 觐见神山之梅里雪山日照金山 ]
        </div>
        
        {/* 第一段正文 */}
        {/* 我把 mb-8 去掉了，因为下面没有第二段了，不需要底部留白 */}
        <p className="leading-relaxed">
          “伫立在黎明前的寒风中，屏息凝神等待一场神迹的降临。当第一缕曙光吻上卡瓦格博的瞬间，金光如熔岩般倾泻而下，点燃了沉睡千年的雪峰。眼中倒映着这震撼人心的‘日照金山’，在那一刻，所有的跋涉与守候都有了意义。在众神之神的注视下，许下一份关于勇气与信仰的承诺，愿此后余生，心中长有雪山，眼底总有光芒。”
        </p>
      </>
    ),
     // ⚠️ 这里的图片还是网络占位符
    coverImage:  '/photo/travel/2025.10.02/cover.webp',
    galleryImages: [
      '/photo/travel/2025.10.02/1.webp',
      '/photo/travel/2025.10.02/2.webp',
      '/photo/travel/2025.10.02/3.webp',
      '/photo/travel/2025.10.02/4.webp',
      '/photo/travel/2025.10.02/5.webp',
      '/photo/travel/2025.10.02/6.webp',
    ]
  },
   {
    id: 'Ganzi-2025',
    year: 2025,
    date: '2025.09.30',
    title: '稻城亚丁长线徒步',
    location: '稻城亚丁 (Scenic Spot of Daocheng Yading)',
    emoji: '🏞️',
    description: (
      <>
        {/* 第一段标题 */}
        <div className="font-bold text-slate-900 dark:text-slate-200 mb-2">
          北纬28°23′、东经100°20′ | 川西高原·蓝色星球最后净土 [ 稻城三神山 ]
        </div>
        
        {/* 第一段正文 */}
        {/* 我把 mb-8 去掉了，因为下面没有第二段了，不需要底部留白 */}
        <p className="leading-relaxed">
          “跋涉在海拔4600米的稀薄空气中，每一步都是对身体极限的挑战与对意志的打磨。在仙乃日、央迈勇与夏诺多吉三座神山的庇佑下，穿越洛绒牛场，抵达那如宝石般镶嵌在雪山怀抱中的牛奶海。眼中褪去了尘世的浮躁，唯有面对这片纯净天地时的热泪盈眶。身体在地狱，眼睛在天堂，这一刻，灵魂归于安宁。”
        </p>
      </>
    ),
     // ⚠️ 这里的图片还是网络占位符
    coverImage:  '/photo/travel/2025.09.30/cover.webp',
    galleryImages: [
      '/photo/travel/2025.09.30/cover.webp',
      '/photo/travel/2025.09.30/1.webp',
      '/photo/travel/2025.09.30/2.webp',
      '/photo/travel/2025.09.30/3.webp',
      '/photo/travel/2025.09.30/4.webp',
      '/photo/travel/2025.09.30/5.webp',
      '/photo/travel/2025.09.30/6.webp',
      '/photo/travel/2025.09.30/7.webp',
      '/photo/travel/2025.09.30/8.webp',
      '/photo/travel/2025.09.30/9.webp',
    ]
  },
  {
    id: 'km-2025',
    year: 2025,
    date: '2025.01.22',
    title: '春城的老街漫游',
    location: '昆明 (Kunming Yunnan)',
    emoji: '🌸',
    description: (
      <>
        {/* 第一段标题 */}
        <div className="font-bold text-slate-900 dark:text-slate-200 mb-2">
          北纬25°02′、东经102°42′ | 春城·花都 [ 迎着暖阳在昆明城市漫游 ]
        </div>
        
        {/* 第一段正文 */}
        <p className="leading-relaxed">
          “来自西伯利亚的白色精灵，跨越山海赴一场与春城的约定。在滇池大坝的微风中，看红嘴鸥衔走冬日的寒意，只留下满目绚烂的花海与和煦暖阳。脚步不由得慢下来，转身没入昆明老街斑驳的黄墙黛瓦间。在光影交错与市井烟火中，寻回那份久违的松弛感，原来时光真的可以在这里温柔地停驻。”
        </p>
      </>
    ),
     // ⚠️ 自行修改照片位置
    coverImage:  '/photo/travel/2025.01.22/11.webp',
    galleryImages: [
      '/photo/travel/2025.01.22/cover.webp',
      '/photo/travel/2025.01.22/1.webp',
      '/photo/travel/2025.01.22/2.webp',
      '/photo/travel/2025.01.22/3.webp',
      '/photo/travel/2025.01.22/4.webp',
      '/photo/travel/2025.01.22/5.webp',
      '/photo/travel/2025.01.22/6.webp',
      '/photo/travel/2025.01.22/7.webp',
      '/photo/travel/2025.01.22/8.webp',
      '/photo/travel/2025.01.22/9.webp',
      '/photo/travel/2025.01.22/10.webp',
      '/photo/travel/2025.01.22/11.webp',
    ]
  },
  {
    id: 'xgll-2025',
    year: 2025,
    date: '2025.10 & 2025.01',
    title: '找寻心中的日月',
    location: '云南迪庆·香格里拉 (Shangri-La)',
    emoji: '🏯',
    description: (
      <>
        {/* 第一段标题 */}
        <div className="font-bold text-slate-900 dark:text-slate-200 mb-2">
          北纬27°49′、东经99°42′ | 高原·心中的日月 [ 触摸信仰之香格里拉圣境巡礼 ]
        </div>
        
        {/* 第一段正文 */}
        <p className="leading-relaxed">
          “在独克宗古城转动世界上最大的转经筒，指尖划过千年的沧桑与祈愿。抬头仰望‘小布达拉宫’松赞林寺的金顶，在缭绕的桑烟中感受信仰的重量。纳帕海的倒影里藏着天空的秘密，在消失的地平线上，找到了属于心中的日月。不问归期，只闻梵音，这是一场关于寻找与归宿的对话。”
        </p>
      </>
    ),
     // ⚠️ 自行修改照片位置
    coverImage:  '/photo/travel/2025.10-2025.01/1.webp',
    galleryImages: [
      '/photo/travel/2025.10-2025.01/11.webp',
      '/photo/travel/2025.10-2025.01/1.webp',
      '/photo/travel/2025.10-2025.01/2.webp',
      '/photo/travel/2025.10-2025.01/3.webp',
      '/photo/travel/2025.10-2025.01/4.webp',
      '/photo/travel/2025.10-2025.01/5.webp',
      '/photo/travel/2025.10-2025.01/6.webp',
      '/photo/travel/2025.10-2025.01/7.webp',
      '/photo/travel/2025.10-2025.01/8.webp',
      '/photo/travel/2025.10-2025.01/9.webp',
      '/photo/travel/2025.10-2025.01/10.webp',
      '/photo/travel/2025.10-2025.01/12.webp',
      '/photo/travel/2025.10-2025.01/13.webp',
      '/photo/travel/2025.10-2025.01/14.webp',
      '/photo/travel/2025.10-2025.01/15.webp',
      '/photo/travel/2025.10-2025.01/16.webp',
      '/photo/travel/2025.10-2025.01/17.webp',
      '/photo/travel/2025.10-2025.01/18.webp',
      '/photo/travel/2025.10-2025.01/19.webp',
      '/photo/travel/2025.10-2025.01/20.webp',
    ]
  },
  {
    id: 'ylxs-2025',
    year: 2025,
    date: '2025.01.18',
    title: '一抹古韵撞入巍峨',
    location: '丽江·玉龙雪山 (Lijiang)',
    emoji: '🎐',
    description: (
      <>
        {/* 第一段标题 */}
        <div className="font-bold text-slate-900 dark:text-slate-200 mb-2">
          北纬26°52′、东经100°13′ | 纳西故土·柔软时光 [ 追风逐雪之丽江古韵 ]
        </div>
        
        {/* 第一段正文 */}
        <p className="leading-relaxed">
         “登临海拔4680米的冰川公园，触碰玉龙雪山千年的凛冽与圣洁，那是纳西守护神的威严。转身走进山脚的白沙古镇，在斑驳的土墙下遥望雪山，时光仿佛在这里按下了暂停键。听潺潺流水穿过青石板路，在灯火阑珊中迷失。梦里，有一半是雪山的巍峨，另一半是古城的温柔，此刻，只愿沉醉在这柔软时光里。”
        </p>
      </>
    ),
     // ⚠️ 自行修改照片位置
    coverImage:  '/photo/travel/2025.01.18/2.webp',
    galleryImages: [
      '/photo/travel/2025.01.18/cover.webp',
      '/photo/travel/2025.01.18/1.webp',
      '/photo/travel/2025.01.18/2.webp',
      '/photo/travel/2025.01.18/3.webp',
      '/photo/travel/2025.01.18/4.webp',
      '/photo/travel/2025.01.18/5.webp',
      '/photo/travel/2025.01.18/6.webp',
      '/photo/travel/2025.01.18/7.webp',
      '/photo/travel/2025.01.18/8.webp',
      '/photo/travel/2025.01.18/9.webp',
      '/photo/travel/2025.01.18/10.webp',
      '/photo/travel/2025.01.18/11.webp',
      '/photo/travel/2025.01.18/12.webp',
      '/photo/travel/2025.01.18/13.webp',
      ]
  },
  {
    id: 'dali-2025',
    year: 2025,
    date: '2025.01.15',
    title: '我们如此热爱大理',
    location: '大理·苍山洱海 (DaLi)',
    emoji: '🍃',
    description: (
      <>
        {/* 第一段标题 */}
        <div className="font-bold text-slate-900 dark:text-slate-200 mb-2">
          北纬25°41′、东经100°09′ | 苍洱之间·理想国度 [ 山海对峙间的风花雪月 ]
        </div>
        
        {/* 第一段正文 */}
        <p className="leading-relaxed">
         “徘徊在横断山脉末端的构造盆地，脚下是苍山十九峰延伸而出的冲积扇平原。西枕四千米海拔的冷峻屏障，东临断陷而成的高原明珠。穿过大理，才知何是‘上关花，下关风，苍山雪，洱海月’。白雪凝结于苍山之巅，明月倒悬在洱海深处。行走在这山海对峙的壮阔间，将满身的疲惫交付给这片亘古温柔的苍洱大地。”
        </p>
      </>
    ),
     // ⚠️ 自行修改照片位置
    coverImage:  '/photo/travel/2025.01.15/cover.webp',
    galleryImages: [
      '/photo/travel/2025.01.15/cover.webp',
      '/photo/travel/2025.01.15/1.webp',
      '/photo/travel/2025.01.15/2.webp',
      '/photo/travel/2025.01.15/3.webp',
      '/photo/travel/2025.01.15/5.webp',
      '/photo/travel/2025.01.15/6.webp',
      '/photo/travel/2025.01.15/7.webp',
      '/photo/travel/2025.01.15/8.webp',
      '/photo/travel/2025.01.15/9.webp',
      '/photo/travel/2025.01.15/10.webp',
      '/photo/travel/2025.01.15/11.webp',
      '/photo/travel/2025.01.15/12.webp',
      '/photo/travel/2025.01.15/13.webp',
      '/photo/travel/2025.01.15/14.webp',
      ]
  },
  {
    id: 'qinghai&gansu-2024',
    year: 2024,
    date: '2024.08.05',
    title: '把灵魂流放于大西北',
    location: '青甘大环线 (青海 & 甘肃)',
    emoji: '🐪',
    description: (
      <>
        {/* 第一段标题 */}
        <div className="font-bold text-slate-900 dark:text-slate-200 mb-2">
          北纬37°50′、东经95°18′ | 柴达木盆地·河西走廊 [ 穿越无人区的荒野史诗 ]
        </div>
        
        {/* 第一段正文 */}
        <p className="leading-relaxed">
         “横跨青藏高原东北缘与河西走廊，这是一场穿越地质时光的流浪。车轮碾过柴达木盆地的亘古苍凉，在雅丹地貌的风蚀土林中听见地球的呼吸。从翡翠湖富含矿物质的迷幻色泽，到莫高窟沉积千年的文明断层，再到七彩丹霞的造山运动奇迹。在长河落日圆的壮阔中，驰而不息，将孤独炼化为绝对的自由。”
        </p>
      </>
    ),
     // ⚠️ 自行修改照片位置
    coverImage:  '/photo/travel/2024.08.05/cover.webp',
    galleryImages: [
      '/photo/travel/2024.08.05/cover.webp',
      '/photo/travel/2024.08.05/1.webp',
      '/photo/travel/2024.08.05/2.webp',
      '/photo/travel/2024.08.05/3.webp',
      '/photo/travel/2024.08.05/4.webp',
      '/photo/travel/2024.08.05/5.webp',
      '/photo/travel/2024.08.05/6.webp',
      '/photo/travel/2024.08.05/7.webp',
      '/photo/travel/2024.08.05/8.webp',
      '/photo/travel/2024.08.05/9.webp',
      '/photo/travel/2024.08.05/10.webp',
      ]
  },
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
    <section id="travel" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-teal-100 dark:bg-teal-900/30 rounded-full text-teal-600 dark:text-teal-400 mb-4 shadow-sm">
            <Camera className="w-8 h-8" />
          </div>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">旅行足迹</h2>
          <p className="text-slate-500 dark:text-slate-400 font-serif italic text-lg">"The world is a book and those who do not travel read only one page."</p>
        </div>

        {/* Gallery Grid (Level 1) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trips.map((trip) => (
            <div
              key={trip.id}
              onClick={() => setSelectedTrip(trip)}
              className="group cursor-pointer bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-slate-100 dark:border-slate-700 flex flex-col h-full"
            >
              {/* Cover Image Wrapper */}
              <div className="relative h-64 overflow-hidden bg-slate-100 dark:bg-slate-800">
                 <img
                     src={trip.coverImage}
                     alt={trip.title}
                     loading="lazy"
                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                 />
                 <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 dark:text-slate-200 shadow-sm z-10">
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
                  <div className="flex items-center gap-2 text-sm text-teal-600 dark:text-teal-400 font-semibold mb-2">
                    <Calendar className="w-4 h-4" />
                    {trip.date}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">{trip.title}</h3>
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mb-4">
                    <MapPin className="w-4 h-4" />
                    {trip.location}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center text-slate-400 dark:text-slate-500 text-sm">
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
            <div className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">

                {/* Close Button */}
                <button
                    onClick={() => setSelectedTrip(null)}
                    className="absolute top-4 right-4 z-20 p-2 bg-black/10 hover:bg-black/20 text-slate-800 dark:text-slate-200 rounded-full transition-colors"
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
                        <div className="bg-slate-50 dark:bg-slate-700/50 border-l-4 border-teal-500 p-6 rounded-r-xl mb-10">
                            <Quote className="w-8 h-8 text-teal-200 mb-2" />

                            {/* 🌟 修改点 3：外层改为 div，因为内部可能包含 p 和 div 标签 */}
                            <div className="text-slate-700 dark:text-slate-300 text-lg font-serif">
                                {selectedTrip.description}
                            </div>
                        </div>

                        {/* Masonry Gallery Grid */}
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                            <Camera className="w-5 h-5 text-teal-600 dark:text-teal-400" />
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