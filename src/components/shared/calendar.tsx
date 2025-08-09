'use client';

import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { ptBR } from 'react-day-picker/locale';

import 'react-day-picker/style.css';

const Calendar = () => {
  const [selected, setSelected] = useState<Date>(new Date());

  return (
    <DayPicker
      animate
      required
      mode="single"
      endMonth={new Date()}
      disabled={{ after: new Date() }}
      locale={ptBR}
      selected={selected}
      onSelect={setSelected}
      footer={
        selected
          ? `Selected: ${selected.toLocaleDateString('pt-BR')}`
          : 'Pick a day.'
      }
    />
  );
};

export default Calendar;
