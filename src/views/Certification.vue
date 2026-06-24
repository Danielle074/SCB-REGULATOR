<template>
  <div class="space-y-6">
    <!-- Grille supérieure : formulaire + récapitulatif -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-[360px,1fr]">
      <!-- Carte : Demander une certification -->
      <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div class="mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
          <i class="bx bx-file-blank text-xl text-blue-800"></i>
          <h2 class="text-lg font-bold text-slate-800">Demander une certification</h2>
        </div>

        <form @submit.prevent="submitCertification" class="space-y-4">
          <div>
            <label class="block text-xs font-bold uppercase tracking-wide text-slate-500">
              Type de certification
            </label>
            <select
              v-model="form.certType"
              required
              class="mt-1 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">-- Sélectionner --</option>
              <option v-for="type in certTypes" :key="type" :value="type">
                {{ type }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wide text-slate-500">
              Niveau / Spécialité
            </label>
            <input
              v-model="form.specialty"
              type="text"
              placeholder="ex. Niveau avancé, RTK, etc."
              class="mt-1 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wide text-slate-500">
                Date d'obtention
              </label>
              <input
                v-model="form.obtentionDate"
                type="date"
                required
                class="mt-1 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wide text-slate-500">
                Date d'expiration
              </label>
              <input
                v-model="form.expirationDate"
                type="date"
                class="mt-1 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wide text-slate-500">
              Pièce justificative (PDF, image)
            </label>
            <input
              type="file"
              accept=".pdf,.jpg,.png"
              @change="handleFileUpload"
              class="mt-1 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm file:mr-3 file:rounded file:border-0 file:bg-blue-50 file:px-3 file:py-1 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <button
            type="submit"
            class="mt-2 flex w-full items-center justify-center gap-2 rounded-md bg-blue-800 py-2.5 text-sm font-bold text-white transition hover:bg-blue-900"
          >
            <i class="bx bx-send"></i>
            Soumettre la demande
          </button>
        </form>
      </div>

      <!-- Carte : Récapitulatif des certifications -->
      <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div class="mb-4 flex items-center justify-between border-b border-slate-100 pb-2">
          <div class="flex items-center gap-2">
            <i class="bx bx-stats text-xl text-blue-800"></i>
            <h2 class="text-lg font-bold text-slate-800">Mon tableau de bord certifications</h2>
          </div>
          <span class="text-[10px] font-bold uppercase text-slate-400">Mise à jour : aujourd'hui</span>
        </div>

        <div class="space-y-4">
          <div v-for="stat in stats" :key="stat.label" class="flex items-center justify-between border-b border-slate-100 pb-2 last:border-0 last:pb-0">
            <span class="flex items-center gap-2 text-sm font-semibold text-slate-600">
              <i :class="stat.icon" :style="{ color: stat.iconColor }"></i>
              {{ stat.label }}
            </span>
            <span class="flex items-center gap-2 text-sm font-bold text-blue-800">
              {{ stat.value }}
              <span v-if="stat.badge" class="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                {{ stat.badge }}
              </span>
            </span>
          </div>

          <div class="mt-2">
            <div class="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>Progression globale</span>
              <span>{{ overallProgress }} %</span>
            </div>
            <div class="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                class="h-full rounded-full bg-blue-800 transition-all duration-500"
                :style="{ width: overallProgress + '%' }"
              ></div>
            </div>
          </div>
        </div>

        <div class="mt-4 flex flex-wrap gap-2">
          <button class="rounded-full bg-blue-100 px-4 py-1.5 text-xs font-bold text-blue-800 transition hover:bg-blue-200">
            <i class="bx bx-download mr-1"></i> Exporter mon dossier
          </button>
          <button @click="refreshStats" class="rounded-full bg-slate-100 px-4 py-1.5 text-xs font-bold text-slate-600 transition hover:bg-slate-200">
            <i class="bx bx-refresh mr-1"></i> Mettre à jour
          </button>
        </div>
      </div>
    </div>

    <!-- Carte : Registre des certifications -->
    <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div class="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div class="flex items-center gap-2">
          <i class="bx bx-list-ul text-xl text-blue-800"></i>
          <h2 class="text-lg font-bold text-slate-800">Registre des certifications</h2>
        </div>
        <div class="flex items-center gap-4">
          <button @click="printList" class="text-xs font-bold uppercase text-blue-800 hover:underline">
            <i class="bx bx-printer mr-1"></i> Imprimer
          </button>
          <span class="text-xs font-bold text-slate-400">TOTAL : {{ certifications.length }} CERTIFICATIONS</span>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="border-b-2 border-slate-200 bg-slate-50">
            <tr>
              <th class="px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">N° Certificat</th>
              <th class="px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Type / Spécialité</th>
              <th class="px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Date obtention</th>
              <th class="px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Expiration</th>
              <th class="px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Statut</th>
              <th class="px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cert in certifications" :key="cert.id" class="border-b border-slate-100">
              <td class="px-4 py-3 font-bold text-slate-700">{{ cert.reference }}</td>
              <td class="px-4 py-3">
                <span class="font-medium text-slate-700">{{ cert.type }}</span>
                <br />
                <span class="text-xs text-slate-400">{{ cert.specialty }}</span>
              </td>
              <td class="px-4 py-3 text-slate-600">{{ cert.obtentionDate }}</td>
              <td class="px-4 py-3 text-slate-600">{{ cert.expirationDate || '—' }}</td>
              <td class="px-4 py-3">
                <span
                  class="inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase"
                  :class="statusClass(cert.status)"
                >
                  {{ cert.status }}
                </span>
              </td>
              <td class="px-4 py-3">
                <button @click="viewCert(cert)" class="text-lg text-blue-800 hover:text-blue-600" title="Voir">
                  <i class="bx bx-show"></i>
                </button>
                <button @click="editCert(cert)" class="ml-2 text-lg text-blue-800 hover:text-blue-600" title="Éditer">
                  <i class="bx bx-edit"></i>
                </button>
                <button
                  v-if="cert.status === 'Expiré'"
                  @click="renewCert(cert)"
                  class="ml-2 text-lg text-amber-500 hover:text-amber-600"
                  title="Renouveler"
                >
                  <i class="bx bx-refresh"></i>
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
import { ref, reactive, computed } from 'vue'

// Types
interface Certification {
  id: number
  reference: string
  type: string
  specialty: string
  obtentionDate: string
  expirationDate: string | null
  status: 'Valide' | 'Expiré' | 'En cours' | 'Renouvellement'
}

interface StatItem {
  label: string
  icon: string
  iconColor: string
  value: number
  badge?: string
}

// Données du formulaire
const form = reactive({
  certType: '',
  specialty: '',
  obtentionDate: '',
  expirationDate: '',
  file: null as File | null,
})

const certTypes = [
  'Pilote – Catégorie A1/A3',
  'Pilote – Catégorie A2',
  'Pilote – Catégorie Spécifique (STS)',
  'Maintenance & Réparation',
  'Exploitant – Certificat d\'Opérateur',
]

// Gestion du fichier
const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    form.file = input.files[0]
  }
}

