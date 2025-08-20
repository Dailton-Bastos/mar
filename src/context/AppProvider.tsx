'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { AppContext } from './AppContext';
import { Progress, User } from '@prisma/client';
import { getSettingsAction } from '@/actions/settings';
import { convertUTCDateToLocalDate, formatDateYYYYMMDD } from '@/utils';

const AppProvider = ({
  children,
  currentUser,
  currentProgress,
}: {
  children: React.ReactNode;
  currentUser: User | null;
  currentProgress: Progress[];
}) => {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [progress, setProgress] = useState<Progress[]>([]);
  const [settings, setSettings] = useState({
    days: 0,
    hours: 0,
    mining: 0,
  });

  const updateProgress = useCallback((newProgress: Progress) => {
    setProgress((prev) => [...prev, newProgress]);
  }, []);

  const deleteProgress = useCallback((id: number) => {
    setProgress((prev) => prev.filter((progress) => progress.id !== id));
  }, []);

  const handleSetSettings = useCallback(
    (newSettings: { days: number; hours: number; mining: number }) => {
      setSettings(newSettings);
    },
    []
  );

  const getSettings = useCallback(async () => {
    if (!user) {
      setSettings({ days: 0, hours: 0, mining: 0 });
      return;
    }

    const settings = await getSettingsAction(user.id);

    if (!settings.success) {
      setSettings({ days: 0, hours: 0, mining: 0 });
      return;
    }

    setSettings({
      days: settings.data?.days || 0,
      hours: settings.data?.hours || 0,
      mining: settings.data?.mining || 0,
    });
  }, [user]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  useEffect(() => {
    const localProgress = currentProgress.map((progress) => ({
      ...progress,
      date: convertUTCDateToLocalDate(progress.date),
    }));

    setProgress(localProgress);
  }, [currentProgress]);

  useEffect(() => {
    getSettings();
  }, [getSettings]);

  useEffect(() => {
    if (!mounted || !progress) return;

    const style = document.createElement('style');

    style.id = 'react-day-picker-style';

    const uniqueDays = [
      ...new Set(
        progress
          ?.filter((progress) => progress.hours > 0 || progress.minutes > 0)
          .map((progress) => formatDateYYYYMMDD(new Date(progress.date)))
      ),
    ];

    style.innerHTML = `
      ${uniqueDays
        .map(
          (day) => `
        [data-day="${day}"]:not(.rdp-selected) .rdp-day_button {
          background-color: #193cb8 !important;
          color: #fff !important;
        }
      `
        )
        .join('')}
    `;

    document.head.appendChild(style);

    return () => {
      const style = document.getElementById('react-day-picker-style');

      if (style) {
        document.head.removeChild(style);
      }
    };
  }, [mounted, progress]);

  if (!mounted) return null;

  return (
    <AppContext.Provider
      value={{
        user,
        progress,
        updateProgress,
        deleteProgress,
        settings,
        handleSetSettings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider };
