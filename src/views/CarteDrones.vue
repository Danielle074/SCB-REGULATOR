<template>
  <div class="w-full h-[calc(100vh-64px)] relative overflow-hidden bg-secondary">

    <div id="map" class="w-full h-full z-0"></div>

    <div class="absolute top-4 left-4 z-10 flex flex-col gap-2 pointer-events-auto">
      <div class="flex items-center bg-white rounded-lg shadow-sm px-3 py-2 w-64 border border-slate-200">
        <i class="bx bx-search text-neutral text-lg mr-2"></i>
        <input
          type="text"
          placeholder="Recherche..."
          class="w-full text-xs focus:outline-hidden text-slate-700 bg-transparent"
        />
      </div>

      <button class="w-10 h-10 bg-white hover:bg-secondary text-primary rounded-lg shadow-md flex items-center justify-center text-xl transition-colors cursor-pointer border border-slate-200">
        <i class="bx bx-target-lock"></i>
      </button>

      <button class="w-10 h-10 bg-white hover:bg-secondary text-primary rounded-lg shadow-md flex items-center justify-center text-xl transition-colors cursor-pointer border border-slate-200">
        <i class="bx bx-cog"></i>
      </button>
    </div>

    <div class="absolute bottom-4 left-4 z-10 flex flex-col gap-2 pointer-events-auto bg-white/90 backdrop-blur-xs p-2 rounded-lg shadow-md border border-slate-200">
      <div class="flex gap-2 text-[10px] text-primary font-bold">
        <button class="px-2 py-1 border border-primary/30 rounded-sm bg-white flex items-center gap-1 cursor-pointer hover:bg-slate-50">
          <i class="bx bx-ruler"></i> Mesure
        </button>
        <button @click="exporterCarte" class="px-2 py-1 border border-primary/30 rounded-sm bg-white flex items-center gap-1 cursor-pointer hover:bg-slate-50">
          <i class="bx bx-download"></i> Export
        </button>
      </div>
      <div class="text-[10px] text-neutral border-t border-slate-200 pt-1">
        Échelle : Côte d'Ivoire (Réglementation ANAC / HACA)
      </div>
    </div>

    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 max-w-2xl w-full px-4 pointer-events-none hidden md:block">
      <div class="bg-white/95 backdrop-blur-xs border border-slate-200 shadow-lg rounded-md px-4 py-2 text-center text-xs text-slate-700 pointer-events-auto">
        La carte affichée par l'application <span class="font-bold text-primary">DroneMap CI</span> est uniquement destinée à la <span class="text-tertiary font-semibold">préparation avant vol pour les opérations de drones</span>.
      </div>
    </div>

    <div class="absolute top-4 right-0 bottom-4 z-10 flex items-start pointer-events-none gap-0">

      <div class="flex items-start pointer-events-auto h-full select-none transition-transform duration-300">
        <button
          @click="toggleSidebar('commandes')"
          class="bg-primary hover:bg-primary/95 text-white py-6 px-2 rounded-l-md cursor-pointer flex flex-col items-center justify-center gap-2 shadow-md border-y border-l border-white/20 h-40"
          style="writing-mode: vertical-lr; transform: rotate(180deg);"
        >
          <span class="text-xs font-medium tracking-wide">masquer les commandes</span>
          <i class="bx text-sm mt-1" :class="activeSidebar === 'commandes' ? 'bx-chevron-up' : 'bx-chevron-down'"></i>
        </button>

        <div
          v-if="activeSidebar === 'commandes'"
          class="w-80 h-full bg-white/95 backdrop-blur-md shadow-2xl border-l border-slate-200 p-4 overflow-y-auto flex flex-col gap-5 text-sm"
        >
          <div class="flex flex-col gap-2">
            <div class="flex justify-between items-center text-primary font-medium">
              <span>Statut de-à (UTC) :</span>
              <button class="text-xl hover:text-tertiary transition-colors cursor-pointer">
                <i class="bx bx-shuffle"></i>
              </button>
            </div>

            <div class="flex items-center gap-2">
              <div class="flex items-center border border-primary/30 bg-white rounded-md px-2 py-1 flex-1">
                <input type="text" value="15.06.2026 10:13" class="w-full text-xs focus:outline-hidden text-slate-700" />
                <i class="bx bx-calendar text-primary text-base ml-1"></i>
              </div>
              <div class="flex items-center border border-primary/30 bg-white rounded-md px-2 py-1 flex-1">
                <input type="text" value="15.06.2026 14:13" class="w-full text-xs focus:outline-hidden text-slate-700" />
                <i class="bx bx-calendar text-primary text-base ml-1"></i>
              </div>
            </div>

            <div class="flex gap-2 mt-1">
              <button class="bg-primary hover:bg-primary/90 text-white font-medium px-3 py-1 rounded-md text-xs transition-colors">
                +2h
              </button>
              <button class="bg-primary hover:bg-primary/90 text-white font-medium px-4 py-1 rounded-md text-xs transition-colors">
                SS
              </button>
              <button class="bg-primary hover:bg-primary/90 text-white font-medium px-3 py-1 rounded-md text-xs transition-colors">
                16.06.
              </button>
            </div>
          </div>

          <div class="flex flex-col gap-2 border-t border-slate-100 pt-3">
            <span class="text-primary font-medium">Limites verticales :</span>
            <div class="px-2 py-3">
              <div class="h-1 bg-slate-200 rounded-full relative flex items-center">
                <div class="absolute left-0 right-3/4 h-full bg-primary/30 rounded-full"></div>
                <div class="w-4 h-4 bg-white border-2 border-primary rounded-md absolute left-0 cursor-pointer shadow-xs"></div>
                <div class="w-4 h-4 bg-white border-2 border-primary rounded-md absolute left-12 cursor-pointer shadow-xs"></div>
              </div>
            </div>
            <div class="flex justify-between items-center mt-1">
              <span class="text-tertiary font-bold text-xs">0 - 200</span>
              <div class="flex items-center border border-slate-300 rounded-md overflow-hidden bg-slate-100 text-xs">
                <span class="bg-tertiary/20 text-primary px-3 py-1 font-medium border-r border-slate-300">m</span>
                <span class="px-2 py-1 text-slate-400"><i class="bx bx-toggle-right text-base align-middle"></i></span>
              </div>
            </div>
          </div>

          <div class="mt-auto flex flex-col gap-2 pt-4 border-t border-slate-100">
            <button class="w-full bg-primary hover:bg-primary/95 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2 shadow-xs">
              <span>sélection</span>
            </button>
            <button class="w-full bg-primary hover:bg-primary/95 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center shadow-xs text-xl">
              <i class="bx bx-layer"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="flex items-start pointer-events-auto h-full select-none transition-transform duration-300 gap-0">
        <button
          @click="toggleSidebar('donnees')"
          class="bg-primary hover:bg-primary/95 text-white py-6 px-2 rounded-l-md cursor-pointer flex flex-col items-center justify-center gap-2 shadow-md border-y border-l border-white/20 h-24"
          style="writing-mode: vertical-lr; transform: rotate(180deg);"
        >
          <span class="text-xs font-medium tracking-wide">données</span>
        </button>

        <div
          v-if="activeSidebar === 'donnees'"
          class="w-80 h-full bg-white/95 backdrop-blur-md shadow-2xl border-l border-slate-200 p-4 overflow-y-auto flex flex-col gap-4 text-sm"
        >
          <div class="grid grid-cols-4 gap-1.5 pb-2 border-b border-slate-100">
            <button class="border border-primary text-primary font-medium py-1.5 px-1 rounded-md text-center text-xs bg-white hover:bg-secondary transition-colors">
              Infobulle
            </button>
            <button class="bg-primary hover:bg-primary/90 text-white font-medium py-1.5 px-1 rounded-md text-center text-xs transition-colors shadow-xs">
              Plan
            </button>
            <button class="bg-primary hover:bg-primary/90 text-white font-medium py-1.5 px-1 rounded-md text-center text-xs transition-colors shadow-xs">
              drones
            </button>
            <button class="bg-primary hover:bg-primary/90 text-white font-medium py-1.5 px-1 rounded-md text-center text-xs transition-colors shadow-xs">
              Vols
            </button>
          </div>

          <div class="flex-1 flex flex-col items-center justify-center text-slate-400 gap-2 border-2 border-dashed border-slate-200 rounded-lg p-4">
            <i class="bx bx-file-find text-3xl"></i>
            <span class="text-xs text-center">Aucune donnée sélectionnée pour la Côte d'Ivoire</span>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Types de sidebars
