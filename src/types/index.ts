// =========================================
// DEFINICIONES GLOBALES DE TIPOS (BELYX)
// =========================================

// 1. TIPOS BÁSICOS COMPARTIDOS
export type EventType = 'appointment' | 'meeting' | 'break' | 'empty';
export type ServiceStatus = 'Confirmed' | 'Pending' | 'Completed' | 'Arrived' | 'Checking In' | 'STARTED';
export type LocationType = 'In-Salon' | 'Home Visit' | 'A Domicilio';

// 2. INTERFAZ PARA LA AGENDA (StaffDashboard)
export interface ScheduleItem {
  id: string;
  time: string;
  type: EventType;
  duration?: string;
  clientName?: string;
  serviceName?: string;
  clientImage?: string;
  locationType?: LocationType;
  distance?: string;
  status?: ServiceStatus;
  isVIP?: boolean;
  title?: string;
  subtitle?: string;
}

// 3. INTERFAZ PARA DETALLE DE CITA (StaffAppointmentDetails)
export interface AppointmentData {
  id: string;
  status: ServiceStatus;
  timeRange: string;
  date: string;
  client: {
    name: string;
    image: string;
    isVIP: boolean;
    type: 'Home Service' | 'In-Salon';
  };
  service: {
    name: string;
    duration: string;
    price: number;
  };
  location: {
    address: string;
    city: string;
    gateCode?: string;
    coordinates: { lat: number; lng: number };
  };
  medicalAlert?: string;
}

// 4. INTERFAZ PARA NAVEGACIÓN GPS (StaffNavigation) -> ¡ESTA FALTABA!
export interface NavigationSession {
  tripId: string;
  status: 'En Ruta' | 'Llegando' | 'En Sitio';
  eta: string;
  duration: string;
  distance: string;
  arrivalTime: string;
  client: {
    name: string;
    service: string;
    address: string;
    image: string;
    phone: string;
  };
  trafficCondition: 'Fluid' | 'Moderate' | 'Heavy';
}

// 5. INTERFAZ PARA EL CHECK-IN (StaffCheckIn)
export interface CheckInSession {
  bookingId: string;
  clientName: string;
  serviceName: string;
  serviceTime: string;
  clientImage: string;
  locationType: LocationType;
  status: ServiceStatus;
}

// 6. INTERFAZ PARA COMPLETAR SERVICIO (StaffServiceCompletion) -> ¡ESTA FALTABA!
export interface CompletionData {
  id: string;
  clientName: string;
  clientImage: string;
  serviceName: string;
  duration: string;
  total: number;
}

// 7. INTERFACES PARA GANANCIAS (StaffEarnings)
export type TransactionStatus = 'Paid' | 'Pending' | 'Processing';
export type TransactionType = 'Service' | 'Tip' | 'Product';

export interface Transaction {
  id: string;
  title: string;
  date: string;
  amount: number;
  status: TransactionStatus;
  type: TransactionType;
}

export interface EarningsStats {
  totalBalance: number;
  growth: number; 
  servicesTotal: number;
  tipsTotal: number;
  productsTotal: number;
  period: 'Daily' | 'Weekly' | 'Monthly';
  chartData: number[]; 
}

// 8. INTERFAZ PARA LISTA DE CLIENTES (StaffClients)
export interface ClientListItem {
  id: string;
  name: string;
  serviceInfo: string; // Ej: "Coloración • Hace 2 días"
  image?: string;      // URL de la foto
  initials?: string;   // Si no tiene foto (Ej: "CM")
  isVIP?: boolean;
  tag?: string;        // Ej: "Hoy 15:00"
}

// 9. INTERFAZ PARA PERFIL DE STAFF (StaffProfile)
export interface StaffProfileData {
  id: string;
  name: string;
  role: string;
  rating: number;
  reviewCount: number;
  image: string;
  isOnDuty: boolean;
  version: string;
  stats: {
    appointmentsToday: number;
    dailySales: number;
    retentionRate: number;
  };
}