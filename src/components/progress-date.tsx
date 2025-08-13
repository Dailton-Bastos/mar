import type { Progress } from '@prisma/client';
import React, { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import IconTrash from './shared/icon-trash';
import { deleteProgressAction } from '@/actions/progress';
import { useApp } from '@/hooks/useApp';

type ProgressDateProps = {
  open: boolean;
  onClose: () => void;
  progressList: Progress[];
  selectedDate: Date;
};

const ProgressDateModal = ({
  open,
  onClose,
  progressList = [],
  selectedDate,
}: ProgressDateProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { deleteProgress } = useApp();

  const handleDeleteProgress = async (id: number) => {
    setIsLoading(true);
    const response = await deleteProgressAction(id);
    setIsLoading(false);

    if (response.success) {
      setErrorMessage('');

      deleteProgress(id);
    } else {
      setErrorMessage('Erro ao deletar registro');
    }
  };

  const totalMining = progressList.reduce(
    (acc, progress) => acc + progress.mining,
    0
  );

  const progressHours = progressList.reduce((acc, curr) => acc + curr.hours, 0);
  const progressMinutes = progressList.reduce(
    (acc, curr) => acc + curr.minutes,
    0
  );

  const totalInMinutes = progressHours * 60 + progressMinutes;

  const hours = Math.floor(totalInMinutes / 60);
  const minutes = Math.floor(totalInMinutes % 60);

  const formattedHours = `${hours.toString().padStart(2, '0')}h ${minutes
    .toString()
    .padStart(2, '0')}m`;

  const formattedMining = totalMining.toString().padStart(2, '0');

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
      <div className="w-full flex items-center justify-center pt-4">
        <span className="text-sm text-gray-500 font-semibold">
          {selectedDate.toLocaleDateString('pt-BR')}
        </span>
      </div>

      <table className="w-full border border-gray-200 rounded-md p-2 mt-4">
        <thead className="border-b border-gray-200">
          <tr className="h-[40px]">
            <th className="text-sm text-gray-500 font-semibold text-center w-[100px]">
              Horas
            </th>
            <th className="text-sm text-gray-500 font-semibold text-center w-[100px]">
              Minutos
            </th>
            <th className="text-sm text-gray-500 font-semibold text-center w-[100px]">
              Mineração
            </th>
            <th className="w-[100px]"></th>
          </tr>
        </thead>
        <tbody className="border-b border-gray-200">
          {progressList.map((progress) => (
            <tr key={progress.id} className="border-b border-gray-200 h-[40px]">
              <td className="text-sm text-gray-500 font-semibold text-center">
                {progress.hours}
              </td>
              <td className="text-sm text-gray-500 font-semibold text-center">
                {progress.minutes}
              </td>
              <td className="text-sm text-gray-500 font-semibold text-center">
                {progress.mining}
              </td>
              <td className="text-sm text-gray-500 font-semibold text-center">
                <button
                  type="button"
                  className="text-sm text-red-500 font-semibold"
                  disabled={isLoading}
                  onClick={() => handleDeleteProgress(progress.id)}
                >
                  <IconTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="w-full flex items-center justify-between mt-4">
        <span className="text-sm text-gray-500">Horas: {formattedHours}</span>
        <span className="text-sm text-gray-500">
          Mineração: {formattedMining}
        </span>
      </div>

      {errorMessage && (
        <div className="w-full flex items-center justify-center mt-4">
          <span className="text-sm text-red-500 font-semibold">
            {errorMessage}
          </span>
        </div>
      )}
    </Modal>
  );
};

export default ProgressDateModal;
