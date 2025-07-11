import { createI18n } from 'vue-i18n'
import messages from '@intlify/unplugin-vue-i18n/messages'

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'es', // locale: window.navigator.language.substring(0,2) || 'en', //con esto cogería el idioma del navegador
  fallbackLocale: 'en',
  availableLocales: ['es', 'en'],
  messages: messages,
})

export default i18n
