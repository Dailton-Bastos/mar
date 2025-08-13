import { db } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const createOrUpdateSettings = async (
  userId: number,
  settings: Prisma.SettingsCreateInput
) => {
  const existingSettings = await db.settings.findFirst({
    where: { userId },
  });

  if (existingSettings) {
    return db.settings.update({
      where: { id: existingSettings.id },
      data: settings,
    });
  }

  return db.settings.create({
    data: {
      ...settings,
      user: {
        connect: { id: userId },
      },
    },
  });
};

export const getSettingsByUserId = async (userId: number) => {
  const settings = await db.settings.findFirst({
    where: { userId },
  });

  return settings;
};
