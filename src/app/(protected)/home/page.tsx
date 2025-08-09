import React from 'react';

import Calendar from '@/components/shared/calendar';

const Home = () => {
  return (
    <section className="flex flex-col items-center justify-center h-screen p-4 bg-gray-100">
      <div className="flex flex-col items-center justify-center rounded-lg p-6 border border-gray-200 shadow-md">
        <Calendar />
      </div>
    </section>
  );
};

export default Home;
