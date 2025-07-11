<template>
  <div class="card">
    <h5 class="nombreCliente">
      {{ props.content.nombre }} {{ props.content.apellido1 }} {{ props.content.apellido2 }}
      &nbsp;
      <ClienteModalComponent :dni="props.content.dni" :nombre="props.content.nombre"
        :apellido1="props.content.apellido1" :apellido2="props.content.apellido2" :tfno="props.content.tfno"
        :correo="props.content.correo" :idCliente="props.content.idString" @emiteModal="actualizarClienteEnElemento" />
    </h5>
    <p>
      <a href="#" data-bs-toggle="tooltip" :title="$t('clientes.dni')"><v-icon name="gi-passport" color="red"
          scale="2" /></a>
      {{ props.content.dni }}
    </p>
    <p>
      <a href="#" data-bs-toggle="tooltip" :title="$t('clientes.correo')"><v-icon name="oi-mail" color="red"
          scale="2" /></a>
      {{ props.content.correo }}
    </p>
    <p>
      <a href="#" data-bs-toggle="tooltip" :title="$t('clientes.tfno')"><v-icon name="gi-rotary-phone" color="red"
          scale="2" /></a>
      {{ props.content.tfno }}
    </p>
    <div class="text-center">
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

.nombreCliente {
  color: $blue;
}
</style>
