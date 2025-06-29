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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/80 backdrop-blur-xl border-t border-stone-200"
          >
            <nav className="flex flex-col items-center space-y-4 py-6">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={toggleMenu} className={`text-xl font-medium ${pathname === link.href ? 'text-amber-800' : 'text-amber-600'}`}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
