import type { Progress, User } from '@prisma/client';
import React from 'react';

type AppContextType = {
  user: User | null;
  progress: Progress[] | null;
};

const AppContext = React.createContext<AppContextType>({
  user: null,
  progress: [],
});

export { AppContext };
