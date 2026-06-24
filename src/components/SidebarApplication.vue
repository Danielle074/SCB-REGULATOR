<template>
  <aside class="fixed left-0 top-0 z-40 hidden h-screen w-[270px] flex-col bg-white shadow-2xl md:flex">


    <!-- Logo + titre -->
    <div class="flex items-center gap-3 border-b border-slate-200 px-6 py-5">
      <img :src="logoImage" alt="SCB Drones" class="h-32 w-auto" />
      <div>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto px-4 py-6">
      <p class="mb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400">Navigation</p>
      <ul class="space-y-1">
        <li v-for="item in mainMenu" :key="item.path">
          <router-link
            :to="item.path"
            class="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200"
            :class="[
              $route.path === item.path
                ? 'bg-blue-50 text-blue-700 shadow-inner'
                : 'text-slate-500 hover:bg-slate-50 hover:text-blue-600 hover:scale-[1.02]'
            ]"
          >
            <i :class="[item.icon, 'text-xl transition-transform group-hover:scale-110']"></i>
            {{ item.label }}
            <span v-if="$route.path === item.path" class="ml-auto h-1.5 w-1.5 rounded-full bg-blue-600"></span>
          </router-link>
        </li>
      </ul>

      <!-- Section Carte -->
      <div class="my-4 border-t border-slate-200"></div>
      <ul class="space-y-1">
        <li>
          <router-link
            to="/map"
            class="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200"
            :class="[
              $route.path === '/map'
                ? 'bg-emerald-50 text-emerald-700 shadow-inner'
                : 'text-slate-500 hover:bg-slate-50 hover:text-emerald-600 hover:scale-[1.02]'
            ]"
          >
            <i class="bx bx-map text-xl transition-transform group-hover:scale-110"></i>
            Cartographie interactive
            <span class="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase text-emerald-700">NEW</span>
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- Pied : profil + déconnexion -->
    <div class="border-t border-slate-200 bg-slate-50 p-4">
      <div class="flex items-center gap-3 rounded-xl bg-white px-3 py-2 shadow-sm">
        <img :src="avatarImage" alt="Avatar" class="h-10 w-10 rounded-full border-2 border-blue-500 object-cover" />
        <div class="flex-1 truncate">
          <p class="text-sm font-semibold text-slate-800">Capitaine Pilote</p>
          <p class="text-xs text-slate-400">Certifié DGAC</p>
        </div>
        <button @click="logout" class="rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-red-600">
          <i class="bx bx-log-out text-xl"></i>
        </button>
      </div>
      <div class="mt-2 flex justify-center gap-4 text-[10px] text-slate-300">
        <span>v2.4.0</span>
        <span>•</span>
        <span>SCB 2026</span>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import logoImage from '@/assets/images/logodrone.png'
import avatarImage from '@/assets/images/drone4.jpg'

const router = useRouter()

const mainMenu = [
  { path: '/application', label: 'Tableau de bord', icon: 'bx bxs-dashboard' },
  { path: '/application/flotte', label: 'Ma Flotte', icon: 'bx bx-navigation' },
  { path: '/application/plans', label: 'Plans de Vol', icon: 'bx bx-map-alt' },
  { path: '/application/certification', label: 'Certification', icon: 'bx bx-certification' },
  { path: '/application/parametre', label: 'Paramètre', icon: 'bx bx-cog' },
]

const logout = () => {
  // Déconnexion
  localStorage.removeItem('token')
  router.push('/login')
}
</script>
