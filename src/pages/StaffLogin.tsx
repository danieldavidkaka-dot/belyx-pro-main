// src/pages/StaffLogin.tsx
import React, { useState } from 'react';
import { ArrowLeft, Briefcase, ScanFace } from 'lucide-react';
import { GradientButton } from '../components/GradientButton';
// Importamos el componente que acabamos de crear:
import { StaffInput } from '../components/StaffInput'; 

interface StaffLoginProps {
  onBack: () => void;
  onLoginSuccess: () => void;
}

export default function StaffLogin({ onBack, onLoginSuccess }: StaffLoginProps) {
  // Estado (Lógica)
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    console.log("Login attempt:", { employeeId, password });
    onLoginSuccess();
  };

  return (
    <div className="bg-white min-h-screen flex flex-col font-sans max-w-md mx-auto relative shadow-2xl overflow-hidden">
      
      {/* Header Navigation */}
      <div className="px-6 py-6 flex items-center justify-between bg-white z-10">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition-colors">
          <ArrowLeft className="text-slate-900" size={24} />
        </button>
        <h2 className="text-sm font-bold tracking-widest text-slate-900 uppercase">Staff Portal</h2>
        <div className="w-8" />
      </div>

      <div className="px-8 pb-8 flex-1 flex flex-col">
        {/* Banner Imagen */}
        <div className="w-full h-32 rounded-3xl overflow-hidden mb-8 relative shadow-lg">
          <img 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop" 
            alt="Abstract Wave" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-400/20 mix-blend-overlay"></div>
        </div>

        {/* Título */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-1">Welcome Back</h1>
          <p className="text-purple-600 font-medium text-sm tracking-wide">BELYX Enterprise Systems</p>
        </div>

        {/* Formulario (¡Mira qué limpio se ve ahora!) */}
        <div className="flex-1">
          <StaffInput 
            label="Employee ID"
            placeholder="Enter your ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            icon={<Briefcase size={20} />} 
          />

          <StaffInput 
            label="Password"
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isPassword={true}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />

          <div className="flex justify-end mb-8">
            <button className="text-purple-600 text-sm font-bold hover:text-purple-800 transition-colors">
              Forgot Password?
            </button>
          </div>

          <div className="mb-8">
            <GradientButton text="Secure Login →" onClick={handleLogin} fullWidth={true} />
          </div>

          <div className="text-center">
            <p className="text-slate-400 text-xs mb-4">Or sign in with</p>
            <button className="w-16 h-16 rounded-full border border-slate-200 flex items-center justify-center mx-auto hover:border-purple-400 hover:bg-purple-50 transition-all shadow-sm">
              <ScanFace size={28} className="text-slate-600" />
            </button>
          </div>
        </div>

        <div className="mt-auto pt-6 text-center">
          <p className="text-[10px] text-slate-400 font-medium">v2.0.1 • Belyx Enterprise Systems</p>
        </div>

      </div>
    </div>
  );
}