import { ref } from 'vue'
import { createCategory, fetchCategories, deleteCategory, updateCategory } from '@/utils/utils'
import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref([])

  async function fetchCategoriesList() {
    try {
      const response = await fetchCategories()
      // console.log(response.data.categories)
      categories.value = response.data.categories
    } catch (error) {
      console.error('filed to fetch categories', error)
    }
  }

  async function createNewCategory(category) {
    console.log(category)
    try {
      const response = await createCategory(category)
      this.categories.push(response.data)
    } catch (error) {
      console.error('failed to create category', error)
    }
  }

  async function updateExisitingCategory(category) {
    try {
      const response = await updateCategory(category.id, category)
      const index = this.categories.findIndex((c) => c.id === category.id)
      if (index !== -1) {
        this.categories[index] = response.data
      }
    } catch (error) {
      console.error('filed to update category', error)
    }
  }

  async function removeCategory(categoryId) {
    try {
      await deleteCategory(categoryId)
      categories.value = this.categories.filter((category) => category.id !== categoryId)
    } catch (error) {
      console.error('filed to delete category', error)
    }
  }

  return {
    fetchCategoriesList,
    updateExisitingCategory,
    createNewCategory,
    removeCategory,
    categories,
  }
})
