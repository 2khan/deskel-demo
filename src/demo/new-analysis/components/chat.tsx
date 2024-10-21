import { Fragment, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { dx } from '@/shared/design-system/typography'
import { InfoIcon, SendIcon, Paperclip, TerminalIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useStage } from '../../common/useStage'
import { m } from 'framer-motion'
import { format } from 'date-fns'
import { TChat } from '@/demo/common/stages'

type TProps = {
  input: string
  history: TChat[]
}

export default function Chat(props: TProps) {
  const { next } = useStage()
  const { input, history } = props
  const { t } = useTranslation('demo')
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  // const [value, setValue] = useState(input)

  // scroll to bottom on chat
  useEffect(() => {
    const el = chatContainerRef.current
    if (el) {
      el.scrollTo({
        top: el.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [history])

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
    <div className="mx-auto flex w-full max-w-screen-xl grow flex-col gap-2">
      <ScrollArea viewportRef={chatContainerRef} className="w-full grow">
        <div className="flex w-full flex-col gap-4 pr-2">
          <div className="flex w-full flex-col items-center gap-2">
            <span className={dx('label-01', 'text-muted-foreground')}>
              {format(new Date(), 'yyyy/MM/dd HH:mm')}
            </span>
            {history.map((chat) => (
              <Fragment key={chat.message}>
                {chat.isMe ? (
                  <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex w-full justify-end gap-2"
                  >
                    <div className="w-full max-w-80 grow rounded-[2rem] bg-muted px-6 py-4">
                      <span className={dx('body-02', 'whitespace-pre-line')}>
                        {chat.message}
                      </span>
                    </div>
                  </m.div>
                ) : (
                  <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex w-full gap-2"
                  >
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full border text-primary">
                      <TerminalIcon size={15} />
                    </div>
                    <div className="grow p-1.5">
                      <span className={dx('body-02', 'whitespace-pre-line')}>
                        {chat.message}
                      </span>
                    </div>
                  </m.div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
        {/* <div ref={chatBottomRef} /> */}
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
            className="relative size-12 shrink-0 rounded-full"
            onClick={next}
            disabled={!input}
          >
            <SendIcon size={15} />
            {input && (
              <div className="absolute right-1 top-1 size-3 animate-ping rounded-full bg-primary" />
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
