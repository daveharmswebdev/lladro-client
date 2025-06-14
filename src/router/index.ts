import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import DoersView from '../views/DoersView.vue';
import TodosView from '../views/TodosView.vue';
import RegionsView from '../views/RegionsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/doers',
      name: 'doers',
      component: DoersView,
    },
    {
      path: '/todos',
      name: 'todos',
      component: TodosView,
    },
    {
      path: '/regions',
      name: 'regions',
      component: RegionsView,
    },
  ],
});

export default router;
