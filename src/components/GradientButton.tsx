import React from 'react';

interface GradientButtonProps {
  text: string;
  onClick?: () => void;
  fullWidth?: boolean; // <--- Esta es la clave para que funcione
}

export const GradientButton = ({ text, onClick, fullWidth = false }: GradientButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        ${fullWidth ? 'w-full' : 'w-auto'} 
        bg-gradient-to-r from-purple-600 to-cyan-500 
        text-white font-bold py-4 px-6 rounded-xl 
        shadow-lg shadow-purple-200 
        hover:shadow-purple-300 hover:scale-[1.02] active:scale-95 
        transition-all duration-300
      `}
    >
      {text}
    </button>
  );
};