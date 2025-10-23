"use client";

import React from 'react';

export default function SourceFilter() {
    return (
        <div className="bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg p-4 shadow-sm">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Par source</label>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Isoler les résultats selon le réseau</p>
            <select aria-label="Source" className="mt-3 w-full rounded-md border px-2 py-1 text-sm bg-transparent border-slate-300 dark:border-slate-700">
                <option>All</option>
                <option>Facebook</option>
                <option>Instagram</option>
                <option>Twitter / X</option>
                <option>LinkedIn</option>
                <option>Youtube</option>
                <option>News</option>
            </select>
        </div>
    );
}
