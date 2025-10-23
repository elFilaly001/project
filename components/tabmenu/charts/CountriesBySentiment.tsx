"use client";

import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const data = [
    { country: 'USA', positive: 200, neutral: 90, negative: 40 },
    { country: 'France', positive: 80, neutral: 50, negative: 20 },
    { country: 'Morocco', positive: 60, neutral: 30, negative: 15 },
];

export default function CountriesBySentiment() {
    return (
        <div className="p-3 bg-white border rounded-md shadow-sm h-full">
            <div className="text-sm font-medium mb-2">Top Countries by Sentiment</div>
            <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="country" type="category" />
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
