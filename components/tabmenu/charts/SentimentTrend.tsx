"use client";

import React from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const sampleData = [
    { date: '2025-10-01', positive: 40, neutral: 30, negative: 20 },
    { date: '2025-10-02', positive: 45, neutral: 28, negative: 22 },
    { date: '2025-10-03', positive: 50, neutral: 25, negative: 25 },
    { date: '2025-10-04', positive: 48, neutral: 27, negative: 24 },
    { date: '2025-10-05', positive: 55, neutral: 20, negative: 25 },
];

export default function SentimentTrend() {
    // Aggregate sentiment totals across the sample
    const totals = sampleData.reduce(
        (acc, cur) => {
            acc.positive += cur.positive;
            acc.neutral += cur.neutral;
            acc.negative += cur.negative;
            return acc;
        },
        { positive: 0, neutral: 0, negative: 0 }
    );

    const data = {
        labels: ['Positive', 'Neutral', 'Negative'],
        datasets: [
            {
                data: [totals.positive, totals.neutral, totals.negative],
                backgroundColor: ['#F02CB9', '#35B9F4', '#7B61F9'],
                hoverOffset: 6,
            },
        ],
    };

    const total = totals.positive + totals.neutral + totals.negative;
    const positivePct = total ? Math.round((totals.positive / total) * 100) : 0;

    const slicePercentages = data.datasets[0].data.map((v: number) => (total ? Math.round((v / total) * 100) : 0));
    const labels = data.labels as string[];

    const options: any = {
        maintainAspectRatio: false,
        plugins: {
            // hide built-in legend, we render a custom one
            legend: { display: false },
            tooltip: { mode: 'nearest', intersect: false },
        },
    };

    // AI interpretation values
    const totalMentions = total;
    const maxIndex = (data.datasets[0].data as number[]).indexOf(Math.max(...(data.datasets[0].data as number[])));
    const topSentiment = labels[maxIndex];
    const topPct = slicePercentages[maxIndex];
    const interpretationSentences = [
        `Sentiment distribution shows ${topSentiment.toLowerCase()} as the largest share (${topPct}%).`,
        `Out of ${totalMentions} total mentions, ${topPct}% are ${topSentiment.toLowerCase()}.`,
        `Monitor changes to sentiment mix over time — a shift of more than 5% may indicate a meaningful trend.`,
    ];

    return (
        <div className="p-3 bg-white border rounded-md shadow-sm h-full">
            <div className="text-sm font-medium mb-2">Sentiment Trend</div>

            <div className="flex items-center justify-center h-48 gap-6">
                <div className="relative w-40 h-40">
                    <Doughnut data={data} options={{ ...options, cutout: '60%' }} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <div className="text-lg font-bold text-gray-800">{positivePct}%</div>
                        <div className="text-xs text-gray-500">Positive</div>
                    </div>
                </div>

                <div className="flex flex-col space-y-2">
                    {labels.map((label, i) => (
                        <div key={label} className="flex items-center gap-3">
                            <span
                                className="w-4 h-2 rounded-sm inline-block"
                                style={{ background: (data.datasets[0].backgroundColor as string[])[i] }}
                            />
                            <div className="text-sm">
                                <div className="text-sm text-gray-700">{label}</div>
                                <div className="text-xs text-gray-500">{slicePercentages[i]}%</div>
                            </div>
                        </div>
                    ))}
                </div>
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
                        <div className="text-sm font-medium mb-1">AI-powered insight</div>
                        <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">
                            {interpretationSentences.map((s, i) => (
                                <p key={i} className="mb-1">{s}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
