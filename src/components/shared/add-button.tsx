import React from 'react';

type AddButtonProps = {
  onClick: () => void;
};

const AddButton = ({ onClick }: AddButtonProps) => {
  return (
    <div className="flex items-center justify-center w-full mt-4">
      <button
        className="bg-blue-800 text-white text-xl w-12 h-12 rounded-full shadow-lg flex items-center justify-center cursor-pointer font-semibold"
        onClick={onClick}
      >
        +
      </button>
    </div>
  );
};

export default AddButton;
