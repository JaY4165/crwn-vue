import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  fetchProduct,
} from '@/utils/utils'

export const useProductStore = defineStore('product', () => {
  const product = ref({})
  const products = ref(null)
  const categories = ref([])

  async function loadAllProducts() {
    try {
      const response = await fetchProducts()

      if (response.data.shopItems.length > 0) {
        const resData = await response.data.shopItems

        const allData = resData.map((category) => category.items).flat()

        products.value = allData
      }
    } catch (error) {
      console.error('Failed to load products', error)
    }
  }

  async function getProductById(id) {
    try {
      const response = await fetchProduct(id)
      product.value = response.data
    } catch (error) {
      console.error('Failed to load product', error)
    }
  }

  // POST: Create new product
  async function createNewProduct(product) {
    console.log(product)
    try {
      const response = await createProduct(product).then(async () => {
        await loadAllProducts()
      })
      // this.products.push([...response.data.filter((c) => c.id === product.id).map((item) => item)])
      console.log(response)
    } catch (error) {
      console.error('Failed to create product', error)
    }
  }
  // UPDATE: Updating products
  async function updateExistingProduct(product) {
    console.log(product, 'store')
    try {
      const response = await updateProduct(product.id, product)
      // const index = this.products.findIndex((p) => p.id === product.id)
      // if (index !== -1) {
      //   this.products[index] = response.data
      // }
      console.log(response)
    } catch (error) {
      console.error('Failed to update product', error)
    }
  }

  async function removeProduct(productId) {
    try {
      await deleteProduct(productId).then(async () => {
        console.log('Product deleted successfully')
        await loadAllProducts()
      })

      // products.value = products.value.filter((product) => product.id !== productId)
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  return {
    product,
    products,
    categories,
    loadAllProducts,
    getProductById,
    createNewProduct,
    updateExistingProduct,
    removeProduct,
  }
})
