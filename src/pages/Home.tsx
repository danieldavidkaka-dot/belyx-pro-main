import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ServiceCard } from '../components/ServiceCard';
import { SalonCard } from '../components/SalonCard';
import { BottomNav } from '../components/BottomNav';
import { HeroCard } from '../components/HeroCard';
import { ProMapCard } from '../components/ProMapCard';

interface HomeProps {
  onLogout?: () => void;
  onSalonSelect?: () => void;
  onNavigate: (screen: 'home' | 'bookings' | 'wallet' | 'profile') => void;
}

export const Home = ({ onLogout, onSalonSelect, onNavigate }: HomeProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'salon' | 'home'>('salon');

  // Función auxiliar para navegar guardando el modo
  const goToServices = () => {
    navigate('/services', { state: { mode: activeTab } }); // <--- CLAVE: Enviamos el modo
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-24 font-sans">
      
      {/* HEADER FIXED */}
      <div className="bg-white p-6 pb-2 rounded-b-[32px] shadow-sm mb-6 sticky top-0 z-30">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
             <button 
                onClick={() => onNavigate('profile')} 
                className="w-10 h-10 rounded-full overflow-hidden border border-slate-100 transition-transform active:scale-90 hover:ring-2 hover:ring-purple-100 relative z-40"
             >
                <img src="https://i.pravatar.cc/150?img=5" alt="Avatar" className="w-full h-full object-cover" />
             </button>

             {activeTab === 'home' && (
                <div className="flex flex-col animate-fade-in">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Mode</span>
                    <span className="text-sm font-bold text-purple-600 flex items-center gap-1">
                        At Home 
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    </span>
                </div>
             )}
          </div>
          
          <button onClick={onLogout} className="w-8 h-8 flex items-center justify-center bg-slate-50 text-slate-400 rounded-full hover:bg-red-50 hover:text-red-400 transition-colors">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg>
          </button>
        </div>

        {/* SWITCH */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-6 relative z-10">
          <button onClick={() => setActiveTab('salon')} className={`flex-1 py-3 text-xs font-bold rounded-lg transition-all ${activeTab === 'salon' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>In Salon</button>
          <button onClick={() => setActiveTab('home')} className={`flex-1 py-3 text-xs font-bold rounded-lg transition-all ${activeTab === 'home' ? 'bg-white text-[#00D4FF] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>At Home</button>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-1">{activeTab === 'salon' ? 'Good morning, Alex.' : 'Good morning, Julia.'}</h1>
        <p className="text-slate-400 text-sm mb-4">{activeTab === 'salon' ? 'Ready for your glow up?' : 'Ready for your session?'}</p>
      </div>

      {activeTab === 'salon' ? (
        <>
            <div className="pl-6 mb-8 animate-fade-in">
                <div className="flex justify-between items-center pr-6 mb-4">
                    <h2 className="font-bold text-lg text-slate-900 flex items-center gap-2"><span className="text-[#8B31FF]">✨</span> AI Picks For You</h2>
                    <button className="text-xs font-bold text-[#00D4FF] hover:underline">View all</button>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 pr-6 snap-x hide-scrollbar">
                     <button onClick={goToServices} className="active:scale-95 transition-transform text-left">
                        <ServiceCard title="Hydro-Glow Facial" salonName="LuxeSpa Downtown" price="120" matchScore={98} image="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=400" />
                     </button>
                     <button onClick={goToServices} className="active:scale-95 transition-transform text-left">
                        <ServiceCard title="Cryo-Manicure" salonName="Nail Lab Tech" price="65" matchScore={92} image="https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&q=80&w=400" />
                     </button>
                </div>
            </div>
            
            <div className="px-6 mb-8 animate-fade-in">
                <h2 className="font-bold text-lg text-slate-900 mb-4">Browse Categories</h2>
                <div className="grid grid-cols-2 gap-3">
                    {[{ name: 'Hair Styling', icon: '✂️', bg: 'bg-purple-100', color: 'text-purple-600' }, { name: 'Spa & Relax', icon: '🌿', bg: 'bg-cyan-100', color: 'text-cyan-600' }, { name: 'Makeup', icon: '💄', bg: 'bg-pink-100', color: 'text-pink-600' }, { name: 'Wellness', icon: '🧘‍♀️', bg: 'bg-green-100', color: 'text-green-600' }].map((cat) => (
                        <button key={cat.name} onClick={goToServices} className="bg-white p-3 rounded-xl border border-slate-100 flex items-center gap-3 hover:bg-slate-50 active:scale-95 transition-all text-left shadow-sm hover:shadow-md">
                            <div className={`w-10 h-10 rounded-lg ${cat.bg} flex items-center justify-center ${cat.color} text-lg`}>{cat.icon}</div>
                            <span className="text-xs font-bold text-slate-700">{cat.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="px-6 animate-fade-in">
                <div className="flex justify-between items-center mb-4"><h2 className="font-bold text-lg text-slate-900">Near You</h2><span className="text-xs text-slate-400">📍 Within 5km</span></div>
                <button onClick={goToServices} className="w-full active:scale-95 transition-transform mb-4 text-left"><SalonCard name="Aura Salon & Spa" address="0.8 km • Open until 8pm" rating={4.9} tags={['Hair', 'Nails']} image="https://images.unsplash.com/photo-1521590832896-7ea867403dab?auto=format&fit=crop&q=80&w=200" /></button>
                <button onClick={goToServices} className="w-full active:scale-95 transition-transform text-left"><SalonCard name="Zenith Aesthetics" address="1.2 km • Closing soon" rating={4.8} tags={['Skin', 'Laser']} image="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=200" /></button>
            </div>
        </>
      ) : (
        <div className="px-6 animate-fade-in">
            <div className="flex items-center gap-2 mb-4"><span className="text-purple-500 font-bold tracking-widest text-sm">BELYX</span><span className="text-slate-900 font-bold text-lg">AI Recommended</span></div>
            <button onClick={goToServices} className="w-full active:scale-[0.98] transition-transform text-left"><HeroCard title="Manicure Spa" subtitle="Based on your visit 3 weeks ago" rating={4.9} reviews={120} time="45m" image="https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=800" /></button>
            <div className="mb-8">
                <h3 className="font-bold text-slate-900 mb-4 text-lg">Services</h3>
                <div className="flex justify-between">
                    {[{ name: 'Hair', icon: '✂️' }, { name: 'Massage', icon: '🌿' }, { name: 'Nails', icon: '💅' }, { name: 'Facial', icon: '🎭' }, { name: 'Yoga', icon: '🧘‍♀️' }].map((s) => (
                        <button key={s.name} onClick={goToServices} className="flex flex-col items-center gap-2 group cursor-pointer active:scale-90 transition-transform">
                            <div className="w-14 h-14 bg-white rounded-[20px] shadow-sm border border-slate-100 flex items-center justify-center text-2xl group-hover:border-purple-200 group-hover:bg-purple-50 transition-colors">{s.icon}</div>
                            <span className="text-xs font-medium text-slate-500">{s.name}</span>
                        </button>
                    ))}
                </div>
            </div>
            <div><div className="flex justify-between items-center mb-4"><h2 className="font-bold text-lg text-slate-900">Pros near you</h2><span className="text-xs font-bold text-purple-600">View Map</span></div><ProMapCard /></div>
        </div>
      )}
      <BottomNav activeTab="home" onNavigate={onNavigate} />
    </div>
  );
};