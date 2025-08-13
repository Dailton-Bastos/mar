'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { AppContext } from './AppContext';
import { Progress, User } from '@prisma/client';
import { currentUser } from '@/actions/auth';
import { getUserByEmailAction } from '@/actions/user';
import { getUserAllProgressAction } from '@/actions/progress';
import { getSettingsAction } from '@/actions/settings';

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [progress, setProgress] = useState<Progress[]>([]);
  const [isLoadingProgress, setIsLoadingProgress] = useState(false);
  const [settings, setSettings] = useState({
    days: 0,
    hours: 0,
    mining: 0,
  });

  const getUser = useCallback(async () => {
    const session = await currentUser();

    if (!session?.email) {
      setUser(null);
      return;
    }

    const user = await getUserByEmailAction(session?.email);
    setUser(user);
  }, []);

  const getProgress = useCallback(async () => {
    if (!user) {
      setProgress([]);
      return;
    }

    setIsLoadingProgress(true);

    const progress = await getUserAllProgressAction(user?.id);

    if (!progress.success) {
      setProgress([]);
      return;
    }

    setProgress(progress?.data || []);
    setIsLoadingProgress(false);
  }, [user]);

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
    getUser();
  }, [getUser]);

  useEffect(() => {
    getProgress();
  }, [getProgress]);

  useEffect(() => {
    getSettings();
  }, [getSettings]);

  return (
    <AppContext.Provider
      value={{
        user,
        progress,
        isLoadingProgress,
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
