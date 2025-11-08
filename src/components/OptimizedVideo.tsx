'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

interface OptimizedVideoProps {
  src: string;
  fallbackImage: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export const OptimizedVideo = ({ 
  src, 
  fallbackImage, 
  alt, 
  className = '',
  width = 500,
  height = 600 
}: OptimizedVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const handleVideoError = () => {
    setHasError(true);
  };

  // Si erreur de chargement ou vidéo pas encore en vue, afficher l'image fallback
  if (hasError || !isInView) {
    return (
      <Image
        src={fallbackImage}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading="lazy"
      />
    );
  }

  return (
    <div className="video-container">
      {/* Image de chargement pendant que la vidéo se charge */}
      {!isVideoLoaded && (
        <Image
          src={fallbackImage}
          alt={alt}
          width={width}
          height={height}
          className={`${className} video-fallback`}
        />
      )}
      
      {/* Vidéo */}
      <video
        ref={videoRef}
        className={`${className} ${isVideoLoaded ? 'video-loaded' : 'video-loading'}`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onLoadedData={handleVideoLoad}
        onError={handleVideoError}
      >
        <source src={src} type="video/mp4" />
        {/* Fallback pour navigateurs très anciens */}
        Votre navigateur ne supporte pas la lecture vidéo.
      </video>
    </div>
  );
};
