import React from 'react';
import { ArrowLeft, Bell, QrCode, Sparkles, ChevronRight, Lock, ScanLine } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';

// --- ESTRUCTURA DE DATOS ESCALABLE ---
interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  image: string;
  isNew?: boolean;
  isLocked?: boolean;
  type: 'product' | 'service';
}

const MOCK_FEATURED: Reward[] = [
  {
    id: '1',
    title: 'Premium Facial Kit',
    description: 'Exclusive home care set for our Violet Elite members.',
    pointsCost: 1500,
    image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=400',
    isNew: true,
    type: 'product',
  },
  {
    id: '2',
    title: 'At-Home Spa Day',
    description: 'Professional setup directly to your home.',
    pointsCost: 1000,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=400',
    type: 'service',
  }
];

const MOCK_REDEEM_LIST: Reward[] = [
  {
    id: '3',
    title: 'Gel Manicure',
    description: 'Includes removal and nail art.',
    pointsCost: 800,
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=200',
    type: 'service',
  },
  {
    id: '4',
    title: '$20 Product Credit',
    description: 'Valid on all BELYX skincare products.',
    pointsCost: 2000,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=200',
    type: 'product',
  },
  {
    id: '5',
    title: 'Scalp Treatment',
    description: 'Unlock at Cyan Tier.',
    pointsCost: 3500,
    image: 'https://images.unsplash.com/photo-1519823551278-64ac927acdbc?q=80&w=200',
    isLocked: true,
    type: 'service',
  },
];

interface MyRewardsProps {
  onBack: () => void;
  onNavigate: (screen: any) => void;
}

