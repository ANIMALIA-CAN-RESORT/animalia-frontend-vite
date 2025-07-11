<template>
  <!-- Llamada al modal -->
  <a data-bs-toggle="modal" :data-bs-target="'#' + idModal"
    ><v-icon name="fa-edit" scale="1.5"
  /></a>
  <!-- Modal -->
  <div
    class="modal fade"
    :id="idModal"
    tabindex="-1"
    aria-labelledby="modal-editar-usuario-Label"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modal-editar-usuario-Label">
            {{ $t('administracion.editarUsuario') }}{{ props.username }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3 col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3">
              <label class="form-label"
                ><b>{{ $t('administracion.nombre') }}</b></label
              >
              <input type="text" class="form-control" id="nombre" v-model="nombreUsuario" />
            </div>
            <div class="mb-3 col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3">
              <label class="form-label"
                ><b>{{ $t('administracion.apellido') }}</b></label
              >
              <input type="text" class="form-control" id="apellido" v-model="apellido" />
            </div>
            <div class="mb-3 col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3">
              <label class="form-label"
                ><b>{{ $t('administracion.pais') }}</b></label
              >
              <input type="text" class="form-control" id="pais" v-model="pais" />
            </div>
            <div class="mb-3 col-10 col-sm-10 col-md-6 col-lg-6 col-xl-6">
              <label for="rol" class="form-label"
                ><b>{{ $t('administracion.rol') }}</b></label
              ><br />
              <span>
                <input type="radio" id="USER" value="USER" v-model="rol" />&nbsp;
                <label for="USER">{{ $t('comun.rolUser') }}</label
                ><a href="#" data-bs-toggle="tooltip" :title="$t('comun.rolUser')"
                  ><v-icon name="fa-user" color="blue" scale="2" /></a
                ><br />
                <input type="radio" id="ADMIN" value="ADMIN" v-model="rol" />&nbsp;
                <label for="ADMIN">{{ $t('comun.rolAdmin') }}</label
                ><a href="#" data-bs-toggle="tooltip" :title="$t('comun.rolAdmin')"
                  ><v-icon name="ri-admin-line" color="red" scale="2"
                /></a>
              </span>
            </div>
            <div class="mb-3 col-10 col-sm-10 col-md-5 col-lg-5 col-xl-5">
              <label for="username" class="form-label"
                ><b>{{ $t('administracion.username') }}</b></label
              >
              <input
                type="text"
                class="form-control"
                id="username"
                aria-describedby="username"
                v-model="username"
              />
            </div>
            <small class="passwordHelp">{{ $t('administracion.noChangePasswords') }}</small>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            {{ $t('comun.cerrar') }}
          </button>
          <!-- Llamada al modal para eliminar-->
          <button
            class="btn btn-danger"
            :data-bs-target="'#' + idModalEliminar"
            data-bs-toggle="modal"
          >
            {{ $t('administracion.borrarUsuario') }}
          </button>
          <button
            type="button"
            @click="editarUsuario"
            data-bs-dismiss="modal"
            class="btn btn-success"
          >
            {{ $t('administracion.guardarUsuario') }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal para eliminar-->
  <div
    class="modal fade"
    :id="idModalEliminar"
    aria-hidden="true"
    aria-labelledby="confirmaEliminar-Label"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="confirmaEliminar-Label">
            {{ $t('administracion.eliminarUsuario') }}{{ username }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">{{ $t('administracion.preguntarEliminar') }}{{ username }}?</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            {{ $t('comun.cerrar') }}
          </button>
          <button
            type="button"
            @click="solicitarBorrarUsuario"
            data-bs-dismiss="modal"
            class="btn btn-danger"
          >
            {{ $t('comun.borrar') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import UsuarioService from '@/services/UsuarioService'
import useAuthStore from '@/stores/auth'
import i18n from '@/plugins/i18n'
const auth = useAuthStore()
const props = defineProps(['nombre', 'apellido', 'username', 'rol', 'pais', 'idUsuario'])
const emits = defineEmits(['emiteModal'])

let nombreUsuario = ref(props.nombre)
let apellido = ref(props.apellido)
let pais = ref(props.pais)
let rol = ref(props.rol)
let username = ref(props.username)
let idUsuario = ref(props.idUsuario)
let idModal = 'modal-usuario-' + props.idUsuario
let idModalEliminar = 'modal-usuario-eliminar' + props.idUsuario
const service = new UsuarioService()
const editarUsuario = async () => {
  await service.editarUsuario(
    username.value,
    nombreUsuario.value,
    apellido.value,
    pais.value,
    rol.value,
    idUsuario.value,
  )
  emits('emiteModal')
}
const solicitarBorrarUsuario = () => {
  auth.username == username.value ? alert(i18n.global.t('noAutoborrar')) : borrarUsuario()
}
const borrarUsuario = async () => {
  await service.deleteUsuario(idUsuario.value)
  emits('emiteModal')
}
</script>
<style scoped lang="scss">
.passwordHelp {
  font-size: small;
  color: red;
}
</style>
