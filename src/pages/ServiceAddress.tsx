import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, Plus, Home, Briefcase, Navigation } from 'lucide-react';
import { PATHS } from '../app/router/paths'; // Rutas
import { useBooking } from '../context/BookingContext'; // Cerebro

export default function ServiceAddress() {
  const navigate = useNavigate();
  const { setLocation } = useBooking(); // <--- Función para guardar

  // Estado para saber cuál tarjeta está seleccionada
  const [selectedId, setSelectedId] = useState<number>(1);

  // Direcciones simuladas (en el futuro vendrán de tu API/Perfil de usuario)
  const savedAddresses = [
    { 
      id: 1, 
      label: 'Home', 
      address: '123 Main Street, Apt 4B', 
      icon: <Home size={18} /> 
    },
    { 
      id: 2, 
      label: 'Office', 
      address: 'Tech Plaza, Floor 12', 
      icon: <Briefcase size={18} /> 
    },
  ];

  const handleConfirm = () => {
    // 1. Buscamos la dirección completa basada en el ID seleccionado
    const addressToSave = savedAddresses.find(a => a.id === selectedId)?.address || '';

    console.log("📍 Guardando dirección:", addressToSave);

    // 2. Guardamos en el Contexto
    setLocation('home', addressToSave);

    // 3. Avanzamos al Pago
    navigate(PATHS.BOOKING.PAYMENT);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24 font-sans text-slate-900 flex flex-col">
      
      {/* HEADER */}
      <div className="bg-white p-4 sticky top-0 z-20 flex items-center justify-between shadow-sm">
         <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-900 hover:bg-slate-100 rounded-full transition">
             <ChevronLeft size={24} />
         </button>
         <h1 className="font-bold text-lg">Location</h1>
         <div className="w-8" /> 
      </div>

      {/* MAPA VISUAL (Tu diseño original) */}
      <div className="relative h-56 bg-slate-200 w-full overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center opacity-60 mix-blend-multiply"></div>
          <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                  <div className="w-4 h-4 bg-purple-600 rounded-full animate-ping absolute inset-0"></div>
                  <div className="w-4 h-4 bg-purple-600 rounded-full border-2 border-white shadow-lg relative z-10"></div>
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-lg shadow-md whitespace-nowrap">
                      <p className="text-xs font-bold text-slate-900">Meeting Point</p>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-white"></div>
                  </div>
              </div>
          </div>
      </div>

      {/* PANEL DE DIRECCIONES */}
      <div className="flex-1 bg-white -mt-6 rounded-t-[32px] relative z-10 p-6 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-6" />
        <h2 className="font-bold text-xl text-slate-900 mb-2">Where to meet?</h2>
        <p className="text-sm text-slate-500 mb-6">Choose a saved address or enter a new location for your service.</p>

        <div className="space-y-4 mb-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Saved Locations</h3>
            
            {savedAddresses.map((addr) => (
                <button 
                    key={addr.id} 
                    onClick={() => setSelectedId(addr.id)} 
                    className={`w-full flex items-center p-4 rounded-2xl border transition-all ${
                        selectedId === addr.id 
                        ? 'bg-purple-50 border-purple-500 shadow-sm ring-1 ring-purple-500' 
                        : 'bg-white border-slate-100 hover:bg-slate-50'
                    }`}
                >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        selectedId === addr.id 
                        ? 'bg-purple-100 text-purple-600' 
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                        {addr.icon}
                    </div>
                    
                    <div className="ml-3 text-left flex-1">
                        <h4 className={`font-bold text-sm ${selectedId === addr.id ? 'text-purple-900' : 'text-slate-900'}`}>
                            {addr.label}
                        </h4>
                        <p className="text-xs text-slate-500">{addr.address}</p>
                    </div>
                    
                    {/* Check visual */}
                    {selectedId === addr.id && (
                        <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-sm animate-in fade-in zoom-in duration-200">
                            <MapPin size={12} />
                        </div>
                    )}
                </button>
            ))}
        </div>

        <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center gap-2 text-slate-500 font-bold text-sm hover:border-purple-300 hover:text-purple-600 hover:bg-purple-50 transition-all group">
            <Plus size={18} className="group-hover:scale-110 transition-transform" /> 
            Add New Address
        </button>
      </div>

      {/* FOOTER ACTION */}
      <div className="p-6 bg-white border-t border-slate-100 sticky bottom-0 z-20">
          <button 
              onClick={handleConfirm} 
              className="w-full bg-[#111] text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-slate-200 hover:bg-slate-800 transition active:scale-[0.98] flex items-center justify-center gap-2"
          >
              Confirm Location <Navigation size={16} />
          </button>
      </div>
    </div>
  );
}