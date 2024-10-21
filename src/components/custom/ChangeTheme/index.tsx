import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { type Theme, themes, useTheme } from '@/shared/contexts/ThemeProvider'
import { dx } from '@/shared/design-system/typography'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
// import { GlobeIcon } from '@radix-ui/react-icons'
import { useTranslation } from 'react-i18next'

export default function ChangeTheme() {
  const { theme: selected, setTheme } = useTheme()
  const { t } = useTranslation()

  const handleClick = (theme: Theme) => () => {
    setTheme(theme)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline">
          <SunIcon className="absolute rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>{t('system.change-theme')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.key}
            onClick={handleClick(theme.key)}
            className="flex gap-2"
            disabled={selected === theme.key}
          >
            <theme.icon />
            <span className={dx('label-02')}>
              {t(`system.theme-${theme.key}`)}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
