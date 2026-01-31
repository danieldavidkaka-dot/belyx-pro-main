import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, Star, Clock, ChevronRight } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
import { PATHS } from '../app/router/paths';
import { useBooking } from '../context/BookingContext';

export default function ServiceSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setService, setLocation } = useBooking(); 

  // 1. RECUPERAR DATOS DEL HOME (Modo y Categoría)
  const mode = location.state?.mode || 'salon'; 
  const incomingCategory = location.state?.category || 'All';

  // 2. INICIALIZAR ESTADO CON LA CATEGORÍA RECIBIDA
  const [activeCategory, setActiveCategory] = useState(incomingCategory);

  // Efecto para asegurar que si cambia la navegación, se actualice (opcional pero seguro)
  useEffect(() => {
    if (incomingCategory) {
      setActiveCategory(incomingCategory);
    }
  }, [incomingCategory]);

  // --- DATOS MOCK ---
  const categories = ['All', 'Hair', 'Nails', 'Facial', 'Massage', 'Makeup'];
  
  const popularServices = [
    { id: 1, name: 'Haircut & Styling', duration: '45 mins', price: 65, rating: 4.8, category: 'Hair', image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=400' },
    { id: 2, name: 'Manicure Deluxe', duration: '60 mins', price: 45, rating: 4.9, category: 'Nails', image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?q=80&w=400' },
    { id: 3, name: 'HydraFacial', duration: '50 mins', price: 110, rating: 4.9, category: 'Facial', image: 'https://images.unsplash.com/photo-1512290923902-8a9281ec8a4f?q=80&w=400' },
  ];

  const allServices = [
    { id: 10, type: 'wide', category: 'Hair', name: 'Hair Coloring', desc: 'Full head color change...', duration: '2 hrs', price: 120, image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=600' },
    { id: 11, type: 'list', category: 'Hair', name: 'Keratin Treatment', desc: 'Smooth and shine treatment...', duration: '90 mins', price: 150, image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=200' },
    { id: 12, type: 'list', category: 'Hair', name: 'Blowout & Style', desc: 'Wash, blow-dry...', duration: '45 mins', price: 55, image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=200' },
    { id: 13, type: 'wide', category: 'Nails', name: 'Gel Manicure', desc: 'Long lasting gel polish...', duration: '50 mins', price: 50, image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600' },
    { id: 14, type: 'list', category: 'Massage', name: 'Deep Tissue', desc: 'Relieve muscle tension...', duration: '60 mins', price: 90, image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=200' },
    { id: 15, type: 'list', category: 'Facial', name: 'Anti-Aging Facial', desc: 'Rejuvenating treatment...', duration: '50 mins', price: 130, image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=200' },
  ];

  // 3. FILTRADO DE SERVICIOS
  const filteredServices = activeCategory === 'All' 
    ? allServices 
    : allServices.filter(s => s.category === activeCategory);

  const handleBookClick = (service: any) => {
      console.log(`💾 Guardando: Servicio=${service.name}, Modo=${mode}`);
      setService(String(service.id), service.name, service.price);
      setLocation(mode as 'salon' | 'home', ''); 
      navigate(PATHS.BOOKING.SELECT_PRO);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24 font-sans text-slate-900">
      <div className="bg-white p-4 sticky top-0 z-20 flex items-center justify-between shadow-sm">
         <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-900 hover:bg-slate-100 rounded-full transition"><ChevronLeft size={24} /></button>
         <div className="text-center">
            <h1 className="font-bold text-lg">Service Selection</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{mode === 'home' ? '🏠 At Home' : '💇‍♀️ In Salon'}</p>
         </div>
         <button className="p-2 text-slate-900 hover:bg-slate-100 rounded-full transition"><Search size={24} /></button>
      </div>

      <div className="p-6 space-y-8">
        {/* TABS */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-[#111] text-white shadow-md' : 'bg-white text-slate-600 border border-slate-100 hover:bg-slate-100'}`}>{cat}</button>
            ))}
        </div>

        {/* POPULAR (Solo se muestra si estamos en "All", para no distraer en filtros específicos) */}
        {activeCategory === 'All' && (
          <div>
              <div className="flex justify-between items-center mb-4"><h2 className="font-bold text-lg text-slate-900">Popular Services</h2><button className="text-xs font-bold text-purple-600 flex items-center">View All <ChevronRight size={16} /></button></div>
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
                  {popularServices.map((service) => (
                      <div key={service.id} className="min-w-[260px] bg-white rounded-3xl p-3 border border-slate-100 shadow-sm snap-center group cursor-pointer hover:border-purple-100 transition-all">
                          <div className="h-40 rounded-2xl overflow-hidden mb-3 relative"><img src={service.image} alt={service.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" /><div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-full flex items-center gap-1 text-[10px] font-bold shadow-sm"><Star size={10} className="text-yellow-500 fill-yellow-500" /> {service.rating}</div></div>
                          <h3 className="font-bold text-base mb-1">{service.name}</h3>
                          <div className="flex items-center gap-2 text-xs text-slate-500 mb-4"><Clock size={14} /> {service.duration}</div>
                          <div className="flex items-center justify-between"><span className="font-black text-lg">${service.price}</span>
                              <button onClick={() => handleBookClick(service)} className="bg-[#111] text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-slate-800 transition active:scale-95">Book Now</button>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
        )}

        {/* LIST (Filtrada) */}
        <div>
             <h2 className="font-bold text-lg text-slate-900 mb-4">{activeCategory === 'All' ? 'All Services' : `${activeCategory} Services`}</h2>
             <div className="space-y-4">
                {filteredServices.length > 0 ? (
                    filteredServices.map((service) => (
                        <div key={service.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm group hover:border-purple-100 transition-all">
                            {service.type === 'wide' ? (
                                <div><div className="h-48 overflow-hidden relative"><img src={service.image} alt={service.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" /></div><div className="p-5"><div className="flex justify-between items-start mb-2"><div><h3 className="font-bold text-lg mb-1">{service.name}</h3><p className="text-sm text-slate-500 line-clamp-2">{service.desc}</p></div><span className="font-black text-lg">${service.price}</span></div><div className="flex items-center justify-between mt-4"><div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full"><Clock size={14} /> {service.duration}</div><button onClick={() => handleBookClick(service)} className="bg-[#111] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-slate-800 transition active:scale-95">Book</button></div></div></div>
                            ) : (
                                <div className="p-3 flex gap-4"><div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 relative"><img src={service.image} alt={service.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" /></div><div className="flex-1 flex flex-col justify-between py-1"><div><div className="flex justify-between items-start"><h3 className="font-bold text-base mb-1 line-clamp-1">{service.name}</h3><span className="font-black text-base ml-2">${service.price}</span></div><p className="text-xs text-slate-500 line-clamp-2 mb-2">{service.desc}</p></div><div className="flex items-center justify-between"><span className="text-xs font-bold text-slate-400 flex items-center gap-1"><Clock size={12} /> {service.duration}</span><button onClick={() => handleBookClick(service)} className="bg-[#111] text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-slate-800 transition active:scale-95">Book</button></div></div></div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10 text-slate-400">
                        <p>No services found for {activeCategory}.</p>
                    </div>
                )}
             </div>
        </div>
      </div>
      <BottomNav activeTab="home" onNavigate={(path) => navigate(PATHS.CLIENT[path.toUpperCase() as keyof typeof PATHS.CLIENT] || `/${path}`)} />
    </div>
  );
}