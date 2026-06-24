<template>
  <div class="space-y-6">
    <!-- Grille supérieure : Activité + Alertes -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-[2fr,1fr]">
      <!-- Carte Activité -->
      <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div class="mb-5 flex items-center justify-between">
          <h2 class="text-lg font-semibold text-slate-800">Activité Récente</h2>
          <span class="rounded bg-blue-50 px-3 py-1 text-xs font-bold uppercase text-blue-700">Pilote Certifié</span>
        </div>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div class="rounded-lg border border-slate-100 bg-slate-50 p-4">
            <p class="text-xs font-bold uppercase tracking-wide text-slate-500">Vols Totaux</p>
            <p class="mt-1 flex items-baseline gap-1 text-2xl font-bold text-slate-800">
              {{ stats.totalFlights }}
              <span class="text-sm font-semibold text-emerald-500">+{{ stats.flightsGrowth }}%</span>
            </p>
          </div>
          <div class="rounded-lg border border-slate-100 bg-slate-50 p-4">
            <p class="text-xs font-bold uppercase tracking-wide text-slate-500">Heures de Vol</p>
            <p class="mt-1 flex items-baseline gap-1 text-2xl font-bold text-slate-800">
              {{ stats.totalHours }}
              <span class="text-sm font-semibold text-slate-500">hrs</span>
            </p>
          </div>
          <div class="rounded-lg border border-slate-100 bg-slate-50 p-4">
            <p class="text-xs font-bold uppercase tracking-wide text-slate-500">Distance</p>
            <p class="mt-1 flex items-baseline gap-1 text-2xl font-bold text-slate-800">
              {{ stats.totalDistance }}
              <span class="text-sm font-semibold text-slate-500">km</span>
            </p>
          </div>
        </div>
      </div>

      <!-- Carte Alertes Documents -->
      <div class="rounded-xl border border-red-200 bg-white p-6 shadow-sm">
        <div class="mb-4 flex items-center gap-2">
          <i class="bx bx-error-circle text-2xl text-red-700"></i>
          <h2 class="text-lg font-semibold text-red-700">Alertes Documents</h2>
        </div>
        <div class="mb-4 flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-3">
          <i class="bx bx-id-card text-2xl text-red-500"></i>
          <div>
            <h4 class="text-sm font-semibold text-slate-700">Licence Drone A1/A3</h4>
            <p class="text-xs font-medium text-red-500">Expire dans 8 jours</p>
          </div>
        </div>
        <button
          @click="renewAlert"
          class="w-full rounded-md border border-red-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-red-700 transition hover:bg-red-700 hover:text-white"
        >
          Renouveler maintenant
        </button>
      </div>
    </div>

    <!-- Tableau des plans de vol -->
    <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-lg font-semibold text-slate-800">Statut des Plans de Vol</h2>
        <router-link to="/plans" class="text-xs font-bold uppercase text-blue-800 hover:underline">Voir Tout</router-link>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead>
            <tr class="border-b border-slate-200 bg-slate-50 text-xs font-bold uppercase tracking-wide text-slate-600">
              <th class="px-4 py-3">Mission ID</th>
              <th class="px-4 py-3">Lieu / Zone</th>
              <th class="px-4 py-3">Date</th>
              <th class="px-4 py-3">Drone</th>
              <th class="px-4 py-3">Statut</th>
              <th class="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="flight in flights" :key="flight.id" class="border-b border-slate-100">
              <td class="px-4 py-3 font-semibold text-slate-700">{{ flight.id }}</td>
              <td class="px-4 py-3 text-slate-600">{{ flight.zone }}</td>
              <td class="px-4 py-3 text-slate-600">{{ flight.date }}</td>
              <td class="px-4 py-3 text-slate-600">{{ flight.drone }}</td>
              <td class="px-4 py-3">
                <span
                  :class="{
                    'bg-emerald-100 text-emerald-800': flight.status === 'Validé',
                    'bg-blue-100 text-blue-800': flight.status === 'Soumis',
                    'bg-slate-100 text-slate-600': flight.status === 'Exécuté'
                  }"
                  class="inline-block rounded px-2 py-1 text-xs font-bold uppercase"
                >
                  {{ flight.status }}
                </span>
              </td>
              <td class="px-4 py-3">
                <button @click="handleAction(flight)" class="text-xl text-blue-800 hover:text-blue-600">
                  <i v-if="flight.status === 'Validé'" class="bx bx-export"></i>
                  <i v-else-if="flight.status === 'Soumis'" class="bx bx-edit-alt"></i>
                  <i v-else class="bx bx-show"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Ma Flotte Active -->
    <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-lg font-semibold text-slate-800">Ma Flotte Active</h2>
        <router-link to="/flotte" class="text-xs font-bold uppercase text-blue-800 hover:underline">Gérer les appareils</router-link>
      </div>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div
          v-for="drone in drones"
          :key="drone.id"
          class="rounded-lg border border-slate-200 bg-white p-4 transition hover:shadow-md"
        >
          <div class="relative mb-3 flex h-[110px] items-center justify-center rounded-lg bg-slate-50">
            <img :src="drone.image" :alt="drone.name" class="max-h-[85px] w-auto object-contain" />
            <span
              :class="{
                'bg-emerald-100 text-emerald-800': drone.status === 'En Ligne',
                'bg-amber-100 text-amber-800': drone.status === 'Maintenance'
              }"
              class="absolute right-2 top-2 rounded px-2 py-0.5 text-[10px] font-bold uppercase"
            >
              {{ drone.status }}
            </span>
          </div>
          <h3 class="text-sm font-bold text-slate-800">{{ drone.name }}</h3>
          <div class="mt-1 flex items-center justify-between text-xs text-slate-500">
            <span>Batterie</span>
            <span class="font-semibold text-slate-700">{{ drone.battery }}%</span>
          </div>
          <div class="mt-1 h-1.5 w-full rounded-full bg-slate-200">
            <div
              class="h-1.5 rounded-full"
              :class="{
                'bg-blue-800': drone.battery >= 60,
                'bg-amber-500': drone.battery >= 30 && drone.battery < 60,
                'bg-red-500': drone.battery < 30
              }"
              :style="{ width: drone.battery + '%' }"
            ></div>
          </div>
          <p class="mt-2 text-[10px] text-slate-400">Dernier Vol: {{ drone.lastFlight }}</p>
        </div>

        <!-- Carte Ajouter un drone -->
        <button
          @click="addDrone"
          class="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 bg-white p-4 transition hover:border-blue-800 hover:bg-slate-50"
        >
          <i class="bx bx-plus-circle text-4xl text-slate-400 group-hover:text-blue-800"></i>
          <p class="text-sm font-semibold text-slate-600">AJOUTER UN DRONE</p>
          <span class="text-[10px] font-normal text-slate-400">Déclarer un nouvel appareil</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// Import des images (remplacez par vos propres chemins)
