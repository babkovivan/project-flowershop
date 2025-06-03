import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CatalogSection from '../components/CatalogSection';

const CatalogueExotic = ({ products, favorites, toggleFavorite, addToCart }) => {
  const navigate = useNavigate();

  const exoticProducts = products.filter(product => 
    ["Амазонка", "Сафари", "Манго-мохито", 
     "Огненная страсть", "Пряный восток", "Тропический коктейль"].includes(product.title)
  );
  return (
    <div className="relative mx-auto max-w-6xl px-6 mb-16">
      <section className="pt-16">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-light">Экзотические</h1>
          <CatalogSection />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {exoticProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isCatalog
                isFavorite={favorites.includes(product.id)}
                toggleFavorite={toggleFavorite}
                addToCart={addToCart}
              />
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <button 
              onClick={() => navigate('/')}
              className="group relative px-8 py-3 rounded-xl bg-white border-2 border-[#BFC5D3] hover:border-[#A5ABC3] transition-all duration-300 overflow-hidden"
            >
              <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 19L8 12L15 5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 19L8 12L15 5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              
              <span className="absolute top-1 left-2 text-[#BFC5D3] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                ✿
              </span>
              <span className="absolute bottom-1 right-2 text-[#BFC5D3] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                ✿
              </span>
              <span className="relative inline-flex items-center gap-2 font-light text-[#1a1a1a] group-hover:scale-105 transition-transform duration-300">
                вернуться на главную страницу
              </span>
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#BFC5D3]/0 via-[#BFC5D3]/10 to-[#BFC5D3]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default CatalogueExotic; 