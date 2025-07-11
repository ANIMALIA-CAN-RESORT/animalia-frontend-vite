import i18n from '@/plugins/i18n'
import router from '@/router'
import useAuthStore from '@/stores/auth'
import useUtilsStore from '@/stores/utils'
import { toastExito } from '@/utils'

class AuthService {
  async login(username, password, feedback) {
    const authStore = useAuthStore()
    try {
      feedback = i18n.global.t('comun.enviando')
      const response = await authStore.login(username, password)
      if (response == true) {
        await router.push({ name: 'home' })
        toastExito(i18n.global.t('comun.logExito'))
      } else {
        feedback = i18n.global.t('comun.logError')
        alert(feedback)
      }
      return response.status == 201 ? true : false
    } catch (feedback) {
      console.log(feedback)
    }
  }

  async register(username, password, nombre, apellido, pais, rol, feedback) {
    const authStore = useAuthStore()
    try {
      feedback = i18n.global.t('comun.enviando')
      const response = await authStore.register(username, password, nombre, apellido, pais, rol)
      if (response == true) {
        await router.push({ name: 'home' })
        toastExito(i18n.global.t('comun.registroExito'))
      } else {
        feedback = i18n.global.t('comun.registroError')
        alert(feedback)
      }
      return response.status == 201 ? true : false
    } catch (feedback) {
      console.log(feedback)
    }
  }

  logout() {
    const authStore = useAuthStore()
    authStore.logout()
  }
  solicitudRegistro(
    username,
    password,
    nombre,
    apellido,
    pais,
    rol,
    passwordForRegisterFromUser,
    feedback,
  ) {
    const utils = useUtilsStore()
    const passwordForRegister = utils.passwordForRegister
    passwordForRegister == passwordForRegisterFromUser
      ? this.register(username, password, nombre, apellido, pais, rol, feedback)
      : alert(i18n.global.t('comun.wrongPassword'))
  }
}

export default AuthService
