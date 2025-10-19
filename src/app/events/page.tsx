import type { Metadata } from 'next';
import EventsClient from './events-client';
import './Events.css';

// --- Data des événements ---
const eventItems = [
    {
        id: 1,
        title: 'Mariages de Rêve',
        description: 'Des gâteaux de mariage exceptionnels qui marqueront votre union pour l\'éternité.',
        longDescription: 'Chaque mariage est unique, et votre gâteau doit l\'être aussi. Nos créations sur mesure allient élégance, raffinement et saveurs sublimes. De la pièce montée traditionnelle aux créations modernes, nous donnons vie à vos rêves les plus gourmands.',
        image: '/photos/webp/event-numbercake_baguedemariage.webp',
        category: 'mariage',
        featured: true,
        altText: 'Number cake élégant avec bague de mariage pour célébrer votre union',
        tags: ['mariage', 'pièce montée', 'sur mesure', 'élégance'],
        services: ['Pièces montées', 'Gâteaux personnalisés', 'Desserts assortis', 'Service traiteur']
    },
    {
        id: 2,
        title: 'Anniversaires Inoubliables',
        description: 'Célébrez chaque année de vie avec des créations qui racontent votre histoire.',
        longDescription: 'Qu\'il s\'agisse d\'un premier anniversaire ou d\'un jubilé, nous créons des gâteaux qui capturent l\'essence de chaque moment. Personnalisation complète selon vos passions, hobbies et thèmes favoris.',
        image: '/photos/webp/event-ecriture.webp',
        category: 'anniversaire',
        featured: true,
        altText: 'Gâteau d\'anniversaire avec écriture personnalisée élégante',
        tags: ['anniversaire', 'personnalisation', 'écriture', 'fête'],
        services: ['Gâteaux thématiques', 'Écriture personnalisée', 'Décoration sur mesure', 'Formats variés']
    },
    {
        id: 3,
        title: 'Événements d\'Entreprise',
        description: 'Impressionnez vos collaborateurs et clients avec nos créations professionnelles.',
        longDescription: 'Que ce soit pour un lancement de produit, une réunion importante ou une célébration d\'entreprise, nos créations ajoutent une touche d\'excellence à vos événements professionnels.',
        image: '/photos/webp/event-preparation.webp',
        category: 'entreprise',
        featured: true,
        altText: 'Préparation professionnelle de pâtisseries pour événement d\'entreprise',
        tags: ['entreprise', 'professionnel', 'traiteur', 'événement'],
        services: ['Plateaux de mignardises', 'Gâteaux corporate', 'Service traiteur', 'Livraison']
    },
    {
        id: 4,
        title: 'Fêtes d\'Enfants',
        description: 'Des créations magiques qui transforment chaque goûter en aventure.',
        longDescription: 'Laissez-nous créer des souvenirs inoubliables pour vos petits avec des gâteaux colorés, ludiques et délicieux. Personnages favoris, thèmes d\'aventure, tout est possible !',
        image: '/photos/event-6-image-psg-enfant.jpeg',
        category: 'enfant',
        featured: true,
        altText: 'Gâteau thématique PSG pour anniversaire d\'enfant passionné de football',
        tags: ['enfant', 'thème', 'couleurs', 'personnages'],
        services: ['Gâteaux thématiques', 'Décoration ludique', 'Formats enfants', 'Animations sucrées']
    },
    {
        id: 5,
        title: 'Célébrations Spéciales',
        description: 'Baptêmes, communions, graduations... Chaque étape mérite sa création unique.',
        longDescription: 'Les moments importants de la vie méritent des créations exceptionnelles. Nous accompagnons vos célébrations religieuses et laïques avec élégance et respect des traditions.',
        image: '/photos/event-5-mariage-gateaublanc.jpeg',
        category: 'celebration',
        featured: false,
        altText: 'Élégant gâteau blanc multi-étages pour célébration spéciale',
        tags: ['baptême', 'communion', 'graduation', 'tradition'],
        services: ['Gâteaux traditionnels', 'Symboliques religieuses', 'Décoration sobre', 'Respect des traditions']
    },
    {
        id: 6,
        title: 'Réceptions Intimes',
        description: 'Pour vos moments précieux en petit comité, des créations raffinées.',
        longDescription: 'Les petites réceptions demandent une attention particulière. Nous créons des desserts qui favorisent la convivialité tout en conservant notre exigence de qualité.',
        image: '/photos/webp/event-deco2.webp',
        category: 'reception',
        featured: false,
        altText: 'Décoration élégante pour réception intime avec touches artistiques',
        tags: ['intime', 'raffinement', 'convivialité', 'qualité'],
        services: ['Portions individuelles', 'Présentation soignée', 'Variété de saveurs', 'Service personnalisé']
    },
    {
        id: 7,
        title: 'Événements Saisonniers',
        description: 'Noël, Pâques, Saint-Valentin... Chaque saison a ses saveurs.',
        longDescription: 'Nous célébrons les saisons avec des créations thématiques qui capturent l\'esprit de chaque période de l\'année. Ingrédients de saison et décorations festives.',
        image: '/photos/event-3-deco-ocean-bleu.jpeg',
        category: 'saison',
        featured: false,
        altText: 'Décoration thématique océan en bleu pour événement saisonnier',
        tags: ['saisons', 'thématique', 'festif', 'tradition'],
        services: ['Créations saisonnières', 'Thèmes festifs', 'Ingrédients de saison', 'Décorations temporaires']
    },
    {
        id: 8,
        title: 'Buffets Sucrés',
        description: 'Des tables gourmandes complètes pour vos grandes réceptions.',
        longDescription: 'Créez l\'émerveillement avec nos buffets sucrés complets : gâteaux, mignardises, chocolats et confiseries artisanales. Une expérience gustative complète pour vos invités.',
        image: '/photos/webp/event-minipizza.webp',
        category: 'buffet',
        featured: true,
        altText: 'Variété de mini-créations salées et sucrées pour buffet d\'événement',
        tags: ['buffet', 'variété', 'mignardises', 'expérience'],
        services: ['Buffets complets', 'Mignardises variées', 'Présentation théâtralisée', 'Service continu']
    },
    {
        id: 9,
        title: 'Gâteau de Mariage Traditionnel',
        description: 'Pièce montée classique à trois étages pour votre jour J.',
        longDescription: 'Notre pièce montée traditionnelle à trois étages respecte les codes du mariage français. Décoration florale délicate et saveurs personnalisables selon vos goûts.',
        image: '/photos/event-1piecemonte3etages.jpeg',
        category: 'mariage',
        featured: true,
        altText: 'Pièce montée traditionnelle à trois étages pour mariage',
        tags: ['pièce montée', 'tradition', 'trois étages', 'classique'],
        services: ['Pièce montée classique', 'Décoration florale', 'Saveurs personnalisées', 'Montage sur site']
    },
    {
        id: 10,
        title: 'Layer Cake Moderne',
        description: 'Gâteau de mariage contemporain avec finition élégante.',
        longDescription: 'Pour les couples qui préfèrent un style moderne, notre layer cake combine tendance contemporaine et saveurs raffinées. Décoration minimaliste et chic.',
        image: '/photos/event-5-layercake.jpeg',
        category: 'mariage',
        featured: false,
        altText: 'Layer cake moderne pour mariage avec décoration contemporaine',
        tags: ['layer cake', 'moderne', 'contemporain', 'élégant'],
        services: ['Design moderne', 'Décoration minimaliste', 'Saveurs raffinées', 'Style personnalisé']
    },
    {
        id: 11,
        title: 'Création Mariage Sur Mesure',
        description: 'Gâteau unique conçu spécialement pour votre histoire d\'amour.',
        longDescription: 'Chaque couple a son histoire unique. Nous créons un gâteau qui vous ressemble, avec des éléments personnalisés qui racontent votre parcours amoureux.',
        image: '/photos/grandgat4.jpeg',
        category: 'mariage',
        featured: true,
        altText: 'Gâteau de mariage personnalisé et unique',
        tags: ['sur mesure', 'personnalisé', 'unique', 'histoire'],
        services: ['Conception personnalisée', 'Éléments uniques', 'Consultation approfondie', 'Création exclusive']
    },
    {
        id: 12,
        title: 'Gâteau Blanc Élégant',
        description: 'La pureté et l\'élégance réunies dans un gâteau intemporel.',
        longDescription: 'Le blanc symbolise la pureté de votre union. Ce gâteau multi-étages combine raffinement et simplicité pour un rendu absolument élégant.',
        image: '/photos/event-8-layercale-decovertetblanc.jpeg',
        category: 'mariage',
        featured: false,
        altText: 'Layer cake blanc élégant avec décoration verte subtile',
        tags: ['blanc', 'pureté', 'élégant', 'intemporel'],
        services: ['Décoration blanche', 'Multi-étages', 'Finition délicate', 'Style classique']
    },
    {
        id: 13,
        title: 'Grand Gâteau Signature',
        description: 'Imposant gâteau de mariage pour grandes réceptions.',
        longDescription: 'Pour les grandes célébrations, notre gâteau signature impressionne par sa taille et sa beauté. Capable de satisfaire de nombreux invités tout en restant spectaculaire.',
        image: '/photos/grandgat6.jpeg',
        category: 'mariage',
        featured: true,
        altText: 'Grand gâteau de mariage pour nombreux invités',
        tags: ['grand format', 'signature', 'spectaculaire', 'nombreux invités'],
        services: ['Grande capacité', 'Design impressionnant', 'Saveurs multiples', 'Présentation théâtrale']
    },
    {
        id: 14,
        title: 'Gâteau Fraisier Élégant',
        description: 'Le classique français revisité pour vos célébrations.',
        longDescription: 'Notre fraisier, symbole de la pâtisserie française, se pare de ses plus beaux atours pour vos événements. Fraises fraîches et crème légère dans un écrin de génoise.',
        image: '/photos/webp/gateau-fraisier.webp',
        category: 'celebration',
        featured: true,
        altText: 'Fraisier élégant avec fraises fraîches pour célébration',
        tags: ['fraisier', 'français', 'fraises fraîches', 'classique'],
        services: ['Fraisier traditionnel', 'Fraises de saison', 'Crème légère', 'Présentation soignée']
    },
    {
        id: 15,
        title: 'Entremet Sophistiqué',
        description: 'Créations modernes pour événements raffinés.',
        longDescription: 'Nos entremets allient technique moderne et saveurs innovantes. Parfaits pour les événements qui demandent une touche de sophistication culinaire.',
        image: '/photos/webp/gateau-entremet.webp',
        category: 'entreprise',
        featured: true,
        altText: 'Entremet moderne et sophistiqué pour événement professionnel',
        tags: ['entremet', 'moderne', 'sophistiqué', 'innovation'],
        services: ['Technique moderne', 'Saveurs innovantes', 'Présentation raffinée', 'Portions individuelles']
    },
    {
        id: 17,
        title: 'Entremets Signature pour Célébrations',
        description: 'Nos créations phares : praline, monte-cristo et forêt noire revisités.',
        longDescription: 'Pour vos célébrations les plus importantes, découvrez nos entremets signature. Chaque création allie tradition française et techniques contemporaines pour une expérience gustative inoubliable.',
        image: '/photos/webp/entremet-paraline_montecristo_foretnoire.webp',
        category: 'celebration',
        featured: true,
        altText: 'Trio d\'entremets signature : praline, monte-cristo et forêt noire pour célébrations exceptionnelles',
        tags: ['entremet signature', 'praline', 'monte-cristo', 'forêt noire', 'tradition'],
        services: ['Entremets traditionnels', 'Techniques contemporaines', 'Saveurs signature', 'Présentation élégante']
    },
    {
        id: 16,
        title: 'Gâteau Trois Chocolats',
        description: 'L\'indulgence ultime pour les amateurs de chocolat.',
        longDescription: 'Trois variétés de chocolat dans une harmonie parfaite. Ce gâteau ravira les plus gourmands lors de vos anniversaires et célébrations chocolatées.',
        image: '/photos/webp/gateau_gateau3choclat.webp',
        category: 'anniversaire',
        featured: true,
        altText: 'Gâteau aux trois chocolats pour anniversaire gourmand',
        tags: ['trois chocolats', 'gourmand', 'indulgent', 'chocolaté'],
        services: ['Trois variétés chocolat', 'Harmonie parfaite', 'Texture riche', 'Dégustation intense']
    }
];

