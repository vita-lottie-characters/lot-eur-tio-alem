
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card } from './Card';

interface ChartData {
  number: number;
  count: number;
}

interface FrequencyChartProps {
  mainData: ChartData[];
  euroData: ChartData[];
}

type ChartType = 'main' | 'euro';

export const FrequencyChart: React.FC<FrequencyChartProps> = ({ mainData, euroData }) => {
  const [chartType, setChartType] = useState<ChartType>('main');
  
  const data = chartType === 'main' ? mainData : euroData;
  const title = chartType === 'main' ? 'Números Principales (1-50)' : 'Euronúmeros (1-12)';

  const getPath = (x: number, y: number, width: number, height: number) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + 2 * width / 3},${y + height} ${x + width}, ${y + height}
    Z`;
  };

  const TriangleBar: React.FC<any> = (props: any) => {
    const { fill, x, y, width, height } = props;
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  return (
    <Card title="Frecuencia Histórica General">
        <div className="flex justify-center space-x-2 mb-4">
            <button 
                onClick={() => setChartType('main')} 
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${chartType === 'main' ? 'bg-sky-600 text-white' : 'bg-slate-700 hover:bg-slate-600'}`}>
                Principales
            </button>
            <button 
                onClick={() => setChartType('euro')} 
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${chartType === 'euro' ? 'bg-sky-600 text-white' : 'bg-slate-700 hover:bg-slate-600'}`}>
                Euronúmeros
            </button>
        </div>
      <div className="h-80 w-full">
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="number" tick={{ fill: '#94a3b8' }} />
            <YAxis tick={{ fill: '#94a3b8' }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#e2e8f0' }}
              labelStyle={{ color: '#94a3b8' }}
              formatter={(value) => [`${value} veces`, 'Frecuencia']}
            />
            <Bar dataKey="count" fill="#22d3ee" shape={<TriangleBar/>}>
               {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#22d3ee' : '#67e8f9'}/>
                ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-center text-sm text-slate-400 mt-2">Frecuencia de aparición de {title}</p>
    </Card>
  );
};
