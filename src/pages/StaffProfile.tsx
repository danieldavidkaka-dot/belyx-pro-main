import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Star, Calendar, BarChart2, Scissors, 
  Users, User, Bell, HelpCircle, LogOut, ChevronRight 
} from 'lucide-react';
// ELIMINADO: import { StaffBottomNav } from '../components/StaffBottomNav';

// Datos Centralizados
import { STAFF_PROFILE } from '../data/mocks';

interface StaffProfileProps {
  onLogout: () => void;
}

export default function StaffProfile({ onLogout }: StaffProfileProps) {
  const navigate = useNavigate();
  const [isOnDuty, setIsOnDuty] = useState(STAFF_PROFILE.isOnDuty);

  // ELIMINADO: const handleBottomNav ... (Ya lo maneja el StaffLayout)

  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-24 font-sans text-slate-900 relative">
      
      {/* 1. HEADER */}
      <div className="bg-white p-4 sticky top-0 z-20 flex items-center justify-between shadow-sm">
         <button onClick={() => navigate('/staff-dashboard')} className="p-2 -ml-2 text-slate-900">
             <ChevronLeft size={24} />
         </button>
         <h1 className="font-bold text-lg">My Profile</h1>
         <div className="w-8" /> {/* Espaciador para centrar título */}
      </div>

      <div className="px-6 pt-6 pb-8">
          
          {/* 2. PROFILE HERO */}
          <div className="flex flex-col items-center mb-8">
              <div className="relative mb-4">
                  <div className="w-28 h-28 rounded-full p-[3px] bg-gradient-to-tr from-[#8B31FF] to-[#00D4FF]">
                      <img 
                          src={STAFF_PROFILE.image} 
                          alt="Profile" 
                          className="w-full h-full rounded-full object-cover border-4 border-white"
                      />
                  </div>
                  {/* On Duty Badge */}
                  <button 
                    onClick={() => setIsOnDuty(!isOnDuty)}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 border border-slate-100"
                  >
                      <div className={`w-2.5 h-2.5 rounded-full ${isOnDuty ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`}></div>
                      <span className="text-[10px] font-bold text-slate-600">{isOnDuty ? 'On Duty' : 'Off Duty'}</span>
                  </button>
              </div>

              <h2 className="text-xl font-bold text-slate-900">{STAFF_PROFILE.name}</h2>
              <p className="text-sm text-purple-600 font-medium mb-1">{STAFF_PROFILE.role}</p>
              
              <div className="flex items-center gap-1">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-bold text-slate-900">{STAFF_PROFILE.rating}</span>
                  <span className="text-xs text-slate-400">({STAFF_PROFILE.reviewCount} reviews)</span>
              </div>
          </div>

          {/* 3. STATS ROW */}
          <div className="grid grid-cols-3 gap-3 mb-8">
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 text-center">
                  <p className="text-purple-600 font-bold text-xl">{STAFF_PROFILE.stats.appointmentsToday}</p>
                  <p className="text-[10px] text-slate-400 leading-tight mt-1">Appts Today</p>
              </div>
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 text-center">
                  <p className="text-purple-600 font-bold text-xl">${STAFF_PROFILE.stats.dailySales}</p>
                  <p className="text-[10px] text-slate-400 leading-tight mt-1">Daily Sales</p>
              </div>
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 text-center">
                  <p className="text-purple-600 font-bold text-xl">{STAFF_PROFILE.stats.retentionRate}%</p>
                  <p className="text-[10px] text-slate-400 leading-tight mt-1">Retention</p>
              </div>
          </div>

          {/* 4. QUICK ACTIONS (Dark Card) */}
          <div className="bg-[#0F1115] rounded-3xl p-5 text-white flex items-center justify-between mb-8 shadow-lg shadow-slate-300">
              <div>
                  <h3 className="font-bold text-sm mb-1">Quick Actions</h3>
                  <p className="text-xs text-slate-400">Manage your daily availability</p>
              </div>
              <button className="bg-gradient-to-r from-[#8B31FF] to-[#00D4FF] px-4 py-2 rounded-xl text-xs font-bold shadow-lg hover:opacity-90 transition">
                  Edit Status
              </button>
          </div>

          {/* 5. OPERATIONS GRID */}
          <h3 className="font-bold text-slate-900 mb-4">Operations</h3>
          <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                  { icon: Calendar, label: 'My Schedule', sub: 'View upcoming shifts', color: 'text-purple-600', bg: 'bg-purple-50' },
                  { icon: BarChart2, label: 'Performance', sub: 'Analytics & goals', color: 'text-cyan-600', bg: 'bg-cyan-50' },
                  { icon: Scissors, label: 'My Services', sub: 'Manage portfolio', color: 'text-purple-600', bg: 'bg-purple-50' },
                  { icon: Users, label: 'My Clients', sub: 'History & notes', color: 'text-blue-600', bg: 'bg-blue-50', action: () => navigate('/staff-clients') },
              ].map((item, idx) => (
                  <button 
                      key={idx} 
                      onClick={item.action}
                      className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm text-left hover:shadow-md transition-shadow group"
                  >
                      <div className={`w-10 h-10 ${item.bg} ${item.color} rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                          <item.icon size={20} />
                      </div>
                      <p className="font-bold text-slate-900 text-sm">{item.label}</p>
                      <p className="text-[10px] text-slate-400">{item.sub}</p>
                  </button>
              ))}
          </div>

          {/* 6. ACCOUNT LIST */}
          <h3 className="font-bold text-slate-900 mb-4">Account</h3>
          <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
              {[
                  { icon: User, label: 'Personal Info' },
                  { icon: Bell, label: 'Notifications' },
                  { icon: HelpCircle, label: 'Help & Support' },
              ].map((item, idx) => (
                  <button key={idx} className="w-full flex items-center justify-between p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition">
                      <div className="flex items-center gap-3">
                          <item.icon size={18} className="text-slate-400" />
                          <span className="text-sm font-medium text-slate-700">{item.label}</span>
                      </div>
                      <ChevronRight size={16} className="text-slate-300" />
                  </button>
              ))}
              
              <button onClick={onLogout} className="w-full flex items-center gap-3 p-4 hover:bg-red-50 transition group">
                  <LogOut size={18} className="text-red-500 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-bold text-red-500">Log Out</span>
              </button>
          </div>
          
          <p className="text-center text-[10px] text-slate-300 mt-8">
              BELYX Staff App {STAFF_PROFILE.version}
          </p>
      </div>

      {/* ELIMINADO: <StaffBottomNav ... /> */}
    </div>
  );
}