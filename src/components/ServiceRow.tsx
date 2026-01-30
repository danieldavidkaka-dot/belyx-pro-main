import React from 'react';

interface ServiceRowProps {
  name: string;
  duration: string;
  price: string;
  image?: string;
  onClick?: () => void;
}

export const ServiceRow = ({ name, duration, price, image, onClick }: ServiceRowProps) => {
  return (
    <div onClick={onClick} className="flex items-center gap-4 py-4 border-b border-slate-50 last:border-0 group cursor-pointer hover:bg-slate-50 transition-colors px-2 rounded-xl">
      {/* Icono o Imagen pequeña */}
      <div className="w-12 h-12 bg-slate-100 rounded-xl overflow-hidden shrink-0">
        {image ? (
            <img src={image} className="w-full h-full object-cover" alt={name} />
        ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400 text-lg">✨</div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1">
        <h4 className="font-bold text-slate-900 text-sm">{name}</h4>
        <p className="text-xs text-slate-400">{duration} • Women only</p>
      </div>

      {/* Precio y Botón */}
      <div className="flex items-center gap-3">
        <span className="font-bold text-slate-900 text-sm">${price}</span>
        <button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-purple-600 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all">
           +
        </button>
      </div>
    </div>
  );
};