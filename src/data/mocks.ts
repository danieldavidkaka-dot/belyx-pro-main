import { 
  ScheduleItem, 
  AppointmentData, 
  CheckInSession, 
  NavigationSession, 
  CompletionData,
  EarningsStats, 
  Transaction,
  ClientListItem,
  StaffProfileData     // <--- Nuevo para StaffProfile
} from '../types';

// =========================================
// 1. AGENDA DEL STAFF (StaffDashboard)
// =========================================
export const STAFF_SCHEDULE: ScheduleItem[] = [
  {
    id: '1',
    time: '09:00 AM',
    type: 'meeting',
    title: 'Team Meeting',
    subtitle: 'Weekly Sync',
  },
  {
    id: '2',
    time: '10:30 AM',
    type: 'appointment',
    clientName: 'Maria G.',
    serviceName: 'Full Balayage & Cut',
    duration: '2h 30m',
    locationType: 'In-Salon',
    status: 'Confirmed',
    clientImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200',
  },
  {
    id: '3',
    time: '01:00 PM',
    type: 'appointment',
    clientName: 'Sophie L.',
    serviceName: 'Bridal Makeup Trial',
    locationType: 'Home Visit',
    distance: '5km away',
    clientImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200',
    isVIP: true,
  },
  {
    id: '4',
    time: '03:00 PM',
    type: 'break',
    title: 'Lunch Break',
    duration: '1h',
  },
  {
    id: '5',
    time: '04:00 PM',
    type: 'empty',
  }
];

// =========================================
// 2. DETALLE DE CITA ACTUAL (StaffAppointmentDetails)
// =========================================
export const CURRENT_APPOINTMENT: AppointmentData = {
  id: '#4092',
  status: 'Confirmed',
  timeRange: '14:00 - 15:30',
  date: 'JULY 24, 2024',
  client: {
    name: 'Ana López',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200',
    isVIP: true,
    type: 'Home Service'
  },
  service: {
    name: 'Luxury Manicure',
    duration: '90 mins',
    price: 120
  },
  location: {
    address: 'Av. Oaxaca 12, Roma Nte.',
    city: 'Cuauhtémoc, 06700 Ciudad de México',
    gateCode: '4892#',
    coordinates: { lat: 19.4, lng: -99.1 }
  },
  medicalAlert: 'Client is allergic to latex products. Please ensure all equipment is latex-free and use nitrile gloves.'
};

// =========================================
// 3. SESIÓN DE NAVEGACIÓN (StaffNavigation)
// =========================================
export const NAVIGATION_SESSION: NavigationSession = {
  tripId: 'TRIP-8921',
  status: 'En Ruta',
  eta: '14 min',
  duration: '14 min',
  distance: '3.2 km',
  arrivalTime: '14:15',
  client: {
    name: 'María González',
    service: 'Corte y Peinado Premium',
    address: 'Av. Reforma 222, CDMX',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200',
    phone: '+52 55 1234 5678'
  },
  trafficCondition: 'Fluid'
};

// =========================================
// 4. SESIÓN DE CHECK-IN (StaffCheckIn)
// =========================================
export const CHECKIN_SESSION: CheckInSession = {
  bookingId: '#4092',
  clientName: 'Sofia M.',
  serviceName: 'Manicura Premium',
  serviceTime: '10:00 AM',
  clientImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200',
  locationType: 'A Domicilio',
  status: 'Arrived'
};

// =========================================
// 5. DATOS DE CIERRE DE SERVICIO (StaffServiceCompletion)
// =========================================
export const COMPLETION_DATA: CompletionData = {
  id: '#4092',
  clientName: 'Maria Gonzalez',
  clientImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200',
  serviceName: 'Haircut & Color Treatment',
  duration: '90 min',
  total: 145.00
};

// =========================================
// 6. ESTADÍSTICAS DE GANANCIAS (StaffEarnings)
// =========================================
export const EARNINGS_STATS: EarningsStats = {
  totalBalance: 1240.50,
  growth: 12,
  servicesTotal: 800,
  tipsTotal: 240,
  productsTotal: 200,
  period: 'Weekly',
  chartData: [40, 65, 50, 90, 60, 80, 45] 
};

export const RECENT_TRANSACTIONS: Transaction[] = [
  { 
    id: '1', 
    title: 'Haircut & Style', 
    date: 'Today, 10:00 AM', 
    amount: 45.00, 
    status: 'Paid', 
    type: 'Service' 
  },
  { 
    id: '2', 
    title: 'Gel Manicure', 
    date: 'Today, 11:30 AM', 
    amount: 25.00, 
    status: 'Pending', 
    type: 'Service' 
  },
  { 
    id: '3', 
    title: 'Product Commission', 
    date: 'Yesterday, 04:15 PM', 
    amount: 5.00, 
    status: 'Paid', 
    type: 'Product' 
  },
];

// =========================================
// 7. LISTA DE CLIENTES (StaffClients)
// =========================================
export const STAFF_CLIENTS: ClientListItem[] = [
  {
    id: '1',
    name: 'Ana García',
    serviceInfo: 'Coloración • Hace 2 días',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200',
    isVIP: true
  },
  {
    id: '2',
    name: 'Alejandro Ruiz',
    serviceInfo: 'Corte Caballero • 20 Sep',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200'
  },
  {
    id: '3',
    name: 'Carla Mendez',
    serviceInfo: 'Manicura Gel • 05 Oct',
    initials: 'CM' // Sin imagen, usamos iniciales
  },
  {
    id: '4',
    name: 'Luis Torres',
    serviceInfo: 'Barba y Corte • Ayer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200'
  },
  {
    id: '5',
    name: 'Lucia Fernandez',
    serviceInfo: 'Tratamiento Facial',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200',
    tag: 'Hoy 15:00'
  },
  {
    id: '6',
    name: 'Maria Gonzalez',
    serviceInfo: 'Balayage • 18 Sep',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200'
  }
];

// =========================================
// 8. PERFIL DEL STAFF (StaffProfile) -> ¡NUEVO!
// =========================================
export const STAFF_PROFILE: StaffProfileData = {
  id: 'st-001',
  name: 'Elena Rodriguez',
  role: 'Master Colorist • Senior Stylist',
  rating: 4.9,
  reviewCount: 128,
  image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400',
  isOnDuty: true,
  version: 'v2.4.1',
  stats: {
    appointmentsToday: 12,
    dailySales: 840,
    retentionRate: 95
  }
};

// 9. RESUMEN DE RESERVA (Cliente - ConfirmBooking)
export const BOOKING_SUMMARY = {
  service: {
    name: 'Corte y Estilo',
    price: 45.00,
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=300'
  },
  professional: {
    name: 'Sarah J.',
    role: 'Estilista Senior',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200',
    rating: 4.9
  },
  schedule: {
    date: '24 Oct, 2025',
    time: '10:00 AM'
  },
  location: {
    address: 'Calle Principal 123, CDMX',
    type: 'A Domicilio'
  },
  payment: {
    method: 'Visa terminada en 4242',
    total: 47.50 // Incluyendo tarifa de servicio
  }
};