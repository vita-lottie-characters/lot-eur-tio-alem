
import React from 'react';
import { Prediction } from '../types';
import { Card } from './Card';

interface PredictionsProps {
  top5: Prediction[];
}

const LotteryBall: React.FC<{ number: number; probability: number }> = ({ number, probability }) => {
  const style = "relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full font-bold text-xl md:text-2xl shadow-lg transition-transform duration-300 hover:scale-110 bg-gradient-to-br from-amber-400 to-yellow-500 text-slate-900 border-2 border-amber-300 shadow-amber-400/50";
  
  return (
    <div className="group flex flex-col items-center">
      <div className={style}>
        {number}
      </div>
       <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2 text-xs bg-slate-700 px-2 py-1 rounded">
        {probability}%
      </div>
    </div>
  );
};


export const Predictions: React.FC<PredictionsProps> = ({ top5 }) => {
  return (
    <Card title="Top 5 Números Más Frecuentes de la Temporada">
      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {top5.map(p => (
              <LotteryBall key={p.number} number={p.number} probability={p.probability}/>
          ))}
      </div>
      <p className="text-center text-sm text-slate-400 mt-4">Estos son los 5 números principales que más han aparecido históricamente en la temporada actual.</p>
    </Card>
  );
};
