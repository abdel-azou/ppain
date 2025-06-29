import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // Ajout de l'importation

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "Pain Pâtisserie - Boulangerie & Pâtisserie Artisanale à Bruxelles",
    template: "%s - Pain Pâtisserie",
  },
  description:
    "Pain Pâtisserie à Evere, Bruxelles. Découvrez nos pâtisseries trompe-l'œil, gâteaux sur commande, brunchs, et service traiteur. Boulangerie artisanale de luxe.",
  icons: {
    icon: "/Logo.svg", // Définit le logo comme favicon
  },
  keywords:
    "pâtisserie Bruxelles, boulangerie Evere, trompe l'œil, gâteau sur mesure, traiteur, brunch, click and collect, pâtisserie haut de gamme, artisan boulanger",
  authors: [{ name: "Pain Pâtisserie" }],
  openGraph: {
    title: "Pain Pâtisserie - L'Art de la Gourmandise",
    description: "Pâtisseries fines, créations sur-mesure et saveurs authentiques à Bruxelles.",
    url: "https://www.painpatisserie.be", // Replace with your actual domain
    siteName: "Pain Pâtisserie",
    images: [
      {
        url: "/og-image.jpg", // Path to your Open Graph image
        width: 1200,
        height: 630,
      },
    ],
    locale: "fr_BE",
    type: "website",
  },
   twitter: {
    card: "summary_large_image",
    title: "Pain Pâtisserie - Pâtisserie Artisanale d'Exception",
    description: "Laissez-vous séduire par nos créations uniques, du trompe-l'œil au gâteau de mariage.",
    images: ["/twitter-image.jpg"], // Path to your Twitter image
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} font-sans bg-white text-stone-800`}>
        <Navbar />
        <main>{children}</main>
        <Footer /> {/* Ajout du Footer */}
      </body>
    </html>
  );
}
