'use client';

import Head from 'next/head';

interface SeoProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  imageUrl?: string;
}

export function Seo({ title, description, canonicalUrl, imageUrl }: SeoProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      <meta property="og:type" content="website" />
    </Head>
  );
}
