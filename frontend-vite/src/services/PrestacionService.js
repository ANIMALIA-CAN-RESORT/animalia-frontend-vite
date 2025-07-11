import { ref } from 'vue'
import useAuthStore from '@/stores/auth'
import useUtilsStore from '@/stores/utils'
import i18n from '@/plugins/i18n'
import { formatearFecha, toastExito, toInstant, toTitleCase } from '@/utils'

class PrestacionService {
  prestaciones
  prestacion
  mascota
  auth
  utils

  constructor() {
    this.prestaciones = ref([])
    this.prestacion = ref()
    this.auth = useAuthStore()
    this.utils = useUtilsStore()
    this.mascota = ref()
  }
  getPrestaciones() {
    return this.prestaciones
  }

  getPrestacion() {
    return this.prestacion
  }

  getMascota() {
    return this.mascota
  }

  async fetchAll() {
    try {
      let alimentaciones
      let alojamientos
      const urlPrestaciones = `${this.utils.urlApi}/prestaciones?size=1000`
      const response = await this.utils.fetchConToken(urlPrestaciones, 'GET', null)
      const json = await response.json()
      json._embedded.alojamientos
        ? (alojamientos = await json._embedded.alojamientos)
        : (alojamientos = [])
      json._embedded.alimentaciones
        ? (alimentaciones = await json._embedded.alimentaciones)
        : (alimentaciones = [])
      this.prestaciones.value = alojamientos.concat(alimentaciones)
      return response.status == 200 ? true : false
    } catch (error) {
      console.log(error)
    }
  }
  async getPrestacionesDeMascota(id) {
    try {
      let alimentaciones
      let alojamientos
      const urlPrestaciones = `${this.utils.urlApi}/mascotas/${id}/prestaciones?size=1000`
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
  async getMascotaDePrestacion(id) {
    try {
      const urlMascota = `${this.utils.urlApi}/prestaciones/${id}/mascota`
      const response = await this.utils.fetchConToken(urlMascota, 'GET', null)
      const json = await response.json()
      this.mascota.value = await json
      return this.mascota.value.nombre
    } catch (error) {
      console.log(error)
    }
  }
  async getPrestacionesPagadas() {
    try {
      let alojamientos
      let alimentaciones
      const urlPrestaciones = `${this.utils.urlApi}/prestaciones/pagadas?size=1000`
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
  async getPrestacionesNoPagadas() {
    try {
      let alojamientos
      let alimentaciones
      const urlPrestaciones = `${this.utils.urlApi}/prestaciones/no-pagadas?size=1000`
      const response = await this.utils.fetchConToken(urlPrestaciones, 'GET', null)
      const json = await response.json()
      json._embedded.alojamientos
        ? (alojamientos = await json._embedded.alojamientos)
        : (alojamientos = [])
      json._embedded.alimentaciones
        ? (alimentaciones = await json._embedded.alimentaciones)
        : (alimentaciones = [])
      this.prestaciones.value = alojamientos.concat(alimentaciones)
      return response.status == 200 ? true : false
    } catch (error) {
      console.log(error)
    }
  }
  async crearAlojamiento(jaula, pagada, fechaEntrada, fechaSalida, idMascota) {
    try {
      const urlAlojamientos = `${this.utils.urlApi}/alojamientos`
      const response = await this.utils.fetchConToken(urlAlojamientos, 'POST', {
        jaula: toTitleCase(jaula),
        pagada: pagada,
        fechaEntrada: toInstant(fechaEntrada),
        fechaSalida: toInstant(fechaSalida),
        mascota: `${this.utils.urlApi}/mascotas/${idMascota}`,
      })
      if (response.status == 201) {
        toastExito(
          i18n.global.t('prestaciones.alojamientoCreado', {
            jaula: jaula,
            fechaEntrada: formatearFecha(fechaEntrada),
            fechaSalida: formatearFecha(fechaSalida),
          }),
        )
        return true
      } else return false
    } catch (error) {
      console.log(error)
    }
  }
  async crearAlimentacion(
    tipoComida,
    cantidadComidaDiaria,
    pagada,
    fechaEntrada,
    fechaSalida,
    idMascota,
  ) {
    try {
      const urlAlimentaciones = `${this.utils.urlApi}/alimentaciones`
      const response = await this.utils.fetchConToken(urlAlimentaciones, 'POST', {
        tipoComida: tipoComida,
        cantidadComidaDiaria: cantidadComidaDiaria,
        pagada: pagada,
        fechaEntrada: toInstant(fechaEntrada),
        fechaSalida: toInstant(fechaSalida),
        mascota: `${this.utils.urlApi}/mascotas/${idMascota}`,
      })
      if (response.status == 201) {
        toastExito(
          i18n.global.t('prestaciones.alimentacionCreada', {
            tipoComida: tipoComida,
            cantidadComidaDiaria: cantidadComidaDiaria,
            fechaEntrada: formatearFecha(fechaEntrada),
            fechaSalida: formatearFecha(fechaSalida),
          }),
        )
        return true
      } else return false
    } catch (error) {
      console.log(error)
    }
  }
  async editarAlojamiento(jaula, pagada, fechaEntrada, fechaSalida, idPrestacion) {
    try {
      const urlAlojamiento = `${this.utils.urlApi}/alojamientos/${idPrestacion}`
      const response = await this.utils.fetchConToken(urlAlojamiento, 'PATCH', {
        jaula: toTitleCase(jaula),
        pagada: pagada,
        fechaEntrada: toInstant(fechaEntrada),
        fechaSalida: toInstant(fechaSalida),
      })
      if (response.status == 200) {
        toastExito(
          i18n.global.t('prestaciones.alojamientoEditado', {
            jaula: jaula,
            fechaEntrada: toInstant(fechaEntrada),
            fechaSalida: toInstant(fechaSalida),
          }),
        )
        return true
      } else return false
    } catch (error) {
      console.log(error)
    }
  }
  async editarAlimentacion(
    tipoComida,
    cantidadComidaDiaria,
    pagada,
    fechaEntrada,
    fechaSalida,
    idPrestacion,
  ) {
    try {
      const urlAlimentacion = `${this.utils.urlApi}/alimentaciones/${idPrestacion}`
      const response = await this.utils.fetchConToken(urlAlimentacion, 'PATCH', {
        tipoComida: tipoComida,
        cantidadComidaDiaria: cantidadComidaDiaria,
        pagada: pagada,
        fechaEntrada: toInstant(fechaEntrada),
        fechaSalida: toInstant(fechaSalida),
      })
      if (response.status == 200) {
        toastExito(
          i18n.global.t('prestaciones.alimentacionEditada', {
            tipoComida: tipoComida,
            cantidadComidaDiaria: cantidadComidaDiaria,
            fechaEntrada: toInstant(fechaEntrada),
            fechaSalida: toInstant(fechaSalida),
          }),
        )
        return true
      } else return false
    } catch (error) {
      console.log(error)
    }
  }
  async deletePrestacion(idPrestacion) {
    try {
      const urlPrestacion = `${this.utils.urlApi}/prestaciones/${idPrestacion}`
      const response = await this.utils.fetchConToken(urlPrestacion, 'DELETE', null)
      const json = await response.json()
      this.prestacion.value = await json
      if (response.status == 200) {
        toastExito(
          i18n.global.t('prestaciones.prestacionBorrado'),
        )
        return true
      } else return false
    } catch (error) {
      console.log(error)
    }
  }
}

export default PrestacionService
