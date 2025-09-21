import React from 'react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Feature: React.FC<{ title: string; icon: string; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-lg bg-sky-800 text-sky-300 text-xl">
            {icon}
        </div>
        <div>
            <h4 className="font-semibold text-sky-300">{title}</h4>
            <p className="text-sm text-slate-400">{children}</p>
        </div>
    </div>
);


export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-modal-overlay"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="help-modal-title"
    >
      <div 
        className="bg-slate-800/80 border border-slate-700 rounded-xl shadow-2xl w-full max-w-2xl m-4 animate-modal-content"
        onClick={e => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <div className="p-6 border-b border-slate-700 flex justify-between items-center">
          <h2 id="help-modal-title" className="text-2xl font-bold text-white">💡 Guía de la Aplicación</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white" aria-label="Cerrar modal">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
            <div className="text-center bg-slate-900/50 p-4 rounded-lg">
                 <h3 className="text-xl font-semibold text-sky-400">Objetivo Principal</h3>
                 <p className="text-slate-300 mt-1">
                    Esta herramienta analiza más de una década de resultados históricos para ofrecerte una ventaja estratégica. En lugar de elegir números al azar, usamos patrones y estadísticas para construir boletos inteligentes.
                 </p>
            </div>

            <Feature title="Generador de Boletos Inteligente" icon="🎯">
                La función principal. Con un solo clic, crea un boleto completo (5+2) basado en un algoritmo que balancea números calientes, fríos y estacionales para maximizar tus probabilidades.
            </Feature>

            <Feature title="Análisis de Calientes y Fríos" icon="🔥❄️">
                Muestra qué números están en racha (calientes) y cuáles llevan mucho tiempo sin salir (fríos). Esta información es clave para entender las tendencias actuales y es utilizada por el generador.
            </Feature>
            
            <Feature title="Patrones Estacionales" icon="🌸☀️">
                Descubre qué números han sido históricamente más afortunados durante la primavera, verano, otoño o invierno. Un factor crucial para predicciones a largo plazo.
            </Feature>

            <Feature title="Frecuencia y Historial" icon="📊">
                Explora los datos brutos. Visualiza la frecuencia de cada número a lo largo de la historia y revisa los resultados de sorteos pasados para tus propios análisis.
            </Feature>
             
            <div className="text-xs text-center text-slate-500 pt-4">
                 Basado en datos históricos reales de Eurojackpot desde 2012.
            </div>
        </div>

        <div className="p-4 bg-slate-900/30 rounded-b-xl text-right">
            <button
                onClick={onClose}
                className="px-5 py-2 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-500 transition-colors"
            >
                Entendido
            </button>
        </div>
      </div>
    </div>
  );
};