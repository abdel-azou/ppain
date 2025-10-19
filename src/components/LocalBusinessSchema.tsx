import React from 'react';

const LocalBusinessSchema = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.painpatisserie.be",
    "name": "Pain Pâtisserie",
    "alternateName": ["Boulangerie Pâtisserie Bruxelles", "Pain & Pâtisserie"],
    "description": "Boulangerie-pâtisserie artisanale à Bruxelles spécialisée en gâteaux personnalisés, entremets d'exception et pain frais quotidien",
    "url": "https://www.painpatisserie.be",
    "telephone": "+32472250578",
    "priceRange": "€€",
    "paymentAccepted": ["Cash", "Credit Card", "Bancontact"],
    "currenciesAccepted": "EUR",
    "openingHours": ["Mo 06:00-20:00", "We-Su 06:00-20:00"],
    "servesCuisine": ["Belgian", "French", "European"],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "50.8587",
        "longitude": "4.4085"
      },
      "geoRadius": "50000"
    },
    "location": [
      {
        "@type": "Place",
        "name": "Pain Pâtisserie Evere",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Chaussée de Louvain 906",
          "addressLocality": "Evere",
          "addressRegion": "Bruxelles",
          "postalCode": "1140",
          "addressCountry": "BE"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "50.859161991144866",
          "longitude": "4.413543191474993"
        }
      },
      {
        "@type": "Place",
        "name": "Pain Pâtisserie Koekelberg",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Rue Émile Sergijsels 34",
          "addressLocality": "Koekelberg",
          "addressRegion": "Bruxelles",
          "postalCode": "1081",
          "addressCountry": "BE"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "50.86000270295589",
          "longitude": "4.334650008740216"
        }
      },
      {
        "@type": "Place",
        "name": "Pain Pâtisserie Molenbeek",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Chaussée de Gand 402",
          "addressLocality": "Molenbeek-Saint-Jean",
          "addressRegion": "Bruxelles",
          "postalCode": "1080",
          "addressCountry": "BE"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "50.858237997401716",
          "longitude": "4.319087859461207"
        }
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    },
    "image": [
      "/photos/webp/comptoir-vueclient.webp",
      "/photos/webp/entremet-paraline_montecristo_foretnoire.webp",
      "/photos/webp/event-numbercake_baguedemariage.webp"
    ],
    "sameAs": [
      "https://www.facebook.com/share/16oudhygiy/",
      "https://www.instagram.com/painpatisserie",
      "https://www.tiktok.com/@painpatisserie"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Produits Pain Pâtisserie",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Gâteaux personnalisés",
            "description": "Gâteaux sur mesure pour mariages, anniversaires, événements"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Entremets d'exception",
            "description": "Entremets fins aux saveurs variées"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Trompe-l'œil créatifs",
            "description": "Créations pâtissières artistiques"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Pain frais quotidien",
            "description": "Pain artisanal cuit chaque jour"
          }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData),
      }}
    />
  );
};

export default LocalBusinessSchema;
