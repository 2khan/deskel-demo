import { ja, enUS, type Locale } from 'date-fns/locale'
import { TLocale } from '../i18n'

export const dateLocaleMap = {
  en: enUS,
  ja: ja
} satisfies Record<TLocale, Locale>
