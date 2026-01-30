import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Camera, AlertCircle, Upload, Check, Info } from 'lucide-react';

export default function ServiceConsultation() {
  const navigate = useNavigate();
  
  // Estados para el formulario (escalable para enviar a Backend luego)
  const [hasAllergies, setHasAllergies] = useState(false);
  const [hasSensitiveSkin, setHasSensitiveSkin] = useState(false);
  const [isPregnant, setIsPregnant] = useState(false);
  const [notes, setNotes] = useState('');
  
  // Estado local para las fotos
  const [photos, setPhotos] = useState<{front: boolean; side: boolean}>({ front: false, side: false });

  const handleContinue = () => {
    // Aquí iría la lógica para guardar estos datos en un Contexto o API
    navigate('/confirm');
  };

  const togglePhoto = (view: 'front' | 'side') => {
    setPhotos(prev => ({ ...prev, [view]: !prev[view] }));
  };

  // Lógica visual: ¿El usuario subió fotos?
  const hasPhotos = photos.front || photos.side;

  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-32 font-sans text-slate-900 relative">
      
      {/* 1. HEADER */}
      <div className="bg-white p-4 sticky top-0 z-20 flex items-center justify-between shadow-sm">
         <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-900 hover:bg-slate-100 rounded-full transition">
             <ChevronLeft size={24} />
         </button>
         <h1 className="font-bold text-lg">Consulta Previa</h1>
         <div className="w-8" /> 
      </div>

      <div className="p-6 space-y-6">
        
        {/* INFO BOX - Basado en tu investigación de seguridad (Project Kavach) */}
        <div className="bg-purple-50 border border-purple-100 p-4 rounded-2xl flex gap-3">
            <Info className="text-purple-600 shrink-0" size={20} />
            <p className="text-xs text-purple-800 leading-relaxed font-medium">
                Ayuda a tu profesional a prepararse. Una foto actual asegura que traigan los productos exactos para ti.
            </p>
        </div>

        {/* 2. SECCIÓN FOTOS (OPCIONAL) */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <Camera size={18} className="text-purple-600" />
                    Fotos (Opcional)
                </h3>
                {!hasPhotos && <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-full font-bold">Recomendado</span>}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                {/* Botón Foto Frente */}
                <button 
                    onClick={() => togglePhoto('front')}
                    className={`aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-all ${
                        photos.front 
                        ? 'border-purple-500 bg-purple-50 text-purple-700' 
                        : 'border-slate-200 hover:border-purple-300 text-slate-400 hover:bg-slate-50'
                    }`}
                >
                    {photos.front ? (
                        <>
                            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-md">
                                <Check size={16} />
                            </div>
                            <span className="text-xs font-bold">Lista</span>
                        </>
                    ) : (
                        <>
                            <Upload size={24} />
                            <span className="text-xs font-medium">Frente</span>
                        </>
                    )}
                </button>

                {/* Botón Foto Perfil */}
                <button 
                    onClick={() => togglePhoto('side')}
                    className={`aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-all ${
                        photos.side 
                        ? 'border-purple-500 bg-purple-50 text-purple-700' 
                        : 'border-slate-200 hover:border-purple-300 text-slate-400 hover:bg-slate-50'
                    }`}
                >
                    {photos.side ? (
                        <>
                            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-md">
                                <Check size={16} />
                            </div>
                            <span className="text-xs font-bold">Lista</span>
                        </>
                    ) : (
                        <>
                            <Upload size={24} />
                            <span className="text-xs font-medium">Perfil</span>
                        </>
                    )}
                </button>
            </div>
        </div>

        {/* 3. CHECKLIST SALUD (TOGGLES) */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <AlertCircle size={18} className="text-orange-500" />
                Información Importante
            </h3>
            <div className="space-y-5">
                
                {/* Toggle Alergias */}
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">¿Tienes alergias conocidas?</span>
                    <button 
                        onClick={() => setHasAllergies(!hasAllergies)}
                        className={`w-11 h-6 rounded-full p-1 transition-colors duration-300 ${hasAllergies ? 'bg-purple-600' : 'bg-slate-200'}`}
                    >
                        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${hasAllergies ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                </div>

                {/* Toggle Piel Sensible */}
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">¿Piel sensible?</span>
                    <button 
                        onClick={() => setHasSensitiveSkin(!hasSensitiveSkin)}
                        className={`w-11 h-6 rounded-full p-1 transition-colors duration-300 ${hasSensitiveSkin ? 'bg-purple-600' : 'bg-slate-200'}`}
                    >
                        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${hasSensitiveSkin ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                </div>

                {/* Toggle Embarazo */}
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">¿Embarazo activo?</span>
                    <button 
                        onClick={() => setIsPregnant(!isPregnant)}
                        className={`w-11 h-6 rounded-full p-1 transition-colors duration-300 ${isPregnant ? 'bg-purple-600' : 'bg-slate-200'}`}
                    >
                        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${isPregnant ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                </div>

            </div>
        </div>

        {/* 4. NOTAS */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-3">Notas adicionales</h3>
            <textarea 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ej. Prefiero productos sin aroma..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-purple-400 transition-colors h-20 resize-none"
            />
        </div>

      </div>

      {/* 5. FOOTER ACTION (Smart Button) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-slate-100 z-30 flex flex-col gap-3">
          <button 
             onClick={handleContinue}
             className="w-full bg-[#111] hover:bg-slate-800 text-white py-4 rounded-2xl font-bold text-base shadow-lg transition-all active:scale-[0.98]"
          >
              {hasPhotos ? 'Confirmar y Continuar' : 'Continuar sin fotos'}
          </button>
          
          {!hasPhotos && (
              <p className="text-center text-[10px] text-slate-400">
                  Podrás enviarlas por chat más tarde si lo deseas.
              </p>
          )}
      </div>

    </div>
  );
}