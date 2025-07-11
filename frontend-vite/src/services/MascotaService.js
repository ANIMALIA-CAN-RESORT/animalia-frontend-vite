import { ref } from 'vue'
import useAuthStore from '@/stores/auth'
import useUtilsStore from '@/stores/utils'
import i18n from '@/plugins/i18n'
import { toastExito, toTitleCase } from '@/utils'

class MascotaService {
  mascotas
  mascota
  cliente
  prestaciones
  auth
  utils

  constructor() {
    this.mascotas = ref([])
    this.auth = useAuthStore()
    this.utils = useUtilsStore()
    this.mascota = ref()
    this.cliente = ref()
    this.prestaciones = ref([])
  }
  getMascotas() {
    return this.mascotas
  }

  getMascota() {
    return this.mascota
  }

  getCliente() {
    return this.cliente
  }

  getPrestaciones() {
    return this.prestaciones
  }

  async fetchAll() {
    try {
      const urlMascotas = `${this.utils.urlApi}/mascotas?size=1000`
      const response = await this.utils.fetchConToken(urlMascotas, 'GET', null)
      const json = await response.json()
      this.mascotas.value = await json._embedded.mascotas
      return response.status == 200 ? true : false
    } catch (error) {
      console.log(error)
    }
  }
  async fetchPorEmpresa(empresa) {
    try {
      const urlMascotas = `${this.utils.urlApi}/mascotas/search/por-correo?correo=${empresa}&size=1000`
      const response = await this.utils.fetchConToken(urlMascotas, 'GET', null)
      const json = await response.json()
      json._embedded
        ? (this.mascotas.value = await json._embedded.mascotas)
        : (this.mascotas.value = [])
      return response.status == 200 ? true : false
    } catch (error) {
      console.log(error)
    }
  }
  async getMascotasDeCliente(id) {
    try {
      const urlMascotas = `${this.utils.urlApi}/clientes/${id}/mascotas?size=1000`
      const response = await this.utils.fetchConToken(urlMascotas, 'GET', null)
      const json = await response.json()
      this.mascotas.value = await json._embedded.mascotas
      return response.status == 200 ? true : false
    } catch (error) {
      console.log(error)
    }
  }
  async getClienteDeMascota(id) {
    try {
      const urlCliente = `${this.utils.urlApi}/mascotas/${id}/cliente`
      const response = await this.utils.fetchConToken(urlCliente, 'GET', null)
      const json = await response.json()
      this.cliente.value = await json
      return `${this.cliente.value.nombre} ${this.cliente.value.apellido1} ${this.cliente.value.apellido2}`
    } catch (error) {
      console.log(error)
    }
  }
  async getCorreoClienteDeMascota(id) {
    try {
      const urlCliente = `${this.utils.urlApi}/mascotas/${id}/cliente`
      const response = await this.utils.fetchConToken(urlCliente, 'GET', null)
      const json = await response.json()
      this.cliente.value = await json
      return `${this.cliente.value.correo}`
    } catch (error) {
      console.log(error)
    }
  }
  async getPrestacionesPagadasDeMascota(idMascota) {
    try {
      let alojamientos
      let alimentaciones
      const urlPrestaciones = `${this.utils.urlApi}/mascotas/${idMascota}/prestaciones/pagadas?size=1000`
      const response = await this.utils.fetchConToken(urlPrestaciones, 'GET', null)
      const json = await response.json()
      !json._embedded
        ? (alojamientos = [])
        : json._embedded.alojamientos
          ? (alojamientos = await json._embedded.alojamientos)
          : (alojamientos = [])
      !json._embedded
        ? (alimentaciones = [])
        : json._embedded.alimentaciones
          ? (alimentaciones = await json._embedded.alimentaciones)
          : (alimentaciones = [])
      this.prestaciones.value = alojamientos.concat(alimentaciones)
      return response.status == 200 ? true : false
    } catch (error) {
      console.log(error)
    }
  }
  async getPrestacionesNoPagadasDeMascota(idMascota) {
    try {
      let alojamientos
      let alimentaciones
      const urlPrestaciones = `${this.utils.urlApi}/mascotas/${idMascota}/prestaciones/no-pagadas?size=1000`
      const response = await this.utils.fetchConToken(urlPrestaciones, 'GET', null)
      const json = await response.json()
      !json._embedded
        ? (alojamientos = [])
        : json._embedded.alojamientos
          ? (alojamientos = await json._embedded.alojamientos)
          : (alojamientos = [])
      !json._embedded
        ? (alimentaciones = [])
        : json._embedded.alimentaciones
          ? (alimentaciones = await json._embedded.alimentaciones)
          : (alimentaciones = [])
      this.prestaciones.value = alojamientos.concat(alimentaciones)
      return response.status == 200 ? true : false
    } catch (error) {
      console.log(error)
    }
  }
  async enviarFactura(idMascota) {
    try {
      let alimentaciones
      let alojamientos
      const urlPrestaciones = `${this.utils.urlApi}/mascotas/${idMascota}/prestaciones/no-pagadas/factura`
      const response = await this.utils.fetchConToken(urlPrestaciones, 'GET', null)
      const json = await response.json()
      !json._embedded
        ? (alojamientos = [])
        : json._embedded.alojamientos
          ? (alojamientos = await json._embedded.alojamientos)
          : (alojamientos = [])
      !json._embedded
        ? (alimentaciones = [])
        : json._embedded.alimentaciones
          ? (alimentaciones = await json._embedded.alimentaciones)
          : (alimentaciones = [])
      this.prestaciones.value = alojamientos.concat(alimentaciones)
      let correo = await this.getCorreoClienteDeMascota(idMascota)
      if (response.status == 200) {
        toastExito(i18n.global.t('mascotas.facturaEnviada', { correo: correo }))
        return true
      } else return false
    } catch (error) {
      console.log(error)
    }
  }

