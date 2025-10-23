"use client";

import React from 'react';
import SentimentTrend from './charts/SentimentTrend';
import KeywordsBySentiment from './charts/KeywordsBySentiment';
import CountriesBySentiment from './charts/CountriesBySentiment';
import TopMentions from './charts/TopMentions';
import TotalReach from './charts/TotalReach';
import TotalMentions from './TotalMentions';

export default function SocialListening() {
    return (
        <div>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <SentimentTrend />
                </div>
                <div className="flex-1">
                    <KeywordsBySentiment />
                </div>
                <div className="flex-1">
                    <CountriesBySentiment />
                </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <TopMentions />
                <TotalReach />
                <TotalMentions />
            </div>
        </div>
    );
}

