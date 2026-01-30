import React, { useState, useEffect } from 'react';
import { ArrowLeft, QrCode, Keyboard, Zap, HelpCircle, AlertCircle } from 'lucide-react';
import { CheckInSession } from '../types';

const MOCK_SESSION: CheckInSession = {
  bookingId: '#4092',
  clientName: 'Sofia M.',
  serviceName: 'Manicura Premium',
  serviceTime: '10:00 AM',
  clientImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200',
  locationType: 'A Domicilio',
  status: 'Arrived'
};

interface StaffCheckInProps {
  onBack: () => void;
  onCheckInSuccess: () => void;
}

export default function StaffCheckIn({ onBack, onCheckInSuccess }: StaffCheckInProps) {
  const [activeTab, setActiveTab] = useState<'qr' | 'code'>('qr');
  const [isFlashOn, setIsFlashOn] = useState(false);
  const [manualCode, setManualCode] = useState(['', '', '', '']); // Código de 4 dígitos

  // Simulación: Efecto de escaneo exitoso automático tras 3 segs (solo para demo)
  useEffect(() => {
    if (activeTab === 'qr') {
      const timer = setTimeout(() => {
        // En una app real, esto se dispararía al detectar el QR
        // onCheckInSuccess(); 
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  return (
    <div className="bg-[#0F1115] min-h-screen font-sans text-white flex flex-col relative overflow-hidden">
      
      {/* 1. HEADER */}
      <div className="px-6 py-6 flex items-center justify-between z-20 bg-[#0F1115]/80 backdrop-blur-md sticky top-0">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-sm font-bold tracking-wide">Check-in de Servicio</h1>
        <div className="w-8" /> {/* Spacer */}
      </div>

      <div className="flex-1 flex flex-col px-6 pb-8 z-10">
        
        {/* 2. INFO CARD (Sticky context) */}
        <div className="bg-[#1C1F26] p-4 rounded-2xl border border-white/5 flex items-center gap-4 mb-6 shadow-lg">
           <div className="relative">
              <img src={MOCK_SESSION.clientImage} alt="Client" className="w-12 h-12 rounded-full object-cover border-2 border-[#2A2E37]" />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1C1F26]"></div>
           </div>
           <div>
              <div className="flex items-center gap-2 mb-0.5">
                 <h2 className="font-bold text-sm">{MOCK_SESSION.clientName}</h2>
                 <span className="text-[10px] font-bold bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded">
                    {MOCK_SESSION.locationType}
                 </span>
              </div>
              <p className="text-xs text-slate-400">{MOCK_SESSION.serviceTime} • {MOCK_SESSION.serviceName}</p>
           </div>
        </div>

        {/* 3. TABS (QR / Manual) */}
        <div className="bg-[#1C1F26] p-1 rounded-xl flex mb-8 border border-white/5">
           <button 
             onClick={() => setActiveTab('qr')}
             className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold transition-all ${
                 activeTab === 'qr' ? 'bg-[#2A2E37] text-white shadow-md' : 'text-slate-500 hover:text-slate-300'
             }`}
           >
              <QrCode size={16} /> Escanear QR
           </button>
           <button 
             onClick={() => setActiveTab('code')}
             className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold transition-all ${
                 activeTab === 'code' ? 'bg-[#2A2E37] text-white shadow-md' : 'text-slate-500 hover:text-slate-300'
             }`}
           >
              <Keyboard size={16} /> Ingresar Código
           </button>
        </div>

        {/* 4. SCANNER AREA / INPUT AREA */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
            
            {activeTab === 'qr' ? (
                <>
                    <h3 className="text-lg font-bold mb-2">Escanea el código del cliente</h3>
                    <p className="text-slate-400 text-xs mb-8 text-center max-w-[250px]">
                        Apunta la cámara al código QR que el cliente tiene en su pantalla para verificar.
                    </p>

                    {/* QR FRAME CONTAINER */}
                    <div className="relative w-64 h-64">
                        {/* Esquinas del marco (SVG o Divs) */}
                        <div className="absolute inset-0 rounded-3xl border-2 border-white/10 bg-black/20 backdrop-blur-sm overflow-hidden">
                             {/* Imagen simulada de cámara */}
                             <img 
                                src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=600" 
                                className="w-full h-full object-cover opacity-40 grayscale"
                                alt="Camera Feed"
                             />
                             
                             {/* SCANNING LINE (Animación) */}
                             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 shadow-[0_0_15px_rgba(0,212,255,0.8)] animate-[scan_2.5s_ease-in-out_infinite]"></div>
                        </div>

                        {/* Bordes brillantes decorativos (Corners) */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-purple-500 rounded-tl-xl"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-purple-500 rounded-tr-xl"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-cyan-400 rounded-bl-xl"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-cyan-400 rounded-br-xl"></div>
                    </div>
                </>
            ) : (
                <div className="w-full max-w-xs">
                    <h3 className="text-lg font-bold mb-2 text-center">Código de Seguridad</h3>
                    <p className="text-slate-400 text-xs mb-8 text-center">
                        Pide al cliente el código numérico de 4 dígitos.
                    </p>
                    
                    <div className="flex justify-center gap-4 mb-8">
                        {manualCode.map((digit, idx) => (
                            <div key={idx} className="w-14 h-16 bg-[#1C1F26] border border-white/10 rounded-xl flex items-center justify-center text-2xl font-bold">
                                {digit || <span className="w-2 h-2 bg-slate-600 rounded-full"></span>}
                            </div>
                        ))}
                    </div>
                    
                    {/* Teclado Numérico Simulado (Opcional, o usar input nativo) */}
                    <button 
                        onClick={onCheckInSuccess} 
                        className="w-full py-4 bg-[#2A2E37] hover:bg-[#8B31FF] text-white font-bold rounded-xl transition-colors"
                    >
                        Verificar Código
                    </button>
                </div>
            )}
        </div>

        {/* 5. FOOTER CONTROLS */}
        <div className="flex justify-between items-center mt-auto pt-6">
            <button className="text-xs text-slate-400 underline flex items-center gap-1 hover:text-white">
                <HelpCircle size={14} /> ¿Problemas con la cámara?
            </button>

            {activeTab === 'qr' && (
                <button 
                    onClick={() => setIsFlashOn(!isFlashOn)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all ${
                        isFlashOn ? 'bg-white text-black border-white' : 'bg-[#1C1F26] text-white border-white/10'
                    }`}
                >
                    <Zap size={20} fill={isFlashOn ? "currentColor" : "none"} />
                </button>
            )}
        </div>

      </div>

      {/* CSS para la animación de escaneo */}
      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}