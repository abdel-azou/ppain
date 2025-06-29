'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';
import { useScrollDirection } from '@/hooks/useScrollDirection';

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/gallery', label: 'Galerie' },
  { href: '/about', label: 'À Propos' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const scrollDirection = useScrollDirection();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <motion.header 
      variants={{
        visible: { y: 0 },
        hidden: { y: '-100%' },
      }}
      animate={scrollDirection === 'down' && !isOpen ? 'hidden' : 'visible'}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className="bg-white/70 backdrop-blur-xl sticky top-0 z-50 shadow-lg header-wave rounded-b-3xl"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="text-2xl font-bold text-amber-800">Pain Pâtisserie</Link>
          
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
            <button onClick={toggleMenu} className="text-amber-800">
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
