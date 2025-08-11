'use server';

import { addProgress } from '@/services/progress';
import type { Prisma } from '@prisma/client';

const addProgressAction = async (progress: Prisma.ProgressCreateInput) => {
  try {
    const newProgress = await addProgress(progress);
    return {
      success: true,
      message: 'Progress added successfully',
      data: newProgress,
    };
  } catch {
    return {
      success: false,
      message: 'Failed to add progress',
    };
  }
};

export { addProgressAction };