// --- Images d'événements réalisés pour le carrousel ---
const realizedEvents = [
    {
        id: 1,
        image: '/photos/webp/event-numbercake_baguedemariage.webp',
        title: 'Mariage Élégant',
        description: 'Number cake personnalisé avec bague de mariage'
    },
    {
        id: 2,
        image: '/photos/event-1piecemonte3etages.jpeg',
        title: 'Pièce Montée Traditionnelle',
        description: 'Gâteau de mariage à 3 étages classique'
    },
    {
        id: 3,
        image: '/photos/event-2-mariageN&L.jpeg',
        title: 'Mariage N&L',
        description: 'Création personnalisée pour Nicolas et Laura'
    },
    {
        id: 4,
        image: '/photos/event-4-gateaumariage-peicemonte3etage.jpeg',
        title: 'Pièce Montée Premium',
        description: 'Gâteau de mariage à 3 étages avec décoration florale'
    },
    {
        id: 5,
        image: '/photos/event-5-mariage-gateaublanc.jpeg',
        title: 'Élégance en Blanc',
        description: 'Gâteau de mariage blanc multi-étages raffiné'
    },
    {
        id: 6,
        image: '/photos/event-5-layercake.jpeg',
        title: 'Layer Cake Moderne',
        description: 'Gâteau moderne à étages avec décoration contemporaine'
    },
    {
        id: 7,
        image: '/photos/event-6-image-psg-enfant.jpeg',
        title: 'Anniversaire Thème PSG',
        description: 'Gâteau d\'anniversaire pour jeune supporter parisien'
    },
    {
        id: 8,
        image: '/photos/event-7-numbercake-forme3.jpeg',
        title: 'Number Cake Créatif',
        description: 'Number cake en forme de chiffre avec décoration'
    },
    {
        id: 9,
        image: '/photos/event-8-layercale-decovertetblanc.jpeg',
        title: 'Layer Cake Déco Verte',
        description: 'Layer cake avec décoration verte et blanche'
    },
    {
        id: 10,
        image: '/photos/event-9-decomauveavecpapillon.jpeg',
        title: 'Décoration Papillons',
        description: 'Gâteau décoré avec thème papillons colorés'
    },
    {
        id: 11,
        image: '/photos/event-3-deco-ocean-bleu.jpeg',
        title: 'Thème Océan',
        description: 'Décoration événementielle sur le thème de l\'océan'
    },
    {
        id: 12,
        image: '/photos/event-layercake-couleurbleufonceorange.jpeg',
        title: 'Layer Cake Bleu Orange',
        description: 'Création colorée bleu foncé et orange'
    },
    {
        id: 13,
        image: '/photos/webp/event-preparation.webp',
        title: 'Préparation Professionnelle',
        description: 'Nos équipes en action pour vos événements'
    },
    {
        id: 14,
        image: '/photos/webp/event-preparation2.webp',
        title: 'Service Traiteur',
        description: 'Préparation soignée pour buffets d\'événements'
    },
    {
        id: 15,
        image: '/photos/webp/event-minipizza.webp',
        title: 'Buffet Varié',
        description: 'Mini-pizzas et amuse-bouches pour réceptions'
    },
    {
        id: 16,
        image: '/photos/webp/event-salee.webp',
        title: 'Créations Salées',
        description: 'Gamme salée pour vos événements d\'entreprise'
    },
    {
        id: 17,
        image: '/photos/webp/event-ecriture.webp',
        title: 'Écriture Personnalisée',
        description: 'Messages personnalisés sur vos gâteaux'
    },
    {
        id: 18,
        image: '/photos/webp/event-ecrituregateau.webp',
        title: 'Calligraphie sur Gâteau',
        description: 'Art de l\'écriture sur pâtisserie'
    },
    {
        id: 19,
        image: '/photos/webp/event-deco2.webp',
        title: 'Décoration Artistique',
        description: 'Éléments décoratifs pour événements intimes'
    },
    {
        id: 20,
        image: '/photos/webp/event-deco3.webp',
        title: 'Ambiance Festive',
        description: 'Création d\'ambiance pour vos célébrations'
    }
];

