import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { StaffBottomNav } from '../components/StaffBottomNav';

export default function StaffLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // Determinar la pestaña activa automáticamente basada en la URL
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/staff-clients')) return 'clients';
    if (path.includes('/staff-earnings')) return 'earnings';
    if (path.includes('/staff-profile')) return 'profile';
    return 'agenda'; // Default (dashboard)
  };

  const handleNavigate = (tab: 'agenda' | 'clients' | 'earnings' | 'profile') => {
    switch (tab) {
      case 'agenda': navigate('/staff-dashboard'); break;
      case 'clients': navigate('/staff-clients'); break;
      case 'earnings': navigate('/staff-earnings'); break;
      case 'profile': navigate('/staff-profile'); break;
    }
  };

  return (
    <>
      {/* Outlet funciona como un "placeholder" donde se renderizan las páginas hijas */}
      <Outlet />
      
      {/* La barra de navegación ahora vive aquí y es persistente */}
      <StaffBottomNav 
          activeTab={getActiveTab()} 
          onNavigate={handleNavigate} 
      />
    </>
  );
}