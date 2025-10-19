import { Metadata } from 'next';
import ContactClientPage from '@/app/contact/contact-client';
import { Lusitana } from 'next/font/google';

const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Contact & Commande - 3 Boutiques Pain Pâtisserie Bruxelles : Evere, Koekelberg, Molenbeek',
  description: 'Contactez Pain Pâtisserie dans nos 3 boutiques à Bruxelles : Evere (Chaussée de Louvain 906), Koekelberg (Rue Émile Sergijsels 34), Molenbeek (Chaussée de Gand 402). Commandes gâteaux sur mesure, traiteur, WhatsApp.',
  keywords: [
    'contact pâtisserie Evere', 
    'boulangerie Koekelberg contact', 
    'pâtisserie Molenbeek commande',
    'commande gâteau 3 boutiques Bruxelles', 
    'traiteur entreprise Bruxelles', 
    'click and collect pâtisserie', 
    'Chaussée de Louvain 906',
    'Rue Émile Sergijsels 34',
    'Chaussée de Gand 402',
    'WhatsApp commande 0472 25 05 78'
  ],
  alternates: {
    canonical: 'https://www.painpatisserie.be/contact',
  },
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
