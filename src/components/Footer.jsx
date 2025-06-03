import React from 'react';
import { FaWhatsapp, FaVk, FaTelegram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="mt-auto">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#E6E9F0] overflow-hidden px-[9.9px]">
          {/* Карта */}
          <div className="w-full h-[280px] overflow-hidden pt-8">
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=30.314130%2C59.938951&z=12"
              className="w-full h-full border-none"
              allowFullScreen
              title="Карта Санкт-Петербурга"
            ></iframe>
          </div>

          {/* Информация */}
          <div className="w-full grid grid-cols-3 gap-4 pt-8 pb-[5.6px]">
            {/* Социальные сети */}
            <div className="flex flex-col items-start">
              <h3 className="text-[#1a1a1a] font-normal mb-3">Наши соц-сети</h3>
              <div className="flex gap-6">
                <a
                  href="https://wa.me/89229222922"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-[#1a1a1a] hover:opacity-70 transition-opacity"
                >
                  <FaWhatsapp />
                </a>
                <a
                  href="https://vk.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-[#1a1a1a] hover:opacity-70 transition-opacity"
                >
                  <FaVk />
                </a>
                <a
                  href="https://t.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-[#1a1a1a] hover:opacity-70 transition-opacity"
                >
                  <FaTelegram />
                </a>
              </div>
            </div>

            {/* Время работы */}
            <div className="flex flex-col items-center">
              <h3 className="text-[#1a1a1a] font-normal mb-1">Мы открыты:</h3>
              <p className="text-[#1a1a1a]">ПН-ПЦ 9:00-21:00</p>
            </div>

            {/* Адрес и контакты */}
            <div className="flex flex-col items-end text-right">
              <div className="mb-4">
                <p className="text-[#1a1a1a]">г.Санкт-Петербург</p>
                <p className="text-[#1a1a1a]">м.Гончаровская</p>
              </div>
              
              <div>
                <p className="text-[#1a1a1a]">контактный номер:</p>
                <a 
                  href="tel:89229222922" 
                  className="text-[#1a1a1a] hover:opacity-70 transition-opacity"
                >
                  89229222922
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
