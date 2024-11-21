<script setup>
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from './ui/button';
import { PlusIcon } from 'lucide-vue-next';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { onBeforeMount, ref } from 'vue';
import { useProductStore } from '@/stores/product-store';
import { useCategoryStore } from '@/stores/category-store';
import { storeToRefs } from 'pinia';

const productStore = useProductStore();
const categoryStore = useCategoryStore();
const { categories } = storeToRefs(categoryStore);


const product = ref({
  name: '',
  price: '',
  category: '',
  imageUrl: '',
})


const dialogOpen = ref(false);

const addProduct = async () => {
  try {
    if (!product.value.name || !product.value.price || !product.value.imageUrl || !product.value.category) {
      alert('Please fill in all the fields');
      return;
    }
    await productStore.createNewProduct(product.value);
    product.value = { name: '', price: '', category: '', imageUrl: '' };
    dialogOpen.value = false;

  } catch (error) {
    console.error('Failed to add product', error);
    alert('Failed to add product');
  }
};

onBeforeMount(async () => {
  await categoryStore.fetchCategoriesList();
  console.log(categories.value)
})


</script>


<template>
  <Dialog :open="dialogOpen">
    <DialogTrigger as-child>
      <Button @click="dialogOpen = true">
        <PlusIcon class="w-3 h-3" /> Add Product
      </Button>
    </DialogTrigger>
    <DialogContent class="w-full">
      <DialogHeader>
        <DialogTitle> Add Product </DialogTitle>
        <DialogDescription>
          Create a new product
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Input class="col-span-2" placeholder="Name" v-model="product.name" />
          <Input class="col-span-2" placeholder="Price" v-model="product.price" />
        </div>
        <div class="gap-4">
          <Select class="w-full" v-model="product.category">
            <SelectTrigger class="">
              <SelectValue :placeholder="product.category || 'Select a category'" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup v-for="category in categories" :key="category.id">
                <SelectItem :value="category.title">
                  {{ category.title }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div class="gap-4 relative cursor-pointer">
          <Input id="picture" placeholder="Image URL" type="url" class="cursor-pointer" v-model="product.imageUrl" />
        </div>
      </div>
      <DialogFooter>
        <Button variant="secondary" @click="dialogOpen = false">Cancel</Button>
        <Button type="submit" @click="addProduct">
          Add
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>

</template>
