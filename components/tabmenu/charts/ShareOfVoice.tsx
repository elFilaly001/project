"use client";

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const values = [29, 31, 35];
const colors = ['#F02CB9', '#35B9F4', '#7B61F9'];

export default function ShareOfVoice() {
    return (
        <div className="p-3 bg-white border rounded-md shadow-sm h-full">
            <div className="text-sm font-medium mb-2">Share of voice</div>
            <div className="flex gap-6 items-center justify-center">
                {values.map((v, i) => {
                    const data = {
                        labels: ['share', 'rest'],
                        datasets: [
                            {
                                data: [v, 100 - v],
                                backgroundColor: [colors[i], '#eef2f7'],
                                hoverOffset: 4,
                            },
                        ],
                    };

                    const options: any = { maintainAspectRatio: false, plugins: { legend: { display: false } } };

                    return (
                        <div key={i} className="flex flex-col items-center">
                            <div className="relative w-24 h-24">
                                <Doughnut data={data} options={{
                                    ...options,
                                    cutout: '60%'
                                }} />
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="text-lg font-bold text-gray-800">{v}%</div>
                                </div>
                            </div>
                            <div className="text-sm text-gray-600 mt-2">{i === 0 ? 'Jan 2024' : i === 1 ? 'Feb 2024' : 'Mar 2024'}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
