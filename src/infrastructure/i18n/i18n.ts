import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import de from './translation_de.json'
import en from './translation_en.json'

i18n.use(initReactI18next).init({
  fallbackLng: 'de',
  resources: {
    de: { translation: de },
    en: { translation: en },
  },
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
