import React from 'react';

const AddButton = () => {
  return (
    <div className="flex items-center justify-center w-full mt-4">
      <button className="bg-blue-800 text-white text-xl w-12 h-12 rounded-full shadow-lg flex items-center justify-center cursor-pointer font-semibold">
        +
      </button>
    </div>
  );
};

export default AddButton;
