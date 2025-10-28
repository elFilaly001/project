"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTranslations } from 'next-intl';
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Smile } from 'lucide-react';

const OPTIONS = [
    { key: "positive", labelKey: "social_listening.filters.sentiment.positive", color: "green" },
    { key: "neutral", labelKey: "social_listening.filters.sentiment.neutral", color: "yellow" },
    { key: "negative", labelKey: "social_listening.filters.sentiment.negative", color: "red" },
];

export default function SentimentFilter() {
    const t = useTranslations();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string>("");
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const [minWidthPx, setMinWidthPx] = useState<number | undefined>(undefined);

    const selectedLabel = OPTIONS.find((o) => o.key === value) ? t(OPTIONS.find((o) => o.key === value)!.labelKey) : t('social_listening.filters.sentiment.by_sentiment');

    const colorClass = value === 'positive' ? 'text-emerald-600' : value === 'neutral' ? 'text-yellow-500' : value === 'negative' ? 'text-rose-600' : 'text-slate-600';

    useEffect(() => {
        function updateMinWidth() {
            const w = triggerRef.current?.getBoundingClientRect().width;
            if (w) setMinWidthPx(Math.round(w));
        }

        if (open) {
            updateMinWidth();
            window.addEventListener('resize', updateMinWidth);
            return () => window.removeEventListener('resize', updateMinWidth);
        }
    }, [open]);

    return (
        <div className="rounded-lg shadow-sm border bg-white dark:bg-slate-800 ring-1 ring-slate-100 dark:ring-slate-700">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <button title={t('social_listening.filters.sentiment.title_attr')} ref={triggerRef} className="inline-flex items-center gap-2 px-2 h-9 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                        <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center justify-center h-7 min-w-[72px] px-2 text-sm font-medium rounded-full text-slate-700 dark:text-slate-300 ${colorClass}`}>{t('social_listening.filters.sentiment.badge')}</span>
                            <svg className="w-4 h-4 text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </button>
                </PopoverTrigger>

                <PopoverContent align="start" className="w-auto" style={minWidthPx ? { minWidth: `${minWidthPx}px` } : undefined}>
                    <div className="flex flex-col gap-3">
                        <div className="text-sm font-medium">{t('social_listening.filters.sentiment.choose_sentiment')}</div>
                        <RadioGroup value={value} onValueChange={(v) => setValue(v)}>
                            {OPTIONS.map((o) => (
                                <label key={o.key} className="flex items-center gap-2 cursor-pointer">
                                    <RadioGroupItem value={o.key} />
                                    <span className="text-sm">{t(o.labelKey)}</span>
                                </label>
                            ))}
                        </RadioGroup>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}
