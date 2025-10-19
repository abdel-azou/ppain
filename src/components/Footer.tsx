import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, MapPin, Navigation } from 'lucide-react';
import './Footer.css';

// Ajout d'une icône TikTok personnalisée car elle n'est pas dans lucide-react
const TiktokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.52.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.88-.95-6.44-2.98-1.55-2.03-1.96-4.82-1.26-7.23.55-1.84 1.96-3.29 3.65-4.11 2.29-1.11 4.81-1.04 7.06.16-.02 1.51-.02 3.02-.01 4.53-.78-.36-1.6-.52-2.4-.5-1.06.03-2.13.25-3.09.75-1.26.64-2.26 1.7-2.65 3.01-.39 1.31-.24 2.77.43 4.01.68 1.24 1.84 2.1 3.14 2.32.66.11 1.32.1 1.98-.06.66-.16 1.29-.44 1.86-.83.57-.39 1.04-.9 1.41-1.48.37-.58.63-1.23.78-1.92.02-2.83.01-5.66.01-8.49Z" />
  </svg>
);

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const address = "Chaussée de Louvain 906, 1140 Evere";
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent(address)}`;

    return (
        <footer className="footer-wave pt-20 pb-8 text-stone-900"> {/* Ajustement de la couleur du texte */}
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-bold mb-4">Navigation</h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-2">
                            <Link href="/" className="hover:text-amber-900">Accueil</Link>
                            <Link href="/about" className="hover:text-amber-900">À Propos</Link>
                            <Link href="/gallery" className="hover:text-amber-900">Galerie</Link>
                            <Link href="/events" className="hover:text-amber-900">Événements</Link>
                            <Link href="/contact" className="hover:text-amber-900">Contact</Link>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">Nous trouver</h3>
                        <p>{address}</p>
                        <div className="flex space-x-4 mt-2">
                            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-amber-900">
                                <MapPin size={16} className="mr-1" /> Google Maps
                            </a>
                            <a href={wazeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-amber-900">
                                <Navigation size={16} className="mr-1" /> Waze
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">Suivez-nous</h3>
                        <div className="flex space-x-4">
                            <a href="https://www.facebook.com/share/16oudhygiy/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="hover:text-amber-900"><Facebook /></a>
                            <a href="https://www.instagram.com/painpatisserie?igsh=MTM4MXFwaDBtOWRjdg==" target="_blank" rel="noopener noreferrer" className="hover:text-amber-900"><Instagram /></a>
                            <a href="https://www.tiktok.com/@painpatisserie?_t=ZG-8xc5MttfGAj&_r=1" target="_blank" rel="noopener noreferrer" className="hover:text-amber-900"><TiktokIcon /></a>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-8 pt-8 border-t border-stone-500 border-opacity-30">
                    <p>&copy; {currentYear} Pâtisserie Plaisir. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
