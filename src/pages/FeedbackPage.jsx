import React, { useState } from 'react';

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь будет логика отправки отзыва
    console.log('Отзыв:', feedback);
    setFeedback('');
  };

  return (
    <div className="relative min-h-[calc(100vh-200px)]">
      {/* Фоновые горы */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute bottom-0 w-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          fill="#E8E9ED"
        >
          <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12 relative z-10">
        <h1 className="text-3xl md:text-4xl font-light mb-8 md:mb-12 text-center md:text-left">
          Обратная связь
        </h1>
        
        <div className="bg-white rounded-3xl p-4 md:p-8 shadow-sm max-w-2xl mx-auto relative overflow-hidden">
          {/* Декоративные элементы */}
          <div className="absolute -top-4 -right-4 text-4xl opacity-10 hidden md:block">✿</div>
          <div className="absolute -bottom-4 -left-4 text-4xl opacity-10 hidden md:block">✿</div>
          
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <button
              type="button"
              className="bg-[#E8E9ED] w-full py-3 rounded-xl text-left px-4 md:px-6 hover:bg-[#DFE0E4] transition-colors text-sm md:text-base"
            >
              Написать отзыв
            </button>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Напишите ваш отзыв здесь..."
              className="w-full h-32 md:h-40 p-4 rounded-xl bg-[#F5F5F8] resize-none focus:outline-none text-sm md:text-base"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#E8E9ED] px-6 md:px-8 py-2 rounded-lg hover:bg-[#DFE0E4] transition-colors text-sm md:text-base"
              >
                Отправить
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage; 