import NextAuth from 'next-auth';

import Google from 'next-auth/providers/google';
import { createUser, getUserByEmail } from './services/user';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
    async signIn({ user }) {
      if (!user?.email) return false;

      const existingUser = await getUserByEmail(user.email);

      if (!existingUser) {
        await createUser({
          email: user.email,
          name: user.name,
        });
      }

      return true;
    },
  },
});
