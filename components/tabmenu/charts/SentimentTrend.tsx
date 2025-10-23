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

const sampleData = [
    { date: '2025-10-01', positive: 40, neutral: 30, negative: 20 },
    { date: '2025-10-02', positive: 45, neutral: 28, negative: 22 },
    { date: '2025-10-03', positive: 50, neutral: 25, negative: 25 },
    { date: '2025-10-04', positive: 48, neutral: 27, negative: 24 },
    { date: '2025-10-05', positive: 55, neutral: 20, negative: 25 },
];

export default function SentimentTrend() {
    const labels = sampleData.map((d) => {
        try {
            return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date(d.date));
        } catch {
            return d.date;
        }
    });

    const data = {
        labels,
        datasets: [
            {
                label: 'Positive',
                data: sampleData.map((d) => d.positive),
                borderColor: '#F02CB9',
                backgroundColor: 'rgba(240,44,185,0.08)',
                tension: 0.4,
                pointRadius: 2,
            },
            {
                label: 'Neutral',
                data: sampleData.map((d) => d.neutral),
                borderColor: '#35B9F4',
                backgroundColor: 'rgba(53,185,244,0.08)',
                tension: 0.4,
                pointRadius: 2,
            },
            {
                label: 'Negative',
                data: sampleData.map((d) => d.negative),
                borderColor: '#7B61F9',
                backgroundColor: 'rgba(123,97,249,0.08)',
                tension: 0.4,
                pointRadius: 2,
            },
        ],
    };

    const options: any = {
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' },
            tooltip: { mode: 'index', intersect: false },
        },
        scales: {
            x: {
                grid: { display: false },
            },
            y: {
                beginAtZero: true,
                grid: { color: '#f3f4f6' },
            },
        },
    };

    return (
        <div className="p-3 bg-white border rounded-md shadow-sm h-full">
            <div className="text-sm font-medium mb-2">Sentiment Trend</div>
            <div className="h-48">
                <Line data={data} options={options} />
            </div>
        </div>
    );
}
