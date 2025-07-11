<template>
  <div class="list row">
    <p class="col-10 col-sm-10 col-md-1 col-lg-1 col-xl-1">
      {{ props.content.dni }}
    </p>
    <h5 class="nombreCliente col-10 col-sm-10 col-md-5 col-lg-5 col-xl-5">
      {{ props.content.nombre }} {{ props.content.apellido1 }} {{ props.content.apellido2 }} &nbsp;
      <ClienteModalComponent :dni="props.content.dni" :nombre="props.content.nombre"
        :apellido1="props.content.apellido1" :apellido2="props.content.apellido2" :tfno="props.content.tfno"
        :correo="props.content.correo" :idCliente="props.content.idString" @emiteModal="actualizarClienteEnElemento" />
    </h5>
    <p class="col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3">
      {{ props.content.correo }}
    </p>
    <p class="col-10 col-sm-10 col-md-1 col-lg-1 col-xl-1">
      {{ props.content.tfno }}
    </p>
    <div class="d-flex align-items-center col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2">
      <MascotasDeClienteModalComponent :nombre="props.content.nombre" :idCliente="props.content.idString" :apellido1="props.content.apellido1" :apellido2="props.content.apellido2"/>
    </div>
  </div>
</template>
<script setup>
import ClienteModalComponent from './ClienteModalComponent.vue'
import MascotasDeClienteModalComponent from './MascotasDeClienteModalComponent.vue'
const props = defineProps(['content'])
const emits = defineEmits(['emiteElemento'])
function actualizarClienteEnElemento() {
  emits('emiteElemento')
}
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

.nombreCliente {
  color: $red;
}
</style>
