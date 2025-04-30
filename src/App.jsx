import React, { useState } from 'react';
import PopularSection from "./components/PopularSection";
import ProductCard from "./components/ProductCard";
import FeaturedProductsSection from "./components/FeaturedProductsSection";
import FavoritesPage from "./pages/FavoritesPage"; // Импортируем страницу "Избранное"

function App() {
  // Состояние для отслеживания видимости секций
  const [isCatalogVisible, setIsCatalogVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Состояние для отслеживания текущей страницы
  const [currentPage, setCurrentPage] = useState("home"); // "home" или "favorites"

  // Функция для обработки нажатия на кнопку каталога
  const handleButtonClick = (category) => {
    setIsCatalogVisible(true); // Скрываем первую секцию
    setSelectedCategory(category); // Устанавливаем выбранную категорию
  };

  // Массив продуктов из PopularSection
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
      description: "Воздушный букет – словно кусочек неба",
      price: "3500₽",
      image: "/images/popular2.jpg",
    },
    {
      id: 3,
      title: "Мелодия счастья",
      description: "Яркий аккорд для любого повода",
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

  // Пример массива избранных товаров (для демонстрации)
  const [favorites, setFavorites] = useState([]);

  // Функция для добавления/удаления товара из избранного
  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter((id) => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  return (
    
    <div className="min-h-screen bg-[#c6cbd8]-100">
      {/* Header */}
      <header className="bg-[#e5e5e5] py-6 font-condensed mx-auto max-w-5xl my-2 rounded-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-normal leading-tight tracking-wide text-center">
            Цветочная<br />лавка
          </div>
          <nav className="flex gap-4">
            <button className="bg-[#c6cbd8] px-4 py-1 rounded">Профиль</button>
            <button
              className="bg-[#c6cbd8] px-4 py-1 rounded"
              onClick={() => setCurrentPage("favorites")} // Переход на страницу "Избранное"
            >
              Избранное
            </button>
            <button className="bg-[#c6cbd8] px-4 py-1 rounded">Корзина</button>
          </nav>
        </div>
      </header>

      {/* Основной контент */}
      {currentPage === "home" && (
        <>
          {/* Первая секция */}
          {!isCatalogVisible && (
            <>
              <section className="mx-auto max-w-4xl rounded-lg overflow-hidden shadow-lg relative">
                <img src="/images/hero.jpg" alt="Цветы" className="w-full" />

                <div className="absolute inset-0 bg-black bg-opacity-20 flex flex-col justify-center items-start px-8 text-white">
                  <h1 className="text-4xl font-light mb-2">Цветы</h1>
                  <p className="text-lg">которые делают вас счастливыми</p>
                  <button className="mt-4 bg-white bg-opacity-70 text-gray-700 px-4 py-2 rounded">
                    обратная связь
                  </button>
                </div>
              </section>
              <PopularSection />
            </>
          )}

          {/* Секция Каталог */}
          <section className="mx-auto max-w-4xl bg-[#e5e5e5] p-8 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[32px]">
                Каталог
              </h2>
              <div className="flex gap-4">
                <button
                  className="bg-[#c6cbd8] px-4 py-1 rounded"
                  onClick={() => handleButtonClick("новинки")}
                >
                  новинки
                </button>
                <button
                  className="bg-[#c6cbd8] px-4 py-1 rounded"
                  onClick={() => handleButtonClick("весенние хиты")}
                >
                  весенние хиты
                </button>
                <button
                  className="bg-[#c6cbd8] px-4 py-1 rounded"
                  onClick={() => handleButtonClick("свадебные")}
                >
                  свадебные
                </button>
                <button
                  className="bg-[#c6cbd8] px-4 py-1 rounded"
                  onClick={() => handleButtonClick("экзотические")}
                >
                  экзотические
                </button>
              </div>
            </div>

            {/* Условный рендеринг блока с изображением каталога */}
            {!isCatalogVisible && (
              <div className="relative bg-[#c6cbd8] rounded-lg overflow-hidden">
                <img
                  src="/images/catalog.png"
                  alt="Каталог цветов"
                  className="w-full object-cover h-56"
                />
                <button className="absolute bottom-4 right-4 border border-white text-white px-4 py-1 rounded">
                  Подробнее
                </button>
              </div>
            )}

            {/* Отображение карточек товаров */}
            {isCatalogVisible && (
              <div className="grid grid-cols-4 gap-2">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isCatalog
                    isFavorite={favorites.includes(product.id)}
                    toggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Блок с двумя карточками и кнопкой "Вернуться на главную страницу" */}
          {isCatalogVisible && (
            <FeaturedProductsSection products={products} />
          )}
        </>
      )}

      {/* Страница "Избранное" */}
      {currentPage === "favorites" && (
        <FavoritesPage favorites={favorites} toggleFavorite={toggleFavorite} />
      )}

      {/* Footer */}
      <footer className="bg-[#e3e3e3] py-6 mx-auto max-w-4xl my-2 rounded-lg">
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-6">
          <div className="overflow-hidden rounded-lg shadow-md w-full">
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=30.314130%2C59.938951&z=12"
              className="w-full h-64 border-none"
              allowFullScreen
              title="Карта Санкт-Петербурга"
            ></iframe>
          </div>
          <div className="w-full bg-[#c6cbd8] rounded-2xl p-4 flex flex-col md:flex-row justify-between text-sm text-black">
            <div className="flex flex-col gap-2 items-start">
              <p className="font-semibold">Наши соц-сети</p>
              <div className="flex gap-3 text-xl">
                <a href="#" className="hover:scale-110 transition">Wh</a> {/* WhatsApp */}
                <a href="#" className="hover:scale-110 transition">Vk</a> {/* VK */}
                <a href="#" className="hover:scale-110 transition">Tg</a> {/* Telegram */}
              </div>
            </div>
            <div className="text-center mt-4 md:mt-0">
              <p className="font-semibold">Мы открыты:</p>
              <p>пн–пт, 9:00–21:00</p>
            </div>
            <div className="text-right mt-4 md:mt-0">
              <p>г. Санкт-Петербург</p>
              <p>м. Горьковская</p>
              <p>Контактный номер:<br />89229229222</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
    
  );
}

export default App;