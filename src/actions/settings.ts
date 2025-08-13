'use server';

import { createOrUpdateSettings } from '@/services/settings';
import { getUserById } from '@/services/user';
import { Prisma } from '@prisma/client';

export const updateSettings = async (
  userId: number,
  settings: Prisma.SettingsCreateInput
) => {
  try {
    const existingUser = await getUserById(userId);

    if (!existingUser) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    const updatedSettings = await createOrUpdateSettings(userId, settings);

    return {
      success: true,
      message: 'Settings updated successfully',
      data: updatedSettings,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Failed to update settings',
    };
  }
};
