import type { Progress, User } from '@prisma/client';
import React from 'react';

type AppContextType = {
  user: User | null;
  progress: Progress[] | null;
  isLoadingProgress: boolean;
  updateProgress: (progress: Progress) => void;
  deleteProgress: (id: number) => void;
  settings: {
    days: number;
    hours: number;
    mining: number;
  };
  handleSetSettings: (settings: {
    days: number;
    hours: number;
    mining: number;
  }) => void;
};

const AppContext = React.createContext<AppContextType>({
  user: null,
  progress: [],
  isLoadingProgress: false,
  updateProgress: () => {},
  deleteProgress: () => {},
  settings: {
    days: 0,
    hours: 0,
    mining: 0,
  },
  handleSetSettings: () => {},
});

export { AppContext };
