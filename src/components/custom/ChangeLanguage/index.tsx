import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { dx } from '@/shared/design-system/typography'
import { locales, type TLocale } from '@/shared/i18n'
import { GlobeIcon } from '@radix-ui/react-icons'
import { useTranslation } from 'react-i18next'

export default function ChangeLanguage() {
  const { t, i18n } = useTranslation()

  const selected = i18n.resolvedLanguage

  const handleClick = (locale: TLocale) => () => {
    i18n.changeLanguage(locale)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline">
          <GlobeIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuLabel>{t('system.choose-language')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={handleClick(locale)}
            className="flex gap-2"
            disabled={selected === locale}
          >
            <span className={dx('label-01', 'font-bold uppercase')}>
              {locale}
            </span>
            <span className={dx('label-02')}>{t(`language.${locale}`)}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
