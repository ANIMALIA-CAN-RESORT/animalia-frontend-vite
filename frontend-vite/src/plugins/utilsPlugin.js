import { baseNormalizada, toastExito, toSentenceCase, toTitleCase, formatearFecha, toInstant, toDate } from '@/utils'

export default {
  install: (app) => {
    app.config.globalProperties.$utils = {
      toTitleCase,
      toSentenceCase,
      formatearFecha,
      toInstant,
      toDate,
      toastExito,
      baseNormalizada,
    }
    /* por si quiero añadir propiedades concretas como $utils.base, aunque estos casos los tengo importados desde mi clase de utils
    const base = import.meta.env.VITE_PUBLIC_PATH || '/'
    const baseNormalizada = base.endsWith('/') ? base : base + '/'
    app.config.globalProperties.$base = () => base
    app.config.globalProperties.$baseNormalizada = () => baseNormalizada
    */
  },
}
