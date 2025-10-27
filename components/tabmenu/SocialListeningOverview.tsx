"use client";

import React from "react";
import TotalMentions from "./charts/TotalMentions";
import TotalReach from "./charts/TotalReach";
import { HiOutlineChat, HiOutlineSpeakerphone, HiOutlineChartBar, HiOutlineEmojiHappy, HiOutlineEmojiSad } from "react-icons/hi";

function MetricCard({ icon, title, value, subtitle, accent }: { icon: React.ReactNode; title: string; value: React.ReactNode; subtitle?: string; accent?: string }) {
    return (
        <div className="bg-white border rounded-md shadow-sm p-3 flex items-center gap-4">
            <div className={"p-3 rounded-md flex items-center justify-center " + (accent ?? "bg-indigo-50")}>
                <div className="text-indigo-600 text-2xl">{icon}</div>
            </div>

            <div className="flex-1">
                <div className="text-xs text-gray-500">{title}</div>
                <div className="text-xl font-semibold text-gray-900">{value}</div>
                {subtitle ? <div className="text-xs text-gray-400">{subtitle}</div> : null}
            </div>
        </div>
    );
}

export default function SocialListeningOverview() {
    // placeholder values (you can wire real data later)
    const mentions = 11780;
    const reach = "81M";
    const engagement = "359k";
    const sentimentPositive = 1484;
    const sentimentNegative = 2992;

    // determine sentiment polarity (positive if more positives than negatives)
    const sentimentScore = sentimentPositive - sentimentNegative; // positive >0 means net positive
    const sentimentIsPositive = sentimentScore >= 0;
    const sentimentIcon = sentimentIsPositive ? <HiOutlineEmojiHappy /> : <HiOutlineEmojiSad />;
    const sentimentAccent = sentimentIsPositive ? 'bg-green-50' : 'bg-red-50';
    const sentimentPositiveLabelClass = sentimentIsPositive ? 'text-green-600' : 'text-gray-500';
    const sentimentNegativeLabelClass = sentimentIsPositive ? 'text-gray-500' : 'text-red-600';

    return (
        <div className="space-y-4">
            {/* Top small tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                    icon={<HiOutlineChat />}
                    title="Total Mentions"
                    value={mentions.toLocaleString()}
                    subtitle="period total"
                    accent="bg-pink-50"
                />

                <MetricCard
                    icon={<HiOutlineSpeakerphone />}
                    title="Social Reach"
                    value={reach}
                    subtitle="total reach"
                    accent="bg-sky-50"
                />

                <MetricCard
                    icon={<HiOutlineChartBar />}
                    title="Social Engagement"
                    value={engagement}
                    subtitle="total engagements"
                    accent="bg-orange-50"
                />

                <div className="bg-white border rounded-md shadow-sm p-3 flex items-center gap-4">
                    <div className={`p-3 rounded-md ${sentimentAccent} flex items-center justify-center`}>
                        <div className={`text-2xl ${sentimentIsPositive ? 'text-green-600' : 'text-red-600'}`}>{sentimentIcon}</div>
                    </div>

                    <div className="flex-1">
                        <div className="text-xs text-gray-500">Sentiment Analysis</div>
                        <div className="flex items-baseline gap-3">
                            <div className="text-xl font-semibold text-gray-900">{sentimentPositive}</div>
                            <div className={`text-sm ${sentimentPositiveLabelClass}`}>positive</div>
                        </div>
                        <div className="flex items-baseline gap-3 mt-1">
                            <div className="text-sm font-medium text-gray-700">{sentimentNegative}</div>
                            <div className={`text-sm ${sentimentNegativeLabelClass}`}>negative</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
