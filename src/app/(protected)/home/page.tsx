import { signOut } from '@/auth';
import React from 'react';

// import Calendar from '@/components/shared/calendar';
// import Progress from '@/components/progress';
// import AddButton from '@/components/shared/add-button';
// import Form from '@/components/form';

const Home = () => {
  return (
    <section className="flex flex-col items-center justify-center h-screen p-4 bg-gray-100">
      <div className="flex flex-col items-center justify-center rounded-lg p-6 border border-gray-200 shadow-md">
        {/* <Calendar />
        <Progress />
        <AddButton />
        <Form /> */}

        <form
          action={async () => {
            'use server';

            await signOut();
          }}
        >
          <button type="submit">Sign out</button>
        </form>
      </div>
    </section>
  );
};

export default Home;
