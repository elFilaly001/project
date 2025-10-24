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

    // AI interpretation values
    const totalsBySource = dataSource.reduce(
        (acc, r) => {
            acc.brandA += r.brandA;
            acc.brandB += r.brandB;
            acc.influencerX += r.influencerX;
            return acc;
        },
        { brandA: 0, brandB: 0, influencerX: 0 }
    );
    const entries = [
        { key: 'brandA', label: 'Brand A', val: totalsBySource.brandA },
        { key: 'brandB', label: 'Brand B', val: totalsBySource.brandB },
        { key: 'influencerX', label: 'Influencer X', val: totalsBySource.influencerX },
    ];
    const top = entries.reduce((a, b) => (b.val > a.val ? b : a), entries[0]);
    const topPct = total ? Math.round((top.val / total) * 100) : 0;
    const interpretationSentences = [
        `Total mentions across the sample: ${total}.`,
        `${top.label} generated the most mentions (${top.val}, ${topPct}%).`,
        `Consider reviewing content from ${top.label} to understand drivers of reach.`,
    ];

    return (
        <div className="p-3 bg-white border rounded-md shadow-sm h-full flex flex-col items-start justify-center">
            <div className="text-xs text-gray-500">Total Mentions</div>
            <div className="text-4xl font-extrabold text-gray-900 mt-2">{formatCompact(total)}</div>
            <div className="text-sm text-gray-500 mt-1">Last 14 days</div>

            {/* AI interpretation */}
            <div className="pt-3 w-full">
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-9 h-9 text-indigo-600">
                            <path d="M12 3c-1.657 0-3 1.343-3 3v1H8a3 3 0 0 0-3 3v1H4a1 1 0 0 0-1 1v1a4 4 0 0 0 4 4h1v1a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3v-1h1a4 4 0 0 0 4-4v-1a1 1 0 0 0-1-1h-1v-1a3 3 0 0 0-3-3h-1V6c0-1.657-1.343-3-3-3z" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8 9h.01M16 9h.01M12 6v.01M10 15h4" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <div className="text-sm font-medium mb-1">AI-powered insight</div>
                        <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">
                            {interpretationSentences.map((s, i) => (
                                <p key={i} className="mb-1">{s}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
