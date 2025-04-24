import React, { useState } from "react";

const PopularSection = () => {
  const [offset, setOffset] = useState(0);
  const [favorites, setFavorites] = useState([]);

  const CARD_WIDTH = 276;
  const VISIBLE_COUNT = 3;

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

  const maxOffset = (products.length - VISIBLE_COUNT) * CARD_WIDTH;

  const scrollLeft = () => setOffset((prev) => Math.max(prev - CARD_WIDTH, 0));
  const scrollRight = () => setOffset((prev) => Math.min(prev + CARD_WIDTH, maxOffset));

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  return (
    <section className="bg-[#c6cbd8] py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-condensed tracking-wide mb-8">
          Популярные<br />товары
        </h2>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={scrollLeft}
            className="bg-white bg-opacity-70 p-2 rounded-full shadow hover:scale-105 transition"
          >
            ←
          </button>

          <div className="overflow-hidden w-[812px]">
            <div
              className="flex gap-4 transition-transform duration-300"
              style={{ transform: `translateX(-${offset}px)` }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="relative w-[260px] bg-white rounded-xl overflow-hidden shadow-md flex-shrink-0 text-center"
                >
                  {/* ❤️ Like button */}
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-2 right-2 text-xl"
                  >
                    {favorites.includes(product.id) ? "❤️" : "🤍"}
                  </button>

                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-60 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold">{product.title}</h3>
                    <p className="text-sm text-gray-600">{product.description}</p>
                    <div className="mt-2 font-bold">{product.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollRight}
            className="bg-white bg-opacity-70 p-2 rounded-full shadow hover:scale-105 transition"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularSection;
