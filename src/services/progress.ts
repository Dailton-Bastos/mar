import { db } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';

const addProgress = async (progress: Prisma.ProgressCreateInput) => {
  const newProgress = await db.progress.create({
    data: progress,
  });

  return newProgress;
};

const getUserAllProgress = async (userId: number) => {
  const progress = await db.progress.findMany({
    where: {
      userId,
    },
  });

  return progress;
};

const deleteProgress = async (id: number) => {
  await db.progress.delete({
    where: {
      id,
    },
  });
};

export { addProgress, getUserAllProgress, deleteProgress };
