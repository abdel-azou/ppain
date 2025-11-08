import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // Ajout de l'importation
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import LogoSchema from "@/components/LogoSchema";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "Pain Pâtisserie - Boulangerie & Pâtisserie Artisanale à Bruxelles",
    template: "%s - Pain Pâtisserie",
  },
  description:
    "Pain Pâtisserie : 3 boutiques à Bruxelles (Evere, Koekelberg, Molenbeek). Boulangerie-pâtisserie artisanale spécialisée en gâteaux personnalisés, entremets d'exception, trompe-l'œil créatifs, pain frais quotidien. Commandes sur mesure pour mariages, anniversaires, événements. Click & collect disponible.",
  icons: {
    icon: "/Logo.svg",
    shortcut: "/Logo.svg",
    apple: "/Logo.svg"
  },
  keywords:
    "pâtisserie Bruxelles, boulangerie Evere Koekelberg Molenbeek, gâteau personnalisé Bruxelles, gâteau mariage Bruxelles, gâteau anniversaire, entremets Bruxelles, trompe-l'œil pâtisserie, number cake Bruxelles, layer cake, piece montée, pain frais quotidien, viennoiseries Bruxelles, croissants artisanaux, petit déjeuner Bruxelles, goûter enfant, click and collect Bruxelles, livraison gâteau, artisan boulanger, pâtisserie artisanale, événements sur mesure, traiteur Bruxelles, commande en ligne",
  authors: [{ name: "Pain Pâtisserie" }],
  openGraph: {
    title: "Pain Pâtisserie - 3 Boutiques à Bruxelles | Boulangerie Artisanale",
    description: "Pâtisseries fines, gâteaux personnalisés et pain frais dans nos 3 boutiques : Evere, Koekelberg, Molenbeek. Commandes sur mesure pour tous vos événements.",
    url: "https://pain-patisserie.be",
    siteName: "Pain Pâtisserie",
    images: [
      {
        url: "/Logo.svg", // Logo officiel fourni
        width: 800,
        height: 400,
        alt: "Pain Pâtisserie - Logo officiel",
      },
      {
        url: "/photos/webp/comptoir-vueclient.webp", // Image de fallback
        width: 1200,
        height: 630,
        alt: "Comptoir Pain Pâtisserie Bruxelles",
      },
    ],
    locale: "fr_BE",
    type: "website",
  },
   twitter: {
    card: "summary_large_image",
    title: "Pain Pâtisserie - Boulangerie Artisanale Bruxelles",
    description: "3 boutiques à Bruxelles. Gâteaux personnalisés, entremets d'exception, trompe-l'œil créatifs. Evere | Koekelberg | Molenbeek",
    images: ["/Logo.svg"], // Logo officiel
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://pain-patisserie.be',
  },
  metadataBase: new URL('https://pain-patisserie.be'),
  // Métadonnées géographiques pour le SEO local
  other: {
    'geo.region': 'BE-BRU',
    'geo.placename': 'Bruxelles',
    'geo.position': '50.8798;4.7005', // Coordonnées centrales Bruxelles
    'ICBM': '50.8798, 4.7005',
    'DC.title': 'Pain Pâtisserie - Boulangerie Artisanale Bruxelles',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <LocalBusinessSchema />
        <LogoSchema />
        <link rel="icon" href="/Logo.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="shortcut icon" href="/Logo.svg" />
        <link rel="apple-touch-icon" href="/Logo.svg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#d97706" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Pain Pâtisserie" />
        <meta name="geo.region" content="BE-BRU" />
        <meta name="geo.placename" content="Bruxelles" />
        <meta name="geo.position" content="50.8587;4.4085" />
        <meta name="ICBM" content="50.8587, 4.4085" />
        {/* Métadonnées spécifiques au logo pour Google */}
        <meta property="og:logo" content="https://pain-patisserie.be/Logo.svg" />
        <meta name="logo" content="https://pain-patisserie.be/Logo.svg" />
        <link rel="preload" href="/Logo.svg" as="image" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": "https://pain-patisserie.be",
              "name": "Pain Pâtisserie",
              "publisher": {
                "@type": "Organization",
                "name": "Pain Pâtisserie",
                "url": "https://pain-patisserie.be",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://pain-patisserie.be/Logo.svg",
                  "width": 2127,
                  "height": 1191
                }
              }
            })
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans bg-white text-stone-800`}>
        <Navbar />
        <main>{children}</main>
        <Footer /> {/* Ajout du Footer */}
      </body>
    </html>
  );
}
