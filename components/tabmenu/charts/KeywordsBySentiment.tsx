"use client";

import React from 'react';
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const dataSource = [
    { field: 'Technologies', positive: 120, neutral: 60, negative: 20 },
    { field: 'Vehicles', positive: 80, neutral: 40, negative: 10 },
    { field: 'Health', positive: 50, neutral: 30, negative: 5 },
];

export default function KeywordsBySentiment() {
    const labels = dataSource.map((d) => d.field);

    const data = {
        labels,
        datasets: [
            {
                label: 'Positive',
                data: dataSource.map((d) => d.positive),
                backgroundColor: '#F02CB9',
            },
            {
                label: 'Neutral',
                data: dataSource.map((d) => d.neutral),
                backgroundColor: '#35B9F4',
            },
            {
                label: 'Negative',
                data: dataSource.map((d) => d.negative),
                backgroundColor: '#7B61F9',
            },
        ],
    };

    const options: any = {
        indexAxis: 'y',
        maintainAspectRatio: false,
        plugins: { legend: { position: 'top' } },
        scales: {
            x: { stacked: true, grid: { display: false } },
            y: { stacked: true },
        },
    };

    return (
        <div className="p-3 bg-white border rounded-md shadow-sm h-full">
            <div className="text-sm font-medium mb-2">Top Keywords by Sentiment</div>
            <div className="h-48">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
}
