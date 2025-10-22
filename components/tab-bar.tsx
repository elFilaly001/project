import React, { useState } from 'react';
import Audience from './tabmenu/Audience';
import Posts from './tabmenu/Posts';
import SocialListening from './tabmenu/SocialListening';
import CompetitiveIntelligence from './tabmenu/CompetitiveIntelligence';

const tabs: { id: number; label: string; content: React.ReactNode }[] = [
    { id: 1, label: 'Audience', content: <Audience /> },
    { id: 2, label: 'Posts', content: <Posts /> },
    { id: 3, label: 'Social Listening', content: <SocialListening /> },
    { id: 4, label: 'Competitive Intelligence', content: <CompetitiveIntelligence /> },
];

export default function TabBar() {
    const [activeTab, setActiveTab] = useState(1);

    return (
        <div className="flex flex-col items-center bg-white border border-gray-300 p-4 rounded-md shadow-sm">
            <nav className="flex gap-4 mb-4">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-8 py-2 rounded-md text-sm font-medium focus:outline-none transition-colors duration-200 ${activeTab === tab.id
                                ? 'bg-pink-500 text-white'
                                : 'border text-gray-700 hover:bg-gray-200'
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
    );
}