"use client";

import React, { useMemo, useState } from "react";
import ApiGrid from "../api/ApiWrapper";
import sampleIntegrations, { ApiIntegration } from "../api/ApiDataList";

export default function ApiIntegrationsPage() {
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState<'All' | 'Enterprise' | 'Custom' | 'Favourites'>('All');
    const [items, setItems] = useState<ApiIntegration[]>(sampleIntegrations);

    const filtered = useMemo(() => {
        return items.filter((it) => {
            const matchesCategory = category === 'All' || it.category === category;
            const q = query.trim().toLowerCase();
            const matchesQuery = !q || it.name.toLowerCase().includes(q) || (it.domain || '').toLowerCase().includes(q) || (it.description || '').toLowerCase().includes(q);
            return matchesCategory && matchesQuery;
        });
    }, [items, query, category]);

    function toggleEnabled(id: string, enabled: boolean) {
        setItems((prev) => prev.map((p) => (p.id === id ? { ...p, enabled } : p)));
    }

    return (
        <main className="px-6 md:px-12 py-6">
            <header className="mb-6">
                <h1 className="text-2xl font-bold">API Integration</h1>
                <p className="text-sm text-gray-500">Supercharge your product with ultimate connectivity</p>
            </header>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <div className="bg-white border rounded-lg p-1">
                        <div className="flex">
                            {['All', 'Enterprise', 'Custom', 'Favourites'].map((c) => (
                                <button
                                    key={c}
                                    onClick={() => setCategory(c as any)}
                                    className={`px-4 py-2 text-sm ${category === c ? 'bg-gray-100 font-semibold' : 'text-gray-600'}`}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/3">
                    <input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="search"
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                    />
                </div>
            </div>

            <ApiGrid items={filtered} onToggle={toggleEnabled} />

            <div className="mt-6 flex justify-center">
                <button className="px-4 py-2 border rounded-full text-sm">Load More +</button>
            </div>
        </main>
    );
}
