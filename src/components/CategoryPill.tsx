import React from 'react';

interface CategoryPillProps {
  icon: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export const CategoryPill = ({ icon, label, isActive, onClick }: CategoryPillProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-3 rounded-2xl transition-all whitespace-nowrap ${
        isActive
          ? 'bg-[#111] text-white shadow-lg shadow-slate-200 scale-105'
          : 'bg-white text-slate-600 border border-slate-100 hover:bg-slate-50'
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span className={`text-sm font-bold ${isActive ? 'text-white' : 'text-slate-600'}`}>
        {label}
      </span>
    </button>
  );
};