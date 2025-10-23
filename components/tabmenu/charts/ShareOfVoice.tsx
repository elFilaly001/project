"use client";

import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const values = [29, 31, 35];
const colors = ['#F02CB9', '#35B9F4', '#7B61F9'];

export default function ShareOfVoice() {
    return (
        <div className="p-3 bg-white border rounded-md shadow-sm h-full">
            <div className="text-sm font-medium mb-2">Share of voice</div>
            <div className="flex gap-6 items-center justify-center">
                {values.map((v, i) => {
                    const data = [
                        { name: 'share', value: v },
                        { name: 'rest', value: 100 - v },
                    ];

                    return (
                        <div key={i} className="flex flex-col items-center">
                            <div className="relative w-24 h-24">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={data}
                                            dataKey="value"
                                            innerRadius={30}
                                            outerRadius={40}
                                            startAngle={90}
                                            endAngle={-270}
                                            paddingAngle={2}
                                        >
                                            {data.map((entry, idx) => (
                                                <Cell key={idx} fill={idx === 0 ? colors[i] : '#eef2f7'} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value: number) => `${value}%`} />
                                    </PieChart>
                                </ResponsiveContainer>
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
