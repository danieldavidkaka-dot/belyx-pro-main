import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar as CalendarIcon, MapPin, Plus, RotateCcw } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
import { useBooking } from '../context/BookingContext'; // <--- 1. Importamos el Cerebro

// --- ESTRUCTURA DE DATOS (Mocks para relleno) ---
interface Booking {
  id: string;
  serviceName?: string;
  date?: string;
  time?: string;
  status: string; // Lo hacemos string genérico para aceptar ambos formatos
  type?: string;  // Para mocks
  locationType?: 'salon' | 'home'; // Para reales
  location?: string; // Para mocks
  address?: string; // Para reales
  professionalImage?: string;
  professionalName?: string;
  isFeatured?: boolean;
  price?: number;
}

const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'mock-1',
    serviceName: 'Gel Manicure Deluxe',
    date: 'Today',
    time: '14:00',
    status: 'Confirmed',
    type: 'At Home',
    location: '124 Tech Blvd, Apt 4B, SF',
    professionalImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    isFeatured: true,
    price: 45
  },
  {
    id: 'mock-2',
    serviceName: 'Full Body Massage',
    date: 'Oct 24',
    time: '10:00',
    status: 'Pending',
    type: 'In Salon',
    location: 'Zen Spa & Wellness',
    professionalImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    price: 80
  },
  {
    id: 'mock-6',
    serviceName: 'Hair Color Touch-up',
    date: 'Jul 10',
    time: '09:00',
    status: 'Cancelled',
    type: 'In Salon',
    location: 'Gloss Salon',
    price: 120.00
  }
];

interface MyBookingsProps {
  onBack?: () => void;
  onNavigate: (tab: any) => void;
}

