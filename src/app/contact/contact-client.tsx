'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin } from 'lucide-react';
import ReviewsWidget from '@/components/ReviewsWidget';
import WhatsAppIcon from '@/components/WhatsAppIcon';

export default function ContactClientPage() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const phoneNumber = '32412345678'; // Remplacez par votre numéro de téléphone WhatsApp

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const whatsappMessage = `Bonjour, je suis ${name}.\n\n${message}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-start">
      <motion.div 
        className="bg-white p-6 sm:p-8 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-4">
          <span className="text-4xl" role="img" aria-label="Gâteau d'anniversaire">🎂</span>
          <span className="text-4xl mx-4" role="img" aria-label="Tada">🎉</span>
          <span className="text-4xl" role="img" aria-label="Bulle de parole">💬</span>
        </div>
        <h2 className="text-xl font-bold mb-6 text-center">Une question, une envie ?</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-stone-700 mb-2">Nom</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-stone-700 mb-2">Votre message (pour gâteau, traiteur, etc.)</label>
            <textarea
              id="message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50"
              required
            ></textarea>
          </div>
          <button 
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
          >
            <WhatsAppIcon size={20} color="white" />
            Envoyer via WhatsApp
          </button>
        </form>
      </motion.div>

      <motion.div 
        className="space-y-6 md:space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4 flex items-center"><MapPin className="mr-3 text-amber-800"/> Notre Adresse</h3>
          <p className="text-stone-700">Chaussée de Louvain 906, <br/>1140 Evere, Bruxelles</p>
          <p className="text-sm text-stone-500 mt-2">Click and collect disponible</p>
        </div>
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4 flex items-center"><Phone className="mr-3 text-amber-800"/> Téléphone</h3>
          <p className="text-stone-700">0472 25 05 78</p>
          <p className="text-sm text-stone-500 mt-2">Pour les commandes urgentes</p>
        </div>
        <ReviewsWidget />
      </motion.div>
    </div>
  );
}
