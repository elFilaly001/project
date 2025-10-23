"use client";

import React from 'react';
import dynamic from 'next/dynamic';

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

export default function SocialListening() {
    return (
        <div className="space-y-6">
            {/* Top row: Mentions volume (line) + Sentiment stacked bars */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SentimentTrend />
                <KeywordsBySentiment />
            </div>

            {/* Bottom area: Source distribution, Share of voice donuts, Top keywords */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <SourceDistribution />
                <ShareOfVoice />
                <TopKeywords />
            </div>
        </div>
    );
}

