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
// import { PlusIcon } from 'lucide-vue-next';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { ref, watch } from 'vue';


const props = defineProps({
  product: Object
})

const showDialog = ref(false);
const productData = ref({
  name: '',
  price: '',
  category: '',
  imageUrl: ''
});

watch(() => props.product, (newProduct) => {
  productData.value = { ...newProduct };
}, { immediate: true });

const saveProduct = () => {
  showDialog.value = false;
  this.$emit('close');
};

</script>


<template>
  <Teleport to="body">
    <Dialog v-if="showDialog" @close="closeDialog">
      <DialogContent class="w-full">
        <DialogHeader>
          <DialogTitle> Edit Product </DialogTitle>
          <DialogDescription>
            Edit existing product
          </DialogDescription>
        </DialogHeader>
        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <Input class="col-span-2" placeholder="Name" v-model="productData.name" />
            <Input class="col-span-2" placeholder="Price" v-model="productData.price" />
          </div>
          <div class="gap-4">
            <Select class="w-full">
              <SelectTrigger class="">
                <SelectValue :placeholder="productData.category || 'Select a category'" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="hats">
                    Hats
                  </SelectItem>
                  <SelectItem value="jeans">
                    Jeans
                  </SelectItem>
                  <SelectItem value="shirts">
                    Shirts
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div class="gap-4 relative cursor-pointer">
            <Input id="picture" placeholder="Image URL" v-model="productData.imageUrl" type="url"
              class="cursor-pointer" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" @click="saveProduct">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  </Teleport>

</template>
