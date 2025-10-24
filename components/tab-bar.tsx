"use client";

import React, { useState } from 'react';
import Audience from './tabmenu/Audience';
import Posts from './tabmenu/Posts';
import SocialListening from './tabmenu/SocialListening';
import CompetitiveIntelligence from './tabmenu/CompetitiveIntelligence';

type Tab = { id: number; label: string; content: React.ReactNode };

const defaultTabs: Tab[] = [
    { id: 3, label: 'Social Listening', content: <SocialListening /> },
    { id: 1, label: 'Audience', content: <Audience /> },
    { id: 2, label: 'Posts', content: <Posts /> },
    { id: 4, label: 'Competitive Intelligence', content: <CompetitiveIntelligence /> },
];

export default function TabBar({ tabs = defaultTabs, initialActiveId }: { tabs?: Tab[]; initialActiveId?: number }) {
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
                                ? 'bg-gradient-to-r from-[#F02CB9] to-[#FF70C9] text-white shadow-sm'
                                : 'text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {tab.label}
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