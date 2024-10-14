import { useTranslation } from 'react-i18next'

export default function SNSListPage() {
  const { t } = useTranslation()
  return <div>LIST: {t('glossary.SNS')}</div>
}
