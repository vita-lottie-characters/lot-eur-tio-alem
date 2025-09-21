import React from 'react';

interface HeaderProps {
  onHelpClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onHelpClick }) => {
  return (
    <header className="bg-slate-900/50 backdrop-blur-sm shadow-lg shadow-sky-900/20 sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Eurojackpot <span className="text-sky-400">Predictor Pro</span>
          </h1>
          <p className="text-slate-400 mt-1">Análisis estadístico para predicciones inteligentes.</p>
        </div>
        <button
          onClick={onHelpClick}
          className="flex items-center gap-2 px-4 py-2 bg-sky-800/50 text-sky-300 rounded-lg hover:bg-sky-700/70 transition-colors text-sm font-medium border border-sky-700"
          aria-label="Mostrar explicación de la aplicación"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 14.464A1 1 0 106.465 13.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 11a1 1 0 100-2H4a1 1 0 100 2h1zM3 7.05a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707A1 1 0 013 7.05z" clipRule="evenodd" />
          </svg>
          Explicación
        </button>
      </div>
    </header>
  );
};
