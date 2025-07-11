<template>
    <div class="container">
        <PrestacionCardComponent v-for="(item, index) in props.content" :key="index" :content="item" @emiteElemento="actualizarPrestacionEnLayout"/>
    </div>
</template>
<script setup>
import PrestacionCardComponent from '@/components/PrestacionCardComponent.vue';

const props = defineProps(['content'])
const emits = defineEmits(['emiteLayout'])
function actualizarPrestacionEnLayout() {
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