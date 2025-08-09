import { signOut } from '@/auth';
import React from 'react';

const Home = () => {
  return (
    <div>
      <form
        action={async () => {
          'use server';

          await signOut();
        }}
      >
        <button type="submit">Logout</button>
      </form>
    </div>
  );
};

export default Home;
