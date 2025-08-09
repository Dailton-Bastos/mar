'use client';

import React from 'react';
import ProgressBar from '@ramonak/react-progress-bar';

const Progress = () => {
  return (
    <div className="w-full mt-4">
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col items-start justify-center">
          <span className="text-sm text-blue-800 font-semibold">Dias</span>
          <span className="text-sm text-gray-500">0/100</span>
        </div>

        <div className="w-px h-4 bg-gray-400" />

        <div className="flex flex-col items-start justify-center">
          <span className="text-sm text-blue-800 font-semibold">Horas</span>
          <span className="text-sm text-gray-500">0/100</span>
        </div>

        <div className="w-px h-4 bg-gray-400" />

        <div className="flex flex-col items-start justify-center">
          <span className="text-sm text-blue-800 font-semibold">Mineração</span>
          <span className="text-sm text-gray-500">0/1000</span>
        </div>
      </div>

      <div className="w-full mt-4">
        <ProgressBar
          isLabelVisible={false}
          completed={0}
          bgColor="#193cb8"
          baseBgColor="#e0e0de"
          height="8px"
        />

        <span className="text-sm text-gray-500 text-right font-semibold block mt-2">
          0% concluído
        </span>
      </div>
    </div>
  );
};

export default Progress;
