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

export default function ShareOfVoiceBySourceType() {
    const t = useTranslations();

    const labels = data.map((d) => d.source);
    // Use generic competitor labels instead of topic-specific labels
    const datasets = [
        { label: 'Jumia Food', data: data.map((d) => d.Acceleration), backgroundColor: '#F02CB9' },
        { label: 'Yasser Market', data: data.map((d) => d.EV_Battery_Life), backgroundColor: '#35B9F4' },
        { label: 'Kool', data: data.map((d) => d.Driving_Range), backgroundColor: '#7B61F9' },
        { label: 'livery', data: data.map((d) => d.Autonomous_Driving), backgroundColor: '#eef2f7' },
        { label: 'Kalix', data: data.map((d) => d.Charging_Speed), backgroundColor: '#1E3A8A' },
    ];

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
