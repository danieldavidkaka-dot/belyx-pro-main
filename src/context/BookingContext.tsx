import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// --- TIPOS DE DATOS ---
interface UserData {
  name: string;
  email: string;
  phone: string;
  address: string;
  image: string;
}

// NUEVO: Interfaz para Tarjetas
export interface PaymentMethod {
  id: string;
  type: 'visa' | 'mastercard' | 'amex';
  last4: string;
  expiry: string;
  cardHolder: string;
  isDefault: boolean;
}

interface BookingData {
  id?: string;
  serviceId?: string;
  serviceName?: string;
  price?: number;
  locationType?: 'salon' | 'home';
  address?: string;
  professionalId?: string;
  professionalName?: string;
  professionalImage?: string;
  date?: string;
  time?: string;
  status: 'draft' | 'confirmed' | 'completed' | 'cancelled';
  // Datos de consulta
  hasAllergies?: boolean;
  hasSensitiveSkin?: boolean;
  isPregnant?: boolean;
  notes?: string;
  hasPhotos?: boolean;
  // Pago
  paymentMethodId?: string; // NUEVO: Saber con qué tarjeta se pagó
}

interface BookingContextType {
  // USUARIO
  user: UserData;
  updateUser: (data: Partial<UserData>) => void;
  
  // PAGOS Y WALLET (NUEVO)
  paymentMethods: PaymentMethod[];
  addPaymentMethod: (card: PaymentMethod) => void;
  removePaymentMethod: (id: string) => void;
  rewardsPoints: number; // Puntos de fidelidad

  // RESERVAS
  booking: BookingData;
  bookingHistory: BookingData[];
  setService: (id: string, name: string, price: number) => void;
  setLocation: (type: 'salon' | 'home', address: string) => void;
  setProfessional: (id: string, name: string) => void;
  setConsultation: (data: any) => void;
  setPaymentMethod: (cardId: string) => void; // NUEVO
  confirmBooking: () => void;
  cancelBooking: (id: string) => void;
  resetBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

// Valor inicial de Reserva
const INITIAL_BOOKING_STATE: BookingData = {
  status: 'draft',
  price: 0
};

// Valor inicial de Usuario
const INITIAL_USER_STATE: UserData = {
  name: 'Daniel Barrios',
  email: 'daniel@belyx.com',
  phone: '+58 412 123 4567',
  address: 'Caracas, Venezuela',
  image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200'
};

// Tarjeta de ejemplo inicial
const INITIAL_CARDS: PaymentMethod[] = [
  { id: 'c1', type: 'visa', last4: '4242', expiry: '12/28', cardHolder: 'Daniel Barrios', isDefault: true }
];

export function BookingProvider({ children }: { children: ReactNode }) {
  // 1. ESTADO DE USUARIO
  const [user, setUser] = useState<UserData>(() => {
      const savedUser = localStorage.getItem('belyx_user');
      return savedUser ? JSON.parse(savedUser) : INITIAL_USER_STATE;
  });

  // 2. ESTADO DE PAGOS (NUEVO)
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(() => {
      const savedCards = localStorage.getItem('belyx_cards');
      return savedCards ? JSON.parse(savedCards) : INITIAL_CARDS;
  });

  // 3. ESTADO DE PUNTOS (NUEVO)
  const [rewardsPoints, setRewardsPoints] = useState<number>(() => {
      const savedPoints = localStorage.getItem('belyx_points');
      return savedPoints ? parseInt(savedPoints) : 1240; // Puntos iniciales de regalo
  });

  // 4. ESTADO DE RESERVAS
  const [booking, setBooking] = useState<BookingData>(INITIAL_BOOKING_STATE);
  const [bookingHistory, setBookingHistory] = useState<BookingData[]>(() => {
    const saved = localStorage.getItem('belyx_history');
    return saved ? JSON.parse(saved) : [];
  });

  // --- PERSISTENCIA (LocalStorage) ---
  useEffect(() => localStorage.setItem('belyx_user', JSON.stringify(user)), [user]);
  useEffect(() => localStorage.setItem('belyx_history', JSON.stringify(bookingHistory)), [bookingHistory]);
  useEffect(() => localStorage.setItem('belyx_cards', JSON.stringify(paymentMethods)), [paymentMethods]);
  useEffect(() => localStorage.setItem('belyx_points', rewardsPoints.toString()), [rewardsPoints]);

  // --- FUNCIONES DE USUARIO ---
  const updateUser = (data: Partial<UserData>) => {
      setUser(prev => ({ ...prev, ...data }));
  };

  // --- FUNCIONES DE PAGOS (NUEVO) ---
  const addPaymentMethod = (card: PaymentMethod) => {
      setPaymentMethods(prev => [...prev, card]);
  };

  const removePaymentMethod = (id: string) => {
      setPaymentMethods(prev => prev.filter(card => card.id !== id));
  };

  // --- FUNCIONES DE RESERVA ---
  const setService = (id: string, name: string, price: number) => {
    setBooking(prev => ({ ...prev, serviceId: id, serviceName: name, price }));
  };

  const setLocation = (type: 'salon' | 'home', address: string) => {
    setBooking(prev => ({ ...prev, locationType: type, address }));
  };

  const setProfessional = (id: string, name: string) => {
    setBooking(prev => ({ ...prev, professionalId: id, professionalName: name }));
  };

  const setConsultation = (data: any) => {
    setBooking(prev => ({ ...prev, ...data }));
  };

  const setPaymentMethod = (cardId: string) => {
    setBooking(prev => ({ ...prev, paymentMethodId: cardId }));
  };

  const confirmBooking = () => {
    const finalizedBooking: BookingData = {
        ...booking,
        id: Date.now().toString(),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'confirmed'
    };

    // 1. Guardar en historial
    setBookingHistory(prev => [finalizedBooking, ...prev]);
    
    // 2. MAGIA: Calcular puntos (10 puntos por cada $1 gastado)
    if (booking.price) {
        const pointsEarned = Math.floor(booking.price * 10);
        setRewardsPoints(prev => prev + pointsEarned);
    }

    // 3. Confirmar estado local
    setBooking(prev => ({ ...prev, status: 'confirmed' }));
  };

  const cancelBooking = (id: string) => {
    setBookingHistory(prev => prev.map(b => 
        b.id === id ? { ...b, status: 'cancelled' } : b
    ));
    // Opcional: Podrías restar puntos si cancela, pero por ahora seamos amables :)
  };

  const resetBooking = () => {
    setBooking(INITIAL_BOOKING_STATE);
  };

  return (
    <BookingContext.Provider value={{ 
      user, updateUser,
      paymentMethods, addPaymentMethod, removePaymentMethod, rewardsPoints, // Nuevos valores expuestos
      booking, bookingHistory, 
      setService, setLocation, setProfessional, setConsultation, setPaymentMethod,
      confirmBooking, cancelBooking, resetBooking 
    }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}