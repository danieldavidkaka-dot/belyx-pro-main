import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, Tag, Info, CheckCircle2 } from 'lucide-react';

export default function ClientInbox() {
  const navigate = useNavigate();

  // Datos simulados de notificaciones
  const notifications = [
    {
      id: 1,
      type: 'booking',
      title: 'Reserva Confirmada',
      message: 'Tu cita para Gel Manicure Deluxe ha sido confirmada para mañana a las 10:00 AM.',
      time: 'Hace 2 min',
      unread: true,
      actionRoute: '/bookings' // Podríamos redirigir a la reserva
    },
    {
      id: 2,
      type: 'promo',
      title: '¡50% de Descuento!',
      message: 'Solo por hoy, obtén mitad de precio en todos los servicios de cabello. Código: FLASH50',
      time: 'Hace 2 horas',
      unread: false,
    },
    {
      id: 3,
      type: 'system',
      title: 'Bienvenido a BELYX',
      message: 'Gracias por unirte. Completa tu perfil para obtener una mejor experiencia.',
      time: 'Hace 1 día',
      unread: false,
      actionRoute: '/profile'
    },
    {
      id: 4,
      type: 'booking',
      title: 'Recordatorio de Cita',
      message: 'Falta 1 hora para tu masaje con Sarah. ¡Prepárate para relajarte!',
      time: 'Hace 3 días',
      unread: false,
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'booking': return <Calendar size={20} className="text-purple-600" />;
      case 'promo': return <Tag size={20} className="text-pink-600" />;
      case 'system': return <Info size={20} className="text-blue-600" />;
      default: return <Info size={20} className="text-slate-600" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'booking': return 'bg-purple-50';
      case 'promo': return 'bg-pink-50';
      case 'system': return 'bg-blue-50';
      default: return 'bg-slate-50';
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24 font-sans text-slate-900 relative">
      
      {/* HEADER */}
      <div className="bg-white p-4 sticky top-0 z-20 flex items-center justify-between shadow-sm">
         <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-900 hover:bg-slate-100 rounded-full transition">
             <ChevronLeft size={24} />
         </button>
         <h1 className="font-bold text-lg">Bandeja de Entrada</h1>
         <div className="w-8" /> 
      </div>

      <div className="p-4 space-y-3">
        {notifications.map((item) => (
            <div 
                key={item.id}
                onClick={() => item.actionRoute && navigate(item.actionRoute)}
                className={`bg-white p-4 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden transition-transform active:scale-[0.99] ${item.actionRoute ? 'cursor-pointer' : ''}`}
            >
                {/* Indicador de no leído */}
                {item.unread && (
                    <div className="absolute top-4 right-4 w-2 h-2 bg-red-500 rounded-full"></div>
                )}

                <div className="flex gap-4">
                    {/* Icono */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${getBgColor(item.type)}`}>
                        {getIcon(item.type)}
                    </div>

                    {/* Contenido */}
                    <div className="flex-1">
                        <div className="flex justify-between items-start mb-1 pr-4">
                            <h3 className={`font-bold text-sm ${item.unread ? 'text-slate-900' : 'text-slate-600'}`}>
                                {item.title}
                            </h3>
                            <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap ml-2">
                                {item.time}
                            </span>
                        </div>
                        <p className={`text-xs leading-relaxed ${item.unread ? 'text-slate-600 font-medium' : 'text-slate-400'}`}>
                            {item.message}
                        </p>
                    </div>
                </div>
            </div>
        ))}

        {/* Mensaje de fin de lista */}
        <div className="text-center py-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                <CheckCircle2 size={12} />
                Estás al día
            </div>
        </div>

      </div>
    </div>
  );
}