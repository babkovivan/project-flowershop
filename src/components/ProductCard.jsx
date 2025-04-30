import React from "react";

const ProductCard = ({ product, isFavorite, toggleFavorite, isCatalog }) => {
  return (
    <div
      className={`relative ${
        isCatalog ? "w-[190px]" : "w-[260px]"
      } bg-white rounded-xl overflow-hidden shadow-md flex-shrink-0 text-center mx-auto`}
    >
      {/* Кнопка "Избранное" */}
      <button
        onClick={() => toggleFavorite(product.id)}
        className="absolute top-2 right-2 text-xl"
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>

      {/* Изображение товара */}
      <img
        src={product.image}
        alt={product.title}
        className={`w-full ${isCatalog ? "h-56" : "h-60"} object-cover`}
      />

      {/* Описание товара */}
      <div className="p-4">
        <h3 className="font-semibold">{product.title}</h3>
        <p className="text-sm text-gray-600">{product.description}</p>
        <div className="mt-2 font-bold">{product.price}</div>
      </div>
    </div>
  );
};

export default ProductCard;
