# Audit SEO / AEO / GEO — pain-patisserie.be
**Date :** 2026-11-26 | **Auditeur :** Claude (seo-aeo-geo-ultimate) | **Statut :** Findings confirmés

---

## Périmètre

| Paramètre | Valeur |
|---|---|
| Domaine | pain-patisserie.be |
| Pages auditées | /, /events, /gallery, /contact, /about |
| Framework | Next.js App Router (src/app) |
| Hébergement | Netlify (auto-deploy sur main) |
| Marché | Bruxelles / Belgique — fr-BE |
| Contraintes client | Pas de prix visibles ; texte validé immuable |

---

## Synthèse des findings

| Priorité | ID | Titre | Fichier | Statut |
|---|---|---|---|---|
| 🔴 CRITIQUE | C1 | Canonical URL placeholder non remplacée | `src/app/page.tsx:61` | À corriger |
| 🔴 CRITIQUE | C2 | robots.txt — syntaxe invalide + conflit avec robots.ts | `public/robots.txt` | À corriger |
| 🔴 CRITIQUE | C3 | FAQPage JSON-LD injecté depuis client component (rendu côté client) | `src/components/EventsFAQ.tsx:93` | À corriger |
| 🟠 IMPORTANT | I1 | Titles trop longs : /events (109 car.), /contact (108), /about (95) | pages.tsx | À corriger |
| 🟠 IMPORTANT | I2 | H1 contient emojis (✨) | `src/app/gallery/gallery-client.tsx` | À corriger |
| 🟠 IMPORTANT | I3 | lang="fr" au lieu de "fr-BE" | `src/app/layout.tsx:85` | À corriger |
| 🟠 IMPORTANT | I4 | Organization.sameAs inclut le propre domaine | `src/components/LogoSchema.tsx:54` | À corriger |
| 🟠 IMPORTANT | I5 | llms.txt absent (404) | — | À créer |
| 🟠 IMPORTANT | I6 | aggregateRating avec données fabricées (4.8 / 150 avis) | `src/components/LocalBusinessSchema.tsx:80` | Discussion client requise |
| 🟠 IMPORTANT | I7 | Div keywords cachés (aria-hidden) — keyword stuffing | `src/components/EventsFAQ.tsx:186` | À corriger |
| 🟡 MINEUR | M1 | OG image = favicon.svg (non optimisé pour partage social) | `src/app/layout.tsx:33` | Recommandé |
| 🟡 MINEUR | M2 | Seo.tsx utilise next/head — pattern déprécié en App Router | `src/components/Seo.tsx` | Nettoyage |
| 🟡 MINEUR | M3 | Sitemap lastModified = new Date() — toutes pages paraissent modifiées | `src/app/sitemap.ts` | Optionnel |
| 🟡 MINEUR | M4 | Contenu page /about très court (texte visible < 500 car.) | `src/app/about/page.tsx` | À enrichir |
| 🟡 MINEUR | M5 | priceRange "€€" dans LocalBusiness — risque d'afficher un prix indirect | `src/components/LocalBusinessSchema.tsx:14` | Vérifier avec client |

---

## Findings détaillés

### C1 — Canonical placeholder "votredomaine.be" (CRITIQUE)

**Fichier :** `src/app/page.tsx`, ligne 61  
**Impact :** Un crawler lisant le tag `<link rel="canonical">` injecté par `<Seo>` trouverait `https://www.votredomaine.be` comme URL canonique de la homepage, signalant à Google que l'URL principale du site est un autre domaine inexistant.  
**Cause :** Le composant `<Seo>` a été laissé avec l'URL placeholder jamais remplacée. En App Router, `next/head` depuis un client component a un comportement non défini ; le tag peut ne pas être envoyé, mais le risque existe.  
**Correction :** Supprimer l'import et l'usage de `<Seo>` dans `page.tsx`. Le `layout.tsx` exporte déjà la bonne metadata canonique `https://pain-patisserie.be` via `alternates.canonical`.

---

### C2 — robots.txt invalide + conflit (CRITIQUE)

**Fichier :** `public/robots.txt` (statique) + `src/app/robots.ts` (Next.js généré)  
**Impact :** Le fichier statique prend la priorité et contient :
- `Disallow: *.json$` → syntaxe glob non standard (refusée par Google)
- `Crawl-delay: 1` → directive ignorée par Googlebot
Les deux fichiers ont des règles différentes, créant une incohérence.  
**Correction :** Supprimer `public/robots.txt` et ne conserver que `src/app/robots.ts`, ou remplacer `public/robots.txt` par un contenu propre sans glob ni Crawl-delay.

