import { useTranslation } from 'react-i18next'

export default function MultistepListPage() {
  const { t } = useTranslation()
  return <div>LIST: {t('glossary.multi-step')}</div>
}
