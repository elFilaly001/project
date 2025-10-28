"use client";

import React from 'react';
import ExplainButton from '@/components/ui/ExplainButton';
import AiInsightSection from '@/components/AiInsightSection';
import { useTranslations } from 'next-intl';

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
    const t = useTranslations();
    const defaultList = Object.values(defaultGroups).flat();
    const list = data && data.length ? data : defaultList;
    const limited = list.slice(0, limit);
    // AI interpretation: generate a few short sentences from the limited keywords
    const interpretationSentences = (() => {
        if (!limited || limited.length === 0) return ['No keyword data available.'];
        const top = limited[0];
        const others = limited.slice(1);
        return [
            `Top keywords: ${limited.join(', ')}.`,
            top ? `${top} is the most prominent keyword and likely driving conversations.` : 'No dominant keyword identified.',
            top ? `Consider reviewing posts containing "${top}" to uncover context and sentiment.` : 'No action suggested.',
        ];
    })();
    // sizes and colors by rank: first is large, next two medium, rest small
    const fontSizeByIndex = (i: number) => {
        if (i === 0) return 'text-2xl md:text-3xl lg:text-4xl font-extrabold';
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
            <div className="flex items-start justify-between">
                <div className="text-sm font-medium mb-3">{t('social_listening.charts.top_keywords.title')}</div>
                <ExplainButton
                    title={t('social_listening.charts.top_keywords.title')}
                    description={t('social_listening.charts.top_keywords.description')}
                />
            </div>

            {/* Flex layout matching the sketch:
                Row 1: 1 item (index 0) full width
                Row 2: 2 items (indexes 1-2)
                Row 3: 3 items (indexes 3-5)
                Uses flex instead of grid per request. */}
            <div className="w-full space-y-3">
                {/* prepare rows from the limited list */}
                {(() => {
                    const row1 = limited.slice(0, 1);
                    const row2 = limited.slice(1, 3);
                    const row3 = limited.slice(3, 6);

                    return (
                        <>
                            {/* Row 1: single, full-width */}
                            <div className="flex w-full">
                                {row1.map((kw, i) => {
                                    const idx = i; // 0
                                    const sizeClass = fontSizeByIndex(idx);
                                    const colorClass = colorByIndex(idx);
                                    return (
                                        <button
                                            key={kw}
                                            type="button"
                                            title={kw}
                                            aria-label={t('social_listening.charts.top_keywords.keyword_aria', { kw, rank: idx + 1 })}
                                            className={`w-full h-20 md:h-24 lg:h-28 flex items-center justify-center gap-3 transition-transform transform hover:scale-105 focus:outline-none bg-white border rounded-md px-4`}
                                        >
                                            {/* Badge styled to match keyword text (no bg), slightly smaller */}
                                            <span className={`${colorClass} ${idx === 0 ? 'text-xl md:text-2xl' : 'text-sm md:text-base'} font-semibold mr-2`} aria-hidden>
                                                {`${idx + 1}#`}
                                            </span>
                                            <span className={`${sizeClass} ${colorClass} truncate`}>{kw}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Row 2: two medium items */}
                            <div className="flex w-full gap-3">
                                {row2.map((kw, j) => {
                                    const idx = 1 + j; // 1,2
                                    const sizeClass = fontSizeByIndex(idx);
                                    const colorClass = colorByIndex(idx);
                                    return (
                                        <button
                                            key={kw}
                                            type="button"
                                            title={kw}
                                            aria-label={t('social_listening.charts.top_keywords.keyword_aria', { kw, rank: idx + 1 })}
                                            className={`flex-1 h-14 md:h-16 flex items-center justify-center gap-3 transition-transform transform hover:scale-105 focus:outline-none bg-white border rounded-md px-3`}
                                        >
                                            <span className={`${colorClass} text-sm md:text-base font-semibold mr-2`} aria-hidden>
                                                {`${idx + 1}#`}
                                            </span>
                                            <span className={`${sizeClass} ${colorClass} truncate`}>{kw}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Row 3: three small items */}
                            <div className="flex w-full gap-3">
                                {row3.map((kw, j) => {
                                    const idx = 3 + j; // 3,4,5
                                    const sizeClass = fontSizeByIndex(idx);
                                    const colorClass = colorByIndex(idx);
                                    return (
                                        <button
                                            key={kw}
                                            type="button"
                                            title={kw}
                                            aria-label={t('social_listening.charts.top_keywords.keyword_aria', { kw, rank: idx + 1 })}
                                            className={`flex-1 h-10 flex items-center justify-center gap-2 transition-transform transform hover:scale-105 focus:outline-none bg-white border rounded-md px-2`}
                                        >
                                            <span className={`${colorClass} text-xs md:text-sm font-semibold mr-2`} aria-hidden>
                                                {`${idx + 1}#`}
                                            </span>
                                            <span className={`${sizeClass} ${colorClass} truncate`}>{kw}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </>
                    );
                })()}
            </div>

            {/* AI interpretation */}
            <AiInsightSection sentences={interpretationSentences} />
        </div>
    );
}
