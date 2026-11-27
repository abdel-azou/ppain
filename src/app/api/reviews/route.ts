import { NextResponse } from 'next/server';

export const revalidate = 86400; // 24h cache

const PLACE_QUERY = 'Pain Patisserie Chaussée de Louvain 906 Evere Bruxelles';

interface GoogleReview {
  author_name: string;
  author_url: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
}

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ reviews: [], error: 'not_configured' });
  }

  try {
    // Étape 1 : Trouver le place_id via text search
    const findRes = await fetch(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json` +
        `?input=${encodeURIComponent(PLACE_QUERY)}&inputtype=textquery` +
        `&fields=place_id,rating,user_ratings_total&key=${apiKey}`,
      { next: { revalidate: 86400 } }
    );

    const findData = await findRes.json();
    const candidate = findData.candidates?.[0];
    const placeId = candidate?.place_id;

    if (!placeId) {
      return NextResponse.json({ reviews: [], error: 'place_not_found' });
    }

    // Étape 2 : Récupérer les avis
    const detailsRes = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json` +
        `?place_id=${placeId}&fields=reviews,rating,user_ratings_total` +
        `&language=fr&reviews_sort=most_relevant&key=${apiKey}`,
      { next: { revalidate: 86400 } }
    );

    const detailsData = await detailsRes.json();
    const result = detailsData.result;

    const reviews: GoogleReview[] = (result?.reviews ?? []).filter(
      (r: GoogleReview) => r.rating >= 4 && r.text?.trim().length > 20
    );

    return NextResponse.json(
      {
        reviews,
        rating: result?.rating ?? candidate?.rating,
        totalRatings: result?.user_ratings_total ?? candidate?.user_ratings_total,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=172800',
        },
      }
    );
  } catch {
    return NextResponse.json({ reviews: [], error: 'fetch_failed' });
  }
}
