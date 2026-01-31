import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BookingProvider } from './context/BookingContext'; // Cerebro de Datos
import { LanguageProvider } from './context/LanguageContext'; // Cerebro de Idioma

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LanguageProvider>
      <BookingProvider>
        <App />
      </BookingProvider>
    </LanguageProvider>
  </React.StrictMode>,
);