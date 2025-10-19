import { Metadata } from 'next';
import Link from 'next/link';
import { Lusitana } from 'next/font/google';
import { Home, Coffee } from 'lucide-react';

const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '404 - Page Non Trouvée | Pain Pâtisserie Bruxelles',
  description: 'Cette page n&apos;existe pas ou a été déplacée. Retrouvez nos créations artisanales dans nos 3 boutiques à Bruxelles : Evere, Koekelberg, Molenbeek.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-8">
          <Coffee className="w-24 h-24 text-amber-600 mx-auto mb-4" />
          <h1 className={`${lusitana.className} text-6xl font-bold text-stone-800 mb-4`}>404</h1>
          <h2 className={`${lusitana.className} text-2xl font-semibold text-stone-700 mb-4`}>
            Oops ! Cette page a disparu...
          </h2>
          <p className="text-stone-600 mb-8 leading-relaxed">
            Comme nos pâtisseries matinales, cette page semble avoir été savourée trop rapidement ! 
            Mais ne vous inquiétez pas, nos délices vous attendent dans nos 3 boutiques à Bruxelles.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium"
          >
            <Home className="w-5 h-5" />
            Retour à l&apos;accueil
          </Link>
          
          <div className="flex gap-3 justify-center">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 border border-stone-300 text-stone-700 px-4 py-2 rounded-lg hover:bg-stone-100 transition-colors"
            >
              Nos Créations
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-stone-300 text-stone-700 px-4 py-2 rounded-lg hover:bg-stone-100 transition-colors"
            >
              Nous Contacter
            </Link>
          </div>
        </div>

        <div className="mt-12 text-sm text-stone-500">
          <p>Nos 3 boutiques vous attendent :</p>
          <p className="mt-2">
            <strong>Evere</strong> • <strong>Koekelberg</strong> • <strong>Molenbeek</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
