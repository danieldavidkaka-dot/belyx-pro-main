// src/components/StaffInput.tsx
import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface StaffInputProps {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  isPassword?: boolean;
  onTogglePassword?: () => void;
  showPassword?: boolean;
}

export const StaffInput = ({ 
  label, 
  placeholder, 
  type = "text", 
  value, 
  onChange, 
  icon, 
  isPassword, 
  onTogglePassword, 
  showPassword 
}: StaffInputProps) => {
  return (
    <div className="mb-5">
      <label className="block text-sm font-bold text-slate-900 mb-2">{label}</label>
      <div className="relative">
        <input
          type={isPassword && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-purple-500 focus:border-purple-500 block p-4 pr-12 outline-none transition-all placeholder:text-slate-400"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-purple-500">
          {isPassword ? (
            <button 
              type="button" 
              onClick={onTogglePassword} 
              className="pointer-events-auto hover:text-purple-700 focus:outline-none"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          ) : (
            icon
          )}
        </div>
      </div>
    </div>
  );
};