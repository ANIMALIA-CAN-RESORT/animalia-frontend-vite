import { defineStore } from 'pinia'
import useAuthStore from '@/stores/auth'

const useUtilsStore = defineStore('utils', {
  state: () => {
    return {
      properties: null,
    }
  },
  getters: {
    urlApi: (state) => state.properties?.urlApi || '',
    passwordForRegister: (state) => state.properties?.passwordForRegister || '',
    precioAlojamientoDia: (state) => state.properties?.precioAlojamientoDia || 0,
    precioNormalCincuenta: (state) => state.properties?.precioNormalCincuenta || 0,
    precioPremiumCincuenta: (state) => state.properties?.precioPremiumCincuenta || 0,
    jaulas: (state) => state.properties?.jaulas || []
  },
  actions: {
    async cargarPropiedadesIniciales() {
      if (this.properties) return // ya está cargado, no hagas nada
      try {
        const publicPath = import.meta.env.VITE_PUBLIC_PATH
        const res = await fetch(`${publicPath}properties.json`)
        //const res = await fetch(`${window.location.pathname.replace(/\/$/, '')}/properties.json`)
        this.properties = await res.json()
      } catch (error) {
        console.error('Error cargando properties.json:', error)
      }
    },
    async fetchConToken(url, method, bodyinJson) {
      try {
        const response =
          bodyinJson == null
            ? await fetch(url, {
              method: method,
              headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Accept: 'application/json',
                Authorization: `Bearer ${useAuthStore().token}`,
              },
            })
            : await fetch(url, {
              method: method,
              headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Accept: 'application/json',
                Authorization: `Bearer ${useAuthStore().token}`,
              },
              body: JSON.stringify(bodyinJson),
            })
        return response
      } catch (error) {
        console.log(error)
      }
    },
  },
})

export default useUtilsStore
