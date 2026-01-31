import React, { useState } from 'react';
import { ChevronLeft, Lock, Smartphone, Shield, Key, Eye, EyeOff, AlertTriangle } from 'lucide-react';

interface ClientSecurityProps {
  onBack: () => void;
}

export default function ClientSecurity({ onBack }: ClientSecurityProps) {
  
  // Estados para los toggles
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  
  // Estado para cambiar contraseña
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showCurrentPass, setShowCurrentPass] = useState(false);

  return (
    <div className="bg-slate-50 min-h-screen pb-24 font-sans text-slate-900 relative">
      
      {/* HEADER */}
      <div className="bg-white p-4 sticky top-0 z-20 flex items-center justify-between shadow-sm">
         <button onClick={onBack} className="p-2 -ml-2 text-slate-900 hover:bg-slate-100 rounded-full transition">
             <ChevronLeft size={24} />
         </button>
         <h1 className="font-bold text-lg">Privacidad y Seguridad</h1>
         <div className="w-8" /> 
      </div>

      <div className="p-6 space-y-6">
        
        {/* SECCIÓN: ACCESO */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wide">Acceso y Autenticación</h3>
            
            <div className="space-y-6">
                {/* FaceID / Biometría */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                            <Smartphone size={20} />
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 text-sm">Face ID / Touch ID</p>
                            <p className="text-xs text-slate-500">Ingreso rápido y seguro</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setBiometricEnabled(!biometricEnabled)}
                        className={`w-12 h-7 rounded-full p-1 transition-colors duration-300 ${biometricEnabled ? 'bg-purple-600' : 'bg-slate-200'}`}
                    >
                        <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${biometricEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                </div>

                {/* 2FA */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                            <Shield size={20} />
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 text-sm">Autenticación en 2 Pasos</p>
                            <p className="text-xs text-slate-500">Código SMS al iniciar sesión</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                        className={`w-12 h-7 rounded-full p-1 transition-colors duration-300 ${twoFactorEnabled ? 'bg-purple-600' : 'bg-slate-200'}`}
                    >
                        <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                </div>
            </div>
        </div>

        {/* SECCIÓN: CONTRASEÑA */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wide">Contraseña</h3>
            
            {!showChangePassword ? (
                <button 
                    onClick={() => setShowChangePassword(true)}
                    className="w-full py-3 border border-slate-200 rounded-xl flex items-center justify-center gap-2 text-slate-600 font-bold text-sm hover:bg-slate-50 transition"
                >
                    <Key size={16} />
                    Cambiar Contraseña
                </button>
            ) : (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 ml-1">Contraseña Actual</label>
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center gap-3">
                            <Lock size={18} className="text-slate-400" />
                            <input 
                                type={showCurrentPass ? "text" : "password"} 
                                className="bg-transparent w-full text-sm font-bold focus:outline-none"
                                placeholder="••••••••"
                            />
                            <button onClick={() => setShowCurrentPass(!showCurrentPass)} className="text-slate-400 hover:text-purple-600">
                                {showCurrentPass ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>
                    
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 ml-1">Nueva Contraseña</label>
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center gap-3">
                            <Lock size={18} className="text-slate-400" />
                            <input type="password" className="bg-transparent w-full text-sm font-bold focus:outline-none" placeholder="Mínimo 8 caracteres" />
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button 
                            onClick={() => setShowChangePassword(false)}
                            className="flex-1 py-3 text-slate-500 font-bold text-sm hover:bg-slate-100 rounded-xl transition"
                        >
                            Cancelar
                        </button>
                        <button 
                            onClick={() => { alert("Contraseña actualizada"); setShowChangePassword(false); }}
                            className="flex-1 py-3 bg-[#111] text-white font-bold text-sm rounded-xl shadow-lg hover:bg-slate-800 transition"
                        >
                            Actualizar
                        </button>
                    </div>
                </div>
            )}
        </div>

        {/* DANGER ZONE */}
        <div className="bg-red-50 p-5 rounded-3xl border border-red-100">
             <div className="flex items-start gap-3 mb-4">
                 <AlertTriangle className="text-red-500 shrink-0" size={20} />
                 <div>
                     <h3 className="font-bold text-red-700 text-sm">Eliminar Cuenta</h3>
                     <p className="text-xs text-red-600/80 mt-1 leading-relaxed">
                         Esta acción es irreversible. Perderás todo tu historial de reservas y beneficios acumulados.
                     </p>
                 </div>
             </div>
             <button className="w-full bg-white border border-red-200 text-red-600 py-3 rounded-xl font-bold text-sm hover:bg-red-100 transition">
                 Solicitar Eliminación
             </button>
        </div>

      </div>
    </div>
  );
}