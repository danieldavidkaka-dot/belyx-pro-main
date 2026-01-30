import React, { useState, useEffect, useRef } from 'react';
// 1. AQUÍ ESTÁ LA CORRECCIÓN: Se añadió 'Navigation' a la lista de imports
import { 
  ArrowLeft, Settings, Shield, Phone, Headphones, 
  EyeOff, MapPin, Megaphone, CheckCircle, Navigation 
} from 'lucide-react';

// --- ESTRUCTURA DE DATOS ESCALABLE ---
interface SafetySession {
  id: string;
  location: string;
  isMonitoring: boolean;
  securityContact: string;
  supportContact: string;
}

const MOCK_SAFETY: SafetySession = {
  id: 'EMP-8821',
  location: 'Av. Horacio 154, Polanco, CDMX',
  isMonitoring: true,
  securityContact: '+52 55 911',
  supportContact: '+52 55 1234 5678'
};

interface StaffEmergencyProps {
  onBack: () => void;
}

export default function StaffEmergency({ onBack }: StaffEmergencyProps) {
  // Estados para la lógica del botón SOS
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [triggered, setTriggered] = useState(false);
  const [isDiscreet, setIsDiscreet] = useState(false);
  
  const timerRef = useRef<number | null>(null);

  // Lógica de "Mantener Pulsado"
  useEffect(() => {
    if (isHolding && !triggered) {
      timerRef.current = window.setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setTriggered(true);
            setIsHolding(false);
            // Aquí se dispararía la llamada a la API de emergencia
            if (navigator.vibrate) navigator.vibrate([200, 100, 200]); // Vibración táctil
            return 100;
          }
          return prev + 2; // Velocidad de llenado
        });
      }, 30);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      if (!triggered) setProgress(0);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHolding, triggered]);

  const startHold = () => setIsHolding(true);
  const stopHold = () => setIsHolding(false);

  // Renderizado Condicional del Botón Central
  const renderSOSButton = () => {
    if (triggered) {
      return (
        <div className="w-48 h-48 rounded-full bg-red-600 shadow-[0_0_50px_rgba(220,38,38,0.5)] flex flex-col items-center justify-center animate-pulse">
           <CheckCircle size={48} className="text-white mb-2" />
           <span className="text-white font-bold text-lg">ALERT SENT</span>
           <span className="text-white/80 text-xs">Help is on the way</span>
        </div>
      );
    }

    return (
      <button 
        onMouseDown={startHold}
        onMouseUp={stopHold}
        onMouseLeave={stopHold}
        onTouchStart={startHold}
        onTouchEnd={stopHold}
        className="relative w-48 h-48 rounded-full flex items-center justify-center group outline-none select-none touch-none"
      >
        {/* Fondo Gradiente Estático */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#00D4FF] to-[#8B31FF] opacity-20 group-hover:opacity-30 transition-opacity"></div>
        
        {/* Anillo de Progreso (SVG) */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
           <circle 
             cx="96" cy="96" r="92" 
             stroke="currentColor" 
             strokeWidth="4" 
             fill="transparent" 
             className="text-white/10" 
           />
           <circle 
             cx="96" cy="96" r="92" 
             stroke="#FF3B30" // Rojo de alerta al llenar
             strokeWidth="6" 
             fill="transparent" 
             strokeDasharray={578} // 2 * pi * r approx
             strokeDashoffset={578 - (578 * progress) / 100}
             strokeLinecap="round"
             className="transition-all duration-75 ease-linear"
           />
        </svg>

        {/* Círculo Central */}
        <div className={`w-36 h-36 rounded-full bg-gradient-to-tr from-[#8B31FF] to-[#00D4FF] flex flex-col items-center justify-center shadow-lg transition-transform duration-100 ${isHolding ? 'scale-95' : 'scale-100'}`}>
            <Megaphone size={32} className="text-white mb-2 fill-white" />
            <span className="text-white font-bold text-lg tracking-widest">HOLD</span>
        </div>

        {/* Efecto de Onda (Ripple) cuando no se presiona */}
        {!isHolding && (
           <div className="absolute inset-0 rounded-full border border-white/20 animate-[ping_3s_infinite]"></div>
        )}
      </button>
    );
  };

  return (
    <div className={`min-h-screen font-sans flex flex-col relative transition-colors duration-500 ${isDiscreet ? 'bg-black text-slate-500' : 'bg-[#0F1115] text-white'}`}>
      
      {/* 1. HEADER */}
      <div className="px-6 py-6 flex items-center justify-between z-20">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition text-inherit">
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-bold tracking-widest uppercase text-sm">Safety Center</h1>
        <button className="p-2 -mr-2 hover:bg-white/10 rounded-full transition text-inherit">
          <Settings size={20} />
        </button>
      </div>

      <div className={`flex-1 px-6 flex flex-col items-center relative z-10 transition-opacity duration-500 ${isDiscreet ? 'opacity-30 blur-[2px] hover:opacity-100 hover:blur-0' : 'opacity-100'}`}>
        
        {/* 2. MAP CARD (LOCATION) */}
        <div className="w-full bg-[#1C1F26] rounded-2xl overflow-hidden mb-8 border border-white/5 relative group">
           {/* Imagen de mapa simulada */}
           <div className="h-28 w-full bg-slate-800 relative">
               <img 
                 src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600" 
                 alt="Map" 
                 className="w-full h-full object-cover opacity-50 mix-blend-overlay"
               />
               <div className="absolute top-3 left-3 bg-[#1C1F26]/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-bold text-white tracking-wide">MONITORING ACTIVE</span>
               </div>
           </div>
           
           <div className="p-4 flex items-center justify-between">
               <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Current Location</p>
                  <p className="text-xs font-bold text-white flex items-center gap-1">
                     <MapPin size={12} className="text-blue-400" />
                     {MOCK_SAFETY.location}
                  </p>
               </div>
               <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  {/* 2. AQUÍ ES DONDE DABA EL ERROR, AHORA YA ESTÁ IMPORTADO */}
                  <Navigation size={14} className="text-blue-400 fill-blue-400" />
               </div>
           </div>
        </div>

        {/* 3. HERO TEXT */}
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">EMERGENCY SOS</h2>
            <p className="text-sm text-slate-400 max-w-[280px] mx-auto">
               Long press the button below to alert security immediately.
            </p>
        </div>

        {/* 4. MAIN ACTION (SOS) */}
        <div className="mb-10 relative">
             {renderSOSButton()}
        </div>

        {/* 5. SECONDARY ACTIONS */}
        <div className="w-full grid grid-cols-2 gap-4 mb-8">
            <button className="bg-[#1C1F26] hover:bg-[#252932] p-4 rounded-2xl flex items-center gap-3 border border-white/5 transition-colors">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                    <Shield size={20} />
                </div>
                <div className="text-left">
                    <span className="block text-white font-bold text-sm">Call Security</span>
                    <span className="block text-slate-500 text-[10px]">Direct Line</span>
                </div>
            </button>

            <button className="bg-[#1C1F26] hover:bg-[#252932] p-4 rounded-2xl flex items-center gap-3 border border-white/5 transition-colors">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                    <Headphones size={20} />
                </div>
                <div className="text-left">
                    <span className="block text-white font-bold text-sm">Support</span>
                    <span className="block text-slate-500 text-[10px]">Help Center</span>
                </div>
            </button>
        </div>

        {/* 6. DISCREET MODE TOGGLE */}
        <div className="w-full bg-[#1C1F26] p-4 rounded-2xl border border-white/5 flex items-center justify-between">
             <div className="flex items-center gap-3">
                 <EyeOff size={20} className="text-blue-400" />
                 <div>
                     <span className="block text-white font-bold text-sm">Discreet Mode</span>
                     <span className="block text-slate-500 text-[10px]">Dim screen & silence alerts</span>
                 </div>
             </div>
             {/* Toggle Switch */}
             <button 
                onClick={() => setIsDiscreet(!isDiscreet)}
                className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${isDiscreet ? 'bg-blue-500' : 'bg-slate-700'}`}
             >
                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${isDiscreet ? 'translate-x-6' : 'translate-x-0'}`}></div>
             </button>
        </div>

        <p className="mt-auto py-6 text-[10px] text-slate-600 font-mono text-center">
            ID: {MOCK_SAFETY.id} • Belyx Security Systems v2.4
        </p>

      </div>
    </div>
  );
}