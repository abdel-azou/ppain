import { Metadata } from 'next';
import Image from 'next/image';
import { Lusitana } from 'next/font/google';
import { MapPin, CakeSlice, Coffee, Bus, Smile } from 'lucide-react';
import './About.css';

const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'À Propos - Histoire & Savoir-faire | Pain Pâtisserie Bruxelles (3 Boutiques)',
  description: "Découvrez l'histoire de Pain Pâtisserie, notre passion pour la boulangerie et pâtisserie artisanale, et l'art du trompe-l'œil. 3 boutiques à Bruxelles : Evere, Koekelberg, Molenbeek. Tradition familiale et innovation pâtissière depuis des générations.",
  keywords: [
    'histoire boulangerie Bruxelles', 
    'artisan pâtissier Evere Koekelberg Molenbeek', 
    'savoir-faire traditionnel', 
    'passion pâtisserie artisanale',
    'trompe-l\'œil histoire', 
    'tradition familiale boulangerie', 
    'équipe pâtisserie Bruxelles',
    'innovation pâtissière',
    '3 boutiques Pain Pâtisserie',
    'expertise boulangerie Bruxelles'
  ].join(', '),
  openGraph: {
    title: 'Notre Histoire - Pain Pâtisserie Artisanale Bruxelles',
    description: 'Tradition, passion et savoir-faire artisanal dans nos 3 boutiques à Bruxelles.',
    images: ['/photos/webp/comptoir-vueclient.webp'],
  },
};

