import { Metadata } from 'next';
import Image from 'next/image';
import { Lusitana } from 'next/font/google';

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
          <p className="mt-4 text-base sm:text-lg text-stone-600 max-w-3xl mx-auto">La passion du goût, la tradition de l'excellence.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="animate-fade-in-up">
            <Image
              src="/photos/artisan-baker.jpg" // Assurez-vous que cette image existe dans public/photos
              alt="Artisan boulanger pétrissant la pâte"
              width={600}
              height={400}
              className="rounded-lg shadow-2xl"
            />
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h2 className={`${lusitana.className} text-3xl font-semibold text-stone-800 mb-4`}>De la tradition à l'innovation</h2>
            <p className="mb-4 text-stone-700 leading-relaxed">
              Fondée au cœur de Bruxelles, notre pâtisserie-boulangerie est le fruit d’une passion familiale transmise à travers les générations. Nous croyons en l'authenticité des ingrédients et au savoir-faire artisanal. Chaque jour, nous pétrissons, façonnons et cuisons avec amour pour vous offrir des produits d'exception.
            </p>
            <p className="text-stone-700 leading-relaxed">
              Notre spécialité, le trompe-l’œil, est l'expression de notre créativité. Nous aimons surprendre et émerveiller vos papilles en transformant des pâtisseries classiques en véritables œuvres d'art.
            </p>
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
