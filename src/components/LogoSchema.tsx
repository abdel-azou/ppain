import Script from 'next/script';

const LogoSchema = () => {
  const logoStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "url": "https://pain-patisserie.be",
    "name": "Pain Pâtisserie",
    "alternateName": "Les Ateliers du Goût",
    "logo": {
      "@type": "ImageObject",
      "url": "https://pain-patisserie.be/favicon.svg",
      "width": "2127",
      "height": "1191",
      "caption": "Pain Pâtisserie - Logo officiel"
    },
    "image": [
      "https://pain-patisserie.be/favicon.svg"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+32472250578",
      "contactType": "customer service",
      "areaServed": "BE",
      "availableLanguage": ["French", "Dutch"]
    },
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "Chaussée de Louvain 906",
        "addressLocality": "Evere",
        "addressRegion": "Bruxelles-Capitale",
        "postalCode": "1140",
        "addressCountry": "BE"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "Rue Émile Sergijsels 34",
        "addressLocality": "Koekelberg",
        "addressRegion": "Bruxelles-Capitale",
        "postalCode": "1081",
        "addressCountry": "BE"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "Chaussée de Gand 402",
        "addressLocality": "Molenbeek-Saint-Jean",
        "addressRegion": "Bruxelles-Capitale",
        "postalCode": "1080",
        "addressCountry": "BE"
      }
    ],
    "sameAs": [
      "https://pain-patisserie.be",
      "https://www.facebook.com/share/16oudhygiy/",
      "https://www.instagram.com/painpatisserie",
      "https://www.tiktok.com/@painpatisserie"
    ]
  };

  return (
    <Script
      id="logo-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(logoStructuredData),
      }}
    />
  );
};

export default LogoSchema;
