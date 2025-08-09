'use server';

import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';

export const login = async () => {
  try {
    await signIn('google', {
      redirect: true,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

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
