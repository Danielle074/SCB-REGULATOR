import { createRouter, createWebHistory } from 'vue-router'

//Layouts
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import DefaultLayoutApplication from '@/layouts/DefaultLayoutApplication.vue'

//Site sans sidebars
import Login from '@/views/Login.vue'
import Inscription from '@/views/Inscription.vue'

//map
import CarteDrones from '@/views/CarteDrones.vue'

//Application
import Dashboard from '@/views/Dashboard.vue'
import Flotte from '@/views/Flotte.vue'
import PlanVol from '@/views/PlanVol.vue'
import Certication from '@/views/Certification.vue'
import Parametre from '@/views/Parametre.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Connexion (sans layout)
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/inscription',
      name: 'inscription',
      component: Inscription,
    },

    // Application principale (layout avec sidebar)
    {
      path: '/application',
      component: DefaultLayoutApplication,
      children: [
        { path: '', name: 'dashboard', component: Dashboard },
        { path: 'flotte', name: 'flotte', component: Flotte },
        { path: 'plans', name: 'plans', component: PlanVol },
        { path: 'certification', name: 'certification', component: Certication },
        { path: 'parametre', name: 'parametre', component: Parametre },


      ],
    },

    // Carte (avec un layout différent, par exemple sans sidebar ?)
    {
      path: '/map',
      component: DefaultLayout, // ou un layout spécifique
      children: [
        { path: '', name: 'carte-drones', component: CarteDrones },
      ],
    },

    // Redirection 404
    {
      path: '/:pathMatch(.*)*',
      redirect: '/login',
    },
  ],
})

export default router
