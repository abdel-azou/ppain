'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, MessageCircle, Phone, Mail } from 'lucide-react';
import './EventsFAQ.css';

interface FAQItem {
    question: string;
    answer: string;
    keywords: string[];
}

const faqData: FAQItem[] = [
    {
        question: "Comment obtenir un devis pour mon gâteau de mariage sur mesure ?",
        answer: "Chaque gâteau de mariage est unique et mérite un devis personnalisé ! Contactez-nous directement par WhatsApp au 0472 25 05 78 ou appelez-nous pour une consultation gratuite. Nous discuterons ensemble de vos envies, du nombre d'invités, du style souhaité et établirons un devis transparent adapté à votre budget.",
        keywords: ['devis gâteau mariage', 'consultation gratuite', 'contact WhatsApp', 'personnalisé']
    },
    {
        question: "Quel délai prévoir pour commander un gâteau de mariage ?",
        answer: "Pour la plupart de nos créations, comptez 2 à 3 jours à l'avance. Pour les grosses commandes ou créations très élaborées, prévoyez une semaine maximum. Nous travaillons avec des délais courts pour garantir la fraîcheur optimale ! Appelez le 0472 25 05 78 pour vérifier la disponibilité selon vos dates.",
        keywords: ['délai commande mariage', 'réservation gâteau', 'délai court', 'fraîcheur']
    },
    {
        question: "Comment récupérer mon gâteau de mariage ?",
        answer: "Vous venez retirer votre création directement dans notre pâtisserie à Evere. Nous vous conseillons sur le transport et vous fournissons les emballages adaptés pour garantir que votre gâteau arrive en parfait état. Nos équipes vous expliquent les meilleures pratiques de transport selon votre commande.",
        keywords: ['retrait pâtisserie', 'transport gâteau', 'emballage sécurisé', 'conseils transport']
    },
    {
        question: "Quelles sont vos spécialités de pâtisserie traditionnelle ?",
        answer: "Nous nous concentrons sur la pâtisserie française traditionnelle avec des ingrédients classiques de qualité. Nos spécialités incluent les pièces montées, wedding cakes, gâteaux personnalisés, entremets et créations sur mesure. Pour connaître tous nos parfums et styles disponibles, appelez le 0472 25 05 78 ou venez découvrir notre comptoir !",
        keywords: ['pâtisserie traditionnelle', 'spécialités françaises', 'ingrédients qualité', 'créations classiques']
    },
    {
        question: "Quelles spécialités salées proposez-vous pour événements ?",
        answer: "Nous préparons de délicieuses spécialités salées pour vos événements : pastilla (grande et petite), couscous, mini pizzas, burgers, mini burgers, pains surprises, et bien d'autres créations ! Parfait pour vos réceptions et fêtes. Appelez le 0472 25 05 78 pour discuter des quantités et compositions selon vos besoins.",
        keywords: ['pastilla événement', 'couscous fête', 'mini pizza', 'burger événement', 'pain surprise']
    },
    {
        question: "Réalisez-vous des gâteaux thématiques pour anniversaires d'enfants ?",
        answer: "Oui ! Nous créons des gâteaux thématiques sur mesure : super-héros, princesses, animaux, personnages de dessins animés, sports (football, basket...). Décorations comestibles, couleurs vives, formes personnalisées. Parfait pour marquer l'anniversaire de votre enfant !",
        keywords: ['gâteau anniversaire enfant', 'thématique super-héros', 'gâteau personnalisé', 'fête enfant']
    },
    {
        question: "Comment planifier ma commande personnalisée ?",
        answer: "Appelez-nous directement au 0472 25 05 78 pour discuter de votre projet par téléphone, ou mieux encore, venez nous rendre visite en boutique ! Vous pourrez voir notre comptoir, découvrir nos créations du jour, et nous discuterons ensemble de vos envies. C'est le meilleur moyen de concevoir exactement ce que vous souhaitez.",
        keywords: ['consultation téléphone', 'visite boutique', 'comptoir pâtisserie', 'conseil personnalisé']
    },
    {
        question: "Quelles sont vos spécialités pour les mariages traditionnels ?",
        answer: "Nos spécialités mariage incluent : pièces montées traditionnelles françaises, croquembouches, wedding cakes multi-étages, layer cakes modernes, number cakes personnalisés. Décorations florales fraîches, glaçage royal, pâte à sucre. Chaque création respecte la tradition tout en s'adaptant à vos goûts.",
        keywords: ['pièce montée traditionnelle', 'croquembouche mariage', 'wedding cake français', 'tradition pâtisserie']
    },
    {
        question: "Comment vous contacter rapidement pour mon projet événementiel ?",
        answer: "Pour une réponse rapide et personnalisée, contactez-nous directement par WhatsApp - c'est le moyen le plus pratique pour échanger sur votre projet ! Vous pouvez aussi nous appeler directement. Nous répondons rapidement pour planifier votre consultation gratuite et commencer à créer ensemble votre gâteau de rêve.",
        keywords: ['contact WhatsApp', 'contact rapide', 'consultation gratuite', 'projet événementiel']
    },
    {
        question: "Puis-je voir vos créations avant de commander ?",
        answer: "Bien sûr ! Venez directement dans notre boutique à Evere pour découvrir notre comptoir avec nos pâtisseries fraîches du jour. C'est l'occasion parfaite de voir notre savoir-faire, goûter nos spécialités et discuter de votre projet en personne. Rien ne vaut une visite pour se faire une idée de nos créations !",
        keywords: ['visite boutique', 'comptoir pâtisserie', 'dégustation sur place', 'voir créations']
    }
];

