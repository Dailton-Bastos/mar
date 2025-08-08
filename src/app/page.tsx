import React from 'react';
import { Login } from '@/components/auth/login';

const Home = async () => {
  return (
    <section className="flex flex-col items-center justify-center h-screen p-4">
      <div className="flex flex-col items-center justify-center rounded-lg p-6 border border-gray-200 w-full max-w-96 h-48">
        <h1 className="text-2xl font-medium">Olá, entre na sua conta</h1>

        <Login />
      </div>
    </section>
  );
};

export default Home;
