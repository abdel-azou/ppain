'use client';

import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface GoogleReview {
  author_name: string;
  author_url: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
}

interface ReviewsData {
  reviews: GoogleReview[];
  rating: number;
  totalRatings: number;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} étoiles sur 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          className={
            star <= rating
              ? 'fill-amber-400 text-amber-400'
              : 'fill-stone-200 text-stone-200'
          }
        />
      ))}
    </div>
  );
}

const GoogleLogo = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

export default function Testimonials() {
  const [data, setData] = useState<ReviewsData | null>(null);

  useEffect(() => {
    fetch('/api/reviews')
      .then((r) => r.json())
      .then((d: ReviewsData) => {
        if (d.reviews?.length > 0) setData(d);
      })
      .catch(() => {});
  }, []);

  if (!data || data.reviews.length === 0) return null;

  return (
    <section className="content-section bg-cream">
      <div className="content-container">
        {/* En-tête */}
        <div className="text-center mb-10">
          <h2 className="section-title">Ce que disent nos clients</h2>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
            <div className="flex gap-0.5" aria-hidden="true">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={18} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-stone-600 text-sm font-medium">
              {data.rating?.toFixed(1)} · {data.totalRatings?.toLocaleString('fr-BE')} avis
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-stone-500 border border-stone-200 rounded-full px-2 py-0.5">
              <GoogleLogo />
              Google Maps
            </span>
          </div>
        </div>

        {/* Grille d'avis */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data.reviews.slice(0, 6).map((review, index) => (
            <motion.a
              key={index}
              href={review.author_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-stone-100 no-underline"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
            >
              {/* Auteur */}
              <div className="flex items-center gap-3 mb-3">
                {review.profile_photo_url ? (
                  <Image
                    src={review.profile_photo_url}
                    alt={review.author_name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover flex-shrink-0"
                    unoptimized
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-amber-700 font-semibold text-sm">
                      {review.author_name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-stone-800 text-sm truncate">
                    {review.author_name}
                  </p>
                  <p className="text-stone-400 text-xs">{review.relative_time_description}</p>
                </div>
              </div>

              {/* Étoiles */}
              <StarRating rating={review.rating} />

              {/* Texte */}
              <p className="mt-2 text-stone-600 text-sm leading-relaxed line-clamp-5">
                {review.text}
              </p>
            </motion.a>
          ))}
        </div>

        {/* Attribution Google (obligatoire selon les CGU) */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-8 text-sm">
          <span className="text-stone-500">Avis vérifiés par</span>
          <a
            href="https://maps.app.goo.gl/ojPWAFZgCKmT4U2m9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-stone-700 hover:text-amber-700 transition-colors"
          >
            <GoogleLogo />
            Google Maps
          </a>
          <span className="text-stone-300">·</span>
          <a
            href="https://maps.app.goo.gl/ojPWAFZgCKmT4U2m9"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-700 hover:text-amber-800 font-medium transition-colors"
          >
            Voir tous les avis →
          </a>
        </div>
      </div>
    </section>
  );
}
