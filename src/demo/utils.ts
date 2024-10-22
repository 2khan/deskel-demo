import { type TLocale } from '@/shared/i18n'
import { type Faker, fakerEN, fakerJA } from '@faker-js/faker'

fakerEN.seed(0)
fakerJA.seed(0)

export const mock = {
  en: fakerEN,
  ja: fakerJA
} satisfies Record<TLocale, Faker>
