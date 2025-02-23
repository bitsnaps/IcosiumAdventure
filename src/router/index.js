import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/About.vue')
    },
    {
      path: '/programmes',
      name: 'Programmes',
      component: () => import('../views/Programmes.vue')
    },
    {
      path: '/booking',
      name: 'Booking',
      component: () => import('../views/Booking.vue')
    },
    {
      path: '/blog',
      name: 'Blog',
      component: () => import('../views/Blog.vue')
    }
  ]
})

export default router