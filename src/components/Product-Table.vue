<script setup>
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
// import ProductTableContent from './Product-Table-Content.vue';
import ProductForm from './Product-Form.vue';
import { defineAsyncComponent } from 'vue';
import LoadingComponent from '../components/Loading-Component.vue';

const ProductTableContent = defineAsyncComponent({
  loader: () => import('./Product-Table-Content.vue'),
  delay: 1000,
})
</script>


<template>
  <Card class="w-full pb-10 px-10">
    <CardHeader class="my-3 flex flex-row justify-between">
      <CardTitle>Product Table</CardTitle>
      <ProductForm />
    </CardHeader>
    <CardContent>
      <Suspense>
        <ProductTableContent />
        <template>
          <LoadingComponent />
        </template>
      </Suspense>
      <ProductTableContent />
    </CardContent>
  </Card>

</template>
