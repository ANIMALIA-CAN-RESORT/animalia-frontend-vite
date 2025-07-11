<template>
  <hr class="w-100" />
  <div class="row justify-content-end">
    <button class="btn btn-danger text-white col-2" @click="getMascotas()">
      {{ $t('mascotas.allMascotas') }}</button>&nbsp;&nbsp;&nbsp;&nbsp;
    <button class="btn btn-warning text-white col-2" @click="aBuscar()">
      {{ $t('mascotas.mascotasEmpresa') }}</button>&nbsp;&nbsp;&nbsp;&nbsp;
    <button class="btn btn-primary text-white col-2" data-bs-toggle="modal" data-bs-target="#modal-nueva-mascota">
      {{ $t('mascotas.nuevaMascota') }}
    </button>
  </div>
  <div class="row justify-content-end mt-2" v-if="buscar">
    <hr />
    <label class="mt-2 col-2"><b>{{ $t('mascotas.mailEmpresa') }}:</b></label>
    <input class="col-2" type="text" name="empresa" :placeholder="$t('mascotas.empresa')"
      v-model="empresa" />&nbsp;&nbsp;&nbsp;&nbsp;
    <button class="btn btn-danger text-white mr-3 ml-3 col-1" @click="buscarPorEmpresa()">
      {{ $t('comun.buscar') }}
    </button>
  </div>
  <hr class="w-100" />
  <h1 v-titulo.xl.blue class="text-center">
    <b>{{ $t('mascotas.mascotaList') }}</b>
  </h1>
  <hr class="w-100" />
  <div class="container">
    <input type=" text" :placeholder="$t('mascotas.filtrar')" class="mr-5" v-model="search"
      @keyup="filtrarMascota" />&nbsp;&nbsp;&nbsp;&nbsp;
    <button class="btn btn-primary btn-mr-3" @click="elegirLayout(MascotasListLayout)">
      <b>{{ $t('comun.lista') }}</b></button>&nbsp;&nbsp;&nbsp;&nbsp;
    <button class="btn btn-success mr-3" @click="elegirLayout(MascotasCardsLayout)">
      <b>{{ $t('comun.tarjetas') }}</b>
    </button>
    <component :is="layout" :content="mascotasFiltradas" @emiteLayout="actualizarMascotaEnLista" />
  </div>
  <!-- Modal -->
  <div class="modal fade" id="modal-nueva-mascota" tabindex="-1" aria-labelledby="modal-nueva-mascota-Label"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modal-nueva-mascota-Label">
            {{ $t('mascotas.nuevaMascota') }}
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="nombre" class="form-label"><b>{{ $t('mascotas.nombre') }}</b></label>
              <input type="text" class="form-control" id="nombre" v-model="nombreMascota" />
            </div>
            <div class="mb-3">
              <label for="chip" class="form-label"><b>{{ $t('mascotas.chip') }}</b></label>
              <input type="text" class="form-control" id="chip" v-model="chip" />
            </div>
            <div class="mb-3">
              <label for="raza" class="form-label"><b>{{ $t('mascotas.raza') }}</b></label>
              <input type="text" class="form-control" id="raza" v-model="raza" />
            </div>
            <div class="mb-3">
              <label for="talla" class="form-label"><b>{{ $t('mascotas.talla') }}</b></label>
              <select class="form-select" aria-label="talla" v-model="talla">
                <option disabled value="">{{ $t('mascotas.selectTalla') }}</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="cliente" class="form-label"><b>{{ $t('clientes.clientes', 1).toUpperCase() }}</b></label>
              <select class="form-select" aria-label="cliente" v-model="idCliente">
                <option disabled value="">{{ $t('mascotas.selectCliente') }}</option>
                <option v-for="cliente in clientes" :key="cliente.idString" :value="cliente.idString">
                  {{ cliente.nombre }} {{ cliente.apellido1 }} {{ cliente.apellido2 }}
                </option>
              </select>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            {{ $t('comun.cerrar') }}
          </button>
          <button type="button" @click="crearMascota" data-bs-dismiss="modal" class="btn btn-primary">
            {{ $t('mascotas.crearMascota') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineAsyncComponent, ref, onMounted } from 'vue'
import MascotaService from '@/services/MascotaService'
import ClienteService from '@/services/ClienteService'

let nombreMascota = ref('')
let chip = ref('')
let raza = ref('')
let talla = ref('')
let idCliente = ref('')
let empresa = ref('')
let buscar = ref(false)
const service = new MascotaService()
const clienteService = new ClienteService()
const clientes = clienteService.getClientes()
const mascotas = service.getMascotas()
let mascotasFiltradas = ref([])
mascotasFiltradas.value = mascotas.value
const MascotasListLayout = defineAsyncComponent(() => import('@/layouts/MascotasListLayout.vue'))
const MascotasCardsLayout = defineAsyncComponent(() => import('@/layouts/MascotasCardsLayout.vue'))
const layout = ref(MascotasListLayout)
const search = ref('')

onMounted(async () => {
  await getMascotas()
  await getClientes()
})
const crearMascota = async () => {
  await service.crearMascota(nombreMascota.value, chip.value, raza.value, talla.value, idCliente.value) 
  chip.value = ''
  nombreMascota.value = ''
  raza.value = ''
  talla.value = ''
  idCliente.value = ''
  await getMascotas()
}
const aBuscar = () => {
  buscar.value = !buscar.value
}
const buscarPorEmpresa = async () => {
  await service.fetchPorEmpresa(empresa.value)
  filtrarMascota()
}
const getMascotas = async () => {
  await service.fetchAll()
  mascotasFiltradas.value = mascotas.value
  empresa.value = ''
  buscar.value = false
  search.value = ''
}

const getClientes = async () => await clienteService.fetchAll()
const elegirLayout = (layoutElegido) => (layout.value = layoutElegido)
const filtrarMascota = () =>
(mascotasFiltradas.value = mascotas.value.filter((mascota) => 
  mascota.nombre.toLowerCase().includes(search.value.toLowerCase())
))
function actualizarMascotaEnLista() {
  getMascotas()
}
</script>
<style scoped lang="scss">
#emailHelp {
  font-size: small;
}
</style>