export default function MyRewards({ onBack, onNavigate }: MyRewardsProps) {
  return (
    <div className="bg-[#0F1115] min-h-screen pb-28 font-sans text-white">
      
      {/* 1. HEADER OSCURO */}
      <div className="px-6 py-6 flex justify-between items-center sticky top-0 z-20 bg-[#0F1115]/90 backdrop-blur-md">
         {/* Botón invisible para centrar el título si quisieras back button, o el logo */}
         <div className="w-8"></div> 
         <h1 className="text-lg font-bold tracking-wide">My BELYX Rewards</h1>
         <button className="relative p-2 bg-[#1C1F26] rounded-full hover:bg-white/10 transition">
            <Bell size={20} className="text-white" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-[#1C1F26]"></span>
         </button>
      </div>

      <div className="px-6 space-y-8">
        
        {/* 2. LOYALTY CARD (WALLET STYLE) */}
        <div className="relative w-full aspect-[1.8/1] rounded-[32px] p-6 flex flex-col justify-between overflow-hidden shadow-2xl shadow-purple-900/40 group">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#8B31FF] via-[#6366F1] to-[#00D4FF] z-0"></div>
            
            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] z-0 mix-blend-overlay"></div>

            <div className="relative z-10 flex justify-between items-start">
                <div>
                    <p className="text-xs font-bold text-white/80 uppercase tracking-widest mb-1">Total Balance</p>
                    <h2 className="text-5xl font-extrabold text-white tracking-tight">2,450</h2>
                </div>
                <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30 flex items-center gap-1">
                    <Sparkles size={12} className="text-white" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Violet Elite</span>
                </div>
            </div>

            <div className="relative z-10">
                <div className="flex justify-between text-xs font-bold mb-2 text-white/90">
                    <span>Cyan Tier Progress</span>
                    <span>550 pts to go</span>
                </div>
                {/* Progress Bar */}
                <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden backdrop-blur-sm">
                    <div className="h-full w-[75%] bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                </div>
                
                <div className="flex justify-between items-end mt-4">
                    <p className="text-[10px] text-white/60 font-mono">ID: 883-921-BLYX</p>
                    <QrCode size={24} className="text-white opacity-80" />
                </div>
            </div>
        </div>

        {/* 3. ACHIEVEMENTS BAR */}
        <div className="bg-[#1C1F26] rounded-2xl p-4 flex items-center justify-between border border-white/5 cursor-pointer hover:bg-[#252932] transition">
            <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-xs border-2 border-[#1C1F26]">🚀</div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 flex items-center justify-center text-xs border-2 border-[#1C1F26]">⭐</div>
                    <div className="w-8 h-8 rounded-full bg-[#333] flex items-center justify-center text-[10px] border-2 border-[#1C1F26] text-slate-400 font-bold">+2</div>
                </div>
                <span className="text-sm font-bold text-slate-300">Your Achievements</span>
            </div>
            <ChevronRight size={16} className="text-slate-500" />
        </div>

        {/* 4. FEATURED REWARDS (Horizontal Scroll) */}
        <div>
            <h3 className="text-lg font-bold text-white mb-1">Featured Rewards</h3>
            <p className="text-xs text-slate-400 mb-4">Curated just for you</p>
            
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 no-scrollbar">
                {MOCK_FEATURED.map((item) => (
                    <div key={item.id} className="relative min-w-[220px] bg-[#1C1F26] rounded-3xl p-4 border border-white/5 group hover:border-purple-500/50 transition-colors">
                        {/* Aura Perimetral (Glow on Hover) */}
                        <div className="absolute inset-0 bg-purple-600/0 group-hover:bg-purple-600/5 rounded-3xl transition-all duration-500"></div>

                        {item.isNew && (
                            <span className="absolute top-4 right-4 bg-black/60 backdrop-blur text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/10 z-10">
                                New
                            </span>
                        )}
                        
                        <div className="h-32 rounded-2xl overflow-hidden mb-3 relative">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition" />
                        </div>
                        
                        <h4 className="font-bold text-white text-sm mb-1">{item.title}</h4>
                        <p className="text-[10px] text-slate-400 leading-tight mb-3 line-clamp-2">{item.description}</p>
                        
                        <div className="flex justify-between items-center">
                            <span className="text-purple-400 font-bold text-xs">{item.pointsCost} pts</span>
                            <button className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-purple-600 transition text-white">
                                <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* 5. REDEEM POINTS (Vertical List) */}
        <div>
            <h3 className="text-lg font-bold text-white mb-4">Redeem Points</h3>
            <div className="space-y-3">
                {MOCK_REDEEM_LIST.map((item) => (
                    <div key={item.id} className={`flex items-center gap-4 bg-[#1C1F26] p-3 rounded-2xl border ${item.isLocked ? 'border-transparent opacity-60' : 'border-white/5 hover:border-slate-700'}`}>
                        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between">
                                <h4 className="font-bold text-white text-sm truncate">{item.title}</h4>
                                {item.isLocked ? (
                                    <Lock size={12} className="text-slate-500" />
                                ) : (
                                    <span className="text-[10px] text-slate-500 bg-white/5 px-1.5 rounded">{item.type === 'service' ? 'In-Salon' : 'Any Item'}</span>
                                )}
                            </div>
                            <p className="text-[10px] text-slate-400 truncate mb-2">{item.description}</p>
                            <div className="inline-block bg-white/10 px-2 py-0.5 rounded-md">
                                <span className="text-xs font-bold text-slate-200">{item.pointsCost} pts</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </div>

      {/* 6. FAB (FLOATING REDEEM BUTTON) */}
      <div className="fixed bottom-24 left-0 right-0 flex justify-center z-40 px-6">
         <button className="w-full max-w-sm bg-gradient-to-r from-[#8B31FF] to-[#00D4FF] text-white p-4 rounded-2xl shadow-lg shadow-purple-900/50 flex items-center justify-center gap-3 font-bold hover:scale-[1.02] active:scale-95 transition-all">
            <ScanLine size={20} />
            <span>Redeem</span>
         </button>
      </div>

      {/* 7. BOTTOM NAV (Adaptada visualmente o reutilizada) */}
      <div className="fixed bottom-0 w-full z-50">
          <BottomNav activeTab="wallet" onNavigate={onNavigate} />
      </div>

    </div>
  );
}