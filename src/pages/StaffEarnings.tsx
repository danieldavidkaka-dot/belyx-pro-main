import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, Eye, EyeOff, TrendingUp, Scissors, 
  Banknote, ShoppingBag 
} from 'lucide-react';
import { StaffBottomNav } from '../components/StaffBottomNav';

// Imports Centralizados
import { EARNINGS_STATS, RECENT_TRANSACTIONS } from '../data/mocks';

export default function StaffEarnings() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState<'Daily' | 'Weekly' | 'Monthly'>('Weekly');
  const [showBalance, setShowBalance] = useState(true);

  // Navegación del menú inferior (ACTUALIZADA COMPLETAMENTE)
  const handleBottomNav = (tab: 'agenda' | 'clients' | 'earnings' | 'profile') => {
    switch (tab) {
      case 'agenda': 
        navigate('/staff-dashboard'); 
        break;
      case 'clients': 
        navigate('/staff-clients'); 
        break;
      case 'earnings': 
        return; // Ya estamos en esta pantalla
      case 'profile': 
        navigate('/staff-profile'); // <--- ¡CONECTADO!
        break;
    }
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-24 font-sans text-slate-900 relative">
      
      {/* 1. HEADER */}
      <div className="bg-white p-6 pb-4 sticky top-0 z-20">
         <div className="flex justify-between items-center mb-6">
             <div className="flex items-center gap-3">
                 <div className="relative">
                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200" alt="Staff" className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                 </div>
                 <div>
                     <h1 className="text-lg font-bold text-slate-900 leading-tight">Staff Earnings</h1>
                     <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">HELLO, SARAH</p>
                 </div>
             </div>
             <button className="relative p-2 bg-slate-50 hover:bg-slate-100 rounded-full transition">
                 <Bell size={20} className="text-slate-900" />
                 <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
             </button>
         </div>

         {/* TABS (Pills) */}
         <div className="bg-slate-100 p-1 rounded-xl flex">
            {['Daily', 'Weekly', 'Monthly'].map((p) => (
                <button 
                   key={p}
                   onClick={() => setPeriod(p as any)}
                   className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                       period === p ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                   }`}
                >
                    {p}
                </button>
            ))}
         </div>
      </div>

      <div className="px-6 space-y-8 mt-4">
        
        {/* 2. HERO CARD (Gradient) */}
        <div className="relative rounded-3xl p-6 bg-gradient-to-r from-[#8B31FF] to-[#00D4FF] text-white shadow-xl shadow-blue-500/20 overflow-hidden">
            {/* Círculos decorativos de fondo */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-2">
                    <p className="text-xs font-medium text-white/80">Total Balance</p>
                    <button onClick={() => setShowBalance(!showBalance)} className="text-white/70 hover:text-white">
                        {showBalance ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                </div>
                
                <h2 className="text-4xl font-bold mb-6 tracking-tight">
                    {showBalance ? `$${EARNINGS_STATS.totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '••••••'}
                </h2>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-lg backdrop-blur-sm">
                        <TrendingUp size={14} className="text-white" />
                        <span className="text-xs font-bold">+{EARNINGS_STATS.growth}% vs last week</span>
                    </div>
                    
                    <button className="bg-white text-[#8B31FF] px-4 py-2 rounded-xl text-xs font-bold shadow-lg hover:bg-slate-50 transition active:scale-95">
                        Withdraw
                    </button>
                </div>
            </div>
        </div>

        {/* 3. BREAKDOWN CARDS */}
        <div>
            <div className="flex items-center gap-2 mb-4 border-l-4 border-[#8B31FF] pl-3">
                 <h3 className="font-bold text-slate-900">Breakdown</h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
                {/* Services */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 text-center">
                    <div className="w-8 h-8 mx-auto bg-purple-50 rounded-full flex items-center justify-center text-purple-600 mb-2">
                        <Scissors size={16} />
                    </div>
                    <p className="font-bold text-slate-900">${EARNINGS_STATS.servicesTotal}</p>
                    <p className="text-[10px] text-slate-400">Services</p>
                </div>
                {/* Tips */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 text-center">
                    <div className="w-8 h-8 mx-auto bg-cyan-50 rounded-full flex items-center justify-center text-cyan-600 mb-2">
                        <Banknote size={16} />
                    </div>
                    <p className="font-bold text-slate-900">${EARNINGS_STATS.tipsTotal}</p>
                    <p className="text-[10px] text-slate-400">Tips</p>
                </div>
                {/* Products */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 text-center">
                    <div className="w-8 h-8 mx-auto bg-pink-50 rounded-full flex items-center justify-center text-pink-600 mb-2">
                        <ShoppingBag size={16} />
                    </div>
                    <p className="font-bold text-slate-900">${EARNINGS_STATS.productsTotal}</p>
                    <p className="text-[10px] text-slate-400">Products</p>
                </div>
            </div>
        </div>

        {/* 4. ACTIVITY CHART */}
        <div>
            <div className="flex items-center justify-between mb-4 border-l-4 border-[#00D4FF] pl-3">
                 <h3 className="font-bold text-slate-900">Activity</h3>
                 <span className="text-xs text-slate-400">Last 7 Days</span>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex items-end justify-between h-32 gap-2">
                    {EARNINGS_STATS.chartData.map((height, idx) => {
                        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                        const isToday = idx === 3; // Simulamos que hoy es Jueves (Thu)
                        return (
                            <div key={idx} className="flex flex-col items-center flex-1 gap-2 group cursor-pointer">
                                <div className="w-full relative h-full flex items-end rounded-t-lg bg-slate-50 overflow-hidden">
                                    <div 
                                        style={{ height: `${height}%` }} 
                                        className={`w-full rounded-t-lg transition-all duration-500 ${
                                            isToday 
                                              ? 'bg-gradient-to-t from-[#8B31FF] to-[#00D4FF] shadow-lg shadow-purple-200' 
                                              : 'bg-slate-200 group-hover:bg-slate-300'
                                        }`}
                                    ></div>
                                </div>
                                <span className={`text-[10px] font-bold ${isToday ? 'text-purple-600' : 'text-slate-300'}`}>
                                    {days[idx]}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>

        {/* 5. RECENT TRANSACTIONS */}
        <div className="pb-8">
            <div className="flex items-center justify-between mb-4">
                 <h3 className="font-bold text-slate-900 text-lg">Recent Transactions</h3>
                 <button className="text-xs font-bold text-[#8B31FF]">View All</button>
            </div>
            
            <div className="space-y-3">
                {RECENT_TRANSACTIONS.map((tx) => (
                    <div key={tx.id} className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                tx.type === 'Service' ? 'bg-purple-50 text-purple-600' : 
                                tx.type === 'Product' ? 'bg-pink-50 text-pink-600' : 'bg-green-50 text-green-600'
                            }`}>
                                {tx.type === 'Service' && <Scissors size={18} />}
                                {tx.type === 'Product' && <ShoppingBag size={18} />}
                                {tx.type === 'Tip' && <Banknote size={18} />}
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm">{tx.title}</h4>
                                <p className="text-xs text-slate-400">{tx.date}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-slate-900 text-sm">${tx.amount.toFixed(2)}</p>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                                tx.status === 'Paid' 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-yellow-100 text-yellow-700'
                            }`}>
                                {tx.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </div>

      {/* FOOTER NAV */}
      <StaffBottomNav activeTab="earnings" onNavigate={handleBottomNav} />

    </div>
  );
}