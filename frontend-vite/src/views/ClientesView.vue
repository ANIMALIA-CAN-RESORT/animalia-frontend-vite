<template>
  <hr class="w-100" />
  <div class="row justify-content-end">
    <button class="btn btn-danger text-white col-2" @click="getClientes()">
      {{ $t('clientes.allClientes') }}</button>&nbsp;&nbsp;&nbsp;&nbsp;
    <button class="btn btn-warning text-white col-2" @click="aBuscar()">
      {{ $t('clientes.clientesEmpresa') }}</button>&nbsp;&nbsp;&nbsp;&nbsp;
    <button class="btn btn-primary text-white col-2" data-bs-toggle="modal" data-bs-target="#modal-nuevo-cliente">
      {{ $t('clientes.nuevoCliente') }}
    </button>
  </div>
  <div class="row justify-content-end mt-2" v-if="buscar">
    <hr />
    <label class="mt-2 col-2"><b>{{ $t('clientes.mailEmpresa') }}:</b></label>
    <input class="col-2" type="text" name="empresa" :placeholder="$t('clientes.empresa')"
      v-model="empresa" />&nbsp;&nbsp;&nbsp;&nbsp;
    <button class="btn btn-danger text-white mr-3 ml-3 col-1" @click="buscarPorEmpresa()">
      {{ $t('comun.buscar') }}
    </button>
  </div>
  <hr class="w-100" />
  <h1 v-titulo.xl.blue class="text-center">
    <b>{{ $t('clientes.clienteList') }}</b>
  </h1>
  <hr class="w-100" />
  <div class="container">
    <input type=" text" :placeholder="$t('clientes.filtrar')" class="mr-5" v-model="search"
      @keyup="filtrarCliente" />&nbsp;&nbsp;&nbsp;&nbsp;
    <button class="btn btn-primary btn-mr-3" @click="elegirLayout(ClientesListLayout)">
      <b>{{ $t('comun.lista') }}</b></button>&nbsp;&nbsp;&nbsp;&nbsp;
    <button class="btn btn-success mr-3" @click="elegirLayout(ClientesCardsLayout)">
      <b>{{ $t('comun.tarjetas') }}</b>
    </button>
    <component :is="layout" :content="clientesFiltrados" @emiteLayout="actualizarClienteEnLista" />
  </div>
  <!-- Modal -->
  <div class="modal fade" id="modal-nuevo-cliente" tabindex="-1" aria-labelledby="modal-nuevo-cliente-Label"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modal-nuevo-cliente-Label">
            {{ $t('clientes.nuevoCliente') }}
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="dni" class="form-label"><b>{{ toTitleCase($t('clientes.dni')) }}</b></label>
              <input type="text" class="form-control" id="dni" v-model="dni" />
            </div>
            <div class="mb-3">
              <label for="nombre" class="form-label"><b>{{ toTitleCase($t('clientes.nombre')) }}</b></label>
              <input type="text" class="form-control" id="nombre" v-model="nombreCliente" />
            </div>
            <div class="mb-3">
              <label for="apellido1" class="form-label"><b>{{ toTitleCase($t('clientes.apellido1')) }}</b></label>
              <input type="text" class="form-control" id="apellido1" v-model="apellido1" />
            </div>
            <div class="mb-3">
              <label for="apellido2" class="form-label"><b>{{ toTitleCase($t('clientes.apellido2')) }}</b></label>
              <input type="text" class="form-control" id="apellido2" v-model="apellido2" />
            </div>
            <div class="mb-3">
              <label for="tfno" class="form-label"><b>{{ toTitleCase($t('clientes.tfno')) }}</b></label>
              <input type="text" class="form-control" id="tfno" v-model="tfno" />
            </div>

            <div class="mb-3">
              <label for="InputEmail1" class="form-label"><b>{{ toTitleCase($t('clientes.correo')) }}</b></label>
              <input type="email" class="form-control" id="InputEmail1" aria-describedby="emailHelp"
                v-model="correoCliente" />
              <div id="emailHelp" class="form-text">{{ $t('clientes.helpMail') }}</div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            {{ $t('comun.cerrar') }}
          </button>
          <button type="button" @click="crearCliente" data-bs-dismiss="modal" class="btn btn-primary">
            {{ $t('clientes.crearCliente') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineAsyncComponent, ref, onMounted } from 'vue'
import ClienteService from '@/services/ClienteService'
import { toTitleCase } from '@/utils'

let dni = ref('')
let nombreCliente = ref('')
let apellido1 = ref('')
let apellido2 = ref('')
let tfno = ref('')
let correoCliente = ref('')
let empresa = ref('')
let buscar = ref(false)
const service = new ClienteService()
const clientes = service.getClientes()
let clientesFiltrados = ref([])
clientesFiltrados.value = clientes.value
const ClientesListLayout = defineAsyncComponent(() => import('@/layouts/ClientesListLayout.vue'))
const ClientesCardsLayout = defineAsyncComponent(() => import('@/layouts/ClientesCardsLayout.vue'))
const layout = ref(ClientesListLayout)
const search = ref('')

onMounted(async () => {
  await getClientes()
})
const crearCliente = async () => {
  await service.crearCliente(dni.value, nombreCliente.value, apellido1.value, apellido2.value, tfno.value,correoCliente.value)
  dni.value = ''
  nombreCliente.value = ''
  apellido1.value = ''
  apellido2.value = ''
  tfno.value = ''
  correoCliente.value = ''
  await getClientes()
}
const aBuscar = () => {
  buscar.value = !buscar.value
}
const buscarPorEmpresa = async () => {
  await service.fetchPorEmpresa(empresa.value)
  filtrarCliente()
}
const getClientes = async () => {
  await service.fetchAll()
  clientesFiltrados.value = clientes.value
  empresa.value = ''
  buscar.value = false
  search.value = ''
}
const elegirLayout = (layoutElegido) => (layout.value = layoutElegido)
const filtrarCliente = () =>
(clientesFiltrados.value = clientes.value.filter((cliente) =>
    (`${cliente.nombre} ´${cliente.apellido1} ${cliente.apellido2}`).toLowerCase().includes(search.value.toLowerCase())
))
function actualizarClienteEnLista() {
  getClientes()
}
</script>
<style scoped lang="scss">
#emailHelp {
  font-size: small;
}
</style>
