import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 1. Definimos la estructura de los datos de Consulta
export interface ConsultationData {
  hasAllergies: boolean;
  hasSensitiveSkin: boolean;
  isPregnant: boolean;
  notes: string;
  hasPhotos: boolean;
}

// 2. Definimos el Estado General de la Reserva
interface BookingState {
  serviceId: string | null;
  serviceName: string | null;
  price: number;
  professionalId: string | null;
  professionalName: string | null;
  date: string | null;
  time: string | null;
  locationType: 'salon' | 'home' | null;
  address?: string;
  // Nuevo campo para la consulta médica/notas
  consultation?: ConsultationData; 
  status: 'draft' | 'confirmed' | 'completed' | 'cancelled';
}

// Estado inicial vacío
const initialState: BookingState = {
  serviceId: null,
  serviceName: null,
  price: 0,
  professionalId: null,
  professionalName: null,
  date: null,
  time: null,
  locationType: null,
  consultation: undefined, // Empieza vacío
  status: 'draft',
};

// 3. Definimos las acciones (Funciones)
interface BookingContextType {
  booking: BookingState;
  setService: (id: string, name: string, price: number) => void;
  setProfessional: (id: string, name: string) => void;
  setTimeSlot: (date: string, time: string) => void;
  setLocation: (type: 'salon' | 'home', address?: string) => void;
  setConsultation: (data: ConsultationData) => void; // <--- NUEVA FUNCIÓN
  resetBooking: () => void;
  confirmBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

// 4. El componente Proveedor
export const BookingProvider = ({ children }: { children: ReactNode }) => {
  
  // A. INICIALIZACIÓN INTELIGENTE (Memoria Persistente)
  const [booking, setBooking] = useState<BookingState>(() => {
    try {
      const saved = localStorage.getItem('bookingState');
      return saved ? JSON.parse(saved) : initialState;
    } catch (error) {
      console.error("Error leyendo localStorage:", error);
      return initialState;
    }
  });

  // B. GUARDADO AUTOMÁTICO
  useEffect(() => {
    localStorage.setItem('bookingState', JSON.stringify(booking));
  }, [booking]);

  // --- FUNCIONES (SETTERS) ---

  const setService = (id: string, name: string, price: number) => {
    setBooking(prev => ({ ...prev, serviceId: id, serviceName: name, price }));
  };

  const setProfessional = (id: string, name: string) => {
    setBooking(prev => ({ ...prev, professionalId: id, professionalName: name }));
  };

  const setTimeSlot = (date: string, time: string) => {
    setBooking(prev => ({ ...prev, date, time }));
  };

  const setLocation = (type: 'salon' | 'home', address?: string) => {
    setBooking(prev => ({ ...prev, locationType: type, address: address || '' }));
  };

  // NUEVA: Guarda los datos de la consulta
  const setConsultation = (data: ConsultationData) => {
    setBooking(prev => ({ ...prev, consultation: data }));
  };

  const resetBooking = () => {
    setBooking(initialState);
    localStorage.removeItem('bookingState');
  };

  const confirmBooking = () => {
    console.log("CONFIRMADO: Guardando reserva completa...", booking);
    setBooking(prev => ({ ...prev, status: 'confirmed' }));
  };

  return (
    <BookingContext.Provider value={{ 
      booking, 
      setService, 
      setProfessional, 
      setTimeSlot, 
      setLocation, 
      setConsultation, // <--- Exportamos la función
      resetBooking,
      confirmBooking 
    }}>
      {children}
    </BookingContext.Provider>
  );
};

// 5. El Hook
export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking debe usarse dentro de un BookingProvider');
  }
  return context;
};