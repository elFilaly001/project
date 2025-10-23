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
    { country: 'USA', positive: 200, neutral: 90, negative: 40 },
    { country: 'France', positive: 80, neutral: 50, negative: 20 },
    { country: 'Morocco', positive: 60, neutral: 30, negative: 15 },
];

export default function CountriesBySentiment() {
    const labels = dataSource.map((d) => d.country);

    const data = {
        labels,
        datasets: [
            { label: 'Positive', data: dataSource.map((d) => d.positive), backgroundColor: '#F02CB9' },
            { label: 'Neutral', data: dataSource.map((d) => d.neutral), backgroundColor: '#35B9F4' },
            { label: 'Negative', data: dataSource.map((d) => d.negative), backgroundColor: '#7B61F9' },
        ],
    };

    const options: any = {
        indexAxis: 'y',
        maintainAspectRatio: false,
        plugins: { legend: { position: 'top' } },
        scales: { x: { stacked: true }, y: { stacked: true } },
    };

    return (
        <div className="p-3 bg-white border rounded-md shadow-sm h-full">
            <div className="text-sm font-medium mb-2">Top Countries by Sentiment</div>
            <div className="h-48">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
}
