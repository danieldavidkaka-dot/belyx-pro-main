// Archivo: src/app/router/paths.ts
export const PATHS = {
  ROOT: '/',
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    STAFF_LOGIN: '/staff',
  },
  CLIENT: {
    HOME: '/home',
    SERVICES: '/services',
    INBOX: '/inbox',
    BOOKINGS: '/bookings',
    WALLET: '/wallet',
    PROFILE: '/profile',
    PROFILE_EDIT: '/profile/edit',
  },
  BOOKING: {
    SALON: '/salon',
    SERVICE_DETAILS: '/service',
    SELECT_PRO: '/select-pro',
    ADDRESS: '/address',
    PAYMENT: '/payment',
    CONSULTATION: '/consultation',
    CONFIRM: '/confirm',
    TRACK: '/track',
    VERIFICATION: '/verification',
  },
  STAFF: {
    DASHBOARD: '/staff-dashboard',
    PROFILE: '/staff-profile',
  },
} as const;