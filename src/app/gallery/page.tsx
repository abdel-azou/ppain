import type { Metadata } from 'next';
import GalleryClient from './gallery-client';
import './Gallery.css';

// --- Data (Stays on the server) ---
const galleryItems = [
    {
        id: 1,
        title: 'Nous mangeons d\'abord avec les yeux',
        description: 'Ce n\'est pas qu\'une simple vitrine, c\'est une exposition d\'œuvres d\'art éphémères qui évoque tous vos sens avant même la première bouchée.',
        longDescription: 'Notre vitrine est conçue comme une galerie d\'art où chaque pâtisserie raconte sa propre histoire. L\'élégance visuelle de nos créations est le reflet de notre engagement envers l\'excellence et l\'innovation culinaire. Chaque visite devient une expérience multisensorielle unique.',
        image: '/photos/comptoir2.jpeg',
        category: 'ambiance',
        featured: true,
        altText: 'Vitrine élégante de la pâtisserie Pain Pâtisserie avec une présentation artistique de gâteaux et viennoiseries',
        tags: ['boutique', 'vitrine', 'art culinaire', 'pâtisserie artisanale']
    },
    {
        id: 2,
        title: 'La simplicité est la sophistication suprême',
        description: 'Gâteau d\'exception pour 4-6-8 personnes, où chaque couche révèle une nouvelle harmonie de saveurs.',
        longDescription: 'Cette création emblématique associe une base croustillante à une mousse légère et aérienne. Le cœur cache un insert fruité qui apporte fraîcheur et équilibre à l\'ensemble. La finition miroir reflète notre souci du détail et notre quête de perfection esthétique.',
        image: '/photos/grandgateau.jpeg',
        category: 'gateaux',
        featured: true,
        altText: 'Gâteau élégant à plusieurs étages avec finition miroir et décoration minimaliste',
        tags: ['gâteau', 'entremets', 'dessert', 'création signature']
    },
    {
        id: 3,
        title: 'Délicatesse Matinale',
        description: 'Nos viennoiseries sélection premium, façonnées à la main chaque matin pour un petit-déjeuner d\'exception.',
        longDescription: 'Chaque viennoiserie est le fruit d\'un savoir-faire transmis de génération en génération. Notre pâte feuilletée, développée sur trois jours, offre ce feuilletage incomparable et cette texture à la fois croustillante et fondante qui fait notre renommée.',
        image: '/photos/comptoir.jpeg',
        category: 'petites-douceurs',
        featured: false,
        altText: 'Assortiment de viennoiseries artisanales fraîchement préparées exposées au comptoir',
        tags: ['viennoiserie', 'croissant', 'petit-déjeuner', 'artisanal']
    },
    {
        id: 4,
        title: 'L\'art est fait pour troubler.La science rassure.',
        description: 'Création exclusive jusqu\'à 15 personnes',
        image: '/photos/trompeoeil.jpeg',
        category: 'gateaux',
        featured: false,
        altText: 'Création pâtissière trompe-l\'œil',
        tags: ['trompe-l\'œil', 'création exclusive']
    },
    {
        id: 5,
        title: 'L\'apparence est souvent trompeuse',
        description: 'Nos trompe-l\'œil',
        image: '/photos/trompeoeil4.jpeg',
        category: 'specialites',
        featured: true,
        altText: 'Pâtisserie trompe-l\'œil artistique',
        tags: ['trompe-l\'œil', 'art culinaire']
    },
    {
        id: 6,
        title: 'La variété est le sel de la vie.',
        description: 'Un kaléidoscope gourmand',
        image: '/photos/tartellet.jpeg',
        category: 'gateaux',
        featured: true,
        altText: 'Assortiment de tartelettes colorées',
        tags: ['tartelettes', 'assortiment']
    },
    {
        id: 7,
        title: 'Le bonheur est une petite chose,si on sait la prendre',
        description: 'Création exclusive jusqu\'à 15 personnes',
        image: '/photos/cookies.jpeg',
        category: 'gateaux',
        featured: false,
        altText: 'Cookies artisanaux',
        tags: ['cookies', 'gourmandise']
    },
    {
        id: 8,
        title: 'ceci n\'est pas une noisette',
        description: 'Notre boutique, lieu d\'excellence culinaire',
        image: '/photos/trompeoielmain1.jpeg',
        category: 'ambiance',
        featured: true,
        altText: 'Trompe-l\'œil en forme de noisette',
        tags: ['trompe-l\'œil', 'boutique']
    },
    {
        id: 9,
        title: 'La vraie beauté est dans le regard de celui qui regarde',
        description: 'Nos tartes d\'exception',
        image: '/photos/tartefraise.jpeg',
        category: 'petites-douceurs',
        featured: true,
        altText: 'Tarte aux fraises fraîches',
        tags: ['tarte', 'fraise', 'pâtisserie fine']
    }
];

const categories = [
    { id: 'all', label: 'Tout voir' },
    { id: 'ambiance', label: 'Notre boutique' },
    { id: 'petites-douceurs', label: 'Viennoiseries' },
    { id: 'specialites', label: 'Trompe-l\'œil' },
    { id: 'gateaux', label: 'Gâteaux & Salées' },
];

// --- SEO Metadata (Server Component) ---
export const metadata: Metadata = {
    title: "Galerie de Créations | Pâtisserie Artisanale, Gâteaux sur Mesure, Trompe-l'œil - Evere, Bruxelles",
    description: "Découvrez la galerie de Pain Pâtisserie à Evere. Gâteaux d'exception, pièces montées, créations en trompe-l'œil, viennoiseries fines et service traiteur pour vos événements.",
    keywords: ['pâtisserie Evere', 'boulangerie Bruxelles', 'gâteau sur mesure', 'pièce montée mariage', 'gâteau trompe l\'œil', 'traiteur événementiel', 'viennoiserie artisanale', 'pâtisserie de luxe', ...new Set(galleryItems.flatMap(item => item.tags || []))].join(', '),
    openGraph: {
        title: "Galerie d'Art Culinaire | Pain Pâtisserie",
        description: "Explorez nos créations uniques, des gâteaux signature aux trompe-l'œil artistiques.",
        images: [ { url: '/photos/comptoir2.jpeg' } ]
    }
};

// --- Page Component (Server Component) ---
export default function GalleryPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Bakery',
        name: 'Pain Pâtisserie',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Chaussée de Louvain 906',
            addressLocality: 'Evere',
            postalCode: '1140',
            addressRegion: 'Bruxelles',
            addressCountry: 'BE'
        },
        telephone: '+32 XX XXX XX XX', // Remplacez par votre numéro
        image: galleryItems.map(item => `https://www.votredomaine.be${item.image}`),
        servesCuisine: 'Pâtisserie, Boulangerie, Traiteur',
        priceRange: '€€',
        description: metadata.description as string,
        url: 'https://www.votredomaine.be/gallery'
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <GalleryClient galleryItems={galleryItems} categories={categories} />
        </>
    );
}
