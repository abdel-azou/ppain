import { useState, useEffect, RefObject } from 'react';

interface UseScrollAnimationProps {
  containerRef: RefObject<HTMLDivElement | null>;
  totalFrames: number;
}

export const useScrollAnimation = ({ containerRef, totalFrames }: UseScrollAnimationProps) => {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Position de la section
      const sectionTop = containerRect.top;
      const sectionHeight = containerRect.height;
      
      // L'animation ne commence que quand le haut de la section atteint le bas du tiers supérieur de l'écran
      const animationStartPoint = windowHeight * 0.3; // Plus bas pour commencer plus tard
      const animationEndPoint = -sectionHeight * 0.5; // Plus de distance pour une animation plus longue
      
      if (sectionTop <= animationStartPoint && sectionTop >= animationEndPoint) {
        // Calculer le progrès basé sur la position de la section
        const scrollDistance = animationStartPoint - animationEndPoint;
        const currentProgress = (animationStartPoint - sectionTop) / scrollDistance;
        
        // Appliquer une courbe ease-in-out pour un défilement plus naturel
        const easedProgress = currentProgress < 0.5 
          ? 2 * currentProgress * currentProgress 
          : 1 - Math.pow(-2 * currentProgress + 2, 2) / 2;
        
        // Convertir en frame avec une progression plus contrôlée
        const frameIndex = Math.floor(easedProgress * totalFrames);
        const clampedFrame = Math.max(0, Math.min(frameIndex, totalFrames - 1));
        
        setCurrentFrame(clampedFrame);
      } else if (sectionTop > animationStartPoint) {
        // Avant que l'animation commence
        setCurrentFrame(0);
      } else if (sectionTop < animationEndPoint) {
        // Après que l'animation soit terminée
        setCurrentFrame(totalFrames - 1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Vérifier la position initiale

    return () => window.removeEventListener('scroll', handleScroll);
  }, [containerRef, totalFrames]);

  const progressPercentage = ((currentFrame + 1) / totalFrames) * 100;

  // Retourner les frames visibles pour l'effet de superposition
  const visibleFrames = Array.from({ length: currentFrame + 1 }, (_, i) => i);

  return {
    currentFrame,
    progressPercentage,
    visibleFrames
  };
};
