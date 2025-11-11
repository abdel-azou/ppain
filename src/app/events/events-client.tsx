'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
    Calendar, 
    Phone, 
    ArrowRight,
    CheckCircle,
    Star,
    MapPin,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import './Events.css';

// --- Interfaces ---
interface EventItem {
    id: number;
    title: string;
    description: string;
    longDescription: string;
    image: string;
    category: string;
    featured: boolean;
    altText: string;
    tags: string[];
    services: string[];
}

interface EventCategory {
    id: string;
    label: string;
    icon: string;
}

interface Service {
    id: number;
    title: string;
    description: string;
    icon: string;
    features: string[];
}

interface RealizedEvent {
    id: number;
    image: string;
    title: string;
    description: string;
}

interface EventsClientProps {
    eventItems: EventItem[];
    categories: EventCategory[];
    services: Service[];
    realizedEvents: RealizedEvent[];
}

// --- Composant Client ---
const EventsClient: React.FC<EventsClientProps> = ({ eventItems, categories, services, realizedEvents }) => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [selectedImage, setSelectedImage] = useState<RealizedEvent | null>(null);

    const filteredEvents = useMemo(() => {
        if (activeCategory === 'all') return eventItems;
        return eventItems.filter(item => item.category === activeCategory);
    }, [activeCategory, eventItems]);

    // Effet stacking avec IntersectionObserver pour la performance
    const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);
    
    React.useEffect(() => {
        // Mise à jour du nombre de cartes dans CSS
        document.documentElement.style.setProperty('--dynamic-numcards', filteredEvents.length.toString());
        
        const handleScroll = () => {
            filteredEvents.forEach((_, index) => {
                const card = cardRefs.current[index];
                if (!card) return;
                
                const cardContent = card.querySelector('.event-card-content') as HTMLElement;
                if (!cardContent) return;
                
                const rect = card.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                // Position relative de la carte
                const cardTop = rect.top;
                const cardBottom = rect.bottom;
                
                let scale = 1;
                let translateY = 0;
                
                // La carte est complètement visible
                if (cardTop >= 0 && cardBottom <= windowHeight) {
                    scale = 1;
                    translateY = 0;
                }
                // La carte sort par le haut
                else if (cardTop < 0) {
                    const progress = Math.abs(cardTop) / windowHeight;
                    scale = Math.max(0.8, 1 - progress * 0.2);
                    translateY = -progress * 100;
                }
                // La carte entre par le bas
                else if (cardTop > windowHeight) {
                    const progress = (cardTop - windowHeight) / windowHeight;
                    scale = Math.max(0.9, 1 - progress * 0.1);
                    translateY = progress * 50;
                }
                
                // Application des transformations
                cardContent.style.setProperty('--scale', scale.toString());
                cardContent.style.setProperty('--translateY', `${translateY}px`);
            });
        };
        
        // Optimisation avec RAF
        let ticking = false;
        const scrollListener = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', scrollListener, { passive: true });
        handleScroll(); // Initial call
        
        return () => {
            window.removeEventListener('scroll', scrollListener);
        };
    }, [filteredEvents]);



    // Gestion du carrousel - approche simplifiée et plus robuste
    const [slidesPerView, setSlidesPerView] = React.useState(3);
    
    // Calculer le nombre maximum de slides
    const maxSlide = React.useMemo(() => {
        return Math.max(0, realizedEvents.length - slidesPerView);
    }, [realizedEvents.length, slidesPerView]);

    React.useEffect(() => {
        const updateSlidesPerView = () => {
            if (window.innerWidth < 768) {
                setSlidesPerView(1);
            } else if (window.innerWidth < 1024) {
                setSlidesPerView(2);
            } else {
                setSlidesPerView(3);
            }
        };

        updateSlidesPerView();
        window.addEventListener('resize', updateSlidesPerView);
        return () => window.removeEventListener('resize', updateSlidesPerView);
    }, []);

    // Réinitialiser le slide si nécessaire
    React.useEffect(() => {
        if (currentSlide > maxSlide) {
            setCurrentSlide(0);
        }
    }, [maxSlide, currentSlide]);

    const nextSlide = React.useCallback(() => {
        setCurrentSlide((prev) => {
            if (prev >= maxSlide) return 0;
            return prev + 1;
        });
    }, [maxSlide]);

    const prevSlide = React.useCallback(() => {
        setCurrentSlide((prev) => {
            if (prev <= 0) return maxSlide;
            return prev - 1;
        });
    }, [maxSlide]);

    const goToSlide = React.useCallback((index: number) => {
        const clampedIndex = Math.max(0, Math.min(index, maxSlide));
        setCurrentSlide(clampedIndex);
    }, [maxSlide]);

    // Auto-défilement simplifié
    React.useEffect(() => {
        if (realizedEvents.length <= slidesPerView) return;
        
        const interval = setInterval(() => {
            setCurrentSlide((prev) => {
                if (prev >= maxSlide) return 0;
                return prev + 1;
            });
        }, 5000); // Augmenté à 5 secondes pour plus de stabilité
        
        return () => clearInterval(interval);
    }, [maxSlide, realizedEvents.length, slidesPerView]);

    return (
        <div className="events-page">
            {/* Hero Section */}
            <section className="events-hero">
                <div className="events-hero-content">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        Événements d&apos;Exception
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                    >
                        Transformons vos moments précieux en souvenirs inoubliables avec nos créations sur mesure. 
                        Mariages, anniversaires, célébrations... chaque événement mérite sa pâtisserie d&apos;exception.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                    >
                        <Link href="#consultation" className="events-cta">
                            <Calendar size={20} />
                            Planifier mon événement
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Section des Catégories d'Événements */}
            <section className="events-section bg-cream">
                <div className="events-container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="section-title">Nos Spécialités Événementielles</h2>
                        <p className="section-subtitle">
                            Chaque occasion est unique, nos créations aussi. Découvrez nos spécialités par type d&apos;événement.
                        </p>
                    </motion.div>

                    {/* Filtres de catégories */}
                    <motion.div 
                        className="filter-bar"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {categories.map(category => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`filter-button ${activeCategory === category.id ? 'active' : ''}`}
                            >
                                <span className="category-icon">{category.icon}</span>
                                {category.label}
                            </button>
                        ))}
                    </motion.div>

                    {/* Indication de scroll */}
                    <motion.div
                        className="scroll-hint"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 0.8 }}
                    >
                        <p>⬇️ Faites défiler pour découvrir nos créations</p>
                    </motion.div>

                    {/* Conteneur Stacking Cards */}
                    <div className="events-cards-container">
                        <div className="events-grid">
                            <AnimatePresence mode="wait">
                                {filteredEvents.map((event, index) => (
                                    <motion.div
                                        key={event.id}
                                        ref={(el) => { cardRefs.current[index] = el; }}
                                        className="event-card"
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 50 }}
                                        transition={{ 
                                            duration: 0.6, 
                                            delay: index * 0.1,
                                            ease: [0.25, 0.46, 0.45, 0.94]
                                        }}
                                        onClick={() => setSelectedEvent(event)}
                                    >
                                        <div className="event-card-content">
                                            <div className="event-content">
                                                <div>
                                                    <h3>{event.title}</h3>
                                                    <p>{event.description}</p>
                                                    <div className="event-tags">
                                                        {event.tags.slice(0, 3).map(tag => (
                                                            <span key={tag} className="event-tag">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="event-image-container">
                                                <Image
                                                    src={event.image}
                                                    alt={event.altText}
                                                    fill
                                                    style={{
                                                        objectFit: 'cover',
                                                        display: 'block'
                                                    }}
                                                    className="event-image"
                                                    quality={85}
                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                    priority={index < 3}
                                                    placeholder="blur"
                                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+al+aArY3/"
                                                />
                                                <div className="event-overlay">
                                                    <div className="event-overlay-content">
                                                        <h4>Services inclus</h4>
                                                        <p>{event.services.slice(0, 2).join(' • ')}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section des Services */}
            <section className="events-section bg-white">
                <div className="events-container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="section-title">Notre Accompagnement Complet</h2>
                        <p className="section-subtitle">
                            De la conception à la dégustation, nous vous accompagnons à chaque étape de votre projet.
                        </p>
                    </motion.div>

                    <div className="services-grid">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.id}
                                className="service-card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <div className="service-icon">
                                    <span className="service-icon-large">{service.icon}</span>
                                </div>
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                                <ul className="service-features">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="service-feature-item">
                                            <CheckCircle size={16} className="service-feature-icon" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Carrousel des Événements Réalisés */}
            <section className="events-section bg-cream">
                <div className="events-container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="section-title">Nos Événements Réalisés</h2>
                        <p className="section-subtitle">
                            Découvrez quelques-unes de nos plus belles réalisations pour des moments inoubliables.
                        </p>
                    </motion.div>

                    <motion.div
                        className="events-carousel"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div 
                            className={`carousel-container slide-${Math.min(currentSlide, 20)} slides-${slidesPerView}`}
                        >
                            {realizedEvents.map((event, index) => (
                                <div
                                    key={event.id}
                                    className="carousel-slide clickable"
                                    onClick={() => setSelectedImage(event)}
                                >
                                    <div className="carousel-image-container">
                                        <Image
                                            src={event.image}
                                            alt={event.title}
                                            fill
                                            style={{objectFit: 'cover'}}
                                            quality={85}
                                            sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
                                            priority={index < 6}
                                        />
                                        <div className="image-overlay">
                                            <span className="zoom-icon">🔍</span>
                                        </div>
                                    </div>
                                    <div className="carousel-content">
                                        <h3>{event.title}</h3>
                                        <p>{event.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Navigation du carrousel */}
                        <button 
                            className="carousel-nav prev" 
                            onClick={prevSlide}
                            aria-label="Image précédente"
                        >
                            <ChevronLeft size={24} color="#7a6652" />
                        </button>
                        <button 
                            className="carousel-nav next" 
                            onClick={nextSlide}
                            aria-label="Image suivante"
                        >
                            <ChevronRight size={24} color="#7a6652" />
                        </button>
                    </motion.div>

                    {/* Indicateurs du carrousel */}
                    <div className="carousel-indicators">
                        {Array.from({ length: maxSlide + 1 }, (_, index) => (
                            <button
                                key={index}
                                className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                                onClick={() => goToSlide(index)}
                                aria-label={`Aller au groupe ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Statistiques */}
                    <div className="carousel-stats">
                        <p>
                            <strong>Votre événement sera unique, comme chacune de nos créations</strong><br />
                            Contactez-nous pour concrétiser votre projet
                        </p>
                    </div>
                </div>
            </section>

            {/* Section CTA */}
            <section className="events-section bg-white">
                <div className="events-container">
                    <motion.div
                        className="cta-section"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        id="consultation"
                    >
                        <h2>Prêt à Créer Votre Événement de Rêve ?</h2>
                        <p>
                            Rencontrons-nous pour discuter de votre projet. Consultation gratuite et devis personnalisé.
                        </p>
                        <div className="cta-buttons">
                            <Link href="/contact" className="cta-button">
                                <Phone size={20} />
                                Consultation gratuite
                            </Link>
                            <Link href="/gallery" className="cta-button secondary">
                                <Star size={20} />
                                Voir nos créations
                            </Link>
                        </div>
                        <div className="cta-location">
                            <MapPin size={16} />
                            3 boutiques à Bruxelles : Evere, Koekelberg, Molenbeek
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Modal de détail d'événement */}
            <AnimatePresence>
                {selectedEvent && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedEvent(null)}
                    >
                        <motion.div
                            className="modal-content"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="modal-title">
                                {selectedEvent.title}
                            </h3>
                            <p className="modal-description">
                                {selectedEvent.longDescription}
                            </p>
                            <div className="modal-services">
                                <h4 className="modal-services-title">
                                    Services inclus :
                                </h4>
                                <ul className="modal-services-list">
                                    {selectedEvent.services.map((service, idx) => (
                                        <li key={idx} className="modal-service-item">
                                            <CheckCircle size={16} className="modal-service-icon" />
                                            {service}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="modal-actions">
                                <button
                                    onClick={() => setSelectedEvent(null)}
                                    className="modal-button-close"
                                >
                                    Fermer
                                </button>
                                <Link 
                                    href="/contact"
                                    className="modal-button-cta"
                                >
                                    <ArrowRight size={16} />
                                    Demander un devis
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modal d'agrandissement d'image */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        className="image-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            className="image-modal-content"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="modal-close"
                                onClick={() => setSelectedImage(null)}
                                aria-label="Fermer l'image"
                            >
                                ✕
                            </button>
                            <div className="modal-image-container">
                                <Image
                                    src={selectedImage.image}
                                    alt={selectedImage.title}
                                    fill
                                    style={{objectFit: 'contain'}}
                                    quality={95}
                                    sizes="90vw"
                                />
                            </div>
                            <div className="modal-image-info">
                                <h3>{selectedImage.title}</h3>
                                <p>{selectedImage.description}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default EventsClient;
