import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { 
  Bell, MoreHorizontal, MapPin, Navigation, Plus, 
  Utensils, Users, Clock, ChevronRight, TrendingUp, LogOut, 
  Shield 
} from 'lucide-react';

// 1. IMPORTACIONES CENTRALIZADAS
import { ScheduleItem } from '../types';
import { STAFF_SCHEDULE } from '../data/mocks';

// Definición estricta de rutas internas
type DashboardRoute = '/staff-appointment' | '/staff-emergency' | '/';

interface StaffDashboardProps {
  onLogout: () => void;
}

export default function StaffDashboard({ onLogout }: StaffDashboardProps) {
  const [selectedDate, setSelectedDate] = useState(14); 
  const navigate = useNavigate(); // Hook de navegación

  // Función auxiliar segura para navegar dentro del dashboard
  const handleInternalNav = (route: DashboardRoute) => {
    navigate(route);
  };

  // Renderizador de tarjetas
  const renderCard = (item: ScheduleItem) => {
    switch (item.type) {
      case 'appointment':
        const isVIP = item.isVIP;
        return (
          <div 
             onClick={() => item.locationType === 'Home Visit' && handleInternalNav('/staff-appointment')}
             className={`relative p-4 rounded-3xl transition-all cursor-pointer active:scale-[0.98] ${
             isVIP 
               ? 'bg-white shadow-[0_0_20px_rgba(139,49,255,0.15)] border border-purple-100' 
               : 'bg-white border border-slate-100 shadow-sm'
          }`}>
            {isVIP && <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-cyan-500/5 rounded-3xl pointer-events-none"></div>}

            <div className="relative flex justify-between items-start mb-3">
               <div className="flex gap-2">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase ${
                      isVIP ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white' : 'bg-purple-50 text-purple-700'
                  }`}>
                      {isVIP ? '💎 VIP' : item.locationType?.toUpperCase()}
                  </span>
                  {item.locationType === 'Home Visit' && (
                      <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
                          <MapPin size={10} /> Home Visit
                      </span>
                  )}
               </div>
               <button className="text-slate-300 hover:text-slate-600"><MoreHorizontal size={18} /></button>
            </div>

            <div className="relative flex items-center gap-4 mb-4">
               <img src={item.clientImage} alt="Client" className="w-12 h-12 rounded-xl object-cover shadow-sm" />
               <div>
                  <h3 className="font-bold text-slate-900 text-lg">{item.clientName}</h3>
                  <p className="text-slate-500 text-xs">{item.serviceName}</p>
                  {item.duration && (
                      <div className="flex items-center gap-1 text-slate-400 text-[10px] mt-1 font-medium">
                          <Clock size={10} /> {item.duration}
                      </div>
                  )}
               </div>
            </div>

            {item.locationType === 'Home Visit' && (
               <div className="relative border-t border-slate-50 pt-3 flex items-center justify-between">
                   <div className="flex items-center gap-1 text-cyan-600 text-xs font-bold bg-cyan-50 px-2 py-1 rounded-md">
                      <Navigation size={12} fill="currentColor" />
                      {item.distance}
                   </div>
                   <button className="text-purple-600 text-xs font-bold flex items-center gap-1 hover:underline">
                      View Route <ChevronRight size={14} />
                   </button>
               </div>
            )}
          </div>
        );

      case 'meeting':
        return (
          <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-center gap-4 opacity-80">
             <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-500">
                <Users size={18} />
             </div>
             <div>
                <h3 className="font-bold text-slate-700 text-sm">{item.title}</h3>
                <p className="text-xs text-slate-400">{item.subtitle}</p>
             </div>
          </div>
        );

      case 'break':
        return (
          <div className="bg-orange-50/50 border border-orange-100/50 border-dashed p-3 rounded-2xl flex items-center justify-between px-6">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-400">
                   <Utensils size={14} />
                </div>
                <span className="font-bold text-orange-800/70 text-sm">{item.title}</span>
             </div>
             <span className="text-xs font-bold text-orange-400">{item.duration}</span>
          </div>
        );

      case 'empty':
        return (
          <div className="h-24 border-2 border-dashed border-slate-100 rounded-2xl flex items-center justify-center hover:bg-slate-50 transition cursor-pointer group">
             <span className="text-slate-300 font-bold text-sm group-hover:text-purple-400 transition-colors">Slot Available</span>
          </div>
        );

      default: return null;
    }
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-24 font-sans relative">
      
      {/* 1. HEADER */}
      <div className="bg-white p-6 pb-2 sticky top-0 z-20 shadow-sm">
         <div className="flex justify-between items-center mb-6">
             <div className="flex items-center gap-3">
                 <div className="relative">
                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200" alt="Staff" className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                 </div>
                 <div>
                     <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">STAFF PORTAL</p>
                     <h1 className="text-lg font-bold text-slate-900">Good Morning, Sarah</h1>
                 </div>
             </div>
             
             {/* BOTONES DE ACCIÓN */}
             <div className="flex gap-2">
                 <button onClick={() => handleInternalNav('/staff-emergency')} className="p-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-full transition border border-red-100"><Shield size={20} /></button>
                 <button onClick={onLogout} className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full transition"><LogOut size={20} /></button>
                 <button className="relative p-2 bg-slate-50 hover:bg-slate-100 rounded-full transition"><Bell size={20} className="text-slate-900" /><span className="absolute top-2 right-2 w-2 h-2 bg-purple-600 rounded-full"></span></button>
             </div>
         </div>

         {/* CALENDAR STRIP */}
         <div className="flex justify-between items-center mb-2">
            {[12, 13, 14, 15, 16].map((day, index) => {
                const isActive = day === selectedDate;
                const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
                return (
                    <button key={day} onClick={() => setSelectedDate(day)} className={`flex flex-col items-center justify-center w-14 h-16 rounded-2xl transition-all ${isActive ? 'bg-gradient-to-b from-[#8B31FF] to-[#00D4FF] text-white shadow-lg shadow-purple-200 scale-105' : 'bg-white border border-slate-100 text-slate-400 hover:border-purple-200'}`}>
                        <span className={`text-[10px] font-medium mb-1 ${isActive ? 'text-white/80' : 'text-slate-400'}`}>{days[index]}</span>
                        <span className="text-xl font-bold">{day}</span>
                    </button>
                )
            })}
         </div>
      </div>

      {/* 2. STATS OVERVIEW CARD */}
      <div className="px-6 py-6">
         <div className="bg-[#111] rounded-2xl p-6 text-white flex items-center justify-between shadow-xl shadow-slate-200">
             <div>
                 <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">TODAY'S OVERVIEW</p>
                 <div className="flex items-baseline gap-2">
                     <span className="text-3xl font-bold">5</span>
                     <span className="text-sm font-medium text-slate-400">Appointments</span>
                 </div>
             </div>
             <div className="h-10 w-px bg-white/20"></div>
             <div className="text-right">
                 <div className="flex items-center gap-1 justify-end text-cyan-400 text-sm font-bold mb-1"><TrendingUp size={16} /> 95%</div>
                 <p className="text-xs text-slate-400">Utilization</p>
             </div>
         </div>
      </div>

      {/* 3. TIMELINE & CARDS */}
      <div className="px-6 space-y-6 relative">
          <div className="absolute left-[4.5rem] top-4 bottom-10 w-px bg-slate-100 -z-10"></div>
          {STAFF_SCHEDULE.map((item) => (
              <div key={item.id} className="flex gap-4">
                  <div className="w-12 pt-4 flex flex-col items-end shrink-0">
                      <span className="text-sm font-bold text-slate-900 leading-none">{item.time.split(' ')[0]}</span>
                      <span className="text-[10px] font-medium text-slate-400">{item.time.split(' ')[1]}</span>
                  </div>
                  <div className="flex-1 min-w-0">{renderCard(item)}</div>
              </div>
          ))}
      </div>

      {/* 4. FAB */}
      <div className="fixed bottom-24 right-6 z-40">
          <button className="w-14 h-14 bg-[#111] rounded-full flex items-center justify-center text-white shadow-xl hover:scale-105 active:scale-95 transition-transform"><Plus size={24} /></button>
      </div>
    </div>
  );
}