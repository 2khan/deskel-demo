import { useEffect } from 'react'
import { useStatusbar } from '@/shared/stores/statusbar'
import { Navigate, useParams } from 'react-router-dom'

// DEMO
import ChatView from '@/demo/chat/view'
import data from '@/demo/common/threads-menu/output.json'
import { format } from 'date-fns'

export default function ChatPage() {
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
  return <ChatView state="complete" />
}
