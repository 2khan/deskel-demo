import { type TLocale } from '@/shared/i18n'
import { type Faker, fakerEN, fakerJA } from '@faker-js/faker'

export const mock = {
  en: fakerEN,
  ja: fakerJA
} satisfies Record<TLocale, Faker>
