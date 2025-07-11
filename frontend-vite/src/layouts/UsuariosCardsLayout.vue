<template>
    <div class="container">
        <UsuarioCardComponent v-for="(item, index) in props.content" :key="index" :content="item" @emiteElemento="actualizarUsuarioEnLayout"/>
    </div>
</template>
<script setup>
import UsuarioCardComponent from '@/components/UsuarioCardComponent.vue';
const props = defineProps(['content'])
const emits = defineEmits(['emiteLayout'])
function actualizarUsuarioEnLayout() {
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
</style>