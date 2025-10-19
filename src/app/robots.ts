import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.painpatisserie.be'
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/', '/_next/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
