"use client";

import React, { useState, createContext } from "react";
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

export const AudienceModeContext = createContext<string>("followers");

export default function Audience() {
  const [mode, setMode] = useState("followers"); // 'followers' | 'likers'
  // Remove static platform, use selectedSocial or All Social Medias
  const [showSocialDropdown, setShowSocialDropdown] = useState(false);
  // Default to 'All Social Medias' selected
  const [selectedSocial, setSelectedSocial] = useState<string | null>(null);

  // Social platforms (without 'All Social Medias')
  const socialPlatforms = [
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
    {
      name: "Snapchat",
      count: null,
      logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/snapchat.svg",
      color: "#FFFC00",
      text: "black",
    },
    {
      name: "Twitch",
      count: null,
      logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/twitch.svg",
      color: "#9147FF",
      text: "white",
    },
    {
      name: "Pinterest",
      count: null,
      logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/pinterest.svg",
      color: "#E60023",
      text: "white",
    },
  ];
  // All Social Medias option (with its own logo)
  const allSocialOption = {
    name: "All Social Medias",
    count: null,
    logo: "https://cdn.jsdelivr.net/gh/feathericons/feather/icons/globe.svg", // Example globe icon
    color: "#6366f1", // Indigo-500
    text: "white",
  };

  const notable = [
    { name: "Cristiano Ronaldo", handle: "@cristiano", avatar: null },
    { name: "Ariana Grande", handle: "@arianagrande", avatar: null },
    { name: "Jennifer Lopez", handle: "@jlo", avatar: null },
    // add more...
  ];

  const reachability = [
    { label: "< 500", value: 60 },
    { label: "500 - 1k", value: 20 },
    { label: "1k - 1.5k", value: 8 },
    { label: "> 1.5k", value: 12 },
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
                  title="Export CSV"
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
                  CSV Export
                </button>
              </div>
              {/* Social media filter buttons */}
              <div className="flex flex-wrap gap-2 items-center">
                {/* Custom Social Media Dropdown */}
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-white border rounded-md shadow-sm flex items-center h-10">
                  <button
                    onClick={() => setMode("followers")}
                    className={`h-10 px-4 rounded-md text-sm font-medium transition ${
                      mode === "followers"
                        ? "bg-indigo-600 text-white shadow"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    style={{ minHeight: 40 }}
                  >
                    Followers
                  </button>
                  <button
                    onClick={() => setMode("likers")}
                    className={`h-10 px-4 rounded-md text-sm font-medium transition ${
                      mode === "likers"
                        ? "bg-indigo-600 text-white shadow"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    style={{ minHeight: 40 }}
                  >
                    Likers
                  </button>
                </div>
                <div className="relative">
                  <button
                    className="h-10 border rounded-md px-2 text-sm bg-white flex items-center min-w-[160px] pr-8 relative"
                    style={{ minHeight: 40 }}
                    onClick={() => setShowSocialDropdown((v: boolean) => !v)}
                    type="button"
                  >
                    {selectedSocial ? (
                      <>
                        <img
                          src={
                            socialPlatforms.find(
                              (s) => s.name === selectedSocial
                            )?.logo || allSocialOption.logo
                          }
                          alt={selectedSocial}
                          className="w-5 h-5 mr-1"
                          style={{
                            display: "inline-block",
                            verticalAlign: "middle",
                          }}
                        />
                        <span>{selectedSocial}</span>
                      </>
                    ) : (
                      <>
                        <img
                          src={allSocialOption.logo}
                          alt="All Social Medias"
                          className="w-5 h-5 mr-1"
                          style={{
                            display: "inline-block",
                            verticalAlign: "middle",
                          }}
                        />
                        <span>All Social Medias</span>
                      </>
                    )}
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M6 8l4 4 4-4"
                          stroke="#64748b"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                  {showSocialDropdown && (
                    <div className="absolute left-0 mt-2 z-20 bg-white border rounded-md shadow-lg w-full min-w-[180px]">
                      {socialPlatforms.map((platform) => {
                        const isSelected = selectedSocial === platform.name;
                        // Show white logo only when selected or hovered (black bg), otherwise grayscale (for TikTok/X)
                        const needsWhiteLogo =
                          (platform.name === "TikTok" ||
                            platform.name === "X") &&
                          isSelected;
                        return (
                          <button
                            key={platform.name}
                            className={`flex items-center gap-2 px-2 py-2 w-full rounded text-xs font-medium transition group`}
                            style={
                              isSelected
                                ? {
                                    background: platform.color,
                                    color: platform.text,
                                  }
                                : {}
                            }
                            onClick={() => {
                              setSelectedSocial(platform.name);
                              setShowSocialDropdown(false);
                            }}
                            onMouseEnter={(e) => {
                              if (!isSelected) {
                                e.currentTarget.style.background =
                                  platform.color;
                                e.currentTarget.style.color = platform.text;
                                // For TikTok/X, force white logo on hover
                                const img =
                                  e.currentTarget.querySelector("img");
                                if (
                                  img &&
                                  (platform.name === "TikTok" ||
                                    platform.name === "X")
                                ) {
                                  img.style.filter = "brightness(0) invert(1)";
                                }
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isSelected) {
                                e.currentTarget.style.background = "";
                                e.currentTarget.style.color = "";
                                // For TikTok/X, revert logo on mouse leave
                                const img =
                                  e.currentTarget.querySelector("img");
                                if (
                                  img &&
                                  (platform.name === "TikTok" ||
                                    platform.name === "X")
                                ) {
                                  img.style.filter = "grayscale(1)";
                                }
                              }
                            }}
                          >
                            <img
                              src={platform.logo}
                              alt={platform.name}
                              className="w-5 h-5 mr-1"
                              style={{
                                filter:
                                  platform.name === "TikTok" ||
                                  platform.name === "X"
                                    ? isSelected
                                      ? "brightness(0) invert(1)"
                                      : "grayscale(1)"
                                    : isSelected
                                    ? "none"
                                    : "grayscale(1)",
                              }}
                            />
                            {platform.name}
                            {platform.count !== null && (
                              <span className="ml-auto text-xs font-semibold opacity-80">
                                ({platform.count})
                              </span>
                            )}
                          </button>
                        );
                      })}
                      {/* All Social Medias option at the end */}
                      <button
                        className={`flex items-center gap-2 px-2 py-2 w-full rounded text-xs font-medium transition ${
                          !selectedSocial
                            ? "bg-indigo-600 text-white"
                            : "hover:bg-gray-100 text-gray-800"
                        }`}
                        style={
                          !selectedSocial
                            ? {
                                background: allSocialOption.color,
                                color: allSocialOption.text,
                              }
                            : {}
                        }
                        onClick={() => {
                          setSelectedSocial(null);
                          setShowSocialDropdown(false);
                        }}
                      >
                        <img
                          src={allSocialOption.logo}
                          alt="All Social Medias"
                          className="w-5 h-5 mr-1"
                          style={{
                            filter: !selectedSocial ? "none" : "grayscale(1)",
                          }}
                        />
                        All Social Medias
                      </button>
                    </div>
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  The audience data is based on{" "}
                  <span className="font-medium text-indigo-600">
                    {selectedSocial || allSocialOption.name}
                  </span>
                </div>
              </div>
            </div>
          </div>

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
