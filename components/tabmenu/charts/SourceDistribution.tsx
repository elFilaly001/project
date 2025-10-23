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
    { month: 'Jan 2024', facebook: 400, x: 300, instagram: 300 },
    { month: 'Feb 2024', facebook: 350, x: 250, instagram: 200 },
    { month: 'Mar 2024', facebook: 300, x: 450, instagram: 250 },
];

export default function SourceDistribution() {
    const labels = dataSource.map((d) => d.month);

    const data = {
        labels,
        datasets: [
            { label: 'Facebook', data: dataSource.map((d) => d.facebook), backgroundColor: '#F02CB9' },
            { label: 'X', data: dataSource.map((d) => d.x), backgroundColor: '#35B9F4' },
            { label: 'Instagram', data: dataSource.map((d) => d.instagram), backgroundColor: '#7B61F9' },
        ],
    };

    const options: any = {
        maintainAspectRatio: false,
        plugins: { legend: { position: 'top' } },
        scales: { x: { stacked: true }, y: { stacked: true } },
    };

    return (
        <div className="p-3 bg-white border rounded-md shadow-sm h-full">
            <div className="text-sm font-medium mb-2">Distribution by source</div>
            <div className="h-48">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
}
