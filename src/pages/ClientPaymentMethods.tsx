import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, CreditCard, Plus, Trash2, CheckCircle, ShieldCheck } from 'lucide-react';
import { useBooking, PaymentMethod } from '../context/BookingContext'; // <--- Importamos el cerebro

export default function ClientPaymentMethods() {
  const navigate = useNavigate();
  const { paymentMethods, addPaymentMethod, removePaymentMethod } = useBooking();
  const [showAddForm, setShowAddForm] = useState(false);

  // Estado para el formulario de nueva tarjeta
  const [newCard, setNewCard] = useState({
    number: '',
    holder: '',
    expiry: '',
    cvc: ''
  });

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulamos la detección del tipo de tarjeta
    const type = Math.random() > 0.5 ? 'visa' : 'mastercard';
    const last4 = newCard.number.slice(-4) || '0000';

    const cardToAdd: PaymentMethod = {
        id: Date.now().toString(),
        type: type,
        last4: last4,
        expiry: newCard.expiry || '12/28',
        cardHolder: newCard.holder || 'Valued Client',
        isDefault: paymentMethods.length === 0 // Si es la primera, es default
    };

    addPaymentMethod(cardToAdd);
    setShowAddForm(false);
    setNewCard({ number: '', holder: '', expiry: '', cvc: '' }); // Reset form
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewCard({ ...newCard, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24 font-sans text-slate-900 relative">
      
      {/* HEADER */}
      <div className="bg-white p-4 sticky top-0 z-20 flex items-center justify-between shadow-sm">
         <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-900 hover:bg-slate-100 rounded-full transition">
             <ChevronLeft size={24} />
         </button>
         <h1 className="font-bold text-lg">Payment Methods</h1>
         <div className="w-8" /> 
      </div>

      <div className="p-6 space-y-6">
        
        {/* LISTA DE TARJETAS */}
        <div className="space-y-4">
            {paymentMethods.length > 0 ? (
                paymentMethods.map((card) => (
                    <div key={card.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 relative overflow-hidden group">
                        {/* Fondo decorativo */}
                        <div className={`absolute top-0 bottom-0 left-0 w-2 ${card.type === 'visa' ? 'bg-blue-500' : 'bg-orange-500'}`} />
                        
                        <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-xl shrink-0">
                            {card.type === 'visa' ? '🔵' : '🔴'}
                        </div>
                        
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-slate-900 capitalize">{card.type} •••• {card.last4}</h3>
                                {card.isDefault && (
                                    <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">Default</span>
                                )}
                            </div>
                            <p className="text-xs text-slate-400">Expires {card.expiry}</p>
                        </div>

                        {/* Botón Borrar */}
                        <button 
                            onClick={() => removePaymentMethod(card.id)}
                            className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))
            ) : (
                <div className="text-center py-10 opacity-50">
                    <CreditCard size={48} className="mx-auto mb-2 text-slate-300" />
                    <p>No cards added yet</p>
                </div>
            )}
        </div>

        {/* BOTÓN AGREGAR */}
        {!showAddForm && (
            <button 
                onClick={() => setShowAddForm(true)}
                className="w-full py-4 border-2 border-dashed border-slate-300 text-slate-500 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-100 hover:border-slate-400 transition"
            >
                <Plus size={20} /> Add New Card
            </button>
        )}

        {/* FORMULARIO DE AGREGAR (Toggle) */}
        {showAddForm && (
            <div className="bg-white p-6 rounded-[32px] shadow-lg border border-slate-100 animate-in slide-in-from-bottom duration-300">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <ShieldCheck size={20} className="text-green-500" /> Secure Add
                </h3>
                
                <form onSubmit={handleAddCard} className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase ml-1">Card Number</label>
                        <input 
                            name="number"
                            placeholder="0000 0000 0000 0000" 
                            className="w-full bg-slate-50 p-4 rounded-xl font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-100"
                            maxLength={19}
                            value={newCard.number}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="text-xs font-bold text-slate-400 uppercase ml-1">Expiry</label>
                            <input 
                                name="expiry"
                                placeholder="MM/YY" 
                                className="w-full bg-slate-50 p-4 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-100"
                                maxLength={5}
                                value={newCard.expiry}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="flex-1">
                            <label className="text-xs font-bold text-slate-400 uppercase ml-1">CVC</label>
                            <input 
                                name="cvc"
                                placeholder="123" 
                                type="password"
                                className="w-full bg-slate-50 p-4 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-100"
                                maxLength={3}
                                value={newCard.cvc}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                        <button 
                            type="button"
                            onClick={() => setShowAddForm(false)}
                            className="flex-1 py-4 text-slate-500 font-bold hover:bg-slate-50 rounded-xl transition"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="flex-[2] bg-[#111] text-white font-bold rounded-xl py-4 flex items-center justify-center gap-2 hover:bg-slate-800 transition"
                        >
                            <CheckCircle size={18} /> Save Card
                        </button>
                    </div>
                </form>
            </div>
        )}

      </div>
    </div>
  );
}