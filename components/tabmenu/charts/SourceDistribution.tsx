"use client";

import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const data = [
    { month: 'Jan 2024', facebook: 400, x: 300, instagram: 300 },
    { month: 'Feb 2024', facebook: 350, x: 250, instagram: 200 },
    { month: 'Mar 2024', facebook: 300, x: 450, instagram: 250 },
];

export default function SourceDistribution() {
    return (
        <div className="p-3 bg-white border rounded-md shadow-sm h-full">
            <div className="text-sm font-medium mb-2">Distribution by source</div>
            <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 8 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="facebook" stackId="a" fill="#F02CB9" />
                        <Bar dataKey="x" stackId="a" fill="#35B9F4" />
                        <Bar dataKey="instagram" stackId="a" fill="#7B61F9" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
