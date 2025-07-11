import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import { createPinia } from 'pinia'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import {
  FaWhatsapp,
  FaTimes,
  FaRegularDotCircle,
  FaEdit,
  FaCheck,
  FaAddressBook,
  OiMail,
  GiRotaryPhone,
  RiAdminLine,
  FaBook,
  FaDog,
  GiDogBowl,
  GiDogHouse,
  GiPassport,
  FaUser,
  FaUserCog,
  FaFacebook,
  FaGithub,
  FaGitlab,
  FaTwitter,
  FaWindows,
  FaInstagram,
  FaTelegramPlane,
} from 'oh-vue-icons/icons'
import useUtilsStore from './stores/utils'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { i18n } from '@/plugins/i18n'
import utilsPlugin from '@/plugins/utilsPlugin'

//los iconos que voy a usar
addIcons(
  FaWhatsapp,
  FaTimes,
  FaRegularDotCircle,
  FaEdit,
  FaCheck,
  FaAddressBook,
  OiMail,
  GiRotaryPhone,
  RiAdminLine,
  FaBook,
  FaDog,
  GiDogBowl,
  GiDogHouse,
  GiPassport,
  FaUser,
  FaUserCog,
  FaFacebook,
  FaGithub,
  FaGitlab,
  FaTwitter,
  FaWindows,
  FaInstagram,
  FaTelegramPlane,
)
//para facilitar la importacion de las opciones
const app = createApp(App)

//para usar pinia
const pinia = createPinia()
//para persistir los datos de pinia
pinia.use(piniaPluginPersistedstate)

//para crear directivas propias
app.directive('titulo', {
  beforeMount: (el, binding) => {
    let size = 50
    if (binding.modifiers.sm) {
      size = 10
    } else if (binding.modifiers.md) {
      size = 20
    } else if (binding.modifiers.lg) {
      size = 25
    } else if (binding.modifiers.xl) {
      size = 40
    } else if (binding.modifiers.xxl) {
      size = 72
    }

    el.style.fontSize = size + 'px'

    if (binding.modifiers.red) {
      el.style.color = 'red'
    } else if (binding.modifiers.blue) {
      el.style.color = 'blue'
    } else if (binding.modifiers.green) {
      el.style.color = 'green'
    } else if (binding.modifiers.yellow) {
      el.style.color = 'yellow'
    } else if (binding.modifiers.orange) {
      el.style.color = 'orange'
    }
  },
})

//para usar rutas
app
  .use(router)
  //usa pinia
  .use(pinia)
  //usa los iconos
  .component('v-icon', OhVueIcon)
  //para usar i18n
  .use(i18n)
  //para usar mi plugin de utilidades
  .use(utilsPlugin)

//para usar un archivo de propiedades externo, en JSON, que guardo en la carpeta "public"
const utils = useUtilsStore()
await utils.cargarPropiedadesIniciales()

//monta la aplicación
app.mount('#app')
