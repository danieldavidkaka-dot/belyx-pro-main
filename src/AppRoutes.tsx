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
    navigate(path);
  };

  return (
    <Routes>
      {/* RUTAS PÚBLICAS */}
      <Route path={PATHS.ROOT} element={<Welcome onStart={() => navigate(PATHS.CLIENT.HOME)} onStaffLogin={() => navigate('/staff-login')} />} />
      <Route path="/staff-login" element={<StaffLogin onBack={() => navigate(PATHS.ROOT)} onLoginSuccess={() => navigate('/staff-dashboard')} />} />

      {/* RUTAS CLIENTE */}
      <Route element={<ClientLayout />}>
        <Route path={PATHS.CLIENT.HOME} element={<Home onNavigate={handleNavigate} onLogout={handleLogout} />} />
        <Route path={PATHS.CLIENT.BOOKINGS} element={<MyBookings onBack={() => navigate(-1)} onNavigate={handleNavigate} />} />
        <Route path={PATHS.CLIENT.WALLET} element={<MyRewards onBack={() => navigate(-1)} onNavigate={handleNavigate} />} />
        
        {/* Perfil */}
        <Route path={PATHS.CLIENT.PROFILE} element={<ClientProfile onLogout={handleLogout} onNavigate={handleNavigate} />} />
        <Route path="/profile/edit" element={<ClientEditProfile onBack={() => navigate(-1)} />} />
        <Route path="/profile/payments" element={<ClientPaymentMethods onBack={() => navigate(-1)} />} />
        <Route path="/profile/security" element={<ClientSecurity onBack={() => navigate(-1)} />} />
        <Route path="/profile/help" element={<ClientHelp onBack={() => navigate(-1)} />} />
        <Route path="/profile/notifications" element={<ClientNotifications onBack={() => navigate(-1)} />} />
        <Route path="/inbox" element={<ClientInbox onBack={() => navigate(-1)} />} />
      </Route>

      {/* --- AQUÍ ESTABA EL ERROR --- */}
      {/* Ya NO pasamos props porque los componentes usan useBooking() y useNavigate() */}
      <Route path="/booking/services" element={<ServiceSelection />} />
      <Route path="/booking/select-pro" element={<SelectProfessional />} />
      <Route path="/booking/consultation" element={<ServiceConsultation />} />
      <Route path="/booking/address" element={<ServiceAddress />} />
      <Route path="/booking/payment" element={<SelectPayment />} />
      <Route path="/booking/confirm" element={<ConfirmBooking />} />
      <Route path="/booking/success" element={<BookingSuccess />} />
      
      {/* TRACKING Y OTROS */}
      {/* Estos componentes si no los hemos tocado, pueden requerir props. 
          Si TrackProfessional ya lo actualizaste con mi código anterior, 
          entonces quítale las props aquí abajo también. 
          Dejaré las props aquí SOLO si no has actualizado esos archivos aún.
      */}
      <Route path="/booking-details/:id" element={<BookingDetails onBack={() => navigate(-1)} onCancel={() => navigate('/booking-cancel')} onTrack={() => navigate('/track-pro')} />} />
      <Route path="/booking-cancel" element={<CancelBooking onBack={() => navigate(-1)} />} />
      
      {/* Si ya actualizaste TrackProfessional, usa la línea comentada abajo: */}
      {/* <Route path="/track-pro" element={<TrackProfessional />} /> */}
      <Route path="/track-pro" element={<TrackProfessional />} /> 
      
      <Route path="/verify-service" element={<ServiceVerification />} />

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