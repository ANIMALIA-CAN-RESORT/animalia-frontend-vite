<template>
  <!-- Llamada al modal -->
  <a data-bs-toggle="modal" :data-bs-target="'#' + idModal"
    ><v-icon name="fa-edit" scale="1.5" @click="alertar"
  /></a>
  <!-- Modal -->
  <div
    class="modal fade"
    :id="idModal"
    tabindex="-1"
    aria-labelledby="modal-editar-mascota-Label"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modal-editar-mascota-Label">
            {{ $t('mascotas.editarMascota') }}{{ props.idMascota }}
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
              <label for="nombre" class="form-label"><b>{{ $t('mascotas.nombre') }}</b></label>
              <input type="text" class="form-control" id="nombre" v-model="nombreMascota" />
            </div>
            <div class="mb-3">
              <label for="chip" class="form-label"><b>{{ $t('mascotas.chip') }}</b></label>
              <input type="text" class="form-control" id="chip" v-model="chip" />
            </div>
            <div class="mb-3">
              <label for="raza" class="form-label"><b>{{ $t('mascotas.raza') }}</b></label>
              <input type="text" class="form-control" id="raza" v-model="raza" />
            </div>
            <div class="mb-3">
              <label for="talla" class="form-label"><b>{{ $t('mascotas.talla') }}</b></label>
              <select class="form-select" aria-label="talla" v-model="talla">
                <option disabled value="">{{ $t('mascotas.selectTalla') }}</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>
             <div class="mb-3">
              <label for="clienteLabel" class="form-label"
                ><b>{{ toTitleCase($t('clientes.clientes', 1)) }}:</b></label
              ><br />
              <label for="cliente" class="form-label"> {{ cliente }} </label>
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
            {{ $t('mascotas.borrarMascota') }}
          </button>
          <button
            type="button"
            @click="editarMascota"
            data-bs-dismiss="modal"
            class="btn btn-success"
          >
            {{ $t('mascotas.guardarMascota') }}
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
            {{ $t('mascotas.eliminarMascota') }}{{ idMascota }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">{{ $t('mascotas.preguntaEliminar') }}{{ nombreMascota }}?</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            {{ $t('comun.cerrar') }}
          </button>
          <button
            type="button"
            @click="borrarMascota"
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
import MascotaService from '@/services/MascotaService'
import { ref } from 'vue'
import { toTitleCase } from '@/utils'

const props = defineProps(['nombre','chip', 'talla', 'raza', 'idMascota'])
const emits = defineEmits(['emiteModal'])
let chip = ref(props.chip)
let nombreMascota = ref(props.nombre)
let raza = ref(props.raza)
let talla = ref(props.talla)
let idMascota = ref(props.idMascota)
let cliente = ref('')
let idModal = 'modal-mascota-' + props.idMascota
let idModalEliminar = 'modal-mascota-eliminar' + props.idMascota
const service = new MascotaService()

const alertar = async () => {
  cliente.value = await service.getClienteDeMascota(props.idMascota)
}
const editarMascota = async () => {
  await service.editarMascota(nombreMascota.value, chip.value, raza.value, talla.value, idMascota.value)
  emits('emiteModal') 
}
const borrarMascota = async () => {
  await service.deleteMascota(idMascota.value)
  emits('emiteModal')
}
</script>
<style scoped lang="scss">
#emailHelp {
  font-size: small;
}
</style>
