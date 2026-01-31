import React, { useState } from 'react';
import { ChevronLeft, Bell, Mail, MessageSquare, Tag, Calendar, Shield } from 'lucide-react';

interface ClientNotificationsProps {
  onBack: () => void;
}

export default function ClientNotifications({ onBack }: ClientNotificationsProps) {

  // Estados de los interruptores
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  
  // Categorías específicas
  const [notifyBookings, setNotifyBookings] = useState(true);
  const [notifyPromos, setNotifyPromos] = useState(false);
  const [notifySecurity, setNotifySecurity] = useState(true);

  return (
    <div className="bg-slate-50 min-h-screen pb-24 font-sans text-slate-900 relative">
      
      {/* HEADER */}
      <div className="bg-white p-4 sticky top-0 z-20 flex items-center justify-between shadow-sm">
         <button onClick={onBack} className="p-2 -ml-2 text-slate-900 hover:bg-slate-100 rounded-full transition">
             <ChevronLeft size={24} />
         </button>
         <h1 className="font-bold text-lg">Notificaciones</h1>
         <div className="w-8" /> 
      </div>

      <div className="p-6 space-y-6">
        
        {/* CANALES (CHANNELS) */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wide">Canales de Envío</h3>
            
            <div className="space-y-6">
                {/* Push */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                            <Bell size={20} />
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 text-sm">Notificaciones Push</p>
                            <p className="text-xs text-slate-500">Alertas en tu dispositivo</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setPushEnabled(!pushEnabled)}
                        className={`w-12 h-7 rounded-full p-1 transition-colors duration-300 ${pushEnabled ? 'bg-purple-600' : 'bg-slate-200'}`}
                    >
                        <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${pushEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                </div>

                {/* Email */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                            <Mail size={20} />
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 text-sm">Correo Electrónico</p>
                            <p className="text-xs text-slate-500">Resúmenes y recibos</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setEmailEnabled(!emailEnabled)}
                        className={`w-12 h-7 rounded-full p-1 transition-colors duration-300 ${emailEnabled ? 'bg-purple-600' : 'bg-slate-200'}`}
                    >
                        <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${emailEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                </div>

                {/* SMS */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                            <MessageSquare size={20} />
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 text-sm">Mensajes SMS</p>
                            <p className="text-xs text-slate-500">Avisos urgentes</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setSmsEnabled(!smsEnabled)}
                        className={`w-12 h-7 rounded-full p-1 transition-colors duration-300 ${smsEnabled ? 'bg-purple-600' : 'bg-slate-200'}`}
                    >
                        <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${smsEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                </div>
            </div>
        </div>

        {/* TIPO DE CONTENIDO */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wide">¿Qué quieres recibir?</h3>
            
            <div className="space-y-4">
                
                <label className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-xl transition cursor-pointer">
                    <div className="flex items-center gap-3">
                        <Calendar size={18} className="text-slate-400" />
                        <span className="text-sm font-medium text-slate-700">Recordatorios de Citas</span>
                    </div>
                    <input 
                        type="checkbox" 
                        checked={notifyBookings}
                        onChange={() => setNotifyBookings(!notifyBookings)}
                        className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500 border-gray-300"
                    />
                </label>

                <label className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-xl transition cursor-pointer">
                    <div className="flex items-center gap-3">
                        <Tag size={18} className="text-slate-400" />
                        <span className="text-sm font-medium text-slate-700">Ofertas y Descuentos</span>
                    </div>
                    <input 
                        type="checkbox" 
                        checked={notifyPromos}
                        onChange={() => setNotifyPromos(!notifyPromos)}
                        className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500 border-gray-300"
                    />
                </label>

                <label className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-xl transition cursor-pointer">
                    <div className="flex items-center gap-3">
                        <Shield size={18} className="text-slate-400" />
                        <span className="text-sm font-medium text-slate-700">Seguridad de Cuenta</span>
                    </div>
                    <input 
                        type="checkbox" 
                        checked={notifySecurity}
                        disabled // Seguridad siempre activo
                        onChange={() => setNotifySecurity(!notifySecurity)}
                        className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500 border-gray-300 opacity-50"
                    />
                </label>

            </div>
        </div>

      </div>
    </div>
  );
}