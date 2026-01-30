import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Calendar, Clock, MapPin, CreditCard, 
  CheckCircle, ShieldCheck, ChevronRight 
} from 'lucide-react';

// Datos Centralizados (Asegúrate de tener BOOKING_SUMMARY en mocks.ts)
import { BOOKING_SUMMARY } from '../data/mocks';
 
interface ConfirmBookingProps {
   onBack?: () => void; // Hacemos opcional la prop para usar navegación nativa si falta
   onConfirm?: () => void;
}
 
export const ConfirmBooking = ({ onBack, onConfirm }: ConfirmBookingProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Hook de navegación
  const navigate = useNavigate();
  
  // Si el padre no pasa onBack, usamos el historial del navegador
  const handleBack = onBack || (() => navigate(-1));
  
  const handleConfirm = () => {
    setIsProcessing(true);
    // Simulamos proceso de pago
    setTimeout(() => {
        if (onConfirm) {
            onConfirm();
        } else {
            // Navegación por defecto si no se pasa prop
            navigate('/track'); 
        }
    }, 1500);
  };

  // Usamos los datos del Mock
  const data = BOOKING_SUMMARY;

   return (
    <div className="bg-slate-50 min-h-screen pb-24 font-sans text-slate-900 relative">
       
       {/* HEADER */}
       <div className="bg-white p-4 sticky top-0 z-20 flex items-center justify-between shadow-sm">
          <button onClick={handleBack} className="p-2 -ml-2 text-slate-900 hover:bg-slate-100 rounded-full transition">
              <ChevronLeft size={24} />
          </button>
          <h1 className="font-bold text-lg">Confirmar Reserva</h1>
          <div className="w-8" /> 
       </div>
 
       <div className="p-6 space-y-6">
          
        {/* PROFESSIONAL & SERVICE CARD */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex items-start gap-4 mb-4">
                <img src={data.service.image} alt="Service" className="w-20 h-20 rounded-2xl object-cover shadow-sm" />
                <div>
                    <h2 className="font-bold text-lg text-slate-900 leading-tight">{data.service.name}</h2>
                    <p className="text-slate-500 text-sm mt-1">{data.service.duration} • ${data.service.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                        <img src={data.professional.image} alt="Pro" className="w-5 h-5 rounded-full object-cover" />
                        <span className="text-xs font-medium text-slate-600">{data.professional.name}</span>
                    </div>
                 </div>
             </div>
            
            <div className="h-px bg-slate-100 my-4"></div>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                        <Calendar size={16} />
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">FECHA</p>
                        <p className="text-sm font-bold text-slate-900">{data.schedule.date}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                        <Clock size={16} />
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">HORA</p>
                        <p className="text-sm font-bold text-slate-900">{data.schedule.time}</p>
                    </div>
                </div>
             </div>
         </div>
 
        {/* LOCATION CARD */}
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600">
                    <MapPin size={20} />
                </div>
                <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{data.location.type}</p>
                      <p className="text-sm font-bold text-slate-900">{data.location.address}</p>
                </div>
             </div>
            <button className="text-purple-600 text-sm font-bold">Editar</button>
         </div>
 
        {/* PAYMENT SUMMARY */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-4">Resumen de Pago</h3>
              
            <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Servicio</span>
                    <span className="font-medium text-slate-900">${data.service.price.toFixed(2)}</span>
                 </div>
                <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Tarifa de Servicio</span>
                    <span className="font-medium text-slate-900">$2.50</span>
                </div>
                <div className="h-px bg-slate-100"></div>
                <div className="flex justify-between text-base font-bold">
                    <span className="text-slate-900">Total</span>
                    <span className="text-purple-600">${data.payment.total.toFixed(2)}</span>
                </div>
             </div>
 
            <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <CreditCard size={18} className="text-slate-400" />
                <span className="text-sm font-medium text-slate-600 flex-1">{data.payment.method}</span>
                <span className="text-green-600"><CheckCircle size={18} /></span>
             </div>
         </div>
 
        {/* POLICY */}
        <div className="flex gap-2 items-start px-2">
            <ShieldCheck size={16} className="text-slate-400 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-400 leading-relaxed">
                Cancelación gratuita hasta 24 horas antes. Al confirmar, aceptas nuestros términos de servicio.
            </p>
        </div>
 
       </div>
 
      {/* FOOTER ACTION */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-slate-100 z-30">
          <button 
              onClick={handleConfirm}
              disabled={isProcessing}
              className="w-full bg-[#111] hover:bg-slate-800 text-white py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
              {isProcessing ? 'Procesando...' : 'Confirmar y Pagar'} 
              {!isProcessing && <ChevronRight size={18} />}
          </button>
       </div>
 
      </div>
   );
};

export default ConfirmBooking;