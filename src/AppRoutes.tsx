import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { PATHS } from './app/router/paths';

// Layouts
import ClientLayout from './layouts/ClientLayout';
import StaffLayout from './layouts/StaffLayout';

// Páginas Cliente
import { Welcome } from './pages/Welcome';
import { Home } from './pages/Home';
import ClientProfile from './pages/ClientProfile';
import MyBookings from './pages/MyBookings';
import MyRewards from './pages/MyRewards';

// FLUJO DE RESERVA (Componentes Nuevos - Sin Props)
import ServiceSelection from './pages/ServiceSelection';
import SelectProfessional from './pages/SelectProfessional';
import SelectPayment from './pages/SelectPayment';
import ServiceAddress from './pages/ServiceAddress';
import ServiceConsultation from './pages/ServiceConsultation';
import ConfirmBooking from './pages/ConfirmBooking';
import BookingSuccess from './pages/BookingSuccess'; 

// Otras páginas
import TrackProfessional from './pages/TrackProfessional';
import ServiceVerification from './pages/ServiceVerification';
import BookingDetails from './pages/BookingDetails';
import CancelBooking from './pages/CancelBooking';
import ClientInbox from './pages/ClientInbox';
import ClientEditProfile from './pages/ClientEditProfile';
import ClientPaymentMethods from './pages/ClientPaymentMethods';
import ClientSecurity from './pages/ClientSecurity';
import ClientHelp from './pages/ClientHelp';
import ClientNotifications from './pages/ClientNotifications';
import ClientSettings from './pages/ClientSettings'; // <--- NUEVA IMPORTACIÓN

// Páginas Staff
import StaffLogin from './pages/StaffLogin';
import StaffDashboard from './pages/StaffDashboard';
import StaffClients from './pages/StaffClients';
import StaffEarnings from './pages/StaffEarnings';
import StaffProfile from './pages/StaffProfile';
import StaffAppointmentDetails from './pages/StaffAppointmentDetails';
import StaffNavigation from './pages/StaffNavigation';
import StaffCheckIn from './pages/StaffCheckIn';
import StaffServiceCompletion from './pages/StaffServiceCompletion';
import StaffEmergency from './pages/StaffEmergency';

export const AppRoutes = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logging out...");
    navigate(PATHS.ROOT);
  };

  const handleNavigate = (path: string) => {
    // Helper para manejar strings de navegación
    if (path === 'home') navigate(PATHS.CLIENT.HOME);
    else if (path === 'bookings') navigate(PATHS.CLIENT.BOOKINGS);
    else if (path === 'wallet') navigate(PATHS.CLIENT.WALLET);
    else if (path === 'profile') navigate(PATHS.CLIENT.PROFILE);
    else navigate(path);
  };

  return (
    <Routes>
      {/* RUTAS PÚBLICAS */}
      <Route path={PATHS.ROOT} element={<Welcome onStart={() => navigate(PATHS.CLIENT.HOME)} onStaffLogin={() => navigate('/staff-login')} />} />
      <Route path="/staff-login" element={<StaffLogin onBack={() => navigate(PATHS.ROOT)} onLoginSuccess={() => navigate('/staff-dashboard')} />} />

      {/* RUTAS CLIENTE */}
      <Route element={<ClientLayout />}>
        <Route path={PATHS.CLIENT.HOME} element={<Home onNavigate={handleNavigate} onLogout={handleLogout} />} />
        
        {/* MyBookings y MyRewards aún usan props, se mantienen */}
        <Route path={PATHS.CLIENT.BOOKINGS} element={<MyBookings onBack={() => navigate(-1)} onNavigate={handleNavigate} />} />
        <Route path={PATHS.CLIENT.WALLET} element={<MyRewards onBack={() => navigate(-1)} onNavigate={handleNavigate} />} />
        
        {/* Perfil */}
        <Route path={PATHS.CLIENT.PROFILE} element={<ClientProfile onLogout={handleLogout} onNavigate={handleNavigate} />} />
        <Route path="/profile/edit" element={<ClientEditProfile onBack={() => navigate(-1)} />} />
        <Route path="/profile/payments" element={<ClientPaymentMethods />} /> {/* SIN PROPS */}
        <Route path="/profile/settings" element={<ClientSettings />} /> {/* <--- NUEVA RUTA */}
        <Route path="/profile/security" element={<ClientSecurity onBack={() => navigate(-1)} />} />
        <Route path="/profile/help" element={<ClientHelp onBack={() => navigate(-1)} />} />
        <Route path="/profile/notifications" element={<ClientNotifications onBack={() => navigate(-1)} />} />
        <Route path="/inbox" element={<ClientInbox onBack={() => navigate(-1)} />} />
      </Route>

      {/* FLUJO DE RESERVA */}
      <Route path="/booking/services" element={<ServiceSelection />} />
      <Route path="/booking/select-pro" element={<SelectProfessional />} />
      <Route path="/booking/consultation" element={<ServiceConsultation />} />
      <Route path="/booking/address" element={<ServiceAddress />} />
      <Route path="/booking/payment" element={<SelectPayment />} />
      <Route path="/booking/confirm" element={<ConfirmBooking />} />
      <Route path="/booking/success" element={<BookingSuccess />} />
      
      {/* DETALLES Y TRACKING (Sin props) */}
      <Route path="/booking-details/:id" element={<BookingDetails />} />
      <Route path="/track-pro" element={<TrackProfessional />} /> 
      
      {/* OTROS */}
      <Route path="/verify-service" element={<ServiceVerification />} />
      <Route path="/booking-cancel" element={<CancelBooking onBack={() => navigate(-1)} />} />

      {/* RUTAS STAFF */}
      <Route element={<StaffLayout />}>
         <Route path={PATHS.STAFF.DASHBOARD} element={<StaffDashboard onLogout={handleLogout} />} />
         <Route path="/staff-clients" element={<StaffClients />} />
         <Route path="/staff-earnings" element={<StaffEarnings />} />
         <Route path="/staff-profile" element={<StaffProfile onLogout={handleLogout} />} />
      </Route>

      {/* RUTAS STAFF OPERATIVAS */}
      <Route path="/staff-appointment" element={<StaffAppointmentDetails onBack={() => navigate(-1)} onStartJob={() => navigate('/staff-navigation')} />} />
      <Route path="/staff-navigation" element={<StaffNavigation onBack={() => navigate(-1)} onArrived={() => navigate('/staff-checkin')} />} />
      <Route path="/staff-checkin" element={<StaffCheckIn onBack={() => navigate(-1)} onCheckInSuccess={() => navigate('/staff-completion')} />} />
      <Route path="/staff-completion" element={<StaffServiceCompletion onClose={() => navigate('/staff-dashboard')} onComplete={() => navigate('/staff-dashboard')} />} />
      <Route path="/staff-emergency" element={<StaffEmergency onBack={() => navigate(-1)} />} />
      
      <Route path="*" element={<Navigate to={PATHS.ROOT} replace />} />
    </Routes>
  );
};