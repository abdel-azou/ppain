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

    const filteredEvents = useMemo(() => {
        if (activeCategory === 'all') return eventItems;
        return eventItems.filter(item => item.category === activeCategory);
    }, [activeCategory, eventItems]);



    // Gestion du carrousel
    const [slidesPerView, setSlidesPerView] = React.useState(3);
    const maxSlide = Math.max(0, realizedEvents.length - slidesPerView);

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

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(Math.min(index, maxSlide));
    };

    // Auto-défilement du carrousel
    React.useEffect(() => {
        const interval = setInterval(nextSlide, 4000);
        return () => clearInterval(interval);
    }, [nextSlide, maxSlide]);

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

                    {/* Grille des événements */}
                    <div className="events-grid">
                        <AnimatePresence mode="wait">
                            {filteredEvents.map((event, index) => (
                                <motion.div
                                    key={event.id}
                                    className="event-card"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    onClick={() => setSelectedEvent(event)}
                                >
                                    <div className="event-image-container">
                                        <Image
                                            src={event.image}
                                            alt={event.altText}
                                            layout="fill"
                                            objectFit="cover"
                                            className="event-image"
                                            quality={85}
                                            sizes="(max-width: 480px) 375px, (max-width: 768px) 768px, 350px"
                                        />
                                        <div className="event-overlay">
                                            <div className="event-overlay-content">
                                                <h4>Services inclus</h4>
                                                <p>{event.services.slice(0, 2).join(' • ')}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="event-content">
                                        <h3>{event.title}</h3>
                                        <p>{event.description}</p>
                                        <div className="event-tags">
                                            {event.tags.map(tag => (
                                                <span key={tag} className="event-tag">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
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
                            className={`carousel-container slide-${currentSlide} slides-${slidesPerView}`}
                        >
                            {realizedEvents.map((event, index) => (
                                <div
                                    key={event.id}
                                    className="carousel-slide"
                                >
                                    <Image
                                        src={event.image}
                                        alt={event.title}
                                        layout="fill"
                                        objectFit="cover"
                                        quality={85}
                                        sizes="(max-width: 480px) 375px, (max-width: 768px) 50vw, 33vw"
                                        priority={index < 6}
                                    />
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
                            <strong>Plus de {realizedEvents.length} événements</strong> réalisés avec succès<br />
                            Faites confiance à notre expertise pour votre projet
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
                            Chaussée de Louvain 906, 1140 Evere
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
        </div>
    );
};

export default EventsClient;
