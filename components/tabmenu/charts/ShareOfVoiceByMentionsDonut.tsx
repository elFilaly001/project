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
import { Smile, Frown, Meh } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);
// Using actual brand counts and sentiment breakdowns to match the example image
const brands = [
    { label: 'Ryanair', value: 66504, color: '#2c7be5' },
    { label: 'Easyjet', value: 25563, color: '#ef4444' },
    { label: 'Vueling Airlines', value: 14710, color: '#06b6d4' },
    { label: 'Jetblue', value: 12820, color: '#7c3aed' },
    { label: 'Volotea', value: 4590, color: '#14b8a6' },
];

const positive = [5111, 2413, 1338, 1276, 245];
const negative = [8618, 3029, 2720, 1862, 329];
const neutral = [45546, 18820, 9885, 9070, 3762];

function buildData(values: number[], colors: string[]) {
    return {
        labels: brands.map((b) => b.label),
        datasets: [
            {
                data: values,
                backgroundColor: colors,
                hoverOffset: 6,
            },
        ],
    };
}

export default function ShareOfVoiceByMentionsDonut() {
    const t = useTranslations();

    const brandValues = brands.map((b) => b.value);
    const brandColors = brands.map((b) => b.color);

    const mainData = buildData(brandValues, brandColors);
    const posData = buildData(positive, brandColors);
    const negData = buildData(negative, brandColors);
    const neuData = buildData(neutral, brandColors);

    const options: any = {
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { mode: 'nearest' },
        },
    };

    const totalMentions = brandValues.reduce((a, b) => a + b, 0);

    // helper to format legend rows (count + percent)
    const legendRows = (values: number[]) => {
        const total = values.reduce((a, b) => a + b, 0) || 1;
        return brands.map((b, i) => ({
            label: b.label,
            color: b.color,
            count: values[i],
            percent: ((values[i] / total) * 100),
        }));
    };

    const mainLegend = legendRows(brandValues);
    const posLegend = legendRows(positive);
    const negLegend = legendRows(negative);
    const neuLegend = legendRows(neutral);

    return (
        <div className="p-3 bg-white border rounded-md shadow-sm">
            <div className="flex items-start justify-between mb-3">
                <div className="text-sm font-medium">{t('social_listening.charts.share_of_voice_donut.title', { default: 'Share of Voice by Mentions' })}</div>
                <ExplainButton
                    title={t('social_listening.charts.share_of_voice_donut.title', { default: 'Share of Voice by Mentions' })}
                    description={t('social_listening.charts.share_of_voice_donut.description', { default: 'Breakdown of mentions across topics.' })}
                />
            </div>

            <div className="grid grid-cols-3 gap-6">
                {/* Left: large donut (spans 2/3) */}
                <div className="col-span-2 flex flex-col">
                    <div className="relative w-full h-64 md:h-72 lg:h-80">
                        <Doughnut data={mainData} options={{ ...options, cutout: '60%' }} />
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <div className="text-2xl font-bold text-gray-800">{totalMentions.toLocaleString()}</div>
                            <div className="text-xs text-gray-500">{t('social_listening.charts.share_of_voice_donut.last_period', { default: 'Jan 06, 2023 - Feb 04, 2023' })}</div>
                        </div>
                    </div>

                    {/* bottom compact legend, centered under the big donut and wraps as needed */}
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-600">
                        {mainLegend.map((l) => (
                            <div key={l.label} className="flex items-center gap-2">
                                <span className="w-3 h-2 rounded-sm inline-block" style={{ background: l.color }} />
                                <span className="whitespace-nowrap">{l.label}: {l.count.toLocaleString()} ({l.percent.toFixed(1)}%)</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: three small donuts (1/3) */}
                <div className="col-span-1 flex flex-col gap-3">
                    {/* Positive */}
                    <div className="flex items-center gap-3 p-2 border rounded-md">
                        <div className="w-20 h-20 relative">
                            <Doughnut data={posData} options={{ ...options, cutout: '70%' }} />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Smile className="w-4 h-4 text-green-600" />
                                    <div className="text-xs font-medium">{t('social_listening.charts.share_of_voice_donut.positive', { default: 'Share of Positive' })}</div>
                                </div>
                            </div>
                            <div className="mt-2 text-xs text-gray-600">
                                {posLegend.map((l) => (
                                    <div key={l.label} className="flex items-center gap-2">
                                        <span className="w-2 h-2 inline-block rounded-sm" style={{ background: l.color }} />
                                        <span className="truncate">{l.count.toLocaleString()} ({l.percent.toFixed(2)}%)</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Negative */}
                    <div className="flex items-center gap-3 p-2 border rounded-md">
                        <div className="w-20 h-20 relative">
                            <Doughnut data={negData} options={{ ...options, cutout: '70%' }} />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Frown className="w-4 h-4 text-red-600" />
                                    <div className="text-xs font-medium">{t('social_listening.charts.share_of_voice_donut.negative', { default: 'Share of Negative' })}</div>
                                </div>
                            </div>
                            <div className="mt-2 text-xs text-gray-600">
                                {negLegend.map((l) => (
                                    <div key={l.label} className="flex items-center gap-2">
                                        <span className="w-2 h-2 inline-block rounded-sm" style={{ background: l.color }} />
                                        <span className="truncate">{l.count.toLocaleString()} ({l.percent.toFixed(2)}%)</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Neutral */}
                    <div className="flex items-center gap-3 p-2 border rounded-md">
                        <div className="w-20 h-20 relative">
                            <Doughnut data={neuData} options={{ ...options, cutout: '70%' }} />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Meh className="w-4 h-4 text-gray-500" />
                                    <div className="text-xs font-medium">{t('social_listening.charts.share_of_voice_donut.neutral', { default: 'Share of Neutral' })}</div>
                                </div>
                            </div>
                            <div className="mt-2 text-xs text-gray-600">
                                {neuLegend.map((l) => (
                                    <div key={l.label} className="flex items-center gap-2">
                                        <span className="w-2 h-2 inline-block rounded-sm" style={{ background: l.color }} />
                                        <span className="truncate">{l.count.toLocaleString()} ({l.percent.toFixed(2)}%)</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AiInsightSection sentences={[t('social_listening.charts.share_of_voice_donut.insight', { default: 'Ryanair dominates mentions; positive/neutral/negative splits are shown on the right.' })]} />
        </div>
    );
}
