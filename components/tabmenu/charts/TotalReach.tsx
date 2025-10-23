"use client";

import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const data = [
    { date: '2025-10-01', reach: 1200 },
    { date: '2025-10-02', reach: 1500 },
    { date: '2025-10-03', reach: 1800 },
    { date: '2025-10-04', reach: 1700 },
    { date: '2025-10-05', reach: 2000 },
];

export default function TotalReach() {
    const formatDate = (d: string) => {
        try {
            return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date(d));
        } catch {
            return d;
        }
    };

    return (
        <div className="p-3 bg-white border rounded-md shadow-sm h-full">
            <div className="text-sm font-medium mb-2">Total Reach</div>
            <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={formatDate} />
                        <YAxis />
                        <Tooltip labelFormatter={formatDate} />
                        <Area type="monotone" dataKey="reach" stroke="#35B9F4" fill="#D6F4FF" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
