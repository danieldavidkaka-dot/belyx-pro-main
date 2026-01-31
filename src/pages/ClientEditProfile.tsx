import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Camera, User, Mail, Phone, MapPin, Save, Loader2 } from 'lucide-react';
import { useBooking } from '../context/BookingContext'; // <--- Importamos cerebro

interface ClientEditProfileProps {
  onBack: () => void;
}

export default function ClientEditProfile({ onBack }: ClientEditProfileProps) {
  const navigate = useNavigate();
  const { user, updateUser } = useBooking(); // <--- Accedemos a datos y función update
  const [isSaving, setIsSaving] = useState(false);

  // Inicializamos con los datos REALES del usuario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    image: ''
  });

  // Cargamos datos al montar el componente
  useEffect(() => {
      if (user) {
          setFormData(user);
      }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulamos carga de red
    setTimeout(() => {
      updateUser(formData); // <--- Actualizamos el contexto global
      setIsSaving(false);
      navigate(-1); // Volvemos atrás
    }, 1000);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24 font-sans text-slate-900 relative">
      
      {/* HEADER */}
      <div className="bg-white p-4 sticky top-0 z-20 flex items-center justify-between shadow-sm">
         <button onClick={onBack} className="p-2 -ml-2 text-slate-900 hover:bg-slate-100 rounded-full transition">
             <ChevronLeft size={24} />
         </button>
         <h1 className="font-bold text-lg">Edit Profile</h1>
         <div className="w-8" /> 
      </div>

      <form onSubmit={handleSave} className="p-6 space-y-6">
        
        {/* PHOTO UPLOAD */}
        <div className="flex flex-col items-center gap-4">
            <div className="relative">
                <img 
                    src={formData.image} 
                    alt="Profile" 
                    className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
                />
                <button type="button" className="absolute bottom-0 right-0 bg-[#111] text-white p-2 rounded-full hover:bg-slate-800 transition shadow-sm">
                    <Camera size={18} />
                </button>
            </div>
            <p className="text-xs text-slate-400">Tap to change photo</p>
        </div>

        {/* FORM FIELDS */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 space-y-5">
            
            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 ml-1 uppercase">Full Name</label>
                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-200 transition-all">
                    <User size={18} className="text-slate-400" />
                    <input 
                        type="text" 
                        name="name"
                        value={formData.name} 
                        onChange={handleChange}
                        className="bg-transparent w-full text-sm font-medium text-slate-900 focus:outline-none"
                    />
                </div>
            </div>

            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 ml-1 uppercase">Email Address</label>
                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-200 transition-all">
                    <Mail size={18} className="text-slate-400" />
                    <input 
                        type="email" 
                        name="email"
                        value={formData.email} 
                        onChange={handleChange}
                        className="bg-transparent w-full text-sm font-medium text-slate-900 focus:outline-none"
                    />
                </div>
            </div>

            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 ml-1 uppercase">Phone Number</label>
                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-200 transition-all">
                    <Phone size={18} className="text-slate-400" />
                    <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone} 
                        onChange={handleChange}
                        className="bg-transparent w-full text-sm font-medium text-slate-900 focus:outline-none"
                    />
                </div>
            </div>

            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 ml-1 uppercase">Primary Address</label>
                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-200 transition-all">
                    <MapPin size={18} className="text-slate-400" />
                    <input 
                        type="text" 
                        name="address"
                        value={formData.address} 
                        onChange={handleChange}
                        className="bg-transparent w-full text-sm font-medium text-slate-900 focus:outline-none"
                    />
                </div>
            </div>

        </div>

        {/* SAVE BUTTON */}
        <div className="pt-4">
            <button 
                type="submit" 
                disabled={isSaving}
                className="w-full bg-[#111] hover:bg-slate-800 text-white py-4 rounded-2xl font-bold text-base shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isSaving ? (
                    <>
                        <Loader2 size={20} className="animate-spin" />
                        Saving...
                    </>
                ) : (
                    <>
                        <Save size={20} />
                        Save Changes
                    </>
                )}
            </button>
        </div>

      </form>
    </div>
  );
}