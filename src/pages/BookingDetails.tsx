import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, Phone, MessageSquare, ShieldCheck, XCircle, Navigation } from 'lucide-react';
import { useBooking } from '../context/BookingContext'; // <--- 1. Conexión al Cerebro

// --- MOCKS DE RESPALDO (Para que las reservas de ejemplo funcionen) ---
const MOCK_DETAILS: any[] = [
  {
    id: 'mock-1',
    serviceName: 'Gel Manicure Deluxe',
    professionalName: 'Sarah Jenkins',
    price: 45,
    date: 'Today',
    time: '14:00',
    status: 'confirmed',
    locationType: 'home',
    address: '124 Tech Blvd, Apt 4B, San Francisco',
    professionalImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'mock-2',
    serviceName: 'Full Body Massage',
    professionalName: 'Zen Spa Team',
    price: 80,
    date: 'Oct 24',
    time: '10:00',
    status: 'pending',
    locationType: 'salon',
    address: 'Zen Spa & Wellness',
    professionalImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'mock-6', // Coincide con el mock de MyBookings
    serviceName: 'Hair Color Touch-up',
    professionalName: 'Gloss Salon',
    price: 120,
    date: 'Jul 10',
    time: '09:00',
    status: 'cancelled',
    locationType: 'salon',
    address: 'Gloss Salon',
    professionalImage: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=200'
  }
];

export default function BookingDetails() {
  const navigate = useNavigate();
  const { id } = useParams(); // Obtenemos el ID de la URL
  const { bookingHistory, cancelBooking } = useBooking(); // Traemos historial y función cancelar

  // 2. BUSCAR LA RESERVA (Primero en historial real, luego en mocks)
  const booking = useMemo(() => {
    return bookingHistory.find(b => b.id === id) || MOCK_DETAILS.find(b => b.id === id);
  }, [id, bookingHistory]);

  const handleCancel = () => {
    if (id) {
        if(window.confirm("Are you sure you want to cancel this booking?")) {
            cancelBooking(id);
            navigate(-1); // Volver atrás
        }
    }
  };

  const handleTrack = () => {
    navigate('/track-pro');
  };

  if (!booking) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-400 gap-4">
            <p>Booking not found</p>
            <button onClick={() => navigate(-1)} className="text-purple-600 font-bold">Go Back</button>
        </div>
    );
  }

  // Normalización de datos para visualización
  const isHome = booking.locationType === 'home' || booking.type === 'At Home';
  // Normalizar estado (primera letra mayúscula)
  const rawStatus = booking.status || 'confirmed';
  const displayStatus = rawStatus.charAt(0).toUpperCase() + rawStatus.slice(1);
  
  const displayImage = booking.professionalImage || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=200";
  const displayName = booking.professionalName || 'Assigned Pro';
  const displayAddress = booking.address || booking.location || 'Location details pending';

  return (
    <div className="bg-slate-50 min-h-screen pb-24 font-sans text-slate-900 relative">
      
      {/* HEADER & MAP PREVIEW */}
      <div className="relative h-48 bg-slate-200">
          <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-122.4194,37.7749,13,0/600x400?access_token=YOUR_KEY')] bg-cover bg-center opacity-60"></div>
          <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-10">
              <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-slate-50 transition">
                  <ArrowLeft size={20} />
              </button>
              <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm uppercase tracking-wider">
                  {id?.startsWith('mock') ? `#${id.split('-')[1]}` : 'Booking ID: #8291'}
              </span>
          </div>
      </div>

      {/* CONTENIDO PRINCIPAL (Overlap) */}
      <div className="relative -mt-6 rounded-t-[32px] bg-white px-6 pt-8 pb-6 shadow-sm min-h-[500px]">
          
          {/* TITULO Y ESTADO */}
          <div className="flex justify-between items-start mb-6">
              <div>
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase mb-2 ${
                      rawStatus === 'confirmed' ? 'bg-green-100 text-green-700' :
                      rawStatus === 'cancelled' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                  }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                          rawStatus === 'confirmed' ? 'bg-green-500' :
                          rawStatus === 'cancelled' ? 'bg-red-500' :
                          'bg-yellow-500'
                      }`} />
                      {displayStatus}
                  </div>
                  <h1 className="text-2xl font-bold text-slate-900 leading-tight">{booking.serviceName}</h1>
              </div>
              <div className="text-right">
                  <span className="block text-2xl font-black text-slate-900">${booking.price}</span>
                  <span className="text-xs text-slate-400">Total Paid</span>
              </div>
          </div>

          {/* TARJETA PROFESIONAL */}
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-6">
              <img src={displayImage} alt="Pro" className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
              <div className="flex-1">
                  <p className="text-xs text-slate-400 font-bold uppercase">Professional</p>
                  <h3 className="font-bold text-slate-900">{displayName}</h3>
                  <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
                      <ShieldCheck size={12} /> Verified & Vetted
                  </div>
              </div>
              <div className="flex gap-2">
                  <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center border border-slate-200 text-slate-600 shadow-sm hover:text-purple-600">
                      <MessageSquare size={16} />
                  </button>
                  <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center border border-slate-200 text-slate-600 shadow-sm hover:text-purple-600">
                      <Phone size={16} />
                  </button>
              </div>
          </div>

          {/* DETALLES (GRID) */}
          <h3 className="font-bold text-slate-900 mb-4">Appointment Details</h3>
          <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-purple-600 mb-2 shadow-sm">
                      <Calendar size={16} />
                  </div>
                  <p className="text-xs text-slate-400 mb-0.5">Date</p>
                  <p className="font-bold text-slate-900">{booking.date || 'Today'}</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-purple-600 mb-2 shadow-sm">
                      <Clock size={16} />
                  </div>
                  <p className="text-xs text-slate-400 mb-0.5">Time</p>
                  <p className="font-bold text-slate-900">{booking.time || 'ASAP'}</p>
              </div>
              <div className="col-span-2 p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-purple-600 shrink-0 shadow-sm">
                      <MapPin size={16} />
                  </div>
                  <div>
                      <p className="text-xs text-slate-400 mb-0.5">Location ({isHome ? 'Home' : 'Salon'})</p>
                      <p className="font-bold text-slate-900 text-sm">{displayAddress}</p>
                  </div>
              </div>
          </div>

      </div>

      {/* FOOTER ACTIONS */}
      {rawStatus === 'confirmed' && (
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100 flex gap-3 z-30">
              <button 
                onClick={handleCancel}
                className="flex-1 py-3.5 rounded-2xl border border-red-100 text-red-500 font-bold flex items-center justify-center gap-2 hover:bg-red-50 transition-colors"
              >
                  <XCircle size={18} /> Cancel
              </button>
              
              {isHome ? (
                  <button 
                    onClick={handleTrack}
                    className="flex-[2] py-3.5 rounded-2xl bg-[#111] text-white font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-slate-800 transition-colors"
                  >
                      <Navigation size={18} /> Track Pro
                  </button>
              ) : (
                  <button className="flex-[2] py-3.5 rounded-2xl bg-slate-100 text-slate-400 font-bold flex items-center justify-center gap-2 cursor-not-allowed">
                      Get Directions
                  </button>
              )}
          </div>
      )}
    </div>
  );
}