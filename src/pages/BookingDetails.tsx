import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, MapPin, Calendar, MessageCircle, Phone, XCircle, RotateCcw } from 'lucide-react';

const MOCK_DETAILS = {
  id: '#4092',
  status: 'Confirmed',
  service: {
    name: 'Luxury Gel Manicure',
    price: 45.00,
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=300'
  },
  professional: {
    name: 'Sarah Jenkins',
    role: 'Top Stylist',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200',
    phone: '+1 234 567 890'
  },
  schedule: {
    date: 'Fri, Oct 20',
    time: '10:00 AM'
  },
  location: {
    address: '124 Tech Blvd, Apt 4B',
    city: 'San Francisco, CA',
    type: 'At Home'
  },
  payment: {
    method: 'Apple Pay (**** 1234)',
    total: 52.50
  }
};

export default function BookingDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="bg-slate-50 min-h-screen pb-24 font-sans text-slate-900 relative">
      
      {/* HEADER */}
      <div className="bg-white p-4 sticky top-0 z-20 flex items-center justify-between shadow-sm">
         <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-900 hover:bg-slate-100 rounded-full transition">
             <ChevronLeft size={24} />
         </button>
         <h1 className="font-bold text-lg">Booking #{id || MOCK_DETAILS.id}</h1>
         <div className="w-8" /> 
      </div>

      <div className="p-6 space-y-6">
        
        {/* STATUS */}
        <div className="flex justify-center">
            <div className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/>
                {MOCK_DETAILS.status}
            </div>
        </div>

        {/* PRO CARD */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase mb-4">Professional</h3>
            <div className="flex items-center gap-4">
                <img src={MOCK_DETAILS.professional.image} alt="Pro" className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm" />
                <div className="flex-1">
                    <h2 className="font-bold text-slate-900">{MOCK_DETAILS.professional.name}</h2>
                    <p className="text-sm text-slate-500">{MOCK_DETAILS.professional.role}</p>
                </div>
                <div className="flex gap-2">
                    <button className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center hover:bg-purple-100 transition">
                        <MessageCircle size={20} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100 transition">
                        <Phone size={20} />
                    </button>
                </div>
            </div>
        </div>

        {/* SERVICE */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex gap-4">
             <img src={MOCK_DETAILS.service.image} alt="Svc" className="w-20 h-20 rounded-2xl object-cover" />
             <div>
                 <h2 className="font-bold text-lg text-slate-900 leading-tight">{MOCK_DETAILS.service.name}</h2>
                 <p className="text-slate-500 text-sm mt-1">{MOCK_DETAILS.service.duration} • ${MOCK_DETAILS.service.price}</p>
                 <div className="flex items-center gap-2 mt-3 text-sm font-medium text-slate-700">
                    <Calendar size={14} className="text-purple-600" />
                    {MOCK_DETAILS.schedule.date} at {MOCK_DETAILS.schedule.time}
                 </div>
             </div>
        </div>

        {/* LOCATION */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase mb-3">Location</h3>
            <div className="flex items-start gap-3 mb-4">
                <MapPin className="text-purple-600 shrink-0 mt-0.5" size={20} />
                <div>
                    <p className="font-bold text-slate-900">{MOCK_DETAILS.location.address}</p>
                    <p className="text-sm text-slate-500">{MOCK_DETAILS.location.city}</p>
                </div>
            </div>
            <div className="h-32 bg-slate-100 rounded-xl w-full relative overflow-hidden flex items-center justify-center">
                <span className="text-slate-400 text-xs font-bold">Map View Placeholder</span>
            </div>
        </div>

        {/* ACTIONS (CONECTADAS) */}
        <div className="grid grid-cols-2 gap-4 pt-4">
            <button 
                onClick={() => navigate('/select-pro')} // Reagendar: Vuelve a seleccionar
                className="flex flex-col items-center justify-center gap-2 bg-white border border-slate-200 p-4 rounded-2xl text-slate-600 font-bold text-sm hover:bg-slate-50 transition"
            >
                <RotateCcw size={20} />
                Reschedule
            </button>
            <button 
                onClick={() => navigate(`/cancel/${id}`)} // Cancelar: Va a la pantalla de cancelación
                className="flex flex-col items-center justify-center gap-2 bg-red-50 border border-red-100 p-4 rounded-2xl text-red-600 font-bold text-sm hover:bg-red-100 transition"
            >
                <XCircle size={20} />
                Cancel
            </button>
        </div>

      </div>
    </div>
  );
}