// Soumission
const submitCertification = () => {
  if (!form.certType) {
    alert('Veuillez sélectionner un type de certification.')
    return
  }
  alert('✅ Demande de certification soumise avec succès !\nUn responsable SCB Drones vous contactera sous 48h.')
  // Réinitialisation
  form.certType = ''
  form.specialty = ''
  form.obtentionDate = ''
  form.expirationDate = ''
  form.file = null
}

// Statistiques
const stats = ref<StatItem[]>([
  { label: 'Certifications valides', icon: 'bx bx-check-circle', iconColor: '#10b981', value: 4, badge: '+1 cette année' },
  { label: 'En cours de renouvellement', icon: 'bx bx-time', iconColor: '#f59e0b', value: 2 },
  { label: 'Expirées', icon: 'bx bx-x-circle', iconColor: '#ef4444', value: 1 },
  { label: 'En attente de validation', icon: 'bx bx-hourglass', iconColor: '#3b82f6', value: 1 },
])

const overallProgress = computed(() => {
  const total = stats.value.reduce((acc, s) => acc + s.value, 0)
  const valid = stats.value[0].value // valides
  return total > 0 ? Math.round((valid / total) * 100) : 0
})

const refreshStats = () => {
  alert('🔄 Mise à jour des statistiques (simulation).')
}

// Liste des certifications
const certifications = ref<Certification[]>([
  {
    id: 1,
    reference: 'CERT-2024-012',
    type: 'Pilote A1/A3',
    specialty: 'Niveau avancé',
    obtentionDate: '15/01/2024',
    expirationDate: '15/01/2027',
    status: 'Valide',
  },
  {
    id: 2,
    reference: 'CERT-2024-008',
    type: 'Pilote STS (Spécifique)',
    specialty: 'Catégorie A2',
    obtentionDate: '10/02/2024',
    expirationDate: '10/02/2026',
    status: 'Valide',
  },
  {
    id: 3,
    reference: 'CERT-2023-045',
    type: 'Exploitant – Opérateur',
    specialty: 'Catégorie Spécifique',
    obtentionDate: '05/06/2023',
    expirationDate: '05/06/2025',
    status: 'Renouvellement',
  },
  {
    id: 4,
    reference: 'CERT-2024-002',
    type: 'Maintenance & Réparation',
    specialty: 'Certifié DJI',
    obtentionDate: '20/03/2024',
    expirationDate: '20/03/2026',
    status: 'En cours',
  },
  {
    id: 5,
    reference: 'CERT-2022-099',
    type: 'Pilote A1/A3',
    specialty: 'Niveau débutant',
    obtentionDate: '12/08/2022',
    expirationDate: '12/08/2024',
    status: 'Expiré',
  },
  {
    id: 6,
    reference: 'CERT-2024-019',
    type: 'Formation Continue',
    specialty: 'Nouveau module RTK',
    obtentionDate: '01/04/2024',
    expirationDate: null,
    status: 'Valide',
  },
])

// Classes de statut
const statusClass = (status: string) => {
  const classes: Record<string, string> = {
    Valide: 'bg-emerald-100 text-emerald-700',
    Expiré: 'bg-red-100 text-red-700',
    'En cours': 'bg-amber-100 text-amber-700',
    Renouvellement: 'bg-blue-100 text-blue-700',
  }
  return classes[status] || 'bg-slate-100 text-slate-600'
}

// Actions
const viewCert = (cert: Certification) => {
  alert(`👁️ Affichage des détails de ${cert.reference}`)
}

const editCert = (cert: Certification) => {
  alert(`✏️ Édition de la certification ${cert.reference}`)
}

const renewCert = (cert: Certification) => {
  alert(`🔄 Demande de renouvellement envoyée pour ${cert.reference}`)
}

const printList = () => {
  alert('🖨️ Impression du registre des certifications (simulation).')
}
</script>
