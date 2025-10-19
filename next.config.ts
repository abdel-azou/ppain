import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Formats supportés par ordre de préférence pour des performances optimales
    formats: ['image/webp', 'image/avif'],
    // Tailles d'images générées automatiquement (mobile-first approach)
    deviceSizes: [375, 768, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Domaines autorisés pour les images externes
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.painpatisserie.be',
        port: '',
        pathname: '/photos/**',
      },
    ],
    // Configuration pour les performances
    minimumCacheTTL: 31536000, // 1 an
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Optimisation des performances
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  // Headers de sécurité
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/:path*.(jpg|jpeg|png|webp|avif|svg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  // Compilation optimisée
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Output pour le déploiement
  output: 'standalone',
};

export default nextConfig;
