<template>
        <div class="encabezado">
            <h3 class="col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2"><b>{{ toTitleCase($t('mascotas.mascotas', 1)) }}</b></h3>
            <h3 class="col-10 col-sm-10 col-md-1 col-lg-1 col-xl-1 text-center"><b>{{ toTitleCase($t('prestaciones.tipo')) }}</b></h3>
            <h3 class="col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2 text-center"><b>{{ toTitleCase($t('prestaciones.fechaEntrada')) }}</b></h3>
            <h3 class="col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2 text-center"><b>{{ toTitleCase($t('prestaciones.fechaSalida')) }}</b></h3>
            <h3 class="col-10 col-sm-10 col-md-1 col-lg-1 col-xl-1 text-center"><b>{{ toTitleCase($t('prestaciones.jaula')) }}</b></h3>
            <h3 class="col-10 col-sm-10 col-md-1 col-lg-1 col-xl-1 text-center"><b>{{ toTitleCase($t('prestaciones.tipoComidaAbr')) }}</b></h3>
            <h3 class="col-10 col-sm-10 col-md-1 col-lg-1 col-xl-1 text-center"><b>{{ toTitleCase($t('prestaciones.cantidadComidaDiariaAbr')) }}</b></h3>
            <h3 class="col-10 col-sm-10 col-md-1 col-lg-1 col-xl-1 text-center"><b>{{ toTitleCase($t('prestaciones.precio')) }}</b></h3>
            <h3 class="col-10 col-sm-10 col-md-1 col-lg-1 col-xl-1 text-center"><b>{{ toTitleCase($t('prestaciones.pagada')) }}</b></h3>
        </div>
        <PrestacionListComponent v-for="(item, index) in props.content" :key="index" :content="item"
            @emiteElemento="actualizarPrestacionEnLayout" />
</template>
<script setup>
import PrestacionListComponent from '@/components/PrestacionListComponent.vue';
import { toTitleCase } from '@/utils';

const props = defineProps(['content'])
const emits = defineEmits(['emiteLayout'])

function actualizarPrestacionEnLayout() {
    emits('emiteLayout')
}
</script>
<style scoped>
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