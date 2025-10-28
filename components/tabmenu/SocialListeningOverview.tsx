"use client";

import React from "react";
import { useTranslations } from 'next-intl';
import TotalMentions from "./charts/TotalMentions";
import TotalReach from "./charts/TotalReach";
import { HiOutlineChat, HiOutlineSpeakerphone, HiOutlineChartBar, HiOutlineEmojiHappy, HiOutlineEmojiSad } from "react-icons/hi";

function MetricCard({ icon, title, value, subtitle, accentBg, iconColor, accentBorder }: { icon: React.ReactNode; title: string; value: React.ReactNode; subtitle?: string; accentBg?: string; iconColor?: string; accentBorder?: string }) {
    // accentBg, iconColor and accentBorder are small utility classes passed from caller
    // to keep Tailwind classes explicit where possible. Example accentBg: "bg-gradient-to-tr from-pink-50 to-pink-100"
    const bg = accentBg ?? "bg-gradient-to-tr from-indigo-50 to-indigo-100";
    const iconCls = iconColor ?? "text-indigo-600";
    const borderCls = accentBorder ?? "border-transparent";

    return (
        <div className={`bg-white border ${borderCls} rounded-md shadow-sm p-3 flex items-center gap-4`}>
            <div className={`${bg} p-3 rounded-md flex items-center justify-center flex-shrink-0`}> 
                <div className={`${iconCls} text-2xl`}>{icon}</div>
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
    const t = useTranslations();
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
    const sentimentAccentBg = sentimentIsPositive ? 'bg-gradient-to-tr from-green-50 to-green-100' : 'bg-gradient-to-tr from-red-50 to-red-100';
    const sentimentIconColor = sentimentIsPositive ? 'text-green-600' : 'text-red-600';
    const sentimentPositiveLabelClass = sentimentIsPositive ? 'text-green-600' : 'text-gray-500';
    const sentimentNegativeLabelClass = sentimentIsPositive ? 'text-gray-500' : 'text-red-600';

    return (
        <div className="space-y-4">
            {/* Top small tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                    icon={<HiOutlineChat />}
                    title={t('social_listening.overview.total_mentions')}
                    value={mentions.toLocaleString()}
                    subtitle={t('social_listening.overview.period_total')}
                    accentBg="bg-gradient-to-tr from-pink-50 to-pink-100"
                    iconColor="text-pink-600"
                    accentBorder="border-l-4 border-pink-200 dark:border-pink-700/40"
                />

                <MetricCard
                    icon={<HiOutlineSpeakerphone />}
                    title={t('social_listening.overview.social_reach')}
                    value={reach}
                    subtitle={t('social_listening.overview.total_reach')}
                    accentBg="bg-gradient-to-tr from-sky-50 to-sky-100"
                    iconColor="text-sky-600"
                    accentBorder="border-l-4 border-sky-200 dark:border-sky-700/40"
                />

                <MetricCard
                    icon={<HiOutlineChartBar />}
                    title={t('social_listening.overview.social_engagement')}
                    value={engagement}
                    subtitle={t('social_listening.overview.total_engagements')}
                    accentBg="bg-gradient-to-tr from-orange-50 to-orange-100"
                    iconColor="text-orange-600"
                    accentBorder="border-l-4 border-orange-200 dark:border-orange-700/40"
                />

                <div className={`bg-white border ${sentimentIsPositive ? 'border-l-4 border-green-200 dark:border-green-700/40' : 'border-l-4 border-red-200 dark:border-red-700/40'} rounded-md shadow-sm p-3 flex items-center gap-4`}>
                    <div className={`p-3 rounded-md ${sentimentAccentBg} flex items-center justify-center flex-shrink-0`}>
                        <div className={`text-2xl ${sentimentIconColor}`}>{sentimentIcon}</div>
                    </div>

                    <div className="flex-1">
                        <div className="text-xs text-gray-500">{t('social_listening.overview.sentiment_analysis')}</div>
                        <div className="flex items-baseline gap-3">
                            <div className="text-xl font-semibold text-gray-900">{sentimentPositive}</div>
                            <div className={`text-sm ${sentimentPositiveLabelClass}`}>{t('social_listening.overview.positive')}</div>
                        </div>
                        <div className="flex items-baseline gap-3 mt-1">
                            <div className="text-sm font-medium text-gray-700">{sentimentNegative}</div>
                            <div className={`text-sm ${sentimentNegativeLabelClass}`}>{t('social_listening.overview.negative')}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
