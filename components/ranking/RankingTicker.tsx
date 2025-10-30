"use client";

import React from 'react';

type Item = {
    name: string;
    value: string;
    change: string; // e.g. "-1.78" or "+1.46"
    direction: 'up' | 'down' | 'none';
};

const sampleItems: Item[] = [
    { name: 'AFMA', value: '1,324.00', change: '-1.78', direction: 'down' },
    { name: 'AFRIC INDUSTRIES SA', value: '340.00', change: '0.00', direction: 'none' },
    { name: 'AFRIQUIA GAZ', value: '4,180.00', change: '-0.24', direction: 'down' },
    { name: 'AGMA-LAHLOU TAZI', value: '6,705.00', change: '-4.12', direction: 'down' },
    { name: 'AKDITAL S.A', value: '1,460.00', change: '+1.46', direction: 'up' },
    { name: 'ALLIANCES', value: '459.00', change: '-2.34', direction: 'down' },
    { name: 'ALUMINIUM', value: '1,835.00', change: '0.00', direction: 'none' },
    { name: 'ARADELCAPITAL', value: '482.50', change: '+0.31', direction: 'up' },
    { name: 'ATLANTASANAD', value: '140.10', change: '-0.64', direction: 'down' },
    { name: 'ATTIJARIW', value: '690.60', change: '0.00', direction: 'none' },
];

const Arrow = ({ dir }: { dir: 'up' | 'down' | 'none' }) => {
    if (dir === 'none') return <span className="inline-block w-3 h-10" />;
    return (
        <svg
            className={`w-3 h-10 inline-block ${dir === 'up' ? 'text-green-400' : 'text-red-400'}`}
            viewBox="0 0 20 20"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
        >
            {dir === 'up' ? (
                <path d="M10 4l6 8H4l6-8z" />
            ) : (
                <path d="M10 16l-6-8h12l-6 8z" />
            )}
        </svg>
    );
};

export default function RankingTicker({ items }: { items?: Item[] }) {
    const list = items ?? sampleItems;

    // duplicate items to create a seamless marquee
    const duplicated = [...list, ...list];

    // animation duration can be adjusted; longer if more items
    const duration = Math.max(12, list.length * 2); // seconds

    return (
        <div className="mb-4">
            <div
                className="w-full overflow-hidden"
                aria-label="Ranking ticker"
                style={{ touchAction: 'none' }}
            >
                <div
                    className="flex whitespace-nowrap gap-[1px]"
                    style={{
                        // animate leftwards using CSS keyframes defined below
                        animation: `marquee ${duration}s linear infinite`,
                        alignItems: 'center',
                    }}
                >
                    {duplicated.map((it, idx) => (
                        // Render compact badge like ranking table (no gaps)
                        <div
                            key={`${it.name}-${idx}`}
                            className="inline-flex items-center text-xs text-white px-3 py-1 "
                            style={{
                                background: 'linear-gradient(90deg, #f956ffff 0%, #4eb9fbff 100%)',
                                marginRight: 0,
                                marginLeft: 0,
                            }}
                        >
                            <span className="font-semibold mr-2">{it.name}</span>
                            <span className="opacity-90 mr-2">{it.value}</span>
                            <Arrow dir={it.direction} />
                            <span className={`ml-1 ${it.direction === 'up' ? 'text-green-800' : it.direction === 'down' ? 'text-red-800' : 'text-gray-800'}`}>{it.change}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* scoped styles for marquee and to disable scrollbars */}
            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                /* hide any native scrollbar just in case */
                div::-webkit-scrollbar { display: none; }
            `}</style>
        </div>
    );
}
