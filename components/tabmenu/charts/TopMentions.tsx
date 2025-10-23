"use client";

import React from 'react';

const dataSource = [
    { date: '2025-10-01', brandA: 120, brandB: 90, influencerX: 70 },
    { date: '2025-10-02', brandA: 150, brandB: 80, influencerX: 60 },
    { date: '2025-10-03', brandA: 170, brandB: 100, influencerX: 90 },
    { date: '2025-10-04', brandA: 160, brandB: 110, influencerX: 75 },
    { date: '2025-10-05', brandA: 180, brandB: 95, influencerX: 85 },
];

function formatCompact(n: number) {
    if (n >= 1_000_000_000) return `${Math.round(n / 1_000_000_000)}B`;
    if (n >= 1_000_000) return `${Math.round(n / 1_000_000)}M`;
    if (n >= 1_000) return `${Math.round(n / 1_000)}k`;
    return String(n);
}

export default function TopMentions() {
    // compute total mentions across all series and dates
    const total = dataSource.reduce((sum, row) => sum + row.brandA + row.brandB + row.influencerX, 0);

    return (
        <div className="p-3 bg-white border rounded-md shadow-sm h-full flex flex-col items-start justify-center">
            <div className="text-xs text-gray-500">Total Mentions</div>
            <div className="text-4xl font-extrabold text-gray-900 mt-2">{formatCompact(total)}</div>
            <div className="text-sm text-gray-500 mt-1">Last 14 days</div>
        </div>
    );
}
