export const PATHS = {
  // Ruta Raíz (Bienvenida)
  ROOT: '/',

  // Rutas de Autenticación
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    STAFF_LOGIN: '/staff-login', // Corregido para coincidir con AppRoutes
  },

  // Rutas del Cliente (Usuario final)
  CLIENT: {
    HOME: '/home',
    BOOKINGS: '/my-bookings', // Coincide con AppRoutes
    WALLET: '/wallet',
    PROFILE: '/profile',
    INBOX: '/inbox',
    SERVICES: '/services', // Agregado por si acaso
    
    // Sub-rutas de Perfil (FALTABAN ESTAS)
    PROFILE_EDIT: '/profile/edit',
    PROFILE_PAYMENTS: '/profile/payments',
    PROFILE_SECURITY: '/profile/security',
    PROFILE_HELP: '/profile/help',
    PROFILE_NOTIFICATIONS: '/profile/notifications',

    // Acciones específicas de Reserva
    BOOKING_DETAILS: '/booking-details', 
    BOOKING_CANCEL: '/booking-cancel',
    TRACK_PRO: '/track-pro',
    VERIFY_SERVICE: '/verify-service',
  },

  // Flujo de Reserva (Paso a Paso)
  BOOKING: {
    SERVICES: '/booking/services',
    SELECT_PRO: '/booking/select-pro',
    CONSULTATION: '/booking/consultation',
    ADDRESS: '/booking/address',
    PAYMENT: '/booking/payment',
    CONFIRM: '/booking/confirm',
    SALON: '/salon',           // Extras que tenías
    SERVICE_DETAILS: '/service',
  },

  // Rutas del Staff (Profesionales) - (FALTABA CASI TODO ESTO)
  STAFF: {
    LOGIN: '/staff-login',
    DASHBOARD: '/staff-dashboard',
    CLIENTS: '/staff-clients',
    EARNINGS: '/staff-earnings',
    PROFILE: '/staff-profile',
    
    // Flujo Operativo del Staff
    APPOINTMENT_DETAILS: '/staff-appointment',
    NAVIGATION: '/staff-navigation',
    CHECK_IN: '/staff-checkin',
    COMPLETION: '/staff-completion',
    EMERGENCY: '/staff-emergency',
  }
} as const;