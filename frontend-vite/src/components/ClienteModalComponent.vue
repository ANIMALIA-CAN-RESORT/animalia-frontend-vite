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
    aria-labelledby="modal-editar-cliente-Label"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modal-editar-cliente-Label">
            {{ $t('clientes.editarCliente') }}{{ props.idCliente }}
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
            <div class="mb-3">
              <label for="dni" class="form-label"
                ><b>{{ toTitleCase($t('clientes.dni')) }}:</b></label
              >
              <input type="text" class="form-control" id="dni" v-model="dni" />
            </div>
            <div class="mb-3">
              <label for="nombre" class="form-label"
                ><b>{{ toTitleCase($t('clientes.nombre')) }}:</b></label
              >
              <input type="text" class="form-control" id="nombre" v-model="nombreCliente" />
            </div>
            <div class="mb-3">
              <label for="apellido1" class="form-label"
                ><b>{{ toTitleCase($t('clientes.apellido1')) }}:</b></label
              >
              <input type="text" class="form-control" id="apellido1" v-model="apellido1" />
            </div>
            <div class="mb-3">
              <label for="apellido2" class="form-label"
                ><b>{{ toTitleCase($t('clientes.apellido2')) }}:</b></label
              >
              <input type="text" class="form-control" id="apellido2" v-model="apellido2" />
            </div>
            <div class="mb-3">
              <label for="tfno" class="form-label"
                ><b>{{ toTitleCase($t('clientes.tfno')) }}:</b></label
              >
              <input type="text" class="form-control" id="tfno" v-model="tfno" />
            </div>
            <div class="mb-3">
              <label for="InputEmail1" class="form-label"
                ><b>{{ toTitleCase($t('clientes.correo')) }}:</b></label
              >
              <input
                type="email"
                class="form-control"
                id="InputEmail1"
                aria-describedby="emailHelp"
                v-model="correoCliente"
              />
              <div id="emailHelp" class="form-text">{{ $t('clientes.helpMail') }}</div>
            </div>
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
            {{ $t('clientes.borrarCliente') }}
          </button>
          <button
            type="button"
            @click="editarCliente"
            data-bs-dismiss="modal"
            class="btn btn-success"
          >
            {{ $t('clientes.guardarCliente') }}
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
            {{ $t('clientes.eliminarCliente') }}{{ idCliente }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">{{ $t('clientes.preguntaEliminar') }}{{ nombreCliente }} {{apellido1}} {{apellido2}}?</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            {{ $t('comun.cerrar') }}
          </button>
          <button
            type="button"
            @click="borrarCliente"
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
import ClienteService from '@/services/ClienteService'
import { toTitleCase } from '@/utils'

const props = defineProps(['nombre','apellido1', 'apellido2', 'dni',  'tfno', 'correo', 'idCliente'])
const emits = defineEmits(['emiteModal'])
let dni = ref(props.dni)
let nombreCliente = ref(props.nombre)
let apellido1 = ref(props.apellido1)
let apellido2 = ref(props.apellido2)
let tfno = ref(props.tfno)
let correoCliente = ref(props.correo)
let idCliente = ref(props.idCliente)
let idModal = 'modal-cliente-' + props.idCliente
let idModalEliminar = 'modal-cliente-eliminar' + props.idCliente
const service = new ClienteService()
const editarCliente = async () => {
  await service.editarCliente(dni.value, nombreCliente.value, apellido1.value, apellido2.value, tfno.value, correoCliente.value, idCliente.value)
  emits('emiteModal')
}
const borrarCliente = async () => {
  await service.deleteCliente(idCliente.value)
  emits('emiteModal')
}
</script>
<style scoped lang="scss">
#emailHelp {
  font-size: small;
}
</style>
