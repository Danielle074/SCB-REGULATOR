<template>
  <div class="space-y-6">
    <!-- Grille supérieure : formulaire + carte -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-[360px,1fr]">
      <!-- Carte Formulaire -->
      <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div class="mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
          <i class="bx bx-paper-plane text-xl text-blue-800"></i>
          <h2 class="text-lg font-bold text-slate-800">Nouvelle Soumission</h2>
        </div>

        <form @submit.prevent="submitFlightPlan" class="space-y-4">
          <div>
            <label class="block text-xs font-bold uppercase tracking-wide text-slate-500">
              Type de Mission
            </label>
            <select
              v-model="form.missionType"
              required
              class="mt-1 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            >
              <option v-for="type in missionTypes" :key="type" :value="type">
                {{ type }}
              </option>
            </select>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wide text-slate-500">
                Date Prévue
              </label>
              <input
                v-model="form.date"
                type="date"
                required
                class="mt-1 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wide text-slate-500">
                Heure Décollage
              </label>
              <input
                v-model="form.time"
                type="time"
                required
                class="mt-1 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wide text-slate-500">
              Drone Utilisé
            </label>
            <select
              v-model="form.drone"
              required
              class="mt-1 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            >
              <option v-for="drone in drones" :key="drone.id" :value="drone.name">
                {{ drone.name }} - {{ drone.registration }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wide text-slate-500">
              Altitude Max (m) : <span class="text-blue-800">{{ form.altitude }}</span>m
            </label>
            <input
              v-model="form.altitude"
              type="range"
              min="0"
              max="120"
              class="mt-1 w-full accent-blue-800"
            />
          </div>

          <button
            type="submit"
            class="mt-2 w-full rounded-md bg-blue-800 py-2.5 text-sm font-bold text-white transition hover:bg-blue-900"
          >
            Soumettre le Plan de Vol
          </button>
        </form>
      </div>

      <!-- Carte Trajectoire -->
      <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div class="mb-3 flex items-center justify-between border-b border-slate-100 pb-2">
          <div class="flex items-center gap-2">
            <i class="bx bx-map-pin text-xl text-blue-800"></i>
            <h2 class="text-lg font-bold text-slate-800">Trajectoire de Vol</h2>
          </div>
          <span class="text-[10px] font-bold uppercase tracking-widest text-slate-400">UNITÉ : MÉTRIQUE</span>
        </div>

        <div
          class="relative h-[360px] w-full overflow-hidden rounded-lg border border-slate-200"
          :style="{ backgroundImage: `url(${mapImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
        >
          <!-- Overlay pour lisibilité (optionnel) -->
          <div class="absolute inset-0 bg-black/5"></div>

          <!-- Outils carte -->
          <div class="absolute left-3 top-3 flex gap-2">
            <button
              v-for="tool in mapTools"
              :key="tool.label"
              @click="setActiveTool(tool)"
              class="rounded-md border bg-white px-3 py-1.5 text-[10px] font-bold uppercase shadow-sm transition"
              :class="[
                activeTool === tool.label
                  ? 'border-blue-800 bg-blue-800 text-white'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50',
                tool.danger ? 'border-red-200 text-red-600 hover:bg-red-50' : ''
              ]"
            >
              {{ tool.label }}
            </button>
          </div>

          <!-- Coordonnées -->
          <div class="absolute bottom-3 left-3 rounded-md bg-white/90 px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm">
            COORD: 45.3854° N, 2.2345° E <br />
            ZONE : UF-B (450m²)
          </div>
        </div>
      </div>
    </div>

    <!-- Registre des plans de vol -->
    <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div class="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div class="flex items-center gap-2">
          <i class="bx bx-list-ul text-xl text-blue-800"></i>
          <h2 class="text-lg font-bold text-slate-800">Registre des Plans de Vol</h2>
        </div>
        <div class="flex items-center gap-4">
          <button
            @click="exportReport"
            class="text-xs font-bold uppercase text-blue-800 hover:underline"
          >
            <i class="bx bx-export mr-1"></i> Exporter le rapport PDF
          </button>
          <span class="text-xs font-bold text-slate-400">TOTAL : {{ flightPlans.length }} PLANS</span>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="border-b-2 border-slate-200 bg-slate-50">
            <tr>
              <th class="px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Référence</th>
              <th class="px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Mission / Date & Heure</th>
              <th class="px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Drone</th>
              <th class="px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Statut</th>
              <th class="px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="plan in flightPlans" :key="plan.id" class="border-b border-slate-100">
              <td class="px-4 py-3 font-bold text-slate-700">{{ plan.reference }}</td>
              <td class="px-4 py-3">
                <span class="font-medium text-slate-700">{{ plan.mission }}</span>
                <br />
                <span class="text-xs text-slate-400">{{ plan.dateTime }}</span>
              </td>
              <td class="px-4 py-3 text-slate-600">{{ plan.drone }}</td>
              <td class="px-4 py-3">
                <span
                  class="inline-block rounded px-2 py-1 text-[10px] font-bold uppercase"
                  :class="{
                    'bg-blue-100 text-blue-700': plan.status === 'Soumis',
                    'bg-slate-100 text-slate-600': plan.status === 'Exécuté',
                    'bg-emerald-100 text-emerald-700': plan.status === 'Validé'
                  }"
                >
                  {{ plan.status }}
                </span>
                <i
                  v-if="plan.status === 'Exécuté'"
                  class="bx bx-check-circle ml-1 text-emerald-500"
                ></i>
              </td>
              <td class="px-4 py-3">
                <button @click="viewPlan(plan)" class="text-xl text-blue-800 hover:text-blue-600">
                  <i class="bx bx-show"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
