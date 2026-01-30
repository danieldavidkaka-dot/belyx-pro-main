import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, ChevronDown, ChevronUp, MessageCircle, Mail, Phone } from 'lucide-react';

export default function ClientHelp() {
  const navigate = useNavigate();
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: "¿Cómo cancelo una reserva?",
      answer: "Puedes cancelar tu reserva yendo a 'Mis Reservas', seleccionando la cita y pulsando el botón 'Cancelar'. Recuerda que es gratis hasta 24 horas antes."
    },
    {
      id: 2,
      question: "¿Qué métodos de pago aceptan?",
      answer: "Aceptamos tarjetas de crédito y débito (Visa, Mastercard), pago móvil y Zelle. Todos los pagos son procesados de forma segura."
    },
    {
      id: 3,
      question: "¿Los profesionales están verificados?",
      answer: "Sí, absolutamente. Todos los profesionales en BELYX pasan por un riguroso proceso de verificación de antecedentes y prueba de habilidades."
    },
    {
      id: 4,
      question: "¿Qué pasa si el profesional no llega?",
      answer: "En el raro caso de que esto ocurra, contáctanos inmediatamente. Te enviaremos un reemplazo prioritario o te reembolsaremos el 100%."
    }
  ];

  const toggleFaq = (id: number) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24 font-sans text-slate-900 relative">
      
      {/* HEADER */}
      <div className="bg-white p-4 sticky top-0 z-20 flex items-center justify-between shadow-sm">
         <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-900 hover:bg-slate-100 rounded-full transition">
             <ChevronLeft size={24} />
         </button>
         <h1 className="font-bold text-lg">Centro de Ayuda</h1>
         <div className="w-8" /> 
      </div>

      <div className="p-6 space-y-6">
        
        {/* SEARCH BAR */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
            <Search size={20} className="text-slate-400" />
            <input 
                type="text" 
                placeholder="Buscar ayuda..." 
                className="w-full text-sm font-medium focus:outline-none text-slate-700"
            />
        </div>

        {/* FAQ SECTION */}
        <div>
            <h3 className="font-bold text-slate-900 mb-4 ml-1">Preguntas Frecuentes</h3>
            <div className="space-y-3">
                {faqs.map((faq) => (
                    <div 
                        key={faq.id} 
                        className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden transition-all"
                    >
                        <button 
                            onClick={() => toggleFaq(faq.id)}
                            className="w-full flex items-center justify-between p-4 text-left"
                        >
                            <span className="font-bold text-sm text-slate-800">{faq.question}</span>
                            {openQuestion === faq.id ? (
                                <ChevronUp size={18} className="text-purple-600" />
                            ) : (
                                <ChevronDown size={18} className="text-slate-400" />
                            )}
                        </button>
                        
                        {/* ANIMACIÓN SIMPLE DE DESPLIEGUE */}
                        {openQuestion === faq.id && (
                            <div className="px-4 pb-4 text-xs text-slate-500 leading-relaxed animate-in slide-in-from-top-2">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>

        {/* CONTACT SUPPORT */}
        <div className="pt-4">
            <h3 className="font-bold text-slate-900 mb-4 ml-1">¿Aún necesitas ayuda?</h3>
            <div className="grid grid-cols-2 gap-4">
                <button className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-2 hover:bg-green-50 hover:border-green-200 transition group">
                    <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <MessageCircle size={20} />
                    </div>
                    <span className="text-xs font-bold text-slate-700">Chat WhatsApp</span>
                </button>

                <button className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-2 hover:bg-purple-50 hover:border-purple-200 transition group">
                    <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Mail size={20} />
                    </div>
                    <span className="text-xs font-bold text-slate-700">Enviar Email</span>
                </button>
            </div>
        </div>

      </div>
    </div>
  );
}