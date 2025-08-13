'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { AppContext } from './AppContext';
import { Progress, User } from '@prisma/client';
import { currentUser } from '@/actions/auth';
import { getUserByEmailAction } from '@/actions/user';
import { getUserAllProgressAction } from '@/actions/progress';

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [progress, setProgress] = useState<Progress[]>([]);
  const [isLoadingProgress, setIsLoadingProgress] = useState(false);

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

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    getProgress();
  }, [getProgress]);

  return (
    <AppContext.Provider
      value={{
        user,
        progress,
        isLoadingProgress,
        updateProgress,
        deleteProgress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider };
