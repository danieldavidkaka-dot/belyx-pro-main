import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Camera, AlertCircle, Upload, Check, Info } from 'lucide-react';
import { PATHS } from '../app/router/paths';
import { useBooking } from '../context/BookingContext'; // <--- Importamos el Cerebro

export default function ServiceConsultation() {
  const navigate = useNavigate();
  // Traemos 'booking' para leer el modo (Home/Salon) y 'setConsultation' para guardar notas
  const { booking, setConsultation } = useBooking(); 

  // Estados locales para el formulario
  const [hasAllergies, setHasAllergies] = useState(false);
  const [hasSensitiveSkin, setHasSensitiveSkin] = useState(false);
  const [isPregnant, setIsPregnant] = useState(false);
  const [notes, setNotes] = useState('');
  const [photos, setPhotos] = useState<{front: boolean; side: boolean}>({ front: false, side: false });

  const togglePhoto = (view: 'front' | 'side') => {
    setPhotos(prev => ({ ...prev, [view]: !prev[view] }));
  };

  const hasPhotos = photos.front || photos.side;

  // --- AQUÍ ESTÁ LA MAGIA DEL FLUJO ---
  const handleContinue = () => {
    // 1. Guardamos los datos médicos y notas en el Cerebro
    const consultationData = { hasAllergies, hasSensitiveSkin, isPregnant, notes, hasPhotos };
    if (setConsultation) {
        setConsultation(consultationData);
    }

    console.log("🛣️ Decidiendo ruta según modo:", booking.locationType);

    // 2. DECISIÓN INTELIGENTE DE RUTA
    if (booking.locationType === 'home') {
        // Si es a Domicilio -> Vamos a pedir Dirección
        navigate(PATHS.BOOKING.ADDRESS);
    } else {
        // Si es Salón -> Saltamos Dirección y vamos a Pago
        console.log("🏢 Modo Salón: Saltando dirección...");
        navigate(PATHS.BOOKING.PAYMENT);
    }
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-32 font-sans text-slate-900 relative">
      
      {/* HEADER */}
      <div className="bg-white p-4 sticky top-0 z-20 flex items-center justify-between shadow-sm">
         <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-900 hover:bg-slate-100 rounded-full transition">
             <ChevronLeft size={24} />
         </button>
         <div className="text-center">
            <h1 className="font-bold text-lg">Pre-Consultation</h1>
            <p className="text-[10px] text-purple-600 font-bold uppercase tracking-wider">
                For: {booking.professionalName || 'Stylist'}
            </p>
         </div>
         <div className="w-8" /> 
      </div>

      <div className="p-6 space-y-6">
        
        {/* INFO BOX */}
        <div className="bg-purple-50 border border-purple-100 p-4 rounded-2xl flex gap-3">
            <Info className="text-purple-600 shrink-0" size={20} />
            <p className="text-xs text-purple-800 leading-relaxed font-medium">
                Ayuda a tu profesional. Las fotos actuales aseguran que traigan los productos exactos.
            </p>
        </div>

        {/* FOTOS */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <Camera size={18} className="text-purple-600" />
                    Fotos (Opcional)
                </h3>
                {!hasPhotos && <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-full font-bold">Recomendado</span>}
            </div>
            <div className="grid grid-cols-2 gap-4">
                <button onClick={() => togglePhoto('front')} className={`aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-all ${photos.front ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-slate-200 hover:border-purple-300 text-slate-400 hover:bg-slate-50'}`}>
                    {photos.front ? (<><div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-md"><Check size={16} /></div><span className="text-xs font-bold">Lista</span></>) : (<><Upload size={24} /><span className="text-xs font-medium">Frente</span></>)}
                </button>
                <button onClick={() => togglePhoto('side')} className={`aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-all ${photos.side ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-slate-200 hover:border-purple-300 text-slate-400 hover:bg-slate-50'}`}>
                    {photos.side ? (<><div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-md"><Check size={16} /></div><span className="text-xs font-bold">Lista</span></>) : (<><Upload size={24} /><span className="text-xs font-medium">Perfil</span></>)}
                </button>
            </div>
        </div>

        {/* CHECKLIST */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <AlertCircle size={18} className="text-orange-500" />
                Información Importante
            </h3>
            <div className="space-y-5">
                <div className="flex items-center justify-between"><span className="text-sm font-medium text-slate-700">¿Alergias?</span><button onClick={() => setHasAllergies(!hasAllergies)} className={`w-11 h-6 rounded-full p-1 transition-colors duration-300 ${hasAllergies ? 'bg-purple-600' : 'bg-slate-200'}`}><div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${hasAllergies ? 'translate-x-5' : 'translate-x-0'}`} /></button></div>
                <div className="flex items-center justify-between"><span className="text-sm font-medium text-slate-700">¿Piel Sensible?</span><button onClick={() => setHasSensitiveSkin(!hasSensitiveSkin)} className={`w-11 h-6 rounded-full p-1 transition-colors duration-300 ${hasSensitiveSkin ? 'bg-purple-600' : 'bg-slate-200'}`}><div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${hasSensitiveSkin ? 'translate-x-5' : 'translate-x-0'}`} /></button></div>
                <div className="flex items-center justify-between"><span className="text-sm font-medium text-slate-700">¿Embarazo?</span><button onClick={() => setIsPregnant(!isPregnant)} className={`w-11 h-6 rounded-full p-1 transition-colors duration-300 ${isPregnant ? 'bg-purple-600' : 'bg-slate-200'}`}><div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${isPregnant ? 'translate-x-5' : 'translate-x-0'}`} /></button></div>
            </div>
        </div>

        {/* NOTAS */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-3">Notas Adicionales</h3>
            <textarea 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ej. Prefiero productos sin aroma..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-purple-400 transition-colors h-20 resize-none"
            />
        </div>

      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-slate-100 z-30 flex flex-col gap-3">
          <button 
             onClick={handleContinue}
             className="w-full bg-[#111] hover:bg-slate-800 text-white py-4 rounded-2xl font-bold text-base shadow-lg transition-all active:scale-[0.98]"
          >
              {hasPhotos ? 'Confirmar y Continuar' : 'Continuar sin fotos'}
          </button>
      </div>

    </div>
  );
}