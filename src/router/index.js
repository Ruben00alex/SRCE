// Composables
import {createRouter, createWebHistory} from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'SignIn',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/layouts/default/SignIn'),
      },
    ],
  },
  {
    path: '/home',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: {
          requiresAuth: true,
          title: 'Home',
        }
      }
    ]
  },

  {
    path: '/evaluacion',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Evaluacion',
        component: () => import('@/views/Evaluacion.vue'),
        meta: {
          requiresAuth: true,
          title: 'Mis Evaluaciones',
        }
      }
    ]
  },
  {
    path: '/gestionAE',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'GestionAE',
        component: () => import('@/views/GestionAE.vue'),
        meta: {
          requiresAuth: true,
          title: 'Gestión de Atributos de Egreso',
        }
      }
    ]
  },
  {
    path: '/gestionClases',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'GestionClases',
        component: () => import('@/views/GestionClases.vue'),
        meta: {
          requiresAuth: true,
          title: 'Mis Asignaturas',
        }

      }
    ]
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
