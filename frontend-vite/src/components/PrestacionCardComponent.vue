<template>
  <div class="card">
    <h5>
      <b>{{ toTitleCase($t('mascotas.mascotas', 1)) }}:</b>&nbsp; <span class="nombreMascota">{{ mascota }}</span>
    </h5>
    <h5 class="nombreMascota">
      <span class="text-center" v-if="props.content.tipo == 'Alojamiento'">
        <a href="#" data-bs-toggle="tooltip" :title="$t('prestaciones.alojamiento')"><v-icon name="gi-dog-house"
            color="blue" scale="2" /></a>
      </span>
      <span class="text-center" v-if="props.content.tipo == 'Alimentación'">
        <a href="#" data-bs-toggle="tooltip" :title="$t('prestaciones.alimentacion')"><v-icon name="gi-dog-bowl"
            color="red" scale="2" /></a>
      </span>
      &nbsp;
      <PrestacionModalComponent :fechaEntrada="props.content.fechaEntrada" :tipo="props.content.tipo"
        :idPrestacion="props.content.idString" :fechaSalida="props.content.fechaSalida" :pagada="props.content.pagada"
        :jaula="props.content.jaula" :tipoComida="props.content.tipoComida"
        :cantidadComidaDiaria="props.content.cantidadComidaDiaria" @emiteModal="actualizarPrestacionEnElemento" />
    </h5>
    <p>{{ formatearFecha(props.content.fechaEntrada) }} - {{ formatearFecha(props.content.fechaSalida) }}</p>
    <p v-if="props.content.tipo == 'Alojamiento'">
      <b>{{ $t('prestaciones.jaula') }}:</b>&nbsp;{{ props.content.jaula }}
    </p>
    <p v-if="props.content.tipo == 'Alimentación'">
      <b>{{ $t('prestaciones.tipoComida') }}:</b>&nbsp; {{ props.content.tipoComida }}
    </p>
    <p v-if="props.content.tipo == 'Alimentación'">
      <b>{{ $t('prestaciones.cantidadComidaDiaria') }}:</b>&nbsp; {{ props.content.cantidadComidaDiaria }}
    </p>
    <p>
      <b>{{ $t('prestaciones.precio') }}:</b>&nbsp;
      <span>{{ props.content.precioPrestacion }} €</span>&nbsp;
      <span v-if="props.content.pagada"><a href="#" data-bs-toggle="tooltip" :title="$t('prestaciones.pagada')"><v-icon
            name="fa-check" color="green" scale="2" /></a></span>
      <span v-if="!props.content.pagada"><a href="#" data-bs-toggle="tooltip"
          :title="$t('prestaciones.noPagada')"><v-icon name="fa-times" color="red" scale="2" /></a></span>
    </p>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import useUtilsStore from '@/stores/utils'
import PrestacionModalComponent from './PrestacionModalComponent.vue'
import PrestacionService from '@/services/PrestacionService'
import { formatearFecha, toTitleCase } from '@/utils'
const utils = useUtilsStore()
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
.card {
  background-color: rgb(204, 209, 209);
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  width: 350px;
  margin: 10px;
}

.card:hover {
  background-color: aqua;
}

.nombreMascota {
  color: green;
}
</style>
