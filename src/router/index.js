/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router';
import Marketing from '@/pages/Marketing.vue';
import colaboradores from '@/pages/colaboradores.vue';
import Login from '@/pages/Login.vue';
import Home from '@/pages/Home.vue';
import Organizacoes from '@/pages/Organizacoes.vue';
import LayoutBarTop from '@/layouts/LayoutBarTop.vue';
import layoutNavBar from '@/layouts/layoutNavBar.vue';

const routes = [
  {
    path: '/app/',
    component: LayoutBarTop,
    children: [
      {
        path: 'organizacoes',
        component: Organizacoes,
      },
    ],
  },
  {
    path: '/',
    component: layoutNavBar,
    children: [
      {
        path: 'marketing',
        name: 'marketing',
        component: Marketing,
      },
    ]
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/colaboradores',
    name: 'colaboradores',
    component: colaboradores,
  },
  {
    path: '/organizacoes',
    name: 'Organizacoes',
    component: Organizacoes,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
