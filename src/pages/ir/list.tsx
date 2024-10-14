import { useTranslation } from 'react-i18next'

export default function IRListPage() {
  const { t } = useTranslation()
  return <div>LIST: {t('glossary.IR')}</div>
}
