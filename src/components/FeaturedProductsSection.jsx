import React from "react";
import ProductCard from "./ProductCard";

const FeaturedProductsSection = ({ products }) => {
  return (
    <section 
      className="mx-auto max-w-4xl bg-[#7A7A7A] pr-9 pl-9 pt-5 pb-3 mt-9 rounded-lg shadow-md"
      aria-label="Featured Products"
    >
    <div className="flex justify-between items-center mb-6">
      {/* Две карточки товаров */}
      <div className="flex gap-5">
        {products.slice(0, 2).map((product) => (
          <ProductCard key={product.id} product={product} isCatalog />
        ))}
      </div>

      {/* Кнопка "Вернуться на главную страницу" */}
      <button
        className="bg-white bg-opacity-70 px-8 py-2 rounded text-gray-700"
        onClick={() => window.location.href = "/"} // Вернуться на главную страницу
      >
        вернуться на главную страницу
      </button>
    </div>
    </section>
  );
};

export default FeaturedProductsSection;