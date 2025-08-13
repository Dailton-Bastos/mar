import type { Progress, User } from '@prisma/client';
import React from 'react';

type AppContextType = {
  user: User | null;
  progress: Progress[] | null;
  isLoadingProgress: boolean;
  updateProgress: (progress: Progress) => void;
  deleteProgress: (id: number) => void;
};

const AppContext = React.createContext<AppContextType>({
  user: null,
  progress: [],
  isLoadingProgress: false,
  updateProgress: () => {},
  deleteProgress: () => {},
});

export { AppContext };
