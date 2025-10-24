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
            <div className="text-sm font-medium mb-2">Mentions Distribution by source</div>
            <div className="h-48">
                <Bar data={data} options={options} />
            </div>

            {/* AI interpretation */}
            <div className="pt-3">
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-9 h-9 text-indigo-600">
                            <path d="M12 3c-1.657 0-3 1.343-3 3v1H8a3 3 0 0 0-3 3v1H4a1 1 0 0 0-1 1v1a4 4 0 0 0 4 4h1v1a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3v-1h1a4 4 0 0 0 4-4v-1a1 1 0 0 0-1-1h-1v-1a3 3 0 0 0-3-3h-1V6c0-1.657-1.343-3-3-3z" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8 9h.01M16 9h.01M12 6v.01M10 15h4" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <div className="text-sm font-medium mb-1">AI interpretation</div>
                        <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">
                            {(() => {
                                const totals = dataSource.reduce((acc, r) => {
                                    acc.facebook += r.facebook;
                                    acc.x += r.x;
                                    acc.instagram += r.instagram;
                                    return acc;
                                }, { facebook: 0, x: 0, instagram: 0 });
                                const totalAll = totals.facebook + totals.x + totals.instagram;
                                const entries = [
                                    { label: 'Facebook', val: totals.facebook },
                                    { label: 'X', val: totals.x },
                                    { label: 'Instagram', val: totals.instagram },
                                ];
                                const top = entries.reduce((a, b) => (b.val > a.val ? b : a), entries[0]);
                                const topPct = totalAll ? Math.round((top.val / totalAll) * 100) : 0;
                                return [
                                    `Across ${labels.length} periods, ${top.label} contributed the largest share (${topPct}%).`,
                                    `Total mentions by source: ${entries.map(e => `${e.label} ${e.val}`).join(', ')}.`,
                                ];
                            })().map((s, i) => <p key={i} className="mb-1">{s}</p>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
