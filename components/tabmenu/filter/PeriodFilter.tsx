"use client";

import React, { useEffect, useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import type { DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import styles from './PeriodFilter.module.css';
import { format } from 'date-fns';

export default function PeriodFilter() {
    const [open, setOpen] = useState(false);
    const [range, setRange] = useState<DateRange | undefined>();
    const containerRef = useRef<HTMLDivElement | null>(null);

    // Show previous + current month in the two calendars
    const current = new Date();
    const prev = new Date(current);
    prev.setMonth(current.getMonth() - 1);

    useEffect(() => {
        function onDoc(e: MouseEvent) {
            if (!containerRef.current) return;
            if (!containerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape') setOpen(false);
        }
        document.addEventListener('mousedown', onDoc);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('mousedown', onDoc);
            document.removeEventListener('keydown', onKey);
        };
    }, []);

    const displayValue = () => {
        if (!range || (!range.from && !range.to)) return '';
        if (range.from && !range.to) return format(range.from, 'PPP');
        if (range.from && range.to) return `${format(range.from, 'PPP')} — ${format(range.to, 'PPP')}`;
        return '';
    };

    return (
        <div ref={containerRef} className="bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg p-4 shadow-sm relative">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Par période</label>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Analyser une période précise ou comparer deux périodes</p>

            <div className="mt-3">
                <button
                    type="button"
                    onClick={() => setOpen(v => !v)}
                    className="w-full text-left rounded-md border px-3 py-2 text-sm bg-transparent border-slate-300 dark:border-slate-700 flex items-center justify-between"
                    aria-expanded={open}
                >
                    <span className="text-sm text-slate-700 dark:text-slate-200">{displayValue() || 'Sélectionner une période'}</span>
                    <svg className="h-4 w-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {open && (
                    <div className="absolute z-50 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 shadow-lg">
                        <div className={styles['react-daypicker-compact']}>
                            <DayPicker
                                mode="range"
                                selected={range}
                                onSelect={setRange}
                                numberOfMonths={2}
                                month={prev}
                                pagedNavigation={false}
                                className="rdp--compact"
                                styles={{
                                    // shrink controls, months and day cells a bit
                                    caption: { fontSize: '0.85rem' },
                                }}
                                modifiersClassNames={{
                                    selected: 'rdp-day_selected',
                                    today: 'rdp-day_today',
                                    range_start: 'rdp-day_range_start',
                                    range_end: 'rdp-day_range_end',
                                    in_range: 'rdp-day_in_range',
                                }}
                            />
                        </div>

                        <div className="mt-2 flex gap-2 justify-end">
                            <button
                                type="button"
                                className="rounded-md px-3 py-1 text-sm border border-slate-200 dark:border-slate-700"
                                onClick={() => setRange(undefined)}
                            >
                                Effacer
                            </button>
                            <button
                                type="button"
                                className="rounded-md bg-slate-900 text-white px-3 py-1 text-sm"
                                onClick={() => setOpen(false)}
                            >
                                Appliquer
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
