
import React from 'react';
import { SeasonalFrequency, Season } from '../types';
import { Card } from './Card';

interface SeasonalAnalysisProps {
  seasonalData: SeasonalFrequency;
}

const SeasonCard: React.FC<{ season: Season; data: { main: { [key: number]: number }, euro: { [key: number]: number } } }> = ({ season, data }) => {
  const top5Main = Object.entries(data.main)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([num]) => parseInt(num));

  const top2Euro = Object.entries(data.euro)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 2)
    .map(([num]) => parseInt(num));

  const getIcon = (seasonName: Season) => {
      switch(seasonName) {
          case Season.Spring: return '🌸';
          case Season.Summer: return '☀️';
          case Season.Autumn: return '🍂';
          case Season.Winter: return '❄️';
      }
  }

  return (
    <div className="bg-slate-800/50 p-4 rounded-lg">
        <h4 className="font-semibold text-lg mb-3 text-sky-300">{getIcon(season)} {season}</h4>
        <div>
            <p className="text-sm text-slate-400 mb-1">Principales:</p>
            <div className="flex flex-wrap gap-2">
                {top5Main.map(num => (
                    <div key={num} className="flex items-center justify-center w-8 h-8 bg-sky-600 rounded-full text-sm font-bold">{num}</div>
                ))}
            </div>
        </div>
        <div className="mt-3">
            <p className="text-sm text-slate-400 mb-1">Euronúmeros:</p>
            <div className="flex flex-wrap gap-2">
                {top2Euro.map(num => (
                    <div key={num} className="flex items-center justify-center w-8 h-8 bg-amber-500 rounded-full text-sm font-bold text-slate-900">{num}</div>
                ))}
            </div>
        </div>
    </div>
  )
}

export const SeasonalAnalysis: React.FC<SeasonalAnalysisProps> = ({ seasonalData }) => {
  return (
    <Card title="Patrones por Estación del Año">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SeasonCard season={Season.Spring} data={seasonalData[Season.Spring]} />
        <SeasonCard season={Season.Summer} data={seasonalData[Season.Summer]} />
        <SeasonCard season={Season.Autumn} data={seasonalData[Season.Autumn]} />
        <SeasonCard season={Season.Winter} data={seasonalData[Season.Winter]} />
      </div>
      <p className="text-center text-sm text-slate-400 mt-4">Top 5 números principales y top 2 euronúmeros más frecuentes en cada estación.</p>
    </Card>
  );
};
