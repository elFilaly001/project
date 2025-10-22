"use client";

import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const sampleData = [
    { date: '2025-10-01', positive: 40, neutral: 30, negative: 20 },
    { date: '2025-10-02', positive: 45, neutral: 28, negative: 22 },
    { date: '2025-10-03', positive: 50, neutral: 25, negative: 25 },
    { date: '2025-10-04', positive: 48, neutral: 27, negative: 24 },
    { date: '2025-10-05', positive: 55, neutral: 20, negative: 25 },
];

export default function SentimentTrend() {
    const formatDate = (d: string) => {
        try {
            return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date(d));
        } catch {
            return d;
        }
    };

    return (
        <div className="p-3 bg-white border rounded-md shadow-sm h-full">
            <div className="text-sm font-medium mb-2">Sentiment Trend</div>
            <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sampleData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={formatDate} />
                        <YAxis />
                        <Tooltip labelFormatter={formatDate} />
                        <Legend />
                        <Line type="monotone" dataKey="positive" stroke="#F02CB9" />
                        <Line type="monotone" dataKey="neutral" stroke="#35B9F4" />
                        <Line type="monotone" dataKey="negative" stroke="#7B61F9" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
