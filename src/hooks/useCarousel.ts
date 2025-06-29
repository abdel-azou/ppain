import { useState, useEffect, useCallback } from 'react';
import { UseEmblaCarouselType } from 'embla-carousel-react';

type UseCarouselType = {
  emblaApi: UseEmblaCarouselType[1] | undefined;
  onSelect: () => void;
  selectedIndex: number;
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
};

export const useCarousel = (
  emblaApi: UseEmblaCarouselType[1] | undefined
): UseCarouselType => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return { emblaApi, onSelect, selectedIndex, scrollPrev, scrollNext, scrollTo };
};
