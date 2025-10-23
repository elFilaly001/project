"use client";

import React from 'react';

export default function LocationFilter() {
    return (
        <div className="bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg p-4 shadow-sm">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Localisation</label>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Casa, Rabat, Marrakech…</p>
            <input aria-label="Localisation" placeholder="Rechercher une ville" className="mt-3 w-full rounded-md border px-2 py-1 text-sm bg-transparent border-slate-300 dark:border-slate-700" />
        </div>
    );
}
