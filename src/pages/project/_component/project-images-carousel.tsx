import { StepBack, StepForward } from "lucide-react";
import { useCarousel } from "../_hooks/use-carousel";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PropsWithChildren, useRef } from "react";
import { Carousel } from "../_hooks/carousel-context";
import Autoplay from "embla-carousel-autoplay";

const ImagesCarousel = ({
  images,
}: PropsWithChildren<{ images: string[] }>) => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <Carousel
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <ProjectImagesCarousel images={images} />
    </Carousel>
  );
};

const ProjectImagesCarousel = ({ images }: { images: string[] }) => {
  const {
    canScrollNext,
    canScrollPrev,
    scrollNext,
    scrollPrev,
    carouselRef,
    orientation,
  } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden rounded-lg relative">
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col"
        )}
      >
        {images.map((image, index) => (
          <div
            role="group"
            key={index}
            aria-roledescription="slide"
            className={cn(
              "min-w-0 shrink-0 grow-0 basis-full",
              orientation === "horizontal" ? "pl-4" : "pt-4"
            )}
          >
            <div
              className="flex aspect-video items-center justify-center p-6 bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
            />
          </div>
        ))}
      </div>
      <Button
        className={cn(
          "absolute h-full w-16 bg-black/50 rounded-none",
          orientation === "horizontal"
            ? "left-0 top-1/2 -translate-y-1/2"
            : "-top-12 left-1/2 -translate-x-1/2 rotate-90"
        )}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
      >
        <StepBack size={24} />
      </Button>
      <Button
        className={cn(
          "absolute h-full w-16 bg-black/50 rounded-none",
          orientation === "horizontal"
            ? "right-0 top-1/2 -translate-y-1/2"
            : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90"
        )}
        disabled={!canScrollNext}
        onClick={scrollNext}
      >
        <StepForward size={40} />
      </Button>
    </div>
  );
};

export { ImagesCarousel };
