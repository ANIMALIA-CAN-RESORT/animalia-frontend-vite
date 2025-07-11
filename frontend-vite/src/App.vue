<template>
  <NavBarComponent />
  <div class="container">
    <RouterView />
  </div>
  <FooterComponent />
</template>
<script setup>
import { RouterView } from 'vue-router'
import NavBarComponent from './components/NavbarComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
</script>
<style scoped></style>
