'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import Calendar from '@/components/shared/calendar';
import Progress from '@/components/progress';
import AddButton from '@/components/shared/add-button';
import Form from '@/components/form';
import { useApp } from '@/hooks/useApp';
import ProgressDateModal from './progress-date';
import IconSettings from './shared/icon-settings';

export const Main = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [progressDateModalOpen, setProgressDateModalOpen] = useState(false);
  const { progress: progressList } = useApp();

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
    <div className="w-full h-full flex items-center justify-center flex-col">
      <div className="w-full flex items-center justify-end p-4 max-w-96 mx-auto">
        <Link href="/settings">
          <IconSettings />
        </Link>
      </div>

      <main className="flex flex-col items-center justify-center rounded-lg p-6 border border-gray-200 shadow-md">
        <Calendar onSelect={handleSelectDate} selectedDate={selectedDate} />

        <Progress />

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
