'use client';

import React, { useState } from 'react';

import Calendar from '@/components/shared/calendar';
import Progress from '@/components/progress';
import AddButton from '@/components/shared/add-button';
import Form from '@/components/form';
import { useApp } from '@/hooks/useApp';
import { IconLoading } from './shared/icon-loading';

export const Main = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const { isLoadingProgress } = useApp();

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
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
      <Form
        open={modalOpen}
        onClose={handleCloseModal}
        selectedDate={selectedDate}
        handleSelectDate={handleSelectDate}
      />
    </main>
  );
};
