<template>
  <div class="flex min-h-screen w-full overflow-hidden">
    <!-- Partie gauche : visuel et informations -->
    <div
      class="relative hidden w-[55%] flex-col justify-center bg-cover bg-center px-12 py-16 text-white lg:flex"
      :style="{ backgroundImage: `url(${loginBg})` }"
    >
      <div class="absolute inset-0 bg-black/55 z-0"></div>
      <div class="relative z-10 max-w-md space-y-6">
        <h1 class="text-4xl font-bold tracking-tight drop-shadow-lg">Créer un compte Pilote</h1>
        <p class="text-lg text-slate-200/90 drop-shadow">
          Rejoignez le réseau SCB Drones pour gérer vos autorisations de vol et votre flotte d'UAS en toute conformité.
        </p>

        <div class="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition hover:bg-white/10 hover:scale-[1.02]">
          <div class="rounded-full bg-blue-500/20 p-3">
            <i class="bx bx-user-check text-2xl text-blue-300"></i>
          </div>
          <div>
            <h3 class="font-semibold">Accès Certifié</h3>
            <p class="text-sm text-slate-300">Validation rapide de vos licences pilotes.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Partie droite : formulaire -->
    <div class="flex w-full items-center justify-center bg-white px-6 py-10 lg:w-[45%]">
      <div class="w-full max-w-md">
        <!-- Logo et titre -->
        <div class="text-center">
          <img :src="logoImage" alt="SCB DRONES" class="mx-auto h-14 w-auto" />
          <h2 class="mt-4 text-3xl font-bold text-slate-800">Inscription</h2>
          <p class="mt-1 text-sm text-slate-500">Enregistrez-vous pour accéder au portail DronePort.</p>
        </div>

        <!-- Formulaire -->
        <form @submit.prevent="submitForm" class="mt-6 space-y-4">
          <!-- Grille nom + téléphone -->
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label for="fullName" class="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Nom Complet
              </label>
              <div class="relative mt-1">
                <i class="bx bx-user absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input
                  id="fullName"
                  v-model="form.fullName"
                  type="text"
                  placeholder="Jean Dupont"
                  required
                  class="block w-full rounded-xl border-0 bg-slate-100/80 py-3 pl-10 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition"
                />
              </div>
            </div>
            <div>
              <label for="phone" class="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Téléphone
              </label>
              <div class="relative mt-1">
                <i class="bx bx-phone absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  placeholder="+225 00 00 00"
                  class="block w-full rounded-xl border-0 bg-slate-100/80 py-3 pl-10 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition"
                />
              </div>
            </div>
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-xs font-semibold uppercase tracking-wider text-slate-500">
              Adresse E-mail
            </label>
            <div class="relative mt-1">
              <i class="bx bx-envelope absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="contact@pilote.com"
                required
                class="block w-full rounded-xl border-0 bg-slate-100/80 py-3 pl-10 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition"
              />
            </div>
          </div>

          <!-- Mot de passe -->
          <div>
            <label for="password" class="block text-xs font-semibold uppercase tracking-wider text-slate-500">
              Mot de passe
            </label>
            <div class="relative mt-1">
              <i class="bx bx-lock-alt absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Minimum 8 caractères"
                required
                class="block w-full rounded-xl border-0 bg-slate-100/80 py-3 pl-10 pr-12 text-sm text-slate-700 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition"
              />
              <button
                type="button"
                class="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-blue-600"
                @click="showPassword = !showPassword"
              >
                <i :class="showPassword ? 'bx-hide' : 'bx-show-alt'" class="text-xl"></i>
              </button>
            </div>
            <!-- Jauge de force -->
            <div v-if="form.password.length > 0" class="mt-2">
              <div class="h-1 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  class="h-full transition-all duration-300"
                  :style="{ width: strengthPercentage + '%', backgroundColor: strengthColor }"
                ></div>
              </div>
              <p class="mt-1 text-xs font-medium" :style="{ color: strengthColor }">
                {{ strengthLabel }}
              </p>
            </div>
          </div>

          <!-- Confirmation -->
          <div>
            <label for="confirmPassword" class="block text-xs font-semibold uppercase tracking-wider text-slate-500">
              Confirmer le mot de passe
            </label>
            <div class="relative mt-1">
              <i class="bx bx-check-shield absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input
                id="confirmPassword"
                v-model="form.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="Répétez le mot de passe"
                required
                class="block w-full rounded-xl border-0 bg-slate-100/80 py-3 pl-10 pr-12 text-sm text-slate-700 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition"
                :class="{ 'ring-2 ring-red-400': form.confirmPassword.length > 0 && !passwordsMatch }"
              />
              <button
                type="button"
                class="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-blue-600"
                @click="showConfirmPassword = !showConfirmPassword"
              >
                <i :class="showConfirmPassword ? 'bx-hide' : 'bx-show-alt'" class="text-xl"></i>
              </button>
            </div>
            <p v-if="form.confirmPassword.length > 0 && !passwordsMatch" class="mt-1 text-xs text-red-500">
              Les mots de passe ne correspondent pas.
            </p>
          </div>

          <!-- Conditions -->
          <div class="flex items-start gap-2">
            <input
              id="agree"
              v-model="form.agree"
              type="checkbox"
              required
              class="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <label for="agree" class="text-sm text-slate-500">
              J'accepte les <b class="text-slate-700">Conditions d'Utilisation</b> et la
              <b class="text-slate-700">Politique de Confidentialité</b> de SCB Drones.
            </label>
          </div>

          <!-- Bouton -->
          <button
            type="submit"
            class="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-700 to-blue-900 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:scale-[1.02] hover:shadow-blue-500/40 active:scale-[0.98]"
          >
            <span class="relative z-10 flex items-center justify-center gap-2">
              Créer mon compte
              <i class="bx bx-log-in text-lg transition-transform group-hover:translate-x-1"></i>
            </span>
            <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-0 transition-opacity group-hover:opacity-100"></div>
          </button>
        </form>

        <!-- Lien connexion -->
        <p class="mt-6 text-center text-sm text-slate-500">
          Déjà inscrit ?
          <router-link to="/login" class="font-semibold text-blue-700 hover:underline">
            Se connecter
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import logoImage from '@/assets/images/logodrone.png'
import loginBg from '@/assets/images/dronelogin.jpg'

