import React from 'react';
import { Star, MapPin, Home } from 'lucide-react';

export interface Professional {
  id: string;
  name: string;
  role: string;
  rating: number;
  image: string;
  locationType: 'salon' | 'home' | 'both';
  nextAvailable: string;
  isTopRated?: boolean;
}

interface ProfessionalCardProps extends Professional {
  onSelect: () => void;
}

export const ProfessionalCard = ({
  name,
  role,
  rating,
  image,
  locationType,
  nextAvailable,
  isTopRated,
  onSelect,
}: ProfessionalCardProps) => {
  return (
    <div className="relative mb-4 group">
      {/* LÓGICA DEL "AURA PERIMETRAL" (Borde Gradiente) */}
      {isTopRated && (
        <div className="absolute -inset-[2px] bg-gradient-to-r from-purple-600 to-cyan-400 rounded-2xl blur-sm opacity-70 group-hover:opacity-100 transition duration-500"></div>
      )}

      <div className={`relative bg-white p-4 rounded-2xl ${isTopRated ? 'border border-transparent bg-clip-padding' : 'border border-slate-100 shadow-sm'}`}>
        
        {/* Badge superior si es Top */}
        {isTopRated && (
          <div className="absolute -top-3 left-4 bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md z-10">
            TOP PROFESSIONAL
          </div>
        )}

        <div className="flex gap-4">
          {/* Avatar */}
          <div className="relative shrink-0">
            <img src={image} alt={name} className="w-16 h-16 rounded-full object-cover border-2 border-slate-50" />
            {isTopRated && (
              <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-0.5 rounded-full border-2 border-white">
                <Star size={10} fill="currentColor" />
              </div>
            )}
          </div>

          {/* Info Principal */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-slate-900 truncate">{name}</h3>
                <p className={`text-xs font-medium mb-1 ${isTopRated ? 'text-purple-600' : 'text-slate-500'}`}>{role}</p>
              </div>
              <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md">
                <span className="text-xs font-bold text-slate-900">{rating}</span>
                <Star size={10} className="text-purple-600 fill-purple-600" />
              </div>
            </div>

            {/* Ubicación */}
            <div className="flex items-center gap-3 text-[10px] text-slate-400 mb-3">
              {(locationType === 'salon' || locationType === 'both') && (
                <span className="flex items-center gap-1"><MapPin size={10} /> In-Salon</span>
              )}
              {(locationType === 'home' || locationType === 'both') && (
                <span className="flex items-center gap-1"><Home size={10} /> At-Home</span>
              )}
            </div>
          </div>
        </div>

        {/* Footer de la tarjeta: Disponibilidad y Botón */}
        <div className="mt-3 pt-3 border-t border-slate-50 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wide">Next Available</p>
            <p className="text-xs font-semibold text-slate-700">{nextAvailable}</p>
          </div>
          
          <button 
            onClick={onSelect}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
              isTopRated 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};