<template>
  <div class="about">
    <h1>{{ counterStore.count }} x 2 = {{ counterStore.times2 }}</h1>
    <button @click="counterStore.increment(1)">Incrementar</button>
  </div>
  <div>
    <button type="button" @click="showToatWarning()" class="btn btn-warning">warning</button>
    <button type="button" @click="showToatSuccess()" class="btn btn-success">success</button>
    <button type="button" @click="showToatInfo()" class="btn btn-info">info</button>
  </div>
  <div>
    <h1>{{ $t('hello', { name: username }) }} {{ $t('general.add') }}</h1>
    <p>{{ $t('general.products', { count: 0 }) }}</p>
    <!--cambiando el valor entre 0, 1 y mas de 1 se observa como varia entre los tres valores de cadena de texto definidos-->
    <p>{{ $t('general.comments', 2) }}</p>
  </div>
</template>
<script setup>
import { useCounterStore } from '@/stores/counter'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { ref } from 'vue'
const username = ref('Jose')
const counterStore = useCounterStore()

function showToatWarning() {
  toast.warning('Wow warning!', {
    autoClose: 1000,
    position: toast.POSITION.TOP_RIGHT,
    theme: toast.THEME.COLORED,
  })
}

function showToatSuccess() {
  toast.success('Wow success!', {
    autoClose: 1000,
    position: toast.POSITION.TOP_RIGHT,
    theme: toast.THEME.COLORED,
  })
}
function showToatInfo() {
  toast.info('Wow info!', {
    autoClose: 1000,
    position: toast.POSITION.TOP_RIGHT,
    theme: toast.THEME.COLORED,
  })
}
</script>
