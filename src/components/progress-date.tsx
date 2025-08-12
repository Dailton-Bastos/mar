import type { Progress } from '@prisma/client';
import React from 'react';
import { Modal } from 'react-responsive-modal';
import IconTrash from './shared/icon-trash';

type ProgressDateProps = {
  open: boolean;
  onClose: () => void;
  progressList: Progress[];
};

const ProgressDateModal = ({
  open,
  onClose,
  progressList = [],
}: ProgressDateProps) => {
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
      <div className="w-full flex items-center justify-center">
        <span className="text-sm text-gray-500 font-semibold">
          {progressList[0].date.toLocaleDateString('pt-BR')}
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
    </Modal>
  );
};

export default ProgressDateModal;
