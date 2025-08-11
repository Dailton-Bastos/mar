'use client';

import React, { useState } from 'react';

import Calendar from '@/components/shared/calendar';
import Progress from '@/components/progress';
import AddButton from '@/components/shared/add-button';
import Form from '@/components/form';

export const Main = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [modalOpen, setModalOpen] = useState(false);

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
      <Progress />
      <AddButton onClick={handleOpenModal} />
      <Form
        open={modalOpen}
        onClose={handleCloseModal}
        selectedDate={selectedDate}
      />
    </main>
  );
};
