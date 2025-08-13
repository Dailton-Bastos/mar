'use server';

import {
  createOrUpdateSettings,
  getSettingsByUserId,
} from '@/services/settings';
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
  } catch {
    return {
      success: false,
      message: 'Failed to update settings',
    };
  }
};

export const getSettingsAction = async (userId: number) => {
  try {
    const settings = await getSettingsByUserId(userId);

    return {
      success: true,
      data: settings,
    };
  } catch {
    return {
      success: false,
      message: 'Failed to get settings',
    };
  }
};
