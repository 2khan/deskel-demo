import { useTranslation } from 'react-i18next'

export default function MultistepDetailPage() {
  const { t } = useTranslation()
  return <div>DETAIL: {t('glossary.multi-step')}</div>
}
