"use client";

import React from "react";
import { ApiIntegration } from "./ApiDataList";

type CardProps = {
    item: ApiIntegration;
    onToggle?: (id: string, enabled: boolean) => void;
};

export const ApiCard: React.FC<CardProps> = ({ item, onToggle }) => {
    return (
        <div className="bg-white border rounded-lg p-4 shadow-sm flex flex-col justify-between">
            <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-md bg-gray-50 flex items-center justify-center overflow-hidden">
                    {item.logo ? (
                        <img
                            src={item.logo}
                            alt={`${item.name} logo`}
                            className="w-full h-full object-contain"
                            loading="lazy"
                            onError={(e) => {
                                // if the external image fails to load (blocked or 404), fall back to a local neutral SVG
                                try {
                                    (e.currentTarget as HTMLImageElement).onerror = null;
                                } catch (_) { }
                                e.currentTarget.src = '/logos/fallback.svg';
                            }}
                        />
                    ) : (
                        // inline SVG placeholder (no emoji)
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-7 h-7 text-gray-400" fill="none" aria-hidden>
                            <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M7 13c1.5-2 4-2 6 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )}
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2 justify-between">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900">{item.name}</h3>
                            {item.domain && (
                                <p className="text-xs text-gray-500">{item.domain}</p>
                            )}
                        </div>
                    </div>
                    <p className="mt-3 text-xs text-gray-500">{item.description}</p>
                </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
                <button className="px-3 py-1 text-sm border rounded-md text-gray-700">View Integrations</button>

                {/* Accessible toggle: hidden checkbox + styled track and thumb */}
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={!!item.enabled}
                        onChange={(e) => onToggle && onToggle(item.id, e.target.checked)}
                        aria-checked={!!item.enabled}
                    />

                    <div className="w-12 h-7 bg-gray-200 peer-checked:bg-blue-600 rounded-full transition-colors duration-200 ease-in-out peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300" />

                    <span className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out ${item.enabled ? 'translate-x-5' : 'translate-x-0'}`} />
                </label>
            </div>
        </div>
    );
};

type GridProps = {
    items: ApiIntegration[];
    onToggle?: (id: string, enabled: boolean) => void;
};

export const ApiGrid: React.FC<GridProps> = ({ items, onToggle }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((it) => (
                <ApiCard key={it.id} item={it} onToggle={onToggle} />
            ))}
        </div>
    );
};

export default ApiGrid;
