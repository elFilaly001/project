"use client";

import React from 'react';
import { Input } from '@/components/ui/input';

export default function KeywordFilter() {
    return (
        <div className="bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg p-4 shadow-sm">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">By keyword</label>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Brand name, product or campaign</p>
            <Input aria-label="Keyword" placeholder="Add a keyword" className="mt-3" />
        </div>
    );
}
