<template>
    <div class="bg-gray-100 min-h-screen font-sans">
      <Header />
      <HeroSection />
      <PopularProducts />
      <Catalog />
      <MapSection />
    </div>
  </template>
  
  <script setup>
  import Header from './components/Header.vue';
  import HeroSection from './components/HeroSection.vue';
  import PopularProducts from './components/PopularProducts.vue';
  import Catalog from './components/Catalog.vue';
  import MapSection from './components/MapSection.vue';
  </script>
  
  <style scoped></style>
  