<template>
  <div class="container">
    <form>
      <p class="text-danger">{{ loginError }}</p>
      <div class="mb-3 col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3">
        <label class="form-label"
          ><b>{{ $t('administracion.nombre') }}</b></label
        >
        <input type="text" class="form-control" id="nombre" v-model="nombre" />
      </div>
      <div class="mb-3 col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3">
        <label class="form-label"
          ><b>{{ $t('administracion.apellido') }}</b></label
        >
        <input type="text" class="form-control" id="apellido" v-model="apellido" />
      </div>
      <div class="mb-3 col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3">
        <label class="form-label"
          ><b>{{ $t('administracion.pais') }}</b></label
        >
        <input type="text" class="form-control" id="pais" v-model="pais" />
      </div>
      <div class="mb-3 col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3">
        <label for="rol" class="form-label"
          ><b>{{ $t('administracion.rol') }}</b></label
        ><br />
        <span>
          <input type="radio" id="USER" value="USER" v-model="rol" />&nbsp;
          <label for="USER">{{ $t('comun.rolUser') }}</label
          ><a href="#" data-bs-toggle="tooltip" :title="$t('comun.rolUser')"
            ><v-icon name="fa-user" color="blue" scale="2" /></a
          >&nbsp;&nbsp; <input type="radio" id="ADMIN" value="ADMIN" v-model="rol" />&nbsp;
          <label for="ADMIN">{{ $t('comun.rolAdmin') }}</label
          ><a href="#" data-bs-toggle="tooltip" :title="$t('comun.rolAdmin')"
            ><v-icon name="ri-admin-line" color="red" scale="2"
          /></a>
        </span>
      </div>
      <div class="row mb-3 col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3">
        <label for="username" class="form-label"
          ><b>{{ $t('administracion.username') }}</b></label
        >
        <input
          type="text"
          class="form-control"
          id="username"
          aria-describedby="username"
          v-model="username"
        />
      </div>
      <div class="row mb-3 col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3">
        <label for="password" class="form-label"
          ><b>{{ $t('administracion.password') }}</b></label
        >
        <input type="password" class="form-control" id="password" v-model="password" />
      </div>
      <!-- Abrir el modal manualmente -->
      <button
        type="button"
        class="btn btn-primary text-white col-2"
        data-bs-toggle="modal"
        data-bs-target="#modal-crear-usuario"
      >
        {{ $t('administracion.crearUsuario') }}
      </button>
    </form>
  </div>
  <!-- Modal -->
  <div class="modal fade" id="modal-crear-usuario" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">{{ $t('administracion.crearUsuario') }}</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Cerrar"
          ></button>
        </div>
        <div class="modal-body">
          <label class="form-label passwordSistema"
            ><b>{{ $t('administracion.passwordRequired') }}</b></label
          >
          <input type="password" class="form-control" v-model="passwordForRegisterFromUser" />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            {{ $t('comun.cerrar') }}
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="solicitudRegistro"
            data-bs-dismiss="modal"
          >
            {{ $t('administracion.crearUsuario') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import AuthService from '@/services/AuthService'

let username = ref('')
let password = ref('')
let nombre = ref('')
let apellido = ref('')
let pais = ref('')
let rol = ref('USER')
let loginError = ref('')
let passwordForRegisterFromUser = ref('')

const service = new AuthService()

const solicitudRegistro = async () => {
  await service.solicitudRegistro(
    username.value,
    password.value,
    nombre.value,
    apellido.value,
    pais.value,
    rol.value,
    passwordForRegisterFromUser.value,
    loginError.value,
  )
}
</script>
<style scoped lang="scss">
form {
  margin: 20px;
}

.passwordSistema {
  color: red;
}
</style>
