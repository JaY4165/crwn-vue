<script setup>
import CategoryForm from "./Category-Form.vue";
import CategoryTableContent from "./Category-Table-Content.vue";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
</script>


<template>
  <Card class="w-full pb-10 px-10">
    <CardHeader class="my-3 flex flex-row justify-between">
      <CardTitle>Category Table</CardTitle>
      <CategoryForm />
    </CardHeader>
    <CardContent>
      <CategoryTableContent />
    </CardContent>
  </Card>
</template>
