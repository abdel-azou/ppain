'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import './ScrollAnimation.css';

const ScrollAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const totalFrames = 8;
  
  // Titres marketing courts et convaincants
  const frameTexts = [
    {
      title: "TOUT FAIT MAISON",
      subtitle: "",
      description: ""
    },
    {
      title: "ARTISANS PASSIONNÉS",
      subtitle: "",
      description: ""
    },
    {
      title: "INGRÉDIENTS PREMIUM",
      subtitle: "",
      description: ""
    },
    {
      title: "CRÉATIONS UNIQUES",
      subtitle: "",
      description: ""
    },
    {
      title: "SAVEURS AUTHENTIQUES",
      subtitle: "",
      description: ""
    },
    {
      title: "FRAÎCHEUR GARANTIE",
      subtitle: "",
      description: ""
    },
    {
      title: "EXCELLENCE QUOTIDIENNE",
      subtitle: "",
      description: ""
    },
    {
      title: "VOTRE PLAISIR GOURMAND",
      subtitle: "",
      description: ""
    }
  ];
  
  // Hook de scroll pour desktop et mobile
  const { currentFrame: scrollFrame, visibleFrames: scrollVisibleFrames, scrollProgress } = useScrollAnimation({ 
    containerRef, 
    totalFrames 
  });

  // Pas de swipe, on utilise seulement le scroll
  const currentFrame = scrollFrame;
  const visibleFrames = scrollVisibleFrames;

  // Effet pour mettre à jour les positions des layers en temps réel
  useEffect(() => {
    // Utiliser requestAnimationFrame pour des performances optimales
    const animationId = requestAnimationFrame(() => {
      layerRefs.current.forEach((layer, index) => {
        if (layer) {
          const layerProgress = Math.max(0, Math.min(1, (scrollProgress * totalFrames) - index));
          const translateY = (1 - layerProgress) * 100;
          const opacity = layerProgress;
          
          // Utiliser transform3d pour activer l'accélération matérielle
          layer.style.transform = `translate3d(0, ${translateY}%, 0)`;
          layer.style.opacity = opacity.toString();
        }
      });
    });
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [scrollProgress, totalFrames]);

  const currentText = frameTexts[currentFrame] || frameTexts[0];

  return (
    <section 
      className="scroll-cinematic-section"
      ref={containerRef}
    >
      <div className="cinematic-container">
        <div className="cinematic-content">
          {/* Animation player - desktop côté gauche, mobile plein écran */}
          <div 
            className="animation-player" 
            ref={animationRef}
          >
            <div className="frame-stack">
              {Array.from({ length: totalFrames }, (_, index) => (
                <div
                  key={index}
                  ref={(el) => { layerRefs.current[index] = el; }}
                  className={`cinematic-layer layer-${index} z-index-${index + 1}`}
                >
                  <Image
                    src={`/animations/${index + 1}.jpg`}
                    alt={`Étape ${index + 1} de la création artisanale`}
                    fill
                    priority={index === 0}
                    className="layer-image"
                  />
                </div>
              ))}
            </div>
            
            {/* Texte superposé sur mobile - change avec chaque frame */}
            <div className="mobile-overlay-text" data-changing={false}>
              <div className="overlay-content">
                <div className="overlay-header">
                  <h2 key={`typewriter-${currentFrame}`} className="typewriter-text">
                    {currentText.title}
                  </h2>
                </div>
              </div>

              {/* Indicateur de progression simple */}
              <div className="progress-indicator">
                <div className="progress-bar">
                  <div className={`progress-fill progress-${currentFrame + 1}`} />
                </div>
                <p className="progress-text">
                  {currentFrame + 1} / {totalFrames}
                </p>
              </div>
            </div>
            
            {/* Indicateur de progression pour desktop */}
            <div className="progress-dots desktop-only">
              {Array.from({ length: totalFrames }, (_, index) => (
                <div
                  key={index}
                  className={`progress-dot ${visibleFrames.includes(index) ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>

          {/* Contenu texte desktop - côté droit */}
          <div className="desktop-content-text">
            <div className="text-header">
              <h2>L&apos;Art de la Création Artisanale</h2>
              <p className="subtitle">
                Tout est fait sur place, créé par nous pour vous
              </p>
            </div>
            
            <div className="process-steps">
              <div className={`process-step ${currentFrame >= 0 ? 'visible' : ''}`}>
                <div className="step-number">1</div>
                <div className="step-info">
                  <h3>Sélection</h3>
                  <p>Sélection minutieuse des meilleurs ingrédients</p>
                </div>
              </div>

              <div className={`process-step ${currentFrame >= 2 ? 'visible' : ''}`}>
                <div className="step-number">2</div>
                <div className="step-info">
                  <h3>Façonnage</h3>
                  <p>Transformation artisanale avec savoir-faire</p>
                </div>
              </div>

              <div className={`process-step ${currentFrame >= 4 ? 'visible' : ''}`}>
                <div className="step-number">3</div>
                <div className="step-info">
                  <h3>Finition</h3>
                  <p>Glaçage délicat et présentation soignée</p>
                </div>
              </div>

              <div className={`process-step ${currentFrame >= 6 ? 'visible' : ''}`}>
                <div className="step-number">4</div>
                <div className="step-info">
                  <h3>Perfection</h3>
                  <p>Création unique prête à être savourée</p>
                </div>
              </div>
            </div>

            <div className="craft-quote">
              <blockquote>
                &ldquo;Chaque geste compte, chaque détail a son importance. 
                Nous créons bien plus que des pâtisseries : nous créons des émotions.&rdquo;
              </blockquote>
              <cite>&mdash; L&apos;équipe Pain Pâtisserie</cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollAnimation;
