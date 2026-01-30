import React from 'react';

// 1. Definimos qué propiedades necesita la barra para funcionar
interface BottomNavProps {
  activeTab: 'home' | 'bookings' | 'wallet' | 'profile';
  onNavigate: (tab: 'home' | 'bookings' | 'wallet' | 'profile') => void;
}

export const BottomNav = ({ activeTab, onNavigate }: BottomNavProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-slate-50 flex justify-between items-center px-8 z-50 pb-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)]">
      
      {/* HOME */}
      <NavItem 
        label="Home" 
        active={activeTab === 'home'} 
        onClick={() => onNavigate('home')}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
            <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
          </svg>
        } 
      />

      {/* BOOKINGS */}
      <NavItem 
        label="Bookings" 
        active={activeTab === 'bookings'} 
        onClick={() => onNavigate('bookings')}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
        } 
      />

      {/* WALLET */}
      <NavItem 
        label="Wallet" 
        active={activeTab === 'wallet'} 
        onClick={() => onNavigate('wallet')}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
          </svg>
        } 
      />

      {/* PROFILE */}
      <NavItem 
        label="Profile" 
        active={activeTab === 'profile'} 
        onClick={() => onNavigate('profile')}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        } 
      />

    </div>
  );
};

// 2. Actualizamos NavItem para que acepte onClick
interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    onClick?: () => void; // <--- Nuevo prop
}

const NavItem = ({ icon, label, active = false, onClick }: NavItemProps) => (
  <div 
    onClick={onClick} // <--- Conectamos el click
    className={`flex flex-col items-center gap-1 cursor-pointer transition-colors group ${active ? 'text-purple-600' : 'text-slate-400 hover:text-purple-600'}`}
  >
    <div className={`transition-transform duration-200 ${active ? '-translate-y-1' : 'group-hover:scale-110'}`}>
        {icon}
    </div>
    <span className="text-[10px] font-bold">{label}</span>
  </div>
);