import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, CreditCard, Plus, Trash2, CheckCircle2, Lock } from 'lucide-react';

export default function ClientPaymentMethods() {
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);

  // Datos simulados
  const [cards, setCards] = useState([
    { id: 1, type: 'Visa', last4: '4242', exp: '12/25', isDefault: true },
    { id: 2, type: 'Mastercard', last4: '8899', exp: '09/24', isDefault: false },
  ]);

  const handleDelete = (id: number) => {
    if (confirm('¿Estás seguro de eliminar esta tarjeta?')) {
        setCards(cards.filter(c => c.id !== id));
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24 font-sans text-slate-900 relative">
      
      {/* HEADER */}
      <div className="bg-white p-4 sticky top-0 z-20 flex items-center justify-between shadow-sm">
         <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-900 hover:bg-slate-100 rounded-full transition">
             <ChevronLeft size={24} />
         </button>
         <h1 className="font-bold text-lg">Métodos de Pago</h1>
         <div className="w-8" /> 
      </div>

      <div className="p-6 space-y-6">
        
        {/* LISTA DE TARJETAS */}
        <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide">Tus Tarjetas</h3>
            
            {cards.map((card) => (
                <div key={card.id} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 relative group overflow-hidden">
                    <div className="flex justify-between items-start mb-6">
                        {/* Icono de Marca */}
                        <div className={`w-12 h-8 rounded-md flex items-center justify-center text-white text-[10px] font-bold tracking-wider shadow-sm ${
                            card.type === 'Visa' ? 'bg-blue-600' : 'bg-orange-500'
                        }`}>
                            {card.type.toUpperCase()}
                        </div>
                        {card.isDefault && (
                            <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                                <CheckCircle2 size={10} /> Principal
                            </span>
                        )}
                    </div>
                    
                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-slate-400 text-xs mb-1">Número de tarjeta</p>
                            <p className="font-mono text-lg font-bold text-slate-700">•••• •••• •••• {card.last4}</p>
                        </div>
                        <div className="text-right">
                             <p className="text-slate-400 text-xs mb-1">Expira</p>
                             <p className="font-bold text-slate-700">{card.exp}</p>
                        </div>
                    </div>

                    {/* Botón Eliminar (Visible solo al interactuar o siempre visible en móvil con diseño limpio) */}
                    {!card.isDefault && (
                        <button 
                            onClick={() => handleDelete(card.id)}
                            className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition p-2"
                        >
                            <Trash2 size={18} />
                        </button>
                    )}
                </div>
            ))}
        </div>

        {/* BOTÓN AGREGAR NUEVA */}
        {!showAddForm ? (
            <button 
                onClick={() => setShowAddForm(true)}
                className="w-full py-4 border-2 border-dashed border-slate-300 rounded-3xl flex flex-col items-center justify-center gap-2 text-slate-500 hover:border-purple-400 hover:text-purple-600 hover:bg-purple-50 transition-all group"
            >
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition">
                    <Plus size={24} />
                </div>
                <span className="font-bold text-sm">Agregar Nueva Tarjeta</span>
            </button>
        ) : (
            // FORMULARIO DE AGREGAR (SIMULADO)
            <div className="bg-white p-5 rounded-3xl shadow-lg border border-purple-100 animate-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-slate-900">Nueva Tarjeta</h3>
                    <button onClick={() => setShowAddForm(false)} className="text-slate-400 hover:text-slate-600 text-xs font-bold">Cancelar</button>
                </div>
                
                <div className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 ml-1">Número de Tarjeta</label>
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center gap-3">
                            <CreditCard size={18} className="text-slate-400" />
                            <input type="text" placeholder="0000 0000 0000 0000" className="bg-transparent w-full text-sm font-bold focus:outline-none" />
                        </div>
                    </div>
                    
                    <div className="flex gap-4">
                        <div className="space-y-1 flex-1">
                            <label className="text-xs font-bold text-slate-500 ml-1">Expiración</label>
                            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                                <input type="text" placeholder="MM/YY" className="bg-transparent w-full text-sm font-bold focus:outline-none text-center" />
                            </div>
                        </div>
                        <div className="space-y-1 flex-1">
                            <label className="text-xs font-bold text-slate-500 ml-1">CVV</label>
                            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center gap-2">
                                <Lock size={14} className="text-slate-400" />
                                <input type="password" placeholder="123" className="bg-transparent w-full text-sm font-bold focus:outline-none text-center" />
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={() => {
                            setCards([...cards, { id: Date.now(), type: 'Visa', last4: '0000', exp: '12/28', isDefault: false }]);
                            setShowAddForm(false);
                        }}
                        className="w-full bg-[#111] text-white py-3 rounded-xl font-bold text-sm mt-2 shadow-lg hover:bg-slate-800 transition"
                    >
                        Guardar Tarjeta
                    </button>
                </div>
            </div>
        )}

        <div className="flex items-start gap-2 px-2 opacity-60">
            <Lock size={12} className="mt-0.5" />
            <p className="text-[10px] leading-tight">
                Tus datos están encriptados con seguridad bancaria de 256-bits. No almacenamos tu CVV.
            </p>
        </div>

      </div>
    </div>
  );
}