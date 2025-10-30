"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ExplainButton from '@/components/ui/ExplainButton';
import AiInsightSection from '@/components/AiInsightSection';

ChartJS.register(ArcElement, Tooltip, Legend);

// sample counts/percents mapped from sentiment buckets (positive, neutral, negative)
// These match the original Share of Voice example: [positive, neutral, negative]
const values = [29, 31, 35];
const colors = ['#F02CB9', '#35B9F4', '#7B61F9'];

export default function ShareOfVoice() {
    const t = useTranslations();
    // Map sentiment buckets to keyword labels (positive -> Keyword A, neutral -> Keyword B, negative -> Keyword C)
    // TODO: replace these sample keywords with dynamic data or props when available
    const keywordLabels = ['توصيل', 'discount', 'fast-food'];

    const dataValues = [...values];
    const dataLabels = [...keywordLabels];
    const palette = [...colors];

    const sum = dataValues.reduce((s, v) => s + v, 0);
    const rest = Math.max(0, 100 - sum);
    if (rest > 0) {
        dataValues.push(rest);
        dataLabels.push(t('social_listening.charts.share_of_voice.other'));
        palette.push('#eef2f7');
    }

    const data = {
        labels: dataLabels,
        datasets: [
            {
                data: dataValues,
                backgroundColor: palette,
                hoverOffset: 6,
            },
        ],
    };

    const total = dataValues.reduce((s, v) => s + v, 0);
    const maxVal = Math.max(...dataValues);
    const maxIndex = dataValues.indexOf(maxVal);
    const topPct = total ? Math.round((maxVal / total) * 100) : 0;

    const slicePercentages = data.datasets[0].data.map((v: number) => (total ? Math.round((v / total) * 100) : 0));

    const options: any = { maintainAspectRatio: false, plugins: { legend: { display: false } } };

    const interpretationSentences = [
        t('social_listening.charts.share_of_voice.interpretation_top', { top: dataLabels[maxIndex], pct: topPct }),
        t('social_listening.charts.share_of_voice.interpretation_others', { others: dataLabels.map((l, i) => `${l} ${slicePercentages[i]}%`).join(', ') }),
    ];

    return (
        <div className="p-3 bg-white border rounded-md shadow-sm h-full">
            <div className="flex items-start justify-between">
                <div className="text-sm font-medium mb-2">{t('social_listening.charts.share_of_voice.title')}</div>
                <ExplainButton
                    title={t('social_listening.charts.share_of_voice.title')}
                    description={t('social_listening.charts.share_of_voice.description')}
                />
            </div>
            <div className="flex items-center justify-center h-44 gap-6">
                <div className="relative w-40 h-40">
                    <Doughnut data={data} options={{ ...options, cutout: '60%' }} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <div className="text-lg font-bold text-gray-800">{topPct}%</div>
                        <div className="text-xs text-gray-500">{dataLabels[maxIndex]}</div>
                    </div>
                </div>

                <div className="flex flex-col space-y-2">
                    {dataLabels.map((label, i) => (
                        <div key={label} className="flex items-center gap-3">
                            <span className="w-4 h-2 rounded-sm inline-block" style={{ background: palette[i] }} />
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
