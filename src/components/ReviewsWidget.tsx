'use client';

import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface Review {
  name: string;
  text: string;
  rating: number;
}

const reviews: Review[] = [
	{
		name: 'Marie D.',
		text: 'Les meilleurs croissants de Bruxelles ! Le trompe-l’œil est à tomber. Je recommande vivement.',
		rating: 5,
	},
	{
		name: 'Julien L.',
		text: "Service traiteur impeccable pour notre événement d'entreprise. Tout était délicieux et magnifiquement présenté.",
		rating: 5,
	},
	{
		name: 'Clara V.',
		text: 'Le brunch du dimanche est un pur régal. Des produits frais, de la créativité et un service au top.',
		rating: 5,
	},
];

export default function ReviewsWidget() {
	return (
		<motion.div
			className="bg-white p-8 rounded-lg shadow-lg"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5, delay: 0.4 }}
		>
			<h3 className="text-xl font-bold mb-4">Nos clients nous adorent</h3>
			<div className="space-y-4">
				{reviews.map((review, index) => (
					<div key={index} className="border-t border-stone-200 pt-4">
						<div className="flex justify-between items-center">
							<p className="font-semibold text-stone-800">{review.name}</p>
							<div className="flex text-amber-500">
								{[...Array(review.rating)].map((_, i) => (
									<Star key={i} size={16} fill="currentColor" />
								))}
							</div>
						</div>
						<p className="text-stone-600 mt-1">&quot;{review.text}&quot;</p>
					</div>
				))}
			</div>
		</motion.div>
	);
}
