'use server';

import {
  addProgress,
  deleteProgress,
  getUserAllProgress,
} from '@/services/progress';
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

const getUserAllProgressAction = async (userId: number) => {
  try {
    const progress = await getUserAllProgress(userId);
    return {
      success: true,
      message: 'Progress fetched successfully',
      data: progress,
    };
  } catch {
    return {
      success: false,
      message: 'Failed to fetch progress',
    };
  }
};

const deleteProgressAction = async (id: number) => {
  try {
    await deleteProgress(id);
    return {
      success: true,
      message: 'Progress deleted successfully',
    };
  } catch {
    return {
      success: false,
      message: 'Failed to delete progress',
    };
  }
};

export { addProgressAction, getUserAllProgressAction, deleteProgressAction };
