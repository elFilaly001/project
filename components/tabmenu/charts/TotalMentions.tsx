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
            x: { display: false },
            y: { display: false },
        },
        elements: { line: { borderWidth: 2 } },
    };

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
        </div>
    );
}
