'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export const login = async () => {
  try {
    await signIn('google');

    return {
      success: true,
    };
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error: error.message,
      };
    }

    throw error;
  }
};
