import PricingCard from '../PricingCard';

const pricingData = [
  {
    title: 'Pack Starter (PME / startups / écoles)',
    features: [
      '5 000 mentions / mois',
      '1 utilisateur',
      'Overview Social listening (Mentions, sentiment et keywords)',
      'Analyse Audience',
      'Analyse Posts',
      'Dashboard & exports PDF',
      'Support mail',
    ],
    description: "Cible : petites structures avec un besoin limité de veille.",
    price: "Prix : 36 000 MAD / an (≈ 3 000 MAD / mois)",
    highlightColor: 'from-blue-500 to-pink-400',
  },
  {
    title: 'Pack Pro (Grandes entreprises locales, banques, télécoms, FMCG, institutions)',
    features: [
      '20 000 mentions / mois',
      '5 utilisateurs',
      'Suivi illimité de mots-clés',
      'Overview Social listening',
      'Analyse Détaillée Audience',
      'Analyse détaillée Posts',
  'Veille concurrentielle (jusqu\'à 3 concurrents)',
      'IA avancée : Analyse Mentions (FR / EN / AR + darija basique)',
      'IA avancée : Analyse sentiment (FR / EN / AR + darija basique)',
      'IA avancée : Analyse Keyword (FR / EN / AR + darija basique)',
      'Génération de Rapports détaillés',
      'Support prioritaire (mail + chat)',
    ],
    description: "Cible : organisations avec enjeux réputationnels et stratégiques.",
    price: "Prix : 96 000 MAD / an (≈ 8 000 MAD / mois)",
    highlightColor: 'from-blue-500 to-pink-400',
  },
  {
    title: 'Pack Enterprise (Multinationales, institutions gouvernementales, groupes régionaux)',
    features: [
      'Mentions et utilisateurs illimités',
      'Suivi illimité de mots-clés',
      'Suivi multi-pays et multi-langues (FR, EN, AR, darija)',
        'Vue d\'ensemble Social Listening',
        'Analyse détaillée de l\'audience et des posts',
      'Veille concurrentielle (marques illimitées)',
      'IA avancée : analyses des mentions, sentiments et mots-clés (FR / EN / AR / darija basique)',
      'Rapports trimestriels personnalisés',
      'Alertes en temps réel (crises, buzz, hashtags)',
      'Accès API complet',
      'Support premium (SLA 24h, account manager dédié)',
    ],
    description: "Cible : besoins avancés + analyse multi-pays.",
    price: "Prix : 240 000 MAD / an (≈ 20 000 MAD / mois)",
    highlightColor: 'from-blue-500 to-pink-400',
  },
  {
    title: 'Pack Agence (agences médias, communication, digital)',
    features: [
      '25 000 mentions / mois',
      '5 utilisateurs',
      'Jusqu\'à 5 projets clients séparés (multi-dashboard)',
      'Overview Social listening (Mentions, sentiment et keywords)',
      'Analyse Audience',
      'Analyse Posts',
      'Reporting par client et marque blanche (logo agence)',
      'IA partielle pour integration outils agence',
      'Formation équipe agence incluse',
      'Support prioritaire',
    ],
    description: "Cible : agences qui gèrent plusieurs clients et ont besoin de mutualiser la veille.",
    price: "Prix : 120 000 MAD / an (≈ 10 000 MAD / mois)",
    highlightColor: 'from-blue-500 to-pink-400',
  },
];

export default function PricingPage() {
  return (
    <div className="w-full max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-extrabold text-left text-purple-900 mb-16">PACKS & TARIFICATION</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 gap-y-16">
        {pricingData.map((pack, idx) => (
          <PricingCard key={idx} {...pack} />
        ))}
      </div>
    </div>
  );
}