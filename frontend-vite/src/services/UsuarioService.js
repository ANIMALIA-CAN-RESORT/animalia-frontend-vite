import { ref } from 'vue'
import useAuthStore from '@/stores/auth'
import useUtilsStore from '@/stores/utils'
import i18n from '@/plugins/i18n'
import { toastExito, toTitleCase } from '@/utils'

class UsuarioService {
  usuarios
  usuario
  auth
  utils

  constructor() {
    this.usuarios = ref([])
    this.auth = useAuthStore()
    this.utils = useUtilsStore()
  }
  getUsuarios() {
    return this.usuarios
  }
  getUsuario() {
    return this.usuario
  }
  async fetchAll() {
    try {
      const urlUsuarios = `${this.utils.urlApi}/usuarios?size=1000`
      const response = await this.utils.fetchConToken(urlUsuarios, 'GET', null)
      const json = await response.json()
      this.usuarios.value = await json._embedded.usuarios
      return response.status == 200 ? true : false
    } catch (error) {
      console.log(error)
    }
  }
  async editarUsuario(username, nombre, apellido, pais, rol, idUsuario) {
    try {
      const urlUsuario = `${this.utils.urlApi}/usuarios/${idUsuario}`
      const response = await this.utils.fetchConToken(urlUsuario, 'PATCH', {
        nombre: toTitleCase(nombre),
        username: username,
        apellido: toTitleCase(apellido),
        pais: pais,
        rol: rol,
      })
      if (response.status == 200) {
        toastExito(i18n.global.t('administracion.editado', { username: username }))
        return true
      } else return false
    } catch (error) {
      console.log(error)
    }
  }
  async fetchUsuario(idUsuario) {
    try {
      const urlUsuario = `${this.utils.urlApi}/usuarios/${idUsuario}`
      const response = await this.utils.fetchConToken(urlUsuario, 'GET', null)
      const json = await response.json()
      this.usuario.value = await json
      return response.status == 200 ? true : false
    } catch (error) {
      console.log(error)
    }
  }
  async deleteUsuario(idUsuario) {
    try {
      const urlUsuario = `${this.utils.urlApi}/usuarios/${idUsuario}`
      const response = await this.utils.fetchConToken(urlUsuario, 'DELETE', null)
      const json = await response.json()
      this.usuario.value = await json
      if (response.status == 200) {
        toastExito(
          i18n.global.t('administracion.usuarioBorrado', {
            usuario: `${toTitleCase(this.usuario.value.username)}`,
          }),
        )
        return true
      } else return false
    } catch (error) {
      console.log(error)
    }
  }
}

export default UsuarioService
