import React from 'react';
import Lottie from 'lottie-react'
import animationData from "../assets/Animation.json";
const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center  bg-transparent">
    <Lottie animationData={animationData} loop={true} />
    </div>

  );
};

export default LoadingSpinner;