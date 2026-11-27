'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, Navigation, CheckCircle2, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

import ArtGallery from '@/components/ArtGallery';
import Testimonials from '@/components/Testimonials';
import './Home.css';
import useEmblaCarousel from 'embla-carousel-react';
import { useCarousel } from '@/hooks/useCarousel';

const specialties = [
	{
		imgSrc: '/photos/webp/trompeoeil-citron.webp',
		alt: "Citron trompe-l'œil magique, quand l'illusion devient plus vraie que nature et transforme la surprise en plaisir gourmand.",
		title: "Gâteaux Trompe-l'œil",
		description: 'L\'art de faire croire à vos yeux ce que vos papilles vont adorer découvrir.',
	},
	{
		imgSrc: '/photos/webp/entremet-paraline_montecristo_foretnoire.webp',
		alt: 'Trio d\'entremets d\'exception : praline dorée, monte-cristo mystérieux et forêt noire romantique, chapitres savoureux de l\'art pâtissier français.',
		title: 'Entremets d\'Exception',
		description: 'L\'art pâtissier français dans toute sa splendeur : praline, monte-cristo, forêt noire.',
	},
	{
		imgSrc: '/photos/webp/pain-baguette.webp',
		alt: 'Baguettes traditionnelles dorées au four, fierté du savoir-faire boulanger français transmis depuis des générations.',
		title: 'Pain Artisanal',
		description: 'Le goût authentique du pain français, pétri à la main chaque matin avec passion.',
	},
	{
		imgSrc: '/photos/webp/mignardise-minipatisserie.webp',
		alt: 'Mignardises délicates et mini-pâtisseries, petits bijoux sucrés parfaits pour vos événements et réceptions.',
		title: 'Mignardises & Mini-Pâtisseries',
		description: 'L\'élégance à la française en format miniature pour vos moments précieux.',
	},
	{
		imgSrc: '/photos/webp/vienoiserie-croissant.webp',
		alt: 'Croissants dorés comme un lever de soleil, promesse croustillante d\'un matin français réussi.',
		title: 'Viennoiseries Traditionnelles',
		description: 'Le petit-déjeuner à la française, celui qui réveille vos sens avant votre café.',
	},
	{
		imgSrc: '/photos/webp/tarte-tartefraise.webp',
		alt: 'Tarte aux fraises de saison, hymne à la nature française où chaque fruit raconte l\'histoire d\'un été parfait.',
		title: 'Tartes aux Fruits Frais',
		description: 'Nos tartes artisanales subliment les fruits de saison pour des saveurs authentiques.',
	},
];

