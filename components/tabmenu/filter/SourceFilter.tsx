"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import SocialDropdown, { SocialPlatform } from "../../ui/SocialDropdown";
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Globe } from 'lucide-react';

export default function SourceFilter() {
    // Minimal social platforms and selection state for SocialDropdown
    const [selectedSocial, setSelectedSocial] = useState<string | null>(null);
    const t = useTranslations();
    const [open, setOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const [minWidthPx, setMinWidthPx] = useState<number | undefined>(undefined);

    const selectedLabel = selectedSocial ?? t('social_listening.filters.source.all_social_medias');

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
        name: t('social_listening.filters.source.all_social_medias'),
        count: null,
        logo: "https://cdn.jsdelivr.net/gh/feathericons/feather/icons/globe.svg",
        color: "#6366f1",
        text: "white",
    };

    // Keep the popover at least as wide as the trigger button.
    useEffect(() => {
        function updateMinWidth() {
            const w = triggerRef.current?.getBoundingClientRect().width;
            if (w) setMinWidthPx(Math.round(w));
        }

        if (open) {
            updateMinWidth();
            window.addEventListener('resize', updateMinWidth);
            return () => window.removeEventListener('resize', updateMinWidth);
        }
    }, [open]);

    // (No local open/keyboard state here — the dropdown handles its own open state.)

    return (
        <div className="rounded-lg shadow-sm border bg-white dark:bg-slate-800 ring-1 ring-slate-100 dark:ring-slate-700">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <button title={t('social_listening.filters.source.title_attr')} ref={triggerRef} className="w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors rounded-lg group">
                        <div className="w-9 h-9 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-slate-200 dark:group-hover:bg-slate-600 transition-colors">
                            <Globe className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                        </div>
                        <div className="flex-1 text-left min-w-0">
                            <div className="text-sm font-medium text-slate-900 dark:text-slate-100">{t('social_listening.filters.source.by_source')}</div>
                            <div className="text-xs text-slate-600 dark:text-slate-400 truncate">{selectedLabel}</div>
                        </div>
                        <span className="ml-2 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300">{t('social_listening.filters.source.badge')}</span>
                        <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </PopoverTrigger>

                <PopoverContent
                    align="start"
                    className="w-auto"
                    style={minWidthPx ? { minWidth: `${minWidthPx}px` } : undefined}
                >
                        <div className="flex flex-col gap-4">
                        <div>
                            <div className="text-sm font-medium">{t('social_listening.filters.source.by_source')}</div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t('social_listening.filters.source.description')}</p>
                        </div>

                            <SocialDropdown
                                socialPlatforms={socialPlatforms}
                                allSocialOption={allSocialOption}
                                selectedSocial={selectedSocial}
                                setSelectedSocial={setSelectedSocial}
                                fullWidth
                            />
                        </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}
