'use client';

import React from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import { useApp } from '@/hooks/useApp';

const MAX_DAYS = 100;
const MAX_HOURS = 100;
const MAX_MINING = 1000;

const Progress = () => {
  const { progress } = useApp();

  const uniqueDays = [
    ...new Set(
      progress?.map((progress) => progress.date.toISOString().split('T')[0])
    ),
  ];

  const totalDays = uniqueDays?.length || 0;
  const totalHours = progress?.reduce((acc, curr) => acc + curr.hours, 0) || 0;
  const totalMining =
    progress?.reduce((acc, curr) => acc + curr.mining, 0) || 0;

  const completedDaysPercentage = (totalDays / MAX_DAYS) * 100;
  const completedHoursPercentage = (totalHours / MAX_HOURS) * 100;
  const completedMiningPercentage = (totalMining / MAX_MINING) * 100;

  const completedPercentage = Math.round(
    (completedDaysPercentage +
      completedHoursPercentage +
      completedMiningPercentage) /
      3
  );

  return (
    <div className="w-full mt-4">
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col items-start justify-center">
          <span className="text-sm text-blue-800 font-semibold">Dias</span>
          <span className="text-sm text-gray-500">
            {totalDays}/{MAX_DAYS}
          </span>
        </div>

        <div className="w-px h-4 bg-gray-400" />

        <div className="flex flex-col items-start justify-center">
          <span className="text-sm text-blue-800 font-semibold">Horas</span>
          <span className="text-sm text-gray-500">
            {totalHours}/{MAX_HOURS}
          </span>
        </div>

        <div className="w-px h-4 bg-gray-400" />

        <div className="flex flex-col items-start justify-center">
          <span className="text-sm text-blue-800 font-semibold">Mineração</span>
          <span className="text-sm text-gray-500">
            {totalMining}/{MAX_MINING}
          </span>
        </div>
      </div>

      <div className="w-full mt-4">
        <ProgressBar
          isLabelVisible={false}
          completed={completedPercentage}
          bgColor="#193cb8"
          baseBgColor="#e0e0de"
          height="8px"
        />

        <span className="text-sm text-gray-500 text-right font-semibold block mt-2">
          {completedPercentage}% concluído
        </span>
      </div>
    </div>
  );
};

export default Progress;
