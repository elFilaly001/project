"use client";

import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const dataSource = [
    { date: '2025-10-01', brandA: 120, brandB: 90, influencerX: 70 },
    { date: '2025-10-02', brandA: 150, brandB: 80, influencerX: 60 },
    { date: '2025-10-03', brandA: 170, brandB: 100, influencerX: 90 },
    { date: '2025-10-04', brandA: 160, brandB: 110, influencerX: 75 },
    { date: '2025-10-05', brandA: 180, brandB: 95, influencerX: 85 },
];

export default function TopMentions() {
    const labels = dataSource.map((d) => {
        try {
            return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date(d.date));
        } catch {
            return d.date;
        }
    });

    const data = {
        labels,
        datasets: [
            { label: 'brandA', data: dataSource.map((d) => d.brandA), borderColor: '#F02CB9', backgroundColor: 'rgba(240,44,185,0.08)', tension: 0.4, pointRadius: 2 },
            { label: 'brandB', data: dataSource.map((d) => d.brandB), borderColor: '#35B9F4', backgroundColor: 'rgba(53,185,244,0.08)', tension: 0.4, pointRadius: 2 },
            { label: 'influencerX', data: dataSource.map((d) => d.influencerX), borderColor: '#7B61F9', backgroundColor: 'rgba(123,97,249,0.08)', tension: 0.4, pointRadius: 2 },
        ],
    };

    const options: any = { maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } } } };

    return (
        <div className="p-3 bg-white border rounded-md shadow-sm h-full">
            <div className="text-sm font-medium mb-2">Top Mentions (over time)</div>
            <div className="h-40">
                <Line data={data} options={options} />
            </div>
        </div>
    );
}
