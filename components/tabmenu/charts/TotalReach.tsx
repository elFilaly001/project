"use client";

import React from 'react';

const dataSource = [
    { date: '2025-10-01', reach: 1200 },
    { date: '2025-10-02', reach: 1500 },
    { date: '2025-10-03', reach: 1800 },
    { date: '2025-10-04', reach: 1700 },
    { date: '2025-10-05', reach: 2000 },
];

function formatCompact(n: number) {
    if (n >= 1_000_000_000) return `${Math.round(n / 1_000_000_000)}B`;
    if (n >= 1_000_000) return `${Math.round(n / 1_000_000)}M`;
    if (n >= 1_000) return `${Math.round(n / 1_000)}k`;
    return String(n);
}

export default function TotalReach() {
    const totalReach = dataSource.reduce((sum, r) => sum + r.reach, 0);

    return (
        <div className="p-3 bg-white border rounded-md shadow-sm h-full flex flex-col items-start justify-center">
            <div className="text-xs text-gray-500">Total keywords</div>
            <div className="text-4xl font-extrabold text-gray-900 mt-2">{formatCompact(totalReach)}</div>
            <div className="text-sm text-gray-500 mt-1">Last 14 days</div>
        </div>
    );
}
