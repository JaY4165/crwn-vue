  <script setup>
  import Table from './ui/table/Table.vue';
  import { TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
  import {
    EditIcon,
    EllipsisVertical,
    // EllipsisVertical
    TrashIcon
  } from 'lucide-vue-next';
  import DropdownMenu from './ui/dropdown-menu/DropdownMenu.vue';
  import { DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu';
  import Button from './ui/button/Button.vue';
  import DropdownMenuItem from './ui/dropdown-menu/DropdownMenuItem.vue';
  import { useProductStore } from '../stores/product-store.js';
  import { onMounted, onBeforeUnmount } from 'vue';
  import { storeToRefs } from 'pinia';

  // import ProductEditDialog from './Product-Edit-Dialog.vue';
  const productStore = useProductStore();

  const { products } = storeToRefs(productStore);
  // const showDialog = ref(false);
  // const selectedProduct = ref(null);

  // const openDialog = (product) => {
  //   selectedProduct.value = product;
  //   showDialog.value = true;
  // };

  // const closeDialog = () => {
  //   showDialog.value = false;
  // };

  onMounted(async () => {
    await productStore.loadAllProducts();
  });

  onBeforeUnmount(() => {
    console.log('Component unmounted - main');
  });


</script>


<template>
  <div class="rounded-md">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(product, index) in products" :key="product.id">
          <TableCell>{{ index + 1 }}</TableCell>
          <TableCell>
            <img :src="product.imageUrl" alt="new product" class="w-20 h-20 rounded-lg object-cover" />
          </TableCell>
          <TableCell>{{ product.name }}</TableCell>
          <TableCell>{{ product.price }}</TableCell>
          <TableCell class="flex space-x-3 mt-6">
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button size="icon" variant="ghost">
                  <EllipsisVertical class="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent class="w-full" align="center">
                <DropdownMenuItem value="delete" class=""
                  @click="$router.push({ name: 'product-form-update', params: { id: product.id } })">
                  Edit
                  <EditIcon class="w-3 h-3" />
                </DropdownMenuItem>
                <DropdownMenuItem value="delete" class="text-red-600" @click="productStore.removeProduct(product.id)">
                  Delete
                  <TrashIcon class="w-3 h-3" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>

    <!-- <Teleport to="body"> -->
    <!-- Render the ProductEditDialog only when showDialog is true -->
    <!-- <ProductEditDialog v-if="showDialog" :product="selectedProduct" @close="closeDialog" /> -->
    <!-- </Teleport> -->
  </div>
</template>
