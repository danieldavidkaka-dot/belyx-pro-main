import React, { useState } from 'react';
import { 
  X, Clock, Camera, Mic, Calendar, ShoppingBag, 
  MoreHorizontal, ChevronRight, Check, Smile, Meh, Frown, ThumbsUp 
} from 'lucide-react';

// --- ESTRUCTURA DE DATOS ESCALABLE ---
interface CompletionData {
  id: string;
  clientName: string;
  clientImage: string;
  serviceName: string;
  duration: string;
  total: number;
}

const MOCK_COMPLETION: CompletionData = {
  id: '#4092',
  clientName: 'Maria Gonzalez',
  clientImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200',
  serviceName: 'Haircut & Color Treatment',
  duration: '90 min',
  total: 145.00
};

interface StaffServiceCompletionProps {
  onClose: () => void;
  onComplete: () => void;
}

export default function StaffServiceCompletion({ onClose, onComplete }: StaffServiceCompletionProps) {
  const [sentiment, setSentiment] = useState<'poor' | 'okay' | 'good' | 'great' | null>(null);
  const [isSliding, setIsSliding] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Lógica del Slider
  const handleSlideClick = () => {
    if (isCompleted) return;
    setIsSliding(true);
    setTimeout(() => {
      setIsCompleted(true);
      setIsSliding(false);
    }, 600);
  };

  return (
    <div className="bg-[#0F1115] min-h-screen font-sans text-white flex flex-col relative overflow-hidden">
      
      {/* 1. HEADER */}
      <div className="px-6 py-6 flex items-center justify-between sticky top-0 bg-[#0F1115]/90 backdrop-blur-md z-20">
        <h1 className="font-bold text-lg">Service Completion</h1>
        <button onClick={onClose} className="p-2 -mr-2 text-slate-400 hover:text-white transition">
          <X size={24} />
        </button>
      </div>

      <div className="px-6 pb-24 space-y-6">
        
        {/* 2. SERVICE SUMMARY CARD (Glow Effect) */}
        <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-[#8B31FF] to-[#00D4FF] shadow-[0_0_30px_rgba(139,49,255,0.2)]">
            <div className="bg-[#1C1F26] rounded-[23px] p-5 h-full relative overflow-hidden">
                {/* Fondo sutil */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>

                <div className="flex items-center gap-4 mb-6 relative z-10">
                    <img 
                        src={MOCK_COMPLETION.clientImage} 
                        alt="Client" 
                        className="w-14 h-14 rounded-full object-cover border-2 border-slate-600" 
                    />
                    <div>
                        <h2 className="font-bold text-lg leading-tight">{MOCK_COMPLETION.clientName}</h2>
                        <p className="text-slate-400 text-xs">{MOCK_COMPLETION.serviceName}</p>
                    </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-4 relative z-10">
                    <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">TIME</p>
                        <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
                            <Clock size={16} /> {MOCK_COMPLETION.duration}
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">TOTAL</p>
                        <p className="text-xl font-bold text-white">${MOCK_COMPLETION.total.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </div>

        {/* 3. SLIDE TO COMPLETE (Action) */}
        <button 
           onClick={handleSlideClick}
           disabled={isCompleted}
           className={`w-full h-14 rounded-full relative overflow-hidden group transition-all border border-white/10 ${
               isCompleted ? 'bg-green-600 border-green-500' : 'bg-[#1C1F26]'
           }`}
        >
            {/* Background progress fill */}
            <div className={`absolute inset-y-0 left-0 bg-gradient-to-r from-[#8B31FF] to-[#00D4FF] transition-all duration-500 ${isSliding || isCompleted ? 'w-full' : 'w-14'}`}></div>
            
            {/* Slider Knob / Check Icon */}
            <div className={`absolute top-1 bottom-1 w-12 bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-500 z-10 ${
                isCompleted ? 'left-[calc(100%-3.5rem)] text-green-600' : isSliding ? 'left-[calc(100%-3.5rem)]' : 'left-1 text-slate-900'
            }`}>
                {isCompleted ? <Check size={20} /> : <ChevronRight size={20} />}
            </div>

            {/* Text */}
            <span className={`absolute inset-0 flex items-center justify-center text-xs font-bold tracking-[0.2em] uppercase transition-opacity ${isSliding || isCompleted ? 'opacity-0' : 'text-slate-500'}`}>
                Slide to Complete
            </span>
            {isCompleted && (
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold tracking-[0.2em] uppercase text-white animate-fade-in">
                    Completed
                </span>
            )}
        </button>

        {/* 4. CLIENT SENTIMENT */}
        <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">QUICK CLIENT SENTIMENT</p>
            <div className="grid grid-cols-4 gap-3">
                {[
                    { id: 'poor', icon: Frown, label: 'POOR' },
                    { id: 'okay', icon: Meh, label: 'OKAY' },
                    { id: 'good', icon: Smile, label: 'GOOD' },
                    { id: 'great', icon: ThumbsUp, label: 'GREAT' },
                ].map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setSentiment(item.id as any)}
                        className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 border transition-all ${
                            sentiment === item.id 
                                ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/50' 
                                : 'bg-[#1C1F26] border-white/5 text-slate-500 hover:bg-[#252932]'
                        }`}
                    >
                        <item.icon size={20} />
                        <span className="text-[10px] font-bold">{item.label}</span>
                    </button>
                ))}
            </div>
        </div>

        {/* 5. STAFF NOTES */}
        <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">STAFF NOTES (INTERNAL)</p>
            <div className="relative">
                <textarea 
                    className="w-full bg-[#1C1F26] border border-white/10 rounded-2xl p-4 pr-12 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-slate-500 min-h-[100px] resize-none"
                    placeholder="Record formulas (e.g., 7B + 20vol), client preferences, or technical notes..."
                ></textarea>
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <button className="p-2 bg-[#2A2E37] text-slate-400 rounded-lg hover:text-white transition">
                        <Camera size={16} />
                    </button>
                    <button className="p-2 bg-[#2A2E37] text-slate-400 rounded-lg hover:text-white transition">
                        <Mic size={16} />
                    </button>
                </div>
            </div>
        </div>

        {/* 6. NEXT ACTIONS */}
        <div className="grid grid-cols-2 gap-4">
            <button className="bg-[#1C1F26] border border-white/5 p-4 rounded-2xl text-left hover:bg-[#252932] transition group">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 mb-3 group-hover:scale-110 transition-transform">
                    <Calendar size={16} />
                </div>
                <p className="text-sm font-bold text-white">Rebook Client</p>
                <p className="text-[10px] text-slate-500">Schedule next visit</p>
            </button>

            <button className="bg-[#1C1F26] border border-white/5 p-4 rounded-2xl text-left hover:bg-[#252932] transition group">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-110 transition-transform">
                    <ShoppingBag size={16} />
                </div>
                <p className="text-sm font-bold text-white">Upsell Product</p>
                <p className="text-[10px] text-slate-500">Add retail items</p>
            </button>
        </div>

      </div>

      {/* 7. FOOTER ACTIONS */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-[#0F1115]/80 backdrop-blur-xl border-t border-white/5 flex gap-4 z-30">
        <button className="w-14 h-14 bg-[#1C1F26] rounded-2xl flex items-center justify-center text-slate-400 hover:text-white border border-white/10">
            <MoreHorizontal size={24} />
        </button>
        <button 
            onClick={onComplete}
            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl text-sm transition shadow-lg shadow-blue-900/40"
        >
            Done
        </button>
      </div>

    </div>
  );
}