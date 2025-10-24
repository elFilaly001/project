"use client";

import React, { useEffect, useRef, useState } from 'react';

type Option = {
    id: string;
    label: string;
    color?: string; // tailwind color class prefix (optional)
};

const OPTIONS: Option[] = [
    { id: 'all', label: 'All' },
    { id: 'facebook', label: 'Facebook', color: 'blue' },
    { id: 'instagram', label: 'Instagram', color: 'pink' },
    { id: 'twitter', label: 'Twitter / X', color: 'sky' },
    { id: 'linkedin', label: 'LinkedIn', color: 'indigo' },
    { id: 'youtube', label: 'Youtube', color: 'red' },
    { id: 'news', label: 'News', color: 'slate' },
];

export default function SourceFilter() {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<Option>(OPTIONS[0]);
    const [activeIndex, setActiveIndex] = useState<number>(-1);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function onDoc(e: MouseEvent) {
            if (!ref.current) return;
            if (!ref.current.contains(e.target as Node)) setOpen(false);
        }
        document.addEventListener('mousedown', onDoc);
        return () => document.removeEventListener('mousedown', onDoc);
    }, []);

    useEffect(() => {
        if (open) setActiveIndex(-1);
    }, [open]);

    function onKeyDown(e: React.KeyboardEvent) {
        if (!open && (e.key === 'ArrowDown' || e.key === 'Enter')) {
            setOpen(true);
            return;
        }

        if (!open) return;

        if (e.key === 'Escape') setOpen(false);
        if (e.key === 'ArrowDown') setActiveIndex((i) => Math.min(i + 1, OPTIONS.length - 1));
        if (e.key === 'ArrowUp') setActiveIndex((i) => Math.max(i - 1, 0));
        if (e.key === 'Enter' && activeIndex >= 0) {
            setSelected(OPTIONS[activeIndex]);
            setOpen(false);
        }
    }

    function choose(opt: Option) {
        setSelected(opt);
        setOpen(false);
    }

    return (
        <div className="bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg p-4 shadow-sm" ref={ref}>
            <div className="flex items-start justify-between">
                <div>
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Par source</label>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Isoler les résultats selon le réseau</p>
                </div>

                <button
                    type="button"
                    className="ml-3 inline-flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 bg-slate-100/70 dark:bg-slate-700/60 px-2 py-1 rounded-md hover:bg-slate-200/80 dark:hover:bg-slate-600/60 transition"
                    aria-label="Apply filters"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-slate-600 dark:text-slate-300">
                        <path d="M3 5h18M6 12h12M10 19h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Filtrer</span>
                </button>
            </div>

            {/* custom dropdown */}
            <div className="mt-3 relative">
                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    onKeyDown={onKeyDown}
                    aria-haspopup="listbox"
                    aria-expanded={open}
                    className="w-full flex items-center justify-between rounded-md border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-600 transition"
                >
                    <div className="flex items-center gap-3">
                        {/* colored dot */}
                        <span
                            className={`inline-block w-2 h-2 rounded-full ${selected.color ? `bg-${selected.color}-500` : 'bg-slate-400'}`}
                            aria-hidden
                        />
                        <span>{selected.label}</span>
                    </div>

                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={`transform transition ${open ? 'rotate-180' : ''} text-slate-500 dark:text-slate-400`}>
                        <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                {open && (
                    <ul
                        role="listbox"
                        tabIndex={-1}
                        className="absolute z-50 mt-2 w-full max-h-56 overflow-auto rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-lg py-1"
                        aria-label="Sources"
                    >
                        {OPTIONS.map((opt, idx) => {
                            const isSelected = selected.id === opt.id;
                            const isActive = activeIndex === idx;
                            return (
                                <li
                                    key={opt.id}
                                    role="option"
                                    aria-selected={isSelected}
                                    onMouseEnter={() => setActiveIndex(idx)}
                                    onClick={() => choose(opt)}
                                    className={`flex items-center justify-between cursor-pointer px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 ${isActive ? 'bg-slate-50 dark:bg-slate-800' : ''}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span
                                            className={`inline-block w-2 h-2 rounded-full ${opt.color ? `bg-${opt.color}-500` : 'bg-slate-400'}`}
                                            aria-hidden
                                        />
                                        <span className="text-slate-700 dark:text-slate-200">{opt.label}</span>
                                    </div>

                                    {isSelected ? (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-indigo-600 dark:text-indigo-400">
                                            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    ) : null}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>

            {/* chips (quick picks) wired to selection */}
            {/* <div className="mt-3 flex flex-wrap gap-2">
                {['instagram', 'twitter', 'facebook'].map((id) => {
                    const opt = OPTIONS.find((o) => o.id === id)!;
                    const active = selected.id === opt.id;
                    return (
                        <button
                            key={id}
                            type="button"
                            onClick={() => setSelected(opt)}
                            className={`text-xs px-2 py-1 rounded-full transition ${active ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200'}`}
                        >
                            {opt.label}
                        </button>
                    );
                })}
            </div> */}
        </div>
    );
}
