import React from 'react';
import { GoogleIcon } from './google-icone';
import { IconLoading } from './icon-loading';

interface GoogleButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

export const GoogleButton = ({ onClick, isLoading }: GoogleButtonProps) => {
  return (
    <button
      className="flex items-center justify-center w-full cursor-pointer bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? <IconLoading /> : <GoogleIcon />}

      <span>Entrar com Google</span>
    </button>
  );
};
