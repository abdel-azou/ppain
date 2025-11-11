'use client';

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import Image from 'next/image';
import './Gallery.css';

// --- Interfaces ---
interface GalleryItem {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  category: string;
  featured: boolean;
  altText?: string;
  tags?: string[];
}

interface Category {
  id: string;
  label: string;
}

interface GalleryClientProps {
    galleryItems: GalleryItem[];
    categories: Category[];
}

// --- Composant Client pour la Galerie ---
const GalleryClient: React.FC<GalleryClientProps> = ({ galleryItems, categories }) => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [direction, setDirection] = useState(0);
    const [isTextExpanded, setIsTextExpanded] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const filteredItems = useMemo(() => {
        const items = activeCategory === 'all' ? galleryItems : galleryItems.filter(item => item.category === activeCategory);
        return items;
    }, [activeCategory, galleryItems]);

    // Auto-play carousel
    useEffect(() => {
        if (isAutoPlaying && filteredItems.length > 1) {
            intervalRef.current = setInterval(() => {
                setDirection(1);
                setCurrentIndex((prevIndex) => 
                    prevIndex === filteredItems.length - 1 ? 0 : prevIndex + 1
                );
            }, 4000);
        }
        
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isAutoPlaying, filteredItems.length]);

    const handleNext = useCallback(() => {
        if (filteredItems.length <= 1) return;
        setDirection(1);
        setCurrentIndex((prevIndex) => 
            prevIndex === filteredItems.length - 1 ? 0 : prevIndex + 1
        );
    }, [filteredItems.length]);

    const handlePrev = useCallback(() => {
        if (filteredItems.length <= 1) return;
        setDirection(-1);
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? filteredItems.length - 1 : prevIndex - 1
        );
    }, [filteredItems.length]);

    const handleDotClick = useCallback((index: number) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    }, [currentIndex]);

    // Reset index when category changes
    useEffect(() => {
        setCurrentIndex(0);
        setDirection(0);
    }, [activeCategory]);

    // Reset text expansion when item changes
    useEffect(() => {
        setIsTextExpanded(false);
    }, [currentIndex]);

    // Function to toggle text expansion
    const toggleTextExpansion = useCallback(() => {
        setIsTextExpanded(prev => !prev);
    }, []);

    // Function to check if text needs truncation
    const getDisplayText = useCallback((item: GalleryItem) => {
        const fullText = item.longDescription || item.description;
        const maxLength = 150; // Longueur maximale avant troncature
        
        if (fullText.length <= maxLength || isTextExpanded) {
            return fullText;
        }
        
        return fullText.substring(0, maxLength).trim() + '...';
    }, [isTextExpanded]);

    const shouldShowReadMore = useCallback((item: GalleryItem) => {
        const fullText = item.longDescription || item.description;
        return fullText.length > 150;
    }, []);

    // Animations du carousel
    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8,
            rotateY: direction > 0 ? 45 : -45
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8,
            rotateY: direction < 0 ? 45 : -45
        })
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
        const swipe = swipePower(offset.x, velocity.x);
        
        if (swipe < -swipeConfidenceThreshold) {
            handleNext();
        } else if (swipe > swipeConfidenceThreshold) {
            handlePrev();
        }
    };

    return (
        <section 
            id="gallery" 
            className="gallery-section-carousel"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
        >
            <div className="gallery-container-carousel">
                {/* En-tête */}
                <motion.div 
                    className="gallery-header-carousel"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="gallery-title-carousel">
                        <span className="title-decoration">✨</span>
                        Nos Créations d&apos;Exception
                        <span className="title-decoration">✨</span>
                    </h1>
                    <p className="gallery-subtitle-carousel">
                        Une symphonie de saveurs dans nos 3 boutiques bruxelloises
                    </p>
                </motion.div>

                {/* Barre de filtres améliorée */}
                <motion.div 
                    className="carousel-filter-container"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    <div className="carousel-filter-bar">
                        {categories.map((category, index) => (
                            <motion.button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`carousel-filter-button ${activeCategory === category.id ? 'active' : ''}`}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <span className="filter-emoji">
                                    {category.id === 'all' && '🎯'}
                                    {category.id === 'ambiance' && '🏪'}
                                    {category.id === 'pain-boulangerie' && '🥖'}
                                    {category.id === 'petit-dejeuner' && '☀️'}
                                    {category.id === 'restauration-salee' && '🥪'}
                                    {category.id === 'entremets' && '🍰'}
                                    {category.id === 'petites-douceurs' && '🧁'}
                                    {category.id === 'specialites' && '🎭'}
                                    {category.id === 'gateaux' && '🎂'}
                                </span>
                                {category.label}
                            </motion.button>
                        ))}
                    </div>
                    <p className="filter-scroll-hint">
                        👈 Glissez pour voir toutes les catégories 👉
                    </p>
                </motion.div>

                {/* Carousel principal - Mobile First */}
                <div className="carousel-main-container">
                    {/* Conteneur des slides */}
                    <div className="carousel-slides-container">
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            {filteredItems.length > 0 && (
                                <motion.div
                                    key={currentIndex}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{
                                        x: { type: "spring", stiffness: 300, damping: 30 },
                                        opacity: { duration: 0.4 },
                                        scale: { duration: 0.4 },
                                        rotateY: { duration: 0.6, ease: "easeOut" }
                                    }}
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={1}
                                    onDragEnd={handleDragEnd}
                                    className="carousel-slide"
                                >
                                    {/* Image principale - Mobile First */}
                                    <div className="carousel-image-container">
                                        <Image
                                            src={filteredItems[currentIndex].image}
                                            alt={filteredItems[currentIndex].altText || filteredItems[currentIndex].title}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                            quality={95}
                                            priority
                                            sizes="100vw"
                                        />
                                        
                                        {/* Overlay mobile optimisé */}
                                        <div className="carousel-image-overlay"></div>
                                        
                                        {/* Badges repositionnés pour mobile */}
                                        <div className="carousel-badges-container">
                                            <div className="carousel-category-badge">
                                                {categories.find(cat => cat.id === filteredItems[currentIndex].category)?.label}
                                            </div>

                                            {filteredItems[currentIndex].featured && (
                                                <motion.div 
                                                    className="carousel-featured-badge"
                                                    animate={{ 
                                                        scale: [1, 1.1, 1],
                                                    }}
                                                    transition={{ 
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        repeatDelay: 3
                                                    }}
                                                >
                                                    ⭐
                                                </motion.div>
                                            )}
                                        </div>

                                        {/* Contrôles overlay pour mobile */}
                                        <div className="carousel-mobile-controls">
                                            {/* Boutons de navigation mobiles */}
                                            <button 
                                                className="carousel-nav-mobile carousel-nav-prev-mobile"
                                                onClick={handlePrev}
                                                disabled={filteredItems.length <= 1}
                                                aria-label="Image précédente"
                                            >
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                                                </svg>
                                            </button>

                                            <button 
                                                className="carousel-nav-mobile carousel-nav-next-mobile"
                                                onClick={handleNext}
                                                disabled={filteredItems.length <= 1}
                                                aria-label="Image suivante"
                                            >
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                                                </svg>
                                            </button>
                                        </div>

                                        {/* Compteur mobile */}
                                        <div className="carousel-counter-mobile">
                                            <span className="counter-current">{currentIndex + 1}</span>
                                            <span className="counter-separator">/</span>
                                            <span className="counter-total">{filteredItems.length}</span>
                                        </div>
                                    </div>

                                    {/* Contenu textuel mobile-first */}
                                    <motion.div 
                                        className="carousel-content-mobile"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3, duration: 0.6 }}
                                    >
                                        <h2 className="carousel-item-title-mobile">
                                            {filteredItems[currentIndex].title}
                                        </h2>
                                        <div className="carousel-item-description-container">
                                            <p className={`carousel-item-description-mobile ${isTextExpanded ? 'expanded' : ''}`}>
                                                {getDisplayText(filteredItems[currentIndex])}
                                            </p>
                                            {shouldShowReadMore(filteredItems[currentIndex]) && (
                                                <motion.button 
                                                    className="read-more-button"
                                                    onClick={toggleTextExpansion}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    {isTextExpanded ? (
                                                        <>
                                                            <span>Lire moins</span>
                                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                                                <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
                                                            </svg>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span>Lire plus</span>
                                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                                                <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>
                                                            </svg>
                                                        </>
                                                    )}
                                                </motion.button>
                                            )}
                                        </div>
                                        
                                        {/* Tags mobiles */}
                                        {filteredItems[currentIndex].tags && (
                                            <motion.div 
                                                className="carousel-tags-mobile"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.5 }}
                                            >
                                                {filteredItems[currentIndex].tags?.slice(0, 3).map((tag, tagIndex) => (
                                                    <motion.span
                                                        key={tag}
                                                        className="carousel-tag-mobile"
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ 
                                                            delay: 0.6 + (tagIndex * 0.1),
                                                            type: "spring",
                                                            stiffness: 200
                                                        }}
                                                    >
                                                        #{tag}
                                                    </motion.span>
                                                ))}
                                            </motion.div>
                                        )}

                                        {/* Contrôle auto-play mobile */}
                                        <button 
                                            className={`carousel-play-button-mobile ${isAutoPlaying ? 'playing' : 'paused'}`}
                                            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                                            aria-label={isAutoPlaying ? 'Mettre en pause' : 'Reprendre le diaporama'}
                                        >
                                            {isAutoPlaying ? (
                                                <>
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                                                    </svg>
                                                    <span>Pause</span>
                                                </>
                                            ) : (
                                                <>
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M8 5v14l11-7z"/>
                                                    </svg>
                                                    <span>Play</span>
                                                </>
                                            )}
                                        </button>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Boutons de navigation desktop */}
                    <button 
                        className="carousel-nav-button carousel-nav-prev"
                        onClick={handlePrev}
                        disabled={filteredItems.length <= 1}
                        aria-label="Image précédente"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                        </svg>
                    </button>

                    <button 
                        className="carousel-nav-button carousel-nav-next"
                        onClick={handleNext}
                        disabled={filteredItems.length <= 1}
                        aria-label="Image suivante"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                        </svg>
                    </button>

                    {/* Indicateurs (dots) - Mobile et Desktop */}
                    <div className="carousel-indicators-mobile">
                        {filteredItems.map((_, index) => (
                            <button
                                key={index}
                                className={`carousel-dot-mobile ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => handleDotClick(index)}
                                aria-label={`Aller à l'image ${index + 1}`}
                            >
                            </button>
                        ))}
                    </div>
                </div>

                {/* Section miniatures - Cachée sur mobile, visible sur desktop */}
                <motion.div 
                    className="carousel-thumbnails-desktop"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    {filteredItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            className={`carousel-thumbnail-desktop ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => handleDotClick(index)}
                            whileHover={{ scale: 1.05, y: -3 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                style={{ objectFit: 'cover' }}
                                quality={70}
                                sizes="(max-width: 768px) 0px, 120px"
                            />
                            <div className="thumbnail-overlay-desktop">
                                <span className="thumbnail-title-desktop">{item.title.substring(0, 25)}...</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default GalleryClient;
