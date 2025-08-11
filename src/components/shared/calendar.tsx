'use client';

import React from 'react';
import { DayPicker } from 'react-day-picker';
import { ptBR } from 'react-day-picker/locale';

import 'react-day-picker/style.css';

type CalendarProps = {
  onSelect: (date: Date) => void;
  selectedDate: Date;
};

const Calendar = ({ onSelect, selectedDate }: CalendarProps) => {
  return (
    <DayPicker
      animate
      required
      mode="single"
      endMonth={new Date()}
      disabled={{ after: new Date() }}
      locale={ptBR}
      selected={selectedDate}
      onSelect={onSelect}
    />
  );
};

export default Calendar;
