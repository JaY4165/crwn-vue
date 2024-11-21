<script setup>

import { Button } from './ui/button';
import { PlusIcon } from 'lucide-vue-next';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { useCategoryStore } from '@/stores/category-store';
import { ref } from 'vue';

const categoryStore = useCategoryStore();
const newCategory = ref({
  categoryName: '',
  categoryImage: ''
});
const dialogOpen = ref(false);



const onSubmit = async (e) => {
  e.preventDefault();
  await categoryStore.createNewCategory(newCategory.value);
  newCategory.value.categoryName = '';
  dialogOpen.value = false;
}


</script>

<template>
  <Dialog :open="dialogOpen">
    <DialogTrigger as-child>
      <Button @click="dialogOpen = true">
        <PlusIcon class="w-3 h-3" /> Add Category
      </Button>
    </DialogTrigger>
    <DialogContent class="w-full">
      <DialogHeader>
        <DialogTitle> Add Category </DialogTitle>
        <DialogDescription>
          Create a new category
        </DialogDescription>
      </DialogHeader>
      <form @submit="onSubmit">
        <div class="grid gap-4 py-4">
          <Input id="categoryName" placeholder="Category Name" v-model="newCategory.categoryName" type="text"
            name="categoryName" required />
        </div>
        <div class="gap-4 mb-4 relative cursor-pointer">
          <Input id="picture" placeholder="Image URL" type="url" v-model="newCategory.categoryImage" required />
        </div>
        <DialogFooter>
          <Button variant="secondary" @click="dialogOpen = false">Cancel</Button>

          <Button type="submit">
            Add
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
