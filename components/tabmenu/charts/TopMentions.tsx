"use client";

import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

// sample time-series mentions for top entities
const data = [
    { date: '2025-10-01', brandA: 120, brandB: 90, influencerX: 70 },
    { date: '2025-10-02', brandA: 150, brandB: 80, influencerX: 60 },
    { date: '2025-10-03', brandA: 170, brandB: 100, influencerX: 90 },
    { date: '2025-10-04', brandA: 160, brandB: 110, influencerX: 75 },
    { date: '2025-10-05', brandA: 180, brandB: 95, influencerX: 85 },
];

export default function TopMentions() {
    const formatDate = (d: string) => {
        try {
            return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date(d));
        } catch {
            return d;
        }
    };

    return (
        <div className="p-3 bg-white border rounded-md shadow-sm h-full">
            <div className="text-sm font-medium mb-2">Top Mentions (over time)</div>
            <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={formatDate} />
                        <YAxis />
                        <Tooltip labelFormatter={formatDate} />
                        <Line type="monotone" dataKey="brandA" stroke="#F02CB9" />
                        <Line type="monotone" dataKey="brandB" stroke="#35B9F4" />
                        <Line type="monotone" dataKey="influencerX" stroke="#7B61F9" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
