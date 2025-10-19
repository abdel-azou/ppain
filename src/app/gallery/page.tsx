import type { Metadata } from 'next';
import GalleryClient from './gallery-client';
import './Gallery.css';

// --- Data (Stays on the server) ---
const galleryItems = [
    {
        id: 1,
        title: 'On mange d\'abord avec les yeux, puis avec le cœur',
        description: 'Notre vitrine n\'est pas qu\'un étalage, c\'est un théâtre où chaque pâtisserie joue son rôle dans votre bonheur quotidien.',
        longDescription: 'Comme le disait mon grand-père pâtissier : "Un gâteau sans âme, c\'est comme un rire sans joie." Ici, chaque création raconte une histoire, celle de mains expertes qui transforment de simples ingrédients en petits bonheurs sucrés.',
        image: '/photos/webp/vitrine.webp',
        category: 'ambiance',
        featured: true,
        altText: 'Notre vitrine-théâtre où chaque pâtisserie joue son rôle dans votre bonheur quotidien, une symphonie visuelle de douceurs artisanales',
        tags: ['boutique', 'vitrine', 'art culinaire', 'pâtisserie artisanale']
    },
    {
        id: 16,
        title: 'Le pain, c\'est la poésie du quotidien qui se lève avec l\'aube',
        description: 'Nos baguettes tradition, pétries avant l\'aurore par des mains qui connaissent la musique de la farine.',
        longDescription: 'Chaque baguette porte en elle l\'âme de la France boulangère. Croustillante dehors, moelleuse dedans, elle accompagne vos repas comme un vieil ami fidèle qui ne vous décevra jamais.',
        image: '/photos/webp/pain-baguette2.webp',
        category: 'pain-boulangerie',
        featured: true,
        altText: 'Baguettes tradition dorées, poésie quotidienne pétrie avant l\'aurore, croustillantes dehors et moelleuses dedans comme l\'âme de la France',
        tags: ['pain', 'baguette', 'tradition française', 'boulangerie artisanale', 'quotidien']
    },
    {
        id: 17,
        title: 'Harcha, Baghrir, Msemen : voyages gourmands du petit-déjeuner',
        description: 'Nos spécialités du Maghreb réchauffent les matins bruxellois d\'une tendresse millénaire.',
        longDescription: 'Entre tradition berbère et savoir-faire artisanal, ces délices du matin racontent l\'histoire de deux rives qui se rejoignent dans l\'assiette. Un petit-déjeuner qui sent bon les épices et la convivialité.',
        image: '/photos/webp/pain-tartine.webp',
        category: 'petit-dejeuner',
        featured: true,
        altText: 'Spécialités traditionnelles du Maghreb, voyage gourmand matinal où se rencontrent tradition berbère et savoir-faire bruxellois',
        tags: ['harcha', 'baghrir', 'msemen', 'petit-déjeuner', 'tradition maghreb', 'convivialité']
    },
    {
        id: 18,
        title: 'Mini-pizzas : quand l\'Italie flirte avec la Belgique',
        description: 'Nos mini-pizzas maison, c\'est l\'apéritif qui transforme chaque moment en petite fête italienne.',
        longDescription: 'Sur une pâte croustillante comme un rire d\'enfant, nos garnitures généreuses racontent l\'histoire d\'une amitié culinaire entre le Nord et le Sud. Parce que la convivialité n\'a pas de frontières.',
        image: '/photos/webp/event-minipizza.webp',
        category: 'restauration-salee',
        featured: true,
        altText: 'Mini-pizzas maison croustillantes, amitié culinaire italo-belge où chaque bouchée transforme l\'apéritif en petite fête méditerranéenne',
        tags: ['mini-pizza', 'apéritif', 'restauration salée', 'convivialité', 'fait maison']
    },
    {
        id: 19,
        title: 'Sandwichs authentiques : l\'art de bien garnir sa journée',
        description: 'Nos sandwichs généreux, c\'est le déjeuner qui vous réconcilie avec les vrais goûts.',
        longDescription: 'Sur du pain frais de nos fours, des ingrédients choisis avec la passion du bien-manger. Chaque sandwich raconte une histoire de saveurs où tradition et modernité se donnent rendez-vous.',
        image: '/photos/webp/sandwich.webp',
        category: 'restauration-salee',
        featured: true,
        altText: 'Sandwichs authentiques généreux sur pain frais maison, réconciliation avec les vrais goûts où tradition et modernité se rencontrent',
        tags: ['sandwich', 'pain frais', 'déjeuner', 'fait maison', 'ingrédients choisis']
    },
    {
        id: 2,
        title: 'La beauté, c\'est l\'éternité qui se regarde dans un miroir',
        description: 'Ce gâteau capture l\'instant parfait où l\'art rencontre la gourmandise. Pour 4 à 8 personnes qui savent apprécier les belles choses.',
        longDescription: 'Inspiré par les reflets dorés du soleil sur les toits de Paris, ce gâteau marie la technique française à l\'audace contemporaine. Chaque couche révèle un secret, comme ces petites histoires qu\'on se raconte entre amis.',
        image: '/photos/webp/gateau-comptoir2.webp',
        category: 'gateaux',
        featured: true,
        altText: 'Reflets dorés d\'un gâteau-miroir, où l\'éternité se contemple dans une création pâtissière aux lignes pures et élégantes',
        tags: ['gâteau', 'entremets', 'dessert', 'création signature']
    },
    {
        id: 3,
        title: 'Le matin appartient à ceux qui se lèvent tôt... et qui aiment les croissants',
        description: 'Nos viennoiseries, c\'est comme un bon spectacle : ça commence fort dès l\'ouverture du rideau.',
        longDescription: 'Façonnées avant l\'aube par des mains qui connaissent la musique de la pâte, nos viennoiseries sont le premier sourire de votre journée. Parce qu\'un croissant raté, c\'est comme une blague sans chute.',
        image: '/photos/webp/vienoiserie-croissant.webp',
        category: 'petites-douceurs',
        featured: false,
        altText: 'Croissants dorés comme un lever de soleil parisien, premiers sourires croustillants de votre journée, façonnés par des mains expertes avant l\'aube',
        tags: ['viennoiserie', 'croissant', 'petit-déjeuner', 'artisanal']
    },
    {
        id: 4,
        title: 'L\'art ne reproduit pas le visible, il rend visible',
        description: 'Nos trompe-l\'œil transforment l\'impossible en délicieux. Parce que surprendre, c\'est notre métier.',
        longDescription: 'Comme un magicien qui révèle son tour en gardant le mystère, nos trompe-l\'œil jouent avec vos sens. On dit souvent que "c\'est trop beau pour être mangé". Nous, on préfère dire que "c\'est trop bon pour ne pas l\'être".',
        image: '/photos/webp/trompeoeil-boite.webp',
        category: 'gateaux',
        featured: false,
        altText: 'Trompe-l\'œil magique transformant l\'impossible en délicieux, une boîte qui cache des trésors sucrés plutôt que des bijoux',
        tags: ['trompe-l\'œil', 'boîte', 'création exclusive']
    },
    {
        id: 5,
        title: 'La poésie, c\'est ce qui se perd dans la traduction... sauf en pâtisserie',
        description: 'Nos créations parlent toutes les langues : celle du plaisir, de la surprise et de la gourmandise.',
        longDescription: 'Entre tradition et innovation, nos pâtissiers écrivent des poèmes sucrés. Chaque bouchée est une strophe, chaque saveur une métaphore. Victor Hugo aurait dit : "Il n\'y a qu\'un bonheur dans la vie, c\'est d\'aimer et d\'être aimé... et de bien manger".',
        image: '/photos/webp/trompeOeil-mangue_pistache_framboise_amande_myrtille.webp',
        category: 'specialites',
        featured: true,
        altText: 'Poème sucré aux cinq saveurs du monde : mangue tropicale, pistache méditerranéenne, framboise française, amande douce et myrtille sauvage',
        tags: ['trompe-l\'œil', 'mangue', 'pistache', 'framboise', 'amande', 'myrtille']
    },
    {
        id: 6,
        title: 'Un arc-en-ciel de saveurs dans un monde de gris',
        description: 'Nos tartelettes, c\'est comme une palette de peintre : chaque couleur a son caractère, ensemble elles créent l\'harmonie.',
        longDescription: 'Picasso disait que tout enfant est un artiste. Nos tartelettes réveillent cet enfant en vous, celui qui croit encore à la magie des couleurs et au bonheur simple d\'une première bouchée.',
        image: '/photos/webp/gateau-tartellete.webp',
        category: 'gateaux',
        featured: true,
        altText: 'Arc-en-ciel gourmand de tartelettes, palette de peintre où chaque couleur révèle un secret de saveur, symphonie visuelle de petits bonheurs',
        tags: ['tartelettes', 'assortiment', 'variété']
    },
    {
        id: 7,
        title: 'Le bonheur se partage... surtout quand c\'est des cookies',
        description: 'Nos cookies, c\'est comme les bons amis : on ne s\'en lasse jamais et ils nous consolent dans les moments difficiles.',
        longDescription: 'Faits avec l\'amour des grands-mères et la précision des grands chefs, nos cookies racontent des histoires d\'enfance. Parce qu\'un cookie, c\'est un câlin qui se croque.',
        image: '/photos/webp/cookies-noisettechoco_framboise_pistache.webp',
        category: 'gateaux',
        featured: false,
        altText: 'Cookies-câlins croustillants, petits bonheurs ronds aux saveurs d\'enfance : noisette, chocolat, framboise et pistache, consolation sucrée qui se croque',
        tags: ['cookies', 'noisette', 'chocolat', 'framboise', 'pistache']
    },
    {
        id: 8,
        title: 'Ceci n\'est pas une cacahuète... c\'est bien mieux',
        description: 'Hommage à Magritte et à l\'art de tromper l\'œil. Ici, l\'illusion nourrit autant que la réalité.',
        longDescription: 'Dans notre boutique, les apparences sont vraiment trompeuses. Cette "cacahuète" cache en réalité un univers de saveurs. C\'est notre façon de vous dire que la vie est pleine de belles surprises.',
        image: '/photos/webp/trompeoeil_cacahuete.webp',
        category: 'ambiance',
        featured: true,
        altText: 'Ceci n\'est pas une cacahuète mais bien mieux : hommage à Magritte gourmand, illusion délicieuse qui cache un univers de saveurs inattendues',
        tags: ['trompe-l\'œil', 'cacahuète', 'boutique']
    },
    {
        id: 9,
        title: 'La beauté sauvera le monde... en commençant par vos papilles',
        description: 'Nos tartes aux fruits, c\'est la nature qui se fait belle pour vous séduire.',
        longDescription: 'Chaque tarte est un petit bout de campagne française posé délicatement sur votre table. Les fraises y dansent comme dans un tableau impressionniste, nous rappelant que le bonheur, parfois, tient dans une simple bouchée.',
        image: '/photos/webp/tarte-tartefraise.webp',
        category: 'petites-douceurs',
        featured: true,
        altText: 'Tarte aux fraises, petit bout de campagne française posé sur votre table, où les fruits dansent comme dans un tableau impressionniste',
        tags: ['tarte', 'fraise', 'pâtisserie fine']
    },
    {
        id: 10,
        title: 'Le pain, c\'est l\'âme de la France qui se réveille chaque matin',
        description: 'Nos baguettes croustillantes perpétuent une tradition séculaire. Parce que certaines choses ne se démodent jamais.',
        longDescription: 'Depuis l\'aube, nos boulangers orchestrent cette symphonie quotidienne. Chaque baguette porte en elle l\'héritage de générations de savoir-faire. C\'est notre façon de dire "bonjour" à la France.',
        image: '/photos/webp/pain-baguette.webp',
        category: 'petites-douceurs',
        featured: true,
        altText: 'Baguettes dorées, âme de la France qui se réveille chaque matin, symphonie croustillante d\'un héritage boulanger transmis de génération en génération',
        tags: ['pain', 'baguette', 'artisanal', 'tradition']
    },
    {
        id: 11,
        title: 'Quand l\'illusion flirte avec la perfection',
        description: 'Ce trompe-l\'œil aux fruits exotiques, c\'est notre voyage imaginaire vers des saveurs d\'ailleurs.',
        longDescription: 'Les fruits de la passion nous emmènent aux Antilles, la cacahuète nous rappelle l\'Afrique, l\'amande nous chuchote la Méditerranée. Un seul gâteau, trois continents de saveurs.',
        image: '/photos/webp/trompeoeil-fruitdelapassion_cacahuette_amande.webp',
        category: 'specialites',
        featured: true,
        altText: 'Illusion parfaite aux fruits exotiques, voyage imaginaire où la passion antillaise flirte avec la cacahuète africaine et l\'amande méditerranéenne',
        tags: ['trompe-l\'œil', 'fruits de la passion', 'cacahuète', 'amande']
    },
    {
        id: 12,
        title: 'L\'élégance, c\'est dans les détails... et dans les mignardises',
        description: 'Pour vos grands moments, nos petites pâtisseries. Parce que les plus belles choses viennent en petit format.',
        longDescription: 'Comme des bijoux comestibles, nos mignardises transforment chaque événement en moment précieux. Elles prouvent que la grandeur d\'âme peut tenir dans un petit four.',
        image: '/photos/webp/mignardise-minipatisserie.webp',
        category: 'petites-douceurs',
        featured: false,
        altText: 'Mignardises précieuses comme des bijoux comestibles, petites merveilles qui transforment chaque événement en moment d\'exception raffinée',
        tags: ['mignardises', 'mini-pâtisseries', 'événement', 'raffinement']
    },
    {
        id: 13,
        title: 'Le fraisier, c\'est la France en robe rouge',
        description: 'Notre fraisier traditionnel, c\'est l\'élégance française qui se déguise en dessert.',
        longDescription: 'Derrière cette apparente simplicité se cache un savoir-faire d\'orfèvre. Chaque fraise est choisie comme un diamant, chaque couche montée comme une œuvre d\'art. Le fraisier, c\'est notre Marseillaise sucrée.',
        image: '/photos/webp/gateau-fraisier.webp',
        category: 'gateaux',
        featured: true,
        altText: 'Fraisier en robe rouge, élégance française déguisée en dessert, où chaque fraise est choisie comme un diamant pour notre Marseillaise sucrée',
        tags: ['fraisier', 'français', 'tradition', 'fraises']
    },
    {
        id: 14,
        title: 'Notre écrin de douceurs quotidiennes',
        description: 'Cette vitrine, c\'est notre façon de vous dire "bonjour" chaque matin avec le sourire.',
        longDescription: 'Derrière cette vitre se cache notre passion quotidienne. Chaque gâteau y trouve sa place comme un acteur sur scène, prêt à jouer son rôle dans votre bonheur.',
        image: '/photos/webp/vitrine2.webp',
        category: 'ambiance',
        featured: true,
        altText: 'Écrin de douceurs quotidiennes, notre façon de vous dire bonjour chaque matin, théâtre sucré où chaque création attend son moment de gloire',
        tags: ['vitrine', 'boutique', 'présentation', 'quotidien']
    },
    {
        id: 15,
        title: 'L\'art de transformer l\'ordinaire en extraordinaire',
        description: 'Nos entremets, c\'est la preuve que la magie existe... et qu\'elle a bon goût.',
        longDescription: 'Entre praline, monte-cristo et forêt noire, nos entremets racontent l\'histoire de la pâtisserie française. Chacun d\'eux est un chapitre de cette belle aventure gustative que nous vous invitons à découvrir.',
        image: '/photos/webp/entremet-paraline_montecristo_foretnoire.webp',
        category: 'entremets',
        featured: true,
        altText: 'Trio d\'entremets légendaires : praline dorée, monte-cristo mystérieux et forêt noire romantique, chapitres délicieux de l\'histoire pâtissière française',
        tags: ['entremets', 'praline', 'monte-cristo', 'forêt noire']
    },
    {
        id: 20,
        title: 'Pain au levain : le temps retrouvé dans chaque bouchée',
        description: 'Notre pain au levain, c\'est la patience qui se transforme en saveur, la tradition qui se perpétue.',
        longDescription: 'Comme nos ancêtres boulangers, nous laissons le temps faire son œuvre. Chaque pain au levain porte en lui la sagesse des fermentations lentes et l\'amour du travail bien fait.',
        image: '/photos/webp/pain-pain_au_levain.webp',
        category: 'pain-boulangerie',
        featured: true,
        altText: 'Pain au levain artisanal, patience transformée en saveur où le temps retrouvé révèle la sagesse des fermentations ancestrales',
        tags: ['pain au levain', 'fermentation naturelle', 'tradition ancestrale', 'boulangerie artisanale']
    },
    {
        id: 21,
        title: 'Baguettes aux olives : quand la Méditerranée embrasse la France',
        description: 'Nos baguettes aux olives, c\'est le soleil du Sud qui réchauffe le cœur du Nord.',
        longDescription: 'Sur la base de notre pâte traditionnelle, les olives vertes apportent cette petite note méditerranéenne qui transforme le quotidien en escapade ensoleillée. Un voyage gustatif sans quitter Evere.',
        image: '/photos/webp/pain-baguetteOlives.webp',
        category: 'pain-boulangerie',
        featured: false,
        altText: 'Baguettes aux olives méditerranéennes, soleil du Sud réchauffant le cœur du Nord, escapade ensoleillée dans chaque bouchée',
        tags: ['baguette aux olives', 'méditerranéen', 'olives vertes', 'spécialité pain']
    },
    {
        id: 22,
        title: 'Couques au chocolat : l\'enfance retrouvée en un clin d\'œil',
        description: 'Nos couques au chocolat, c\'est le goûter de 16h qui nous ramène aux sourires d\'antan.',
        longDescription: 'Moelleuses comme un câlin de grand-mère, chocolatées comme un rire d\'enfant, nos couques réveillent en vous ce petit bonheur simple qui fait que la vie vaut d\'être croquée.',
        image: '/photos/webp/vienoiserie-couqueschocolat.webp',
        category: 'petit-dejeuner',
        featured: true,
        altText: 'Couques au chocolat moelleuses, goûter de 16h qui ramène aux sourires d\'antan, câlin de grand-mère chocolaté',
        tags: ['couque chocolat', 'goûter', 'enfance', 'moelleux', 'tradition belge']
    },
    {
        id: 23,
        title: 'Viennoiseries aux amandes et fruits rouges : l\'alliance parfaite',
        description: 'Quand la douceur des amandes danse avec l\'acidulé des fruits rouges, c\'est la symphonie du petit-déjeuner.',
        longDescription: 'Nos pâtissiers ont trouvé l\'équilibre parfait : la richesse de l\'amande qui caresse, la vivacité du fruit rouge qui réveille. Un mariage réussi dans votre assiette matinale.',
        image: '/photos/webp/vienoiserie-amandechoco_et_fruitrouge.webp',
        category: 'petit-dejeuner',
        featured: false,
        altText: 'Viennoiseries aux amandes et fruits rouges, symphonie matinale où douceur et acidulé dansent ensemble dans l\'harmonie parfaite',
        tags: ['viennoiserie', 'amande', 'fruits rouges', 'petit-déjeuner', 'équilibre saveurs']
    },
    {
        id: 24,
        title: 'Pastilla au poulet : voyage express vers les saveurs d\'Orient',
        description: 'Notre pastilla au poulet, c\'est le Maroc qui s\'invite dans votre assiette bruxelloise.',
        longDescription: 'Entre pâte feuilletée croustillante et farce parfumée aux épices orientales, cette spécialité raconte l\'histoire d\'une gastronomie millénaire qui traverse les frontières pour vous séduire.',
        image: '/photos/webp/pastila-poulet.webp',
        category: 'restauration-salee',
        featured: true,
        altText: 'Pastilla au poulet orientale, voyage express vers les saveurs du Maroc, pâte croustillante aux épices millénaires qui traverse les frontières',
        tags: ['pastilla', 'poulet', 'épices orientales', 'Maroc', 'pâte feuilletée', 'spécialité']
    },
    {
        id: 25,
        title: 'Sablés bretons et tartes aux fruits : la France gourmande sur un plateau',
        description: 'Nos classiques français, c\'est l\'hexagone qui se raconte en douceur sur votre table.',
        longDescription: 'Du sablé breton craquant qui sent bon la Bretagne aux tartes fruitées qui célèbrent nos terroirs, chaque bouchée est un petit voyage à travers la France gourmande.',
        image: '/photos/webp/sableBreton+tarteflan+riz.webp',
        category: 'gateaux',
        featured: false,
        altText: 'Assortiment gourmand français : sablés bretons craquants et tartes aux fruits, voyage à travers la France des terroirs sur un plateau',
        tags: ['sablé breton', 'tarte aux fruits', 'France gourmande', 'terroir', 'classique français']
    },
    {
        id: 26,
        title: 'L\'entremet moderne : quand la technique épouse l\'émotion',
        description: 'Nos entremets contemporains, c\'est la pâtisserie française qui se réinvente sans perdre son âme.',
        longDescription: 'Chaque entremet est une symphonie de textures et de saveurs. Mousse aérienne, biscuit fondant, cœur coulant... nos pâtissiers composent des œuvres gourmandes où chaque couche raconte une histoire.',
        image: '/photos/webp/entremet.webp',
        category: 'entremets',
        featured: true,
        altText: 'Entremet moderne aux lignes épurées, symphonie de textures où chaque couche révèle une surprise gourmande sophistiquée',
        tags: ['entremet', 'moderne', 'mousse', 'technique française', 'sophistication']
    },
    {
        id: 27,
        title: 'L\'art de l\'entremet : entre tradition et innovation',
        description: 'Nos créations d\'entremets révèlent le savoir-faire de nos pâtissiers dans toute sa splendeur.',
        longDescription: 'Inspirés par les grands maîtres pâtissiers, nos entremets allient techniques traditionnelles et créativité moderne. Chaque création est pensée pour émerveiller vos yeux avant de charmer vos papilles.',
        image: '/photos/webp/entremet-.webp',
        category: 'entremets',
        featured: true,
        altText: 'Création d\'entremet artisanale, alliance parfaite entre tradition pâtissière française et innovation contemporaine des saveurs',
        tags: ['entremet', 'artisanal', 'innovation', 'tradition', 'maître pâtissier']
    }
];