---

### C3 — FAQPage JSON-LD rendu côté client (CRITIQUE)

**Fichier :** `src/components/EventsFAQ.tsx`, ligne 93  
**Impact :** Le `<script type="application/ld+json">` est injecté dans un client component avec `useState`. Google peut ne pas l'indexer lors d'un crawl de base car le JS doit être exécuté.  
**Note :** Google indexe généralement le JS rendu, mais avec délai. Pour les données structurées critiques (FAQPage), la sérialisation côté serveur est préférable.  
**Correction :** Extraire le JSON-LD dans le fichier `page.tsx` (server component).

---

### I1 — Titles trop longs

| Page | Titre actuel | Longueur | Recommandé |
|---|---|---|---|
| /events | "Gâteau Mariage & Événements \| Pâtissier Traiteur Evere Bruxelles \| Pièce Montée Sur Mesure - Pain Pâtisserie" | 109 | ≤ 70 |
| /contact | "Contact & Commande - 3 Boutiques Pain Pâtisserie Bruxelles : Evere, Koekelberg, Molenbeek - Pain Pâtisserie" | 108 | ≤ 70 |
| /about | "À Propos - Histoire & Savoir-faire \| Pain Pâtisserie Bruxelles (3 Boutiques) - Pain Pâtisserie" | 95 | ≤ 70 |

Google truncate à ~60-70 caractères dans les SERP. Les mots-clés en fin de titre sont invisibles.

---

### I2 — H1 avec emojis (galerie)

**Fichier :** `src/app/gallery/gallery-client.tsx`  
**Contenu :** `✨ Nos Créations d'Exception ✨`  
**Impact :** Les emojis dans les H1 peuvent créer des problèmes d'indexation, diluer le poids SEO du texte, et apparaître mal dans les SERP snippets.

---

### I3 — lang="fr" au lieu de "fr-BE"

**Fichier :** `src/app/layout.tsx:85`  
**Impact :** Pour un site ciblant la Belgique francophone, `lang="fr-BE"` indique précisément le marché aux moteurs et aux outils d'accessibilité.

---

### I4 — sameAs inclut le propre domaine

**Fichier :** `src/components/LogoSchema.tsx:54`  
**Code :** `"sameAs": ["https://pain-patisserie.be", "https://www.facebook.com/...", ...]`  
**Impact :** `sameAs` doit référencer des **profils externes** prouvant l'identité de l'entité. Inclure son propre domaine est sémantiquement incorrect et peut créer une boucle d'entité dans les moteurs IA.

---

### I5 — llms.txt absent

**URL :** `https://pain-patisserie.be/llms.txt` → 404  
**Impact GEO :** Les moteurs IA génératifs (ChatGPT Search, Perplexity, Claude.ai) utilisent ce fichier Markdown comme profil de découverte. Son absence prive le site d'un signal d'autorité pour les requêtes conversationnelles.  
**Note :** Pas un standard obligatoire, mais recommandé pour la visibilité dans les AI Overviews.

---

### I6 — aggregateRating fabricée

**Fichier :** `src/components/LocalBusinessSchema.tsx:80`  
**Valeur :** `ratingValue: "4.8", reviewCount: "150"`  
**Risque :** Si ces données ne correspondent pas à des avis réels vérifiables (Google Maps, Trustpilot...), Google peut désactiver les rich snippets étoilés pour le site, voire appliquer une action manuelle pour données trompeuses.  
**Correction :** Supprimer le bloc `aggregateRating` si aucun système d'avis vérifié n'est en place, **ou** remplacer par des données réelles issues de Google Maps.

---

### I7 — Div keywords cachés (keyword stuffing)

**Fichier :** `src/components/EventsFAQ.tsx:186`  
**Code :** `<div className="seo-keywords" aria-hidden="true">{keywords.join(', ')}</div>`  
**Impact :** `aria-hidden` cache aux lecteurs d'écran mais **pas** aux crawlers. Google considère ce pattern comme du "keyword stuffing" et peut pénaliser la page. Les mots-clés sont déjà présents dans les vraies FAQ, ce div est superflu.

---

### M1 — OG image = favicon.svg

**Fichier :** `src/app/layout.tsx:33`  
**Impact :** Lors d'un partage sur Facebook/LinkedIn/WhatsApp, le logo SVG apparaît comme aperçu au lieu d'une photo appétissante. Recommandé : une photo 1200×630px du comptoir ou d'une pâtisserie emblématique.

---

## Lane AEO (Answer Engine Optimization)

