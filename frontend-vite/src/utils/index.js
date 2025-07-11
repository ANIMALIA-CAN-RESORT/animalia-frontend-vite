import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
export function toSentenceCase(str) {
  return str.toLowerCase().split(' ').charAt(0).toUpperCase() + str.slice(1).join(' ')
}
export function formatearFecha(fechaISO) {//desde ISO a como la quiero presentar y  usar en el input tipo Date
  const fecha = new Date(fechaISO)
  const dia = String(fecha.getUTCDate()).padStart(2, '0')
  const mes = String(fecha.getUTCMonth() + 1).padStart(2, '0')
  const year = fecha.getUTCFullYear();
  return `${dia}/${mes}/${year}`
}
export function toDate(fechaISO) {//desde ISO a Date para
  return new Date(fechaISO).toISOString().split("T")[0]
}
// Convertir a string Instant (ISO) cuando se vaya a enviar al backend
export function toInstant(fechaString) {
  const date = new Date(fechaString); // yyyy-MM-dd
  return date.toISOString(); // "2025-07-09T00:00:00.000Z"
}
export function toastExito(str) {
  return toast.success(str, {
    autoClose: 1000,
    position: toast.POSITION.TOP_RIGHT,
    theme: toast.THEME.COLORED,
  })
}
export function baseNormalizada() {
  const base = import.meta.env.VITE_PUBLIC_PATH || '/'
  const baseNormalizada = base.endsWith('/') ? base : base + '/'
  return baseNormalizada
}