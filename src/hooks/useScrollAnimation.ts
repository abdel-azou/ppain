import { useState, useEffect, RefObject } from 'react';

interface UseScrollAnimationProps {
  containerRef: RefObject<HTMLDivElement | null>;
  totalFrames: number;
}

export const useScrollAnimation = ({ containerRef, totalFrames }: UseScrollAnimationProps) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Position de la section
      const sectionTop = containerRect.top;
      const sectionHeight = containerRect.height;
      
      // Zone d'animation optimisée pour mobile et desktop
      // Mobile: animation commence quand la section entre par le bas
      // Desktop: pareil mais avec plus d'espace
      const viewportOffset = window.innerWidth <= 768 ? windowHeight * 0.1 : windowHeight * 0.2;
      const animationStartPoint = windowHeight - viewportOffset; // Section entre dans la vue
      const animationEndPoint = -sectionHeight + viewportOffset; // Section sort de la vue
      
      if (sectionTop <= animationStartPoint && sectionTop >= animationEndPoint) {
        // Calculer le progrès exact basé sur la position de scroll
        const scrollDistance = animationStartPoint - animationEndPoint;
        const currentProgress = (animationStartPoint - sectionTop) / scrollDistance;
        
        // Progrès linéaire sans easing pour suivre exactement le scroll
        const clampedProgress = Math.max(0, Math.min(currentProgress, 1));
        setScrollProgress(clampedProgress);
        
        // Convertir en frame avec plus de précision pour mobile
        const frameIndex = Math.floor(clampedProgress * totalFrames);
        const clampedFrame = Math.max(0, Math.min(frameIndex, totalFrames - 1));
        
        setCurrentFrame(clampedFrame);
      } else if (sectionTop > animationStartPoint) {
        // Avant que l'animation commence
        setScrollProgress(0);
        setCurrentFrame(0);
      } else if (sectionTop < animationEndPoint) {
        // Après que l'animation soit terminée
        setScrollProgress(1);
        setCurrentFrame(totalFrames - 1);
      }
    };

    // Utiliser requestAnimationFrame pour des performances optimales sur mobile
    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });
    // Ajouter aussi les événements tactiles pour mobile
    window.addEventListener('touchmove', scrollHandler, { passive: true });
    handleScroll(); // Vérifier la position initiale

    return () => {
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('touchmove', scrollHandler);
    };
  }, [containerRef, totalFrames]);

  const progressPercentage = scrollProgress * 100;

  // Retourner les frames visibles pour l'effet de superposition
  const visibleFrames = Array.from({ length: currentFrame + 1 }, (_, i) => i);

  return {
    currentFrame,
    progressPercentage,
    visibleFrames,
    scrollProgress
  };
};
