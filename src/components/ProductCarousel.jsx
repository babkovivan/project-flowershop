import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { motion, AnimatePresence } from 'framer-motion';

const ProductCarousel = ({ products, favorites, toggleFavorite, addToCart }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  // Adjust items per page based on screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) { // sm breakpoint
        setItemsPerPage(1);
      } else if (width < 1024) { // lg breakpoint
        setItemsPerPage(2);
      } else if (width < 1280) { // xl breakpoint
        setItemsPerPage(3);
      } else {
        setItemsPerPage(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: { 
      x: 0, 
      opacity: 1 
    },
    exit: (direction) => ({
      x: direction < 0 ? 200 : -200,
      opacity: 0,
    }),
  };

  const [direction, setDirection] = useState(0);

  const paginate = (newIndex) => {
    setDirection(newIndex > currentIndex ? 1 : -1);
    setCurrentIndex(newIndex);
  };

  const goToPrevious = () => {
    if (currentIndex > 0) paginate(currentIndex - itemsPerPage);
  };

  const goToNext = () => {
    if (currentIndex + itemsPerPage < products.length)
      paginate(currentIndex + itemsPerPage);
  };

  return (
    <div className="relative overflow-hidden px-8 sm:px-10 md:px-14 pb-6 sm:pb-8">
      <button
        onClick={goToPrevious}
        disabled={currentIndex <= 0}
        className={`absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full
          ${currentIndex > 0 ? 'bg-white shadow-lg hover:scale-110' : 'bg-gray-100 cursor-not-allowed'}
          transition-all duration-300 flex items-center justify-center text-sm sm:text-base md:text-lg`}
      >
        &lt;
      </button>

      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: 'spring', stiffness: 200, damping: 25, mass: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-4 sm:mb-6"
        >
          {products.slice(currentIndex, currentIndex + itemsPerPage).map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.05 }}
            >
              <ProductCard
                product={product}
                isFavorite={favorites.includes(product.id)}
                toggleFavorite={toggleFavorite}
                addToCart={addToCart}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <button
        onClick={goToNext}
        disabled={currentIndex + itemsPerPage >= products.length}
        className={`absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full
          ${currentIndex + itemsPerPage < products.length ? 'bg-white shadow-lg hover:scale-110' : 'bg-gray-100 cursor-not-allowed'}
          transition-all duration-300 flex items-center justify-center text-sm sm:text-base md:text-lg`}
      >
        &gt;
      </button>

      <div className="flex justify-center gap-1 sm:gap-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index * itemsPerPage)}
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors duration-300
              ${currentIndex === index * itemsPerPage ? 'bg-black scale-125' : 'bg-gray-300 hover:bg-gray-400'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
