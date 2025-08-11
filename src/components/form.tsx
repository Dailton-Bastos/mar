'use client';

import React, { useState, useTransition } from 'react';
import { Modal } from 'react-responsive-modal';
import { removeLeftZero } from '@/utils';
import { useApp } from '@/hooks/useApp';
import { addProgressAction } from '@/actions/progress';
import { IconLoading } from './shared/icon-loading';

type Progress = {
  hours: string;
  minutes: string;
  mining: string;
};

type FormProps = {
  open: boolean;
  onClose: () => void;
  selectedDate: Date;
  handleSelectDate: (date: Date) => void;
};

const Form = ({ open, onClose, selectedDate, handleSelectDate }: FormProps) => {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState('');
  const [progress, setProgress] = useState<Progress>({
    hours: '00',
    minutes: '00',
    mining: '0',
  });

  const { user } = useApp();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgress({
      ...progress,
      [e.target.name]: removeLeftZero(Number(e.target.value)),
    });
  };

  const isInvalid = Object.values(progress).every(
    (value) => Number(value) === 0
  );

  const disabledSubmit = isInvalid || isPending;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      hours: Number(progress.hours),
      minutes: Number(progress.minutes),
      mining: Number(progress.mining),
    };

    const isInvalid =
      data.hours > 23 || data.minutes > 59 || data.mining > 1_000_000_000;

    if (isInvalid) {
      setErrorMessage('Preencha todos os campos corretamente');
      return;
    }

    if (!user) {
      setErrorMessage('Usuário não encontrado');
      return;
    }

    if (!selectedDate) {
      setErrorMessage('Data não selecionada');
      return;
    }

    setErrorMessage('');

    startTransition(async () => {
      const response = await addProgressAction({
        ...data,
        date: selectedDate,
        user: {
          connect: {
            id: user.id,
          },
        },
      });

      if (!response.success) {
        setErrorMessage('Ocorreu um erro, tente novamente!');
        return;
      }

      setProgress({
        hours: '00',
        minutes: '00',
        mining: '0',
      });

      setErrorMessage('');
      handleSelectDate(new Date());
      onClose();
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      center
      styles={{
        modal: {
          borderRadius: '10px',
          width: '100%',
          maxWidth: '360px',
          margin: '0 auto',
        },
      }}
    >
      <form className="w-full" onSubmit={handleSubmit}>
        {selectedDate && (
          <span className="text-sm text-gray-500 font-semibold">
            {selectedDate.toLocaleDateString('pt-BR')}
          </span>
        )}

        <div className="w-full border border-gray-200 rounded-md p-2 mt-4">
          <span className="text-sm text-gray-500 font-bold text-center block">
            Adicione o tempo de duração
          </span>

          <div className="w-full mt-2 flex items-center justify-between">
            <div className="flex flex-col w-1/2">
              <input
                type="number"
                id="hours"
                name="hours"
                pattern="[0-9]*"
                min={0}
                max={23}
                value={progress.hours.toString()}
                onChange={handleChange}
                className="w-full h-10 border border-gray-200 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="hours"
                className="text-xs text-gray-500 font-semibold text-center mt-1"
              >
                Hora(s)
              </label>
            </div>

            <span className="text-lg text-gray-500 font-semibold mx-2 relative -top-2.5">
              :
            </span>

            <div className="flex flex-col w-1/2">
              <input
                type="number"
                id="minutes"
                name="minutes"
                pattern="[0-9]*"
                min={0}
                max={59}
                value={progress.minutes.toString()}
                onChange={handleChange}
                className="w-full h-10 border border-gray-200 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="minutes"
                className="text-xs text-gray-500 font-semibold text-center mt-1"
              >
                Minuto(s)
              </label>
            </div>
          </div>
        </div>

        <div className="w-full border border-gray-200 rounded-md p-2 mt-8">
          <label
            htmlFor="mining"
            className="text-sm text-gray-500 font-bold text-center block"
          >
            Mineração do dia
          </label>

          <div className="w-full mt-2 flex items-center justify-center gap-2">
            <div className="flex flex-col w-full">
              <input
                type="number"
                id="mining"
                name="mining"
                pattern="[0-9]*"
                min={0}
                max={1_000_000_000}
                value={progress.mining.toString()}
                onChange={handleChange}
                className="w-full h-10 border border-gray-200 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 gap-2">
          <button
            type="button"
            className="w-full bg-gray-200 rounded-md p-2 text-gray-500 font-semibold cursor-pointer"
            disabled={isPending}
            onClick={onClose}
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={disabledSubmit}
            className="w-full bg-blue-800 text-white rounded-md p-2 font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? <IconLoading /> : 'Adicionar'}
          </button>
        </div>

        {errorMessage && (
          <span className="text-red-500 text-sm font-semibold mt-2 text-center block">
            {errorMessage}
          </span>
        )}
      </form>
    </Modal>
  );
};

export default Form;
