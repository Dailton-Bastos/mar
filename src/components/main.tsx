'use client';

import React, { useState } from 'react';

import Calendar from '@/components/shared/calendar';
import Progress from '@/components/progress';
import AddButton from '@/components/shared/add-button';
import Form from '@/components/form';
import { useApp } from '@/hooks/useApp';
import { IconLoading } from './shared/icon-loading';
import ProgressDateModal from './progress-date';

export const Main = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [progressDateModalOpen, setProgressDateModalOpen] = useState(false);
  const { isLoadingProgress, progress: progressList } = useApp();

  const progressByDate =
    progressList?.filter(
      (progress) => progress.date.toDateString() === selectedDate.toDateString()
    ) || [];

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOpenProgressDateModal = () => {
    setProgressDateModalOpen(true);
  };

  const handleCloseProgressDateModal = () => {
    setProgressDateModalOpen(false);
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <main className="flex flex-col items-center justify-center rounded-lg p-6 border border-gray-200 shadow-md">
        <Calendar onSelect={handleSelectDate} selectedDate={selectedDate} />
        {isLoadingProgress ? (
          <div className="flex items-center justify-center">
            <IconLoading />
          </div>
        ) : (
          <Progress />
        )}
        <AddButton onClick={handleOpenModal} />

        <div className="w-full flex items-center justify-center mt-4">
          <button
            type="button"
            className="text-xs text-blue-800 font-semibold cursor-pointer underline"
            onClick={handleOpenProgressDateModal}
          >
            {selectedDate.toLocaleDateString('pt-BR')}
          </button>
        </div>

        <Form
          open={modalOpen}
          onClose={handleCloseModal}
          selectedDate={selectedDate}
          handleSelectDate={handleSelectDate}
        />

        <ProgressDateModal
          open={progressDateModalOpen}
          onClose={handleCloseProgressDateModal}
          progressList={progressByDate}
          selectedDate={selectedDate}
        />
      </main>
    </div>
  );
};
