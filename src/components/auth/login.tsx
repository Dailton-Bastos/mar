'use client';

import { useState, useTransition } from 'react';
import { GoogleButton } from '../shared/google-button';
import { login } from '@/actions/login';

export const Login = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    startTransition(async () => {
      const result = await login();

      if (result.error) {
        setError(result.error);
      }
    });
  };

  return (
    <div className="w-full mt-4 flex flex-col items-center justify-center">
      <GoogleButton onClick={handleSignIn} isLoading={isPending} />

      {error && (
        <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
      )}
    </div>
  );
};
