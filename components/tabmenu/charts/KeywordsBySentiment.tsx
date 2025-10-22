"use client";

import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const data = [
    { field: 'Technologies', positive: 120, neutral: 60, negative: 20 },
    { field: 'Vehicles', positive: 80, neutral: 40, negative: 10 },
    { field: 'Health', positive: 50, neutral: 30, negative: 5 },
];

export default function KeywordsBySentiment() {
    return (
        <div className="p-3 bg-white border rounded-md shadow-sm h-full">
            <div className="text-sm font-medium mb-2">Top Keywords by Sentiment</div>
            <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="field" type="category" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="positive" stackId="a" fill="#F02CB9" />
                        <Bar dataKey="neutral" stackId="a" fill="#35B9F4" />
                        <Bar dataKey="negative" stackId="a" fill="#7B61F9" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
