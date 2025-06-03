import React, { useMemo } from "react";

const DiscountBadge = () => (
  <div className="absolute top-0 left-0 z-10">
    <svg width="40" height="40" className="sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px]" viewBox="0 0 89 89" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M39.2535 49.5203L42.4557 47.67L38.303 44.1768L39.2535 49.5203Z" fill="#7585AC"/>
      {/* SVG paths shortened for brevity */}
    </svg>
  </div>
);

const ProductCard = ({ product, isFavorite, toggleFavorite, addToCart }) => {
  const showDiscount = useMemo(() => Math.random() < 0.3, [product.id]);

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden relative group">
      <div className="relative">
        {showDiscount && <DiscountBadge />}
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-[200px] sm:h-[240px] md:h-[280px] object-cover"
        />
        <div className="absolute inset-0 flex items-end justify-between p-2 sm:p-3 md:p-4">
          <button 
            onClick={() => addToCart?.(product.id, 1)}
            className="bg-white w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full shadow-md flex items-center justify-center hover:scale-110 transition-transform"
            title="Добавить в корзину"
          >
            <svg width="16" height="16" className="sm:w-[20px] sm:h-[20px] md:w-[24px] md:h-[24px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 12H20M12 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <button
            onClick={() => toggleFavorite?.(product.id)}
            className="bg-white w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full shadow-md flex items-center justify-center hover:scale-110 transition-transform"
            title={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
          >
            {isFavorite ? "❤️" : "🤍"}
          </button>
        </div>
      </div>

      <div className="p-3 sm:p-4 text-center">
        <h3 className="text-base sm:text-lg font-medium mb-1">{product.title}</h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-2 min-h-[32px] sm:min-h-[40px]">{product.description}</p>
        <div className="font-medium text-base sm:text-lg">{product.price}</div>
      </div>
    </div>
  );
};

export default ProductCard;