// Import de l'image pour la carte
import mapImage from '@/assets/images/drone3.jpg'

// Types
interface Drone {
  id: number
  name: string
  registration: string
}

interface FlightPlan {
  id: number
  reference: string
  mission: string
  dateTime: string
  drone: string
  status: 'Soumis' | 'Exécuté' | 'Validé'
}

interface MapTool {
  label: string
  danger?: boolean
}

// Données du formulaire
const form = reactive({
  missionType: 'Surveillance Agricole',
  date: '',
  time: '',
  drone: 'DJI Mavic 3 Enterprise - UAS-AF-900',
  altitude: 60,
})

// Options des selects
const missionTypes = [
  'Surveillance Agricole',
  'Inspection de Toiture',
  'Photogrammétrie Urbaine',
  'Livraison Médicale',
  'Cartographie Forêt',
]

const drones = ref<Drone[]>([
  { id: 1, name: 'DJI Mavic 3 Enterprise', registration: 'UAS-AF-900' },
  { id: 2, name: 'DJI Matrice 300 RTK', registration: 'UAS-AF-902' },
  { id: 3, name: 'WingtraOne Gen II', registration: 'UAS-AF-905' },
])

// Outils de la carte
const mapTools: MapTool[] = [
  { label: 'Outil Polygone' },
  { label: 'Waypoints' },
  { label: 'No-Fly Zone', danger: true },
]
const activeTool = ref('Outil Polygone')

// Liste des plans de vol
const flightPlans = ref<FlightPlan[]>([
  {
    id: 1,
    reference: '#PLN-2024-0031',
    mission: 'Inspection Telecom Tower',
    dateTime: '24 Oct 2024 - 09:00',
    drone: 'DJI Matrice 300',
    status: 'Soumis',
  },
  {
    id: 2,
    reference: '#PLN-2024-0029',
    mission: 'Cartographie Forêt Est',
    dateTime: '22 Oct 2024 - 14:30',
    drone: 'WingtraOne Gen II',
    status: 'Exécuté',
  },
  {
    id: 3,
    reference: '#PLN-2024-0024',
    mission: 'Livraison Médicale Hôpital',
    dateTime: '21 Oct 2024 - 10:15',
    drone: 'DJI M30 RTK',
    status: 'Exécuté',
  },
])

// Méthodes
const submitFlightPlan = () => {
  alert(`🚀 Plan de vol soumis avec succès pour validation auprès de SCB Drones !\nMission : ${form.missionType}\nDrone : ${form.drone}\nAltitude : ${form.altitude}m`)
  // Vous pourriez ajouter le nouveau plan à la liste ici
}

const setActiveTool = (tool: MapTool) => {
  if (!tool.danger) {
    activeTool.value = tool.label
  } else {
    alert('⛔ Zone No-Fly activée (simulation)')
  }
}

const exportReport = () => {
  alert('📄 Export du rapport PDF des plans de vol en cours...')
}

const viewPlan = (plan: FlightPlan) => {
  alert(`🔍 Détails du plan : ${plan.reference} - ${plan.mission}`)
}
</script>
