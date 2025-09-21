
import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-md rounded-xl shadow-lg shadow-sky-900/10 border border-slate-700">
      <div className="p-4 border-b border-slate-700">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <div className="p-4 md:p-6">
        {children}
      </div>
    </div>
  );
};
