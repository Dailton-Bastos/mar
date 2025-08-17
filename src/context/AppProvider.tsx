'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { AppContext } from './AppContext';
import { Progress, User } from '@prisma/client';
import { getSettingsAction } from '@/actions/settings';

const AppProvider = ({
  children,
  currentUser,
  currentProgress,
}: {
  children: React.ReactNode;
  currentUser: User | null;
  currentProgress: Progress[];
}) => {
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
    setUser(currentUser);
  }, [currentUser]);

  useEffect(() => {
    setProgress(currentProgress);
  }, [currentProgress]);

  useEffect(() => {
    getSettings();
  }, [getSettings]);

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
