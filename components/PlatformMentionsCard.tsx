import React from "react";
import { SocialPlatform } from "./ui/SocialDropdown";


export interface Mention {
  user: string;
  text: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  timestamp?: string;
  avatar?: string;
  imageUrl?: string; // Optional image
  videoUrl?: string; // Optional video
  platformName?: string; // Optional platform name for mixed mentions
  link?: string; // Optional link to the social media post
}


interface PlatformMentionsCardProps {
  platform: SocialPlatform;
  mentions: Mention[];
  isMixed?: boolean;
}

import { useState } from "react";

const PAGE_SIZE = 9;

const PlatformMentionsCard: React.FC<PlatformMentionsCardProps> = ({ platform, mentions, isMixed }) => {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(mentions.length / PAGE_SIZE);
  const pagedMentions = mentions.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  // For mixed mentions, get platform info for each mention
  const platformMap: Record<string, SocialPlatform> = {
    LinkedIn: {
      name: "LinkedIn",
      count: null,
      logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg",
      color: "#0077B5",
      text: "white",
    },
    X: {
      name: "X",
      count: null,
      logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/x.svg",
      color: "#000000",
      text: "white",
    },
    YouTube: {
      name: "YouTube",
      count: null,
      logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/youtube.svg",
      color: "#FF0000",
      text: "white",
    },
    Facebook: {
      name: "Facebook",
      count: null,
      logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg",
      color: "#1877F3",
      text: "white",
    },
    TikTok: {
      name: "TikTok",
      count: null,
      logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/tiktok.svg",
      color: "#010101",
      text: "white",
    },
    Instagram: {
      name: "Instagram",
      count: null,
      logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg",
      color: "#E1306C",
      text: "white",
    },
  };

  // Gradient background for 'All Social Medias' option
  const isAllSocial = platform.name === "All Social Medias";
  const barStyle = isAllSocial
    ? {
        background: "linear-gradient(90deg, #06b6d4 0%, #a21caf 50%, #ec4899 100%)",
        color: platform.text,
      }
    : { backgroundColor: platform.color, color: platform.text };

  return (
    <div className="border rounded p-3 bg-gray-50">
      <div className="flex justify-between items-center mb-2 rounded p-2" style={barStyle}>
        <div className="flex items-baseline gap-2">
          <img
            src={platform.logo}
            alt={platform.name}
            className="w-4 h-4"
            style={isAllSocial ? undefined : { filter: "brightness(0) invert(1)" }}
          />
          <span className="font-bold">{platform.name}</span>
          <span className="text-sm">Mentions</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
        {pagedMentions.map((mention: Mention, idx: number) => {
          // For mixed mentions, get the correct platform
          const mentionPlatform = isMixed && mention.platformName ? platformMap[mention.platformName] : platform;
          return (
            <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all border border-gray-200 break-inside-avoid mb-4">
              {/* Header mimicking social media post */}
              <div className="flex items-center gap-3 p-4 border-b border-gray-100">
                <img
                  src={mention.avatar || "https://via.placeholder.com/40"}
                  alt={mention.user}
                  className="w-10 h-10 rounded-full flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 text-sm truncate">{mention.user}</div>
                  <div className="text-xs text-gray-500">{mention.timestamp || "now"}</div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <img
                    src={mentionPlatform.logo}
                    alt={mentionPlatform.name}
                    className="w-5 h-5 opacity-60"
                  />
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    mention.sentiment === 'positive' ? 'bg-green-100 text-green-700' :
                    mention.sentiment === 'negative' ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {mention.sentiment}
                  </span>
                </div>
              </div>

              {/* Content area */}
              <div className="p-4">
                <p className="text-gray-800 text-sm leading-relaxed mb-3">{mention.text}</p>

                {/* Media rendering */}
                {mention.imageUrl && (
                  <img
                    src={mention.imageUrl}
                    alt="Mention media"
                    className="w-full max-h-60 object-cover rounded mb-3"
                  />
                )}
                {mention.videoUrl && (
                  <video
                    src={mention.videoUrl}
                    controls
                    className="w-full max-h-60 rounded mb-3"
                  />
                )}

                {/* Engagement metrics styled by platform */}
                <div className="flex items-center gap-4 pt-3 border-t border-gray-100 relative">
                  {mentionPlatform.name === 'LinkedIn' && (
                    <>
                      <span className="text-xs text-gray-600 flex items-center gap-1">
                        <span className="text-blue-600">👍</span> 24
                      </span>
                      <span className="text-xs text-gray-600 flex items-center gap-1">
                        <span className="text-gray-500">💬</span> 5
                      </span>
                      <span className="text-xs text-gray-600 flex items-center gap-1">
                        <span className="text-gray-500">🔄</span> 3
                      </span>
                    </>
                  )}
                  {mentionPlatform.name === 'X' && (
                    <>
                      <span className="text-xs text-gray-600 flex items-center gap-1">
                        <span>❤️</span> 142
                      </span>
                      <span className="text-xs text-gray-600 flex items-center gap-1">
                        <span>🔁</span> 28
                      </span>
                      <span className="text-xs text-gray-600 flex items-center gap-1">
                        <span>💬</span> 12
                      </span>
                    </>
                  )}
                  {mentionPlatform.name === 'Instagram' && (
                    <>
                      <span className="text-xs text-gray-600 flex items-center gap-1">
                        <span className="text-red-500">❤️</span> 352
                      </span>
                      <span className="text-xs text-gray-600 flex items-center gap-1">
                        <span>💬</span> 18
                      </span>
                      <span className="text-xs text-gray-600 flex items-center gap-1">
                        <span>📤</span> 7
                      </span>
                    </>
                  )}
                  {mentionPlatform.name === 'Facebook' && (
                    <>
                      <span className="text-xs text-gray-600 flex items-center gap-1">
                        <span className="text-blue-500">👍</span> 89
                      </span>
                      <span className="text-xs text-gray-600 flex items-center gap-1">
                        <span>💬</span> 14
                      </span>
                      <span className="text-xs text-gray-600 flex items-center gap-1">
                        <span>↗️</span> 6
                      </span>
                    </>
                  )}
                  {mentionPlatform.name === 'TikTok' && (
                    <>
                      <span className="text-xs text-gray-600 flex items-center gap-1">
                        <span className="text-red-500">❤️</span> 1.2K
                      </span>
                      <span className="text-xs text-gray-600 flex items-center gap-1">
                        <span>💬</span> 234
                      </span>
                      <span className="text-xs text-gray-600 flex items-center gap-1">
                        <span>📤</span> 56
                      </span>
                    </>
                  )}
                  {mentionPlatform.name === 'YouTube' && (
                    <>
                      <span className="text-xs text-gray-600 flex items-center gap-1">
                        <span>👀</span> 10K
                      </span>
                      <span className="text-xs text-gray-600 flex items-center gap-1">
                        <span>👍</span> 567
                      </span>
                      <span className="text-xs text-gray-600 flex items-center gap-1">
                        <span>👎</span> 12
                      </span>
                      <span className="text-xs text-gray-600 flex items-center gap-1">
                        <span>💬</span> 89
                      </span>
                    </>
                  )}
                {/* Arrow link icon bottom right */}
                <a
                  href={mention.link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute right-2 bottom-2 text-gray-400 hover:text-gray-600"
                  title="Go to post"
                >
                  {/* External link icon (square with arrow) */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
                    <path d="M8 16L16 8" />
                    <path d="M14 8h2v2" />
                  </svg>
                </a>
              </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            className={`px-3 py-1 rounded text-sm ${page === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={`px-2 py-1 rounded text-xs font-medium ${i === page ? 'bg-cyan-500 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
              onClick={() => setPage(i)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className={`px-3 py-1 rounded text-sm ${page === totalPages - 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages - 1}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PlatformMentionsCard;