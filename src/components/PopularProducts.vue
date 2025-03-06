<template>
    <section class="p-8">
      <h2 class="text-4xl font-semibold mb-8">Популярные товары</h2>
      <div class="flex gap-6 overflow-x-auto">
        <div v-for="product in products" :key="product.id" class="min-w-[250px] bg-white rounded-xl shadow-lg p-4">
          <img :src="product.image" class="rounded" />
          <h3 class="font-semibold mt-4">{{ product.title }}</h3>
          <p class="text-sm mt-2">{{ product.description }}</p>
          <div class="mt-2 font-bold">{{ product.price }}₽</div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  const products = [
    { id: 1, title: 'Сердце весны', description: 'Воплощение свежести и радости весенних дней', price: 3000, image: '/images/product1.jpg' },
    { id: 2, title: 'Нежность облаков', description: 'Воздушный букет', price: 3500, image: '/images/product2.jpg' },
    { id: 3, title: 'Мелодия счастья', description: 'Яркий и жизнерадостный аккорд', price: 2500, image: '/images/product3.jpg' },
    { id: 4, title: 'Сказка любви', description: 'Элегантный букет для глубоких чувств', price: 2000, image: '/images/product4.jpg' }
  ];
  </script>
  