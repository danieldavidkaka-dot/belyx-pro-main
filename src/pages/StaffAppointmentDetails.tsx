import React, { useState } from 'react';
import { 
  ArrowLeft, Phone, MessageSquare, MapPin, Navigation, 
  Copy, AlertCircle, ChevronRight, Clock, Shield 
} from 'lucide-react';
import { CURRENT_APPOINTMENT } from '../data/mocks'; // Importación de datos

interface StaffAppointmentDetailsProps {
  onBack: () => void;
  onStartJob: () => void;
}

export default function StaffAppointmentDetails({ onBack, onStartJob }: StaffAppointmentDetailsProps) {
  const [isSliding, setIsSliding] = useState(false);

  // Simulación simple del Slide Action
  const handleSlideClick = () => {
    setIsSliding(true);
    setTimeout(() => {
      onStartJob(); // Ejecuta la acción después de la animación
    }, 500);
  };

  return (
    <div className="bg-[#0F1115] min-h-screen pb-28 font-sans text-white relative overflow-hidden">
      
      {/* 1. HEADER */}
      <div className="px-6 py-6 flex items-center justify-between sticky top-0 bg-[#0F1115]/90 backdrop-blur-md z-20">
        <button onClick={onBack} className="p-2 -ml-2 bg-[#1C1F26] rounded-full hover:bg-white/10 transition">
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-bold text-sm text-slate-300">Appointment {CURRENT_APPOINTMENT.id}</h1>
        <span className="bg-green-500/10 text-green-400 text-[10px] font-bold px-3 py-1 rounded-full border border-green-500/20">
            {CURRENT_APPOINTMENT.status}
        </span>
      </div>

      <div className="px-6 space-y-6">
        
        {/* 2. TIME HERO */}
        <div className="text-center py-2">
            <h2 className="text-4xl font-bold tracking-tight mb-1">{CURRENT_APPOINTMENT.timeRange.split(' - ')[0]}</h2>
            <p className="text-slate-400 text-sm font-medium">
                - {CURRENT_APPOINTMENT.timeRange.split(' - ')[1]}
            </p>
            <p className="text-[#8B31FF] font-bold text-xs uppercase tracking-widest mt-2">{CURRENT_APPOINTMENT.date}</p>
        </div>

        {/* 3. CLIENT CARD */}
        <div className="bg-[#1C1F26] rounded-3xl p-5 border border-white/5 relative overflow-hidden">
            {/* Glow decorativo */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-3xl -z-0"></div>

            <div className="relative z-10 flex items-center gap-4 mb-6">
                <div className="relative">
                    <img src={CURRENT_APPOINTMENT.client.image} alt="Client" className="w-16 h-16 rounded-full object-cover border-2 border-[#1C1F26]" />
                    {CURRENT_APPOINTMENT.client.isVIP && (
                        <span className="absolute -bottom-1 -right-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow-sm">
                            VIP
                        </span>
                    )}
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white">{CURRENT_APPOINTMENT.client.name}</h3>
                    <div className="flex items-center gap-1 text-slate-400 text-xs">
                        <MapPin size={12} /> {CURRENT_APPOINTMENT.client.type}
                    </div>
                </div>
            </div>

            <div className="relative z-10 flex gap-3">
                <button className="flex-1 bg-[#2A2E37] hover:bg-[#343942] py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-colors">
                    <Phone size={18} className="text-white" /> Call
                </button>
                <button className="flex-1 bg-[#8B31FF] hover:bg-purple-600 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-colors shadow-lg shadow-purple-900/40">
                    <MessageSquare size={18} className="text-white" /> Message
                </button>
            </div>
        </div>

        {/* 4. SERVICE DETAILS */}
        <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Service Details</p>
            <div className="bg-[#1C1F26] rounded-2xl p-4 flex items-center justify-between border border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center text-purple-400">
                        {/* Icono abstracto de servicio */}
                        <Shield size={18} />
                    </div>
                    <div>
                        <h4 className="font-bold text-white text-sm">{CURRENT_APPOINTMENT.service.name}</h4>
                        <p className="text-xs text-slate-500">{CURRENT_APPOINTMENT.service.duration}</p>
                    </div>
                </div>
                <span className="text-lg font-bold text-white">${CURRENT_APPOINTMENT.service.price}</span>
            </div>
        </div>

        {/* 5. LOCATION CARD (With Map) */}
        <div>
            <div className="flex justify-between items-center mb-3">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Location</p>
                <button className="flex items-center gap-1 text-[10px] font-bold text-[#8B31FF]">
                    COPY ADDRESS <Copy size={10} />
                </button>
            </div>
            
            <div className="bg-[#1C1F26] rounded-3xl overflow-hidden border border-white/5">
                {/* Simulated Map Image */}
                <div className="h-32 w-full bg-slate-800 relative">
                     <img 
                        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600" 
                        alt="Map" 
                        className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#1C1F26] to-transparent"></div>
                     
                     {/* Floating GO Button */}
                     <button className="absolute bottom-4 right-4 bg-white text-black px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow-xl active:scale-95 transition-transform">
                        <Navigation size={14} fill="currentColor" /> Go
                     </button>
                </div>

                <div className="p-5">
                    <div className="flex items-start gap-3 mb-4">
                        <div className="mt-1 w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0">
                            <MapPin size={16} className="text-cyan-400" />
                        </div>
                        <div>
                            <h4 className="font-bold text-white text-sm leading-tight">{CURRENT_APPOINTMENT.location.address}</h4>
                            <p className="text-xs text-slate-400 mt-1">{CURRENT_APPOINTMENT.location.city}</p>
                        </div>
                    </div>

                    {CURRENT_APPOINTMENT.location.gateCode && (
                        <div className="inline-block bg-[#00D4FF]/10 border border-[#00D4FF]/20 px-3 py-1.5 rounded-lg">
                            <span className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider">
                                Gate Code: <span className="text-white ml-1 text-xs">{CURRENT_APPOINTMENT.location.gateCode}</span>
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* 6. MEDICAL ALERT */}
        {CURRENT_APPOINTMENT.medicalAlert && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex gap-3">
                <AlertCircle size={20} className="text-red-400 shrink-0" />
                <div>
                    <h4 className="text-xs font-bold text-red-400 uppercase mb-1">Medical Alert</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                        {CURRENT_APPOINTMENT.medicalAlert}
                    </p>
                </div>
            </div>
        )}

      </div>

      {/* 7. SLIDE TO START FOOTER */}
      <div className="fixed bottom-6 left-6 right-6 z-30">
        <button 
           onClick={handleSlideClick}
           className={`w-full h-16 rounded-full relative overflow-hidden group transition-all ${
               isSliding ? 'bg-green-600' : 'bg-[#1C1F26] border border-white/10'
           }`}
        >
            {/* Background progress fill */}
            <div className={`absolute inset-y-0 left-0 bg-gradient-to-r from-[#8B31FF] to-[#00D4FF] transition-all duration-500 ${isSliding ? 'w-full' : 'w-16'}`}></div>
            
            {/* Slider Knob */}
            <div className={`absolute top-1 bottom-1 w-14 bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-500 z-10 ${isSliding ? 'left-[calc(100%-3.75rem)]' : 'left-1'}`}>
                <ChevronRight size={24} className="text-purple-600" />
            </div>

            {/* Text */}
            <span className={`absolute inset-0 flex items-center justify-center text-sm font-bold tracking-widest uppercase transition-opacity ${isSliding ? 'opacity-0' : 'text-slate-500'}`}>
                Slide to Start &gt;&gt;
            </span>
        </button>
      </div>

    </div>
  );
}