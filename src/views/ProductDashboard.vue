<script setup>
import ProductTable from '@/components/Product-Table.vue';
import { onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onBeforeUnmount(() => {
  router.go(0);
})

</script>

<template>
  <div class="w-full px-10">
    <ProductTable />
  </div>
</template>
