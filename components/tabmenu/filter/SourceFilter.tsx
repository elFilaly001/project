"use client";

import React, { useState } from 'react';
import SocialDropdown, { SocialPlatform } from "../../ui/SocialDropdown";

export default function SourceFilter() {
    // Minimal social platforms and selection state for SocialDropdown
    const [selectedSocial, setSelectedSocial] = useState<string | null>(null);

    const socialPlatforms: SocialPlatform[] = [
        {
            name: "Instagram",
            count: 107,
            logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg",
            color: "#E1306C",
            text: "white",
        },
        {
            name: "TikTok",
            count: 41,
            logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/tiktok.svg",
            color: "#010101",
            text: "white",
        },
        {
            name: "Facebook",
            count: null,
            logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg",
            color: "#1877F3",
            text: "white",
        },
        {
            name: "YouTube",
            count: 53,
            logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/youtube.svg",
            color: "#FF0000",
            text: "white",
        },
        {
            name: "X",
            count: 63,
            logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/x.svg",
            color: "#000000",
            text: "white",
        },
        {
            name: "LinkedIn",
            count: 1,
            logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg",
            color: "#0077B5",
            text: "white",
        },
    ];

    const allSocialOption: SocialPlatform = {
        name: "All Social Medias",
        count: null,
        logo: "https://cdn.jsdelivr.net/gh/feathericons/feather/icons/globe.svg",
        color: "#6366f1",
        text: "white",
    };

    // (No local open/keyboard state here — the dropdown handles its own open state.)

    return (
        <div className="bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg p-4 shadow-sm">
            <div className="flex flex-col gap-6">
                <div>
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">By source</label>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Isolate results by network</p>
                </div>
                <div className="w-full">
                    <SocialDropdown
                        socialPlatforms={socialPlatforms}
                        allSocialOption={allSocialOption}
                        selectedSocial={selectedSocial}
                        setSelectedSocial={setSelectedSocial}
                        fullWidth
                    />
                </div>
            </div>
        </div>
    );
}