export default function AboutPage() {
  return (
    <div className="bg-stone-50 text-stone-800">
      <div className="container mx-auto px-4 py-12 sm:py-16 md:py-24">
        <div className="text-center mb-12 md:mb-16">
          <h1 className={`${lusitana.className} text-4xl sm:text-5xl font-bold text-stone-900`}>Notre Histoire</h1>
          <p className="mt-4 text-base sm:text-lg text-stone-600 max-w-3xl mx-auto">La passion du goût, la tradition de l&apos;excellence.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 md:order-1 animate-fade-in-up">
            <div className="stamp-container">
              <div className="stamp-image-wrapper">
                <Image
                  src="/photos/webp/entre.webp"
                  alt="Intérieur de la Pâtisserie Pain Pâtisserie Bruxelles - ambiance chaleureuse et professionnelle"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-2xl w-full h-auto stamp-image"
                />
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h2 className={`${lusitana.className} text-3xl font-semibold text-stone-800 mb-4`}>Créateurs de Souvenirs Sucrés</h2>
            <p className="mb-4 text-stone-700 leading-relaxed">
              Nos ateliers à Bruxelles (Evere, Koekelberg, Molenbeek) sont plus que de simples cuisines. Ce sont des lieux d&apos;échange où les conversations se transforment en créations. Nous aimons croire que chaque gâteau que nous préparons est le début d&apos;une histoire : la vôtre. C&apos;est en vous écoutant que nous trouvons l&apos;inspiration pour des pâtisseries pleines de caractère.
            </p>
            <p className="text-stone-700 leading-relaxed">
              Le trompe-l'œil est notre façon de jouer avec les apparences pour mieux révéler l&apos;essence d&apos;une saveur ou d&apos;une idée. C&apos;est une invitation à la surprise, un clin d&apos;œil gourmand qui transforme un dessert en un moment de joie. La plus belle des récompenses est de voir une étincelle dans vos yeux avant même la première bouchée.
            </p>
          </div>
        </div>

        <div className="mt-16 md:mt-24">
          <div className="text-center mb-12 md:mb-16">
            <h2 className={`${lusitana.className} text-3xl sm:text-4xl font-semibold text-stone-800`}>Nos 3 Boutiques à Bruxelles</h2>
            <p className="mt-4 text-base sm:text-lg text-stone-600 max-w-3xl mx-auto">Trois adresses pour vous servir, une même passion pour l&apos;excellence.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Boutique Evere */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-amber-600" />
                <h3 className={`${lusitana.className} text-xl font-semibold text-stone-800`}>Evere - Notre Première</h3>
              </div>
              <p className="text-stone-700 mb-3">
                <strong>Adresse :</strong> 116 Chau. de Louvain, 1140 Evere
              </p>
              <p className="text-stone-700 leading-relaxed">
                Notre boutique historique depuis 2022, dans le quartier Paduwa. À deux pas de la sortie d'autoroute Evere-Woluwe (A3), entre la place Meiser et la place de la Paix.
              </p>
            </div>

            {/* Boutique Koekelberg */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-amber-600" />
                <h3 className={`${lusitana.className} text-xl font-semibold text-stone-800`}>Koekelberg</h3>
              </div>
              <p className="text-stone-700 mb-3">
                <strong>Adresse :</strong> 194 Av. de Jette, 1090 Koekelberg
              </p>
              <p className="text-stone-700 leading-relaxed">
                Notre seconde boutique, idéalement située pour servir les quartiers de Koekelberg et Jette avec la même qualité artisanale.
              </p>
            </div>

            {/* Boutique Molenbeek */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-amber-600" />
                <h3 className={`${lusitana.className} text-xl font-semibold text-stone-800`}>Molenbeek</h3>
              </div>
              <p className="text-stone-700 mb-3">
                <strong>Adresse :</strong> 95 Bd Léopold II, 1080 Molenbeek-Saint-Jean
              </p>
              <p className="text-stone-700 leading-relaxed">
                Notre troisième boutique, extension naturelle de notre savoir-faire vers Molenbeek-Saint-Jean et les communes avoisinantes.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-5 gap-8 md:gap-6 items-start">
            {/* Colonne de gauche */}
            <div className="md:col-span-3 space-y-8 text-lg">
              <div className="flex items-start gap-4">
                <Smile className="w-8 h-8 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className={`${lusitana.className} text-xl font-semibold text-stone-800 mb-2`}>Notre mission</h3>
                  <p className="text-stone-700 leading-relaxed">
                    Réveiller vos papilles dans nos 3 boutiques bruxelloises, même le lundi matin, avec des créations artisanales qui font sourire et saliver.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CakeSlice className="w-8 h-8 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className={`${lusitana.className} text-xl font-semibold text-stone-800 mb-2`}>Nos créations</h3>
                  <p className="text-stone-700 leading-relaxed">
                    Que ce soit pour une envie passagère ou un grand événement, nos créations s&apos;adaptent à vos désirs dans chacune de nos boutiques. Laissez-vous tenter par un trompe-l&apos;œil, un cheesecake fondant ou une viennoiserie. Pour vos réceptions, notre service traiteur imagine des buffets sucrés et salés sur mesure qui marqueront les esprits.
                  </p>
                </div>
              </div>
            </div>

            {/* Colonne de droite */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-lg flex items-start gap-4">
                <Coffee className="w-7 h-7 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className={`${lusitana.className} text-xl font-semibold text-stone-800 mb-2`}>Petit-déjeuner à emporter</h3>
                  <p className="text-stone-700 leading-relaxed">
                    Msemen fourrés, baghrir, croissants... Le client est roi, même au saut du lit, dans nos 3 boutiques.
                  </p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg flex items-start gap-4">
                <Bus className="w-7 h-7 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className={`${lusitana.className} text-xl font-semibold text-stone-800 mb-2`}>Accès facile</h3>
                  <p className="text-stone-700 leading-relaxed">
                    Nos boutiques sont facilement accessibles en voiture et transport en commun dans toute la région bruxelloise.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center my-16 md:my-24">
           <h2 className={`${lusitana.className} text-3xl sm:text-4xl font-semibold text-stone-800 mb-8`}>Nos Engagements</h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                <div className="p-6 bg-white rounded-lg shadow-lg animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <h3 className="text-xl font-bold mb-2">Qualité Artisanale</h3>
                    <p className="text-stone-600">Sélection rigoureuse des matières premières, sans conservateurs ni additifs, dans nos 3 boutiques bruxelloises.</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-lg animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                    <h3 className="text-xl font-bold mb-2">Créativité & Innovation</h3>
                    <p className="text-stone-600">Des créations uniques et des gâteaux sur mesure pour toutes vos occasions, avec notre expertise du trompe-l&apos;œil.</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-lg animate-fade-in-up sm:col-span-2 lg:col-span-1" style={{ animationDelay: '0.8s' }}>
                    <h3 className="text-xl font-bold mb-2">Proximité & Service</h3>
                    <p className="text-stone-600">Un service traiteur et brunch pour les entreprises et particuliers depuis nos 3 boutiques : Evere, Koekelberg, Molenbeek.</p>
                </div>
           </div>
        </div>

      </div>
    </div>
  );
}
