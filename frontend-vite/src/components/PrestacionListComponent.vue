<template>
  <div class="list">
    <p class="col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2 nombreMascota">{{ mascota }}</p>
    <h5 class="nombreMascota col-10 col-sm-10 col-md-1 col-lg-1 col-xl-1 text-center">
      <span v-if="props.content.tipo == 'Alojamiento'">
        <a href="#" data-bs-toggle="tooltip" :title="$t('prestaciones.alojamiento')"><v-icon name="gi-dog-house"
            color="blue" scale="2" /></a>
      </span>
      <span v-if="props.content.tipo == 'Alimentación'">
        <a href="#" data-bs-toggle="tooltip" :title="$t('prestaciones.alimentacion')"><v-icon name="gi-dog-bowl"
            color="red" scale="2" /></a>
      </span>
      &nbsp;
      <PrestacionModalComponent :fechaEntrada="props.content.fechaEntrada" :tipo="props.content.tipo"
        :idPrestacion="props.content.idString" :fechaSalida="props.content.fechaSalida" :pagada="props.content.pagada"
        :jaula="props.content.jaula" :tipoComida="props.content.tipoComida"
        :cantidadComidaDiaria="props.content.cantidadComidaDiaria" @emiteModal="actualizarPrestacionEnElemento" />
    </h5>
    <p class="col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2 text-center">{{ formatearFecha(props.content.fechaEntrada) }}</p>
    <p class="col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2 text-center">{{ formatearFecha(props.content.fechaSalida) }}</p>
    <p class="col-10 col-sm-10 col-md-1 col-lg-1 col-xl-1 text-center">{{ props.content.jaula }}</p>
    <p class="col-10 col-sm-10 col-md-1 col-lg-1 col-xl-1 text-center">{{ props.content.tipoComida }}</p>
    <p class="col-10 col-sm-10 col-md-1 col-lg-1 col-xl-1 text-center">{{ props.content.cantidadComidaDiaria }}</p>
    <p class="col-10 col-sm-10 col-md-1 col-lg-1 col-xl-1 text-center">{{ props.content.precioPrestacion }} €</p>
    <p class="col-10 col-sm-10 col-md-1 col-lg-1 col-xl-1 text-center" v-if="props.content.pagada">
      <a href="#" data-bs-toggle="tooltip" :title="$t('prestaciones.pagada')"><v-icon name="fa-check" color="green"
          scale="2" /></a>
    </p>
    <p class="col-10 col-sm-10 col-md-1 col-lg-1 col-xl-1 text-center" v-if="!props.content.pagada">
      <a href="#" data-bs-toggle="tooltip" :title="$t('prestaciones.noPagada')"><v-icon name="fa-times" color="red"
          scale="2" /></a>
    </p>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import PrestacionModalComponent from './PrestacionModalComponent.vue'
import PrestacionService from '@/services/PrestacionService'
import { formatearFecha } from '@/utils'
const props = defineProps(['content'])
const emits = defineEmits(['emiteElemento'])
function actualizarPrestacionEnElemento() {
  emits('emiteElemento')
}
const service = new PrestacionService()
let mascota = ref('')
onMounted(async () => {
  mascota.value = await service.getMascotaDePrestacion(props.content.idString)
})
</script>
<style scoped lang="scss">
.list {
  background-color: rgb(204, 209, 209);
  border-radius: 10px;
  padding: 10px;
  display: flex;
  width: 100%;
  margin: 10px;
  justify-content: space-around;
}

.list:hover {
  background-color: aqua;
}

.nombreMascota {
  color: green;
}
</style>
