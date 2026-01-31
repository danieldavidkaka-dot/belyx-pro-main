import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Home } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export default function BookingSuccess() {
  const navigate = useNavigate();
  const { resetBooking } = useBooking();

  const handleFinish = () => {
    resetBooking(); // Limpiamos la memoria para la próxima vez
    navigate('/home');
  };

  return (
    <div className="bg-purple-600 min-h-screen flex flex-col items-center justify-center p-6 text-white text-center">
      <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 animate-bounce">
        <CheckCircle size={48} className="text-white" />
      </div>
      
      <h1 className="text-3xl font-black mb-2">Booking Confirmed!</h1>
      <p className="text-purple-100 mb-8 max-w-xs mx-auto">
        Your professional is getting ready. We've sent the details to your email.
      </p>

      <button 
        onClick={handleFinish}
        className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-bold shadow-lg w-full max-w-sm flex items-center justify-center gap-2 hover:bg-purple-50 transition-colors"
      >
        <Home size={20} /> Back to Home
      </button>
    </div>
  );
}