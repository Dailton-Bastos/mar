import { db } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';

const getUserByEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: { email },
  });

  return user;
};

const createUser = async (user: Prisma.UserCreateInput) => {
  const newUser = await db.user.create({
    data: user,
  });

  return newUser;
};

export { getUserByEmail, createUser };