**FAQPage** : 10 questions bien structurées, réponses directes et complètes. ✓ Le composant `EventsFAQ.tsx` génère le JSON-LD correct mais depuis un client component (voir C3).

**Extractabilité des réponses directes** :
- Les réponses FAQ contiennent des informations précises (délais, adresses, services) facilement extractibles par les moteurs IA. ✓
- Les adresses des 3 boutiques sont présentes dans le footer et les données structurées. ✓
- Les horaires (6h-20h, mardi fermé) sont maintenant cohérents dans toutes les sources. ✓ (fix 1174c1a)

---

## Lane GEO (Generative Engine Optimization)

**Entité principale :** Pain Pâtisserie (Bakery/LocalBusiness)

| Dimension | Résultat |
|---|---|
| Cohérence du nom | ✓ "Pain Pâtisserie" cohérent sur tout le site |
| Coordonnées géographiques | ✓ Cohérentes après fix e95cc1a (Evere : 50.8592, 4.4135) |
| Horaires | ✓ Cohérents après fix 1174c1a (Mo 6h-20h, Ma fermé, Me-Di 6h-20h) |
| Profils sociaux (sameAs) | ⚠️ Facebook / Instagram / TikTok présents ; propre domaine à retirer |
| llms.txt | ✗ Absent |
| Fragmentation d'entité | ⚠️ LocalBusiness + Bakery séparés (@id différents) → peut fragmenter l'entité dans les moteurs IA |
| alternateName "Les Ateliers du Goût" | ✗ Nom fantôme jamais visible sur le site — risque de confusion d'entité |

**Note sur l'alternateName :** `"Les Ateliers du Goût"` apparaissait dans le JSON-LD précédent (relevé dans ai-search-research.md). Vérifier s'il est encore présent et le retirer s'il ne correspond pas à une enseigne réelle.

---

## Lane Technical SEO

| Check | Résultat |
|---|---|
| HTTPS | ✓ Actif |
| Sitemap.xml | ✓ 5 URLs — `lastModified: new Date()` (voir M3) |
| robots.txt | ✗ Syntaxe invalide (voir C2) |
| Core Web Vitals | Non mesuré (hors périmètre sans données Analytics) |
| Image next/image | ✓ Optimisation WebP/AVIF active |
| Security headers | ✓ X-Frame-Options, X-Content-Type-Options en place |
| CSP | ✗ Absent (hors périmètre SEO strict, risque sécurité) |
| metadataBase | ✓ `new URL('https://pain-patisserie.be')` — résolution URLs relatives correcte |

---

## Lane Local SEO

| Check | Résultat |
|---|---|
| 3 adresses en données structurées | ✓ Evere, Koekelberg, Molenbeek |
| Coordonnées GPS | ✓ Cohérentes (après GEO fix) |
| Téléphone formaté | ⚠️ LocalBusinessSchema: `+32472250578` ✓ ; Bakery events: `+32 472 25 05 78` (espaces) — harmoniser |
| geo.region | ✓ BE-BRU |
| Google Business Profile | Hors périmètre (non vérifié) |
| Avis | ⚠️ aggregateRating fabricée (voir I6) |

---

## Plan d'action prioritaire

### Sprint 1 — Corrections critiques (cette session)
1. ~~[C1] Supprimer `<Seo>` avec placeholder de `page.tsx`~~ → À faire
2. ~~[C2] Nettoyer `public/robots.txt`~~ → À faire
3. ~~[I1] Raccourcir les 3 titres de pages~~ → À faire
4. ~~[I2] Retirer emojis du H1 galerie~~ → À faire
5. ~~[I3] lang="fr-BE" dans layout.tsx~~ → À faire
6. ~~[I4] Retirer propre domaine de sameAs~~ → À faire
7. ~~[I5] Créer llms.txt~~ → À faire
8. ~~[I7] Retirer div keywords cachés~~ → À faire

### Sprint 2 — Améliorations (prochaine itération)
9. [C3] Déplacer FAQPage JSON-LD vers server component (page.tsx)
10. [I6] Discuter avec client : supprimer ou remplacer aggregateRating par données réelles Google Maps
11. [M1] Remplacer OG image favicon.svg par une photo 1200×630
12. [M4] Enrichir contenu page /about (< 500 car. de texte visible)
13. Supprimer alternateName "Les Ateliers du Goût" si fantôme confirmé

### Sprint 3 — Optimisations futures
14. Harmoniser format téléphone (`+32472250578` partout)
15. Ajouter SearchAction au schéma WebSite
16. Envisager fusion LocalBusiness + Bakery en une seule entité avec @graph
17. Ajouter Measurement ID Search Console pour monitoring
