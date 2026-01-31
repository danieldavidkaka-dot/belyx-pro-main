import React from 'react';

interface GradientButtonProps {
  text: string;
  onClick?: () => void;
  fullWidth?: boolean;
  disabled?: boolean; // <--- Agregamos esta propiedad
}

export const GradientButton = ({ text, onClick, fullWidth = false, disabled = false }: GradientButtonProps) => {
  return (
    <button
      onClick={disabled ? undefined : onClick} // Evita el click si está deshabilitado
      disabled={disabled} // Propiedad nativa HTML
      className={`
        ${fullWidth ? 'w-full' : 'w-auto'} 
        font-bold py-4 px-6 rounded-xl transition-all duration-300
        ${disabled 
            ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none' // Estilo deshabilitado
            : 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-200 hover:shadow-purple-300 hover:scale-[1.02] active:scale-95' // Estilo normal
        }
      `}
    >
      {text}
    </button>
  );
};