import React from 'react';

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  onEdit?: () => void;
  children?: React.ReactNode; // Para insertar el mapa u extras
}

export const InfoRow = ({ icon, label, value, onEdit, children }: InfoRowProps) => {
  return (
    <div className="flex gap-4 py-4 border-b border-slate-50 last:border-0">
      {/* Icono */}
      <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-purple-600 shrink-0">
        {icon}
      </div>

      {/* Contenido */}
      <div className="flex-1">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
        <p className="text-sm font-bold text-slate-900 mb-2">{value}</p>
        {children}
      </div>

      {/* Botón Editar */}
      {onEdit && (
          <button 
            onClick={onEdit} 
            className="text-xs font-bold text-purple-600 hover:text-purple-800 h-fit"
          >
            Edit
          </button>
      )}
    </div>
  );
};