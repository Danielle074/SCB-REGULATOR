<template>
  <div class="min-h-screen bg-secondary text-slate-800 flex flex-col relative">
    <header class="bg-white border-b border-slate-200 sticky top-0 z-40 px-4 py-3 flex items-center justify-between shadow-xs">
      <router-link to="/" class="flex items-center gap-2 text-primary font-bold text-xl tracking-tight">
        <img :src="logoUrl" alt="Logo DroneMap" class="h-28 w-auto object-contain" />

      </router-link>

      <div class="flex items-center gap-6 relative">
        <div class="flex items-center gap-2 cursor-pointer select-none" @click="toggleDropdown">
          <span class="text-sm font-medium text-primary hidden sm:inline">non connecté</span>
          <i class="bx text-xl text-primary transition-transform duration-200" :class="isDropdownOpen ? 'bx-chevron-up' : 'bx-chevron-down'"></i>
          <i class="bx bx-user-circle text-3xl text-primary"></i>
        </div>

        <div v-if="isDropdownOpen" class="absolute right-32 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-100 p-4 z-50 flex flex-col gap-3">
          <div>
            <label class="block text-xs font-semibold text-neutral mb-1">Nom :</label>
            <input type="text" class="w-full px-3 py-1.5 border border-primary/30 rounded-md focus:outline-hidden focus:border-primary text-sm bg-secondary/30" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-neutral mb-1">Mot de passe :</label>
            <input type="password" class="w-full px-3 py-1.5 border border-primary/30 rounded-md focus:outline-hidden focus:border-primary text-sm bg-secondary/30" />
          </div>
          <button class="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 rounded-md transition-colors text-sm shadow-xs">
            Se connecter
          </button>
          <button class="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 rounded-md transition-colors text-sm shadow-xs">
            Registre
          </button>
          <button class="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 rounded-md transition-colors text-sm shadow-xs">
            Mot de passe oublié
          </button>
        </div>

        <button @click="isModalOpen = true" class="text-primary hover:text-tertiary font-semibold text-sm flex items-center gap-1 transition-colors cursor-pointer">
          Côte d'Ivoire | <span class="font-normal text-xs text-neutral">FR</span>
        </button>

        <button @click="toggleMenu" class="text-primary hover:text-tertiary text-3xl flex items-center cursor-pointer">
          <i class="bx" :class="isMenuOpen ? 'bx-x' : 'bx-menu'"></i>
        </button>

        <div v-if="isMenuOpen" class="absolute right-0 top-full mt-2 w-72 bg-white rounded-lg shadow-xl border border-slate-100 p-4 z-50 flex flex-col gap-4 text-sm text-primary">
          <div>
            <span class="font-semibold underline block mb-1 cursor-pointer">Règles d'utilisation des drones</span>
            <div class="pl-4 flex flex-col gap-1 text-slate-600">
              <a href="#" class="hover:text-tertiary">Autorité de l'aviation civile</a>
              <a href="#" class="hover:text-tertiary">Mesures de nature générale</a>
              <a href="#" class="hover:text-tertiary font-medium text-primary">volerresponsablement.ci</a>
            </div>
          </div>

          <div class="flex gap-4 text-xl justify-center py-1 text-slate-500 border-b border-slate-100">
            <a href="#" class="hover:text-primary"><i class="bx bxl-twitter"></i></a>
            <a href="#" class="hover:text-primary"><i class="bx bxl-facebook-square"></i></a>
            <a href="#" class="hover:text-primary"><i class="bx bxl-instagram"></i></a>
          </div>

          <div>
            <span class="font-semibold underline block mb-1 cursor-pointer">Télécharger</span>
            <div class="pl-4 flex flex-col gap-1 text-slate-600">
              <a href="#" class="hover:text-tertiary">Données de zone géographique</a>
              <a href="#" class="hover:text-tertiary flex items-center gap-1"><i class="bx bxl-google-play"></i> Google Play</a>
              <a href="#" class="hover:text-tertiary flex items-center gap-1"><i class="bx bxl-apple"></i> App Store</a>
            </div>
          </div>

          <div>
            <span class="font-semibold underline block mb-1 cursor-pointer">Aide</span>
            <div class="pl-4 flex flex-col gap-1 text-slate-600">
              <a href="#" class="hover:text-tertiary">Aide pour l'utilisation du site web</a>
              <a href="#" class="hover:text-tertiary">FAQ</a>
            </div>
          </div>

          <a href="#" class="font-semibold underline hover:text-tertiary">Contact</a>
          <a href="#" class="font-semibold underline hover:text-tertiary">AisView</a>
        </div>
      </div>
    </header>

    <main class="flex-1 relative">
      <router-view />
    </main>

    <div v-if="isModalOpen" class="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in">
      <div class="bg-white rounded-lg max-w-2xl w-full p-6 shadow-2xl relative border border-slate-100">
        <button @click="isModalOpen = false" class="absolute top-4 right-4 text-slate-400 hover:text-danger text-2xl transition-colors cursor-pointer">
          <i class="bx bx-x"></i>
        </button>

        <div class="flex flex-col gap-4">
          <h3 class="text-tertiary font-bold text-xl">Chers utilisateurs,</h3>

          <p class="text-slate-700 leading-relaxed text-sm">
            L'application <span class="font-semibold text-primary">DroneMap Côte d'Ivoire</span> est un
            <span class="text-tertiary font-medium">outil de carte officiel</span> et un
            <span class="text-tertiary font-medium">système d'information de l'administration publique</span>,
            conjointement supervisé par <span class="font-semibold text-primary">SCB DRONES</span> et la
            <span class="font-semibold text-primary">HACA</span>. Il sert exclusivement à la
            <span class="text-tertiary font-medium font-semibold">préparation avant vol pour les opérations de drones</span>
            sur toute l'étendue du territoire ivoirien. L'affichage des zones géographiques avec les interdictions ou les conditions de vol est obligatoire.
          </p>

          <p class="text-slate-700 leading-relaxed text-sm bg-secondary p-3 rounded-md border-l-4 border-quaternary">
            <span class="font-bold text-dark">Remarque :</span> les textes de l'application sont simplifiés.
            Avant de faire voler un drone, <span class="text-tertiary font-semibold">il est nécessaire de se familiariser avec toutes les règles</span>
            découlant de la réglementation nationale en vigueur délivrée par les autorités compétentes.
          </p>

          <p class="text-slate-600 text-xs">
            Pour <span class="font-semibold text-dark">afficher certaines couches</span>, il est nécessaire d'utiliser le
            <span class="text-tertiary font-semibold">zoom</span>. Les applications ou les calques peuvent être affichés manuellement via le bouton « sélection ».
          </p>

          <div class="mt-2 pt-2 border-t border-slate-100 flex justify-between items-center text-sm">
            <span class="font-semibold text-primary">L'équipe DroneMap & SCB Drones</span>
            <button @click="isModalOpen = false" class="bg-primary hover:bg-primary/90 text-white px-4 py-1.5 rounded-md transition-colors text-xs font-medium">
              J'ai compris
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// Importation du logo (ajuste le chemin d'accès selon l'emplacement réel de ton fichier)
import logoUrl from '@/assets/images/logodrone.png'

// États de gestion de l'interface
const isDropdownOpen = ref<boolean>(false)
const isMenuOpen = ref<boolean>(false)
const isModalOpen = ref<boolean>(false)

// Fonctions bascules (Toggles)
const toggleDropdown = (): void => {
  isDropdownOpen.value = !isDropdownOpen.value
  if (isDropdownOpen.value) isMenuOpen.value = false
}

const toggleMenu = (): void => {
  isMenuOpen.value = !isMenuOpen.value
  if (isMenuOpen.value) isDropdownOpen.value = false
}
</script>

<style scoped>
/* Animations légères pour la modal */
.animate-fade-in {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
