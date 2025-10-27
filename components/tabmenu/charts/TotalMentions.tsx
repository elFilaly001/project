"use client";

import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import AiInsightSection from '@/components/AiInsightSection';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

const labels = ['Dec 20', 'Dec 21', 'Dec 22', 'Dec 23', 'Dec 24', 'Dec 25', 'Dec 26'];
const dataPoints = [350, 50, 50, 319, 30, 20, 20]; // sums to 839

export default function TotalMentions() {
    const total = dataPoints.reduce((s, v) => s + v, 0);
    const dailyAvg = Math.round(total / labels.length);

    // sample previous-period values (replace with real values when wiring data)
    const prevDataPoints = [300, 60, 40, 280, 40, 15, 4];
    const prevTotal = prevDataPoints.reduce((s, v) => s + v, 0);
    const prevDailyAvg = Math.round(prevTotal / labels.length);

    const totalGrowth = prevTotal ? Math.round(((total - prevTotal) / prevTotal) * 100) : 0;
    const dailyGrowth = prevDailyAvg ? Math.round(((dailyAvg - prevDailyAvg) / prevDailyAvg) * 100) : 0;

    const data = {
        labels,
        datasets: [
            {
                label: 'Mentions',
                data: dataPoints,
                borderColor: 'rgba(37,99,235,1)',
                backgroundColor: 'rgba(59,130,246,0.15)',
                tension: 0.3,
                fill: true,
                pointRadius: 0,
            },
        ],
    };

    const options: any = {
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false } },
        scales: {
            x: {
                display: true,
                grid: { display: false },
                ticks: {
                    color: '#94a3b8',
                    maxRotation: 0,
                    autoSkip: true,
                },
            },
            y: {
                display: true,
                beginAtZero: true,
                grid: { color: 'rgba(15,23,42,0.03)' },
                ticks: {
                    color: '#94a3b8',
                    callback: function (val: any) {
                        // Chart.js may pass an object in some typings; ensure a number
                        const v = (typeof val === 'number') ? val : Number(val);
                        return Number.isFinite(v) ? v.toLocaleString() : String(val);
                    },
                },
            },
        },
        elements: { line: { borderWidth: 2 } },
    };

    // Prepare AI interpretation values (computed here so JSX stays clean)
    const peakIndex = dataPoints.indexOf(Math.max(...dataPoints));
    const peakLabel = labels[peakIndex];
    const peakValue = dataPoints[peakIndex];

    let biggestChange = { val: 0, from: labels[0], to: labels[0] };
    for (let i = 1; i < dataPoints.length; i++) {
        const diff = dataPoints[i] - dataPoints[i - 1];
        if (Math.abs(diff) > Math.abs(biggestChange.val)) {
            biggestChange = { val: diff, from: labels[i - 1], to: labels[i] };
        }
    }

    const overall = totalGrowth >= 0 ? `increased ${Math.abs(totalGrowth)}%` : `decreased ${Math.abs(totalGrowth)}%`;
    const avgChange = dailyGrowth >= 0 ? `up ${Math.abs(dailyGrowth)}%` : `down ${Math.abs(dailyGrowth)}%`;

    const changeSentence = biggestChange.val >= 0
        ? `The largest day-to-day change was an increase of ${biggestChange.val} mentions from ${biggestChange.from} to ${biggestChange.to}.`
        : `The largest day-to-day change was a decrease of ${Math.abs(biggestChange.val)} mentions from ${biggestChange.from} to ${biggestChange.to}.`;

    const interpretationSentences = [];
    if (total === prevTotal) {
        interpretationSentences.push('Overall mentions were stable compared to the previous period.');
    } else {
        interpretationSentences.push(`Overall mentions ${overall} vs the previous period.`);
    }
    interpretationSentences.push(`Daily average is ${dailyAvg} (${avgChange}).`);
    interpretationSentences.push(`The series peaks on ${peakLabel} with ${peakValue} mentions.`);
    interpretationSentences.push(changeSentence);

    return (
        <div className="p-3 bg-white border rounded-md shadow-sm h-full">
            <div className="flex items-start justify-between">
                <h3 className="text-sm font-medium mb-2">Total Mentions</h3>
                <div className="text-xs text-gray-400">{/* placeholder for actions */}</div>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <div className="flex gap-4 items-center">
                    <div className="flex-1">
                        <div className="flex items-baseline gap-3">
                            <div className="text-2xl font-bold text-gray-800">{total}</div>
                            <div className={"text-sm font-medium " + (totalGrowth >= 0 ? 'text-green-600' : 'text-red-600')}>
                                {totalGrowth >= 0 ? `+${totalGrowth}%` : `${totalGrowth}%`}
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="text-sm font-medium text-slate-600">Daily Average</div>
                        <div className="flex items-baseline gap-3">
                            <div className="text-xl font-semibold text-gray-800">{dailyAvg}</div>
                            <div className={"text-sm font-medium " + (dailyGrowth >= 0 ? 'text-green-600' : 'text-red-600')}>
                                {dailyGrowth >= 0 ? `+${dailyGrowth}%` : `${dailyGrowth}%`}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-36">
                    <Line data={data} options={options} />
                </div>
            </div>

            {/* AI-generated interpretation of the chart */}
            <AiInsightSection sentences={interpretationSentences} />
        </div>
    );
}
