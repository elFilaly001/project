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

const data = [
    { source: 'Instagram', Acceleration: 4, EV_Battery_Life: 3, Driving_Range: 5, Autonomous_Driving: 2, Charging_Speed: 3 },
    { source: 'Facebook', Acceleration: 3, EV_Battery_Life: 2, Driving_Range: 4, Autonomous_Driving: 1, Charging_Speed: 2 },
    { source: 'X', Acceleration: 6, EV_Battery_Life: 5, Driving_Range: 7, Autonomous_Driving: 4, Charging_Speed: 6 },
    { source: 'TikTok', Acceleration: 5, EV_Battery_Life: 3, Driving_Range: 6, Autonomous_Driving: 2, Charging_Speed: 4 },
    { source: 'YouTube', Acceleration: 8, EV_Battery_Life: 7, Driving_Range: 9, Autonomous_Driving: 6, Charging_Speed: 8 },
    { source: 'LinkedIn', Acceleration: 2, EV_Battery_Life: 1, Driving_Range: 3, Autonomous_Driving: 1, Charging_Speed: 2 },
];

type BrandRow = { label: string; followers?: string | number; color?: string }

type Props = {
    rows?: BrandRow[]
}

export default function ShareOfVoiceBySourceType({ rows }: Props) {
    const t = useTranslations();

    const labels = data.map((d) => d.source);
    // metric keys used per brand (we reuse the same metric slots as before)
    const metricKeys = ['Acceleration', 'EV_Battery_Life', 'Driving_Range', 'Autonomous_Driving', 'Charging_Speed']

    // derive brand list either from rows or defaults
    const brands = rows && rows.length > 0 ? rows.map((r) => ({ label: r.label, color: r.color || '#35B9F4' })) : [
        { label: 'Jumia Food', color: '#35B9F4' },
        { label: 'Yasser Market', color: '#7FDFFF' },
        { label: 'Kool', color: '#9A4BF0' },
        { label: 'Livery', color: '#D46BF8' },
        { label: 'Creem Food', color: '#F02CB9' },
    ]

    const datasets = brands.map((b, i) => ({
        label: b.label,
        data: data.map((d) => (d as any)[metricKeys[i % metricKeys.length]]),
        backgroundColor: b.color,
    }))

    const chartData = { labels, datasets };

    const options: any = {
        indexAxis: 'y',
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } },
        scales: { x: { stacked: true, grid: { display: false } }, y: { stacked: true } },
    };

    return (
        <div className="p-3 bg-white border rounded-md shadow-sm h-full">
            <div className="flex items-start justify-between mb-2">
                <div className="text-sm font-medium">{t('social_listening.charts.share_of_voice_by_source.title', { default: 'Share of Voice by Source Type' })}</div>
                <ExplainButton
                    title={t('social_listening.charts.share_of_voice_by_source.title', { default: 'Share of Voice by Source Type' })}
                    description={t('social_listening.charts.share_of_voice_by_source.description', { default: 'Distribution of topics across source types.' })}
                />
            </div>

            <div className="h-48">
                <Bar data={chartData} options={options} />
            </div>

            <AiInsightSection sentences={[t('social_listening.charts.share_of_voice_by_source.insight', { default: 'Certain topics dominate specific source types; for example, Pinterest shows strong interest in charging and range.' })]} />
        </div>
    );
}
