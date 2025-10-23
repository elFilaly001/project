"use client";

import React from 'react';
import SentimentTrend from './charts/SentimentTrend';
import KeywordsBySentiment from './charts/KeywordsBySentiment';
import CountriesBySentiment from './charts/CountriesBySentiment';
import TopMentions from './charts/TopMentions';
import TotalReach from './charts/TotalReach';
// TotalMentions component not used here
import SourceDistribution from './charts/SourceDistribution';
import ShareOfVoice from './charts/ShareOfVoice';
import TopKeywords from './charts/TopKeywords';

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

