"use client";

import React, { useState } from 'react';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';

export default function LanguageFilter() {
    const [value, setValue] = useState<string>('all');

    return (
        <div className="bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg p-4 shadow-sm">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">By language</label>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Arabic, French, English</p>

            <div className="mt-3">
                <Select value={value} onValueChange={(v) => setValue(v)}>
                    <SelectTrigger aria-label="Langue">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="ar">Arabic</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
