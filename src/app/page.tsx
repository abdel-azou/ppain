'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, Navigation, CheckCircle2, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Seo } from '../components/Seo';
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
		imgSrc: '/photos/webp/sale-burgerauthentique.webp',
		alt: 'Sandwich authentique fait maison, alliance parfaite entre tradition boulangère et saveurs généreuses du terroir.',
		title: 'Restauration Salée',
		description: 'Sandwichs artisanaux, plats du terroir et en-cas gourmands pour tous les moments.',
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
		title: 'Pâtisseries de Saison',
		description: 'Quand mère Nature inspire nos pâtissiers pour des créations éphémères.',
	},
];

export default function Home() {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
	const { selectedIndex, scrollPrev, scrollNext, scrollTo } = useCarousel(emblaApi);

	return (
		<main id="home">
				<Seo
				title="Boulangerie Pâtisserie Artisanale | Pain Frais, Trompe-l'œil, Mignardises - Evere Bruxelles"
				description="Boulangerie-pâtisserie artisanale à Evere : pain frais quotidien, gâteaux trompe-l'œil uniques, mignardises, viennoiseries et restauration salée. Savoir-faire traditionnel depuis des générations."
				canonicalUrl="https://www.votredomaine.be"
				imageUrl="https://www.votredomaine.be/photos/webp/comptoir-vueclient.webp"
			/>			<section className="hero-section">
				<div className="hero-background">
					<Image
						src="/photos/webp/comptoir-vueclient.webp"
						alt="Votre premier regard sur notre univers sucré : le comptoir-vitrine où naissent les sourires et se réveillent les envies gourmandes du jour"
						layout="fill"
						objectFit="cover"
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
						À Evere, le bon goût ne trompe pas.
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
					>
						Boulangerie-pâtisserie artisanale à Evere : pain frais quotidien, trompe-l&apos;œil créatifs, mignardises raffinées et restauration salée maison. L&apos;authenticité du savoir-faire traditionnel.
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

			<section className="content-section bg-cream">
				<div className="content-container">
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, ease: 'easeOut' }}
					>
						<h2 className="text-3xl font-bold text-stone-800 mb-4 text-center">
							L&apos;Artisanat au Cœur de Nos Pâtisseries
						</h2>
						<p className="lead text-center max-w-2xl mx-auto">
							Bienvenue chez Pain Pâtisserie. Nous sélectionnons des ingrédients de première qualité pour créer des pains, viennoiseries et pâtisseries qui éveillent les sens chaque jour.
						</p>
					</motion.div>
				</div>
			</section>

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

			<section className="content-section bg-cream">
				<div className="content-container location-grid">
					<div className="location-info">
						<h2 className="section-title">Rendez-nous visite</h2>
						<p className="location-address">
							<strong>Pain Pâtisserie</strong>
							<br />
							Chaussée de Louvain 906
							<br />
							1140 Evere, Bruxelles
						</p>
						<p className="location-hours">
							<strong>Horaires :</strong>
							<br />
							Lundi, Mer-Dim : 06h00 - 20h00
							<br />
							Mardi : Fermé
						</p>
						<div className="location-buttons">
							<a
								href="https://waze.com/ul?ll=50.8587009,4.4132547&navigate=yes"
								target="_blank"
								rel="noopener noreferrer"
								className="map-button waze-button"
							>
								<Navigation className="button-icon" />
								Itinéraire avec Waze
							</a>
							<a
								href="https://www.google.com/maps/dir/?api=1&destination=Chaussée+de+Louvain+906,+1140+Evere"
								target="_blank"
								rel="noopener noreferrer"
								className="map-button gmaps-button"
							>
								<MapPin className="button-icon" />
								Itinéraire avec Google Maps
							</a>
						</div>
					</div>
					<div className="location-map">
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2517.780013592531!2d4.406121376550135!3d50.86781697167618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c3e7a0a99999%3A0x3a3c3b3c3b3c3b3c!2sChauss%C3%A9e%20de%20Louvain%20906%2C%201140%20Evere%2C%20Belgium!5e0!3m2!1sen!2sus!4v1687470000000"
							width="100%"
							height="100%"
							style={{ border: 0 }}
							allowFullScreen={false}
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
							title="Carte de l'emplacement de Pain Pâtisserie à Evere"
						></iframe>
					</div>
				</div>
			</section>
		</main>
	);
}
