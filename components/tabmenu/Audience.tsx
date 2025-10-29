"use client";

import React, { useState, createContext } from "react";
import { useTranslations } from 'next-intl';
import FollowerCredibilityCard from "../follower-credibility-card";
import AudienceReachabilityCard from "../audience-reachability-card";
import GenderDistributionCard from "../gender-distribution-card";
import AgeGenderBreakdownCard from "../age-gender-breakdown-card";
import FollowersByCityCard from "../followers-by-city-card";
import FollowersByCountryCard from "../followers-by-country-card";
import LanguageDistributionCard from "../language-distribution-card";
import BrandAffinityCard from "../brand-affinity-card";
import InterestAffinityCard from "../interest-affinity-card";
import AllDataTable from "../all-data-table";
import SocialDropdown, { SocialPlatform } from "../ui/SocialDropdown";
import InlineDateRangePicker from "./filter/InlineDateRangePicker";

/**
 * Audience component for the TabBar.
 * - Toggle between Followers / Likers (UI only)
 * - Shows platform note
 * - Left: Followers credibility donut + legend + explanation
 * - Middle: Notable followers list
 * - Right: Audience reachability bar chart
 *
 * Replace static data with props or fetch as needed.
 */


export const AudienceModeContext = createContext<string>("followers");

export default function Audience() {
  const [mode, setMode] = useState("followers"); // 'followers' | 'likers'
  // Remove static platform, use selectedSocial or All Social Medias
  const [showSocialDropdown, setShowSocialDropdown] = useState(false);
  // Default to 'All Social Medias' selected
  const [selectedSocial, setSelectedSocial] = useState<string | null>(null);

  const t = useTranslations();

  // Social platforms (without 'All Social Medias')
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
  // All Social Medias option (with its own logo)
  const allSocialOption: SocialPlatform = {
    name: t('social_listening.filters.source.all_social_medias'),
    count: null,
    logo: "https://cdn.jsdelivr.net/gh/feathericons/feather/icons/globe.svg", // Example globe icon
    color: "#6366f1", // Indigo-500
    text: "white",
  };

  const mockData = [
    {
      icon: "https://upload.wikimedia.org/wikipedia/commons/2/21/Instagram_Glyph_Gradient_RGB_logo.svg",
      userAvatar: "https://randomuser.me/api/portraits/women/1.jpg",
      name: "IShowSpeed",
      score: "99.7/100",
      followers: "41.7M",
      growth: "+2.53%",
      lastActivity: "This week",
      activity: "5 Posts / month",
      engRate: "5.31%",
      avgEng: "2.2M",
      avgViews: "43M",
      postingHabits: "once a week at 11PM",
    },
    {
      icon: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Tiktok_icon.svg",
      userAvatar: "https://randomuser.me/api/portraits/women/2.jpg",
      name: "IShowSpeed",
      score: "98.8/100",
      followers: "42.4M",
      growth: "+2.58%",
      lastActivity: "12 days ago",
      activity: "0.6 Videos / week",
      engRate: "17.24%",
      avgEng: "7.3M",
      avgViews: "60.4M",
      postingHabits: "once a week at 11PM",
    },
    {
      icon: "https://upload.wikimedia.org/wikipedia/commons/5/53/X_logo_2023_original.svg",
      userAvatar: "https://randomuser.me/api/portraits/women/3.jpg",
      name: "Speed⭐",
      score: "96.8/100",
      followers: "3.7M",
      growth: "+0.69%",
      lastActivity: "This week",
      activity: "1.3 Tweets / week",
      engRate: "6.06%",
      avgEng: "226.9K",
      avgViews: "8.4M",
      postingHabits: "once a week at 10PM",
    },
    {
      icon: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg",
      userAvatar: "https://randomuser.me/api/portraits/women/4.jpg",
      name: "IShowSpeed",
      score: "96.7/100",
      followers: "45M",
      growth: "-1.53%",
      lastActivity: "This week",
      activity: "2.9 Videos / month",
      engRate: "0.22%",
      avgEng: "101.1K",
      avgViews: "2.5M",
      postingHabits: "once a week at 1AM",
    },
  ];

  return (
    <AudienceModeContext.Provider value={mode}>
      <div className="w-full">
        <div className="flex flex-col gap-4">
          {/* Filter Bar */}
          <div className="flex flex-col gap-2 mb-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {/* CSV Export */}
                <button
                  className="h-10 px-3 border rounded-md bg-white hover:bg-gray-100 flex items-center gap-1 text-sm font-medium"
                  style={{ minHeight: 40 }}
                  title={t('audience.csv_export')}
                >
                  <svg width="16" height="16" fill="none" viewBox="0 0 20 20">
                    <path
                      d="M4 13v2a2 2 0 002 2h8a2 2 0 002-2v-2"
                      stroke="#64748b"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 10l3 3 3-3M10 3v10"
                      stroke="#64748b"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {t('audience.csv_export')}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-white border rounded-md shadow-sm flex items-center h-10">
                  <button
                    onClick={() => setMode("followers")}
                    className={`h-10 px-4 rounded-md text-sm font-medium transition ${
                      mode === "followers"
                        ? "bg-cyan-500 text-white shadow"
                        : "text-gray-600 hover:bg-cyan-100"
                    }`}
                    style={{ minHeight: 40 }}
                  >
                    {t('audience.followers')}
                  </button>
                  <button
                    onClick={() => setMode("likers")}
                    className={`h-10 px-4 rounded-md text-sm font-medium transition ${
                      mode === "likers"
                        ? "bg-cyan-500 text-white shadow"
                        : "text-gray-600 hover:bg-cyan-100"
                    }`}
                    style={{ minHeight: 40 }}
                  >
                    {t('audience.likers')}
                  </button>
                </div>
                <InlineDateRangePicker />
              {/* Social media filter buttons */}
                <SocialDropdown
                  socialPlatforms={socialPlatforms}
                  allSocialOption={allSocialOption}
                  selectedSocial={selectedSocial}
                  setSelectedSocial={setSelectedSocial}
                />
                <div className="text-sm text-gray-500">
                  {t('audience.audience_data_based', { source: selectedSocial || allSocialOption.name })}
                </div>
              </div>
            </div>
          </div>
          <AllDataTable data={mockData} />

          {/* Cards row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <FollowerCredibilityCard />
            {/* <BrandAffinityCard /> */}
            <InterestAffinityCard />
            {mode === "followers" && <AudienceReachabilityCard />}

            <GenderDistributionCard />
            <AgeGenderBreakdownCard />
            <FollowersByCountryCard />
            <FollowersByCityCard />
            <LanguageDistributionCard />
          </div>
        </div>
      </div>
    </AudienceModeContext.Provider>
  );
}

/* ---------- Subcomponents ---------- */
