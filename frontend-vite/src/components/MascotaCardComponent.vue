<template>
  <div class="card">
    <h5 class="nombreMascota">
      {{ props.content.nombre }}
      &nbsp;
      <MascotaModalComponent :chip="props.content.chip" :nombre="props.content.nombre" :raza="props.content.raza"
        :talla="props.content.talla" :idMascota="props.content.idString" @emiteModal="actualizarMascotaEnElemento" />
    </h5>
    <p>
      <a href="#" data-bs-toggle="tooltip" :title="$t('mascotas.chip')"><v-icon name="gi-passport" color="red"
          scale="2" /></a>
      {{ props.content.chip }}
    </p>
        <p>
      <b>{{ toTitleCase($t('mascotas.raza')) }}:</b>&nbsp;{{ props.content.raza }}
    </p>
        <p>
      <b>{{ toTitleCase($t('mascotas.talla')) }}:</b>&nbsp;{{ props.content.talla }}
    </p>
    <p>
      <b>{{ toTitleCase($t('clientes.clientes', 1)) }}:</b>&nbsp;{{ cliente }}
    </p>
    <div class="text-center">
      <PrestacionesDeMascotaModalComponent :nombre="props.content.nombre" :idMascota="props.content.idString" />
    </div>
  </div>
</template>
<script setup>
import MascotaService from '@/services/MascotaService';
import MascotaModalComponent from './MascotaModalComponent.vue';
import PrestacionesDeMascotaModalComponent from './PrestacionesDeMascotaModalComponent.vue';
import { onMounted, ref } from 'vue'
import { toTitleCase } from '@/utils'

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
  color: $blue;
}
</style>
