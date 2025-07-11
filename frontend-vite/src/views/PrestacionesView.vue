<template>
  <hr class="w-100" />
  <div class="row justify-content-end">
    <button class="btn btn-warning text-white col-2 me-2" @click="getPrestaciones()">
      {{ $t('prestaciones.allPrestaciones') }}</button>
    <button type="button" class="btn btn-success col-2 me-2" @click="verPagadas">
      {{ $t('prestaciones.pagadas') }}
    </button>
    <button type="button" class="btn btn-danger col-2 me-2" @click="verNoPagadas">
      {{ $t('prestaciones.noPagadas') }}
    </button>
    <button class="btn btn-primary text-white col-2" data-bs-toggle="modal" data-bs-target="#modal-nueva-prestacion">
      {{ $t('prestaciones.nuevaPrestacion') }}
    </button>
    <span class="p-3 text-center"><b>{{ $t('prestaciones.pagada') }}: </b><a href="#" data-bs-toggle="tooltip"
        :title="$t('prestaciones.pagada')"><v-icon name="fa-check" color="green" scale="2" /></a>
    <b class="ms-2">{{ $t('prestaciones.noPagada') }}: </b><a href="#" data-bs-toggle="tooltip"
        :title="$t('prestaciones.noPagada')"><v-icon name="fa-times" color="red" scale="2" /></a></span>
  </div>
  <hr class="w-100" />
  <h1 v-titulo.xl.blue class="text-center">
    <b>{{ $t('prestaciones.prestacionesList') }}</b>
  </h1>
  <hr class="w-100" />
  <div class="container">
    <button class="btn btn-primary btn-mr-3" @click="elegirLayout(PrestacionesListLayout)">
      <b>{{ $t('comun.lista') }}</b></button>&nbsp;&nbsp;&nbsp;&nbsp;
    <button class="btn btn-success mr-3" @click="elegirLayout(PrestacionesCardsLayout)">
      <b>{{ $t('comun.tarjetas') }}</b></button>&nbsp;&nbsp;&nbsp;&nbsp;{{ $t('prestaciones.alojamiento') }}:<v-icon
      name="gi-dog-house" color="blue" scale="2" />&nbsp;&nbsp;&nbsp;&nbsp;{{ $t('prestaciones.alimentacion') }}:<v-icon
      name="gi-dog-bowl" color="red" scale="2" />
    <component :is="layout" :content="prestacionesFiltradas" @emiteLayout="actualizarPrestacionEnLista" />
  </div>
  <!-- Modal -->
  <div class="modal fade" id="modal-nueva-prestacion" tabindex="-1" aria-labelledby="modal-nueva-prestacion-Label"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modal-nueva-prestacion-Label">
            {{ $t('prestaciones.nuevaPrestacion') }}
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="fechaEntrada" class="form-label"><b>{{ $t('prestaciones.fechaEntrada') }}:</b></label>
              <input type="date" class="form-control" id="fechaEntrada" v-model="fechaEntrada" />
            </div>
            <div class="mb-3">
              <label for="fechaSalida" class="form-label"><b>{{ $t('prestaciones.fechaSalida') }}:</b></label>
              <input type="date" class="form-control" id="fechaSalida" v-model="fechaSalida" />
            </div>
            <div class="mb-3">
              <label for="tipo" class="form-label"><b>{{ $t('prestaciones.tipo') }}</b></label><br />
              <input type="radio" id="alojamiento" value="Alojamiento" v-model="tipo" />&nbsp;
              <label for="alojamiento">{{ $t('prestaciones.alojamiento') }}</label><a href="#" data-bs-toggle="tooltip"
                :title="$t('prestaciones.alojamiento')"><v-icon name="gi-dog-house" color="blue"
                  scale="2" /></a>&nbsp;&nbsp;
              <input type="radio" id="alimentacion" value="Alimentación" v-model="tipo" />&nbsp;
              <label for="alimentacion">{{ $t('prestaciones.alimentacion') }}</label><a href="#"
                data-bs-toggle="tooltip" :title="$t('prestaciones.alimentacion')"><v-icon name="gi-dog-bowl" color="red"
                  scale="2" /></a>
            </div>
            <div class="mb-3">
              <label for="jaula" class="form-label"><b>{{ $t('prestaciones.jaula') }}:</b></label>
              <select class="form-select" aria-label="jaula" v-model="jaula">
                <option disabled value="">{{ $t('prestaciones.selectJaula') }}</option>
                <option v-for="jaula in jaulas" :key="jaula" :value="jaula">
                  {{ jaula }}
                </option>
              </select>
            </div>
            <div class="mb-3" v-if="tipo == 'Alimentación'">
              <label for="tipoComida" class="form-label"><b>{{ $t('prestaciones.tipoComida') }}:</b></label>
              <br />
              <input type="radio" id="normal" value="NORMAL" v-model="tipoComida" />&nbsp;
              <label for="normal">{{ $t('prestaciones.normal') }}</label>&nbsp;&nbsp;
              <input type="radio" id="premium" value="PREMIUM" v-model="tipoComida" />&nbsp;
              <label for="premium">{{ $t('prestaciones.premium') }}</label>
            </div>
            <div class="mb-3" v-if="tipo == 'Alimentación'">
              <label for="cantidadComidaDiaria" class="form-label"><b>{{ $t('prestaciones.cantidadComidaDiaria')
                  }} (grs.):</b></label>
              <select class="form-select" aria-label="cantidad" v-model="cantidadComidaDiaria">
                <option disabled :value="null">{{ $t('prestaciones.selectCantidad') }}</option>
                <option v-for="cantidad in [50, 100, 150, 200, 250, 300, 350, 400, 450, 500]" :key="cantidad"
                  :value="cantidad">
                  {{ cantidad }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label for="precio" class="form-label"><b>{{ $t('prestaciones.precio') }}: </b> {{ precioPrestacion }}
                €</label>
            </div>
            <div class="mb-3">
              <label for="pagada" class="form-label"><b>{{ $t('prestaciones.pagada') }}:</b></label><br />
              <input type="radio" id="pagada" value="true" v-model="pagada" />&nbsp;
              <label for="pagada"><a href="#" data-bs-toggle="tooltip" :title="$t('prestaciones.pagada')"><v-icon
                    name="fa-check" color="green" scale="2" /></a></label>&nbsp;&nbsp;
              <input type="radio" id="noPagada" value="false" v-model="pagada" />&nbsp;
              <label for="noPagada"><a href="#" data-bs-toggle="tooltip" :title="$t('prestaciones.noPagada')"><v-icon
                    name="fa-times" color="red" scale="2" /></a></label>
            </div>
            <div class="mb-3">
              <label for="mascota" class="form-label"><b>{{ $t('mascotas.mascotas', 1).toUpperCase() }}</b></label>
              <select class="form-select" aria-label="mascota" v-model="idMascota">
                <option disabled value="">{{ $t('prestaciones.selectMascota') }}</option>
                <option v-for="mascota in mascotas" :key="mascota.idString" :value="mascota.idString">
                  {{ mascota.nombre }}
                </option>
              </select>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            {{ $t('comun.cerrar') }}
          </button>
          <button type="button" @click="crearPrestacion" data-bs-dismiss="modal" class="btn btn-primary">
            {{ $t('prestaciones.crearPrestacion') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import MascotaService from '@/services/MascotaService'
import PrestacionService from '@/services/PrestacionService'
import useUtilsStore from '@/stores/utils'
import { defineAsyncComponent, ref, onMounted, computed } from 'vue'
const utils = useUtilsStore()
const jaulas = utils.jaulas
let fechaEntrada = ref('')
let fechaSalida = ref('')
let cantidadComidaDiaria = ref(null)
let tipo = ref('')
let jaula = ref('')
let tipoComida = ref('NORMAL')
let pagada = ref(false)
let idMascota = ref('')
let dias = ref(0)
let precioPrestacion = ref(0)
const precioAlojamientoDia = ref(utils.precioAlojamientoDia)
const precioNormalCincuenta = ref(utils.precioNormalCincuenta)
const precioPremiumCincuenta = ref(utils.precioPremiumCincuenta)
dias = computed(() => (!fechaEntrada.value || !fechaSalida.value) ? 0 : Math.round((new Date(fechaSalida.value) - new Date(fechaEntrada.value)) / (1000 * 60 * 60 * 24)))

precioPrestacion = computed(() => tipo.value == "Alojamiento" && fechaEntrada.value && fechaSalida.value
  ? dias.value * precioAlojamientoDia.value
  : tipo.value == "Alimentación" && fechaEntrada.value && fechaSalida.value && tipoComida.value == "NORMAL"
    ? dias.value * precioNormalCincuenta.value * cantidadComidaDiaria.value / 50 + dias.value * precioAlojamientoDia.value
    : tipo.value == "Alimentación" && fechaEntrada.value && fechaSalida.value && tipoComida.value == "PREMIUM"
      ? dias.value * precioPremiumCincuenta.value * cantidadComidaDiaria.value / 50 + dias.value * precioAlojamientoDia.value
      : 0
)
const prestacionService = new PrestacionService()
const mascotaService = new MascotaService()
const mascotas = mascotaService.getMascotas()
const prestaciones = prestacionService.getPrestaciones()
let prestacionesFiltradas = ref([])
prestacionesFiltradas.value = prestaciones.value
const PrestacionesListLayout = defineAsyncComponent(() => import('@/layouts/PrestacionesListLayout.vue'))
const PrestacionesCardsLayout = defineAsyncComponent(
  () => import('@/layouts/PrestacionesCardsLayout.vue'),
)
const layout = ref(PrestacionesListLayout)

onMounted(async () => {
  await getPrestaciones()
  await getMascotas()
})
const crearPrestacion = async () => {
  if (tipo.value == 'Alojamiento') {
    await prestacionService.crearAlojamiento(
      jaula.value, pagada.value, fechaEntrada.value, fechaSalida.value, idMascota.value
    )
    jaula.value = ''
    pagada.value = ''
    fechaEntrada.value = ""
    fechaSalida.value = ""
    idMascota.value = ''
  } else if (tipo.value == 'Alimentación') {
    await prestacionService.crearAlimentacion(
      tipoComida.value, cantidadComidaDiaria.value, pagada.value, fechaEntrada.value, fechaSalida.value, idMascota.value)
    await prestacionService.crearAlojamiento(
      jaula.value, pagada.value, fechaEntrada.value, fechaSalida.value, idMascota.value
    )
    jaula.value = ''
    tipoComida.value = 'NORMAL'
    cantidadComidaDiaria.value = null
    pagada.value = ''
    fechaEntrada.value = ""
    fechaSalida.value = ""
    idMascota.value = ''
  }
  await getPrestaciones()
  await getMascotas()
}
const getPrestaciones = async () => {
  await prestacionService.fetchAll()
  agregarMascotas()
  prestacionesFiltradas.value = prestaciones.value
}
const elegirLayout = (layoutElegido) => (layout.value = layoutElegido)
const filtrarPrestacion = () => {
  (prestacionesFiltradas.value = prestaciones.value.filter((prestacion) =>
    prestacion.mascota.toLowerCase().includes(search.value.toLowerCase())
  ))
}
async function actualizarPrestacionEnLista() {
  await getPrestaciones()
}
const getMascotas = async () => {
  await mascotaService.fetchAll()
}
async function agregarMascotas() {
  for (const prestacion of prestaciones.value) {
    prestacion.mascota = await getMascotaDePrestacion(prestacion.idString)
  }
}
async function getMascotaDePrestacion(idPrestacion) {
  let mascota = await prestacionService.getMascotaDePrestacion(idPrestacion)
  return mascota
}
// Cálculo opcional de días entre fechas (si lo necesitas en frontend)
const diasEntre = computed(() => {
  if (!fechaEntrada.value || !fechaSalida.value) return 0;
  const f1 = new Date(fechaEntrada.value);
  const f2 = new Date(fechaSalida.value);
  const diff = (f2 - f1) / (1000 * 60 * 60 * 24);
  return Math.round(diff);
});

const verPagadas = (async () => {
  await prestacionService.getPrestacionesPagadas()
  prestacionesFiltradas.value = prestaciones.value
})
const verNoPagadas = (async () => {
  await prestacionService.getPrestacionesNoPagadas()
  prestacionesFiltradas.value = prestaciones.value
})
</script>
<style scoped lang="scss"></style>
