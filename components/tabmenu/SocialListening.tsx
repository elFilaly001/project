"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import {
    PeriodFilter,
    SourceFilter,
    SentimentFilter,
    AuthorsFilter,
    LocationFilter,
    KeywordFilter,
    FormatFilter,
    LanguageFilter,
} from './filter';
import SocialListeningOverview from './SocialListeningOverview';

// Dynamically import chart components with SSR disabled so browser-only libs (like recharts)
// are only evaluated on the client. This prevents server-side errors after upgrading Next.
const SentimentTrend = dynamic(() => import('./charts/SentimentTrend'), { ssr: false });
const KeywordsBySentiment = dynamic(() => import('./charts/KeywordsBySentiment'), { ssr: false });
const CountriesBySentiment = dynamic(() => import('./charts/CountriesBySentiment'), { ssr: false });
const TopMentions = dynamic(() => import('./charts/TopMentions'), { ssr: false });
const TotalReach = dynamic(() => import('./charts/TotalReach'), { ssr: false });
const SourceDistribution = dynamic(() => import('./charts/SourceDistribution'), { ssr: false });
const ShareOfVoice = dynamic(() => import('./charts/ShareOfVoice'), { ssr: false });
const TopKeywords = dynamic(() => import('./charts/TopKeywords'), { ssr: false });
const TotalMentions = dynamic(() => import('./charts/TotalMentions'), { ssr: false });

export default function SocialListening() {
    const t = useTranslations();
    return (
        <div className="space-y-6">
            <div className="text-lg font-medium">{t('tabs.social_listening')}</div>

            {/* Overview metrics (tiles + small charts) */}
            {/* Filters */}
            <section aria-label={t('social_listening.filters.label')} className="flex flex-wrap items-center gap-3">
                <PeriodFilter />
                <SourceFilter />
                <SentimentFilter />
                <AuthorsFilter />
                <LocationFilter />
                {/* <KeywordFilter /> */}
                <FormatFilter />
                <LanguageFilter />
            </section>
            <SocialListeningOverview />
            {/* Top row: Mentions volume (line) + Sentiment stacked bars */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TotalMentions />
                <SentimentTrend />
            </div>

            {/* Bottom area: Source distribution, Share of voice donuts, Top keywords */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" >
                <SourceDistribution />
                <ShareOfVoice />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6" >
                <TopKeywords />
            </div>
        </div>
    );
}


