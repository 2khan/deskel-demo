import { useStatusbar } from '@/shared/stores/statusbar'
import { Navigate, useParams } from 'react-router-dom'
import data from '../common/threads-menu/output.json'
import { useEffect } from 'react'
import { format } from 'date-fns'

export default function Threads() {
  const { id } = useParams()

  const { setTitle } = useStatusbar()

  const info = data.find((item) => item.id === id)

  useEffect(() => {
    setTitle({
      title: info?.label,
      description: info?.updated_date
        ? format(info.updated_date, 'yyyy/MM/dd HH:mm:ss')
        : ''
    })
  }, [info, setTitle])

  if (!id) return <Navigate to="/" />
  return <div></div>
}
