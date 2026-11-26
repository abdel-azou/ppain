'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, MessageCircle, Phone, Mail } from 'lucide-react';
import { faqData } from '../data/faq-data';
import './EventsFAQ.css';

const EventsFAQ: React.FC = () => {
    const [openItems, setOpenItems] = useState<number[]>([]);

    const toggleItem = (index: number) => {
        setOpenItems(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    return (
        <section className="events-faq-section">
            
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

            </div>
        </section>
    );
};

export default EventsFAQ;
