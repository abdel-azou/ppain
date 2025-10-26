import { useState, useCallback } from 'react';

interface UseSwipeProps {
  totalFrames: number;
  onFrameChange: (frame: number) => void;
}

export const useSwipe = ({ totalFrames, onFrameChange }: UseSwipeProps) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);

  // Distance minimale pour considérer un swipe
  const minSwipeDistance = 50;

  const onTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    
    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    
    // Déterminer si c'est un swipe vertical ou horizontal
    const isVerticalSwipe = Math.abs(distanceY) > Math.abs(distanceX);
    
    if (isVerticalSwipe) {
      // Swipe vertical - vers le haut pour avancer (faire descendre l'animation), vers le bas pour reculer
      const isUpSwipe = distanceY > minSwipeDistance;
      const isDownSwipe = distanceY < -minSwipeDistance;

      if (isUpSwipe && currentFrame < totalFrames - 1) {
        const newFrame = currentFrame + 1;
        setCurrentFrame(newFrame);
        onFrameChange(newFrame);
      } else if (isDownSwipe && currentFrame > 0) {
        const newFrame = currentFrame - 1;
        setCurrentFrame(newFrame);
        onFrameChange(newFrame);
      }
    } else {
      // Swipe horizontal - maintenir pour navigation alternative
      const isLeftSwipe = distanceX > minSwipeDistance;
      const isRightSwipe = distanceX < -minSwipeDistance;

      if (isLeftSwipe && currentFrame < totalFrames - 1) {
        const newFrame = currentFrame + 1;
        setCurrentFrame(newFrame);
        onFrameChange(newFrame);
      } else if (isRightSwipe && currentFrame > 0) {
        const newFrame = currentFrame - 1;
        setCurrentFrame(newFrame);
        onFrameChange(newFrame);
      }
    }
  }, [touchStart, touchEnd, currentFrame, totalFrames, onFrameChange, minSwipeDistance]);

  const swipeHandlers = {
    onTouchStart,
    onTouchMove,
    onTouchEnd
  };

  return {
    currentFrame,
    setCurrentFrame,
    swipeHandlers
  };
};
