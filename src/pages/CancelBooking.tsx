import React, { useState } from 'react';
import { ChevronLeft, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface CancelBookingProps {
  onBack: () => void;
}

export default function CancelBooking({ onBack }: CancelBookingProps) {
  
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const reasons = [
    "Cambio de planes / Ya no lo necesito",
    "El profesional me pidió cancelar",
    "Encontré una opción mejor/más barata",
    "Reserva creada por error",
    "Emergencia personal",
    "Otro motivo"
  ];

  const handleCancel = () => {
    if (!selectedReason) return;
    
    // Aquí iría la llamada a la API para cancelar
    setIsSubmitted(true);
    
    // Después de 2 segundos, volvemos a mis reservas
    setTimeout(() => {
        onBack(); // O navegar a home
    }, 2000);
  };

  if (isSubmitted) {
      return (
          <div className="bg-white min-h-screen flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-300">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                  <CheckCircle2 size={40} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Reserva Cancelada</h2>
              <p className="text-slate-500">Tu reserva ha sido cancelada exitosamente. No se te realizará ningún cargo.</p>
          </div>
      );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-24 font-sans text-slate-900 relative">
      
      {/* HEADER */}
      <div className="bg-white p-4 sticky top-0 z-20 flex items-center justify-between shadow-sm">
         <button onClick={onBack} className="p-2 -ml-2 text-slate-900 hover:bg-slate-100 rounded-full transition">
             <ChevronLeft size={24} />
         </button>
         <h1 className="font-bold text-lg">Cancelar Reserva</h1>
         <div className="w-8" /> 
      </div>

      <div className="p-6 space-y-6">
        
        {/* WARNING BOX */}
        <div className="bg-orange-50 border border-orange-100 p-4 rounded-2xl flex gap-3">
            <AlertTriangle className="text-orange-500 shrink-0" size={24} />
            <div>
                <h3 className="font-bold text-orange-800 text-sm">¿Estás seguro?</h3>
                <p className="text-xs text-orange-700 leading-relaxed mt-1">
                    La cancelación es gratuita hasta 24h antes. Si cancelas ahora, no se aplicarán cargos.
                </p>
            </div>
        </div>

        {/* REASON SELECTION */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-4">¿Por qué deseas cancelar?</h3>
            <div className="space-y-3">
                {reasons.map((reason) => (
                    <label 
                        key={reason} 
                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                            selectedReason === reason 
                            ? 'border-red-500 bg-red-50 text-red-700 font-medium' 
                            : 'border-slate-200 hover:border-slate-300 text-slate-600'
                        }`}
                    >
                        <input 
                            type="radio" 
                            name="cancelReason" 
                            className="hidden"
                            onChange={() => setSelectedReason(reason)}
                        />
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            selectedReason === reason ? 'border-red-500' : 'border-slate-300'
                        }`}>
                            {selectedReason === reason && <div className="w-2.5 h-2.5 rounded-full bg-red-500" />}
                        </div>
                        <span className="text-sm">{reason}</span>
                    </label>
                ))}
            </div>
        </div>

      </div>

      {/* FOOTER ACTIONS */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-slate-100 z-30 flex flex-col gap-3">
          <button 
             onClick={handleCancel}
             disabled={!selectedReason}
             className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl font-bold text-base shadow-lg shadow-red-200 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
              Confirmar Cancelación
          </button>
          <button 
             onClick={onBack}
             className="w-full bg-white border border-slate-200 text-slate-700 py-3 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-colors"
          >
              Mantener Reserva
          </button>
      </div>

    </div>
  );
}