import drone1 from '@/assets/images/drone1.jpg'
import drone2 from '@/assets/images/drone2.jpg'
import drone3 from '@/assets/images/drone3.jpg'

// ---- Données fictives ----
const stats = ref({
  totalFlights: 142,
  flightsGrowth: 12,
  totalHours: 56.4,
  totalDistance: 840
})

const flights = ref([
  {
    id: 'FP-2026-089',
    zone: 'Zone Urbaine A (Plateau)',
    date: "Aujourd'hui, 14:30",
    drone: 'DJI Matrice 300',
    status: 'Validé'
  },
  {
    id: 'FP-2026-090',
    zone: 'Périphérie Sud (Zone B)',
    date: 'Demain, 09:00',
    drone: 'Mavic 3 Enterprise',
    status: 'Soumis'
  },
  {
    id: 'FP-2026-088',
    zone: 'Inspection Portuaire',
    date: 'Hier, 16:00',
    drone: 'DJI Matrice 300',
    status: 'Exécuté'
  }
])

const drones = ref([
  {
    id: 1,
    name: 'DJI Matrice 300 RTK',
    status: 'En Ligne',
    battery: 88,
    lastFlight: '24/05/2026',
    image: drone1
  },
  {
    id: 2,
    name: 'Mavic 3 Enterprise',
    status: 'Maintenance',
    battery: 12,
    lastFlight: '18/05/2026',
    image: drone2
  },
  {
    id: 3,
    name: 'eBee X Mapping',
    status: 'En Ligne',
    battery: 100,
    lastFlight: '02/06/2026',
    image: drone3
  }
])

// ---- Méthodes ----
const renewAlert = () => {
  alert('🔄 Redirection vers le portail de renouvellement des certifications.')
}

const handleAction = (flight: any) => {
  alert(`📄 Action déclenchée sur la mission ${flight.id}.`)
}

const addDrone = () => {
  alert('🛸 Ouverture du formulaire d\'ajout de drone.')
}
</script>
