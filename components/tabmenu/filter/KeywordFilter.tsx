"use client";

import React from 'react';

export default function KeywordFilter() {
    return (
        <div className="bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg p-4 shadow-sm">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Par mot clé</label>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Nom de la marque, produit ou campagne</p>
            <input aria-label="Mot clé" placeholder="Ajouter un mot clé" className="mt-3 w-full rounded-md border px-2 py-1 text-sm bg-transparent border-slate-300 dark:border-slate-700" />
        </div>
    );
}
