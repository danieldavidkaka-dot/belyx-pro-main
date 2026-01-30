import React from 'react';
import { Star, Clock } from 'lucide-react';

interface HeroCardProps {
  title: string;
  subtitle: string;
  rating?: number;
  reviews?: number;
  time?: string;
  image?: string;
  // Mantenemos estos opcionales por si acaso
  description?: string;
  color?: string;
}

export const HeroCard = ({ title, subtitle, rating, reviews, time, image }: HeroCardProps) => {
  return (
    <div className="relative w-full h-48 rounded-[32px] overflow-hidden shadow-lg mb-6 group cursor-pointer">
       <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
          <p className="text-white/80 text-xs font-bold uppercase tracking-wider mb-1">{subtitle}</p>
          <div className="flex justify-between items-end">
             <div>
                <h2 className="text-white text-2xl font-bold mb-2">{title}</h2>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg">
                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-white text-xs font-bold">{rating}</span>
                        <span className="text-white/60 text-[10px]">({reviews})</span>
                    </div>
                    {time && (
                        <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg">
                            <Clock size={12} className="text-white" />
                            <span className="text-white text-xs font-bold">{time}</span>
                        </div>
                    )}
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};