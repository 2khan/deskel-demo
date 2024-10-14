import { useTranslation } from 'react-i18next'

export default function IRDetailPage() {
  const { t } = useTranslation()
  return <div>Detail: {t('glossary.IR')}</div>
}
