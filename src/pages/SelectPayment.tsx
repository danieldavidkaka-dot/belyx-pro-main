import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Smartphone, RefreshCcw, CreditCard, Lock, Plus, Check } from 'lucide-react';
import { GradientButton } from '../components/GradientButton';
import { useBooking } from '../context/BookingContext';

export default function SelectPayment() {
  const navigate = useNavigate();
  const { booking, confirmBooking, paymentMethods, setPaymentMethod } = useBooking();
  const price = booking.price || 0; 
  
  // Estado para la tarjeta seleccionada
  const [selectedId, setSelectedId] = useState<string>('');

  // Efecto para pre-seleccionar la tarjeta por defecto
  useEffect(() => {
    if (paymentMethods.length > 0) {
        const defaultCard = paymentMethods.find(m => m.isDefault);
        if (defaultCard) setSelectedId(defaultCard.id);
        else setSelectedId(paymentMethods[0].id);
    }
  }, [paymentMethods]);

  const handleConfirm = () => {
    if (!selectedId) {
        alert("Please select a payment method");
        return;
    }
    setPaymentMethod(selectedId); // Guardamos la tarjeta usada en la reserva
    confirmBooking();
    navigate('/booking/confirm', { replace: true });
  };

  const handleAddNew = () => {
      // Navegamos al perfil para agregar tarjeta, pero podríamos pasarle un state para que vuelva aquí
      navigate('/profile/payments'); 
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-32 font-sans relative">
      <div className="bg-white sticky top-0 z-20 px-4 py-4 flex items-center shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition">
          <ArrowLeft size={20} className="text-slate-900" />
        </button>
        <h1 className="flex-1 text-center font-bold text-slate-900 mr-8">PAYMENT METHOD</h1>
      </div>

      <div className="px-6 pt-6">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-purple-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22v-7l-2-2"/><path d="M17 8v.8A6 6 0 0 1 13.8 20H10A6.5 6.5 0 0 1 7 8a5 5 0 0 1 10 0Z"/><path d="m14 14-2 2"/></svg>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-slate-900 text-sm">{booking.serviceName || 'Service'}</h3>
            <div className="flex items-center gap-2 text-slate-400 text-xs mt-1">
              <span>📅 {booking.locationType === 'home' ? 'At Home' : 'In Salon'}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-slate-900">${price.toFixed(2)}</p>
            <p className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full inline-block">PENDING</p>
          </div>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-1">Saved Methods</h3>
        <p className="text-slate-400 text-sm mb-6">Select how you would like to pay for your service.</p>
        
        <div className="space-y-4">
          {paymentMethods.length > 0 ? (
              paymentMethods.map((method) => {
                const isSelected = selectedId === method.id;
                return (
                  <div key={method.id} onClick={() => setSelectedId(method.id)} className={`relative flex items-center gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer group ${isSelected ? 'bg-white border-purple-500 shadow-lg shadow-purple-100' : 'bg-white border-slate-100 hover:border-slate-200'}`}>
                    {isSelected && <div className="absolute inset-0 bg-purple-50 opacity-20 rounded-2xl pointer-events-none"></div>}
                    
                    <div className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'border-purple-600' : 'border-slate-300'}`}>
                      {isSelected && <div className="w-3 h-3 rounded-full bg-purple-600" />}
                    </div>
                    
                    <div className="shrink-0 w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center">
                        {method.type === 'visa' || method.type === 'mastercard' || method.type === 'amex' 
                            ? <CreditCard size={24} className="text-slate-600" />
                            : <Smartphone size={24} className="text-purple-600" />
                        }
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 capitalize">{method.type} •••• {method.last4}</h4>
                      <p className="text-xs text-slate-500 font-medium">{method.cardHolder}</p>
                    </div>
                    
                    {isSelected && (<div className="bg-purple-600 rounded-full p-1 text-white animate-fade-in-up"><Check size={12} strokeWidth={3} /></div>)}
                  </div>
                );
              })
          ) : (
              <div className="text-center py-4 text-slate-400 text-sm">No cards saved yet.</div>
          )}

          <button onClick={handleAddNew} className="w-full border-2 border-dashed border-slate-200 rounded-2xl p-4 flex items-center justify-center gap-2 text-slate-900 font-bold hover:bg-slate-50 hover:border-purple-300 transition-colors">
            <Plus size={20} className="text-slate-400" /> Add New Method
          </button>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center text-slate-300 gap-2">
            <Lock size={16} />
            <p className="text-[10px] font-bold tracking-widest uppercase">Payments are secure and encrypted</p>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent z-20">
        <GradientButton 
            text={`Confirm Booking $${price.toFixed(2)} →`} 
            fullWidth={true} 
            onClick={handleConfirm}
            disabled={!selectedId} // Deshabilitar si no hay tarjeta
        />
      </div>
    </div>
  );
}