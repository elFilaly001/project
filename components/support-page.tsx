"use client";

import React, { useMemo, useState } from "react";
import { Search } from "lucide-react";

interface SupportPageProps {
    lang?: string;
}

const topics = [
    { id: "getting-started", title: "Getting Started", desc: "Help new users get familiar with the platform." },
    { id: "dashboard-analytics", title: "Dashboard & Analytics", desc: "Explain how to read and use the platform’s data." },
    { id: "reports-insights", title: "Reports & Insights", desc: "Guide users through creating and interpreting automatic reports." },
    { id: "competitor-analysis", title: "Competitor Analysis", desc: "Show users how to monitor brands and competitors." },
    { id: "digital-ad-monitoring", title: "Digital Ad Monitoring", desc: "Track and analyze digital advertising performance." },
    { id: "integrations-api", title: "Integrations & API", desc: "Connect In-Talks with other tools." },
    { id: "account-billing", title: "Account & Billing", desc: "Manage your account and subscription." },
    { id: "troubleshooting-faq", title: "Troubleshooting & FAQ", desc: "Address common problems and technical issues." },
    { id: "demo-videos", title: "Demo Videos", desc: "Visual learning and short tutorials." },
];

export default function SupportPage({ lang }: SupportPageProps) {
    const [query, setQuery] = useState("");

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return topics;
        return topics.filter(
            (t) => t.title.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q)
        );
    }, [query]);

    return (
        <div className="py-12 px-6 md:px-12 lg:px-20">
            {/* Hero */}
            <div className="bg-gradient-to-r from-[#F02CB9] to-[#35B9F4] text-white rounded-lg p-8 md:p-12 mb-8 shadow-md">
                <h1 className="text-3xl md:text-4xl font-semibold mb-4">How can we help?</h1>
                <p className="text-sm text-emerald-100 mb-6">Search how-tos and more</p>

                <div className="max-w-3xl">
                    <label className="relative block">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                            <Search className="w-5 h-5" />
                        </span>
                        <input
                            aria-label="Search support"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="placeholder:italic placeholder:text-gray-400 block w-full bg-white ring-0 border border-gray-200 rounded-full py-3 pl-12 pr-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#35B9F4]"
                            placeholder="Search how-tos and more"
                            type="search"
                        />
                    </label>

                    {/* chips removed per design — kept the area clean under the search input */}
                </div>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((t) => (
                    <article
                        key={t.id}
                        className="group bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                            // for now go to a hash target; can be changed to real routes later
                            const slug = `/support/${t.id}`;
                            window.location.href = slug;
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                const slug = `/support/${t.id}`;
                                window.location.href = slug;
                            }
                        }}
                    >
                        <h3 className="text-lg font-medium text-gray-900 mb-2">{t.title}</h3>
                        <p className="text-sm text-gray-600">{t.desc}</p>
                        <div className="mt-4">
                            <span className="text-[#35B9F4] group-hover:underline text-sm">Learn more →</span>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
