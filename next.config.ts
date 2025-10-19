import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Formats supportés par ordre de préférence
    formats: ['image/webp', 'image/avif'],
    // Tailles d'images générées automatiquement (mobile-first)
    deviceSizes: [375, 768, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Domaines autorisés pour les images externes
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.votredomaine.be',
        port: '',
        pathname: '/photos/**',
      },
    ],
  },
  // Optimisation des performances
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default nextConfig;