const router = useRouter()

// Formulaire
const form = reactive({
  fullName: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
  agree: false,
})

// Visibilité des mots de passe
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// Force du mot de passe
const strengthScore = computed(() => {
  const pwd = form.password
  let score = 0
  if (pwd.length >= 8) score++
  if (/[A-Z]/.test(pwd)) score++
  if (/[0-9]/.test(pwd)) score++
  if (/[^A-Za-z0-9]/.test(pwd)) score++
  return score
})

const strengthPercentage = computed(() => {
  const score = strengthScore.value
  if (score <= 1) return 33
  if (score === 2 || score === 3) return 66
  if (score === 4) return 100
  return 0
})

const strengthColor = computed(() => {
  const score = strengthScore.value
  if (score <= 1) return '#ef4444' // red
  if (score === 2 || score === 3) return '#f59e0b' // amber
  if (score === 4) return '#10b981' // green
  return '#94a3b8'
})

const strengthLabel = computed(() => {
  const score = strengthScore.value
  if (score <= 1) return 'Faible'
  if (score === 2 || score === 3) return 'Moyen'
  if (score === 4) return 'Fort'
  return ''
})

// Vérification de correspondance
const passwordsMatch = computed(() => {
  return form.password === form.confirmPassword
})

// Soumission
const submitForm = () => {
  if (!form.agree) {
    alert('Veuillez accepter les conditions d\'utilisation.')
    return
  }
  if (!passwordsMatch.value) {
    alert('Les mots de passe ne correspondent pas.')
    return
  }
  // Simulation d'inscription
  alert('🚀 Inscription validée avec succès pour le système SCB DronePort !')
  // Vous pouvez rediriger vers login ou dashboard
  router.push('/login')
}
</script>
