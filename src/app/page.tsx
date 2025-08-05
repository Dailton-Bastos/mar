import React from 'react';
import { GoogleButton } from '@/components/shared/google-button';

const Home = () => {
  return (
    <section className="flex flex-col items-center justify-center h-screen p-4">
      <div className="flex flex-col items-center justify-center rounded-lg p-6 border border-gray-200 w-full max-w-96 h-48">
        <h1 className="text-2xl font-medium">Olá, entre na sua conta</h1>

        <div className="w-full mt-4 flex flex-col items-center justify-center">
          <GoogleButton />
        </div>
      </div>
    </section>
  );
};

export default Home;
