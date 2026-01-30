import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Star, Calendar, Clock, CheckCircle2 } from 'lucide-react';

export default function SelectProfessional() {
  const navigate = useNavigate();
  const location = useLocation();
  const mode = location.state?.mode || 'salon'; 

  const [selectedDate, setSelectedDate] = useState<number>(1);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedPro, setSelectedPro] = useState<number | null>(null);

  const days = [
    { date: 24, day: 'Mon', active: true },
    { date: 25, day: 'Tue', active: true },
    { date: 26, day: 'Wed', active: true },
    { date: 27, day: 'Thu', active: true },
    { date: 28, day: 'Fri', active: true },
  ];
  const morningSlots = ['09:00', '10:00', '11:30'];
  const afternoonSlots = ['13:00', '14:30', '16:00', '17:30'];
  const professionals = [
    { id: 1, name: 'Sarah Jenkins', role: 'Top Stylist', rating: 5.0, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200' },
    { id: 2, name: 'Michael Ross', role: 'Senior Stylist', rating: 4.8, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200' },
    { id: 3, name: 'Jessica Lee', role: 'Color Expert', rating: 4.9, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200' },
  ];

  const handleContinue = () => {
    if (selectedTime && selectedPro) {
        if (mode === 'home') {
            navigate('/address', { state: { mode } });
        } else {
            navigate('/payment', { state: { mode } });
        }
    } else {
        alert("Por favor selecciona un profesional y una hora.");
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-28 font-sans text-slate-900">
      <div className="bg-white p-4 sticky top-0 z-20 flex items-center justify-between shadow-sm">
         {/* CORRECCIÓN: Usamos navigate(-1) para volver a Services */}
         <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-900 hover:bg-slate-100 rounded-full transition">
             <ChevronLeft size={24} />
         </button>
         <div className="text-center">
             <h1 className="font-bold text-lg">Select Professional</h1>
             <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">
                {mode === 'home' ? '🏠 At Home Service' : '💇‍♀️ In Salon Service'}
             </p>
         </div>
         <div className="w-8" /> 
      </div>

      <div className="p-6 space-y-8">
        <div>
            <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Calendar size={18} className="text-purple-600" /> Select Date</h2>
            <div className="flex justify-between items-center bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
                {days.map((d, index) => (
                    <button key={index} onClick={() => setSelectedDate(index)} className={`flex flex-col items-center justify-center w-14 h-16 rounded-xl transition-all ${selectedDate === index ? 'bg-[#111] text-white shadow-md scale-105' : 'text-slate-400 hover:bg-slate-50'}`}>
                        <span className="text-xs font-medium opacity-80">{d.day}</span>
                        <span className="text-lg font-bold">{d.date}</span>
                    </button>
                ))}
            </div>
        </div>

        <div>
            <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Star size={18} className="text-purple-600" /> Choose Expert</h2>
            <div className="space-y-3">
                {professionals.map((pro) => (
                    <button key={pro.id} onClick={() => setSelectedPro(pro.id)} className={`w-full flex items-center p-3 rounded-2xl border transition-all ${selectedPro === pro.id ? 'bg-purple-50 border-purple-500 shadow-sm' : 'bg-white border-slate-100 hover:border-purple-100'}`}>
                        <img src={pro.image} alt={pro.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                        <div className="ml-3 text-left flex-1">
                            <h3 className={`font-bold text-sm ${selectedPro === pro.id ? 'text-purple-900' : 'text-slate-900'}`}>{pro.name}</h3>
                            <p className="text-xs text-slate-500">{pro.role}</p>
                        </div>
                        <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-slate-100 shadow-sm"><Star size={10} className="text-yellow-500 fill-yellow-500" /><span className="text-xs font-bold text-slate-700">{pro.rating}</span></div>
                        {selectedPro === pro.id && <CheckCircle2 size={20} className="text-purple-600 ml-2" />}
                    </button>
                ))}
            </div>
        </div>

        <div className={!selectedPro ? 'opacity-50 pointer-events-none filter blur-[1px] transition-all' : 'transition-all'}>
            <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Clock size={18} className="text-purple-600" /> Available Slots</h2>
            <div className="mb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Morning</span>
                <div className="grid grid-cols-4 gap-3">
                    {morningSlots.map((time) => (
                        <button key={time} onClick={() => setSelectedTime(time)} className={`py-2 rounded-xl text-xs font-bold border transition-all ${selectedTime === time ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-purple-300'}`}>{time}</button>
                    ))}
                </div>
            </div>
            <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Afternoon</span>
                <div className="grid grid-cols-4 gap-3">
                    {afternoonSlots.map((time) => (
                        <button key={time} onClick={() => setSelectedTime(time)} className={`py-2 rounded-xl text-xs font-bold border transition-all ${selectedTime === time ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-purple-300'}`}>{time}</button>
                    ))}
                </div>
            </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white p-5 border-t border-slate-100 z-30 pb-8">
          <div className="flex justify-between items-center mb-3">
              <div><p className="text-xs text-slate-400 font-medium">Total Price</p><p className="text-xl font-black text-slate-900">$65.00</p></div>
              <button onClick={handleContinue} disabled={!selectedTime || !selectedPro} className="bg-[#111] text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-lg shadow-purple-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 hover:bg-slate-800 transition">
                  Continue <ChevronLeft size={16} className="rotate-180" />
              </button>
          </div>
      </div>
    </div>
  );
}