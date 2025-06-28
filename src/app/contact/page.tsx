import { Metadata } from 'next';
import ContactClientPage from '@/app/contact/contact-client';
import { Lusitana } from 'next/font/google';

const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Contact & Commande - Pain Pâtisserie Bruxelles',
  description: 'Contactez Pain Pâtisserie pour toute commande de gâteau sur mesure, traiteur, ou brunch à Bruxelles (Evere). Utilisez notre formulaire pour nous joindre via WhatsApp.',
  keywords: [
    'contact pâtisserie Bruxelles', 
    'commande gâteau Evere', 
    'traiteur entreprise Bruxelles', 
    'brunch sur mesure', 
    'click and collect pâtisserie', 
    'formulaire de contact', 
    'WhatsApp commande'
  ],
};

export default function ContactPage() {
  return (
    <div className="bg-stone-50 text-stone-800">
      <div className="container mx-auto px-4 py-12 sm:py-16 md:py-24">
        <div className="text-center mb-12 md:mb-16">
          <h1 className={`${lusitana.className} text-4xl sm:text-5xl font-bold text-stone-900`}>Contactez-nous</h1>
          <p className="mt-4 text-base sm:text-lg text-stone-600 max-w-3xl mx-auto">Une question, une envie, un événement à organiser ? Nous sommes à votre écoute.</p>
        </div>
        <ContactClientPage />
      </div>
    </div>
  );
}
