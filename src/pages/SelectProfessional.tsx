import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Star, Clock, ShieldCheck, Search, Filter } from 'lucide-react';
import { useBooking } from '../context/BookingContext'; // <--- El Cerebro
import { PATHS } from '../app/router/paths';

// Datos simulados (Mocks)
const PROFESSIONALS = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    role: 'Master Stylist',
    rating: 4.9,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    specialty: 'Color & Cuts',
    available: true
  },
  {
    id: '2',
    name: 'Miguel Angel',
    role: 'Senior Barber',
    rating: 4.8,
    reviews: 85,
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=200',
    specialty: 'Fade & Beard',
    available: true
  },
  {
    id: '3',
    name: 'Jessica Lee',
    role: 'Nail Artist',
    rating: 5.0,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    specialty: 'Gel & Acrylic',
    available: false
  }
];

export default function SelectProfessional() {
  const navigate = useNavigate();
  const { setProfessional } = useBooking(); // Función para guardar

  const handleSelect = (pro: typeof PROFESSIONALS[0]) => {
    console.log("👤 Profesional seleccionado:", pro.name);
    
    // 1. Guardamos en el cerebro
    setProfessional(pro.id, pro.name);
    
    // 2. Navegamos al siguiente paso (Consulta)
    navigate('/booking/consultation');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-6 font-sans text-slate-900">
      
      {/* HEADER */}
      <div className="bg-white p-4 sticky top-0 z-20 flex items-center justify-between shadow-sm">
         <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-slate-100 rounded-full transition">
             <ChevronLeft size={24} />
         </button>
         <h1 className="font-bold text-lg">Select Professional</h1>
         <button className="p-2 hover:bg-slate-100 rounded-full transition">
             <Search size={24} />
         </button>
      </div>

      <div className="p-6 space-y-6">
        
        {/* FILTROS (Visual) */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#111] text-white rounded-full text-xs font-bold shadow-md">
                <Filter size={14} /> Recommended
            </button>
            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-full text-xs font-bold whitespace-nowrap">
                Top Rated
            </button>
            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-full text-xs font-bold whitespace-nowrap">
                Near Me
            </button>
        </div>

        {/* LISTA DE PROFESIONALES */}
        <div className="space-y-4">
            {PROFESSIONALS.map((pro) => (
                <div 
                    key={pro.id} 
                    onClick={() => pro.available && handleSelect(pro)}
                    className={`bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex gap-4 transition-all ${pro.available ? 'active:scale-[0.98] cursor-pointer' : 'opacity-60 grayscale cursor-not-allowed'}`}
                >
                    {/* AVATAR */}
                    <div className="relative w-20 h-20 shrink-0">
                        <img src={pro.image} alt={pro.name} className="w-full h-full object-cover rounded-2xl" />
                        <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-full shadow-sm">
                            <div className="bg-yellow-100 px-1.5 py-0.5 rounded-full flex items-center gap-1">
                                <Star size={10} className="text-yellow-600 fill-yellow-600" />
                                <span className="text-[10px] font-bold text-yellow-800">{pro.rating}</span>
                            </div>
                        </div>
                    </div>

                    {/* INFO */}
                    <div className="flex-1 flex flex-col justify-center">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-slate-900">{pro.name}</h3>
                                <p className="text-xs text-purple-600 font-bold mb-1">{pro.role}</p>
                            </div>
                            {pro.id === '1' && (
                                <ShieldCheck size={16} className="text-blue-500" />
                            )}
                        </div>
                        
                        <p className="text-xs text-slate-400 mb-3 line-clamp-1">{pro.specialty} • {pro.reviews} reviews</p>

                        <div className="flex items-center gap-2">
                             {pro.available ? (
                                <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                    <Clock size={10} /> Available Today
                                </span>
                             ) : (
                                <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                                    Fully Booked
                                </span>
                             )}
                        </div>
                    </div>
                </div>
            ))}
        </div>

      </div>
    </div>
  );
}