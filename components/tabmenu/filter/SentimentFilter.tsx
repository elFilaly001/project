"use client";

import React from 'react';

export default function SentimentFilter() {
    return (
        <div className="bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg p-4 shadow-sm">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Par sentiment</label>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Filtrer selon la tonalité de conversation</p>
            <div className="mt-3 flex gap-2 flex-wrap">
                <button className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border border-green-200">Positif</button>
                <button className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border border-yellow-200">Neutre</button>
                <button className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border border-red-200">Négatif</button>
            </div>
        </div>
    );
}
