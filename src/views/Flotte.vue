<template>
  <div class="space-y-6">
    <!-- Grille supérieure : Profil + Documents -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr,1fr]">
      <!-- Carte Informations personnelles -->
      <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div class="mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
          <i class="bx bx-info-circle text-xl text-blue-800"></i>
          <h2 class="text-lg font-bold text-slate-800">Informations Personnelles</h2>
        </div>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label class="block text-xs font-bold uppercase tracking-wide text-slate-500">Nom Complet</label>
            <div class="mt-1 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700">
              {{ pilotData.fullName }}
            </div>
          </div>
          <div>
            <label class="block text-xs font-bold uppercase tracking-wide text-slate-500">ID Pilote (UAS-CI)</label>
            <div class="mt-1 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-blue-800">
              {{ pilotData.pilotId }}
            </div>
          </div>
          <div>
            <label class="block text-xs font-bold uppercase tracking-wide text-slate-500">Email Professionnel</label>
            <div class="mt-1 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700">
              {{ pilotData.email }}
            </div>
          </div>
          <div>
            <label class="block text-xs font-bold uppercase tracking-wide text-slate-500">Téléphone d'Urgence</label>
            <div class="mt-1 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700">
              {{ pilotData.phone }}
            </div>
          </div>
        </div>
      </div>

      <!-- Carte Documents -->
      <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div class="mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
          <i class="bx bx-file text-xl text-blue-800"></i>
          <h2 class="text-lg font-bold text-slate-800">Documents</h2>
        </div>
        <ul class="space-y-3">
          <li
            v-for="doc in documents"
            :key="doc.id"
            class="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3"
          >
            <i :class="doc.icon" class="text-2xl text-blue-800"></i>
            <div class="flex-1">
              <h4 class="text-sm font-bold text-slate-700">{{ doc.name }}</h4>
              <span
                :class="[
                  'text-xs font-bold uppercase',
                  doc.status === 'Valide' ? 'text-emerald-600' : 'text-amber-600'
                ]"
              >
                {{ doc.status }} {{ doc.expiry ? `(${doc.expiry})` : '' }}
              </span>
            </div>
          </li>
        </ul>
        <button
          @click="uploadDocument"
          class="mt-4 flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-slate-300 py-2 text-xs font-bold uppercase text-slate-500 transition hover:border-blue-800 hover:text-blue-800"
        >
          <i class="bx bx-cloud-upload"></i>
          Téléverser un nouveau document
        </button>
      </div>
    </div>

    <!-- Gestion de la flotte -->
    <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div class="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div class="flex items-center gap-2">
          <i class="bx bx-layer text-xl text-blue-800"></i>
          <h2 class="text-lg font-bold text-slate-800">Gestion de la Flotte</h2>
        </div>
        <button
          @click="addDrone"
          class="rounded-md bg-blue-800 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-900"
        >
          + Enregistrer un drone
        </button>
      </div>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <!-- Carte drone existant -->
        <div
          v-for="drone in drones"
          :key="drone.id"
          class="overflow-hidden rounded-lg border border-slate-200 bg-white"
        >
          <div class="relative flex h-[140px] items-center justify-center bg-slate-50">
            <img :src="drone.image" :alt="drone.name" class="max-h-[100px] w-auto object-contain" />
            <span class="absolute left-2 top-2 rounded bg-blue-800 px-2 py-0.5 text-[10px] font-bold text-white">
              {{ drone.registration }}
            </span>
            <span v-if="drone.ready" class="absolute right-2 top-2 text-emerald-500">
              <i class="bx bx-check-circle text-xl"></i>
            </span>
          </div>
          <div class="p-4">
            <h3 class="text-sm font-bold text-slate-800">{{ drone.name }}</h3>
            <p class="text-xs text-slate-500">SN: {{ drone.serial }}</p>
            <div class="mt-2 flex gap-3 border-t border-slate-100 pt-2 text-xs font-bold text-slate-700">
              <span>Poids: {{ drone.weight }}</span>
              <span>Cat: {{ drone.category }}</span>
            </div>
          </div>
        </div>

        <!-- Carte "Ajouter un drone" -->
        <button
          @click="addDrone"
          class="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 bg-white p-6 transition hover:border-blue-800 hover:text-blue-800"
        >
          <i class="bx bx-plus-circle text-4xl text-slate-400"></i>
          <p class="text-sm font-bold text-slate-600">AJOUTER UN APPAREIL</p>
          <p class="text-xs text-slate-400">Déclarer un nouveau UAS</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// Import des images locales
import drone1Image from '@/assets/images/drone1.jpg'
import drone2Image from '@/assets/images/drone2.jpg'

// Type pour un drone
interface Drone {
  id: number
  name: string
  serial: string
  registration: string
  weight: string
  category: string
  ready: boolean
  image: string
}

// Type pour un document
interface Document {
  id: number
  name: string
  icon: string
  status: 'Valide' | 'Expire bientôt'
  expiry?: string
}

// Données pilote
const pilotData = ref({
  fullName: 'Jean-Marc Dubois',
  pilotId: 'PI-AF-2026-9088',
  email: 'jm.dubois@agence-ivoire.ci',
  phone: '+225 07 01 02 03 04',
})

// Documents
const documents = ref<Document[]>([
  {
    id: 1,
    name: 'Licence de Vol (A1/A3)',
    icon: 'bx bxs-certification',
    status: 'Valide',
    expiry: '2028',
  },
  {
    id: 2,
    name: 'Certificat Médical',
    icon: 'bx bxs-file-plus',
    status: 'Expire bientôt',
    expiry: 'bientôt',
  },
])

// Flotte de drones
const drones = ref<Drone[]>([
  {
    id: 1,
    name: 'DJI Mavic 3 Enterprise',
    serial: '456X-A890-W23',
    registration: 'UAS-AF-900',
    weight: '0.9kg',
    category: 'C2 / Ouverte',
    ready: true,
    image: drone1Image,
  },
  {
    id: 2,
    name: 'DJI Matrice 300 RTK',
    serial: '900Z-M300-RTK',
    registration: 'UAS-AF-902',
    weight: '6.3kg',
    category: 'Spécifique / STS-01',
    ready: false,
    image: drone2Image,
  },
])

// Méthodes
const uploadDocument = () => {
  // Simuler un téléversement
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.pdf,.png,.jpg,.jpeg'
  input.onchange = (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (file) {
      alert(`📁 Fichier "${file.name}" détecté ! Transfert sécurisé vers les serveurs de SCB Drones en cours...`)
      // Ajout fictif dans la liste
      documents.value.push({
        id: Date.now(),
        name: file.name,
        icon: 'bx bxs-file-pdf',
        status: 'Expire bientôt',
        expiry: 'en attente',
      })
    }
  }
  input.click()
}

const addDrone = () => {
  const name = prompt('Entrez le modèle du drone (ex: DJI Air 3) :')
  if (!name) return
  const serial = prompt('Entrez le numéro de série (S/N) :')
  if (!serial) return

  const randomId = Math.floor(100 + Math.random() * 900)
  drones.value.push({
    id: Date.now(),
    name,
    serial,
    registration: `UAS-CI-${randomId}`,
    weight: 'En attente',
    category: 'À valider',
    ready: false,
    image: 'https://assets.djiupload.com/uploads/pbc/723df7a76059d042ee850b168677c3fc.png', // placeholder
  })
  alert(`🚀 Le drone ${name} a été soumis pour enregistrement sur votre profil.`)
}
</script>
