import React, { useState } from 'react';
import { ArrowLeft, Share2, Heart, Star, Clock, MessageCircle } from 'lucide-react';
import { GradientButton } from '../components/GradientButton';
import AddOnRow from '../components/AddOnRow';

// 1. Definimos la interfaz para recibir las funciones de navegación desde App.tsx
interface ServiceDetailsProps {
  onBack: () => void;
  onBook: () => void;
  onServiceSelect?: () => void; // <--- Agregamos '?' para hacerla opcional
}

// --- MOCK DATA (Simulando base de datos) ---
const SERVICE = {
  id: 1,
  title: 'Luxury Gel Manicure',
  basePrice: 65,
  rating: 4.9,
  reviews: 128,
  duration: '60 mins',
  description: 'Experience our signature manicure featuring meticulous cuticle care, nail shaping, and a relaxing hand massage. Finished with your choice of premium long-lasting gel polish.',
  image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  provider: {
    name: 'Sarah Jenkins',
    role: 'Top Rated Specialist',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    isOnline: true
  },
  addOns: [
    { 
      id: 'wax', 
      title: 'Paraffin Wax Dip', 
      price: 15, 
      duration: 10, 
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' 
    }
  ]
};

export default function ServiceDetails({ onBack, onBook }: ServiceDetailsProps) {
  const [activeTab, setActiveTab] = useState<'salon' | 'home'>('salon');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  // Lógica para seleccionar/deseleccionar extras
  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Cálculo dinámico del precio total
  const totalPrice = SERVICE.basePrice + SERVICE.addOns
    .filter(addon => selectedAddOns.includes(addon.id))
    .reduce((sum, addon) => sum + addon.price, 0);

  return (
    <div className="bg-gray-50 min-h-screen pb-24 font-sans relative">
      
      {/* --- HEADER --- */}
      <div className="relative h-72 w-full">
        <img 
          src={SERVICE.image} 
          alt={SERVICE.title} 
          className="w-full h-full object-cover"
        />
        {/* Overlay degradado */}
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Barra de navegación superior */}
        <div className="absolute top-0 w-full p-4 flex justify-between items-center pt-8 z-10">
          {/* BOTÓN ATRÁS: Ejecuta la prop onBack */}
          <button 
            onClick={onBack} 
            className="bg-white/90 p-2 rounded-full shadow-sm hover:scale-105 transition active:scale-95"
          >
            <ArrowLeft size={20} className="text-gray-800" />
          </button>
          
          <div className="flex gap-3">
            <button className="bg-white/90 p-2 rounded-full shadow-sm hover:scale-105 transition">
              <Share2 size={20} className="text-gray-800" />
            </button>
            <button className="bg-white/90 p-2 rounded-full shadow-sm hover:scale-105 transition">
              <Heart size={20} className="text-gray-800" />
            </button>
          </div>
        </div>
      </div>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <main className="relative -mt-6 bg-white rounded-t-[32px] px-6 pt-8 shadow-xl z-0">
        
        {/* Título y Precio */}
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-2xl font-bold text-gray-900 w-3/4 leading-tight">{SERVICE.title}</h1>
          <span className="text-2xl font-bold text-purple-600">${SERVICE.basePrice}</span>
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
          <div className="flex items-center gap-1">
            <Star size={16} className="text-purple-600 fill-purple-600" />
            <span className="font-bold text-gray-900">{SERVICE.rating}</span>
            <span className="text-gray-400">({SERVICE.reviews} reviews)</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{SERVICE.duration}</span>
          </div>
        </div>

        {/* Toggle Salon/Home */}
        <div className="bg-gray-100 p-1 rounded-xl flex mb-6">
          <button 
            onClick={() => setActiveTab('salon')}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'salon' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            In-Salon
          </button>
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'home' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            At-Home
          </button>
        </div>

        {/* Descripción */}
        <div className="mb-8">
          <h3 className="font-bold text-gray-900 mb-2">Description</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            {SERVICE.description} <span className="text-purple-600 font-semibold cursor-pointer">Read more</span>
          </p>
        </div>

        {/* Add-ons (Usando el componente AddOnRow) */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900">Enhance your experience</h3>
            <Star size={16} className="text-purple-300" />
          </div>
          
          {SERVICE.addOns.map(addon => (
            <AddOnRow
              key={addon.id}
              {...addon}
              isSelected={selectedAddOns.includes(addon.id)}
              onToggle={() => toggleAddOn(addon.id)}
            />
          ))}
        </div>

        {/* Proveedor */}
        <div className="mb-8">
            <h3 className="font-bold text-gray-900 mb-4">Service Provider</h3>
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-3">
                <div className="relative">
                    <img src={SERVICE.provider.image} alt="Provider" className="w-12 h-12 rounded-full object-cover" />
                    {SERVICE.provider.isOnline && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    )}
                </div>
                <div>
                <h4 className="font-bold text-gray-900 text-sm">{SERVICE.provider.name}</h4>
                <p className="text-xs text-purple-600 font-medium">{SERVICE.provider.role}</p>
                </div>
            </div>
            <button className="bg-white p-2 rounded-xl shadow-sm hover:bg-gray-100 transition">
                <MessageCircle size={20} className="text-purple-600" />
            </button>
            </div>
        </div>

      </main>

      {/* --- FOOTER FLOTANTE --- */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 p-6 z-50">
        <div className="flex items-center justify-between max-w-md mx-auto gap-6">
          <div>
            <p className="text-xs text-gray-400 font-medium">Total Price</p>
            <p className="text-3xl font-bold text-gray-900 animate-pulse-once">${totalPrice}</p>
          </div>
          <div className="flex-1">
            {/* BOTÓN RESERVAR: Ejecuta la prop onBook */}
            <GradientButton 
              text="Book Appointment" 
              onClick={onBook} 
            />
          </div>
        </div>
      </div>

    </div>
  );
}