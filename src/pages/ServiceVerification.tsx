import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, ScanLine, Smartphone, Lock, Copy } from 'lucide-react';

// --- INTERFACES PARA ESCALABILIDAD ---
interface VerificationSession {
  bookingId: string;
  serviceName: string;
  professional: {
    name: string;
    image: string;
    isVerified: boolean;
  };
  qrCodeData: string; // En una app real, esto sería un token JWT encriptado
  numericCode: string;
}

const MOCK_SESSION: VerificationSession = {
  bookingId: '#8291',
  serviceName: 'Manicure Gel - Premium',
  professional: {
    name: 'Sarah Jenkins',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    isVerified: true,
  },
  qrCodeData: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=Belyx-Secure-Token-123',
  numericCode: '829-104',
};

interface ServiceVerificationProps {
  onBack: () => void;
  onVerified: () => void; // Callback cuando se completa la verificación
}

export default function ServiceVerification({ onBack, onVerified }: ServiceVerificationProps) {
  const [activeTab, setActiveTab] = useState<'show' | 'scan'>('show');
  const [showNumeric, setShowNumeric] = useState(false);

  return (
    <div className="min-h-screen bg-[#0F1115] text-white font-sans flex flex-col relative overflow-hidden">
      
      {/* 1. HEADER */}
      <div className="px-4 py-6 flex items-center relative z-10">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition text-white">
          <ArrowLeft size={24} />
        </button>
        <h1 className="flex-1 text-center font-bold text-lg">Service Verification</h1>
        <div className="w-10" /> {/* Spacer para centrar */}
      </div>

      <div className="flex-1 px-6 flex flex-col items-center relative z-10">
        
        {/* 2. PROFESSIONAL PROFILE */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-3">
             {/* Glowing Ring */}
             <div className="absolute -inset-1 bg-gradient-to-tr from-purple-600 to-cyan-500 rounded-full blur opacity-70"></div>
             <img 
               src={MOCK_SESSION.professional.image} 
               alt="Pro" 
               className="relative w-20 h-20 rounded-full object-cover border-2 border-[#0F1115]"
             />
             {MOCK_SESSION.professional.isVerified && (
               <div className="absolute bottom-0 right-0 bg-purple-600 text-white p-1 rounded-full border-2 border-[#0F1115]">
                 <ShieldCheck size={12} fill="currentColor" />
               </div>
             )}
          </div>
          <p className="text-xs text-slate-400 tracking-widest uppercase font-bold mb-1">VERIFYING WITH</p>
          <h2 className="text-xl font-bold mb-2">{MOCK_SESSION.professional.name}</h2>
          <div className="bg-white/5 border border-white/10 px-3 py-1 rounded-full flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></div>
            <span className="text-[10px] font-bold text-slate-300">Awaiting Verification</span>
          </div>
        </div>

        {/* 3. BOOKING CONTEXT CARD */}
        <div className="w-full bg-[#1C1F26] p-4 rounded-2xl flex items-center justify-between mb-8 border border-white/5">
          <div>
            <p className="text-xs text-slate-500 mb-1">Booking {MOCK_SESSION.bookingId}</p>
            <h3 className="font-bold text-sm text-slate-200">{MOCK_SESSION.serviceName}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
            {/* Service Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22v-7l-2-2"/><path d="M17 8v.8A6 6 0 0 1 13.8 20H10A6.5 6.5 0 0 1 7 8a5 5 0 0 1 10 0Z"/><path d="m14 14-2 2"/></svg>
          </div>
        </div>

        {/* 4. TABS (Show Code / Scan QR) */}
        <div className="w-full bg-[#1C1F26] p-1 rounded-xl flex mb-8 border border-white/5">
          <button 
            onClick={() => setActiveTab('show')}
            className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${
              activeTab === 'show' 
                ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg' 
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Show Code
          </button>
          <button 
            onClick={() => setActiveTab('scan')}
            className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${
              activeTab === 'scan' 
                ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg' 
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Scan QR
          </button>
        </div>

        {/* 5. QR CODE CONTAINER (The Highlight) */}
        {activeTab === 'show' ? (
          <div className="relative group">
            {/* Border Gradients (Corners effect) */}
            <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-purple-500 rounded-tl-xl"></div>
            <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-cyan-400 rounded-tr-xl"></div>
            <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-purple-500 rounded-bl-xl"></div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-cyan-400 rounded-br-xl"></div>

            {/* QR Image */}
            <div className="bg-white p-6 rounded-xl shadow-2xl shadow-purple-900/20">
              <img 
                src={MOCK_SESSION.qrCodeData} 
                alt="Verification QR" 
                className="w-48 h-48 mix-blend-multiply opacity-90"
              />
              {/* Logo Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                    <ShieldCheck size={20} className="text-slate-900" />
                 </div>
              </div>
            </div>
          </div>
        ) : (
          // Vista simulada de cámara para escanear
          <div className="w-60 h-60 bg-black rounded-xl border border-white/20 relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=300')] bg-cover opacity-30"></div>
            <div className="w-48 h-48 border-2 border-dashed border-cyan-400 rounded-lg animate-pulse relative z-10"></div>
            <p className="absolute bottom-4 text-xs text-white font-bold bg-black/50 px-2 py-1 rounded">Camera Active</p>
          </div>
        )}

        {/* 6. INSTRUCTIONS */}
        <p className="text-slate-400 text-xs text-center mt-6 max-w-[200px] leading-relaxed">
          Allow the provider to scan this code to securely start the service timer.
        </p>

        {/* 7. MANUAL CODE OPTION */}
        <button 
          onClick={() => setShowNumeric(!showNumeric)}
          className="mt-6 flex items-center gap-2 text-purple-400 text-xs font-bold hover:text-purple-300 transition"
        >
          <ScanLine size={14} />
          {showNumeric ? `Code: ${MOCK_SESSION.numericCode}` : "Enter numeric code manually"}
        </button>

      </div>

      {/* 8. FOOTER */}
      <div className="p-6 flex flex-col items-center gap-4 mt-auto relative z-10 bg-gradient-to-t from-[#0F1115] via-[#0F1115] to-transparent">
        <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold tracking-widest uppercase">
          <Lock size={10} />
          Secured by Belyx
        </div>

        {/* Action Button (Simulating Waiting State) */}
        <button 
          onClick={onVerified} // En la realidad esto se activa solo, aquí lo ponemos manual para probar
          className="w-full bg-[#1C1F26] text-slate-500 font-bold py-4 rounded-xl border border-white/5 cursor-not-allowed flex items-center justify-center gap-2"
        >
           <span className="w-2 h-2 rounded-full bg-slate-500 animate-pulse"></span>
           Waiting for scan...
        </button>
      </div>

      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-purple-900/20 rounded-full blur-[80px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-cyan-900/10 rounded-full blur-[80px]"></div>
      </div>

    </div>
  );
}