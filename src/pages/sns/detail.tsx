import { useTranslation } from 'react-i18next'

export default function SNSDetailPage() {
  const { t } = useTranslation()
  return <div>DETAIL: {t('glossary.SNS')}</div>
}
