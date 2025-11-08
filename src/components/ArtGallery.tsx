'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import './ArtGallery.css';

const ArtGallery = () => {
  // Sélection premium des créations les plus spectaculaires
  const galleryImages = [
    {
      id: 1,
      src: '/photos/webp/trompeoeil-couleurchaude.webp',
      alt: 'Création trompe-l\'œil aux couleurs chaudes, prouesse technique où l\'art rencontre la pâtisserie',
      category: 'Art Culinaire'
    },
    {
      id: 2,
      src: '/photos/webp/gateau-vuegloabale.webp',
      alt: 'Vue d\'ensemble de nos créations pâtissières, symphonie de couleurs et de textures',
      category: 'Gâteaux Personnalisés'
    },
    {
      id: 3,
      src: '/photos/webp/comptoir-vueclient.webp',
      alt: 'Vue client de notre comptoir professionnel, vitrine de l\'excellence pâtissière',
      category: 'Savoir-Faire'
    },
    {
      id: 4,
      src: '/photos/webp/event-preparation2.webp',
      alt: 'Préparation artisanale de nos événements, précision et passion en action',
      category: 'Événements Sur Mesure'
    },
    {
      id: 5,
      src: '/photos/webp/gateau-fraisier.webp',
      alt: 'Fraisier traditionnel revisité, alliance parfaite entre classique et modernité',
      category: 'Tartes aux Fruits'
    },
    {
      id: 6,
      src: '/photos/webp/pain-baguette3.webp',
      alt: 'Baguettes artisanales dorées, croustillant authentique du savoir-faire français',
      category: 'Pain Artisanal'
    },
    {
      id: 7,
      src: '/photos/webp/vienoiserie-amandechoco_et_fruitrouge.webp',
      alt: 'Viennoiseries premium aux amandes, chocolat et fruits rouges, gourmandise raffinée',
      category: 'Viennoiseries Premium'
    },
    {
      id: 8,
      src: '/photos/webp/gateau-bavarois-framboise.webp',
      alt: 'Bavarois framboise artisanal, délicatesse et élégance à la française',
      category: 'Entremets Maison'
    }
  ];

  return (
    <section className="art-gallery-section">
      <div className="art-gallery-container">
        {/* En-tête de la section */}
        <motion.div 
          className="art-gallery-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="art-gallery-title">L&apos;Art de Créer des Émotions</h2>
          <p className="art-gallery-subtitle">
            Découvrez notre univers créatif où chaque création raconte une histoire, 
            où l&apos;artisanat rencontre la passion pour vous offrir des moments d&apos;exception.
          </p>
        </motion.div>

        {/* Grille artistique des photos */}
        <div className="art-gallery-grid">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              className={`gallery-item gallery-item-${index + 1}`}
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: 'easeOut'
              }}
              whileHover={{ 
                scale: 1.05,
                zIndex: 10,
                transition: { duration: 0.3 }
              }}
            >
              <div className="gallery-image-container">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className="gallery-image"
                  loading="lazy"
                />
                <div className="gallery-overlay">
                  <div className="gallery-content">
                    <span className="gallery-category">{image.category}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Citation inspirante */}
        <motion.div 
          className="art-gallery-quote"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          <blockquote>
            &ldquo;Notre boulangerie-pâtisserie artisanale crée des gâteaux personnalisés et des pâtisseries fraîches 
            qui transforment vos moments spéciaux en souvenirs inoubliables.&rdquo;
          </blockquote>
          <cite>&mdash; L&apos;équipe Pain Pâtisserie</cite>
        </motion.div>

        {/* Valeurs créatives */}
        <motion.div 
          className="creative-values"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
        >
          <div className="values-grid">
            <div className="value-item">
              <div className="value-icon">🎨</div>
              <h3>Créativité</h3>
              <p>Chaque création est une œuvre d&apos;art unique, pensée et réalisée avec passion</p>
            </div>
            <div className="value-item">
              <div className="value-icon">🏆</div>
              <h3>Excellence</h3>
              <p>Nous sélectionnons les meilleurs ingrédients pour des résultats exceptionnels</p>
            </div>
            <div className="value-item">
              <div className="value-icon">❤️</div>
              <h3>Émotion</h3>
              <p>Au-delà du goût, nous créons des moments de bonheur et de partage</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ArtGallery;
