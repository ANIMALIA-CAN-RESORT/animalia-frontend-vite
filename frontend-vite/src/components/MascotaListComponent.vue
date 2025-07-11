<template>
  <div class="list row">
    <p class="col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2">
      {{ cliente }}
    </p>
    <p class="col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2">
      {{ props.content.chip }}
    </p>
    <h5 class="nombreMascota col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2">
      {{ props.content.nombre }} &nbsp;
      <MascotaModalComponent :chip="props.content.chip" :nombre="props.content.nombre" :raza="props.content.raza"
        :talla="props.content.talla" :idMascota="props.content.idString" @emiteModal="actualizarMascotaEnElemento" />
    </h5>
    <p class="col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2">
      {{ props.content.raza }}
    </p>
    <p class="col-10 col-sm-10 col-md-1 col-lg-1 col-xl-1">
      {{ props.content.talla }}
    </p>
    <div class="col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3 text-center">
      <PrestacionesDeMascotaModalComponent :nombre="props.content.nombre" :idMascota="props.content.idString" />
    </div>
  </div>
</template>
<script setup>
import MascotaService from '@/services/MascotaService';
import MascotaModalComponent from './MascotaModalComponent.vue';
import PrestacionesDeMascotaModalComponent from './PrestacionesDeMascotaModalComponent.vue';
import { onMounted, ref } from 'vue'

const service = new MascotaService()
const props = defineProps(['content'])
const emits = defineEmits(['emiteElemento'])
function actualizarMascotaEnElemento() {
  emits('emiteElemento')
}
let cliente = ref('')
onMounted(async () => {
  cliente.value = await service.getClienteDeMascota(props.content.idString)
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
  color: $red;
}
</style>
