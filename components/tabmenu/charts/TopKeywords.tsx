"use client";

import React from 'react';

type Props = {
    limit?: number; // total keywords to show
    data?: string[]; // optional flat keyword list
};

const defaultGroups: Record<string, string[]> = {
    'January 2024': ['keyword A', 'keyword B', 'keyword C'],
    'February 2024': ['keyword D', 'keyword E', 'keyword F'],
    'March 2024': ['keyword G', 'keyword H'],
};

export default function TopKeywords({ limit = 6, data }: Props) {
    // flatten default groups in defined order
    const defaultList = Object.values(defaultGroups).flat();
    const list = data && data.length ? data : defaultList;
    const limited = list.slice(0, limit);

    return (
        <div className="p-3 bg-white border rounded-md shadow-sm h-full">
            <div className="text-sm font-medium mb-2">Top keywords</div>

            <div className="flex flex-wrap gap-2">
                {limited.map((kw, idx) => (
                    <button
                        key={kw}
                        className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full text-sm text-gray-800 hover:bg-gray-100 transition"
                        title={kw}
                        type="button"
                    >
                        <span className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-[#F02CB9]' : idx === 1 ? 'bg-[#35B9F4]' : 'bg-[#7B61F9]'}`} />
                        <span className="truncate max-w-[10rem]">{kw}</span>
                        <span className="text-xs text-gray-400">#{idx + 1}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
