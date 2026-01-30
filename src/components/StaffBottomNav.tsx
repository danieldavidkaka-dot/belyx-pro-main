import React from 'react';
import { Calendar, Users, DollarSign, User } from 'lucide-react';

interface StaffBottomNavProps {
  activeTab: 'agenda' | 'clients' | 'earnings' | 'profile';
  onNavigate: (tab: 'agenda' | 'clients' | 'earnings' | 'profile') => void;
}

export const StaffBottomNav = ({ activeTab, onNavigate }: StaffBottomNavProps) => {
  const navItems = [
    { id: 'agenda', label: 'Agenda', icon: <Calendar size={20} /> },
    { id: 'clients', label: 'Clients', icon: <Users size={20} /> },
    { id: 'earnings', label: 'Earnings', icon: <DollarSign size={20} /> },
    { id: 'profile', label: 'Profile', icon: <User size={20} /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-slate-50 flex justify-between items-center px-6 z-50 pb-2 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id as any)}
            className={`flex flex-col items-center gap-1.5 transition-all w-16 ${
              isActive ? 'text-purple-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <div className={`transition-transform duration-200 ${isActive ? '-translate-y-1' : ''}`}>
               {item.icon}
            </div>
            <span className={`text-[10px] font-bold ${isActive ? 'opacity-100' : 'opacity-80'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};