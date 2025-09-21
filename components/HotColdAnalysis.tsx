
import React from 'react';
import { HotColdAnalysisData } from '../types';
import { Card } from './Card';

const NumberChip: React.FC<{ number: number; drawsSince: number; isHot: boolean }> = ({ number, drawsSince, isHot }) => {
  const bgColor = isHot ? 'bg-rose-500/20 border-rose-500' : 'bg-cyan-500/20 border-cyan-500';
  const textColor = isHot ? 'text-rose-300' : 'text-cyan-300';
  const label = 'Hace';
  const unit = drawsSince === 1 ? 'sorteo' : 'sorteos';

  return (
    <div className={`flex items-center p-2 rounded-lg border ${bgColor}`}>
        <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-white ${isHot ? 'bg-rose-600' : 'bg-cyan-600'}`}>
            {number}
        </div>
        <div className="ml-3 text-sm">
            <p className={textColor}>{label} {drawsSince} {unit}</p>
        </div>
    </div>
  );
}

const AnalysisSection: React.FC<{ title: string; numbers: {number: number, drawsSince: number}[]; isHot: boolean }> = ({ title, numbers, isHot }) => (
    <div>
        <h4 className={`font-semibold mb-3 ${isHot ? 'text-rose-400' : 'text-cyan-400'}`}>{title}</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            {numbers.slice(0, 6).map(n => <NumberChip key={n.number} {...n} isHot={isHot} />)}
        </div>
    </div>
);


export const HotColdAnalysis: React.FC<{ data: HotColdAnalysisData }> = ({ data }) => {
  return (
    <Card title="Análisis de Números Calientes y Fríos">
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-bold text-slate-300 mb-4 border-b border-slate-700 pb-2">Números Principales</h3>
                <div className="space-y-4">
                   <AnalysisSection title="🔥 Calientes (Más Recientes)" numbers={data.hotMain} isHot={true} />
                   <AnalysisSection title="❄️ Fríos (Más Atrasados)" numbers={data.coldMain} isHot={false} />
                </div>
            </div>
             <div>
                <h3 className="text-lg font-bold text-slate-300 mb-4 border-b border-slate-700 pb-2">Euronúmeros</h3>
                <div className="space-y-4">
                   <AnalysisSection title="🔥 Calientes (Más Recientes)" numbers={data.hotEuro} isHot={true} />
                   <AnalysisSection title="❄️ Fríos (Más Atrasados)" numbers={data.coldEuro} isHot={false} />
                </div>
            </div>
        </div>
        <p className="text-center text-sm text-slate-400 mt-4">Los números calientes han aparecido recientemente, mientras que los fríos llevan más tiempo sin salir.</p>
    </Card>
  );
};
