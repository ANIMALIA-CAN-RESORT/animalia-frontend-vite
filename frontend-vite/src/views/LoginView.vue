<template>
  <div class="container">
    <form>
      <p class="text-danger">{{ feedback }}</p>
      <div class="row mb-3 col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3">
        <label for="username" class="form-label"
          ><b>{{ $t('administracion.username') }}</b></label
        >
        <input type="text" class="form-control" id="username" v-model="username" />
      </div>
      <div class="row mb-3 col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3">
        <label for="password" class="form-label"
          ><b>{{ $t('administracion.password') }}</b></label
        >
        <input type="password" class="form-control" id="password" v-model="password" />
      </div>
      <button type="button" @click="login" class="btn btn-primary">
        {{ $t('comun.iniciarSesion') }}
      </button>
      <p class="text-danger">{{ feedback }}</p>
    </form>
    <span
      >{{ $t('administracion.ofertaRegistro')
      }}<RouterLink :to="{ name: 'register' }">{{
        $t('administracion.crearCuenta')
      }}</RouterLink></span
    >
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import AuthService from '@/services/AuthService'

let username = ref('')
let password = ref('')
let feedback = ref('')
const service = new AuthService()

const login = async () => {
  service.login(username.value, password.value, feedback.value)
}
</script>
<style scoped lang="scss">
form {
  margin: 20px;
}
</style>