export default function MyBookings({ onBack, onNavigate }: MyBookingsProps) {
  const navigate = useNavigate();
  const { bookingHistory } = useBooking(); // <--- 2. Obtenemos el historial real
  const [activeFilter, setActiveFilter] = useState<'Upcoming' | 'History'>('Upcoming');

  // 3. COMBINAMOS REALES + MOCKS (Las reales primero)
  const allBookings = [...bookingHistory, ...MOCK_BOOKINGS];

  const filteredBookings = allBookings.filter((booking: any) => {
    // Normalizamos el status a minúsculas para comparar
    const status = (booking.status || '').toLowerCase();
    
    if (activeFilter === 'Upcoming') {
        return status === 'confirmed' || status === 'pending' || status === 'draft';
    } else {
        return status === 'completed' || status === 'cancelled';
    }
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-24 font-sans relative">
      
      {/* HEADER */}
      <div className="bg-white sticky top-0 z-20 px-4 py-4 shadow-sm">
        <div className="flex items-center mb-4">
            <button onClick={() => onBack ? onBack() : navigate(-1)} className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition">
               <ArrowLeft size={20} className="text-slate-900" />
            </button>
            <h1 className="flex-1 text-center font-bold text-slate-900 mr-6">My Bookings</h1>
        </div>

        {/* TABS */}
        <div className="bg-slate-100 p-1 rounded-xl flex">
            {['Upcoming', 'History'].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveFilter(tab as any)}
                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                        activeFilter === tab 
                            ? 'bg-white text-purple-600 shadow-sm' 
                            : 'text-slate-400 hover:text-slate-500'
                    }`}
                >
                    {tab}
                </button>
            ))}
        </div>
      </div>

      {/* LISTA DINÁMICA */}
      <div className="px-6 pt-6 space-y-4">
        
        <h3 className="font-bold text-slate-900">
            {activeFilter === 'Upcoming' ? 'This Week' : 'Past Services'}
        </h3>

        {filteredBookings.length === 0 ? (
            <div className="text-center py-10 opacity-50">
                <CalendarIcon size={48} className="mx-auto mb-2 text-slate-300" />
                <p>No bookings found</p>
            </div>
        ) : (
            filteredBookings.map((booking: any) => {
                // LÓGICA DE ADAPTACIÓN DE DATOS (Real vs Mock)
                const isReal = !!booking.date; // Asumimos que si tiene fecha formateada es del mock, o adaptamos
                const displayStatus = booking.status.charAt(0).toUpperCase() + booking.status.slice(1);
                const displayType = booking.locationType === 'home' ? 'At Home' : (booking.type || 'In Salon');
                const displayLocation = booking.address || booking.location || 'Location details pending';
                const displayImage = booking.professionalImage || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=200"; // Placeholder si no hay imagen

                return (
                    <div 
                        key={booking.id}
                        className={`relative rounded-3xl p-5 shadow-sm active:scale-[0.98] transition-transform ${
                            (booking.isFeatured || booking.status === 'confirmed') && activeFilter === 'Upcoming'
                                ? 'bg-gradient-to-br from-purple-100 via-white to-cyan-50 border border-purple-100' 
                                : 'bg-white border border-slate-100'
                        }`}
                    >
                        <div className="flex justify-between items-start mb-3">
                            <div className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase flex items-center gap-1 ${
                                displayStatus.toLowerCase() === 'confirmed' ? 'bg-green-100 text-green-700' : 
                                displayStatus.toLowerCase() === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                displayStatus.toLowerCase() === 'completed' ? 'bg-slate-100 text-slate-500' :
                                'bg-red-50 text-red-500'
                            }`}>
                                {displayStatus}
                            </div>
                            <img src={displayImage} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" alt="Pro" />
                        </div>

                        <h3 className="text-lg font-bold text-slate-900 mb-1">{booking.serviceName || 'Service'}</h3>
                        <p className={`text-sm font-bold mb-4 ${booking.isFeatured ? 'text-purple-600' : 'text-slate-500'}`}>
                            {booking.date || 'Today'}, {booking.time || 'ASAP'}
                        </p>

                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
                            <MapPin size={14} className="shrink-0" />
                            <span className="truncate max-w-[200px]">{displayType} • {displayLocation}</span>
                        </div>

                        {/* BOTONES DE ACCIÓN */}
                        {activeFilter === 'Upcoming' ? (
                            <div className="flex gap-3 pt-2 border-t border-slate-50 mt-2">
                                <button 
                                    onClick={() => navigate(`/booking-details/${booking.id}`)}
                                    className="flex-1 bg-white border border-slate-200 text-slate-600 font-bold py-2.5 rounded-xl text-xs hover:bg-slate-50 transition"
                                >
                                    Details
                                </button>
                                <button className="flex-1 bg-[#8B31FF] text-white font-bold py-2.5 rounded-xl text-xs shadow-lg shadow-purple-200 flex items-center justify-center gap-2 transition hover:opacity-90">
                                    <CalendarIcon size={14} /> Manage
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between border-t border-slate-50 pt-3 mt-2">
                                <span className="font-bold text-slate-900">${booking.price?.toFixed(2)}</span>
                                <button className="text-purple-600 font-bold text-xs flex items-center gap-1 hover:bg-purple-50 px-3 py-1.5 rounded-lg transition-colors">
                                    <RotateCcw size={14} /> Book Again
                                </button>
                            </div>
                        )}
                    </div>
                );
            })
        )}
      </div>

      {/* FAB Solo en Upcoming */}
      {activeFilter === 'Upcoming' && (
          <div className="fixed bottom-24 left-0 right-0 flex justify-center z-40 pointer-events-none">
             <button 
                onClick={() => onNavigate('home')} 
                className="pointer-events-auto bg-gradient-to-r from-purple-600 to-cyan-500 text-white px-6 py-3 rounded-full shadow-xl shadow-purple-500/30 flex items-center gap-2 font-bold text-sm hover:scale-105 transition-transform"
             >
                <Plus size={18} />
                Book New Service
             </button>
          </div>
      )}

      <BottomNav 
        activeTab="bookings" 
        onNavigate={onNavigate} 
      />
    </div>
  );
}