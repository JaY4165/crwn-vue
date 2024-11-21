import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export const createCategory = (category) => apiClient.post('/product-categories/add', category)
export const fetchCategories = () => apiClient.get('/product-categories')
export const updateCategory = (id, category) => apiClient.put(`/product-categories/${id}`, category)
export const deleteCategory = (id) => apiClient.delete(`/product-categories/${id}`)

export const createProduct = (product) => apiClient.post('/products/add', product)
export const fetchProducts = () => apiClient.get('/products')
export const fetchProduct = (id) => apiClient.get(`/shop/${id}`)
export const updateProduct = (id, product) => apiClient.put(`/products/${id}`, product)
export const deleteProduct = (id) => apiClient.delete(`/products/${id}`)
