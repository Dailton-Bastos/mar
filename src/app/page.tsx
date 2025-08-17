import React from 'react';
import Image from 'next/image';
import { Login } from '@/components/auth/login';

const Home = () => {
  return (
    <section className="flex flex-col items-center justify-center h-screen p-4">
      <div className="flex flex-col items-center justify-center rounded-lg p-6 border border-gray-200 w-full max-w-96">
        <div className="flex items-center justify-center mb-4">
          <Image src="/logo.png" width={80} height={80} alt="Mar" />
        </div>
        <h1 className="text-2xl font-medium mb-4">Olá, entre na sua conta</h1>

        <Login />
      </div>
    </section>
  );
};

export default Home;
