'use client';

import React, { useState } from 'react';

import { useApp } from '@/hooks/useApp';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { IconLoading } from './shared/icon-loading';
import { updateSettings } from '@/actions/settings';

const Settings = () => {
  const [settings, setSettings] = useState({
    days: 0,
    hours: 0,
    mining: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user, handleSetSettings } = useApp();

  const handleChangeDays = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, days: Number(e.target.value) });
  };

  const handleChangeHours = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, hours: Number(e.target.value) });
  };

  const handleChangeMining = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, mining: Number(e.target.value) });
  };

  const handleSaveSettings = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      return;
    }

    setIsLoading(true);
    const response = await updateSettings(user.id, {
      ...settings,
      user: {
        connect: { id: user.id },
      },
    });

    if (!response.success) {
      setError('Erro ao salvar configurações');
    } else {
      handleSetSettings({
        days: settings.days,
        hours: settings.hours,
        mining: settings.mining,
      });
      setError(null);
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full h-full flex items-center justify-center flex-col max-w-96 mx-auto">
      <div className="w-full flex items-center justify-start py-4">
        <Link
          href="/home"
          className="text-sm text-blue-800 font-semibold cursor-pointer underline"
        >
          Voltar
        </Link>
      </div>

      <main className="flex flex-col items-center justify-center rounded-lg p-6 border border-gray-200 shadow-md w-full">
        <h1 className="text-xl font-medium">Meu perfil</h1>

        <div className="w-full flex items-center justify-center mt-4 gap-4">
          <span className="text-sm text-gray-500 font-semibold">
            {user?.email}
          </span>

          <button
            type="button"
            className="text-sm text-blue-800 font-semibold cursor-pointer underline"
            onClick={() => signOut()}
          >
            Sair
          </button>
        </div>

        <div className="w-full flex flex-col items-center justify-center mt-4">
          <form
            className="w-full flex flex-col items-center justify-center border border-gray-200 rounded-lg p-4 mt-2"
            onSubmit={handleSaveSettings}
          >
            <div className="w-full mb-4">
              <label
                htmlFor="days"
                className="text-sm text-gray-500 text-left block mb-2"
              >
                Quantidade de dias
              </label>
              <input
                type="number"
                id="days"
                value={settings.days}
                onChange={handleChangeDays}
                className="w-full border border-gray-200 rounded-lg p-2"
              />
            </div>

            <div className="w-full mb-4">
              <label
                htmlFor="hours"
                className="text-sm text-gray-500 text-left block mb-2"
              >
                Quantidade de horas
              </label>
              <input
                type="number"
                id="hours"
                value={settings.hours}
                onChange={handleChangeHours}
                className="w-full border border-gray-200 rounded-lg p-2"
              />
            </div>

            <div className="w-full mb-4">
              <label
                htmlFor="mining"
                className="text-sm text-gray-500 text-left block mb-2"
              >
                Quantidade de mineração
              </label>
              <input
                type="number"
                id="mining"
                value={settings.mining}
                onChange={handleChangeMining}
                className="w-full border border-gray-200 rounded-lg p-2"
              />
            </div>

            <button
              type="submit"
              className="text-sm bg-blue-800 text-white rounded-lg p-2 font-semibold cursor-pointer w-full"
              disabled={isLoading}
            >
              {isLoading ? <IconLoading /> : 'Salvar'}
            </button>
          </form>

          {error && (
            <p className="text-sm text-red-500 font-semibold mt-2">{error}</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Settings;
