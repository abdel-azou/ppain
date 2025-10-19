import { Lusitana } from 'next/font/google';

const lusitana = Lusitana({
  weight: ['400'],
  subsets: ['latin'],
});

export default function Loading() {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto mb-4"></div>
        </div>
        <h2 className={`${lusitana.className} text-xl text-stone-700 mb-2`}>
          Préparation en cours...
        </h2>
        <p className="text-stone-500 text-sm">
          Nos délices artisanaux arrivent
        </p>
      </div>
    </div>
  );
}
