import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Moon, Globe, FileText, Info, ChevronRight, ToggleRight, ToggleLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext'; // <--- Importante

export default function ClientSettings() {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage(); // Usamos el hook de idioma
  const [darkMode, setDarkMode] = useState(false);

  // Función para alternar entre Español e Inglés
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24 font-sans text-slate-900 relative">
      
      {/* HEADER */}
      <div className="bg-white p-4 sticky top-0 z-20 flex items-center justify-between shadow-sm">
         <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-900 hover:bg-slate-100 rounded-full transition">
             <ChevronLeft size={24} />
         </button>
         {/* Título traducido */}
         <h1 className="font-bold text-lg">{t('settings_title')}</h1>
         <div className="w-8" /> 
      </div>

      <div className="p-6 space-y-6">
        
        {/* PREFERENCES */}
        <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase mb-3 ml-1">Preferences</h3>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                
                {/* Dark Mode Toggle (Visual por ahora) */}
                <div className="flex items-center justify-between p-4 border-b border-slate-50">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                            <Moon size={16} />
                        </div>
                        <span className="font-bold text-sm text-slate-700">{t('settings_dark_mode')}</span>
                    </div>
                    <button onClick={() => setDarkMode(!darkMode)} className="text-purple-600 transition-transform active:scale-90">
                        {darkMode ? <ToggleRight size={32} /> : <ToggleLeft size={32} className="text-slate-300" />}
                    </button>
                </div>

                {/* Language Toggle (Funcional) */}
                <button 
                    onClick={toggleLanguage}
                    className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center">
                            <Globe size={16} />
                        </div>
                        <span className="font-bold text-sm text-slate-700">{t('settings_language')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                        {language === 'en' ? 'English (US)' : 'Español (ES)'} 
                        <ChevronRight size={16} />
                    </div>
                </button>
            </div>
        </div>

        {/* LEGAL & ABOUT (Estáticos por ahora) */}
        <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase mb-3 ml-1">About</h3>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <button className="w-full flex items-center justify-between p-4 border-b border-slate-50 hover:bg-slate-50 transition">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                            <FileText size={16} />
                        </div>
                        <span className="font-bold text-sm text-slate-700">Terms of Service</span>
                    </div>
                    <ChevronRight size={16} className="text-slate-300" />
                </button>
                <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                            <Info size={16} />
                        </div>
                        <span className="font-bold text-sm text-slate-700">App Version</span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">v1.3.0</span>
                </button>
            </div>
        </div>

        {/* DELETE ACCOUNT */}
        <button className="w-full py-4 text-slate-400 font-bold text-xs hover:text-red-500 transition">
            Delete Account
        </button>

      </div>
    </div>
  );
}