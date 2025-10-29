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

// Replace topic labels with generic competitor labels per request
const sample = [
    { label: 'Competitor A', value: 7.9, color: '#0ea5a4' },
    { label: 'Competitor B', value: 29.9, color: '#f59e0b' },
    { label: 'Competitor C', value: 8.6, color: '#f02cb9' },
    { label: 'Competitor D', value: 27.8, color: '#06b6d4' },
    { label: 'Competitor E', value: 25.7, color: '#ef4444' },
];

export default function ShareOfVoiceByMentionsDonut() {
    const t = useTranslations();

    const data = {
        labels: sample.map((s) => s.label),
        datasets: [
            {
                data: sample.map((s) => s.value),
                backgroundColor: sample.map((s) => s.color),
                hoverOffset: 6,
            },
        ],
    };

    const total = sample.reduce((acc, s) => acc + s.value, 0);

    const options: any = {
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { mode: 'nearest' },
        },
    };

    return (
        <div className="p-3 bg-white border rounded-md shadow-sm">
            <div className="flex items-start justify-between mb-2">
                <div className="text-sm font-medium">{t('social_listening.charts.share_of_voice_donut.title', { default: 'Share of Voice by Mentions' })}</div>
                <ExplainButton
                    title={t('social_listening.charts.share_of_voice_donut.title', { default: 'Share of Voice by Mentions' })}
                    description={t('social_listening.charts.share_of_voice_donut.description', { default: 'Breakdown of mentions across topics.' })}
                />
            </div>

            <div className="flex items-center justify-center h-48 gap-6">
                <div className="relative w-40 h-40">
                    <Doughnut data={data} options={{ ...options, cutout: '60%' }} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <div className="text-lg font-bold text-gray-800">{Math.round(total)}%</div>
                        <div className="text-xs text-gray-500">{t('social_listening.charts.share_of_voice_donut.last_period', { default: 'Last 7 days' })}</div>
                    </div>
                </div>

                <div className="flex flex-col space-y-2">
                    {sample.map((s) => (
                        <div key={s.label} className="flex items-center gap-3">
                            <span className="w-4 h-2 rounded-sm inline-block" style={{ background: s.color }} />
                            <div className="text-sm">
                                <div className="text-sm text-gray-700">{s.label}</div>
                                <div className="text-xs text-gray-500">{s.value}%</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <AiInsightSection sentences={[t('social_listening.charts.share_of_voice_donut.insight', { default: 'Autonomous driving and charging speed are the dominant topics in mentions.' })]} />
        </div>
    );
}
