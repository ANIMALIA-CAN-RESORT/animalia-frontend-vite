import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { dirname, resolve } from 'node:path'

export default ({ mode }) => {
  // Carga todas las vars de .env, .env.[mode], etc.
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), '')

  const base = env.VITE_PUBLIC_PATH || '/'
  const normalizedBase = base.endsWith('/') ? base : base + '/'

  return defineConfig({
    base: env.VITE_PUBLIC_PATH, //aqui asignamos el PUBLIC_PATH
    plugins: [
      vue(),
      vueDevTools(),
      VueI18nPlugin({
        include: resolve(dirname(fileURLToPath(import.meta.url)), './src/lang/**'),
      }),
      VitePWA({
        manifest: {
          screenshots: [
            //Dispositivo	Tamaño recomendado	form_factor Móvil	320x640 o mayor	"narrow" o ninguno Escritorio	1280x720 o mayor	"wide"
            {
              src: `${normalizedBase}img/screenshot_inicio.png`,
              sizes: '1500x900',
              type: 'image/png',
            },
            {
              src: `${normalizedBase}img/screenshot_clienteslist.png`,
              sizes: '1500x900',
              type: 'image/png',
            },
            {
              src: `${normalizedBase}img/screenshot_prestacionesdemascotas.png`,
              sizes: '1500x900',
              type: 'image/png',
            },
            {
              src: `${normalizedBase}img/screenshot_mascotascards.png`,
              sizes: '1500x900',
              type: 'image/png',
            },
            {
              src: `${normalizedBase}img/screenshot_inicio.png`,
              sizes: '1500x900',
              type: 'image/png',
              form_factor: 'wide',
            },
            {
              src: `${normalizedBase}img/screenshot_clienteslist.png`,
              sizes: '1500x900',
              type: 'image/png',
              form_factor: 'wide',
            },
            {
              src: `${normalizedBase}img/screenshot_prestacionesdemascotas.png`,
              sizes: '1500x900',
              type: 'image/png',
              form_factor: 'wide',
            },
            {
              src: `${normalizedBase}img/screenshot_mascotascards.png`,
              sizes: '1500x900',
              type: 'image/png',
              form_factor: 'wide',
            },
          ],
          display: 'standalone',
          display_override: ['window-controls-overlay'],
          lang: 'es-ES',
          name: 'Animalia Residencia de animales',
          short_name: 'Animalia',
          description: 'Aplicación para la gestión de mi residencia',
          theme_color: '#ff0000',
          background_color: '#d4d4d4',
          icons: [
            {
              src: `${normalizedBase}img/icons/apple-touch-icon-60x60.png`,
              sizes: '60x60',
              type: 'image/png',
            },
            {
              src: `${normalizedBase}img/icons/android-chrome-maskable-192x192.png`,
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: `${normalizedBase}img/icons/android-chrome-512x512.png`,
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        registerType: 'autoUpdate',
        devOptions: {
          enabled: true,
        },
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/scss/variables" as *;`,
        },
      },
    },
  })
}
