<template>
  <div class="space-y-6">
    <!-- En-tête de la page -->
    <div>
      <h1 class="text-2xl font-bold text-slate-800">Paramètres</h1>
      <p class="text-sm text-slate-500">Gérez vos préférences et informations personnelles</p>
    </div>

    <!-- Grille des paramètres -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <!-- Menu latéral (onglets) -->
      <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <nav class="flex flex-col space-y-1">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            @click="activeTab = tab.key"
            class="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition"
            :class="[
              activeTab === tab.key
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
            ]"
          >
            <i :class="tab.icon" class="text-xl"></i>
            {{ tab.label }}
          </button>
        </nav>
      </div>

      <!-- Contenu des onglets -->
      <div class="lg:col-span-2">
        <!-- Profil -->
        <div v-if="activeTab === 'profil'" class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 class="mb-4 text-lg font-bold text-slate-800">Profil</h2>
          <form @submit.prevent="saveProfile" class="space-y-4">
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label class="block text-xs font-bold uppercase tracking-wide text-slate-500">Nom complet</label>
                <input
                  v-model="profile.fullName"
                  type="text"
                  class="mt-1 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div>
                <label class="block text-xs font-bold uppercase tracking-wide text-slate-500">Email</label>
                <input
                  v-model="profile.email"
                  type="email"
                  class="mt-1 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wide text-slate-500">Téléphone</label>
              <input
                v-model="profile.phone"
                type="tel"
                class="mt-1 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wide text-slate-500">Avatar</label>
              <div class="mt-1 flex items-center gap-4">
                <img :src="profile.avatar" alt="Avatar" class="h-16 w-16 rounded-full border-2 border-blue-800 object-cover" />
                <button type="button" class="rounded-md bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200">
                  Changer l'avatar
                </button>
              </div>
            </div>
            <div class="flex gap-3 pt-2">
              <button type="submit" class="rounded-md bg-blue-800 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-900">
                Enregistrer
              </button>
              <button type="reset" class="rounded-md border border-slate-300 px-6 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
                Annuler
              </button>
            </div>
          </form>
        </div>

        <!-- Sécurité -->
        <div v-if="activeTab === 'securite'" class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 class="mb-4 text-lg font-bold text-slate-800">Sécurité</h2>
          <form @submit.prevent="changePassword" class="space-y-4">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wide text-slate-500">Mot de passe actuel</label>
              <div class="relative mt-1">
                <input
                  v-model="security.currentPassword"
                  :type="showCurrentPassword ? 'text' : 'password'"
                  required
                  class="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 pr-10 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
                <button
                  type="button"
                  class="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-blue-600"
                  @click="showCurrentPassword = !showCurrentPassword"
                >
                  <i :class="showCurrentPassword ? 'bx-hide' : 'bx-show-alt'" class="text-xl"></i>
                </button>
              </div>
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wide text-slate-500">Nouveau mot de passe</label>
              <div class="relative mt-1">
                <input
                  v-model="security.newPassword"
                  :type="showNewPassword ? 'text' : 'password'"
                  required
                  class="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 pr-10 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
                <button
                  type="button"
                  class="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-blue-600"
                  @click="showNewPassword = !showNewPassword"
                >
                  <i :class="showNewPassword ? 'bx-hide' : 'bx-show-alt'" class="text-xl"></i>
                </button>
              </div>
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wide text-slate-500">Confirmer le mot de passe</label>
              <div class="relative mt-1">
                <input
                  v-model="security.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  required
                  class="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 pr-10 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
                <button
                  type="button"
                  class="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-blue-600"
                  @click="showConfirmPassword = !showConfirmPassword"
                >
                  <i :class="showConfirmPassword ? 'bx-hide' : 'bx-show-alt'" class="text-xl"></i>
                </button>
              </div>
            </div>
            <button type="submit" class="rounded-md bg-blue-800 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-900">
              Changer le mot de passe
            </button>
          </form>
        </div>

        <!-- Notifications -->
        <div v-if="activeTab === 'notifications'" class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 class="mb-4 text-lg font-bold text-slate-800">Notifications</h2>
          <div class="space-y-3">
            <div v-for="(notif, index) in notifications" :key="index" class="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0">
              <div>
                <p class="font-medium text-slate-700">{{ notif.label }}</p>
                <p class="text-xs text-slate-400">{{ notif.description }}</p>
              </div>
              <label class="relative inline-flex cursor-pointer items-center">
                <input v-model="notif.enabled" type="checkbox" class="peer sr-only" />
                <div class="h-6 w-11 rounded-full bg-slate-300 peer-checked:bg-blue-800 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-full"></div>
              </label>
            </div>
          </div>
          <button @click="saveNotifications" class="mt-4 rounded-md bg-blue-800 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-900">
            Enregistrer les préférences
          </button>
        </div>

        <!-- Préférences -->
        <div v-if="activeTab === 'preferences'" class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 class="mb-4 text-lg font-bold text-slate-800">Préférences</h2>
          <div class="space-y-3">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <p class="font-medium text-slate-700">Thème sombre</p>
                <p class="text-xs text-slate-400">Activer le mode sombre sur l'application</p>
              </div>
              <label class="relative inline-flex cursor-pointer items-center">
                <input v-model="preferences.darkMode" type="checkbox" class="peer sr-only" />
                <div class="h-6 w-11 rounded-full bg-slate-300 peer-checked:bg-blue-800 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-full"></div>
              </label>
            </div>
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <p class="font-medium text-slate-700">Langue</p>
                <p class="text-xs text-slate-400">Choisissez votre langue préférée</p>
              </div>
              <select v-model="preferences.language" class="rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm outline-none focus:border-blue-600">
                <option value="fr">Français</option>
                <option value="en">Anglais</option>
                <option value="es">Espagnol</option>
              </select>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium text-slate-700">Affichage compact</p>
                <p class="text-xs text-slate-400">Réduire les espaces dans les tableaux</p>
              </div>
              <label class="relative inline-flex cursor-pointer items-center">
                <input v-model="preferences.compact" type="checkbox" class="peer sr-only" />
                <div class="h-6 w-11 rounded-full bg-slate-300 peer-checked:bg-blue-800 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-full"></div>
              </label>
            </div>
          </div>
          <button @click="savePreferences" class="mt-4 rounded-md bg-blue-800 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-900">
            Enregistrer les préférences
          </button>
        </div>

        <!-- Compte -->
        <div v-if="activeTab === 'compte'" class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 class="mb-4 text-lg font-bold text-red-600">Supprimer le compte</h2>
          <p class="text-sm text-slate-600">
            La suppression de votre compte est définitive. Toutes vos données seront effacées et vous ne pourrez plus accéder au portail.
          </p>
          <div class="mt-4 flex items-center gap-3">
            <input v-model="confirmDelete" type="checkbox" id="confirmDelete" class="h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-500" />
            <label for="confirmDelete" class="text-sm text-slate-600">
              Je comprends que cette action est irréversible.
            </label>
          </div>
          <button
            @click="deleteAccount"
            :disabled="!confirmDelete"
            class="mt-4 rounded-md bg-red-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Supprimer mon compte
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// Onglets
const tabs = [
  { key: 'profil', label: 'Profil', icon: 'bx bx-user' },
  { key: 'securite', label: 'Sécurité', icon: 'bx bx-shield-alt' },
  { key: 'notifications', label: 'Notifications', icon: 'bx bx-bell' },
  { key: 'preferences', label: 'Préférences', icon: 'bx bx-slider' },
  { key: 'compte', label: 'Compte', icon: 'bx bx-trash' },
]
const activeTab = ref('profil')

