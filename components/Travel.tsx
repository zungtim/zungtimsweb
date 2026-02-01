import React from 'react';
import { Plane, MapPin, Sun, Snowflake } from 'lucide-react';
import { TravelData } from '../types';

const travelData: TravelData[] = [
  {
    year: 2023,
    season: '夏',
    location: '海边 (The Sea)',
    memory: '第一次看见大海，在那里的落日非常温柔。'
  },
  {
    year: 2022,
    season: '冬',
    location: '哈尔滨 (Harbin)',
    memory: '零下20度的哈尔滨，冰雕真的很美。'
  }
];

export const Travel: React.FC = () => {
  return (
    <section id="travel" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-teal-100 rounded-full text-teal-600 mb-4">
                <Plane className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">旅行足迹 (Travel Footprints)</h2>
            <p className="text-slate-500 italic">"读万卷书，行万里路。"</p>
        </div>

        <div className="space-y-8">
            {travelData.map((trip, idx) => (
                <div key={idx} className="group flex flex-col md:flex-row gap-6 items-center md:items-stretch">
                    {/* Time Badge */}
                    <div className="flex-shrink-0 w-24 text-center md:text-right pt-2">
                        <span className="text-2xl font-bold text-slate-300 group-hover:text-teal-500 transition-colors duration-300">
                            {trip.year}
                        </span>
                    </div>

                    {/* Card */}
                    <div className="flex-grow w-full bg-white rounded-xl p-6 shadow-sm border-l-4 border-teal-400 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center gap-2 mb-3">
                            {trip.season === '夏' ? (
                                <Sun className="w-5 h-5 text-orange-400" />
                            ) : (
                                <Snowflake className="w-5 h-5 text-cyan-400" />
                            )}
                            <span className="font-semibold text-slate-800">{trip.season}</span>
                            <span className="text-slate-300">|</span>
                            <MapPin className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-600 font-medium">{trip.location}</span>
                        </div>
                        <p className="text-slate-600 leading-relaxed italic border-t border-slate-100 pt-3">
                             * 记忆碎片: {trip.memory}
                        </p>
                    </div>
                </div>
            ))}
        </div>
        
        <div className="mt-12 text-center">
            <p className="text-sm text-slate-400">To be continued...</p>
        </div>
      </div>
    </section>
  );
};