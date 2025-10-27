"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import AiInsightSection from '@/components/AiInsightSection';
import ExplainButton from '@/components/ui/ExplainButton';

ChartJS.register(ArcElement, Tooltip, Legend);

const sampleData = [
    { date: '2025-10-01', positive: 40, neutral: 30, negative: 20 },
    { date: '2025-10-02', positive: 45, neutral: 28, negative: 22 },
    { date: '2025-10-03', positive: 50, neutral: 25, negative: 25 },
    { date: '2025-10-04', positive: 48, neutral: 27, negative: 24 },
    { date: '2025-10-05', positive: 55, neutral: 20, negative: 25 },
];

export default function SentimentTrend() {
    const t = useTranslations();
    // Aggregate sentiment totals across the sample
    const totals = sampleData.reduce(
        (acc, cur) => {
            acc.positive += cur.positive;
            acc.neutral += cur.neutral;
            acc.negative += cur.negative;
            return acc;
        },
        { positive: 0, neutral: 0, negative: 0 }
    );

    const data = {
        labels: [t('social_listening.charts.sentiment.positive'), t('social_listening.charts.sentiment.neutral'), t('social_listening.charts.sentiment.negative')],
        datasets: [
            {
                data: [totals.positive, totals.neutral, totals.negative],
                backgroundColor: ['#F02CB9', '#35B9F4', '#7B61F9'],
                hoverOffset: 6,
            },
        ],
    };

    const total = totals.positive + totals.neutral + totals.negative;
    const positivePct = total ? Math.round((totals.positive / total) * 100) : 0;

    const slicePercentages = data.datasets[0].data.map((v: number) => (total ? Math.round((v / total) * 100) : 0));
    const labels = data.labels as string[];

    const options: any = {
        maintainAspectRatio: false,
        plugins: {
            // hide built-in legend, we render a custom one
            legend: { display: false },
            tooltip: { mode: 'nearest', intersect: false },
        },
    };

    // AI interpretation values
    const totalMentions = total;
    const maxIndex = (data.datasets[0].data as number[]).indexOf(Math.max(...(data.datasets[0].data as number[])));
    const topSentiment = labels[maxIndex];
    const topPct = slicePercentages[maxIndex];
    const interpretationSentences = [
        t('social_listening.charts.sentiment.interpretation_1', { sentiment: topSentiment.toLowerCase(), pct: topPct }),
        t('social_listening.charts.sentiment.interpretation_2', { total: totalMentions, pct: topPct, sentiment: topSentiment.toLowerCase() }),
        t('social_listening.charts.sentiment.interpretation_3'),
    ];

    return (
        <div className="p-3 bg-white border rounded-md shadow-sm h-full">
            <div className="flex items-start justify-between">
                <div className="text-sm font-medium mb-2">{t('social_listening.charts.sentiment.title')}</div>
                <ExplainButton
                    title={t('social_listening.charts.sentiment.title')}
                    description={t('social_listening.charts.sentiment.description')}
                />
            </div>

            <div className="flex items-center justify-center h-48 gap-6">
                <div className="relative w-40 h-40">
                    <Doughnut data={data} options={{ ...options, cutout: '60%' }} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <div className="text-lg font-bold text-gray-800">{positivePct}%</div>
                        <div className="text-xs text-gray-500">{t('social_listening.charts.sentiment.positive')}</div>
                    </div>
                </div>

                <div className="flex flex-col space-y-2">
                    {labels.map((label, i) => (
                        <div key={label} className="flex items-center gap-3">
                            <span
                                className="w-4 h-2 rounded-sm inline-block"
                                style={{ background: (data.datasets[0].backgroundColor as string[])[i] }}
                            />
                            <div className="text-sm">
                                <div className="text-sm text-gray-700">{label}</div>
                                <div className="text-xs text-gray-500">{slicePercentages[i]}%</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* AI interpretation */}
            <AiInsightSection sentences={interpretationSentences} />
        </div>
    );
}
