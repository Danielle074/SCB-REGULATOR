<template>
  <div class="flex min-h-screen w-full overflow-hidden">
    <!-- Partie gauche : simple image avec overlay -->
    <div
      class="relative hidden w-[55%] bg-cover bg-center lg:flex"
      :style="{ backgroundImage: `url(${loginBg})` }"
    >
      <!-- Overlay sombre pour lisibilité -->
      <div class="absolute inset-0 bg-black/60"></div>
    </div>

    <!-- Partie droite : formulaire -->
    <div class="flex w-full items-center justify-center bg-white px-6 py-10 lg:w-[45%]">
      <div class="w-full max-w-md">
        <!-- Logo agrandi -->
        <div class="text-center">
          <img :src="logoImage" alt="SCB DRONES" class="mx-auto h-20 w-auto" />
          <h2 class="mt-6 text-3xl font-bold text-slate-800">Bienvenue</h2>
          <p class="mt-1 text-sm text-slate-500">Connectez-vous à votre espace pilote</p>
        </div>

        <!-- Formulaire -->
        <form @submit.prevent="handleLogin" class="mt-8 space-y-6">
          <!-- Champ email -->
          <div>
            <label for="email" class="block text-xs font-semibold uppercase tracking-wider text-slate-500">
              Adresse email
            </label>
            <div class="relative mt-1">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <i class="bx bx-envelope text-slate-400"></i>
              </div>
              <input
                id="email"
                v-model="email"
                type="email"
                placeholder="pilote@agence.ci"
                required
                class="block w-full rounded-xl border-0 bg-slate-100/80 py-3.5 pl-10 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition"
              />
            </div>
          </div>

          <!-- Champ mot de passe -->
          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Mot de passe
              </label>
              <a href="#" class="text-xs font-medium text-blue-600 hover:underline">Oublié ?</a>
            </div>
            <div class="relative mt-1">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <i class="bx bx-lock-alt text-slate-400"></i>
              </div>
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                required
                class="block w-full rounded-xl border-0 bg-slate-100/80 py-3.5 pl-10 pr-12 text-sm text-slate-700 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition"
              />
              <button
                type="button"
                class="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-blue-600"
                @click="showPassword = !showPassword"
              >
                <i :class="showPassword ? 'bx-hide' : 'bx-show-alt'" class="text-xl"></i>
              </button>
            </div>
          </div>

          <!-- Rester connecté -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <input
                id="remember"
                v-model="rememberMe"
                type="checkbox"
                class="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <label for="remember" class="text-sm text-slate-600 select-none">Rester connecté</label>
            </div>
          </div>

          <!-- Bouton de connexion (sans ombre) -->
          <button
            type="submit"
            class="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-700 to-blue-900 py-3.5 text-sm font-semibold text-white transition hover:scale-[1.02] active:scale-[0.98]"
          >
            <span class="relative z-10 flex items-center justify-center gap-2">
              Se connecter
            </span>
            <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-0 transition-opacity group-hover:opacity-100"></div>
          </button>
        </form>

        <!-- Séparateur -->
        <div class="relative my-8">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-slate-200"></div>
          </div>
          <div class="relative flex justify-center text-xs">
            <span class="bg-white px-4 text-slate-400">OU CONTINUER AVEC</span>
          </div>
        </div>

        <!-- Boutons sociaux -->
        <div class="grid grid-cols-2 gap-3">
          <button
            @click="handleGoogleLogin"
            class="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:border-slate-300"
          >
            <img
              src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/web-24dp/logo_googleg_color_1x_web_24dp.png"
              alt="Google"
              class="h-5 w-5"
            />
            Google
          </button>
          <button
            @click="handleBiometricLogin"
            class="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:border-slate-300"
          >
            <i class="bx bx-fingerprint text-xl text-blue-600"></i>
            Biométrie
          </button>
        </div>

        <!-- Lien inscription -->
        <p class="mt-8 text-center text-sm text-slate-500">
          Nouveau sur SCBDRONES ?
          <router-link to="/inscription" class="font-semibold text-blue-700 hover:underline">Créer un compte pilote</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import logoImage from '@/assets/images/logodrone.png'
import loginBg from '@/assets/images/dronelogin.jpg'

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const router = useRouter()

const handleLogin = () => {
  console.log('Connexion avec', { email: email.value, remember: rememberMe.value })
  router.push('/application')
}

const handleGoogleLogin = () => {
  console.log('Connexion Google')
}

const handleBiometricLogin = () => {
  console.log('Connexion biométrique')
}
</script>

<style scoped>
/* Animation d'apparition */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.login-box {
  animation: fadeIn 0.6s ease-out;
}
</style>
