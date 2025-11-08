import type { Metadata } from 'next';
import GalleryClient from './gallery-client';
import './Gallery.css';

// --- Data (Stays on the server) ---
const galleryItems = [
    {
        id: 1,
        title: 'Vitrine Gourmande Evere : L\'Art Pâtissier qui Éveille vos Sens',
        description: 'Découvrez notre vitrine artisanale à Evere (Chaussée de Louvain 906) - un théâtre gourmand où chaque pâtisserie belge raconte son histoire.',
        longDescription: 'Notre vitrine n\'est pas qu\'un simple étalage, c\'est le reflet de notre expertise pâtissière à Bruxelles. Chaque matin, nos artisans pâtissiers disposent avec soin nos créations signature : entremets d\'exception, viennoiseries dorées, et spécialités belgo-orientales. Un spectacle visuel qui annonce les saveurs à venir.',
        image: '/photos/webp/vitrine.webp',
        category: 'ambiance',
        featured: true,
        altText: 'Vitrine pâtisserie artisanale Evere Bruxelles - Entremets, viennoiseries et spécialités belges exposées avec art dans notre boutique Chaussée de Louvain',
        tags: ['vitrine pâtisserie', 'Evere Bruxelles', 'artisan pâtissier', 'Chaussée de Louvain', 'pâtisserie belge']
    },
    {
        id: 16,
        title: 'Baguettes Tradition Bruxelles : Le Pain Français qui Réveille la Capitale',
        description: 'Nos baguettes tradition, pétrissage quotidien le matin dans nos 3 boulangeries Evere, Koekelberg, Molenbeek. Croustillantes, authentiques, irrésistibles.',
        longDescription: 'chaque chaque matin, nos boulangers pétrissent la tradition française au cœur de Bruxelles. Farine de qualité premium, levure naturelle, et ce petit "croc" qui fait toute la différence. Nos baguettes accompagnent de nombreuses familles bruxelloises quotidiennement, et on comprend pourquoi !',
        image: '/photos/webp/pain-baguette2.webp',
        category: 'pain-boulangerie',
        featured: true,
        altText: 'Baguettes tradition fraîches boulangerie Bruxelles - Pain français artisanal cuit quotidiennement Evere Koekelberg Molenbeek',
        tags: ['baguette tradition', 'boulangerie Bruxelles', 'pain français', 'Evere Koekelberg Molenbeek', 'pétrissage artisanal']
    },
    {
        id: 17,
        title: 'Spécialités Maghreb Bruxelles : Harcha, Baghrir, Msemen Authentiques',
        description: 'Petit-déjeuner traditionnel maghrébin à Bruxelles : harcha dorée, baghrir aux mille trous, msemen feuilleté. Recettes ancestrales, goût authentique.',
        longDescription: 'Nos grand-mères auraient été fières ! Harcha à la semoule fine, baghrir moelleux aux alvéoles parfaites, msemen feuilleté couche par couche... Chaque matin, nous perpétuons ces recettes séculaires dans nos boutiques bruxelloises. Le secret ? L\'amour du geste authentique et cette petite pointe de nostalgie qui rend chaque bouchée inoubliable.',
        image: '/photos/baghrer.png',
        category: 'petit-dejeuner',
        featured: true,
        altText: 'Spécialités petit-déjeuner maghreb Bruxelles - Harcha, Baghrir, Msemen traditionnels pâtisserie orientale artisanale',
        tags: ['harcha Bruxelles', 'baghrir authentique', 'msemen traditionnel', 'petit-déjeuner maghreb', 'pâtisserie orientale']
    },
    {
        id: 18,
        title: 'Mini-Pizzas Artisanales Bruxelles : L\'Apéritif qui Fait Mouche !',
        description: 'Mini-pizzas fraîches préparées quotidiennement dans nos boulangeries Bruxelles. Pâte artisanale, garnitures premium, parfaites pour vos événements.',
        longDescription: 'Qui a dit qu\'il fallait choisir entre la qualité belge et la gourmandise italienne ? Nos mini-pizzas prouvent le contraire ! Pâte pétrie chaque matin, sauce tomate maison aux herbes fraîches, et cette générosité belge qui fait que nos garnitures débordent (littéralement). Parfaites pour l\'apéro, les fêtes d\'enfants, ou quand on a une envie soudaine de Méditerranée.',
        image: '/photos/webp/event-minipizza.webp',
        category: 'restauration-salee',
        featured: true,
        altText: 'Mini-pizzas artisanales Bruxelles - Apéritif événements pâte fraîche garnitures premium boulangerie Evere Koekelberg Molenbeek',
        tags: ['mini-pizza Bruxelles', 'apéritif artisanal', 'événements traiteur', 'pâte fraîche', 'restauration salée']
    },
    {
        id: 19,
        title: 'Sandwichs Gourmands Bruxelles : Le Déjeuner qui Change Tout !',
        description: 'Sandwichs artisanaux sur pain frais quotidien. Ingrédients belges premium, garnitures généreuses, saveurs authentiques. Pause déjeuner réinventée.',
        longDescription: 'Oubliez les sandwichs plastifiés ! Chez nous, chaque sandwich commence par notre pain pétri le matin même. dinde de Parme ou charcuterie belge, fromages affinés, légumes croquants... Et LA sauce qui fait que vous revenez (on ne dira pas laquelle, mais elle contient notre secret !). Résultat : un déjeuner qui tient au corps et au cœur.',
        image: '/photos/webp/sandwich.webp',
        category: 'restauration-salee',
        featured: true,
        altText: 'Sandwichs artisanaux Bruxelles pain frais - Déjeuner gourmet ingrédients belges premium charcuterie fromage légumes',
        tags: ['sandwich Bruxelles', 'déjeuner artisanal', 'pain frais quotidien', 'ingrédients belges', 'pause déjeuner']
    },
    {
        id: 2,
        title: 'Entremets Signature Bruxelles : Gâteaux d\'Exception sur Commande',
        description: 'Entremets artisanaux Bruxelles pour vos événements spéciaux. Techniques française, design contemporain, saveurs équilibrées. 4-8 personnes.',
        longDescription: 'Nos entremets signature, c\'est l\'alliance parfaite entre tradition pâtissière française et créativité bruxelloise. Chaque création demande 6h de travail minutieux : biscuits aériens, mousses soyeuses, crémeux intenses... Le résultat ? Un gâteau qui fait sensation sur Instagram ET dans vos papilles. Commande 48h à l\'avance recommandée (oui, la perfection prend du temps !).',
        image: '/photos/webp/gateau-comptoir2.webp',
        category: 'gateaux',
        featured: true,
        altText: 'Entremet signature Bruxelles - Gâteau artisanal sur commande technique française design moderne événement spécial',
        tags: ['entremet Bruxelles', 'gâteau sur commande', 'événement spécial', 'technique française', 'pâtisserie d\'exception']
    },
    {
        id: 3,
        title: 'Croissants Artisanaux Bruxelles : Viennoiseries Fraîches Quotidiennes',
        description: 'Croissants au beurre AOP façonnés main chaque nuit. Viennoiseries françaises authentiques disponibles dès 6h dans nos 3 boutiques bruxelloises.',
        longDescription: 'Nos croissants, c\'est des heures de préparation pour 3 minutes de bonheur ! Pâte feuilletée au beurre AOP (on ne lésine pas), façonnage à la main à 3h du matin, cuisson dorée à point... Le résultat ? Ce "croc" parfait qui réveille tout le quartier et cette mie aérée qui fond sur la langue. Disponibles tant qu\'il y en a - et croyez-nous, ça part vite !',
        image: '/photos/webp/vienoiserie-croissant.webp',
        category: 'petites-douceurs',
        featured: false,
        altText: 'Croissants beurre AOP Bruxelles - Viennoiseries françaises artisanales façonnées main quotidiennement 3 boutiques',
        tags: ['croissant Bruxelles', 'viennoiserie française', 'beurre AOP', 'façonné main', 'petit-déjeuner artisanal']
    },
    {
        id: 4,
        title: 'Gâteaux Trompe-l\'Œil Bruxelles : L\'Art Pâtissier qui Bluff !',
        description: 'Créations trompe-l\'œil sur commande Bruxelles. Gâteaux-sculptures hyperréalistes, effet garanti pour anniversaires, événements d\'entreprise.',
        longDescription: 'Vous voulez épater vos invités ? Nos trompe-l\'œil sont votre arme secrète ! Cette "boîte à bijoux" ? C\'est un gâteau aux fruits rouges. Ce "livre ancien" ? Un délicieux chocolat-praliné. Nos pâtissiers-illusionnistes mettent 3 jours à créer ces œuvres comestibles. Le résultat : des "Oh !" et des "Ah !" garantis, suivis d\'un silence religieux quand vos invités découvrent le goût. Magie pure !',
        image: '/photos/webp/trompeoeil-boite.webp',
        category: 'gateaux',
        featured: false,
        altText: 'Gâteau trompe-l\'oeil Bruxelles boîte bijoux - Création pâtissière hyperréaliste sur commande événement anniversaire',
        tags: ['trompe-l\'œil Bruxelles', 'gâteau sculpture', 'sur commande', 'événement original', 'pâtisserie artistique']
    },
    {
        id: 5,
        title: 'Trompe-l\'Œil Fruits Exotiques Bruxelles : 5 Saveurs Signature',
        description: 'Pâtisserie trompe-l\'œil 5 saveurs Bruxelles : mangue, pistache, framboise, amande, myrtille. Création unique sur commande, livraison possible.',
        longDescription: 'Notre chef d\'œuvre en 5 actes gustatifs ! Cette création ultra-réaliste cache 5 mini-gâteaux aux saveurs du monde : mangue des Antilles, pistache de Sicile, framboise des Ardennes, amande de Provence, myrtille sauvage. Chaque "fruit" est façonné individuellement (6h de travail !), avec des goûts si authentiques que vos invités vont chercher les pépins ! Un dessert qui voyage sans quitter Bruxelles.',
        image: '/photos/webp/trompeOeil-mangue_pistache_framboise_amande_myrtille.webp',
        category: 'specialites',
        featured: true,
        altText: 'Pâtisserie trompe-l\'oeil 5 saveurs Bruxelles - Création fruits exotiques sur commande mangue pistache framboise',
        tags: ['trompe-l\'œil Bruxelles', '5 saveurs', 'fruits exotiques', 'création unique', 'sur commande']
    },
    {
        id: 6,
        title: 'Tartelettes Assorties Bruxelles : Mini-Gâteaux Colorés',
        description: 'Tartelettes individuelles Bruxelles : fruits, fraises, framboise. Commande plateau 12 pièces, idéal réunions, anniversaires enfants.',
        longDescription: 'Nos tartelettes, c\'est le bonheur en format mini !  variétés colorées dans chaque plateau : tarte citron meringuée, fraise-basilic, framboise fraîche, fruits exotique. Parfait pour épater sans se ruiner : 3,50€ l\'unité, et impossible de n\'en prendre qu\'une.',
        image: '/photos/webp/gateau-tartellete.webp',
        category: 'gateaux',
        featured: true,
        altText: 'Tartelettes assorties Bruxelles - Mini gâteaux colorés plateau 12 pièces fruits chocolat caramel commande réunion',
        tags: ['tartelettes Bruxelles', 'mini gâteaux', 'plateau assortiment', 'réunion', 'anniversaire enfant']
    },
    {
        id: 7,
        title: 'Cookies Artisanaux Bruxelles : 4 Saveurs Maison',
        description: 'Cookies faits maison Bruxelles : noisette-chocolat, framboise, pistache. Vente à l\'unité ou box 9 pièces. Pâte fraîche quotidienne.',
        longDescription: 'Nos cookies, c\'est du 100% fait-maison, tous les matins à 6h ! Recette grand-mère revisitée par notre chef : pâte au beurre français, cuisson parfaite (croustillant dehors, moelleux dedans), et ces 4 saveurs qui rendent accro : noisette-chocolat (notre bestseller), framboise acidulée, pistache de Sicile, et le "mystère du jour". Vendu à l\'unité (1,80€) ou en box cadeau. Attention : effet addictif prouvé !',
        image: '/photos/webp/cookies-noisettechoco_framboise_pistache.webp',
        category: 'gateaux',
        featured: false,
        altText: 'Cookies artisanaux Bruxelles - 4 saveurs maison noisette chocolat framboise pistache vente unité box cadeau',
        tags: ['cookies Bruxelles', 'fait maison', '4 saveurs', 'box cadeau', 'pâte fraîche']
    },
    {
        id: 8,
        title: 'Fausse Cacahuète Trompe-l\'Œil Bruxelles : Hommage à Magritte',
        description: 'Cacahuète trompe-l\'œil Bruxelles : pâte d\'amande, praliné noisette. Animation apéritif, événement d\'entreprise. Effet garanti !',
        longDescription: 'Le piège parfait pour vos apéros ! Cette "cacahuète" hyperréaliste (hommage à notre cher Magritte belge) cache un cœur de pâte d\'amande au praliné noisette. Vos invités croient prendre une cacahuète salée, et SURPRISE : explosion de douceur ! Notre record : 15 secondes de silence stupéfait, puis des éclats de rire. Parfait pour briser la glace en réunion ou dynamiser un cocktail. Livré en sachets "Apéritif" authentiques. Machiavélique et délicieux !',
        image: '/photos/webp/trompeoeil_cacahuete.webp',
        category: 'ambiance',
        featured: true,
        altText: 'Fausse cacahuète trompe-l\'oeil Bruxelles hommage Magritte - Animation apéritif entreprise pâte amande praliné surprise',
        tags: ['trompe-l\'œil Bruxelles', 'cacahuète Magritte', 'apéritif sucré', 'animation', 'événement entreprise']
    },
    {
        id: 9,
        title: 'Tarte aux Fraises Bruxelles : Pâtisserie Fine Belge',
        description: 'Tarte aux fraises fraîches Bruxelles : pâte sablée maison, crème pâtissière vanille, fraises de saison. Commande individuelle ou familiale.',
        longDescription: 'Notre tarte aux fraises, c\'est l\'été belge dans une assiette ! Pâte sablée croustillante (secret familial depuis 3 générations), crème pâtissière vanille Bourbon, et ces fraises de Wépion qui font notre fierté nationale. Disponible en version individuelle (parfait pour un tête-à-tête) ou familiale 8 parts (idéal dimanche chez belle-maman). Astuce de chef : à déguster dans les 4h pour le craquant parfait !',
        image: '/photos/webp/tarte-tartefraise.webp',
        category: 'petites-douceurs',
        featured: true,
        altText: 'Tarte aux fraises Bruxelles - Pâtisserie fine belge pâte sablée crème pâtissière fraises Wépion commande',
        tags: ['tarte fraises Bruxelles', 'pâtisserie fine', 'fraises Wépion', 'crème pâtissière', 'commande individuelle']
    },
    {
        id: 10,
        title: 'Baguettes Artisanales Bruxelles : Pain Français Tradition',
        description: 'Baguettes françaises Bruxelles : cuisson plusieurs fois par jour, farine premium, levain naturel. Disponible Evere, Koekelberg, livraison possible.',
        longDescription: 'Nos baguettes, c\'est de la France livrée à Bruxelles ! Cuites 4 fois par jour (6h-10h-14h-17h) avec notre farine T65 importée de Normandie et notre levain de 15 ans d\'âge (oui, plus vieux que certains stagiaires !). Croûte dorée qui craque, mie alvéolée qui sent bon le blé. Nos clients français nous disent : "Enfin du vrai pain !" Nos clients belges : "Pourquoi on n\'en faisait pas avant ?" Mystère résolu !',
        image: '/photos/webp/pain-baguette.webp',
        category: 'petites-douceurs',
        featured: true,
        altText: 'Baguettes artisanales Bruxelles - Pain français tradition farine T65 levain naturel cuisson 4 fois jour livraison',
        tags: ['baguettes Bruxelles', 'pain français', 'farine T65', 'levain naturel', 'livraison Evere Koekelberg']
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
        image: '/photos/webp/vitrine.webp',
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
