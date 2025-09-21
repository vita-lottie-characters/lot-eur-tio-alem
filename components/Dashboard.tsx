import React from 'react';
import { AnalysisResult, DrawResult } from '../types';
import { Predictions } from './Predictions';
import { FrequencyChart } from './FrequencyChart';
import { SeasonalAnalysis } from './SeasonalAnalysis';
import { DataExport } from './DataExport';
import { HistoricalResults } from './HistoricalResults';
import { SmartGenerator } from './SmartGenerator';
import { HotColdAnalysis } from './HotColdAnalysis';
import { StrategyGuide } from './StrategyGuide';

interface DashboardProps {
  analysis: AnalysisResult;
  historicalData: DrawResult[];
}

export const Dashboard: React.FC<DashboardProps> = ({ analysis, historicalData }) => {
  return (
    <div className="space-y-8">
      
      <div className="bg-slate-800/50 backdrop-blur-md rounded-xl shadow-lg border border-slate-700 p-4 md:p-6 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-semibold text-sky-300">Predicciones para {analysis.currentSeason}</h2>
            <p className="text-slate-400">Análisis basado en datos históricos.</p>
        </div>
        <DataExport predictions={analysis.top5Predicted} season={analysis.currentSeason}/>
      </div>
      
      <Predictions top5={analysis.top5Predicted} />

      <SmartGenerator analysis={analysis} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <HotColdAnalysis data={analysis.hotCold} />
        <SeasonalAnalysis seasonalData={analysis.seasonalFrequencies} />
      </div>

      <FrequencyChart 
          mainData={analysis.overallMainFrequencies}
          euroData={analysis.overallEuroFrequencies}
      />

      <StrategyGuide />
      
      <div>
        <HistoricalResults 
            draws={historicalData}
            mainFrequencies={analysis.overallMainFrequencies}
            euroFrequencies={analysis.overallEuroFrequencies}
        />
      </div>
    </div>
  );
};