<script setup>
import Table from './ui/table/Table.vue';
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { EditIcon, EllipsisVertical, TrashIcon } from 'lucide-vue-next';
import DropdownMenu from './ui/dropdown-menu/DropdownMenu.vue';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { onMounted } from 'vue';
import { useCategoryStore } from '@/stores/category-store';
import { storeToRefs } from 'pinia';

const categoryStore = useCategoryStore();
const { categories } = storeToRefs(categoryStore);
// const handleEdit = (id) => {
//   const categoryStore = useCategoryStore();
//   categoryStore.editCategory(id);
// };


// const handleDelete = (id) => {
//   const categoryStore = useCategoryStore();
//   categoryStore.deleteCategory(id);
// };

onMounted(async () => {
  await categoryStore.fetchCategoriesList();
})

</script>

<template>
  <div class="rounded-md">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(category, index) in categories" :key="category.id">
          <TableCell>{{ index + 1 }}</TableCell>
          <TableCell>
            <img :src="category.imageUrl" alt="new category" class="w-20 h-20 rounded-lg object-cover" />
          </TableCell>
          <TableCell>{{ category.title }}</TableCell>
          <TableCell>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button size="icon">
                  <EllipsisVertical class="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent class="w-full" align="center">
                <DropdownMenuItem value="edit" @click="openEditDialog(category)">
                  Edit
                  <EditIcon class="w-3 h-3" />
                </DropdownMenuItem>
                <DropdownMenuItem value="delete" class="text-red-600"
                  @click="categoryStore.removeCategory(category.id)">
                  Delete
                  <TrashIcon class="w-3 h-3" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>

</template>
