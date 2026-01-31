import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// --- TIPOS DE DATOS ---
interface UserData {
    name: string;
    email: string;
    phone: string;
    address: string;
    image: string;
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
  professionalImage?: string; // Agregado para consistencia
  date?: string;
  time?: string;
  status: 'draft' | 'confirmed' | 'completed' | 'cancelled';
  // Datos de consulta
  hasAllergies?: boolean;
  hasSensitiveSkin?: boolean;
  isPregnant?: boolean;
  notes?: string;
  hasPhotos?: boolean;
}

interface BookingContextType {
  // USUARIO
  user: UserData;
  updateUser: (data: Partial<UserData>) => void;
  
  // RESERVAS
  booking: BookingData;
  bookingHistory: BookingData[];
  setService: (id: string, name: string, price: number) => void;
  setLocation: (type: 'salon' | 'home', address: string) => void;
  setProfessional: (id: string, name: string) => void;
  setConsultation: (data: any) => void;
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

// Valor inicial de Usuario (Por defecto)
const INITIAL_USER_STATE: UserData = {
    name: 'Daniel Barrios',
    email: 'daniel@belyx.com',
    phone: '+58 412 123 4567',
    address: 'Caracas, Venezuela',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200'
};

export function BookingProvider({ children }: { children: ReactNode }) {
  // ESTADO DE USUARIO
  const [user, setUser] = useState<UserData>(() => {
      const savedUser = localStorage.getItem('belyx_user');
      return savedUser ? JSON.parse(savedUser) : INITIAL_USER_STATE;
  });

  // ESTADO DE RESERVA ACTUAL
  const [booking, setBooking] = useState<BookingData>(INITIAL_BOOKING_STATE);
  
  // ESTADO DEL HISTORIAL
  const [bookingHistory, setBookingHistory] = useState<BookingData[]>(() => {
    const saved = localStorage.getItem('belyx_history');
    return saved ? JSON.parse(saved) : [];
  });

  // PERSISTENCIA
  useEffect(() => {
    localStorage.setItem('belyx_history', JSON.stringify(bookingHistory));
  }, [bookingHistory]);

  useEffect(() => {
      localStorage.setItem('belyx_user', JSON.stringify(user));
  }, [user]);

  // --- FUNCIONES DE USUARIO ---
  const updateUser = (data: Partial<UserData>) => {
      setUser(prev => ({ ...prev, ...data }));
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

  const confirmBooking = () => {
    const finalizedBooking: BookingData = {
        ...booking,
        id: Date.now().toString(),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'confirmed'
    };
    setBookingHistory(prev => [finalizedBooking, ...prev]);
    setBooking(prev => ({ ...prev, status: 'confirmed' }));
  };

  const cancelBooking = (id: string) => {
    setBookingHistory(prev => prev.map(b => 
        b.id === id ? { ...b, status: 'cancelled' } : b
    ));
  };

  const resetBooking = () => {
    setBooking(INITIAL_BOOKING_STATE);
  };

  return (
    <BookingContext.Provider value={{ 
      user, updateUser, // Exportamos usuario
      booking, bookingHistory, 
      setService, setLocation, setProfessional, setConsultation, 
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