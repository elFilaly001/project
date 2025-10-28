"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import AiInsightSection from '@/components/AiInsightSection';
import ExplainButton from '@/components/ui/ExplainButton';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const labels = ['Oct 9', 'Oct 10', 'Oct 11', 'Oct 12', 'Oct 13', 'Oct 14', 'Oct 15', 'Oct 16', 'Oct 17', 'Oct 18', 'Oct 19', 'Oct 20'];

const sampleSeries = {
    News: [32000, 25000, 33000, 21000, 26000, 24000, 23000, 20000, 17000, 15000, 14000, 22000],
    WeChat: [25000, 20000, 28000, 7000, 16000, 14000, 13000, 15000, 18000, 11000, 8000, 24000],
    Blogs: [15000, 12000, 18000, 9000, 13000, 14000, 12000, 11000, 10000, 9000, 8000, 16000],
    Broadcast: [12000, 10000, 11000, 8000, 9000, 9500, 9000, 8500, 8000, 7600, 7000, 9500],
    Reddit: [8000, 6000, 7000, 4000, 5000, 4800, 4500, 4200, 3900, 3500, 3000, 5000],
};

export default function MentionsTrendBySourceType() {
    const t = useTranslations();

    const colors: Record<string, string> = {
        News: '#111827',
        WeChat: '#0ea5a4',
        Blogs: '#06b6d4',
        Broadcast: '#f97316',
        Reddit: '#ef4444',
    };

    const datasets = Object.keys(sampleSeries).map((k) => ({
        label: k,
        data: (sampleSeries as any)[k],
        borderColor: colors[k as keyof typeof colors] || '#000',
        backgroundColor: colors[k as keyof typeof colors] || '#000',
        tension: 0.3,
        pointRadius: 0,
    }));

    const data = { labels, datasets };

    const options: any = {
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' }, tooltip: { mode: 'index', intersect: false } },
        scales: { x: { display: true, grid: { display: false }, ticks: { color: '#94a3b8' } }, y: { display: true, beginAtZero: true, ticks: { color: '#94a3b8', callback: (val: any) => Number.isFinite(Number(val)) ? new Intl.NumberFormat('en-US').format(Number(val)) : String(val) } } },
    };

    return (
        <div className="p-3 bg-white border rounded-md shadow-sm">
            <div className="flex items-start justify-between mb-2">
                <div className="text-sm font-medium">{t('social_listening.charts.mentions_trend.title', { default: 'Mentions Trend by Source Type' })}</div>
                <ExplainButton
                    title={t('social_listening.charts.mentions_trend.title', { default: 'Mentions Trend by Source Type' })}
                    description={t('social_listening.charts.mentions_trend.description', { default: 'Trend of mentions over time by source type.' })}
                />
            </div>

            <div className="h-48">
                <Line data={data} options={options} />
            </div>

            <AiInsightSection sentences={[t('social_listening.charts.mentions_trend.insight', { default: 'Mentions trended highest on News and WeChat over the period.' })]} />
        </div>
    );
}