type SidebarType = 'commandes' | 'donnees' | null

const mapInstance = ref<L.Map | null>(null)
const activeSidebar = ref<SidebarType>(null)

// Gestion de l'ouverture d'un onglet à la fois
const toggleSidebar = (type: SidebarType): void => {
  if (activeSidebar.value === type) {
    activeSidebar.value = null
  } else {
    activeSidebar.value = type
  }
}

// Fonction de génération d'impression/export de la carte au format A4
const exporterCarte = () => {
  if (!mapInstance.value) return

  // Capturer les coordonnées géographiques et le zoom courants pour reproduire la vue à l'identique
  const centre = mapInstance.value.getCenter()
  const zoom = mapInstance.value.getZoom()

  // Création d'une fenêtre éphémère isolée pour l'impression
  const fenetreImpression = window.open('', '_blank', 'width=1000,height=1100')
  if (!fenetreImpression) {
    alert("Veuillez autoriser les fenêtres popups pour permettre la génération de l'export.")
    return
  }

  // Écriture du document HTML dédié à la mise en page imprimable
  fenetreImpression.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>DroneMap CI - Exportation</title>
      <meta charset="utf-8" />
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"><\/script>

      <style>
        @page {
          size: A4 portrait;
          margin: 15mm;
        }
        body {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          color: #334155;
          margin: 0;
          padding: 0;
          font-size: 11px;
          line-height: 1.4;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 2px solid #e2e8f0;
          padding-bottom: 12px;
          margin-bottom: 15px;
        }
        .logo-section {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .logo-title {
          font-size: 24px;
          font-weight: bold;
          color: #0f172a;
          line-height: 1;
        }
        .meta-section {
          text-align: left;
          font-size: 10px;
        }
        .meta-section table {
          border-collapse: collapse;
        }
        .meta-section td {
          padding: 2px 5px;
          vertical-align: top;
        }
        .label { font-weight: bold; color: #1e3a8a; }

        #map-print {
          width: 100%;
          height: 540px;
          border: 1px solid #cbd5e1;
          border-radius: 4px;
          margin-bottom: 20px;
        }

        .footer {
          position: absolute;
          bottom: 0;
          width: 100%;
          text-align: center;
          font-size: 11px;
          color: #334155;
          border-top: 1px solid #e2e8f0;
          padding-top: 10px;
        }
        .footer-highlight {
          font-weight: bold;
          color: #0284c7;
        }
        .footer-warning {
          color: #0284c7;
          font-weight: 600;
        }
      </style>
    </head>
    <body>

      <div class="header">
        <div class="logo-section">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" stroke-width="2">
            <path d="M2 12h4m12 0h4M12 2v4m0 12v4M6.5 6.5l3 3m5 5l3 3m-11 5l3-3m5-5l3-3"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          <div class="logo-title">Drone<br><span style="color:#1e3a8a; font-size:18px;">Map CI</span></div>
        </div>

        <div class="meta-section">
          <table>
            <tr><td class="label">Carte par :</td><td>DroneMap Côte d'Ivoire</td></tr>
            <tr><td class="label">Date d'impression :</td><td>${new Date().toLocaleString('fr-FR')}</td></tr>
            <tr><td class="label">Limites verticales :</td><td>0m - 200m</td></tr>
            <tr><td class="label">Réglementation :</td><td>ANAC / HACA (Côte d'Ivoire)</td></tr>
          </table>
        </div>
      </div>

      <div id="map-print"></div>

      <div class="footer">
        La carte affichée par l'application <span class="footer-highlight">DroneMap CI</span> est uniquement destinée à la
        <span class="footer-warning">préparation avant vol pour les opérations de drones</span>.
      </div>

      <script>
        // Génération de l'instance Leaflet calquée sur l'état de l'application
        const printMap = L.map('map-print', {
          center: [${centre.lat}, ${centre.lng}],
          zoom: ${zoom},
          zoomControl: false,
          attributionControl: false
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(printMap);
        L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(printMap);

        // Duplication des couches de polygones réglementaires
        const zoneRougeCoords = [[5.28, -4.05], [5.28, -3.88], [5.21, -3.88], [5.21, -4.05]];
        L.polygon(zoneRougeCoords, {
          color: '#ef4444',
          fillColor: '#ef4444',
          fillOpacity: 0.4,
          weight: 2
        }).addTo(printMap);

        const zoneMarronCoords = [[6.85, -5.32], [6.85, -5.22], [6.78, -5.22], [6.78, -5.32]];
        L.polygon(zoneMarronCoords, {
          color: '#CDAE51',
          fillColor: '#CDAE51',
          fillOpacity: 0.4,
          weight: 2
        }).addTo(printMap);

        // Attente du rendu complet des tuiles géographiques avant exécution
        setTimeout(() => {
          window.print();
          window.close();
        }, 1000);
      <\/script>
    </body>
    </html>
  `)
  fenetreImpression.document.close()
}

onMounted(() => {
  // 1. Initialisation locale sécurisée pour TypeScript
  const map = L.map('map', {
    center: [7.5399, -5.5471],
    zoom: 7,
    zoomControl: false
  })

  // 2. Fond de carte
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map)

  L.control.scale({ position: 'bottomleft', imperial: false }).addTo(map)

  // 3. Polygone Rouge (Interdit - Abidjan)
  const zoneRougeCoords: L.LatLngExpression[] = [
    [5.28, -4.05], [5.28, -3.88], [5.21, -3.88], [5.21, -4.05]
  ]
  const zoneRouge = L.polygon(zoneRougeCoords, {
    color: '#ef4444',
    fillColor: '#ef4444',
    fillOpacity: 0.4,
    weight: 2
  }).addTo(map)

  zoneRouge.bindPopup("<b style='color:#ef4444;'>ZONE ROUGE INTERDITE</b><br>Espace aérien d'Abidjan - Vols interdits sans autorisation spéciale ANAC.")

  // 4. Polygone Marron (Sous conditions - Yamoussoukro)
  const zoneMarronCoords: L.LatLngExpression[] = [
    [6.85, -5.32], [6.85, -5.22], [6.78, -5.22], [6.78, -5.32]
  ]
  const zoneMarron = L.polygon(zoneMarronCoords, {
    color: '#CDAE51',
    fillColor: '#CDAE51',
    fillOpacity: 0.4,
    weight: 2
  }).addTo(map)

  zoneMarron.bindPopup("<b style='color:#825083;'>ZONE SOUMISE À CONDITIONS</b><br>Yamoussoukro Ville - Hauteur max 50m. Notification obligatoire via SCB DRONE.")

  // Assignation à la ref globale
  mapInstance.value = map
})
</script>

<style>
.leaflet-container {
  outline: 0;
}
.leaflet-popup-content-wrapper {
  border-radius: 8px;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}
button {
  text-orientation: mixed;
}
</style>