const EventsFAQ: React.FC = () => {
    const [openItems, setOpenItems] = useState<number[]>([]);

    const toggleItem = (index: number) => {
        setOpenItems(prev => 
            prev.includes(index) 
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    const jsonLdFAQ = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqData.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
            }
        }))
    };

    return (
        <section className="events-faq-section">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }}
            />
            
            <div className="events-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="faq-header"
                >
                    <h2 className="section-title">Questions Fréquentes</h2>
                    <p className="section-subtitle">
                        Tout ce que vous devez savoir sur nos services événementiels
                    </p>
                </motion.div>

                <div className="faq-grid">
                    {faqData.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="faq-item"
                        >
                            <button
                                className="faq-question"
                                onClick={() => toggleItem(index)}
                                aria-expanded={openItems.includes(index)}
                            >
                                <h3>{faq.question}</h3>
                                <span className="faq-icon">
                                    {openItems.includes(index) ? <ChevronUp /> : <ChevronDown />}
                                </span>
                            </button>
                            
                            <AnimatePresence>
                                {openItems.includes(index) && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="faq-answer"
                                    >
                                        <p>{faq.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Boutons d'action contact */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="faq-contact-actions"
                >
                    <h3>Une question spécifique ? Contactez-nous directement !</h3>
                    <div className="contact-buttons">
                        <a 
                            href="https://wa.me/32472250578?text=Bonjour, je souhaiterais des informations sur vos créations événementielles" 
                            className="contact-btn whatsapp-btn"
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <MessageCircle size={18} aria-hidden />
                            WhatsApp
                        </a>
                        <a 
                            href="tel:+32472250578" 
                            className="contact-btn phone-btn"
                        >
                            <Phone size={18} aria-hidden />
                            0472 25 05 78
                        </a>
                        <a
                            href="/contact"
                            className="contact-btn contact-btn-secondary"
                        >
                            <Mail size={18} aria-hidden />
                            Formulaire
                        </a>
                    </div>
                </motion.div>

                {/* Mots-clés cachés pour le SEO */}
                <div className="seo-keywords" aria-hidden="true">
                    {faqData.flatMap(faq => faq.keywords).join(', ')}
                </div>
            </div>
        </section>
    );
};

export default EventsFAQ;
