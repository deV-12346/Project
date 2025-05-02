import React from 'react';
import { Link } from 'react-router-dom';

const Notfound = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 via-gray-900 to-black">
      <div className="absolute inset-0 bg-black opacity-60"></div>
      
      <div className="relative z-10 text-center text-white p-6 sm:p-12">
        <h1 className="text-8xl font-bold leading-tight text-white animate__animated animate__fadeIn animate__delay-1s mb-4">
          404
        </h1>

        <p className="text-3xl font-semibold text-white mb-6 animate__animated animate__fadeIn animate__delay-2s">
          Uh-oh! We couldn’t find that page.
        </p>

        <p className="text-lg mb-8 text-gray-200 animate__animated animate__fadeIn animate__delay-3s">
          The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="animate__animated animate__fadeIn animate__delay-4s mb-6">
          <svg className="mx-auto w-20 h-20 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h7v2h-7zM4 16h7v2H4zM12 10h7v2h-7zM4 10h7v2H4zM13 4h7v2h-7zM4 4h7v2H4z"/>
          </svg>
        </div>
        <div className="animate__animated animate__fadeIn animate__delay-5s">
          <Link 
            to="/" 
            className="inline-block px-8 py-4 text-lg font-semibold bg-blue-600 text-white rounded-lg shadow-lg transform transition-all hover:bg-blue-700 hover:scale-105 hover:shadow-2xl"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Notfound;