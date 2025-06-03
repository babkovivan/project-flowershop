import React from "react";
import ProductCarousel from "./ProductCarousel";

const PopularSection = ({ products, favorites, toggleFavorite, addToCart }) => {
  return (
    <section className="mx-auto max-w-[1200px] px-4 sm:px-6 mb-8 sm:mb-16">
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden">
        {/* Background SVG */}
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 1455 494" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 left-0 w-full h-full -z-10"
          preserveAspectRatio="none"
        >
          <path 
            d="M-23 62.7608L151 43.5601L349.496 8.61628L538.5 55.5271L862.5 0L1084.5 50.2616L1166 0L1455 50.2616V494H-23V62.7608Z" 
            fill="#BFC5D3"
          />
        </svg>

        <div className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">
          <h2 className="text-3xl sm:text-4xl font-light mb-6 sm:mb-8">Популярные товары</h2>
          <ProductCarousel 
            products={products}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            addToCart={addToCart}
          />
        </div>
      </div>
    </section>
  );
};

export default PopularSection;
