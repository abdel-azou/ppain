'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useSwipe } from '@/hooks/useSwipe';
import './ScrollAnimation.css';

const ScrollAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

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
  
  // Hook de scroll pour desktop
  const { currentFrame: scrollFrame, visibleFrames: scrollVisibleFrames } = useScrollAnimation({ 
    containerRef, 
    totalFrames 
  });

  // Hook de swipe pour mobile
  const { currentFrame: swipeFrame, setCurrentFrame: setSwipeFrame, swipeHandlers } = useSwipe({
    totalFrames,
    onFrameChange: () => {} // Fonction vide car on n'utilise plus manualFrame
  });

  // Détection mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Logique conditionnelle selon le device
  const currentFrame = isMobile ? swipeFrame : scrollFrame;
  const visibleFrames = isMobile 
    ? Array.from({ length: swipeFrame + 1 }, (_, i) => i)
    : scrollVisibleFrames;

  const currentText = frameTexts[currentFrame] || frameTexts[0];

  return (
    <section className="scroll-cinematic-section" ref={containerRef}>
      <div className="cinematic-container">
        <div className="cinematic-content">
          {/* Animation player - desktop côté gauche, mobile plein écran */}
          <div 
            className="animation-player" 
            ref={animationRef}
            {...(isMobile ? swipeHandlers : {})}
          >
            <div className="frame-stack">
              {Array.from({ length: totalFrames }, (_, index) => (
                <div
                  key={index}
                  className={`cinematic-layer layer-${index} z-index-${index + 1} ${visibleFrames.includes(index) ? 'visible' : 'hidden'}`}
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

              {/* Indicateur de swipe pour mobile */}
              {isMobile && (
                <div className="swipe-indicator">
                  <div className="swipe-dots">
                    {Array.from({ length: totalFrames }, (_, index) => (
                      <div
                        key={index}
                        className={`swipe-dot ${index === currentFrame ? 'active' : ''}`}
                        onClick={() => setSwipeFrame(index)}
                      />
                    ))}
                  </div>
                </div>
              )}
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
