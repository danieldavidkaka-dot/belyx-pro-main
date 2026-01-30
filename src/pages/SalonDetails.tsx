import React from 'react';
import { ServiceRow } from '../components/ServiceRow';

interface SalonDetailsProps {
  onBack: () => void;
  onBook?: () => void; // <--- Nueva función para el botón "Book Now"
  onServiceSelect?: () => void;
}

export const SalonDetails = ({ onBack, onBook, onServiceSelect }: SalonDetailsProps) => {
  return (
    <div className="bg-white min-h-screen pb-24 font-sans relative">
      
      {/* 1. PORTADA HERO (Imagen Grande) */}
      <div className="relative h-64 w-full">
        <img 
            src="https://images.unsplash.com/photo-1521590832896-7ea867403dab?auto=format&fit=crop&q=80&w=800" 
            className="w-full h-full object-cover"
            alt="Salon Cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Botón Atrás (Flotante) */}
        <button 
            onClick={onBack}
            className="absolute top-6 left-6 w-10 h-10 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all z-10"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
        </button>

        {/* Acciones Rápidas (Favorito/Compartir) */}
        <div className="absolute top-6 right-6 flex gap-3 z-10">
            <button className="w-10 h-10 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:text-red-500 transition-colors">
                ♥
            </button>
        </div>
      </div>

      {/* 2. CONTENIDO PRINCIPAL (Sube sobre la imagen) */}
      <div className="-mt-10 relative bg-white rounded-t-[32px] px-6 pt-8 z-0">
        
        {/* Título y Ranking */}
        <div className="flex justify-between items-start mb-2">
            <h1 className="text-2xl font-bold text-slate-900">Aura Salon & Spa</h1>
            <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg">
                <span className="text-green-600 font-bold text-sm">4.9</span>
                <span className="text-[10px] text-green-700">★</span>
            </div>
        </div>
        
        <p className="text-slate-400 text-sm mb-6 flex items-center gap-1">
            📍 5th Avenue, New York • <span className="text-green-500 font-bold">Open now</span>
        </p>

        {/* Pestañas (Services / About / Reviews) */}
        <div className="flex border-b border-slate-100 mb-6">
            <button className="px-4 py-2 text-sm font-bold text-purple-600 border-b-2 border-purple-600">Services</button>
            <button className="px-4 py-2 text-sm font-bold text-slate-400 hover:text-slate-600">Specialists</button>
            <button className="px-4 py-2 text-sm font-bold text-slate-400 hover:text-slate-600">Reviews</button>
        </div>

        {/* Lista de Servicios */}
        <div>
            <h3 className="font-bold text-slate-900 mb-4 text-lg">Hair Treatments</h3>
            <ServiceRow onClick={onServiceSelect} name="Haircut & Styling" duration="45 min" price="60" image="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=100" />
            <ServiceRow onClick={onServiceSelect} name="Balayage Color" duration="120 min" price="150" image="https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&q=80&w=100" />
            <ServiceRow onClick={onServiceSelect} name="Keratin Treatment" duration="90 min" price="200" />
            
            <h3 className="font-bold text-slate-900 mt-6 mb-4 text-lg">Nails</h3>
            <ServiceRow onClick={onServiceSelect} name="Gel Manicure" duration="50 min" price="45" />
            <ServiceRow onClick={onServiceSelect} name="Pedicure Spa" duration="60 min" price="55" />
        </div>
      </div>

      {/* 3. BOTÓN FLOTANTE "BOOK" (Conectado a onBook) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-6 pb-8 z-50">
        <button 
            onClick={onBook} // <--- ¡AQUÍ ESTÁ LA CONEXIÓN!
            className="w-full bg-[#1A1A1A] text-white font-bold py-4 rounded-2xl flex justify-between px-6 hover:opacity-90 transition-opacity active:scale-95"
        >
            <span>2 Services Selected</span>
            <span>Book Now ($105) ➔</span>
        </button>
      </div>

    </div>
  );
};