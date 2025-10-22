import React, { useState } from 'react';

const tabs = [
    { id: 1, label: 'Feed', content: 'This is the Feed content.' },
    { id: 2, label: 'Network Watch', content: 'This is the Network Watch content.' },
    { id: 3, label: 'Creator Network', content: 'This is the Creator Network content.' },
    { id: 4, label: 'Audience', content: 'This is the Audience content.' },
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
                        className={`px-4 py-2 rounded-md text-sm font-medium focus:outline-none transition-colors duration-200 ${
                            activeTab === tab.id
                                ? 'bg-pink-500 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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