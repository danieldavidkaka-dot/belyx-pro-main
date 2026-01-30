import React, { useState, useEffect } from 'react';
import { ArrowLeft, MoreHorizontal, Phone, MessageSquare, Car, Star, Navigation } from 'lucide-react';

// --- INTERFACES ---
interface TripData {
  status: 'On Time' | 'Delayed' | 'Arrived';
  eta: string;
  minutesAway: number;
  progress: number;
  currentLocation: string;
}

interface ProfessionalData {
  name: string;
  role: string;
  rating: number;
  image: string;
  vehicle: {
    model: string;
    plate: string;
    color: string;
  };
}

const MOCK_TRIP: TripData = {
  status: 'On Time',
  eta: '10:45 AM',
  minutesAway: 12,
  progress: 65,
  currentLocation: 'Los Angeles, CA',
};

const MOCK_PRO: ProfessionalData = {
  name: 'Sarah Jenkins',
  role: 'Premium Facial & Massage',
  rating: 4.9,
  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
  vehicle: {
    model: 'Honda Civic',
    plate: 'ABC-123',
    color: 'White',
  }
};

interface TrackProfessionalProps {
  onBack: () => void;      // Para volver atrás real
  onCall: () => void;      // Para hacer la llamada
  onArrival: () => void;   // Para avanzar a Verificación (Simulación)
}

export default function TrackProfessional({ onBack, onCall, onArrival }: TrackProfessionalProps) {
  const [pulse, setPulse] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => setPulse(p => !p), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full bg-slate-900 overflow-hidden font-sans">
      
      {/* 1. MAPA DE FONDO */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/14/4834/6160.png" 
          alt="Map Background" 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-slate-900/40 pointer-events-none"></div>
      </div>

      {/* 2. HEADER */}
      <div className="absolute top-0 w-full p-4 flex justify-between items-center z-20 pt-12">
        <button onClick={onBack} className="w-10 h-10 bg-slate-900/80 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-lg hover:bg-slate-800 transition">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-white font-bold text-lg drop-shadow-md">En Route</h1>
        <button className="w-10 h-10 bg-slate-900/80 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-lg hover:bg-slate-800 transition">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* 3. BOTÓN DE DEMO (SIMULAR LLEGADA) */}
      <div className="absolute top-24 right-4 z-50">
        <button 
            onClick={onArrival}
            className="bg-green-600 hover:bg-green-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-xl animate-bounce"
        >
            Simulate Arrival 📍
        </button>
      </div>

      {/* 4. STATUS PILL */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 z-20">
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700 px-4 py-2 rounded-full flex items-center gap-2 shadow-2xl">
          <div className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center">
            <Navigation size={12} className="text-white fill-white" />
          </div>
          <span className="text-white text-xs font-bold tracking-wide">
            {MOCK_TRIP.status} • {MOCK_TRIP.minutesAway} min away
          </span>
        </div>
      </div>

      {/* 5. MAP MARKER */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
        <div className="relative">
          <div className={`absolute inset-0 rounded-full bg-cyan-500 opacity-20 scale-150 ${pulse ? 'animate-ping' : ''}`}></div>
          <div className="relative w-16 h-16 rounded-full border-4 border-slate-900 overflow-hidden shadow-2xl z-10">
             <img src={MOCK_PRO.image} alt="Pro" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-900 rotate-45 z-0"></div>
        </div>
      </div>

      {/* 6. BOTTOM SHEET */}
      <div className="absolute bottom-0 w-full bg-[#111318] rounded-t-[32px] p-6 z-30 shadow-2xl border-t border-slate-800/50">
        <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mb-6 opacity-50"></div>

        <div className="mb-6">
          <div className="flex items-end gap-2 mb-3">
            <h2 className="text-4xl font-bold text-white tracking-tight">{MOCK_TRIP.eta}</h2>
            <span className="text-slate-400 text-sm font-medium pb-1.5">Estimated arrival</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-600 to-cyan-400 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" 
              style={{ width: `${MOCK_TRIP.progress}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-[#1C1F26] p-4 rounded-2xl border border-slate-800 flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img src={MOCK_PRO.image} alt={MOCK_PRO.name} className="w-12 h-12 rounded-full object-cover" />
              <div className="absolute -bottom-1 -right-1 bg-cyan-500 text-black p-0.5 rounded-full border-2 border-[#1C1F26]">
                <Star size={10} fill="currentColor" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-white font-bold text-sm">{MOCK_PRO.name}</h3>
                <span className="text-[10px] bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">PRO</span>
              </div>
              <p className="text-slate-400 text-xs mt-0.5">{MOCK_PRO.role}</p>
              <div className="flex items-center gap-1 text-[10px] text-yellow-500 mt-1">
                <span className="font-bold">{MOCK_PRO.rating}</span>
                <span>• 214 jobs</span>
              </div>
            </div>
          </div>
          <div className="text-center">
            <Car size={24} className="text-slate-500 mx-auto mb-1" />
            <p className="text-[10px] text-slate-500 font-bold uppercase">{MOCK_PRO.vehicle.model}</p>
          </div>
        </div>

        <div className="flex gap-4">
          {/* BOTÓN CALL: Ahora ejecuta onCall */}
          <button 
            onClick={onCall}
            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-900/20 active:scale-95"
          >
            <Phone size={20} />
            Call Professional
          </button>
          
          <button className="w-16 bg-[#2A2E37] hover:bg-[#343942] text-white rounded-xl flex items-center justify-center transition-colors border border-slate-700 active:scale-95">
            <MessageSquare size={20} className="text-cyan-400" />
          </button>
        </div>

      </div>
    </div>
  );
}