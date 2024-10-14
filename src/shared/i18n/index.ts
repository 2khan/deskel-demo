import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

import JA from '@/assets/locales/ja/common.json'
import EN from '@/assets/locales/en/common.json'

// DEMO
import DEMO_JA from '@/demo/locales/ja/demo.json'
import DEMO_EN from '@/demo/locales/en/demo.json'

export const locales = ['en', 'ja'] as const
export type TLocale = (typeof locales)[number]

export const defaultNS = 'common' as const

const resources = {
  en: {
    [defaultNS]: EN,
    demo: DEMO_EN
  },
  ja: {
    [defaultNS]: JA,
    demo: DEMO_JA
  }
} as const

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    defaultNS,
    ns: [defaultNS],
    supportedLngs: locales,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
