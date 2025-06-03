import React from "react";

const AboutUsSection = () => (
    <section className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-16 overflow-hidden rounded-3xl">
  {/* Волнистый фон */}
  <img
    src="/images/bg.png"
    alt="Волнистый фон"
    className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none select-none"
  />

  {/* Контент */}
  <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-14 py-12">
    {/* Фото */}
    <div className="mt-6 max-w-xs sm:max-w-sm lg:max-w-[360px] rounded-2xl overflow-hidden shadow-lg flex-shrink-0">
      <img
        src="/images/aboutus.jpg"
        alt="Флорист"
        className="object-cover"
      />
    </div>

    {/* Текст */}
    <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 text-[#1a1a1a] font-light text-base sm:text-lg leading-relaxed w-full shadow-md max-w-3xl">
      <div className="px-8 sm:px-10">
        <p className="mb-4">
          Добро пожаловать в наш цветочный мир!
        </p>
        <p className="mb-4">
          Мы — команда флористов, влюбленных в свое дело.<br />
          Наш магазин — это место, где каждый букет<br />
          создается с душой и вниманием к деталям. Мы<br />
          верим, что цветы — это не просто украшение, а язык<br />
          чувств, способ выразить заботу, любовь,<br />
          благодарность или радость.
        </p>
        <p>Благодарим, что выбираете нас!</p>
      </div>
      <span className="absolute top-4 right-4 text-[#BFC5D3] text-3xl sm:text-4xl select-none">✿</span>
      <span className="absolute bottom-4 left-4 text-[#BFC5D3] text-3xl sm:text-4xl select-none">✿</span>
    </div>
  </div>
</section>

);

export default AboutUsSection;