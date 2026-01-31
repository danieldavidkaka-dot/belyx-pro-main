import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, LogOut, CreditCard, HelpCircle, ChevronRight, User, Bell, Shield, Star } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
import { useBooking } from '../context/BookingContext'; // <--- Importamos cerebro

interface ClientProfileProps {
  onLogout: () => void;
  onNavigate: (tab: any) => void;
}

export default function ClientProfile({ onLogout, onNavigate }: ClientProfileProps) {
  const navigate = useNavigate();
  const { user, bookingHistory } = useBooking(); // <--- Leemos usuario real e historial

  // Calculamos stats reales
  const totalBookings = bookingHistory.length;

  const menuItems = [
    { icon: <CreditCard size={20} />, label: 'Payment Methods', sub: 'Visa **42', path: '/profile/payments' },
    { icon: <Bell size={20} />, label: 'Notifications', sub: 'On', path: '/profile/notifications' },
    { icon: <Shield size={20} />, label: 'Privacy & Security', path: '/profile/security' },
    { icon: <HelpCircle size={20} />, label: 'Help Center', path: '/profile/help' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-24 font-sans text-slate-900 relative">
      
      {/* HEADER */}
      <div className="bg-white p-4 sticky top-0 z-20 flex items-center justify-between shadow-sm">
         <h1 className="font-bold text-lg ml-2">Profile</h1>
         <button className="p-2 hover:bg-slate-100 rounded-full transition text-slate-400">
             <Settings size={22} />
         </button>
      </div>

      <div className="p-6 space-y-6">
        
        {/* PROFILE CARD (DATOS REALES) */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-r from-purple-100 to-cyan-50 opacity-50" />
            
            <div className="relative mb-3 mt-4">
                <img 
                    src={user.image} // Imagen del contexto
                    alt="User" 
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                />
                <div className="absolute bottom-0 right-0 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></div>
            </div>
            
            <h2 className="text-xl font-bold text-slate-900">{user.name}</h2> {/* Nombre real */}
            <p className="text-sm text-slate-500 mb-4">{user.email}</p>

            <button 
                onClick={() => navigate('/profile/edit')}
                className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 hover:bg-slate-800 transition active:scale-95"
            >
                <User size={14} /> Edit Profile
            </button>
        </div>

        {/* STATS ROW (REALES) */}
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-1">
                <span className="text-2xl font-bold text-purple-600">{totalBookings}</span>
                <span className="text-xs font-bold text-slate-400 uppercase">Bookings</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-1">
                <div className="flex items-center gap-1 text-2xl font-bold text-yellow-500">
                    4.9 <Star size={18} fill="currentColor" />
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase">Rating</span>
            </div>
        </div>

        {/* MENU */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            {menuItems.map((item, index) => (
                <button 
                    key={index}
                    onClick={() => item.path && navigate(item.path)} 
                    className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition border-b border-slate-50 last:border-none"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600">
                            {item.icon}
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-bold text-slate-900">{item.label}</p>
                            {'sub' in item && <p className="text-xs text-slate-400">{item.sub}</p>}
                        </div>
                    </div>
                    <ChevronRight size={18} className="text-slate-300" />
                </button>
            ))}
        </div>

        <button 
            onClick={onLogout}
            className="w-full py-4 text-red-500 font-bold text-sm flex items-center justify-center gap-2 hover:bg-red-50 rounded-2xl transition"
        >
            <LogOut size={18} /> Sign Out
        </button>

      </div>

      <BottomNav activeTab="profile" onNavigate={onNavigate} />
    </div>
  );
}