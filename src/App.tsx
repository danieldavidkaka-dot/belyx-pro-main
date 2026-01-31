import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// IMPORTS CLAVE: Verifica que estas rutas existan
import { AppRoutes } from './AppRoutes'; 
import { BookingProvider } from './context/BookingContext';

function App() {
  return (
    // 1. El Proveedor de Datos (Booking) envuelve todo
    <BookingProvider>
      
      {/* 2. El Router permite la navegación */}
      <BrowserRouter>
        
        {/* 3. Las Rutas definen qué mostrar */}
        <AppRoutes />
        
      </BrowserRouter>
      
    </BookingProvider>
  );
}

export default App;
