<template>
  <!-- Llamada al modal-->
  <button class="btn btn-dark" :data-bs-target="'#' + idModal" data-bs-toggle="modal">
    <b>{{ toTitleCase($t('prestaciones.prestaciones', 2)) }}</b>
  </button>
  <!-- Modal -->
  <div class="modal fade" :id="idModal" tabindex="-1" aria-labelledby="modal-editar-cliente-Label" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modal-editar-cliente-Label">
            <b>{{ $t('mascotas.prestacionesDeMascota') }}: </b><span class="nombreMascota"> {{ props.nombre }}</span>
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <h3 v-if="!hayPrestaciones" class="mt-3 sinPrestaciones">{{ $t('mascotas.noPrestaciones') }}</h3>
          <div v-if="hayPrestaciones">
            <button type="button" class="btn btn-primary" @click="verTodas">
              {{ $t('prestaciones.todas') }}
            </button> <br>
            <button type="button" class="btn btn-success" @click="verPagadas">
              {{ $t('prestaciones.pagadas') }}
            </button><span class="p-3"><b>{{ $t('prestaciones.pagada') }}: </b><a href="#" data-bs-toggle="tooltip"
                :title="$t('prestaciones.pagada')"><v-icon name="fa-check" color="green" scale="2" /></a></span>
            <br>
            <button type="button" class="btn btn-danger" @click="verNoPagadas">
              {{ $t('prestaciones.noPagadas') }}
            </button><span class="p-3"><b>{{ $t('prestaciones.noPagada') }}: </b><a href="#" data-bs-toggle="tooltip"
                :title="$t('prestaciones.noPagada')"><v-icon name="fa-times" color="red" scale="2" /></a></span>
            <hr />
            <div class="text-center">
              <div class="text-center" v-for="(prestacion, index) in prestacionesMascota" :key="index"
                style="width: 50%; display: inline-block; border: solid">
                <div class="card shadow-sm h-100">
                  <img class="card-img-top" alt="" />
                  <div class="card-body">
                    <h4 class="card-title text-center">
                      <b>{{ prestacion.tipo.toUpperCase() }}</b>
                      <span v-if="prestacion.tipo == 'Alojamiento'"><a href="#" data-bs-toggle="tooltip"
                          :title="$t('prestaciones.alojamiento')"><v-icon name="gi-dog-house" color="blue"
                            scale="2" /></a></span>
                      <span v-if="prestacion.tipo == 'Alimentación'"><a href="#" data-bs-toggle="tooltip"
                          :title="$t('prestaciones.alimentacion')"><v-icon name="gi-dog-bowl" color="red"
                            scale="2" /></a></span>
                    </h4>
                    <p class="card-text">
                      <span class="mr-2"><b>{{ $t('prestaciones.fechaEntrada') }}:</b>&nbsp;</span>
                      <span>{{ formatearFecha(prestacion.fechaEntrada) }}</span>
                    </p>
                    <p class="card-text">
                      <span class="mr-2"><b>{{ $t('prestaciones.fechaSalida') }}:</b>&nbsp;</span>
                      <span>{{ formatearFecha(prestacion.fechaSalida) }}</span>
                    </p>
                    <p class="card-text" v-if="prestacion.tipo == 'Alojamiento'">
                      <span class="mr-2"><b>{{ $t('prestaciones.jaula') }}:</b>&nbsp;</span>
                      <span>{{ prestacion.jaula }}</span>
                    </p>
                    <p class="card-text" v-if="prestacion.tipo == 'Alimentación'">
                      <span class="mr-2"><b>{{ $t('prestaciones.tipoComida') }}:</b>&nbsp;</span>
                      <span>{{ prestacion.tipoComida }}</span>
                    </p>
                    <p class="card-text" v-if="prestacion.tipo == 'Alimentación'">
                      <span class="mr-2"><b>{{ $t('prestaciones.cantidadComidaDiaria') }}:</b>&nbsp;</span>
                      <span>{{ prestacion.cantidadComidaDiaria }} gr</span>
                    </p>
                    <p class="card-text">
                      <span class="mr-2"><b>{{ $t('prestaciones.precio') }}:</b>&nbsp;</span>
                      <span>{{ prestacion.precioPrestacion }} €</span>
                      <span v-if="prestacion.pagada"><a href="#" data-bs-toggle="tooltip"
                          :title="$t('prestaciones.pagada')"><v-icon name="fa-check" color="green"
                            scale="2" /></a></span>
                      <span v-if="!prestacion.pagada"><a href="#" data-bs-toggle="tooltip"
                          :title="$t('prestaciones.noPagada')"><v-icon name="fa-times" color="red"
                            scale="2" /></a></span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </div>
        </div>
        <hr>
        <div class="text-center" v-if="mostrarTotalPorPagar">
          <p><b>{{ $t('prestaciones.precioTotal') }}:</b> {{ precioTotal }} €</p>
          <button type="button" class="btn btn-warning" @click="enviarFactura" data-bs-dismiss="modal">
            {{ $t('mascotas.enviarFactura') }}
          </button>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success" data-bs-dismiss="modal">
            {{ $t('comun.cerrar') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import MascotaService from '@/services/MascotaService'
import PrestacionService from '@/services/PrestacionService'
import { formatearFecha, toTitleCase } from '@/utils'
import { onMounted, ref } from 'vue'

const props = defineProps(['nombre', 'idMascota'])
let idModal = 'modal-mascota-prestaciones' + props.idMascota
let prestacionesMascota = ref([])
let hayPrestaciones = ref(false)
let mostrarTotalPorPagar = ref(false)
let precioTotal = ref(0)
onMounted(async () => {
  const service = new PrestacionService()
  let prestaciones = service.getPrestaciones()
  await service.getPrestacionesDeMascota(props.idMascota)
  prestacionesMascota.value = prestaciones.value
  hayPrestaciones.value = prestaciones.value.length != 0
})

const verTodas = (async () => {
  const service = new PrestacionService()
  let prestaciones = service.getPrestaciones()
  await service.getPrestacionesDeMascota(props.idMascota)
  prestacionesMascota.value = prestaciones.value
  mostrarTotalPorPagar.value = false
  precioTotal.value = 0
})
const verPagadas = (async () => {
  const service = new MascotaService()
  let prestaciones = service.getPrestaciones()
  await service.getPrestacionesPagadasDeMascota(props.idMascota)
  prestacionesMascota.value = prestaciones.value
  mostrarTotalPorPagar.value = false
  precioTotal.value = 0
})
const verNoPagadas = (async () => {
  const service = new MascotaService()
  let prestaciones = service.getPrestaciones()
  await service.getPrestacionesNoPagadasDeMascota(props.idMascota)
  prestacionesMascota.value = prestaciones.value
  mostrarTotalPorPagar.value = true
  precioTotal.value = 0
  prestacionesMascota.value.forEach(prestacion => precioTotal.value += prestacion.precioPrestacion)
})
const enviarFactura = (async () => {
  const service = new MascotaService()
  await service.enviarFactura(props.idMascota)
}) 
</script>
<style scoped lang="scss">
.card {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.sinPrestaciones {
  color: red;
}

.nombreMascota {
  color: blue;
}
</style>
