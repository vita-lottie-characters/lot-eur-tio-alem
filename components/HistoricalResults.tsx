import React, { useMemo } from 'react';
import { DrawResult } from '../types';
import { Card } from './Card';

interface HistoricalResultsProps {
  draws: DrawResult[];
  mainFrequencies: { number: number; count: number }[];
  euroFrequencies: { number: number; count: number }[];
}

const NumberWithFrequency: React.FC<{ number: number; frequency: number; isEuro: boolean }> = ({ number, frequency, isEuro }) => {
    const ballStyle = isEuro 
        ? "bg-amber-500 text-slate-900" 
        : "bg-sky-600 text-white";

    return (
        <div className="flex flex-col items-center">
            <div className={`relative flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${ballStyle}`}>
                {number}
                <span className="absolute -top-1 -right-2 bg-slate-700 text-white text-[10px] font-semibold px-1 rounded-full border-2 border-slate-800">
                    {frequency}
                </span>
            </div>
        </div>
    );
};

export const HistoricalResults: React.FC<HistoricalResultsProps> = ({ draws, mainFrequencies, euroFrequencies }) => {

    const mainFreqMap = useMemo(() => new Map(mainFrequencies.map(f => [f.number, f.count])), [mainFrequencies]);
    const euroFreqMap = useMemo(() => new Map(euroFrequencies.map(f => [f.number, f.count])), [euroFrequencies]);

    const reversedDraws = useMemo(() => [...draws].reverse(), [draws]);

    return (
        <Card title="Historial de Sorteos (2012 - Presente)">
            <div className="max-h-[600px] overflow-y-auto space-y-4 pr-3 -mr-3">
                {reversedDraws.map((draw, index) => (
                    <div key={index} className="flex flex-col md:flex-row items-center justify-between p-3 bg-slate-800/60 rounded-lg">
                        <div className="font-semibold text-slate-300 mb-3 md:mb-0">
                            {draw.date.toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3">
                                {draw.mainNumbers.map(num => (
                                    <NumberWithFrequency key={num} number={num} frequency={mainFreqMap.get(num) || 0} isEuro={false} />
                                ))}
                            </div>
                            <div className="w-px h-6 bg-slate-600 mx-2"></div>
                            <div className="flex items-center gap-3">
                                {draw.euroNumbers.map(num => (
                                    <NumberWithFrequency key={num} number={num} frequency={euroFreqMap.get(num) || 0} isEuro={true} />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
             <p className="text-center text-sm text-slate-400 mt-4">Mostrando el historial de sorteos. El número pequeño indica las veces que ha aparecido esa bola hasta hoy.</p>
        </Card>
    );
};