// Profil
const profile = reactive({
  fullName: 'Jean-Marc Dubois',
  email: 'jm.dubois@agence-ivoire.ci',
  phone: '+225 07 01 02 03 04',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop',
})

const saveProfile = () => {
  alert('✅ Profil mis à jour avec succès.')
}

// Sécurité
const security = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

const changePassword = () => {
  if (security.newPassword !== security.confirmPassword) {
    alert('Les mots de passe ne correspondent pas.')
    return
  }
  alert('🔒 Mot de passe changé avec succès.')
  security.currentPassword = ''
  security.newPassword = ''
  security.confirmPassword = ''
}

// Notifications
const notifications = ref([
  { label: 'Rappels de certification', description: 'Recevoir un rappel avant expiration', enabled: true },
  { label: 'Nouveaux plans de vol', description: 'Alerte lorsque des plans sont soumis', enabled: false },
  { label: 'Maintenance de flotte', description: 'Notifications pour l\'entretien des drones', enabled: true },
])

const saveNotifications = () => {
  alert('🔔 Préférences de notifications enregistrées.')
}

// Préférences
const preferences = reactive({
  darkMode: false,
  language: 'fr',
  compact: true,
})

const savePreferences = () => {
  alert('⚙️ Préférences enregistrées avec succès.')
}

// Suppression de compte
const confirmDelete = ref(false)

const deleteAccount = () => {
  if (confirmDelete.value) {
    if (confirm('Êtes-vous sûr de vouloir supprimer définitivement votre compte ?')) {
      alert('🗑️ Votre compte a été supprimé.')
      // Redirection vers login
    }
  }
}
</script>