const eventCategories = [
    { id: 'all', label: 'Tous les événements', icon: '✨' },
    { id: 'mariage', label: 'Mariages', icon: '💍' },
    { id: 'anniversaire', label: 'Anniversaires', icon: '🎂' },
    { id: 'entreprise', label: 'Entreprise', icon: '🏢' },
    { id: 'enfant', label: 'Fêtes d\'enfants', icon: '🎈' },
    { id: 'celebration', label: 'Célébrations', icon: '🎊' },
    { id: 'reception', label: 'Réceptions', icon: '🥂' },
    { id: 'saison', label: 'Saisonniers', icon: '🎪' },
    { id: 'buffet', label: 'Buffets', icon: '🍽️' }
];

const services = [
    {
        id: 1,
        title: 'Consultation Personnalisée',
        description: 'Nos collaborateurs vendeurs vous accompagnent pour définir ensemble votre projet. En magasin, par téléphone ou via WhatsApp.',
        icon: '💭',
        features: ['Consultation en magasin', 'Conseils par téléphone', 'Échanges via WhatsApp', 'Devis personnalisé']
    },
    {
        id: 2,
        title: 'Création Sur Mesure',
        description: 'Chaque création est unique. Nos pâtissiers donnent vie à vos idées avec notre savoir-faire artisanal et notre créativité.',
        icon: '🎨',
        features: ['Design personnalisé', 'Saveurs au choix', 'Décoration unique', 'Respect de vos goûts']
    },
    {
        id: 3,
        title: 'Service Traiteur',
        description: 'Au-delà du gâteau principal, nous proposons un service complet : mignardises, buffets sucrés et salés pour une expérience gustative complète.',
        icon: '🍽️',
        features: ['Buffets complets', 'Mignardises assorties', 'Plateaux variés', 'Présentation soignée']
    },
    {
        id: 4,
        title: 'Retrait en Magasin',
        description: 'Venez récupérer vos créations directement en boutique. Nos équipes s\'occupent de l\'emballage soigné et vous donnent tous les conseils.',
        icon: '🏪',
        features: ['Retrait en boutique', 'Emballage soigné', 'Conseils de transport', 'Flexibilité horaires']
    }
];

