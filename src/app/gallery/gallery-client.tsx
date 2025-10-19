'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    const [cardStack, setCardStack] = useState<GalleryItem[]>([]);

    const initialItems = useMemo(() => {
        if (activeCategory === 'all') return galleryItems;
        return galleryItems.filter(item => item.category === activeCategory);
    }, [activeCategory, galleryItems]);

    useEffect(() => {
        setCardStack(initialItems);
    }, [initialItems]);

    const handleSwipe = (itemToRemove: GalleryItem) => {
        setCardStack(currentStack => currentStack.filter(item => item.id !== itemToRemove.id));
    };

    const resetStack = () => {
        setCardStack(initialItems);
    };

    return (
        <section id="gallery" className="gallery-section-stacked">
            <div className="gallery-container">
                <div className="gallery-header">
                    <h1 className="gallery-title">L&apos;Art de Faire Rêver</h1>
                    <p className="gallery-subtitle">
                        Découvrez nos créations comme on feuillette un livre d&apos;images. 
                        Chaque pâtisserie raconte une histoire, la vôtre commence ici.
                    </p>
                </div>

                <div className="filter-bar">
                    {categories.map(category => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`filter-button ${activeCategory === category.id ? 'active' : ''}`}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>

                <div className="card-stack-container">
                    <AnimatePresence>
                        {cardStack.map((item, index) => {
                            if (index > 2) return null;
                            const isTopCard = index === 0;

                            return (
                                <motion.div
                                    key={item.id}
                                    className="swipe-card"
                                    drag={isTopCard ? "x" : false}
                                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                                    onDragEnd={(_e, { offset, velocity }) => {
                                        if (isTopCard) {
                                            const swipeThreshold = 80;
                                            if (Math.abs(offset.x) > swipeThreshold || Math.abs(velocity.x) > 200) {
                                                handleSwipe(item);
                                            }
                                        }
                                    }}
                                    animate={{
                                        scale: 1 - (index * 0.05),
                                        y: index * 12,
                                        zIndex: cardStack.length - index,
                                    }}
                                    transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                                >
                                    <Image 
                                        src={item.image} 
                                        alt={item.altText || item.title} 
                                        layout="fill"
                                        objectFit="cover"
                                        priority={index < 2}
                                        draggable="false"
                                        quality={85}
                                        sizes="(max-width: 480px) 375px, (max-width: 768px) 768px, 1200px"
                                    />
                                    <div className="card-info-overlay">
                                        <div className="card-info-content">
                                            <h2 className="card-title">{item.title}</h2>
                                            <p className="card-description">{item.description}</p>
                                        </div>
                                    </div>
                                    {index === cardStack.length - 1 && (
                                       <div className="absolute bottom-4 right-4 text-xs text-gray-400">
                                         Faites glisser pour voir plus d&apos;images
                                       </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>

                    {cardStack.length === 0 && (
                        <motion.div 
                            className="empty-stack-state"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <p>Vous avez savouré toute notre galerie !</p>
                            <p className="subtitle">
                                Comme un bon repas, ça se recommence toujours avec plaisir.
                            </p>
                            <button onClick={resetStack} className="reset-button">
                                Revoir la galerie
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default GalleryClient;
