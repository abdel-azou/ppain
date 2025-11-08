import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.votredomaine.be'
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      videos: [
        {
          title: 'Création Artisanale - L\'Art en Mouvement',
          description: 'Découvrez le processus de création unique de nos gâteaux trompe-l\'œil par nos maîtres pâtissiers des Ateliers du Goût',
          content_loc: `${baseUrl}/videos/videoanima.mov`,
          thumbnail_loc: `${baseUrl}/photos/webp/trompeoeil-couleurchaude.webp`,
          duration: 15,
          publication_date: '2025-10-26',
          family_friendly: 'yes',
          tag: 'pâtisserie artisanale, trompe-l\'œil, maître pâtissier, Bruxelles, création gâteau'
        }
      ]
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
}
