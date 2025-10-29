import React from "react";
import AiInsightSection from "./AiInsightSection";
import { useTranslations } from 'next-intl';

const interests = [
  { id: 'friends', percent: 35 },
  { id: 'clothes', percent: 28 },
  { id: 'toys', percent: 26 },
  { id: 'restaurants', percent: 24 },
  { id: 'camera', percent: 23 },
];

export default function InterestAffinityCard() {
  const t = useTranslations();

  // AI interpretation logic
  const top = interests.reduce((a, b) => (b.percent > a.percent ? b : a), interests[0]);
  const interpretationSentences = [
    t('audience.interest_affinity.interpretation.top', {
      label: t(`audience.interest_affinity.list.${top.id}`),
      percent: top.percent,
    }),
    t('audience.interest_affinity.interpretation.tailor'),
    t('audience.interest_affinity.interpretation.diversify'),
  ];

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
      {/* header (same look as other cards) */}
      <div className="flex items-start justify-between">
        <h3 className="text-gray-700 font-semibold">{t('audience.interest_affinity.title')}</h3>

        {/* tooltip (same pattern as FollowerCredibilityCard / BrandAffinityCard) */}
        <div className="relative group">
          <button
            type="button"
            aria-describedby="interest-tooltip"
            className="text-gray-400 text-xs leading-none px-2 py-1 rounded hover:bg-gray-50"
          >
            <span className="sr-only">{t('audience.interest_affinity.tooltip_aria')}</span>?
          </button>

          <div
            id="interest-tooltip"
            role="tooltip"
            aria-hidden="true"
            style={{ top: "100%" }}
            className="absolute left-1/2 z-20 -translate-x-1/2 mt-2 w-80 bg-slate-800 text-white text-sm rounded-xl px-4 py-3 shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"
          >
            {t('audience.interest_affinity.tooltip')}
          </div>
        </div>
      </div>

      {/* body */}
      <div className="mt-4 flex flex-col divide-y divide-gray-100">
        {interests.map((i) => (
          <div key={i.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
            <span className="text-gray-600 text-sm font-medium flex-1">{t(`audience.interest_affinity.list.${i.id}`)}</span>
            <span className="text-gray-600 text-xs font-semibold min-w-[32px] text-right">
              {i.percent}%
            </span>
          </div>
        ))}
      </div>

      {/* AI interpretation */}
      <AiInsightSection sentences={interpretationSentences} />
    </div>
  );
}
