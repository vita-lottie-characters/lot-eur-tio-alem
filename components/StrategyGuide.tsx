import React, { useState } from 'react';
import { Card } from './Card';

export const StrategyGuide: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const content = isOpen ? (
    <div className="mt-4 pt-4 border-t border-slate-700 space-y-4 text-slate-300 animate-fade-in">
      <p>
        Hemos evolucionado de un simple análisis de frecuencia a una estrategia de <strong>balance estadístico</strong>. Un boleto ganador raramente contiene solo los números más repetidos. Por eso, nuestro generador inteligente combina tres factores clave para crear combinaciones con mayor potencial:
      </p>
      
      <ul className="space-y-3 pl-2">
        <li>
          <h4 className="font-semibold text-rose-400">🔥 Números Calientes (Hot)</h4>
          <p className="text-sm text-slate-400 ml-4 border-l-2 border-rose-500/30 pl-3">
            Son números con "inercia". Han aparecido muy recientemente, lo que sugiere una tendencia positiva. Incluirlos busca aprovechar el "momentum" actual.
          </p>
        </li>
        <li>
          <h4 className="font-semibold text-cyan-400">❄️ Números Fríos (Cold)</h4>
          <p className="text-sm text-slate-400 ml-4 border-l-2 border-cyan-500/30 pl-3">
            Son los números "atrasados". Llevan muchos sorteos sin salir. Por la ley de promedios, su probabilidad de aparecer aumenta con cada sorteo que pasa.
          </p>
        </li>
        <li>
          <h4 className="font-semibold text-amber-400">🌸☀️🍂❄️ Números de Temporada</h4>
          <p className="text-sm text-slate-400 ml-4 border-l-2 border-amber-500/30 pl-3">
            Siguen siendo un pilar fundamental. Son los números que, históricamente, han demostrado tener un mejor rendimiento durante la estación del año en curso.
          </p>
        </li>
      </ul>

      <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-600">
         <h4 className="font-semibold text-sky-300">El Boleto Inteligente</h4>
         <p className="text-sm text-slate-400 mt-1">
            El generador no elige números al azar; construye un boleto diversificado mezclando estos tres tipos de números para maximizar la cobertura de patrones estadísticos y aumentar tus posibilidades.
         </p>
      </div>
    </div>
  ) : null;

  return (
    <Card title="💡 ¿Cómo funciona la predicción?">
      <div 
        className="cursor-pointer" 
        onClick={() => setIsOpen(!isOpen)} 
        aria-expanded={isOpen}
        aria-controls="strategy-content"
      >
        <div className="flex justify-between items-center">
          <p className="text-slate-400">
            {isOpen ? 'Ocultar explicación de nuestra estrategia' : 'Mostrar explicación de nuestra estrategia'}
          </p>
          <svg
            className={`w-6 h-6 text-sky-400 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      <div id="strategy-content">
        {content}
      </div>
    </Card>
  );
};
