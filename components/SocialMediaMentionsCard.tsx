import React, { useState } from "react";
import { SocialPlatform } from "./ui/SocialDropdown";
import InlineDateRangePicker from "./tabmenu/filter/InlineDateRangePicker";

type SocialMediaKey = "LinkedIn" | "X" | "YouTube" | "Facebook" | "TikTok" | "Instagram";

interface Mention {
  user: string;
  text: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}

const SOCIAL_MEDIA: SocialPlatform[] = [
  {
    name: "LinkedIn",
    count: null,
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg",
    color: "#0077B5",
    text: "white",
  },
  {
    name: "X",
    count: null,
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/x.svg",
    color: "#000000",
    text: "white",
  },
  {
    name: "YouTube",
    count: null,
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/youtube.svg",
    color: "#FF0000",
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
    name: "TikTok",
    count: null,
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/tiktok.svg",
    color: "#010101",
    text: "white",
  },
  {
    name: "Instagram",
    count: null,
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg",
    color: "#E1306C",
    text: "white",
  },
];

const MENTIONS: Record<SocialMediaKey, Mention[]> = {
  LinkedIn: [
    { user: "John Doe", text: "Great insights on LinkedIn!", sentiment: "positive" },
    { user: "Jane Smith", text: "Loved the recent post.", sentiment: "positive" },
    { user: "Alex Lee", text: "Networking is key.", sentiment: "neutral" },
  ],
  X: [
    { user: "@user1", text: "Check out this tweet!", sentiment: "positive" },
    { user: "@user2", text: "X is buzzing today.", sentiment: "neutral" },
    { user: "@user3", text: "Trending topic here.", sentiment: "positive" },
  ],
  YouTube: [
    { user: "YTUserA", text: "Awesome video!", sentiment: "positive" },
    { user: "YTUserB", text: "Subscribed!", sentiment: "positive" },
    { user: "YTUserC", text: "Great content.", sentiment: "positive" },
  ],
  Facebook: [
    { user: "FBUser1", text: "Shared your post.", sentiment: "neutral" },
    { user: "FBUser2", text: "Nice update!", sentiment: "positive" },
    { user: "FBUser3", text: "Following your page.", sentiment: "neutral" },
  ],
  TikTok: [
    { user: "TikTokStar", text: "Loved your TikTok!", sentiment: "positive" },
    { user: "DanceFan", text: "Cool moves!", sentiment: "positive" },
    { user: "MusicLover", text: "Great sound.", sentiment: "positive" },
  ],
  Instagram: [
    { user: "InstaUser1", text: "Amazing photo!", sentiment: "positive" },
    { user: "InstaUser2", text: "Nice story.", sentiment: "neutral" },
    { user: "InstaUser3", text: "Love your feed.", sentiment: "positive" },
  ],
};

function SocialMediaMentionsCard() {
  // Start with first 3 open
  const [openPlatforms, setOpenPlatforms] = useState<SocialMediaKey[]>([
    SOCIAL_MEDIA[0].name as SocialMediaKey,
    SOCIAL_MEDIA[1].name as SocialMediaKey,
    SOCIAL_MEDIA[2].name as SocialMediaKey,
  ]);

  const [selectedSentiment, setSelectedSentiment] = useState<'all' | 'positive' | 'negative' | 'neutral'>('all');

  // Open a new platform, close the oldest one
  const handleOpen = (key: SocialMediaKey) => {
    if (openPlatforms.includes(key)) return;
    setOpenPlatforms((prev) => [key, ...prev.slice(0, 2)]);
  };

  // Close a platform (optional)
  const handleClose = (key: SocialMediaKey) => {
    setOpenPlatforms((prev) => prev.filter((k) => k !== key));
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Social Media Mentions</h2>

      {/* Buttons: show only platform name */}
      <div className="flex justify-between mb-4">
        <div className="flex gap-2 flex-wrap">
          {SOCIAL_MEDIA.map((platform) => {
            const isOpen = openPlatforms.includes(platform.name as SocialMediaKey);
            return (
              <button
                key={platform.name}
                className={`px-3 py-1 rounded border text-sm font-medium mr-2 mb-2 flex items-center gap-1 ${
                  isOpen
                    ? "text-white border-transparent"
                    : "bg-gray-100 text-gray-700 border-gray-300"
                }`}
                style={
                  isOpen
                    ? { backgroundColor: platform.color, color: platform.text }
                    : {}
                }
                onClick={() => handleOpen(platform.name as SocialMediaKey)}
                disabled={isOpen}
              >
                <img
                  src={platform.logo}
                  alt={platform.name}
                  className="w-4 h-4"
                  style={{
                    filter: isOpen ? "brightness(0) invert(1)" : "grayscale(1)",
                  }}
                />
                {platform.name}
              </button>
            );
          })}
        </div>
        <div className="flex gap-2">
          <select
            value={selectedSentiment}
            onChange={(e) => setSelectedSentiment(e.target.value as 'all' | 'positive' | 'negative' | 'neutral')}
            className="px-3 py-1 border rounded text-sm bg-white"
          >
            <option value="all">All Sentiments</option>
            <option value="positive">Positive</option>
            <option value="negative">Negative</option>
            <option value="neutral">Neutral</option>
          </select>
          <InlineDateRangePicker />
        </div>
      </div>

      {/* Tabs / chats: show "PlatformName Mentions" */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {openPlatforms.map((key: SocialMediaKey) => {
          const platform = SOCIAL_MEDIA.find((p) => p.name === key);
          if (!platform) return null; // Safety check
          const label = platform.name;
          const color = platform.color;
          return (
            <div key={key} className="border rounded p-3 bg-gray-50">
              <div className="flex justify-between items-center mb-2 rounded p-2" style={{ backgroundColor: platform.color, color: platform.text }}>
                <div className="flex items-baseline gap-2">
                  <img
                    src={platform.logo}
                    alt={platform.name}
                    className="w-4 h-4"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                  <span className="font-bold">{label}</span>
                  <span className="text-sm">Mentions</span>
                </div>

                {/* Optional close button */}
                {/* <button
                  className="text-xs text-gray-400 hover:text-red-500"
                  onClick={() => handleClose(key)}
                >
                  ✕
                </button> */}
              </div>

              <div className="space-y-2">
                {MENTIONS[key]
                  .filter((mention) => selectedSentiment === 'all' || mention.sentiment === selectedSentiment)
                  .map((mention: Mention, idx: number) => (
                  <div key={idx} className="bg-white text-black rounded shadow p-2">
                    <span className="font-semibold">{mention.user}:</span>
                    <span className="ml-2">{mention.text}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SocialMediaMentionsCard;
