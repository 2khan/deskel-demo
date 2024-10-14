import 'i18next'
import { defaultNS } from '../i18n'
// import all namespaces (for the default language, only)
import JA from '@/assets/locales/ja/common.json'

// DEMO
import DEMO_JA from '@/demo/locales/ja/demo.json'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS
    resources: {
      [defaultNS]: typeof JA
      demo: typeof DEMO_JA
    }
  }
}
