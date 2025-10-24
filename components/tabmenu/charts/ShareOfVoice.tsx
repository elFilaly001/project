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
                <p>AI text generation capabilities are transforming the way we create content.</p>
        </div>
    );
}
