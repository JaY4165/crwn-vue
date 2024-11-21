<template>
  <header>
    <div class="py-10 px-10">
      <nav class="flex items-center justify-between w-full">
        <h1 class="text-2xl font-semibold ">
          Crwn Clothing
        </h1>
        <div class="flex justify-end space-x-4">
          <RouterLink to="/product-form">Product</RouterLink>
          <RouterLink to="/category-form">Category</RouterLink>
          <RouterLink to="/auth">Auth</RouterLink>
          <ThemeComponent />
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import ThemeComponent from './Theme-Component.vue';
</script>

<style scoped></style>
