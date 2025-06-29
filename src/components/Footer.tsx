import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, MessageCircle, MapPin, Navigation } from 'lucide-react';
import './Footer.css';

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
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-900"><Facebook /></a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-900"><Instagram /></a>
                            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-900"><MessageCircle /></a>
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
