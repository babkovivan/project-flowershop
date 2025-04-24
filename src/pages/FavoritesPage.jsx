import React from "react";
import ProductCard from "../components/ProductCard";

const FavoritesPage = ({ favorites, toggleFavorite }) => {
  const products = [
    {
      id: 1,
      title: "Сердце весны",
      description: "Воплощение свежести и радости весенних дней",
      price: "3000₽",
      image: "/images/popular1.jpg",
    },
    {
      id: 2,
      title: "Нежность облаков",
      description: "Воздушный букет – словно кусочек неба в подарок",
      price: "3500₽",
      image: "/images/popular2.jpg",
    },
    {
      id: 3,
      title: "Мелодия счастья",
      description: "Яркий и жизнерадостный аккорд для любого повода",
      price: "2500₽",
      image: "/images/popular3.jpg",
    },
    {
      id: 4,
      title: "Сказка любви",
      description: "Элегантный букет для выражения чувств",
      price: "2000₽",
      image: "/images/popular4.jpg",
    },
  ];

  const favoriteProducts = products.filter((product) =>
    favorites.includes(product.id)
  );

  return (
    <section className="bg-[#c6cbd8] py-12 px-4 min-h-[70vh]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-condensed tracking-wide mb-8">Избранное</h2>
        {favoriteProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {favoriteProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={favorites.includes(product.id)}
                toggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          <p>Вы ещё ничего не добавили в избранное.</p>
        )}
      </div>
    </section>
  );
};

export default FavoritesPage;
