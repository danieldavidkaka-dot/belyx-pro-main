import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// 1. CORRECCIÓN AQUÍ: Agregamos "Map as MapIcon" a la lista
import { 
  ArrowLeft, Headphones, MessageSquare, Phone, Navigation, 
  Layers, Compass, Crosshair, Shield, Map as MapIcon 
} from 'lucide-react';

interface NavigationSession {
  tripId: string;
  status: 'En Ruta' | 'Llegando' | 'En Sitio';
  eta: string;
  duration: string;
  distance: string;
  arrivalTime: string;
  client: {
    name: string;
    service: string;
    address: string;
    image: string;
    phone: string;
  };
  trafficCondition: 'Fluid' | 'Moderate' | 'Heavy';
}

const MOCK_NAV_DATA: NavigationSession = {
  tripId: 'TRIP-8921',
  status: 'En Ruta',
  eta: '14 min',
  duration: '14 min',
  distance: '3.2 km',
  arrivalTime: '14:15',
  client: {
    name: 'María González',
    service: 'Corte y Peinado Premium',
    address: 'Av. Reforma 222, CDMX',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200',
    phone: '+52 55 1234 5678'
  },
  trafficCondition: 'Fluid'
};

interface StaffNavigationProps {
  onBack: () => void;
  onArrived: () => void; 
}

export default function StaffNavigation({ onBack, onArrived }: StaffNavigationProps) {
  const [isNavigating, setIsNavigating] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-full bg-[#0F1115] overflow-hidden font-sans text-white">
      
      {/* 1. MAP LAYER (FONDO) */}
      <div className="absolute inset-0 z-0">
         <img 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop" 
            alt="Dark Map" 
            className="w-full h-full object-cover opacity-60 mix-blend-normal grayscale-[20%] contrast-125"
         />
         <div className="absolute inset-0 bg-[#0F1115]/30"></div> 
         
         {/* SVG ROUTE OVERLAY */}
         <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ filter: 'drop-shadow(0 0 4px #00D4FF)' }}>
            <path 
              d="M180 600 Q 220 500 200 400 T 250 200" 
              fill="none" 
              stroke="#00D4FF" 
              strokeWidth="4" 
              strokeDasharray="10 10"
              strokeLinecap="round"
              className="animate-pulse"
            />
            <circle cx="250" cy="200" r="8" fill="#00D4FF" className="animate-ping" />
            <circle cx="250" cy="200" r="6" fill="white" />
         </svg>

         <div className="absolute top-[28%] left-[55%] bg-white text-slate-900 px-3 py-1.5 rounded-full shadow-xl z-0 transform -translate-x-1/2">
             <span className="text-xs font-bold">14:15 ETA</span>
             <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45"></div>
         </div>
         
         <div className="absolute bottom-[40%] left-[45%] z-0 transform -translate-x-1/2">
             <div className="w-12 h-12 bg-[#8B31FF]/30 rounded-full flex items-center justify-center animate-pulse">
                <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[20px] border-b-[#8B31FF] filter drop-shadow-[0_0_10px_#8B31FF]"></div>
             </div>
         </div>
      </div>

      {/* 2. HEADER */}
      <div className="absolute top-0 w-full p-4 pt-12 flex justify-between items-center z-20 bg-gradient-to-b from-black/80 to-transparent">
        <button onClick={onBack} className="w-10 h-10 bg-[#1C1F26]/80 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10 shadow-lg">
           <ArrowLeft size={20} />
        </button>

        <div className="px-4 py-2 bg-[#1C1F26]/90 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2 shadow-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-bold tracking-wide">{MOCK_NAV_DATA.status}</span>
        </div>

        <button className="w-10 h-10 bg-[#1C1F26]/80 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10 shadow-lg">
           <Headphones size={20} />
        </button>
      </div>

      {/* 3. MAP CONTROLS & SOS (Right Side) */}
      <div className="absolute top-1/2 right-4 -translate-y-1/2 flex flex-col gap-3 z-20">
          <button className="w-10 h-10 bg-[#1C1F26]/90 backdrop-blur rounded-full flex items-center justify-center text-slate-300 shadow-lg border border-white/10">
              <Compass size={20} />
          </button>
          
          {/* BOTÓN DE EMERGENCIA */}
          <button 
             onClick={() => navigate('/staff-emergency')} 
             className="w-10 h-10 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-red-900/50 animate-pulse border border-red-400"
          >
              <Shield size={20} fill="currentColor" />
          </button>

          <button className="w-10 h-10 bg-[#1C1F26]/90 backdrop-blur rounded-full flex items-center justify-center text-cyan-400 shadow-lg border border-white/10">
              <Layers size={20} />
          </button>
          <button className="w-10 h-10 bg-[#1C1F26]/90 backdrop-blur rounded-full flex items-center justify-center text-white shadow-lg border border-white/10">
              <Crosshair size={20} />
          </button>
      </div>

      {/* 4. BOTTOM SHEET */}
      <div className="absolute bottom-0 w-full bg-[#111318] rounded-t-[32px] p-6 pb-8 z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] border-t border-white/10">
        <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mb-6 opacity-50"></div>

        <div className="grid grid-cols-3 divide-x divide-white/10 mb-6">
            <div className="text-center px-2">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">TIEMPO EST.</p>
                <p className="text-xl font-bold text-[#8B31FF]">{MOCK_NAV_DATA.duration}</p>
            </div>
            <div className="text-center px-2">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">DISTANCIA</p>
                <p className="text-xl font-bold text-white">{MOCK_NAV_DATA.distance}</p>
            </div>
            <div className="text-center px-2">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">LLEGADA</p>
                <p className="text-xl font-bold text-white">{MOCK_NAV_DATA.arrivalTime}</p>
            </div>
        </div>

        <div className="bg-[#1C1F26] p-4 rounded-2xl border border-white/5 flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
                <div className="relative">
                    <img src={MOCK_NAV_DATA.client.image} alt="Client" className="w-12 h-12 rounded-full object-cover border-2 border-[#111318]" />
                    <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-[#1C1F26]"></div>
                </div>
                <div>
                    <h3 className="text-white font-bold text-sm">{MOCK_NAV_DATA.client.name}</h3>
                    <p className="text-slate-400 text-xs mb-0.5">{MOCK_NAV_DATA.client.service}</p>
                    <div className="flex items-center gap-1 text-[10px] text-slate-500">
                        {/* AHORA ESTE ICONO YA EXISTE */}
                        <MapIcon size={10} /> {MOCK_NAV_DATA.client.address}
                    </div>
                </div>
            </div>

            <div className="flex gap-2">
                <button className="w-10 h-10 bg-[#2A2E37] hover:bg-[#343942] rounded-xl flex items-center justify-center text-white transition-colors">
                    <MessageSquare size={18} />
                </button>
                <button className="w-10 h-10 bg-[#2A2E37] hover:bg-[#343942] rounded-xl flex items-center justify-center text-white transition-colors">
                    <Phone size={18} />
                </button>
            </div>
        </div>

        <button 
           onClick={() => {
               setIsNavigating(true);
               setTimeout(onArrived, 1000); 
           }}
           className="w-full py-4 bg-gradient-to-r from-[#8B31FF] to-[#00D4FF] rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg shadow-purple-900/40 active:scale-[0.98] transition-all group"
        >
            <Navigation size={20} className={`transform transition-transform ${isNavigating ? 'rotate-45' : ''} group-hover:-translate-y-1`} fill="currentColor" />
            <span>{isNavigating ? 'Navegando...' : 'INICIAR NAVEGACIÓN'}</span>
        </button>

      </div>
    </div>
  );
}