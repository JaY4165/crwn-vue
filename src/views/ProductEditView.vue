<script setup>
import ProductEditForm from '@/components/Product-Edit-Form.vue';
import { useProductStore } from '@/stores/product-store';
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
})



const route = useRoute();
const key = ref(0);
const productStore = useProductStore();
const { product } = storeToRefs(productStore);
const productData = ref({});



watch(
  () => route.params.id,
  (newId, oldId) => {
    if (newId !== oldId) {
      console.log('Product ID changed:', newId);
      key.value++
    }
  },
  {
    immediate: true,
  }
);




onMounted(async () => {
  await productStore.getProductById(Number(props.id));

});

watch(productStore.product, async () => {
  productData.value = await { ...product.value };

}, {
  immediate: true
})



console.log(props.id)
</script>

<template>
  <div class="w-full px-10">
    <ProductEditForm :product="product" />
  </div>
</template>