  async crearMascota(nombreMascota, chip, raza, talla, idCliente) {
    try {
      const urlMascotas = `${this.utils.urlApi}/mascotas`
      const response = await this.utils.fetchConToken(urlMascotas, 'POST', {
        nombre: toTitleCase(nombreMascota),
        raza: toTitleCase(raza),
        chip: chip,
        talla: toTitleCase(talla),
        cliente: `${this.utils.urlApi}/clientes/${idCliente}`,
      })
      if (response.status == 201) {
        toastExito(
          i18n.global.t('mascotas.mascotaCreada', { mascota: nombreMascota.toUpperCase() }),
        )
        return true
      } else return false
    } catch (error) {
      console.log(error)
    }
  }
  async editarMascota(nombreMascota, chip, raza, talla, idMascota) {
    try {
      const urlMascota = `${this.utils.urlApi}/mascotas/${idMascota}`
      const response = await this.utils.fetchConToken(urlMascota, 'PATCH', {
        nombre: toTitleCase(nombreMascota),
        raza: toTitleCase(raza),
        chip: chip,
        talla: toTitleCase(talla),
      })
      if (response.status == 200) {
        toastExito(
          i18n.global.t('mascotas.mascotaEditada', { mascota: nombreMascota.toUpperCase() }),
        )
        return true
      } else return false
    } catch (error) {
      console.log(error)
    }
  }
  async deleteMascota(idMascota) {
    try {
      const urlMascota = `${this.utils.urlApi}/mascotas/${idMascota}`
      const response = await this.utils.fetchConToken(urlMascota, 'DELETE', null)
      const json = await response.json()
      this.mascota.value = await json
      if (response.status == 200) {
        toastExito(
          i18n.global.t('mascotas.mascotaBorrada', {
            mascota: `${toTitleCase(this.mascota.value.nombre)}`,
          }),
        )
        return true
      } else return false
    } catch (error) {
      console.log(error)
    }
  }
}

export default MascotaService
