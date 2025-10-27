"use client";

import AiInsightSection from '@/components/AiInsightSection';
import React from 'react';
import ExplainButton from '@/components/ui/ExplainButton';
import { useTranslations } from 'next-intl';

const dataSource = [
    { date: '2025-10-01', brandA: 120, brandB: 90, influencerX: 70 },
    { date: '2025-10-02', brandA: 150, brandB: 80, influencerX: 60 },
    { date: '2025-10-03', brandA: 170, brandB: 100, influencerX: 90 },
    { date: '2025-10-04', brandA: 160, brandB: 110, influencerX: 75 },
    { date: '2025-10-05', brandA: 180, brandB: 95, influencerX: 85 },
];

function formatCompact(n: number) {
    if (n >= 1_000_000_000) return `${Math.round(n / 1_000_000_000)}B`;
    if (n >= 1_000_000) return `${Math.round(n / 1_000_000)}M`;
    if (n >= 1_000) return `${Math.round(n / 1_000)}k`;
    return String(n);
}

export default function TopMentions() {
    const t = useTranslations();
    // compute total mentions across all series and dates
    const total = dataSource.reduce((sum, row) => sum + row.brandA + row.brandB + row.influencerX, 0);

    // AI interpretation values
    const totalsBySource = dataSource.reduce(
        (acc, r) => {
            acc.brandA += r.brandA;
            acc.brandB += r.brandB;
            acc.influencerX += r.influencerX;
            return acc;
        },
        { brandA: 0, brandB: 0, influencerX: 0 }
    );
    const entries = [
        { key: 'brandA', label: 'Brand A', val: totalsBySource.brandA },
        { key: 'brandB', label: 'Brand B', val: totalsBySource.brandB },
        { key: 'influencerX', label: 'Influencer X', val: totalsBySource.influencerX },
    ];
    const top = entries.reduce((a, b) => (b.val > a.val ? b : a), entries[0]);
    const topPct = total ? Math.round((top.val / total) * 100) : 0;
    const interpretationSentences = [
        t('social_listening.charts.top_mentions.interpretation_total', { total }),
        t('social_listening.charts.top_mentions.interpretation_top', { label: top.label, val: top.val, pct: topPct }),
        t('social_listening.charts.top_mentions.interpretation_action', { label: top.label }),
    ];

    return (
        <div className="p-3 bg-white border rounded-md shadow-sm h-full flex flex-col items-start justify-center">
            <div className="flex items-start justify-between w-full">
                <div className="text-xs text-gray-500">{t('social_listening.charts.top_mentions.heading')}</div>
                <ExplainButton
                    title={t('social_listening.charts.top_mentions.title')}
                    description={t('social_listening.charts.top_mentions.description')}
                />
            </div>
            <div className="text-4xl font-extrabold text-gray-900 mt-2">{formatCompact(total)}</div>
            <div className="text-sm text-gray-500 mt-1">{t('social_listening.charts.top_mentions.last_n_days', { days: 14 })}</div>

            {/* AI interpretation */}
            <AiInsightSection sentences={interpretationSentences} />
        </div>
    );
}
