'use client';

import React from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import { useApp } from '@/hooks/useApp';

const Progress = () => {
  const { progress, settings } = useApp();

  const uniqueDays = [
    ...new Set(
      progress
        ?.filter((progress) => progress.hours > 0 || progress.minutes > 0)
        .map((progress) => progress.date.toISOString().split('T')[0])
    ),
  ];

  const totalDays = uniqueDays?.length || 0;
  const progressHours =
    progress?.reduce((acc, curr) => acc + curr.hours, 0) || 0;
  const progressMinutes =
    progress?.reduce((acc, curr) => acc + curr.minutes, 0) || 0;

  const totalInMinutes = progressHours * 60 + progressMinutes;

  const hours = Math.floor(totalInMinutes / 60);
  const minutes = Math.floor(totalInMinutes % 60);

  const totalMining =
    progress?.reduce((acc, curr) => acc + curr.mining, 0) || 0;

  const completedDaysPercentage =
    settings.days > 0 ? (totalDays / settings.days) * 100 : 0;
  const completedHoursPercentage =
    settings.hours > 0 ? (hours / settings.hours) * 100 : 0;
  const completedMiningPercentage =
    settings.mining > 0 ? (totalMining / settings.mining) * 100 : 0;

  const completedPercentage = Math.round(
    (completedDaysPercentage +
      completedHoursPercentage +
      completedMiningPercentage) /
      3
  );

  const formattedHours = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;

  return (
    <div className="w-full mt-4">
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col items-start justify-center">
          <span className="text-sm text-blue-800 font-semibold">Dias</span>
          <span className="text-sm text-gray-500">
            {totalDays}/{settings.days}
          </span>
        </div>

        <div className="w-px h-4 bg-gray-400" />

        <div className="flex flex-col items-start justify-center">
          <span className="text-sm text-blue-800 font-semibold">Horas</span>
          <span className="text-sm text-gray-500">
            {formattedHours}/{settings.hours}
          </span>
        </div>

        <div className="w-px h-4 bg-gray-400" />

        <div className="flex flex-col items-start justify-center">
          <span className="text-sm text-blue-800 font-semibold">Mineração</span>
          <span className="text-sm text-gray-500">
            {totalMining}/{settings.mining}
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
