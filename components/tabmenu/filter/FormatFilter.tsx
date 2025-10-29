"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
// replaced Select with inline options to avoid nested dropdown
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Film } from 'lucide-react';

export default function FormatFilter() {
    const t = useTranslations();
    const [value, setValue] = useState<string>('all');
    const [open, setOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const [minWidthPx, setMinWidthPx] = useState<number | undefined>(undefined);

    const label = value === 'all' ? 'All' : value;

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
                    <button title={t('social_listening.filters.format.title_attr')} ref={triggerRef} className="inline-flex items-center gap-2 px-2 h-9 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center justify-center h-7 min-w-[72px] px-2 text-sm font-medium rounded-full text-slate-700 dark:text-slate-300">{t('social_listening.filters.format.badge')}</span>
                            <svg className="w-4 h-4 text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </button>
                </PopoverTrigger>

                <PopoverContent align="start" className="w-auto" style={minWidthPx ? { minWidth: `${minWidthPx}px` } : undefined}>
                    <div className="flex flex-col gap-3">
                        <div className="text-sm font-medium">{t('social_listening.filters.format.by_format')}</div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{t('social_listening.filters.format.description')}</p>

                        <div className="flex flex-col divide-y rounded-md border bg-white dark:bg-slate-800">
                            {[
                                { v: 'all', labelKey: 'social_listening.filters.format.all' },
                                { v: 'video', labelKey: 'social_listening.filters.format.video' },
                                { v: 'post', labelKey: 'social_listening.filters.format.post' },
                                { v: 'comment', labelKey: 'social_listening.filters.format.comment' },
                                { v: 'article', labelKey: 'social_listening.filters.format.article' },
                            ].map((opt) => (
                                <button
                                    key={opt.v}
                                    onClick={() => { setValue(opt.v); setOpen(false); }}
                                    className={`text-left px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700/50 ${value === opt.v ? 'font-medium' : ''}`}
                                >
                                    {t(opt.labelKey)}
                                </button>
                            ))}
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}
