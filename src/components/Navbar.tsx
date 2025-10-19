'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react'; // Ajout de useEffect
import { Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image'; // Importation du composant Image
import './Navbar.css';
import { useScrollDirection } from '@/hooks/useScrollDirection';

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/gallery', label: 'Galerie' },
  { href: '/events', label: 'Événements' },
  { href: '/about', label: 'À Propos' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // Nouvel état pour le scroll
  const pathname = usePathname();
  const scrollDirection = useScrollDirection();

  useEffect(() => {
    const handleScroll = () => {
      // On considère que la page est scrollée après 10px
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    // Nettoyage de l'écouteur d'événement au démontage du composant
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const headerVariants = {
    visible: { y: 0 },
    hidden: { y: '-100%' },
  };

  // Définition des classes conditionnelles
  const headerClasses = isScrolled
    ? "bg-white/70 backdrop-blur-xl sticky top-0 z-50 shadow-lg header-wave rounded-b-3xl"
    : "relative z-50 bg-white";

  return (
    <motion.header 
      variants={headerVariants}
      animate={scrollDirection === 'down' && !isOpen && isScrolled ? 'hidden' : 'visible'}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className={headerClasses} // Utilisation des classes conditionnelles
    >
      <div className="container mx-auto px-0 sm:px-6 lg:px-8"> {/* Modification ici */}
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center z-10 pl-4 sm:pl-0"> {/* Modification ici */}
            <Image 
              src="/Logo.svg" 
              alt="Pain Pâtisserie Logo" 
              width={140} // Ajusté pour une meilleure visibilité
              height={50} 
              priority // Pour charger le logo plus rapidement
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={`text-lg font-medium transition-colors hover:text-amber-900 ${pathname === link.href ? 'text-amber-800' : 'text-amber-600'}`}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-amber-800 pr-4 sm:pr-0"> {/* Modification ici */}
              <Menu size={28} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="mobile-menu-container"
          >
            <nav className="mobile-menu-nav">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut', delay: index * 0.05 }}
                >
                  <Link 
                    href={link.href} 
                    onClick={toggleMenu} 
                    className={`mobile-menu-link ${pathname === link.href ? 'active' : ''}`}>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
