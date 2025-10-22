import React, { useState } from 'react';

const tabs = [
    { id: 1, label: 'Home' },
    { id: 2, label: 'Profile' },
    { id: 3, label: 'Settings' },
    { id: 4, label: 'Help' },
];

export default function TabBar() {
    const [activeTab, setActiveTab] = useState(1);

    return (
        <div className="flex items-center justify-center bg-white border-t border-gray-200 p-4 shadow-sm">
            <nav className="flex gap-4">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 rounded-md text-sm font-medium focus:outline-none transition-colors duration-200 ${
                            activeTab === tab.id
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </nav>
        </div>
    );
}