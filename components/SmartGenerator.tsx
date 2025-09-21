
import React, { useState, useCallback } from 'react';
import { AnalysisResult, GeneratedTicket } from '../types';
import { generateSmartTicket } from '../services/dataService';
import { Card } from './Card';

interface SmartGeneratorProps {
  analysis: AnalysisResult;
}

const TicketBall: React.FC<{ number: number; isEuro: boolean }> = ({ number, isEuro }) => {
  const style = isEuro
    ? "bg-gradient-to-br from-amber-400 to-yellow-500 text-slate-900 border-2 border-amber-300"
    : "bg-gradient-to-br from-sky-500 to-cyan-600 text-white border-2 border-sky-400";
  
  return (
    <div className={`flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full font-bold text-2xl md:text-3xl shadow-lg ${style}`}>
      {number}
    </div>
  );
};

export const SmartGenerator: React.FC<SmartGeneratorProps> = ({ analysis }) => {
  const [ticket, setTicket] = useState<GeneratedTicket>(() => generateSmartTicket(analysis));

  const handleGenerate = useCallback(() => {
    setTicket(generateSmartTicket(analysis));
  }, [analysis]);

  return (
    <Card title="Generador de Boletos Inteligente">
        <div className="flex flex-col items-center space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-sky-300 mb-4 text-center">Números Principales</h3>
                <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                    {ticket.mainNumbers.map(num => <TicketBall key={num} number={num} isEuro={false} />)}
                </div>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-amber-400 mb-4 text-center">Euronúmeros</h3>
                <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                    {ticket.euroNumbers.map(num => <TicketBall key={num} number={num} isEuro={true} />)}
                </div>
            </div>
            <button
                onClick={handleGenerate}
                className="mt-4 px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-900/50"
                aria-label="Generar nuevo boleto de lotería inteligente"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 20h5v-5M20 4h-5v5" />
                </svg>
                Generar Nuevo Boleto
            </button>
        </div>
        <p className="text-center text-sm text-slate-400 mt-6">
            Esta combinación se genera usando un algoritmo que mezcla números frecuentes de la temporada, números 'calientes' (recientes) y números 'fríos' (atrasados) para crear un boleto balanceado.
        </p>
    </Card>
  );
};
