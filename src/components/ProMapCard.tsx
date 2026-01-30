import React from 'react';

export const ProMapCard = () => {
  return (
    <div className="w-full h-40 bg-slate-100 rounded-3xl relative overflow-hidden flex items-center justify-center border border-slate-200">
        <div className="absolute inset-0 opacity-50 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center"></div>
        <div className="relative z-10 flex flex-col items-center gap-2">
            <div className="flex -space-x-3">
                <img src="https://i.pravatar.cc/100?img=1" className="w-10 h-10 rounded-full border-2 border-white shadow-md" />
                <img src="https://i.pravatar.cc/100?img=2" className="w-10 h-10 rounded-full border-2 border-white shadow-md" />
                <div className="w-10 h-10 rounded-full border-2 border-white shadow-md bg-[#111] text-white flex items-center justify-center text-xs font-bold">
                    +12
                </div>
            </div>
            <button className="bg-white px-4 py-2 rounded-full shadow-sm text-xs font-bold text-slate-700 hover:scale-105 transition">
                Open Map View
            </button>
        </div>
    </div>
  );
};