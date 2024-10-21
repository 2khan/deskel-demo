import {
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import Slide1 from '@/assets/media/slide-1.webp'
import Slide2 from '@/assets/media/slide-2.webp'
import Slide3 from '@/assets/media/slide-3.webp'
import Slide4 from '@/assets/media/slide-4.webp'
import { useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { dx } from '@/shared/design-system/typography'

const slides = [Slide1, Slide2, Slide3, Slide4]

export default function PPT() {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    console.log(e.key, index)
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : slides.length - 1))
        break
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex((prev) => (prev < slides.length - 1 ? prev + 1 : 0))
        break
      case 'ArrowLeft':
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : slides.length - 1))
        break
      case 'ArrowRight':
        e.preventDefault()
        setSelectedIndex((prev) => (prev < slides.length - 1 ? prev + 1 : 0))
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        setSelectedIndex(index)
        break
    }
  }

  return (
    <DialogContent className="flex h-full w-full max-w-full flex-col p-2 sm:rounded-none">
      <DialogHeader>
        <DialogTitle>(.PPT) Viewer</DialogTitle>
      </DialogHeader>
      <div className="flex w-full grow gap-2 overflow-hidden rounded-2xl">
        <ScrollArea className="w-80 shrink-0 pr-2">
          <div className="flex flex-col gap-2 p-px">
            {slides.map((slide, index) => {
              const isActive = index === selectedIndex

              return (
                <button
                  key={slide}
                  role="tab"
                  tabIndex={isActive ? 0 : -1}
                  aria-selected={isActive}
                  className="relative overflow-hidden rounded-2xl border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  onClick={() => setSelectedIndex(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                >
                  <img
                    src={slide}
                    alt="slide"
                    className="pointer-events-none w-full object-contain"
                    draggable={false}
                  />
                  {isActive && (
                    <div className="absolute inset-0 flex h-full w-full flex-col overflow-hidden rounded-2xl border-4 border-primary bg-white/50 p-2">
                      <div className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <span className={dx('heading-compact-02')}>
                          {index + 1}
                        </span>
                      </div>
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </ScrollArea>
        <div className="flex grow items-center justify-center rounded-2xl bg-muted p-2 shadow-inner">
          <img
            src={slides[selectedIndex]}
            alt="Selected Slide"
            className="pointer-events-none rounded-2xl border object-contain"
            draggable={false}
          />
        </div>
      </div>
    </DialogContent>
  )
}
