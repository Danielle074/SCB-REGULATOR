<template>
  <div class="w-full h-[calc(100vh-64px)] relative overflow-hidden bg-secondary">
    <!-- Fond de carte -->
    <div class="absolute inset-0 z-0 bg-slate-200 flex items-center justify-center">
      <div class="text-neutral flex flex-col items-center gap-2">
        <i class="bx bx-map-alt text-5xl text-primary/40"></i>
        <span>[ Zone d'affichage de la carte 🌍 ]</span>
      </div>
    </div>

    <!-- Barre horizontale avec les deux sidebars côte à côte -->
    <div class="absolute bottom-0 left-0 right-0 z-30 flex flex-col pointer-events-none">
      <!-- Conteneur des deux panneaux -->
      <div class="flex gap-2 px-4 pb-2 pointer-events-auto transition-all duration-300"
           :style="{ maxHeight: (showCommandes || showDonnees) ? '50vh' : '0' }">

        <!-- Panneau Commandes (gauche) -->
        <div
          class="flex-1 bg-white/95 backdrop-blur-md shadow-2xl border border-slate-200 rounded-t-md p-4 overflow-y-auto transition-all duration-300"
          :style="{
            opacity: showCommandes ? 1 : 0,
            transform: showCommandes ? 'translateY(0)' : 'translateY(20px)',
            pointerEvents: showCommandes ? 'auto' : 'none',
            maxHeight: showCommandes ? '50vh' : '0',
            padding: showCommandes ? '1rem' : '0',
          }"
        >
          <div v-if="showCommandes" class="flex flex-col gap-3 text-sm">
            <!-- Contenu du panneau Commandes -->
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-primary font-medium">Statut de-à (UTC) :</span>
              <button class="text-xl hover:text-tertiary transition-colors">
                <i class="bx bx-shuffle"></i>
              </button>
              <div class="flex items-center gap-2 flex-wrap">
                <div class="flex items-center border border-primary/30 bg-white rounded-md px-2 py-1">
                  <input type="text" value="15.06.2026 10:13" class="w-24 text-xs focus:outline-none text-slate-700" />
                  <i class="bx bx-calendar text-primary text-base ml-1"></i>
                </div>
                <div class="flex items-center border border-primary/30 bg-white rounded-md px-2 py-1">
                  <input type="text" value="15.06.2026 14:13" class="w-24 text-xs focus:outline-none text-slate-700" />
                  <i class="bx bx-calendar text-primary text-base ml-1"></i>
                </div>
              </div>
              <div class="flex gap-1">
                <button class="bg-primary hover:bg-primary/90 text-white font-medium px-2 py-0.5 rounded text-xs transition-colors">+2h</button>
                <button class="bg-primary hover:bg-primary/90 text-white font-medium px-3 py-0.5 rounded text-xs transition-colors">SS</button>
                <button class="bg-primary hover:bg-primary/90 text-white font-medium px-2 py-0.5 rounded text-xs transition-colors">16.06.</button>
              </div>
            </div>

            <div class="flex flex-wrap items-center gap-4 border-t border-slate-100 pt-2">
              <span class="text-primary font-medium">Limites verticales :</span>
              <div class="flex-1 min-w-[150px]">
                <div class="h-1 bg-slate-200 rounded-full relative flex items-center">
                  <div class="absolute left-0 right-3/4 h-full bg-primary/30 rounded-full"></div>
                  <div class="w-4 h-4 bg-white border-2 border-primary rounded-md absolute left-0 cursor-pointer shadow-sm"></div>
                  <div class="w-4 h-4 bg-white border-2 border-primary rounded-md absolute left-12 cursor-pointer shadow-sm"></div>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-tertiary font-bold text-xs">0 - 200</span>
                <div class="flex items-center border border-slate-300 rounded-md overflow-hidden bg-slate-100 text-xs">
                  <span class="bg-tertiary/20 text-primary px-2 py-0.5 font-medium border-r border-slate-300">m</span>
                  <span class="px-2 py-0.5 text-slate-400"><i class="bx bx-toggle-right text-base align-middle"></i></span>
                </div>
              </div>
            </div>

            <div class="flex gap-2 justify-end border-t border-slate-100 pt-2">
              <button class="bg-primary hover:bg-primary/95 text-white font-medium py-1.5 px-4 rounded-md transition-colors flex items-center gap-2 shadow-sm text-sm">
                <span>sélection</span>
              </button>
              <button class="bg-primary hover:bg-primary/95 text-white py-1.5 px-3 rounded-md transition-colors flex items-center justify-center shadow-sm text-lg">
                <i class="bx bx-layer"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Panneau Données (droite) -->
        <div
          class="flex-1 bg-white/95 backdrop-blur-md shadow-2xl border border-slate-200 rounded-t-md p-4 overflow-y-auto transition-all duration-300"
          :style="{
            opacity: showDonnees ? 1 : 0,
            transform: showDonnees ? 'translateY(0)' : 'translateY(20px)',
            pointerEvents: showDonnees ? 'auto' : 'none',
            maxHeight: showDonnees ? '50vh' : '0',
            padding: showDonnees ? '1rem' : '0',
          }"
        >
          <div v-if="showDonnees" class="flex flex-col gap-3 text-sm">
            <!-- Contenu du panneau Données -->
            <div class="flex flex-wrap gap-1">
              <button class="border border-primary text-primary font-medium py-1 px-2 rounded-md text-xs bg-white hover:bg-secondary transition-colors">
                Infobulle
              </button>
              <button class="bg-primary hover:bg-primary/90 text-white font-medium py-1 px-2 rounded-md text-xs transition-colors shadow-sm">
                Plan
              </button>
              <button class="bg-primary hover:bg-primary/90 text-white font-medium py-1 px-2 rounded-md text-xs transition-colors shadow-sm">
                drones
              </button>
              <button class="bg-primary hover:bg-primary/90 text-white font-medium py-1 px-2 rounded-md text-xs transition-colors shadow-sm">
                Vols
              </button>
            </div>

            <div class="flex-1 flex flex-col items-center justify-center text-slate-400 gap-2 border-2 border-dashed border-slate-200 rounded-lg p-3 min-h-[80px]">
              <i class="bx bx-file-find text-3xl"></i>
              <span class="text-xs text-center">Aucune donnée sélectionnée pour la Côte d'Ivoire</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Barre d'outils horizontale avec boutons -->
      <div class="pointer-events-auto flex items-center justify-center gap-4 p-2 bg-white/80 backdrop-blur-sm border-t border-slate-200 shadow-inner">
        <button
          @click="toggleCommandes"
          class="flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
          :class="showCommandes ? 'bg-tertiary text-white' : 'bg-primary text-white hover:bg-primary/90'"
        >
          <i class="bx" :class="showCommandes ? 'bx-chevron-down' : 'bx-chevron-up'"></i>
          Commandes
        </button>
        <button
          @click="toggleDonnees"
          class="flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
          :class="showDonnees ? 'bg-tertiary text-white' : 'bg-primary text-white hover:bg-primary/90'"
        >
          <i class="bx" :class="showDonnees ? 'bx-chevron-down' : 'bx-chevron-up'"></i>
          Données
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showCommandes = ref(false)
const showDonnees = ref(false)

const toggleCommandes = () => {
  showCommandes.value = !showCommandes.value
}

const toggleDonnees = () => {
  showDonnees.value = !showDonnees.value
}
</script>

<style scoped>
/* Ajustements éventuels */
button {
  user-select: none;
}
</style>
