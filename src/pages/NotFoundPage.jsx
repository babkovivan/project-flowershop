import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#F5F5F8] flex flex-col">
      <div className="flex-grow flex flex-col items-center justify-center px-4 relative">
        {/* Фоновые горы */}
        <div className="absolute inset-0 overflow-hidden">
          <svg
            className="absolute bottom-0 w-full"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            fill="#E8E9ED"
          >
            <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>

        <div className="text-center z-10 mb-8">
          <h1 className="text-4xl font-light mb-4">OOPS! Кажется, что-то пошло не так :(</h1>
          <p className="text-xl mb-8">попробуйте еще раз!</p>
          <Link 
            to="/" 
            className="inline-block bg-white px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            вернуться в магазин
          </Link>
        </div>

        <div className="flex items-center justify-center gap-8 z-10 mb-16">
          <span className="text-8xl font-light">4</span>
          <img src="/images/404.jpg" alt="404" className="w-24 h-24 object-contain" />
          <span className="text-8xl font-light">4</span>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage; 