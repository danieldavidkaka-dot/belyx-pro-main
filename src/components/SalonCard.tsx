import React from 'react';

interface SalonCardProps {
  name: string;
  address: string;
  rating: number;
  image: string;
  tags: string[];
  onClick?: () => void;
}

export const SalonCard = ({ name, address, rating, image, tags, onClick }: SalonCardProps) => {
  return (
    <div onClick={onClick} className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex gap-4 mb-3 items-center cursor-pointer active:scale-[0.98] transition-transform">
      <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-slate-800 text-sm truncate">{name}</h3>
          <div className="flex items-center gap-1 text-xs font-bold text-slate-700">
            <span className="text-yellow-400">★</span> {rating}
          </div>
        </div>
        
        <p className="text-[10px] text-slate-400 mb-3 truncate">{address}</p>
        
        <div className="flex justify-between items-center">
          <div className="flex gap-1">
            {tags.map((tag) => (
               <span key={tag} className="text-[9px] bg-slate-50 text-slate-500 px-2 py-1 rounded-md font-medium">
                 {tag}
               </span>
            ))}
          </div>
          <button className="bg-[#8B31FF] text-white text-[10px] font-bold px-4 py-1.5 rounded-full hover:bg-[#7a2be0]">
            Book
          </button>
        </div>
      </div>
    </div>
  );
};