
import React from 'react';
import { Prediction, Season } from '../types';

interface DataExportProps {
  predictions: Prediction[];
  season: Season;
}

export const DataExport: React.FC<DataExportProps> = ({ predictions, season }) => {
  const handleExport = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Numero,Probabilidad (%),Estacion\r\n";

    predictions.forEach(p => {
      const row = `${p.number},${p.probability},${season}`;
      csvContent += row + "\r\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    const fileName = `prediccion_eurojackpot_${season.toLowerCase()}_${new Date().toISOString().split('T')[0]}.csv`
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleExport}
      className="flex items-center px-4 py-2 bg-slate-700 text-sky-300 rounded-lg hover:bg-slate-600 transition-colors text-sm font-medium"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
      Exportar CSV
    </button>
  );
};
