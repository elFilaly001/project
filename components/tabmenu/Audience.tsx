import React, { useState } from "react";
import FollowerCredibilityCard from "../follower-credibility-card";
import AudienceReachabilityCard from "../audience-reachability-card";
import GenderDistributionCard from "../gender-distribution-card";
import AgeGenderBreakdownCard from "../age-gender-breakdown-card";
import FollowersByCityCard from "../followers-by-city-card";
import FollowersByCountryCard from "../followers-by-country-card";
import LanguageDistributionCard from "../language-distribution-card";
import BrandAffinityCard from "../brand-affinity-card";
import InterestAffinityCard from "../interest-affinity-card";

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

export default function Audience() {
  const [mode, setMode] = useState("followers"); // 'followers' | 'likers'
  const platform = "instagram";

  

  const notable = [
    { name: "Cristiano Ronaldo", handle: "@cristiano", avatar: null },
    { name: "Ariana Grande", handle: "@arianagrande", avatar: null },
    { name: "Jennifer Lopez", handle: "@jlo", avatar: null },
    // add more...
  ];

  const reachability = [
    { label: "< 500", value: 60 },
    { label: "500 - 1k", value: 20 },
    { label: "1k - 5k", value: 8 },
    { label: "> 5k", value: 12 },
  ];

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        {/* Toggle + platform note */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="bg-white border rounded-md px-1 py-1 shadow-sm flex items-center">
              <button
                onClick={() => setMode("followers")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  mode === "followers"
                    ? "bg-indigo-600 text-white shadow"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Followers
              </button>
              <button
                onClick={() => setMode("likers")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  mode === "likers"
                    ? "bg-indigo-600 text-white shadow"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Likers
              </button>
            </div>
            <div className="text-sm text-gray-500">
            The audience data is based on{" "}
            <span className="font-medium text-indigo-600">{platform}</span>
          </div>
          </div>

          
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col gap-2 mb-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {/* Grid/List toggle */}
              <button className="p-2 border rounded-md bg-white hover:bg-gray-100 flex items-center" title="Grid view">
                <svg width="18" height="18" fill="none" viewBox="0 0 20 20"><rect x="3" y="3" width="5" height="5" rx="1" fill="#64748b"/><rect x="12" y="3" width="5" height="5" rx="1" fill="#64748b"/><rect x="3" y="12" width="5" height="5" rx="1" fill="#64748b"/><rect x="12" y="12" width="5" height="5" rx="1" fill="#64748b"/></svg>
              </button>
              {/* CSV Export */}
              <button className="p-2 border rounded-md bg-white hover:bg-gray-100 flex items-center gap-1 text-sm font-medium" title="Export CSV">
                <svg width="16" height="16" fill="none" viewBox="0 0 20 20"><path d="M4 13v2a2 2 0 002 2h8a2 2 0 002-2v-2" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 10l3 3 3-3M10 3v10" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                CSV Export
              </button>
              <div className="flex flex-wrap gap-2 items-center">
              <select className="border rounded-md px-2 py-1 text-sm bg-white">
                <option>All Social Medias</option>
              </select>
              {/* <button className="flex items-center gap-1 px-2 py-1 rounded bg-pink-100 text-pink-600 text-xs font-medium"><span role="img" aria-label="Instagram">📸</span> Instagram (107)</button>
              <button className="flex items-center gap-1 px-2 py-1 rounded bg-gray-100 text-gray-800 text-xs font-medium"><span role="img" aria-label="TikTok">🎵</span> TikTok (41)</button>
              <button className="flex items-center gap-1 px-2 py-1 rounded bg-red-100 text-red-600 text-xs font-medium"><span role="img" aria-label="YouTube">▶️</span> YouTube (53)</button>
              <button className="flex items-center gap-1 px-2 py-1 rounded bg-black text-white text-xs font-medium"><span>X</span> X (63)</button>
              <button className="flex items-center gap-1 px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-medium"><span role="img" aria-label="LinkedIn">💼</span> LinkedIn (1)</button>
              <button className="flex items-center gap-1 px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs font-medium"><span role="img" aria-label="Snapchat">👻</span> Snapchat</button>
              <button className="flex items-center gap-1 px-2 py-1 rounded bg-purple-100 text-purple-700 text-xs font-medium"><span role="img" aria-label="Twitch">🕹️</span> Twitch</button>
              <button className="flex items-center gap-1 px-2 py-1 rounded bg-pink-200 text-pink-800 text-xs font-medium"><span role="img" aria-label="Pinterest">📌</span> Pinterest</button> */}
            </div>
            {/* Sort by dropdown */}
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-500">Sort by:</span>
              <select className="border rounded-md px-2 py-1 text-sm bg-white">
                <option>Social media</option>
                <option>Name</option>
                <option>Followers</option>
              </select>
            </div>
            </div>
            {/* Social media filter buttons */}
            
          </div>
        </div>

        {/* Cards row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left card: Followers credibility */}
            <FollowerCredibilityCard />
            <BrandAffinityCard />
            <InterestAffinityCard />
          

          {/* Middle card: Notable followers */}
          {/* <div className="bg-white rounded-xl p-5 shadow-sm border">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-700 font-semibold">Notable followers</h3>
              <button className="text-gray-400 text-xs px-2 py-1 rounded hover:bg-gray-50">?</button>
            </div>

            <div className="mt-4 space-y-3">
              {notable.map((n, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-600">
                    {n.avatar ? <img src={n.avatar} alt={n.name} className="w-10 h-10 rounded-full" /> : n.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700">{n.name}</div>
                    <div className="text-xs text-gray-500">{n.handle}</div>
                  </div>
                </div>
              ))}
            </div>
          </div> */}

          {/* Right card: Audience reachability */}
            <AudienceReachabilityCard />

            <GenderDistributionCard />
            <AgeGenderBreakdownCard />
            <FollowersByCountryCard />
            <FollowersByCityCard />
            <LanguageDistributionCard />
        </div>
      </div>
    </div>
  );
}

/* ---------- Subcomponents ---------- */







