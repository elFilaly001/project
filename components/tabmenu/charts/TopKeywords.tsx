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

// Predefined positions (percentages) around a center for up to 11 surrounding words
const positions: Array<{ top: string; left: string; rotate?: number }> = [
    { top: '50%', left: '50%', rotate: 0 }, // center (idx 0)
    { top: '18%', left: '50%', rotate: -10 },
    { top: '30%', left: '78%', rotate: 8 },
    { top: '60%', left: '82%', rotate: -6 },
    { top: '80%', left: '60%', rotate: 4 },
    { top: '78%', left: '30%', rotate: -8 },
    { top: '58%', left: '10%', rotate: 6 },
    { top: '36%', left: '10%', rotate: -4 },
    { top: '10%', left: '22%', rotate: 6 },
    { top: '6%', left: '65%', rotate: -6 },
    { top: '40%', left: '36%', rotate: 3 },
];

export default function TopKeywords({ limit = 6, data }: Props) {
    const defaultList = Object.values(defaultGroups).flat();
    const list = data && data.length ? data : defaultList;
    const limited = list.slice(0, limit);

    // Map index to a position; if out of range, scatter them with small offsets
    const getPosStyle = (i: number) => {
        const p = positions[i] || { top: `${10 + i * 6}%`, left: `${10 + (i % 5) * 18}%`, rotate: (i % 2 === 0 ? -4 : 4) };
        const translate = i === 0 ? '-50%, -50%' : '-50%, -50%';
        return {
            position: 'absolute' as const,
            top: p.top,
            left: p.left,
            transform: `translate(${translate}) rotate(${p.rotate ?? 0}deg)`,
            whiteSpace: 'nowrap' as const,
        } as React.CSSProperties;
    };

    // size by rank: first is large, next two medium, rest small
    const fontSizeByIndex = (i: number) => {
        if (i === 0) return 'text-3xl md:text-4xl lg:text-5xl font-extrabold';
        if (i === 1 || i === 2) return 'text-lg md:text-xl font-semibold';
        return 'text-sm md:text-base';
    };

    const colorByIndex = (i: number) => {
        if (i === 0) return 'text-[#F02CB9]';
        if (i === 1) return 'text-[#35B9F4]';
        if (i === 2) return 'text-[#7B61F9]';
        return 'text-gray-700';
    };

    return (
        <div className="p-4 bg-white border rounded-md shadow-sm h-full">
            <div className="text-sm font-medium mb-3">Nuage de mots</div>

            <div className="relative w-full h-56 md:h-72 lg:h-80 bg-transparent overflow-hidden">
                {limited.map((kw, idx) => {
                    const isCenter = idx === 0;
                    const sizeClass = fontSizeByIndex(idx);
                    const colorClass = colorByIndex(idx);

                    return (
                        <button
                            key={kw}
                            type="button"
                            title={kw}
                            aria-label={`Mot-clé ${kw}, rang ${idx + 1}`}
                            className={`transition-transform transform hover:scale-110 focus:outline-none ${isCenter ? '' : ''}`}
                            style={getPosStyle(idx)}
                        >
                            <span className={`${sizeClass} ${colorClass} bg-white/0 px-1`}>{kw}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
