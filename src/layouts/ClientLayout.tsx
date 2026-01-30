// Archivo: src/layouts/ClientLayout.tsx
import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav'; // Asegúrate que esta ruta sea correcta
import { PATHS } from '../app/router/paths';

export default function ClientLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // Determinamos la tab activa basándonos en la URL actual
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.startsWith(PATHS.CLIENT.HOME)) return 'home';
    if (path.startsWith(PATHS.CLIENT.BOOKINGS)) return 'bookings';
    if (path.startsWith(PATHS.CLIENT.WALLET)) return 'wallet';
    if (path.startsWith(PATHS.CLIENT.PROFILE)) return 'profile';
    return 'home'; // Default
  };

  const handleNavigate = (tab: 'home' | 'bookings' | 'wallet' | 'profile') => {
    switch (tab) {
      case 'home': navigate(PATHS.CLIENT.HOME); break;
      case 'bookings': navigate(PATHS.CLIENT.BOOKINGS); break;
      case 'wallet': navigate(PATHS.CLIENT.WALLET); break;
      case 'profile': navigate(PATHS.CLIENT.PROFILE); break;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24 font-sans text-slate-900">
      {/* Aquí se renderizarán las páginas hijas */}
      <Outlet />
      
      {/* Navegación Global Persistente */}
      <BottomNav 
        activeTab={getActiveTab()} 
        onNavigate={handleNavigate} 
      />
    </div>
  );
}