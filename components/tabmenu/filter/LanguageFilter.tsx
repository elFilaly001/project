"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
// replaced Select with inline options to avoid nested dropdown
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { BookOpen } from 'lucide-react';

export default function LanguageFilter() {
    const [value, setValue] = useState<string>('all');
    const t = useTranslations();
    const [open, setOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const [minWidthPx, setMinWidthPx] = useState<number | undefined>(undefined);

    const label = value === 'all' ? t('social_listening.filters.language.all') : (value === 'ar' ? t('social_listening.filters.language.ar') : value === 'fr' ? t('social_listening.filters.language.fr') : t('social_listening.filters.language.en'));

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
                    <button title={t('social_listening.filters.language.title_attr')} ref={triggerRef} className="w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors rounded-lg group">
                            <div className="w-9 h-9 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-slate-200 dark:group-hover:bg-slate-600 transition-colors">
                            <BookOpen className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                        </div>
                        <div className="flex-1 text-left min-w-0">
                            <div className="text-sm font-medium text-slate-900 dark:text-slate-100">{t('social_listening.filters.language.by_language')}</div>
                            <div className="text-xs text-slate-600 dark:text-slate-400 truncate">{label}</div>
                        </div>
                        <span className="ml-2 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300">{t('social_listening.filters.language.badge')}</span>
                        <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </PopoverTrigger>

                <PopoverContent align="start" className="w-auto" style={minWidthPx ? { minWidth: `${minWidthPx}px` } : undefined}>
                    <div className="flex flex-col gap-3">
                        <div className="text-sm font-medium">{t('social_listening.filters.language.by_language')}</div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{t('social_listening.filters.language.description')}</p>

                        <div className="flex flex-col divide-y rounded-md border bg-white dark:bg-slate-800">
                            {[
                                { v: 'all', labelKey: 'social_listening.filters.language.all' },
                                { v: 'ar', labelKey: 'social_listening.filters.language.ar' },
                                { v: 'fr', labelKey: 'social_listening.filters.language.fr' },
                                { v: 'en', labelKey: 'social_listening.filters.language.en' },
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
