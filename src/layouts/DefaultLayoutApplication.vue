<template>
  <div class="flex min-h-screen bg-secondary">
    <!-- Sidebar visible sur desktop -->
    <SidebarApplication class="hidden md:block" />

    <!-- Contenu principal -->
    <div class="flex flex-1 flex-col md:ml-[260px]">
      <!-- En-tête premium -->
      <header class="flex h-[72px] items-center justify-between border-b border-slate-200/80 bg-white/90 px-8 backdrop-blur-sm shadow-sm">
        <div class="flex items-center gap-3">
          <h1 class="text-2xl font-bold text-primary">
            {{ pageTitle }}
          </h1>
          <span class="hidden h-6 w-px bg-slate-300 sm:block"></span>
          <span class="hidden text-xs font-medium text-neutral sm:block">Pilote certifié</span>
        </div>

        <div class="flex items-center gap-4">
          <!-- Barre de recherche -->
          <div class="relative hidden md:block">
            <i class="bx bx-search absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral text-base"></i>
            <input
              type="text"
              placeholder="Rechercher un vol, drone..."
              class="w-64 rounded-full border-0 bg-slate-100/80 py-2.5 pl-10 pr-4 text-sm text-slate-700 placeholder:text-neutral outline-none ring-1 ring-slate-200 transition focus:bg-white focus:ring-2 focus:ring-tertiary focus:ring-offset-1"
            />
            <kbd class="absolute right-3 top-1/2 -translate-y-1/2 rounded bg-white px-1.5 py-0.5 text-[10px] font-semibold text-neutral shadow-sm border border-slate-200">⌘K</kbd>
          </div>

          <!-- Bouton notifications -->
          <button class="relative rounded-full p-2 text-neutral transition hover:bg-slate-100 hover:text-tertiary">
            <i class="bx bx-bell text-2xl"></i>
            <span class="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-danger ring-2 ring-white">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-danger opacity-75"></span>
            </span>
          </button>

          <!-- Avatar utilisateur -->
          <div class="group relative flex cursor-pointer items-center gap-2 rounded-full pl-2 pr-3 py-1 transition hover:bg-slate-100">
            <img
              :src="avatarImage"
              alt="Avatar"
              class="h-9 w-9 rounded-full border-2 border-primary object-cover shadow-sm transition group-hover:border-tertiary"
            />
            <div class="hidden text-left sm:block">
              <p class="text-sm font-semibold leading-tight text-slate-700">Capitaine</p>
              <p class="text-[10px] leading-tight text-neutral">DGAC</p>
            </div>
            <i class="bx bx-chevron-down text-neutral transition group-hover:rotate-180"></i>
          </div>
        </div>
      </header>

      <!-- Corps du dashboard -->
      <div class="flex-1 space-y-6 p-8">
        <router-view />
      </div>

      <!-- Pied de page -->
      <footer class="mt-auto border-t border-slate-200 bg-white/80 px-8 py-4 text-sm text-neutral backdrop-blur-sm">
        <div class="flex flex-col items-center justify-between gap-2 sm:flex-row">
          <span>© 2026 SCB DRONES – Portail Pilote</span>
          <div class="flex gap-6 text-xs">
            <a href="#" class="transition hover:text-primary hover:underline">Mentions légales</a>
            <a href="#" class="transition hover:text-primary hover:underline">Confidentialité</a>
            <a href="#" class="transition hover:text-primary hover:underline">Support</a>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SidebarApplication from '@/components/SidebarApplication.vue'
import avatarImage from '@/assets/images/drone4.jpg'

const route = useRoute()

// Mapping entre le nom de la route et le titre affiché
const pageTitle = computed(() => {
  const titles: Record<string, string> = {
    'dashboard': 'Tableau de bord',
    'flotte': 'Ma Flotte',
    'plan': 'Plans de Vol',
    'certification': 'Certification',
    'carte-drones': 'Cartographie interactive',
    'parametre': 'Paramètre',
  }
  // Utiliser le nom de la route s'il existe
  const routeName = route.name as string
  if (routeName && titles[routeName]) {
    return titles[routeName]
  }
  // Fallback : utiliser le chemin
  const pathMap: Record<string, string> = {
    '/application': 'Tableau de bord',
    '/application/flotte': 'Ma Flotte',
    '/application/plan': 'Plans de Vol',
    '/application/certification': 'Certification',
    '/application/parametre': 'Paramètre',
    '/map': 'Cartographie interactive',
  }
  return pathMap[route.path] || 'SCB DRONES'
})
</script>

<style scoped>

</style>
