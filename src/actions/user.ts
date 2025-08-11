'use server';

import { getUserByEmail } from '@/services/user';

export const getUserByEmailAction = async (email: string) => {
  const user = await getUserByEmail(email);

  return user;
};
