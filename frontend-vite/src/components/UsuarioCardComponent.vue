<template>
  <div class="card">
    <h5 class="username">
      {{ props.content.username }} &nbsp;<UsuarioModalComponent
        :nombre="props.content.nombre"
        :apellido="props.content.apellido"
        :username="props.content.username"
        :pais="props.content.pais"
        :idUsuario="props.content.idString"
        :rol="props.content.rol"
        @emiteModal="actualizarUsuarioEnElemento"
      />
    </h5>
    <p>{{ props.content.nombre }} {{ props.content.apellido }}</p>
    <p>{{ props.content.pais }}</p>
    <p v-if="props.content.rol == 'ADMIN'">
      <a href="#" data-bs-toggle="tooltip" :title="$t('comun.rolAdmin')"
        ><v-icon name="ri-admin-line" color="red" scale="2" /></a
      >{{ $t('comun.rolAdmin') }}
    </p>
    <p v-if="props.content.rol == 'USER'">
      <a href="#" data-bs-toggle="tooltip" :title="$t('comun.rolUser')"
        ><v-icon name="fa-user" color="blue" scale="2" /></a
      >{{ $t('comun.rolUser') }}
    </p>
  </div>
</template>
<script setup>
import UsuarioModalComponent from './UsuarioModalComponent.vue'
const props = defineProps(['content'])
const emits = defineEmits(['emiteElemento'])
function actualizarUsuarioEnElemento() {
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
.username {
  color: blue;
}
</style>
