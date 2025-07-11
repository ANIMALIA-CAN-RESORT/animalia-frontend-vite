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
    aria-labelledby="modal-editar-prestacion-Label"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modal-editar-prestacion-Label">
            {{ $t('prestaciones.editarPrestacion')}}{{ props.idPrestacion }}
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
            <div class="mb-3 d-flex">
              <label for="fechaEntrada" class="form-label me-2"
                ><b>{{ $t('prestaciones.fechaEntrada') }}:</b></label
              >
              <input type="date" class="form-control w-auto" id="fechaEntrada" v-model="fechaEntrada" />
            </div>
            <div class="mb-3 d-flex">
              <label for="fechaSalida" class="form-label me-2"
                ><b>{{ $t('prestaciones.fechaSalida') }}:</b></label
              >
              <input type="date" class="form-control w-auto" id="fechaSalida" v-model="fechaSalida" />
            </div>
            <div class="mb-3 d-flex">
              <label for="tipo" class="form-label" v-if="tipo == 'Alojamiento'"
                ><b>{{ $t('prestaciones.tipo') }}:</b>&nbsp;<a
                  href="#"
                  data-bs-toggle="tooltip"
                  :title="$t('prestaciones.alojamiento')"
                  ><v-icon name="gi-dog-house" color="blue" scale="2" /></a></label
              ><br />
              <label for="tipo" class="form-label" v-if="tipo == 'Alimentación'"
                ><b>{{ $t('prestaciones.tipo') }}:</b>&nbsp;<a
                  href="#"
                  data-bs-toggle="tooltip"
                  :title="$t('prestaciones.alimentacion')"
                  ><v-icon name="gi-dog-bowl" color="red" scale="2" /></a></label
              ><br />
            </div>
           <div class="mb-3 d-flex" v-if="tipo == 'Alojamiento'">
              <label for="jaula" class="form-label me-3"><b>{{ $t('prestaciones.jaula') }}:</b></label>
              <select class="form-select w-auto" aria-label="jaula" v-model="jaula">
                <option disabled value="">{{ $t('prestaciones.selectJaula') }}</option>
                <option v-for="jaula in jaulas" :key="jaula" :value="jaula">
                  {{ jaula }}
                </option>
              </select>
            </div>
            <div class="mb-3 d-flex" v-if="tipo == 'Alimentación'">
              <label for="tipoComida" class="form-label me-3"><b>{{ $t('prestaciones.tipoComida') }}:</b></label>         
              <input type="radio" id="normal" value="NORMAL" v-model="tipoComida" />&nbsp;
              <label for="normal">{{ $t('prestaciones.normal') }}</label>&nbsp;&nbsp;
              <input type="radio" id="premium" value="PREMIUM" v-model="tipoComida" />&nbsp;
              <label for="premium">{{ $t('prestaciones.premium') }}</label>
            </div>
            <div class="mb-3 d-flex" v-if="tipo == 'Alimentación'">
              <label for="cantidadComidaDiaria" class="form-label me-2"><b>{{ $t('prestaciones.cantidadComidaDiaria')
              }}</b></label>
              <select class="form-select w-auto" aria-label="cantidad" v-model="cantidadComidaDiaria">
                <option disabled :value="null">{{ $t('prestaciones.selectCantidad') }}</option>
                <option v-for="cantidad in [50, 100, 150, 200, 250, 300, 350, 400, 450, 500]" :key="cantidad"
                  :value="cantidad">
                  {{ cantidad }} grs.
                </option>
              </select>
            </div>
            <div class="mb-3 d-flex">
              <label for="precio" class="form-label"><b>{{ $t('prestaciones.precio') }}: </b> {{ precioPrestacion }}
                €</label>
            </div>
            <div class="mb-3 d-flex">
              <label for="pagada" class="form-label me-3"
                ><b>{{ $t('prestaciones.pagada') }}:</b></label>
              <input type="radio" id="pagada" value="true" v-model="pagada" />&nbsp;
              <label for="pagada"
                ><a href="#" data-bs-toggle="tooltip" :title="$t('prestaciones.pagada')"
                  ><v-icon name="fa-check" color="green" scale="2" /></a></label
              >&nbsp;&nbsp;
              <input type="radio" id="noPagada" value="false" v-model="pagada" />&nbsp;
              <label for="noPagada"
                ><a href="#" data-bs-toggle="tooltip" :title="$t('prestaciones.noPagada')"
                  ><v-icon name="fa-times" color="red" scale="2" /></a
              ></label>
            </div>         
            <div class="mb-3 d-flex">
              <label for="mascotaLabel" class="form-label me-2"
                ><b>{{ toTitleCase($t('mascotas.mascotas', 1)) }}:</b></label
              ><br />
              <label for="mascota" class="form-label"> {{ mascota }} </label>
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
            {{ $t('prestaciones.borrarPrestacion') }}
          </button>
          <button
            type="button"
            @click="editarPrestacion"
            data-bs-dismiss="modal"
            class="btn btn-success"
          >
            {{ $t('prestaciones.guardarPrestacion') }}
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
            {{ $t('prestaciones.eliminarPrestacion') }}{{ idPrestacion }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">{{ $t('prestaciones.preguntarEliminar') }}{{ idPrestacion }}?</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            {{ $t('comun.cerrar') }}
          </button>
          <button
            type="button"
            @click="borrarPrestacion"
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
import PrestacionService from '@/services/PrestacionService'
import useUtilsStore from '@/stores/utils'
import { toDate, toTitleCase } from '@/utils'
import { computed, ref } from 'vue'
const props = defineProps(['fechaEntrada', 'tipo', 'fechaSalida', 'idPrestacion', 'jaula', 'pagada','tipoComida', 'cantidadComidaDiaria'])
const emits = defineEmits(['emiteModal'])
const utils = useUtilsStore()
const jaulas = utils.jaulas
let fechaEntrada = ref(toDate(props.fechaEntrada))
let tipo = ref(props.tipo)
let fechaSalida = ref(toDate(props.fechaSalida))
let idPrestacion = ref(props.idPrestacion)
let jaula = ref(props.jaula)
let tipoComida = ref(props.tipoComida)
let cantidadComidaDiaria = ref(props.cantidadComidaDiaria)
let pagada = ref(props.pagada)
const service = new PrestacionService()
let mascota = ref('')
let idModal = 'modal-prestacion-' + props.idPrestacion
let idModalEliminar = 'modal-prestacion-eliminar' + props.idPrestacion
let dias = ref(0)
let precioPrestacion = ref(0)
const precioAlojamientoDia = ref(utils.precioAlojamientoDia)
const precioNormalCincuenta = ref(utils.precioNormalCincuenta)
const precioPremiumCincuenta = ref(utils.precioPremiumCincuenta)

dias.value = computed(() => Math.round((new Date(fechaSalida.value) - new Date(fechaEntrada.value)) / (1000 * 60 * 60 * 24)))
precioPrestacion.value = computed(() => tipo.value == "Alojamiento" && fechaEntrada.value && fechaSalida.value
  ? dias.value * precioAlojamientoDia.value
  : tipo.value == "Alimentación" && fechaEntrada.value && fechaSalida.value && tipoComida.value == "NORMAL"
    ? dias.value * precioNormalCincuenta.value * cantidadComidaDiaria.value / 50
    : tipo.value == "Alimentación" && fechaEntrada.value && fechaSalida.value && tipoComida.value == "PREMIUM"
      ? dias.value * precioPremiumCincuenta.value * cantidadComidaDiaria.value / 50
      : 0
)
const alertar = async () => {
  mascota.value = await service.getMascotaDePrestacion(idPrestacion.value)
}
const editarPrestacion = async () => {
  if (tipo.value == 'Alojamiento') {
    await service.editarAlojamiento(jaula.value, pagada.value, fechaEntrada.value, fechaSalida.value, idPrestacion.value)
  } else if (tipo.value == 'Alimentación') {
    await service.editarAlimentacion(tipoComida.value, cantidadComidaDiaria.value, pagada.value, fechaEntrada.value, fechaSalida.value, idPrestacion.value)
  }
  emits('emiteModal')
}
const borrarPrestacion = async () => {
  await service.deletePrestacion(idPrestacion.value)
  emits('emiteModal')
}
</script>
<style scoped lang="scss">
#emailHelp {
  font-size: small;
}
</style>
