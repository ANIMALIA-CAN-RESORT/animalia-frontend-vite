import { ref } from 'vue'
import useAuthStore from '@/stores/auth'
import useUtilsStore from '@/stores/utils'
import i18n from '@/plugins/i18n'
import { toastExito, toTitleCase } from '@/utils'

class ClienteService {
  clientes
  cliente
  auth
  utils

  constructor() {
    this.clientes = ref([])
    this.cliente = ref()
    this.auth = useAuthStore()
    this.utils = useUtilsStore()
  }
  getClientes() {
    return this.clientes
  }
  getCliente() {
    return this.cliente
  }
  async fetchAll() {
    try {
      const urlClientes = `${this.utils.urlApi}/clientes?size=1000`
      const response = await this.utils.fetchConToken(urlClientes, 'GET', null)
      const json = await response.json()
      this.clientes.value = await json._embedded.clientes
      return response.status == 200 ? true : false
    } catch (error) {
      console.log(error)
    }
  }
  async crearCliente(dni, nombreCliente, apellido1, apellido2, tfno, correoCliente) {
    try {
      const urlClientes = `${this.utils.urlApi}/clientes`
      const response = await this.utils.fetchConToken(urlClientes, 'POST', {
        dni: dni.toLowerCase(),
        nombre: toTitleCase(nombreCliente),
        apellido1: toTitleCase(apellido1),
        apellido2: toTitleCase(apellido2),
        tfno: tfno,
        correo: correoCliente,
      })
      if (response.status == 201) {
        i18n.global.t('comun.enviando')
        toastExito(
          i18n.global.t('clientes.creado', {
            cliente: `${toTitleCase(nombreCliente)} ${toTitleCase(apellido1)} ${toTitleCase(apellido2)}`,
          }),
        )
        return true
      } else return false
    } catch (error) {
      console.log(error)
    }
  }
  async editarCliente(dni, nombreCliente, apellido1, apellido2, tfno, correoCliente, idCliente) {
    try {
      const urlCliente = `${this.utils.urlApi}/clientes/${idCliente}`
      const response = await this.utils.fetchConToken(urlCliente, 'PATCH', {
        dni: dni.toLowerCase(),
        nombre: toTitleCase(nombreCliente),
        apellido1: toTitleCase(apellido1),
        apellido2: toTitleCase(apellido2),
        tfno: tfno,
        correo: correoCliente,
      })
      if (response.status == 200) {
        toastExito(
          i18n.global.t('clientes.editado', {
            cliente: `${toTitleCase(nombreCliente)} ${toTitleCase(apellido1)} ${toTitleCase(apellido2)}`,
          }),
        )
        return true
      } else return false
    } catch (error) {
      console.log(error)
    }
  }
  async fetchPorEmpresa(empresa) {
    try {
      const urlClientes = `${this.utils.urlApi}/clientes/search/correo?correo=${empresa}&size=1000`
      const response = await this.utils.fetchConToken(urlClientes, 'GET', null)
      const json = await response.json()
      json._embedded
        ? (this.clientes.value = await json._embedded.clientes)
        : (this.clientes.value = [])
      return response.status == 200 ? true : false
    } catch (error) {
      console.log(error)
    }
  }
  async fetchCliente(idCliente) {
    try {
      const urlCliente = `${this.utils.urlApi}/clientes/${idCliente}`
      const response = await this.utils.fetchConToken(urlCliente, 'GET', null)
      const json = await response.json()
      this.cliente.value = await json
      return response.status == 200 ? true : false
    } catch (error) {
      console.log(error)
    }
  }
  async deleteCliente(idCliente) {
    try {
      const urlCliente = `${this.utils.urlApi}/clientes/${idCliente}`
      const response = await this.utils.fetchConToken(urlCliente, 'DELETE', null)
      const json = await response.json()
      this.cliente.value = await json
      if (response.status == 200) {
        toastExito(
          i18n.global.t('clientes.clienteBorrado', {
            cliente: `${toTitleCase(this.cliente.value.nombre)} ${toTitleCase(this.cliente.value.apellido1)} ${toTitleCase(this.cliente.value.apellido2)}`,
          }),
        )
        return true
      } else return false
    } catch (error) {
      console.log(error)
    }
  }
}

export default ClienteService
