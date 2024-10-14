import { cn } from '@/lib/utils'
import type { ClassValue } from 'clsx'
import type { TVariantMap } from './utils'

// https://carbondesignsystem.com/elements/typography/type-sets/
export type TTextVariant =
  | 'code-01'
  | 'code-02'
  | 'label-01'
  | 'label-02'
  | 'helper-01'
  | 'helper-02'
  | 'legal-01'
  | 'legal-02'
  | 'body-compact-01'
  | 'body-compact-02'
  | 'body-01'
  | 'body-02'
  | 'heading-compact-01'
  | 'heading-compact-02'
  | 'heading-01'
  | 'heading-02'
  | 'heading-03'
  | 'heading-04'
  | 'heading-05'
  | 'heading-06'
  | 'heading-07'
  | 'fluid-heading-03'
  | 'fluid-heading-04'
  | 'fluid-heading-05'
  | 'fluid-heading-06'
  | 'fluid-paragraph-01'
  | 'fluid-quotation-01'
  | 'fluid-quotation-02'
  | 'fluid-display-01'
  | 'fluid-display-02'
  | 'fluid-display-03'
  | 'fluid-display-04'

const variantMap = {
  'code-01': 'font-mono font-normal text-xs leading-1 tracking-wider',
  'code-02': 'font-mono font-normal text-sm leading-2 tracking-wider',
  'label-01': 'font-sans font-normal text-xs leading-1 tracking-wider',
  'label-02': 'font-sans font-normal text-sm leading-2 tracking-wide',
  'helper-01': 'font-sans font-normal text-xs leading-1 tracking-wider',
  'helper-02': 'font-sans font-normal text-sm leading-2 tracking-wide',
  'legal-01': 'font-sans font-normal text-xs leading-1 tracking-wider',
  'legal-02': 'font-sans font-normal text-sm leading-2 tracking-wide',
  'body-compact-01': 'font-sans font-normal text-sm leading-2 tracking-wide',
  'body-compact-02':
    'font-sans font-normal text-base leading-4 tracking-normal',
  'body-01': 'font-sans font-normal text-sm leading-3 tracking-wide',
  'body-02': 'font-sans font-normal text-base leading-5 tracking-normal',
  'heading-compact-01':
    'font-sans font-semibold text-sm leading-2 tracking-wide',
  'heading-compact-02':
    'font-sans font-semibold text-base leading-4 tracking-normal',
  'heading-01': 'font-sans font-semibold text-sm leading-3 tracking-wide',
  'heading-02': 'font-sans font-semibold text-base leading-5 tracking-normal',
  'heading-03': 'font-sans font-normal text-lg leading-6 tracking-normal',
  'heading-04': 'font-sans font-normal text-2xl leading-9 tracking-normal',
  'heading-05': 'font-sans font-normal text-3xl leading-10 tracking-normal',
  'heading-06': 'font-sans font-light text-5xl leading-12 tracking-normal',
  'heading-07': 'font-sans font-light text-7xl leading-14 tracking-normal',
  'fluid-heading-03':
    'font-sans font-normal text-lg 2xl:text-xl leading-6 tracking-normal',
  'fluid-heading-04':
    'font-sans font-normal text-2xl xl:text-3xl leading-9 xl:leading-10 tracking-normal',
  'fluid-heading-05':
    'font-sans font-normal md:font-light text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-8xl leading-10 md:leading-11 lg:leading-12 xl:leading-13 2xl:leading-15 tracking-normal',
  'fluid-heading-06':
    'font-sans font-semibold text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-8xl leading-10 md:leading-11 lg:leading-12 xl:leading-13 2xl:leading-15 tracking-normal',
  'fluid-paragraph-01':
    'font-sans font-light text-xl lg:text-2xl 2xl:text-3xl leading-8 lg:leading-9 2xl:leading-10 tracking-normal',
  'fluid-quotation-01':
    'font-sans font-normal xl:font-light text-lg lg:text-xl xl:text-2xl 2xl:text-3xl leading-7 lg:leading-8 xl:leading-9 2xl:leading-10 tracking-normal',
  'fluid-quotation-02':
    'font-sans font-light text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-8xl leading-10 md:leading-11 lg:leading-12 xl:leading-13 2xl:leading-15 tracking-normal',
  'fluid-display-01':
    'font-sans font-light text-5xl lg:text-7xl xl:text-8xl 2xl:text-10xl leading-12 lg:leading-14 xl:leading-15 2xl:leading-17 tracking-normal',
  'fluid-display-02':
    'font-sans font-semibold text-5xl lg:text-7xl xl:text-8xl 2xl:text-10xl leading-12 lg:leading-14 xl:leading-15 2xl:leading-17 tracking-normal',
  'fluid-display-03':
    'font-sans font-light text-5xl md:text-7xl lg:text-8xl xl:text-10xl 2xl:text-11xl leading-12 md:leading-14 lg:leading-15 xl:leading-17 2xl:leading-18 tracking-normal lg:tracking-tight 2xl:tracking-tightest',
  'fluid-display-04':
    'font-sans font-light text-5xl md:text-9xl lg:text-12xl xl:text-13xl 2xl:text-14xl leading-12 md:leading-16 lg:leading-19 xl:leading-20 2xl:leading-21 tracking-normal lg:tracking-tight 2xl:tracking-tightest'
} satisfies TVariantMap<TTextVariant>

export const dx = (variant: TTextVariant, ...inputs: ClassValue[]) =>
  cn(variantMap[variant], inputs)
