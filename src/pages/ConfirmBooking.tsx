import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Calendar, MapPin, Home } from 'lucide-react';
import { GradientButton } from '../components/GradientButton';
import { PATHS } from '../app/router/paths';
import { useBooking } from '../context/BookingContext';

export default function ConfirmBooking() {
  const navigate = useNavigate();
  const { booking, resetBooking } = useBooking();

  const handleTrack = () => {
    navigate('/track-pro');
  };

  const handleHome = () => {
    resetBooking();
    navigate(PATHS.CLIENT.HOME);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-6 flex flex-col font-sans">
      
      {/* 1. SUCCESS HERO */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center mt-10">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce shadow-lg shadow-green-100">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white shadow-inner">
                <Check size={40} strokeWidth={4} />
            </div>
        </div>
        
        <h1 className="text-3xl font-black text-slate-900 mb-2">Booking Confirmed!</h1>
        <p className="text-slate-500 max-w-xs mx-auto mb-8">
            Your appointment has been successfully booked. We've sent a confirmation to your email.
        </p>

        {/* RESUMEN DE LA RESERVA */}
        <div className="bg-white p-5 rounded-3xl shadow-lg shadow-slate-100 w-full max-w-sm border border-slate-100">
            <div className="flex justify-between items-start mb-4 border-b border-slate-50 pb-4">
                <div className="text-left">
                    <h3 className="font-bold text-lg text-slate-900">{booking.serviceName || 'Service'}</h3>
                    <p className="text-sm text-slate-400">with {booking.professionalName || 'Professional'}</p>
                </div>
                <div className="text-right">
                    <span className="block font-black text-lg text-slate-900">${booking.price}</span>
                    <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">PAID</span>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                        <Calendar size={16} className="text-slate-400" />
                    </div>
                    <span className="font-medium">Today, As Soon As Possible</span>
                </div>
                
                {/* Solo mostramos dirección si es Home */}
                {booking.locationType === 'home' ? (
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                            <MapPin size={16} className="text-slate-400" />
                        </div>
                        <span className="font-medium truncate">{booking.address || 'Home Address'}</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                         <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                            <MapPin size={16} className="text-slate-400" />
                        </div>
                        <span className="font-medium">In Salon Appointment</span>
                    </div>
                )}
            </div>
        </div>
      </div>

      {/* 2. ACTIONS */}
      <div className="p-6 space-y-3 bg-white border-t border-slate-100 rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        
        {/* CORRECCIÓN: Botón "Track" SOLO visible si es 'home' */}
        {booking.locationType === 'home' && (
            <GradientButton 
                text="Track Professional" 
                fullWidth={true}
                onClick={handleTrack}
            />
        )}
        
        <button 
            onClick={handleHome}
            className="w-full py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
        >
            <Home size={18} /> Back to Home
        </button>
      </div>

    </div>
  );
}