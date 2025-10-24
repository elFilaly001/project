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

    // AI insight computations
    const avgReach = Math.round(totalReach / dataSource.length);
    const peak = dataSource.reduce((a, b) => (b.reach > a.reach ? b : a), dataSource[0]);
    let biggestChange = { val: 0, from: dataSource[0].date, to: dataSource[0].date };
    for (let i = 1; i < dataSource.length; i++) {
        const diff = dataSource[i].reach - dataSource[i - 1].reach;
        if (Math.abs(diff) > Math.abs(biggestChange.val)) {
            biggestChange = { val: diff, from: dataSource[i - 1].date, to: dataSource[i].date };
        }
    }
    const changeSentence = biggestChange.val >= 0
        ? `Largest day-to-day change: +${biggestChange.val} reach from ${biggestChange.from} to ${biggestChange.to}.`
        : `Largest day-to-day change: ${biggestChange.val} reach from ${biggestChange.from} to ${biggestChange.to}.`;

    return (
        <div className="p-3 bg-white border rounded-md shadow-sm h-full flex flex-col items-start justify-center">
            <div className="text-xs text-gray-500">Total keywords</div>
            <div className="text-4xl font-extrabold text-gray-900 mt-2">{formatCompact(totalReach)}</div>
            <div className="text-sm text-gray-500 mt-1">Last 14 days</div>

            {/* AI-powered insight */}
            <div className="pt-3 w-full">
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-9 h-9 text-indigo-600">
                            <path d="M12 3c-1.657 0-3 1.343-3 3v1H8a3 3 0 0 0-3 3v1H4a1 1 0 0 0-1 1v1a4 4 0 0 0 4 4h1v1a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3v-1h1a4 4 0 0 0 4-4v-1a1 1 0 0 0-1-1h-1v-1a3 3 0 0 0-3-3h-1V6c0-1.657-1.343-3-3-3z" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8 9h.01M16 9h.01M12 6v.01M10 15h4" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <div className="flex-1">
                        <div className="text-sm font-medium mb-1">AI-powered insight</div>
                        <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">
                            <p className="mb-1">Total reach across the sample: <strong>{formatCompact(totalReach)}</strong>.</p>
                            <p className="mb-1">Average reach per period: <strong>{formatCompact(avgReach)}</strong>.</p>
                            <p className="mb-1">Peak on {peak.date} with {formatCompact(peak.reach)} reach.</p>
                            <p className="mb-0">{changeSentence}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
