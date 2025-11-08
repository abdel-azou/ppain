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
      "url": "https://pain-patisserie.be/Logo.svg",
      "width": "2127",
      "height": "1191",
      "caption": "Pain Pâtisserie - Logo officiel"
    },
    "image": [
      "https://pain-patisserie.be/Logo.svg"
    ],
    "sameAs": [
      "https://pain-patisserie.be"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+32-2-XXX-XXXX",
      "contactType": "customer service",
      "areaServed": "BE",
      "availableLanguage": ["French", "Dutch"]
    },
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "Avenue des Tilleuls",
        "addressLocality": "Evere",
        "addressRegion": "Bruxelles-Capitale",
        "postalCode": "1140",
        "addressCountry": "BE"
      },
      {
        "@type": "PostalAddress", 
        "streetAddress": "Rue de la Paroisse",
        "addressLocality": "Koekelberg",
        "addressRegion": "Bruxelles-Capitale",
        "postalCode": "1081",
        "addressCountry": "BE"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "Chaussée de Gand",
        "addressLocality": "Molenbeek-Saint-Jean",
        "addressRegion": "Bruxelles-Capitale", 
        "postalCode": "1080",
        "addressCountry": "BE"
      }
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
