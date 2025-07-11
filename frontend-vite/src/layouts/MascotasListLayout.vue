<template>
        <div class="encabezado">
            <h3 class="col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2"><b>{{ toTitleCase($t('clientes.clientes', 1)) }}</b></h3>
            <h3 class="col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2"><b>{{ toTitleCase($t('mascotas.chip')) }}</b></h3>
            <h3 class="col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2"><b>{{ toTitleCase($t('mascotas.nombre')) }}</b></h3>
            <h3 class="col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2"><b>{{ toTitleCase($t('mascotas.raza')) }}</b></h3>
            <h3 class="col-10 col-sm-10 col-md-1 col-lg-1 col-xl-1"><b>{{ toTitleCase($t('mascotas.talla')) }}</b></h3>
            <h3 class="col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3 text-center"><b>{{ toTitleCase($t('prestaciones.prestaciones', 2)) }}</b></h3>
        </div>
        <MascotaListComponent v-for="(item, index) in props.content" :key="index" :content="item" @emiteElemento="actualizarMascotaEnLayout"/>
</template>
<script setup>
import MascotaListComponent from '@/components/MascotaListComponent.vue';
import { toTitleCase } from '@/utils';

const props = defineProps(['content'])
const emits = defineEmits(['emiteLayout'])

function actualizarMascotaEnLayout() {
    emits('emiteLayout')
}
</script>
<style scoped>
.container {
    width: 100vw;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
}
.encabezado {
    background-color: rgb(193, 223, 25);
    border-radius: 10px;
    padding: 10px;
    display: flex;
    width: 100%;
    margin: 10px;
    justify-content: space-around;
}
</style>