// --- SEO Metadata ---
export const metadata: Metadata = {
    title: "Événements Sur Mesure | Mariage, Anniversaire, Entreprise - Boulangerie Pâtisserie Evere Bruxelles",
    description: "Créations événementielles exceptionnelles à Evere : gâteaux de mariage sur mesure, pièces montées, anniversaires personnalisés, buffets d'entreprise. Service traiteur complet avec mignardises, mini-pâtisseries et restauration salée artisanale.",
    keywords: [
        'gâteau mariage sur mesure Evere', 'pièce montée tradition Bruxelles', 'gâteau anniversaire personnalisé Evere', 
        'traiteur événement Bruxelles', 'buffet sucré salé Evere', 'gâteau entreprise artisanal',
        'fête enfant pâtisserie Evere', 'service traiteur mariage Bruxelles', 'mignardises événement',
        'consultation pâtissier Evere', 'créations événementielles Bruxelles', 'mini-pâtisseries réception',
        'buffet entreprise Evere', 'number cake personnalisé', 'layer cake moderne', 'trompe-oeil événement'
    ].join(', '),
    openGraph: {
        title: "Événements Sur Mesure | Boulangerie Pâtisserie Artisanale Evere",
        description: "Créations exceptionnelles pour tous vos événements : mariages, anniversaires, entreprise. Gâteaux sur mesure, service traiteur et mignardises raffinées.",
        images: [{ url: '/photos/webp/event-numbercake_baguedemariage.webp' }]
    }
};

// --- Page Component ---
export default function EventsPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Événements et Célébrations - Pain Pâtisserie',
        provider: {
            '@type': 'Bakery',
            name: 'Pain Pâtisserie',
            address: {
                '@type': 'PostalAddress',
                streetAddress: 'Chaussée de Louvain 906',
                addressLocality: 'Evere',
                postalCode: '1140',
                addressRegion: 'Bruxelles',
                addressCountry: 'BE'
            }
        },
        description: metadata.description,
        serviceType: ['Gâteaux de mariage', 'Pâtisseries événementielles', 'Service traiteur', 'Création sur mesure'],
        areaServed: 'Bruxelles',
        url: 'https://www.votredomaine.be/events'
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <EventsClient 
                eventItems={eventItems} 
                categories={eventCategories}
                services={services}
                realizedEvents={realizedEvents}
            />
        </>
    );
}
