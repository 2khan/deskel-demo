import {
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import Slide1 from '@/assets/media/slide-1.webp'
import Slide2 from '@/assets/media/slide-2.webp'
import Slide3 from '@/assets/media/slide-3.webp'
import Slide4 from '@/assets/media/slide-4.webp'
import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'

const slides = [Slide1, Slide2, Slide3, Slide4]

export default function PPT() {
  return (
    <DialogContent className="h-full w-full max-w-screen-2xl p-2">
      <DialogHeader>
        <DialogTitle>(.PPT) Viewer</DialogTitle>
      </DialogHeader>
      <Carousel>
        <CarouselContent>
          {slides.map((slide) => (
            <img
              key={slide}
              src={slide}
              alt="slide"
              className="h-full w-full"
            />
          ))}
          <CarouselItem></CarouselItem>
        </CarouselContent>
        <CarouselIndicator count={4} />
        <CarouselNext />
        <CarouselPrevious />
      </Carousel>
    </DialogContent>
  )
}