const categories = [
    { id: 'all', label: 'Toute notre histoire' },
    { id: 'ambiance', label: 'L\'âme de notre boutique' },
    { id: 'pain-boulangerie', label: 'Pain & Boulangerie Artisanale' },
    { id: 'petit-dejeuner', label: 'Petit-Déjeuner & Traditions' },
    { id: 'restauration-salee', label: 'Restauration Salée Maison' },
    { id: 'entremets', label: 'Entremets d\'Exception' },
    { id: 'petites-douceurs', label: 'Petits bonheurs du matin' },
    { id: 'specialites', label: 'L\'art de l\'illusion' },
    { id: 'gateaux', label: 'Grandes émotions' },
];

// --- SEO Metadata (Server Component) ---
export const metadata: Metadata = {
    title: "Galerie Gourmande | 3 Boutiques Bruxelles : Evere, Koekelberg, Molenbeek | Entremets d'Exception",
    description: "Découvrez notre savoir-faire artisanal dans nos 3 boutiques à Bruxelles : Evere (Chaussée de Louvain 906), Koekelberg (Rue Émile Sergijsels 34), Molenbeek (Chaussée de Gand 402). Entremets d'exception, pain frais quotidien, pâtisseries trompe-l'œil.",
    keywords: ['boulangerie Evere', 'pâtisserie Koekelberg', 'boulangerie Molenbeek', 'entremets d\'exception Bruxelles', 'pain frais Bruxelles', '3 boutiques pâtisserie', 'Chaussée de Louvain 906', 'Rue Émile Sergijsels 34', 'Chaussée de Gand 402', 'praline monte-cristo forêt noire', 'trompe-l\'œil pâtisserie', 'mignardises événements', 'viennoiserie artisanale', ...new Set(galleryItems.flatMap(item => item.tags || []))].join(', '),
    openGraph: {
        title: "Galerie Gourmande | 3 Boutiques Boulangerie Pâtisserie Artisanale Bruxelles",
        description: "Explorez notre savoir-faire dans 3 boutiques : entremets d'exception, pain frais, pâtisseries créatives à Evere, Koekelberg et Molenbeek.",
        images: [ { url: '/photos/webp/entremet-paraline_montecristo_foretnoire.webp' } ]
    },
    alternates: {
        canonical: 'https://www.painpatisserie.be/gallery',
    },
};

// --- Page Component (Server Component) ---
export default function GalleryPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Bakery',
        name: 'Pain Pâtisserie',
        address: [
            {
                '@type': 'PostalAddress',
                streetAddress: 'Chaussée de Louvain 906',
                addressLocality: 'Evere',
                postalCode: '1140',
                addressRegion: 'Bruxelles',
                addressCountry: 'BE'
            },
            {
                '@type': 'PostalAddress',
                streetAddress: 'Rue Émile Sergijsels 34',
                addressLocality: 'Koekelberg',
                postalCode: '1081',
                addressRegion: 'Bruxelles',
                addressCountry: 'BE'
            },
            {
                '@type': 'PostalAddress',
                streetAddress: 'Chaussée de Gand 402',
                addressLocality: 'Molenbeek-Saint-Jean',
                postalCode: '1080',
                addressRegion: 'Bruxelles',
                addressCountry: 'BE'
            }
        ],
        telephone: '+32 472 25 05 78',
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
