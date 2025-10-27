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
                    <button title={t('social_listening.filters.sentiment.title_attr')} ref={triggerRef} className="w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors rounded-lg group">
                        <div className="w-9 h-9 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-slate-200 dark:group-hover:bg-slate-600 transition-colors">
                            <Smile className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                        </div>
                        <div className="flex-1 text-left min-w-0">
                            <div className="text-sm font-medium text-slate-900 dark:text-slate-100">{t('social_listening.filters.sentiment.by_sentiment')}</div>
                            <div className={`text-xs ${colorClass} dark:opacity-80 truncate`}>{selectedLabel}</div>
                        </div>
                        <span className="ml-2 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300">{t('social_listening.filters.sentiment.badge')}</span>
                        <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
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
