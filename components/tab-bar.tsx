"use client";

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Audience from './tabmenu/Audience';
import Posts from './tabmenu/Posts';
import SocialListening from './tabmenu/SocialListening';
import CompetitiveIntelligence from './tabmenu/CompetitiveIntelligence';
import Mentions from './tabmenu/mentions';
import Sentiment from './tabmenu/sentiment';
import Keyword from './tabmenu/keyword';

type Tab = { id: number; label: string | React.ReactNode; content: React.ReactNode };

// Default tabs use translation keys. Add corresponding keys to your locale files (e.g. translation/en.json).
const defaultTabs: Tab[] = [
    { id: 3, label: 'tabs.social_listening', content: <SocialListening /> },
    { id: 1, label: 'tabs.audience', content: <Audience /> },
    { id: 2, label: 'tabs.posts', content: <Posts /> },
    { id: 4, label: 'tabs.competitive_intelligence', content: <CompetitiveIntelligence /> },
    { id: 5, label: 'tabs.mentions', content: <Mentions /> },
    { id: 6, label: 'tabs.sentiment', content: <Sentiment /> },
    { id: 7, label: 'tabs.keywords', content: <Keyword /> },
];

export default function TabBar({ tabs = defaultTabs, initialActiveId }: { tabs?: Tab[]; initialActiveId?: number }) {
    const t = useTranslations();
    const [activeTab, setActiveTab] = useState<number>(initialActiveId ?? (tabs[0]?.id ?? 1));

    return (
        <div className="w-full px-6 lg:px-12">
            <div className="flex flex-col items-center bg-white border border-gray-300 p-4 rounded-md shadow-sm w-full">
                <nav className="flex gap-4 mb-4">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-2 rounded-md text-sm font-medium focus:outline-none transition-colors duration-200 ${activeTab === tab.id
                                ? 'bg-gradient-to-r from-[#7F3FFF] to-[#A770EF] text-white shadow-sm'
                                : 'text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {typeof tab.label === 'string'
                                ? (tab.label.includes('.') ? t(tab.label) : tab.label)
                                : tab.label}
                        </button>
                    ))}
                </nav>
                <div className="text-gray-700 text-sm p-4 border-t border-gray-200 w-full">
                    {tabs.find((tab) => tab.id === activeTab)?.content}
                </div>
            </div>
        </div>
    );
}