export default function Home() {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
	const { selectedIndex, scrollPrev, scrollNext, scrollTo } = useCarousel(emblaApi);

	return (
		<main id="home">
				<section className="hero-section">
				<div className="hero-background">
					<Image
						src="/photos/webp/comptoir-vueclient.webp"
						alt="Votre premier regard sur notre univers sucré : le comptoir-vitrine où naissent les sourires et se réveillent les envies gourmandes du jour"
						fill
						style={{objectFit: 'cover'}}
						priority
					/>
					<div className="hero-overlay" />
				</div>
				<div className="hero-content">
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
					>
						Boulangerie Pâtisserie Bruxelles
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
					>
						3 boutiques à Bruxelles pour vous servir : Evere, Koekelberg et Molenbeek. Entremets d&apos;exception, pain frais quotidien, trompe-l&apos;œil créatifs et savoir-faire artisanal depuis des générations.
					</motion.p>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
					>
						<div className="hero-cta-buttons">
							<Link href="/gallery" className="cta-button">
								<span>Voir nos créations</span>
								<ArrowRight size={20} />
							</Link>
							<Link href="/events" className="cta-button cta-button-secondary">
								<span>Événements sur mesure</span>
								<Calendar size={20} />
							</Link>
						</div>
					</motion.div>
				</div>
			</section>

			<ArtGallery />

			<section className="content-section incontournables-section">
				<div className="content-container">
					<h2 className="section-title">Nos Incontournables</h2>
					<div className="embla">
						<div className="embla__viewport" ref={emblaRef}>
							<div className="embla__container">
								{specialties.map((item, index) => (
									<div className="embla__slide" key={index}>
										<motion.div
											className="specialty-card"
											initial={{ opacity: 0, y: 20 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true, amount: 0.3 }}
											transition={{ delay: index * 0.2, duration: 0.6, ease: 'easeOut' }}
										>
											<div className="specialty-image-container">
												<Image
													src={item.imgSrc}
													alt={item.alt}
													width={400}
													height={250}
													className="specialty-image"
													loading="lazy"
												/>
											</div>
											<h3>{item.title}</h3>
											<p>{item.description}</p>
										</motion.div>
									</div>
								))}
							</div>
						</div>

						<div className="embla__buttons">
							<button className="embla__button embla__button--prev" onClick={scrollPrev}>
								<ChevronLeft size={32} />
							</button>
							<button className="embla__button embla__button--next" onClick={scrollNext}>
								<ChevronRight size={32} />
							</button>
						</div>

						<div className="embla__dots">
							{specialties.map((_, index) => (
								<button
									key={index}
									onClick={() => scrollTo(index)}
									className={`embla__dot ${index === selectedIndex ? 'embla__dot--selected' : ''}`}
								/>
							))}
						</div>
					</div>
				</div>
			</section>

			<section className="content-section events-section-elaborate">
				<div className="content-container">
					<div className="events-layout">
						<motion.div
							className="events-image-container"
							initial={{ opacity: 0, x: -50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.8, ease: 'easeOut' }}
						>
							<Image
								src="/photos/webp/event-numbercake_baguedemariage.webp"
																alt="Number cake et bague de mariage, quand l'amour se conjugue au présent sucré pour célébrer votre histoire d'amour unique"
								width={600}
								height={750}
								className="events-image"
								loading="lazy"
							/>
						</motion.div>

						<div className="events-content">
							<motion.h2
								className="section-title"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: 0.2 }}
							>
								Une Signature Gourmande Pour Vos Événements
							</motion.h2>
							<motion.div
								className="events-description"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: 0.3 }}
							>
								Du spectaculaire gâteau trompe l&apos;œil à la pièce montée raffinée, nous accompagnons vos moments les plus précieux avec des créations sur mesure.
							</motion.div>

							<ul className="events-feature-list">
								<motion.li
									initial={{ opacity: 0, x: 20 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.5, delay: 0.4 }}
								>
									<CheckCircle2 className="feature-icon" />
									<span>Gâteaux trompe l&apos;œil et pièces montées</span>
								</motion.li>
								<motion.li
									initial={{ opacity: 0, x: 20 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.5, delay: 0.5 }}
								>
									<CheckCircle2 className="feature-icon" />
									<span>Assortiments salés (verrines, mini-sandwichs)</span>
								</motion.li>
								<motion.li
									initial={{ opacity: 0, x: 20 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.5, delay: 0.6 }}
								>
									<CheckCircle2 className="feature-icon" />
									<span>Pauses gourmandes pour entreprises</span>
								</motion.li>
							</ul>

							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: 0.7 }}
							>
								<Link href="/contact" className="events-cta-button">
									Demander un devis
								</Link>
							</motion.div>
						</div>
					</div>
				</div>
			</section>

			<Testimonials />

			<section className="content-section bg-cream">
				<div className="content-container location-grid">
					<div className="location-info">
						<h2 className="section-title">Nos 3 Boutiques à Bruxelles</h2>
						<div className="space-y-3">
							<div className="border-l-4 border-amber-600 pl-4 bg-white p-4 rounded-lg">
								<div className="flex justify-between items-start">
									<div className="flex-1">
										<p className="font-semibold text-amber-800">📍 Evere - Paduwa</p>
										<p className="text-stone-700">Chaussée de Louvain 906<br/>1140 Evere, Bruxelles</p>
										<p className="text-xs text-stone-500 mt-2">Lun, Mer-Dim : 06h-20h | Mar : Fermé</p>
									</div>
									<a
										href="https://waze.com/ul?ll=50.859161991144866,4.413543191474993&navigate=yes"
										target="_blank"
										rel="noopener noreferrer"
										className="ml-3 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center justify-center"
										title="Ouvrir dans Waze"
									>
										<Navigation size={18} />
									</a>
								</div>
							</div>
							<div className="border-l-4 border-amber-600 pl-4 bg-white p-4 rounded-lg">
								<div className="flex justify-between items-start">
									<div className="flex-1">
										<p className="font-semibold text-amber-800">📍 Molenbeek - Karreveld</p>
										<p className="text-stone-700">Chaussée de Gand 402<br/>1080 Molenbeek-Saint-Jean, Bruxelles</p>
										<p className="text-xs text-stone-500 mt-2">Lun, Mer-Dim : 06h-20h | Mar : Fermé</p>
									</div>
									<a
										href="https://waze.com/ul?ll=50.858237997401716,4.319087859461207&navigate=yes"
										target="_blank"
										rel="noopener noreferrer"
										className="ml-3 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center justify-center"
										title="Ouvrir dans Waze"
									>
										<Navigation size={18} />
									</a>
								</div>
							</div>
							<div className="border-l-4 border-amber-600 pl-4 bg-white p-4 rounded-lg">
								<div className="flex justify-between items-start">
									<div className="flex-1">
										<p className="font-semibold text-amber-800">📍 Koekelberg</p>
										<p className="text-stone-700">Rue Émile Sergijsels 34<br/>1081 Koekelberg, Bruxelles</p>
										<p className="text-xs text-stone-500 mt-2">Lun, Mer-Dim : 06h-20h | Mar : Fermé</p>
									</div>
									<a
										href="https://waze.com/ul?ll=50.86000270295589,4.334650008740216&navigate=yes"
										target="_blank"
										rel="noopener noreferrer"
										className="ml-3 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center justify-center"
										title="Ouvrir dans Waze"
									>
										<Navigation size={18} />
									</a>
								</div>
							</div>
						</div>
						<div className="location-buttons">
							<a
								href="https://waze.com/ul?ll=50.8587009,4.4132547&navigate=yes"
								target="_blank"
								rel="noopener noreferrer"
								className="map-button waze-button"
							>
								<Navigation className="button-icon" />
								Evere avec Waze
							</a>
							<a
								href="https://www.google.com/maps/search/Pain+Pâtisserie+Bruxelles"
								target="_blank"
								rel="noopener noreferrer"
								className="map-button gmaps-button"
							>
								<MapPin className="button-icon" />
								Toutes nos boutiques
							</a>
						</div>
					</div>
					<div className="location-map">
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2517.780013592531!2d4.406121376550135!3d50.86781697167618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c3e7a0a99999%3A0x3a3c3b3c3b3c3b3c!2sChauss%C3%A9e%20de%20Louvain%20906%2C%201140%20Evere%2C%20Belgium!5e0!3m2!1sen!2sus!4v1687470000000"
							width="100%"
							height="100%"
							className="location-iframe"
							allowFullScreen={false}
							referrerPolicy="no-referrer-when-downgrade"
							title="Carte de l'emplacement de Pain Pâtisserie à Evere"
						></iframe>
					</div>
				</div>
			</section>
		</main>
	);
}
