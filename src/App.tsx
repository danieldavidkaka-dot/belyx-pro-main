import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { PATHS } from './app/router/paths';
import ClientLayout from './layouts/ClientLayout';
import StaffLayout from './layouts/StaffLayout';

// --- PÁGINAS CLIENTE ---
import { Welcome } from './pages/Welcome';
import { Home } from './pages/Home';
import ClientProfile from './pages/ClientProfile';
import MyBookings from './pages/MyBookings';
import MyRewards from './pages/MyRewards';
import ServiceSelection from './pages/ServiceSelection';
import SelectProfessional from './pages/SelectProfessional';
import SelectPayment from './pages/SelectPayment';
import ServiceAddress from './pages/ServiceAddress';
import ServiceConsultation from './pages/ServiceConsultation';
import { ConfirmBooking } from './pages/ConfirmBooking';
import TrackProfessional from './pages/TrackProfessional';
import ServiceVerification from './pages/ServiceVerification';
import BookingDetails from './pages/BookingDetails';
import CancelBooking from './pages/CancelBooking';
import ClientInbox from './pages/ClientInbox';

// --- RECUPERADOS: PÁGINAS DE PERFIL QUE FALTABAN ---
import ClientEditProfile from './pages/ClientEditProfile';   // <--- IMPORTANTE
import ClientPaymentMethods from './pages/ClientPaymentMethods'; // <--- IMPORTANTE
import ClientSecurity from './pages/ClientSecurity';         // <--- IMPORTANTE
import ClientHelp from './pages/ClientHelp';                 // <--- IMPORTANTE
import ClientNotifications from './pages/ClientNotifications'; // <--- IMPORTANTE

// --- PÁGINAS STAFF ---
import StaffLogin from './pages/StaffLogin';
import StaffDashboard from './pages/StaffDashboard';
import StaffClients from './pages/StaffClients';
import StaffEarnings from './pages/StaffEarnings';
import StaffProfile from './pages/StaffProfile';
import StaffAppointmentDetails from './pages/StaffAppointmentDetails';
import StaffNavigation from './pages/StaffNavigation';
import StaffCheckIn from './pages/StaffCheckIn';
import StaffEmergency from './pages/StaffEmergency';
import StaffServiceCompletion from './pages/StaffServiceCompletion';

