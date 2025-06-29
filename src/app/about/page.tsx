import { Metadata } from 'next';
import Image from 'next/image';
import { Lusitana } from 'next/font/google';
import { MapPin, CakeSlice, Coffee, Bus, Smile } from 'lucide-react'; // Import des icônes
import './About.css';

const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'À Propos - Pain Pâtisserie Bruxelles',
  description: "Découvrez l'histoire de Pain Pâtisserie, notre passion pour la boulangerie et la pâtisserie artisanale, et l'art du trompe-l’œil à Bruxelles (Evere).",
  keywords: ['boulangerie Evere', 'pâtisserie Bruxelles', 'histoire pâtisserie', 'artisan boulanger', 'trompe-l’œil', 'gâteau sur mesure', 'passion pâtisserie'],
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
                  src="/photos/entre.jpeg" // J'ai remplacé l'image manquante
                  alt="Intérieur de la Pâtisserie Plaisir"
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
              Notre atelier à Bruxelles est plus qu&apos;une simple cuisine. C&apos;est un lieu d&apos;échange où les conversations se transforment en créations. Nous aimons croire que chaque gâteau que nous préparons est le début d&apos;une histoire : la vôtre. C&apos;est en vous écoutant que nous trouvons l&apos;inspiration pour des pâtisseries pleines de caractère.
            </p>
            <p className="text-stone-700 leading-relaxed">
              Le trompe-l’œil est notre façon de jouer avec les apparences pour mieux révéler l&apos;essence d&apos;une saveur ou d&apos;une idée. C&apos;est une invitation à la surprise, un clin d&apos;œil gourmand qui transforme un dessert en un moment de joie. La plus belle des récompenses est de voir une étincelle dans vos yeux avant même la première bouchée.
            </p>
          </div>
        </div>

        <div className="mt-16 md:mt-24">
          <div className="text-center mb-12 md:mb-16">
            <h2 className={`${lusitana.className} text-3xl sm:text-4xl font-semibold text-stone-800`}>Notre Atelier & Nos Spécialités</h2>
            <p className="mt-4 text-base sm:text-lg text-stone-600 max-w-3xl mx-auto">Là où la magie opère, au cœur de Bruxelles.</p>
          </div>

          <div className="grid md:grid-cols-5 gap-8 md:gap-6 items-start">
            {/* Colonne de gauche (prend 3/5 de la largeur sur desktop) */}
            <div className="md:col-span-3 space-y-8 text-lg">
              <div className="flex items-start gap-4">
                <MapPin className="w-8 h-8 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className={`${lusitana.className} text-xl font-semibold text-stone-800 mb-2`}>Notre port d&apos;attache</h3>
                  <p className="text-stone-700 leading-relaxed">
                    Tout a commencé en 2022, dans le quartier Paduwa à Evere, à deux pas de la sortie d’autoroute Evere-Woluwe (A3), entre la place Meiser et la place de la Paix.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Smile className="w-8 h-8 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className={`${lusitana.className} text-xl font-semibold text-stone-800 mb-2`}>Notre mission</h3>
                  <p className="text-stone-700 leading-relaxed">
                    Réveiller vos papilles, même le lundi matin, avec des créations artisanales qui font sourire et saliver.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CakeSlice className="w-8 h-8 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className={`${lusitana.className} text-xl font-semibold text-stone-800 mb-2`}>Nos créations</h3>
                  <p className="text-stone-700 leading-relaxed">
                    Que ce soit pour une envie passagère ou un grand événement, nos créations s&apos;adaptent à vos désirs. Laissez-vous tenter par un trompe-l&apos;œil, un cheesecake fondant ou une viennoiserie. Pour vos réceptions, notre service traiteur imagine des buffets sucrés et salés sur mesure qui marqueront les esprits.
                  </p>
                </div>
              </div>
            </div>

            {/* Colonne de droite (prend 2/5 de la largeur sur desktop) */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-lg flex items-start gap-4">
                <Coffee className="w-7 h-7 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className={`${lusitana.className} text-xl font-semibold text-stone-800 mb-2`}>Petit-déjeuner à emporter</h3>
                  <p className="text-stone-700 leading-relaxed">
                    Msemen fourrés, baghrir, croissants... Le client est roi, même au saut du lit.
                  </p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg flex items-start gap-4">
                <Bus className="w-7 h-7 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className={`${lusitana.className} text-xl font-semibold text-stone-800 mb-2`}>Accès facile</h3>
                  <p className="text-stone-700 leading-relaxed">
                    <strong>Voiture:</strong> Sortie Evere-Woluwe (A3).
                    <br />
                    <strong>Bus:</strong> 21, 66, 80, R90, 819, R81.
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
                    <h3 className="text-xl font-bold mb-2">Qualité</h3>
                    <p className="text-stone-600">Sélection rigoureuse des matières premières, sans conservateurs ni additifs.</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-lg animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                    <h3 className="text-xl font-bold mb-2">Créativité</h3>
                    <p className="text-stone-600">Des créations uniques et des gâteaux sur mesure pour toutes vos occasions.</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-lg animate-fade-in-up sm:col-span-2 lg:col-span-1" style={{ animationDelay: '0.8s' }}>
                    <h3 className="text-xl font-bold mb-2">Proximité</h3>
                    <p className="text-stone-600">Un service traiteur et brunch pour les entreprises et les particuliers à Evere et alentours.</p>
                </div>
           </div>
        </div>

      </div>
    </div>
  );
}
