<template>
    <div class="container">
        <MascotaCardComponent v-for="(item, index) in props.content" :key="index" :content="item" @emiteElemento="actualizarMascotaEnLayout"/>
    </div>
</template>
<script setup>
import MascotaCardComponent from '@/components/MascotaCardComponent.vue';

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
</style>