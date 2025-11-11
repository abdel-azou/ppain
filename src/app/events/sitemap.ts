import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.painpatisserie.be'
    
    // URLs principales événements
    const eventUrls = [
        {
            url: `${baseUrl}/events`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/events/mariage`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/events/anniversaire`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/events/entreprise`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
    ]

    // URLs spécialisées par mots-clés
    const specializedUrls = [
        'gateau-mariage-sur-mesure-evere',
        'piece-montee-traditionnelle-bruxelles', 
        'wedding-cake-moderne-evere',
        'gateau-anniversaire-personnalise',
        'traiteur-entreprise-bruxelles',
        'buffet-sucre-sale-evere',
        'patisserie-evenementielle-bruxelles',
        'gateau-bapteme-communion',
        'fete-enfant-gateau-thematique',
        'number-cake-personnalise-evere'
    ].map(slug => ({
        url: `${baseUrl}/events/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }))

    return [
        ...eventUrls,
        ...specializedUrls
    ]
}
