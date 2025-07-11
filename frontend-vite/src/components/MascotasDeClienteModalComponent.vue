<template>
  <!-- Llamada al modal-->
  <button class="btn btn-dark" :data-bs-target="'#' + idModal" data-bs-toggle="modal">
    <b>{{ toTitleCase($t('mascotas.mascotas', 2)) }}</b>
  </button>
  <!-- Modal -->
  <div class="modal fade" :id="idModal" tabindex="-1" aria-labelledby="modal-editar-cliente-Label" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modal-editar-cliente-Label">
            <b>{{ $t('clientes.mascotasDeCliente') }}: </b><span class="nombreCliente"> {{ props.nombre }} {{ props.apellido1 }} {{ props.apellido2 }}</span>
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <h3 v-if="!hayMascotas" class="mt-3 sinMascotas">{{ $t('clientes.noMascotas') }}</h3>
          <hr />
          <div class="text-center" v-if="hayMascotas">
            <div v-for="(mascota, index) in mascotasCliente" :key="index"
              style="width: 50%; display: inline-block; border: solid">
              <div class="card shadow-sm h-100">
                <img class="card-img-top" alt="" />
                <div class="card-body">
                  <h4 class="card-title text-center">
                    <b>{{ mascota.nombre }}</b>
                  </h4>
                  <p class="card-text">
                    <span class="mr-2"><b>{{ $t('mascotas.raza') }}:</b>&nbsp;</span>
                    <span>{{ mascota.raza }}</span>
                  </p>
                  <p class="card-text">
                    <span class="mr-2"><b>{{ $t('mascotas.talla') }}:</b>&nbsp;</span>
                    <span>{{ mascota.talla }}</span>
                  </p>
                  <p class="card-text">
                    <span class="mr-2"><b>{{ $t('mascotas.chip') }}:</b>&nbsp;</span>
                    <span>{{ mascota.chip }}</span>
                  </p>
                </div>
              </div>
            </div>
            <hr />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success" data-bs-dismiss="modal">
            {{ $t('comun.cerrar') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import MascotaService from '@/services/MascotaService'
import { toTitleCase } from '@/utils'
import { onMounted, ref } from 'vue'

const props = defineProps(['nombre', 'idCliente', 'apellido1', 'apellido2'])
let idModal = 'modal-cliente-mascotas' + props.idCliente
let mascotasCliente = ref([])
let hayMascotas = ref(false)
onMounted(async () => {
  const service = new MascotaService()
  let mascotas = service.getMascotas()
  await service.getMascotasDeCliente(props.idCliente)
  mascotasCliente.value = mascotas.value
  hayMascotas.value = mascotas.value.length != 0
})
</script>
<style scoped lang="scss">
.card {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.sinMascotas {
  color: red;
}

.nombreCliente {
  color: blue;
}
</style>
