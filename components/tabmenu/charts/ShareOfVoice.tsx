"use client";

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

// values correspond to sentiment counts/percents: [positive, neutral, negative]
const values = [29, 31, 35];
const colors = ['#F02CB9', '#35B9F4', '#7B61F9'];

export default function ShareOfVoice() {
    // Use sentiment labels (Positive / Neutral / Negative)
    const sentimentLabels = ['Positive', 'Neutral', 'Negative'];

    const dataValues = [...values];
    const dataLabels = [...sentimentLabels];
    const palette = [...colors];

    const sum = dataValues.reduce((s, v) => s + v, 0);
    const rest = Math.max(0, 100 - sum);
    if (rest > 0) {
        dataValues.push(rest);
        dataLabels.push('Other');
        palette.push('#eef2f7');
    }

    const data = {
        labels: dataLabels,
        datasets: [
            {
                data: dataValues,
                backgroundColor: palette,
                hoverOffset: 6,
            },
        ],
    };

    const total = dataValues.reduce((s, v) => s + v, 0);
    const maxVal = Math.max(...dataValues);
    const maxIndex = dataValues.indexOf(maxVal);
    const topPct = total ? Math.round((maxVal / total) * 100) : 0;

    const slicePercentages = data.datasets[0].data.map((v: number) => (total ? Math.round((v / total) * 100) : 0));

    const options: any = { maintainAspectRatio: false, plugins: { legend: { display: false } } };

    return (
        <div className="p-3 bg-white border rounded-md shadow-sm h-full">
            <div className="text-sm font-medium mb-2">Share of voice</div>
            <div className="flex items-center justify-center h-44 gap-6">
                <div className="relative w-40 h-40">
                    <Doughnut data={data} options={{ ...options, cutout: '60%' }} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <div className="text-lg font-bold text-gray-800">{topPct}%</div>
                        <div className="text-xs text-gray-500">{dataLabels[maxIndex]}</div>
                    </div>
                </div>

                <div className="flex flex-col space-y-2">
                    {dataLabels.map((label, i) => (
                        <div key={label} className="flex items-center gap-3">
                            <span className="w-4 h-2 rounded-sm inline-block" style={{ background: palette[i] }} />
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
                            <p className="mb-1">{`Top category is ${dataLabels[maxIndex]} with ${topPct}% of the share of voice.`}</p>
                            <p className="mb-1">{`Other categories: ${dataLabels.map((l, i) => `${l} ${slicePercentages[i]}%`).join(', ')}.`}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
