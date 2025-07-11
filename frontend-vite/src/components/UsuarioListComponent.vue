<template>
  <div class="list">
    <h5 class="username col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3">
      {{ props.content.username }}
      &nbsp;
      <UsuarioModalComponent
        :nombre="props.content.nombre"
        :apellido="props.content.apellido"
        :username="props.content.username"
        :pais="props.content.pais"
        :idUsuario="props.content.idString"
        :rol="props.content.rol"
        @emiteModal="actualizarUsuarioEnElemento"
      />
    </h5>
    <p class="col-10 col-sm-10 col-md-4 col-lg-4 col-xl-4">
      {{ props.content.nombre }} {{ props.content.apellido }}
    </p>
    <p class="col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3">{{ props.content.pais }}</p>
    <p
      class="col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2 text-center"
      v-if="props.content.rol == 'ADMIN'"
    >
      <a href="#" data-bs-toggle="tooltip" :title="$t('comun.rolAdmin')"
        ><v-icon name="ri-admin-line" color="red" scale="2" /></a
      >{{ $t('comun.rolAdmin') }}
    </p>
    <p
      class="col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2 text-center"
      v-if="props.content.rol == 'USER'"
    >
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

.username {
  color: red;
}
</style>
