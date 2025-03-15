import React from 'react';

const LoadingSpinner = () => {
  return (
      <div className="flex justify-center items-center h-screen">
      <div className="w-12 h-12 border-6 border-t-6 border-gray-400 border-solid rounded-full animate-spin border-t-indigo-700"></div>
    </div>
  );
};

export default LoadingSpinner;