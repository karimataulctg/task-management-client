import React from 'react';
import banner from '../assets/Banner.jpg';

const Home = () => {
  return (
    <div className="relative w-full h-screen">
      {/* Full-viewport background image with blur */}
      <img 
        src={banner} 
        alt="Banner" 
        className="absolute top-0 left-0 w-full h-full object-cover filter blur-sm" 
      />
      
      {/* Centered overlay for text and button */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl font-bold text-white">
          Welcome to Task Management App
        </h1>
        <p className="mt-4 text-lg text-gray-400">
          Manage your tasks, collaborate with others, and stay organized.
        </p>
        <h1 className="bg-blue-700 rounded-2xl mt-8 p-4">Login and Get Started...</h1>
      </div>
    </div>
  );
};

export default Home;
