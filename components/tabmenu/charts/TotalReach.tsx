"use client";

import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip);

const dataSource = [
    { date: '2025-10-01', reach: 1200 },
    { date: '2025-10-02', reach: 1500 },
    { date: '2025-10-03', reach: 1800 },
    { date: '2025-10-04', reach: 1700 },
    { date: '2025-10-05', reach: 2000 },
];

export default function TotalReach() {
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
            {
                label: 'Reach',
                data: dataSource.map((d) => d.reach),
                borderColor: '#35B9F4',
                backgroundColor: 'rgba(214,244,255,0.6)',
                fill: true,
                tension: 0.4,
                pointRadius: 0,
            },
        ],
    };

    const options: any = { maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } } } };

    return (
        <div className="p-3 bg-white border rounded-md shadow-sm h-full">
            <div className="text-sm font-medium mb-2">Total Reach</div>
            <div className="h-40">
                <Line data={data} options={options} />
            </div>
        </div>
    );
}
