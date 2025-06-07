import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import HigherOrLower from '../views/HigherOrLower.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/higher-or-lower',
      name: 'higher-or-lower',
      component: HigherOrLower,
    },
  ],
});

export default router;
