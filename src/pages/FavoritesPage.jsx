import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from "../components/ProductCard";

const FavoritesPage = ({ favorites, toggleFavorite, products, addToCart }) => {
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});

  const favoriteProducts = products.filter(product => favorites.includes(product.id));

  const handleQuantityChange = (productId, change) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + change)
    }));
  };

  const getQuantity = (productId) => quantities[productId] || 1;

  return (
    <div className="mx-auto max-w-6xl px-6 mb-16">
      <h1 className="text-4xl font-light mb-8">Избранное</h1>
      
      {favoriteProducts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600 mb-6">В избранном пока пусто</p>
          <button
            onClick={() => navigate('/')}
            className="bg-white border border-[#E8E9ED] px-8 py-3 rounded-lg hover:bg-[#E8E9ED] transition-colors"
          >
            Вернуться к покупкам
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {favoriteProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-3xl overflow-hidden shadow-md">
              <div className="flex items-center gap-8 p-6">
                <div className="w-48 h-48 flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>

                <div className="flex-grow">
                  <h3 className="text-2xl font-light mb-2">{product.title}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="text-xl mb-4">{product.price}</div>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4 bg-[#F8F8F8] rounded-lg px-4 py-2">
                      <button
                        onClick={() => handleQuantityChange(product.id, -1)}
                        className="text-gray-500 hover:text-black transition-colors w-6 h-6 flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{getQuantity(product.id)}</span>
                      <button
                        onClick={() => handleQuantityChange(product.id, 1)}
                        className="text-gray-500 hover:text-black transition-colors w-6 h-6 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => addToCart(product.id, getQuantity(product.id))}
                      className="bg-white border-2 border-[#BFC5D3] hover:border-[#A5ABC3] px-6 py-2 rounded-xl transition-all duration-300"
                    >
                      Добавить в корзину
                    </button>

                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="text-gray-500 hover:text-red-500 transition-colors"
                    >
                      ❤️
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
