<template>
  <hr class="w-100" />
  <hr class="w-100" />
  <h1 v-titulo.xl.blue class="text-center">
    <b>{{ $t('administracion.usuarioList') }}</b>
  </h1>
  <hr class="w-100" />
  <div class="container">
    <input
      type=" text"
      :placeholder="$t('administracion.filtrar')"
      class="mr-5"
      v-model="search"
      @keyup="filtrarUsuario"
    />&nbsp;&nbsp;&nbsp;&nbsp;
    <button class="btn btn-primary btn-mr-3" @click="elegirLayout(UsuariosListLayout)">
      <b>{{ $t('comun.lista') }}</b></button
    >&nbsp;&nbsp;&nbsp;&nbsp;
    <button class="btn btn-success mr-3" @click="elegirLayout(UsuariosCardsLayout)">
      <b>{{ $t('comun.tarjetas') }}</b>
    </button>
    <component :is="layout" :content="usuariosFiltrados" @emiteLayout="actualizarUsuarioEnLista" />
  </div>
</template>
<script setup>
import { defineAsyncComponent, ref, onMounted } from 'vue'
import UsuarioService from '@/services/UsuarioService'

const service = new UsuarioService()
const usuarios = service.getUsuarios()
let usuariosFiltrados = ref([])
usuariosFiltrados.value = usuarios.value
const UsuariosListLayout = defineAsyncComponent(() => import('@/layouts/UsuariosListLayout.vue'))
const UsuariosCardsLayout = defineAsyncComponent(() => import('@/layouts/UsuariosCardsLayout.vue'))
const layout = ref(UsuariosListLayout)
const search = ref('')

onMounted(async () => {
  await getUsuarios()
})
const getUsuarios = async () => {
  await service.fetchAll()
  usuariosFiltrados.value = usuarios.value
  search.value = ''
}
const elegirLayout = (layoutElegido) => (layout.value = layoutElegido)
const filtrarUsuario = () =>
  (usuariosFiltrados.value = usuarios.value.filter((usuario) => {
    usuario.nombre.toLowerCase().includes(search.value.toLowerCase())
  }))
function actualizarUsuarioEnLista() {
  getUsuarios()
}
</script>
<style scoped lang="scss"></style>
