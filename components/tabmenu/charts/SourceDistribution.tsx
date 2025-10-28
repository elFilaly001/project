"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ExplainButton from '@/components/ui/ExplainButton';
import AiInsightSection from '@/components/AiInsightSection';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const dataSource = [
    { month: 'Jan 2024', facebook: 400, x: 300, instagram: 300 },
    { month: 'Feb 2024', facebook: 350, x: 250, instagram: 200 },
    { month: 'Mar 2024', facebook: 300, x: 450, instagram: 250 },
];

export default function SourceDistribution() {
    const t = useTranslations();
    const labels = dataSource.map((d) => d.month);

    const data = {
        labels,
        datasets: [
            { label: 'Facebook', data: dataSource.map((d) => d.facebook), backgroundColor: '#F02CB9' },
            { label: 'X', data: dataSource.map((d) => d.x), backgroundColor: '#35B9F4' },
            { label: 'Instagram', data: dataSource.map((d) => d.instagram), backgroundColor: '#7B61F9' },
        ],
    };

    const options: any = {
        maintainAspectRatio: false,
        plugins: { legend: { position: 'top' } },
        scales: { x: { stacked: true }, y: { stacked: true } },
    };

    // Prepare AI interpretation sentences (kept simple and localized)
    const interpretationSentences = (() => {
        const totals = dataSource.reduce((acc, r) => {
            acc.facebook += r.facebook;
            acc.x += r.x;
            acc.instagram += r.instagram;
            return acc;
        }, { facebook: 0, x: 0, instagram: 0 });
        const totalAll = totals.facebook + totals.x + totals.instagram;
        const entries = [
            { label: 'Facebook', val: totals.facebook },
            { label: 'X', val: totals.x },
            { label: 'Instagram', val: totals.instagram },
        ];
        const top = entries.reduce((a, b) => (b.val > a.val ? b : a), entries[0]);
        const topPct = totalAll ? Math.round((top.val / totalAll) * 100) : 0;
        return [
            t('social_listening.charts.source_distribution.interpretation_top', { periods: labels.length, top: top.label, pct: topPct }),
            t('social_listening.charts.source_distribution.interpretation_totals', { totals: entries.map(e => `${e.label} ${e.val}`).join(', ') }),
        ];
    })();

    return (
        <div className="p-3 bg-white border rounded-md shadow-sm h-full">
            <div className="flex items-start justify-between">
                <div className="text-sm font-medium mb-2">{t('social_listening.charts.source_distribution.title')}</div>
                <ExplainButton
                    title={t('social_listening.charts.source_distribution.title')}
                    description={t('social_listening.charts.source_distribution.description')}
                />
            </div>
            <div className="h-48">
                <Bar data={data} options={options} />
            </div>

            {/* AI interpretation */}
            <AiInsightSection sentences={interpretationSentences} />
        </div>
    );
}
