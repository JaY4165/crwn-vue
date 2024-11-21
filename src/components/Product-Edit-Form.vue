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
// import { FileInput } from 'lucide-vue-next';
import { Input } from './ui/input';
import Card from './ui/card/Card.vue';
import CardContent from './ui/card/CardContent.vue';
import CardHeader from './ui/card/CardHeader.vue';
import CardTitle from './ui/card/CardTitle.vue';
import CardDescription from './ui/card/CardDescription.vue';
import CardFooter from './ui/card/CardFooter.vue';
import { onBeforeMount, ref, watch } from 'vue';
import { Label } from './ui/label';
import { useProductStore } from '@/stores/product-store';
import { useRouter } from 'vue-router';
import { useCategoryStore } from '@/stores/category-store';
import { storeToRefs } from 'pinia';

const props = defineProps({
  product: {
    type: String,
    required: true
  }
})

const productStore = useProductStore();
const categoryStore = useCategoryStore();
const { categories } = storeToRefs(categoryStore);
const router = useRouter();

const formData = ref({
  name: '',
  category: '',
  price: '',
  imageUrl: ''
})

watch(() => props.product, (newProduct) => {
  formData.value = newProduct
})

onBeforeMount(async () => {
  await categoryStore.fetchCategoriesList();
  console.log(categories.value)
})

const saveProduct = async () => {
  await productStore.updateExistingProduct(formData.value);
  router.push({ name: 'product-form' });
}

console.log(props.product, "props");
</script>


<template>
  <Card>
    <CardContent class="w-full">
      <CardHeader>
        <CardTitle> Edit Product </CardTitle>
        <CardDescription>
          Edit existing product
        </CardDescription>
      </CardHeader>
      <div class="grid gap-4 py-4 px-6">
        <div class="grid grid-cols-2 items-center gap-4">
          <div class="w-full">
            <Label for="name">Name</Label>
            <Input class="col-span-2" placeholder="Name" v-model="formData.name" />
          </div>

          <div class="w-full">
            <Label for="price">Price</Label>
            <Input class="col-span-2" placeholder="Price" v-model="formData.price" />
          </div>
        </div>
        <div class="gap-4">
          <Select class="w-full">
            <SelectTrigger class="">
              <SelectValue :placeholder="formData.category || 'Select a category'" />
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
          <Input id="picture" placeholder="Image URL" type="url" class="cursor-pointer" v-model="formData.imageUrl" />
        </div>
      </div>
      <CardFooter class="flex justify-end">
        <Button type="submit" @click="saveProduct">
          Save
        </Button>
      </CardFooter>
    </CardContent>
  </Card>

</template>
