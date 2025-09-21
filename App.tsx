import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { fetchHistoricalData, analyzeData, getSeason } from './services/dataService';
import { AnalysisResult, DrawResult } from './types';
import { HelpModal } from './components/HelpModal';

const App: React.FC = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [historicalData, setHistoricalData] = useState<DrawResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);

  const currentSeason = useMemo(() => getSeason(new Date()), []);

  useEffect(() => {
    const processData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Fetch real historical data
        const fetchedData: DrawResult[] = await fetchHistoricalData();
        setHistoricalData(fetchedData);

        const results = analyzeData(fetchedData, currentSeason);
        setAnalysisResult(results);
      } catch (e) {
        console.error("Error processing data:", e);
        setError("No se pudieron cargar los datos históricos. Por favor, inténtelo de nuevo más tarde.");
      } finally {
        setIsLoading(false);
      }
    };

    processData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSeason]);

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200 font-sans">
      <Header onHelpClick={() => setIsHelpModalOpen(true)} />
      <main className="container mx-auto p-4 md:p-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-96">
            <LoadingSpinner />
            <p className="mt-4 text-lg text-sky-400">Cargando y analizando datos históricos...</p>
          </div>
        ) : error ? (
           <div className="flex items-center justify-center h-96 bg-slate-800 rounded-lg">
             <p className="text-xl text-red-400">{error}</p>
           </div>
        ) : analysisResult ? (
          <Dashboard analysis={analysisResult} historicalData={historicalData} />
        ) : null}
      </main>
      <footer className="text-center p-4 text-slate-500 text-sm">
        <p>&copy; 2025 Eurojackpot Predictor Pro. Solo para fines de entretenimiento.</p>
      </footer>

      <HelpModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
    </div>
  );
};

export default App;