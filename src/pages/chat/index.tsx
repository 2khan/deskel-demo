import { useEffect } from 'react'
import { useStatusbar } from '@/shared/stores/statusbar'
import { Navigate, useParams } from 'react-router-dom'

// DEMO
import ChatView from '@/demo/chat/view'
import threads from '@/demo/common/threads-menu/output.json'
import { format } from 'date-fns'

export default function ChatPage() {
  const { id } = useParams()

  const { setTitle } = useStatusbar()

  const threadData = threads.find((thread) => thread.id === id)

  useEffect(() => {
    setTitle({
      title: threadData?.label,
      description: threadData?.updated_date
        ? format(threadData.updated_date, 'yyyy/MM/dd HH:mm:ss')
        : ''
    })
  }, [threadData, setTitle])

  if (!id) return <Navigate to="/" />
  return <ChatView state="complete" threadData={threadData} />
}
