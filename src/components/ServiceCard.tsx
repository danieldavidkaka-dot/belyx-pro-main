import React from 'react';

interface ServiceCardProps {
  title: string;
  salonName: string;
  price: string;
  matchScore: number;
  image: string;
}

export const ServiceCard = ({ title, salonName, price, matchScore, image }: ServiceCardProps) => {
  return (
    <div className="min-w-[240px] bg-white p-3 rounded-[24px] border border-slate-100 shadow-sm snap-center cursor-pointer hover:shadow-md transition-all">
       <div className="relative h-32 rounded-2xl overflow-hidden mb-3">
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-[10px] font-bold text-purple-600 shadow-sm border border-purple-100">
             {matchScore}% Match
          </div>
       </div>
       <h3 className="font-bold text-slate-900 text-sm mb-1">{title}</h3>
       <p className="text-xs text-slate-400 mb-2">{salonName}</p>
       <div className="flex justify-between items-center">
          <span className="font-bold text-slate-900">${price}</span>
          <button className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-purple-50 hover:text-purple-600 transition-colors">
             +
          </button>
       </div>
    </div>
  );
};