function AppRoutes() {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    if (path === 'home') navigate(PATHS.CLIENT.HOME);
    else if (path === 'bookings') navigate(PATHS.CLIENT.BOOKINGS);
    else if (path === 'wallet') navigate(PATHS.CLIENT.WALLET);
    else if (path === 'profile') navigate(PATHS.CLIENT.PROFILE);
    else navigate(path);
  };

  const handleLogout = () => {
    navigate(PATHS.ROOT);
  };

  return (
    <Routes>
      {/* 1. RUTA PÚBLICA */}
      <Route path={PATHS.ROOT} element={
        <Welcome 
          onStart={() => navigate(PATHS.CLIENT.HOME)} 
          onStaffLogin={() => navigate(PATHS.AUTH.STAFF_LOGIN)} 
        />
      } />
      
      {/* 2. RUTAS CLIENTE CON LAYOUT (BottomNav) */}
      <Route element={<ClientLayout />}>
        <Route 
  path={PATHS.CLIENT.HOME} 
  element={
    <Home 
      onNavigate={handleNavigate} 
      onLogout={handleLogout} // <--- ¡ESTO FALTABA!
    />
  } 
/> 
        <Route path={PATHS.CLIENT.INBOX} element={<ClientInbox />} />
        
        <Route path={PATHS.CLIENT.BOOKINGS} element={
          <MyBookings onBack={() => navigate(-1)} onNavigate={handleNavigate} />
        } />
        <Route path={PATHS.CLIENT.WALLET} element={
          <MyRewards onBack={() => navigate(-1)} onNavigate={handleNavigate} />
        } />
        <Route path={PATHS.CLIENT.PROFILE} element={
          <ClientProfile onLogout={handleLogout} onNavigate={handleNavigate} />
        } />
      </Route>

      {/* 3. RUTAS DETALLE CLIENTE (Sin BottomNav) */}
      <Route path="/booking-details/:id" element={<BookingDetails />} />
      <Route path="/cancel/:id" element={<CancelBooking />} />

      {/* --- AQUÍ ESTABA EL PROBLEMA: AGREGAMOS LAS RUTAS DEL PERFIL --- */}
      <Route path="/profile/edit" element={<ClientEditProfile />} />
      <Route path="/profile/payments" element={<ClientPaymentMethods />} />
      <Route path="/profile/security" element={<ClientSecurity />} />
      <Route path="/profile/help" element={<ClientHelp />} />
      <Route path="/profile/notifications" element={<ClientNotifications />} />

      {/* 4. FLUJO DE RESERVA (BOOKING FLOW) */}
      <Route path={PATHS.CLIENT.SERVICES} element={<ServiceSelection />} />
      <Route path={PATHS.BOOKING.SELECT_PRO} element={<SelectProfessional />} />
      <Route path={PATHS.BOOKING.ADDRESS} element={<ServiceAddress />} />
      
      <Route path={PATHS.BOOKING.PAYMENT} element={
        <SelectPayment 
            price={65.00} 
            onConfirm={() => navigate(PATHS.BOOKING.CONSULTATION)} 
        />
      } />

      <Route path={PATHS.BOOKING.CONSULTATION} element={<ServiceConsultation />} />
      
      <Route path={PATHS.BOOKING.CONFIRM} element={
        <ConfirmBooking 
            onBack={() => navigate(-1)} 
            onConfirm={() => navigate(PATHS.BOOKING.TRACK)} 
        />
      } />
      
      {/* 5. SERVICIO ACTIVO */}
      <Route path={PATHS.BOOKING.TRACK} element={
        <TrackProfessional 
            onBack={() => navigate(PATHS.CLIENT.HOME)} 
            onCall={() => alert("Llamando...")} 
            onArrival={() => navigate(PATHS.BOOKING.VERIFICATION)} 
        />
      } />
      
      <Route path={PATHS.BOOKING.VERIFICATION} element={
        <ServiceVerification 
            onBack={() => navigate(PATHS.BOOKING.TRACK)} 
            onVerified={() => navigate(PATHS.CLIENT.WALLET)} 
        />
      } />

      {/* 6. RUTAS STAFF */}
      <Route path={PATHS.AUTH.STAFF_LOGIN} element={
        <StaffLogin 
          onBack={() => navigate(PATHS.ROOT)} 
          onLoginSuccess={() => navigate('/staff-dashboard')} 
        />
      } />

      <Route element={<StaffLayout />}>
         <Route path="/staff-dashboard" element={<StaffDashboard onLogout={handleLogout} />} />
         <Route path="/staff-clients" element={<StaffClients />} />
         <Route path="/staff-earnings" element={<StaffEarnings />} />
         <Route path="/staff-profile" element={<StaffProfile onLogout={handleLogout} />} />
      </Route>

      {/* Rutas Staff Operativas (Sin Layout) */}
      <Route path="/staff-appointment" element={<StaffAppointmentDetails onBack={() => navigate(-1)} onStartJob={() => navigate('/staff-navigation')} />} />
      <Route path="/staff-navigation" element={<StaffNavigation onBack={() => navigate(-1)} onArrived={() => navigate('/staff-checkin')} />} />
      <Route path="/staff-checkin" element={<StaffCheckIn onBack={() => navigate(-1)} onCheckInSuccess={() => navigate('/staff-completion')} />} />
      <Route path="/staff-completion" element={<StaffServiceCompletion onClose={() => navigate('/staff-dashboard')} onComplete={() => navigate('/staff-dashboard')} />} />
      <Route path="/staff-emergency" element={<StaffEmergency onBack={() => navigate(-1)} />} />
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to={PATHS.ROOT} replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;