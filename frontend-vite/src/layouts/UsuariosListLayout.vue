<template>
    <div class="encabezado">
        <h3 class="col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3"><b>{{ toTitleCase($t('administracion.username')) }}</b></h3>
        <h3 class="col-10 col-sm-10 col-md-4 col-lg-4 col-xl-4"><b>{{ toTitleCase($t('clientes.nombre')) }}</b></h3>
        <h3 class="col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3"><b>{{ toTitleCase($t('administracion.pais')) }}</b></h3>
        <h3 class="col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2 text-center"><b>{{ toTitleCase($t('administracion.rol')) }}</b></h3>
    </div>
    <UsuarioListComponent v-for="(item, index) in props.content" :key="index" :content="item"
        @emiteElemento="actualizarUsuarioEnLayout" />
</template>
<script setup>
import UsuarioListComponent from '@/components/UsuarioListComponent.vue';
import { toTitleCase } from '@/utils';

const props = defineProps(['content'])
const emits = defineEmits(['emiteLayout'])

function actualizarUsuarioEnLayout() {
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