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
// Default brands palette (used if parent doesn't pass rows)
const defaultBrands = [
    { label: 'Jumia Food', value: 35000, color: '#35B9F4' }, // blue
    { label: 'Yasser Market', value: 25000, color: '#7FDFFF' }, // light blue
    { label: 'Kool', value: 18000, color: '#9A4BF0' }, // purple
    { label: 'Livery', value: 15000, color: '#D46BF8' }, // lavender/pinkish
    { label: 'Creem Food', value: 9000, color: '#F02CB9' }, // pink
];

// Sentiment breakdowns for the five Moroccan competitors (positive / negative).
const defaultPositive = [3500, 2600, 1800, 1500, 800];
const defaultNegative = [4200, 3000, 2000, 1700, 900];

function parseFollowersCount(s: string | number | undefined) {
    if (typeof s === 'number') return s
    if (!s) return 0
    const v = String(s).trim().toUpperCase()
    const clean = v.replace(/[,\s]/g, '')
    const m = clean.match(/^([0-9]*\.?[0-9]+)\s*([KM]?)$/)
    if (!m) return Number(clean) || 0
    const num = parseFloat(m[1])
    const suffix = m[2]
    if (suffix === 'M') return Math.round(num * 1_000_000)
    if (suffix === 'K') return Math.round(num * 1_000)
    return Math.round(num)
}

type BrandRow = { label: string; followers?: string | number; color?: string }

type Props = {
    rows?: BrandRow[]
}

function buildData(labels: string[], values: number[], colors: string[]) {
    return {
        labels,
        datasets: [
            {
                data: values,
                backgroundColor: colors,
                hoverOffset: 6,
            },
        ],
    };
}

export default function ShareOfVoiceByMentionsDonut({ rows }: Props) {
    const t = useTranslations();

    const brands = rows && rows.length > 0 ? rows.map((r, i) => ({ label: r.label, value: parseFollowersCount(r.followers), color: r.color || ['#35B9F4', '#7FDFFF', '#9A4BF0', '#D46BF8', '#F02CB9'][i % 5] })) : defaultBrands

    const positive = rows && rows.length > 0 ? brands.map((b) => Math.round(b.value * 0.1)) : defaultPositive
    const negative = rows && rows.length > 0 ? brands.map((b) => Math.round(b.value * 0.12)) : defaultNegative
    const neutral = brands.map((b, i) => b.value - (positive[i] || 0) - (negative[i] || 0))

    const brandValues = brands.map((b) => b.value)
    const brandColors = brands.map((b) => b.color)

    const labels = brands.map((b) => b.label)
    const mainData = buildData(labels, brandValues, brandColors)
    const posData = buildData(labels, positive, brandColors)
    const negData = buildData(labels, negative, brandColors)
    const neuData = buildData(labels, neutral, brandColors)

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
