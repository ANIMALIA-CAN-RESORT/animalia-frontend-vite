<template>
  <div>
    <div class="container text-center">
      <h3 class="mt-2">{{ $t('comun.explicacionContador') }} {{ counterStore.count }}</h3>
      <h1 class="mt-2">
        <b>{{
          $t('comun.fechasHoras.fecha', {
            weekDay: weekDay,
            dia: dia,
            mes: mes,
            year: year,
            sufijoUs: sufijoUs,
            sufijoFr: sufijoFr,
          })
        }}</b>
      </h1>
      <h2>{{ $t('comun.fechasHoras.hora', { hora: hora, minuto: minuto, segundo: segundo }) }}</h2>
      <img width="800" src="/img/lur.jpg" alt="Page not-found" class="mt-2" />
    </div>
    <div class="container text-center cita mt-3">
      <p>“{{ $t('comun.citaHome') }}”</p>
      <p><b>Josh Billings</b></p>
    </div>
  </div>
</template>

<script setup>
import i18n from '@/plugins/i18n'
import { useCounterStore } from '@/stores/counter'
import { onMounted, ref } from 'vue'

const counterStore = useCounterStore()
const dia = ref('')
const hora = ref('')
const minuto = ref('')
const segundo = ref('')
const weekDay = ref('')
const mes = ref('')
const year = ref('')
const sufijoUs = ref('')
const sufijoFr = ref('')

let dias = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado']
let meses = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
]

const actualizarFechaHora = () => {
  const ahora = new Date()
  const horas = ahora.getHours()
  hora.value = horas < 10 ? '0' + horas : horas.toString()
  const minutos = ahora.getMinutes()
  minuto.value = minutos < 10 ? '0' + minutos : minutos.toString()
  const segundos = ahora.getSeconds()
  segundo.value = segundos < 10 ? '0' + segundos : segundos.toString()
  dia.value = ahora.getDate()
  let weekDaySinTraducir = dias[ahora.getDay()]
  weekDay.value = i18n.global.t(`comun.fechasHoras.dias.${weekDaySinTraducir}`)
  let mesSinTraducir = meses[ahora.getMonth()]
  mes.value = i18n.global.t(`comun.fechasHoras.meses.${mesSinTraducir}`)
  year.value = ahora.getFullYear()
  sufijoFr.value = dia.value == '1' ? 'er' : ''
  sufijoUs.value =
    dia.value == '1' || dia.value == '21' || dia.value == '31'
      ? 'st'
      : dia.value == '2' || dia.value == '22'
        ? 'nd'
        : dia.value == '3' || dia.value == '23'
          ? 'rd'
          : 'th'
}

onMounted(() => {
  actualizarFechaHora()
  setInterval(actualizarFechaHora, 1000)
})
</script>
<style scoped lang="scss">
h1 {
  color: greenyellow;
}

h2 {
  color: red;
}

h3 {
  color: blue;
}

.cita {
  color: blue;
}

p + p {
  color: fuchsia;
}

fa-icon {
  color: greenyellow;
}
</style>
