import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, X, Copy, CheckCircle } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export default function ServiceVerification() {
  const navigate = useNavigate();
  const { booking } = useBooking();
  const [code, setCode] = useState("8924"); // En un caso real, esto vendría del backend
  const [copied, setCopied] = useState(false);

  // Simulamos un código aleatorio basado en el ID del servicio para que parezca real
  useEffect(() => {
    if (booking.serviceId) {
       const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
       setCode(randomCode);
    }
  }, [booking.serviceId]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    navigate(-1); // Volver atrás
  };

  return (
    <div className="bg-[#111] min-h-screen text-white flex flex-col items-center justify-between p-6 relative font-sans">
      
      {/* HEADER SIMPLE */}
      <div className="w-full flex justify-between items-center z-10">
         <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
             <ShieldCheck size={18} className="text-green-500" />
             SafeVerify™
         </div>
         <button onClick={handleClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
             <X size={20} />
         </button>
      </div>

      {/* CONTENIDO CENTRAL */}
      <div className="w-full max-w-sm flex flex-col items-center animate-in fade-in zoom-in duration-500">
          
          <h1 className="text-2xl font-bold mb-2">Start Service</h1>
          <p className="text-slate-400 text-center text-sm mb-10">
              Show this code to {booking.professionalName || 'your pro'} to verify their identity and start the timer.
          </p>

          {/* TARJETA DE VERIFICACIÓN */}
          <div className="bg-white text-slate-900 p-1 rounded-[32px] w-full shadow-2xl shadow-purple-900/20">
              <div className="border-[3px] border-dashed border-slate-200 rounded-[28px] p-6 flex flex-col items-center">
                  
                  {/* QR PLACEHOLDER (Simulado con CSS) */}
                  <div className="w-48 h-48 bg-slate-900 rounded-xl mb-6 relative overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-0 opacity-50 bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=Belyx-Secure-Handshake')] bg-cover bg-center"></div>
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg z-10">
                          <ShieldCheck size={24} className="text-purple-600" />
                      </div>
                  </div>

                  {/* CÓDIGO NUMÉRICO */}
                  <div className="text-center mb-4">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Service Code</p>
                      <div className="text-5xl font-black tracking-widest text-slate-900 font-mono">
                          {code}
                      </div>
                  </div>

                  {/* BOTÓN COPIAR */}
                  <button 
                    onClick={handleCopy}
                    className="flex items-center gap-2 text-xs font-bold text-purple-600 bg-purple-50 px-4 py-2 rounded-full hover:bg-purple-100 transition-colors"
                  >
                      {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
                      {copied ? 'Copied' : 'Tap to copy'}
                  </button>

              </div>
          </div>
      </div>

      {/* FOOTER INFO */}
      <div className="w-full text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
             <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                 <span className="text-lg">👸</span>
             </div>
             <div className="text-left">
                 <p className="text-xs text-slate-400">Your Pro</p>
                 <p className="text-sm font-bold">{booking.professionalName || 'Assigned Stylist'}</p>
             </div>
          </div>
          
          <p className="text-[10px] text-slate-500 max-w-xs mx-auto">
              If the code doesn't match, do not allow the person to enter and contact support immediately.
          </p>
      </div>

    </div>
  );
}