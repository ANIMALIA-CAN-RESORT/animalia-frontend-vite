<template>
        <div class="encabezado">
            <h3 class="col-10 col-sm-10 col-md-1 col-lg-1 col-xl-1"><b>{{ toTitleCase($t('clientes.dni')) }}</b></h3>
            <h3 class="col-10 col-sm-10 col-md-5 col-lg-5 col-xl-5"><b>{{ toTitleCase($t('clientes.nombre')) }}</b></h3>
            <h3 class="col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3 "><b>{{ toTitleCase($t('clientes.correo')) }}</b></h3>
            <h3 class="col-10 col-sm-10 col-md-1 col-lg-1 col-xl-1 "><b>{{ toTitleCase($t('clientes.tfno')) }}</b></h3>
            <h3 class="col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2 "><b>{{ toTitleCase($t('mascotas.mascotas', 2)) }}</b></h3>
        </div>
        <ClienteListComponent v-for="(item, index) in props.content" :key="index" :content="item" @emiteElemento="actualizarClienteEnLayout"/>
</template>
<script setup>
import ClienteListComponent from '@/components/ClienteListComponent.vue';
import { toTitleCase } from '@/utils';

const props = defineProps(['content'])
const emits = defineEmits(['emiteLayout'])

function actualizarClienteEnLayout() {
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