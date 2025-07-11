import { defineStore } from 'pinia'
import useUtilsStore from '@/stores/utils'
import { toTitleCase } from '@/utils'

const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      token: null,
      isAdmin: false,
      username: null,
    }
  },
  getters: {},
  actions: {
    async register(username, password, nombre, apellido, pais, rol) {
      const urlRegister = `${useUtilsStore().urlApi}/auth/register`
      const rawResponse = await fetch(urlRegister, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
          Accept: 'Application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
          nombre: toTitleCase(nombre),
          apellido: toTitleCase(apellido),
          pais: toTitleCase(pais),
          rol: rol,
        }),
      })
      if (rawResponse.status == 200) {
        const response = await rawResponse.json()
        this.token = response.token
        this.username = response.username
        this.isAdmin = response.rol == 'ADMIN'
        return true
      } else return false
    },
    async login(username, password) {
      const urlLogin = `${useUtilsStore().urlApi}/auth/login`
      const rawResponse = await fetch(urlLogin, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
          Accept: 'Application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
      if (rawResponse.status == 200) {
        const response = await rawResponse.json()
        this.token = response.token
        this.username = response.username
        this.isAdmin = response.rol == 'ADMIN'
        return true
      } else return false
    },
    logout() {
      this.token = null
      this.username = null
      this.isAdmin = false
    },
  },
  persist: {
    storage: sessionStorage,
    paths: ['token', 'username', 'isAdmin'], //si quisiera persistir todo el store simplemente cambio el objeto por true...
  },
})

export default useAuthStore
