import { createRouter, createWebHistory } from 'vue-router'
import ProductEditView from '../views/ProductEditView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'navbar',
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('../views/HomeView.vue'),
        },
        {
          path: '/product-form',
          name: 'product-form',
          component: () => import('../views/ProductDashboard.vue'),
        },
        {
          path: '/category-form',
          name: 'category-form',
          component: () => import('../views/CategoryDashboard.vue'),
        },
        {
          path: '/product-form-update/:id',
          name: 'product-form-update',
          component: ProductEditView,
          props: true,
        },
        {
          path: '/auth',
          name: 'auth',
          component: () => import('../views/AuthView.vue'),
        },
      ],
    },
  ],
})

export default router
