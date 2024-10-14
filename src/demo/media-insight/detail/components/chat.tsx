import { Fragment, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { dx } from '@/shared/design-system/typography'
import { InfoIcon, SendIcon, Paperclip, TerminalIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useStage } from '../useStage'
import { StageDataMap } from '../data'

export default function Chat() {
  const { stage, next } = useStage()
  const { t } = useTranslation('demo')
  const chatBottomRef = useRef<HTMLDivElement>(null)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const input = StageDataMap[stage]['current-input']
  const chatHistory = StageDataMap[stage]['chat-history']
  // const [value, setValue] = useState(input)

  // Auto height
  useEffect(() => {
    const el = textAreaRef.current
    if (el) {
      const MAX_HEIGHT = 128
      el.style.height = '0px'
      const scrollHeight = el.scrollHeight
      el.style.height = Math.min(MAX_HEIGHT, scrollHeight) + 'px'
    }
  }, [
    // value
    input
  ])

  // New line when ENTER + SHIFT
  const handleKey: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
    }
  }

  // const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
  //   setValue(e.target.value)
  // }

  return (
    <div className="flex w-full grow flex-col gap-2">
      <ScrollArea className="grow">
        <div className="flex w-full flex-col gap-4 pr-2">
          <div className="flex w-full flex-col items-center gap-2">
            <span className={dx('label-01', 'text-muted-foreground')}>
              2024/09/06 16:45
            </span>
            {chatHistory.map((chat) => (
              <Fragment key={chat.message}>
                {chat.isMe ? (
                  <div className="flex w-full justify-end gap-2">
                    <div className="w-full max-w-80 grow rounded-[2rem] bg-muted px-6 py-4">
                      <span className={dx('body-02', 'whitespace-pre-line')}>
                        {chat.message}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex w-full gap-2">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full border text-primary">
                      <TerminalIcon size={15} />
                    </div>
                    <div className="grow p-1.5">
                      <span className={dx('body-02', 'whitespace-pre-line')}>
                        {chat.message}
                      </span>
                    </div>
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
        <div ref={chatBottomRef} />
        <ScrollBar />
      </ScrollArea>
      <div className="relative flex w-full flex-col">
        <div className="ml-8 flex w-full max-w-80 items-center gap-3 rounded-t-2xl border border-b-0 p-2 text-muted-foreground">
          <InfoIcon size={15} />
          <span className={dx('label-02')}>
            {t('media-insight.notice.demo-only')}
          </span>
        </div>
        <div className="flex w-full items-end gap-2 overflow-hidden rounded-[2rem] border bg-muted p-2 transition-colors focus-within:bg-background">
          <Button
            size="icon"
            variant="outline"
            className="size-12 shrink-0 rounded-full"
            asChild
          >
            <label htmlFor="file-upload">
              <Paperclip size={15} />
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                accept="application/pdf"
                multiple
                className="hidden"
              />
            </label>
          </Button>
          <Textarea
            value={input}
            ref={textAreaRef}
            // onChange={handleChange}
            onKeyDown={handleKey}
            rows={1}
            className="min-h-12 resize-none rounded-2xl border-none bg-muted shadow-none focus-visible:ring-0"
            placeholder={t('media-insight.action.ask-anything')}
            readOnly
          />
          <Button
            size="icon"
            variant="outline"
            className="size-12 shrink-0 rounded-full"
            onClick={next}
            disabled={!input}
          >
            <SendIcon size={15} />
          </Button>
        </div>
      </div>
    </div>
  )
}
