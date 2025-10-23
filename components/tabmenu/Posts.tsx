
import React, { useState } from "react";
import { FaThList, FaThLarge } from "react-icons/fa";
import InstagramPostCard from './posts/instagram-post-card';
import TikTokPostCard from './posts/tiktok-post-card';
import YouTubePostCard from './posts/youtube-post-card';
import XPostCard from './posts/x-post-card';
import LinkedInPostCard from './posts/linkedin-post-card';

type InstagramPost = {
  username: string;
  userAvatar: string;
  postDate: string;
  postImage: string;
  postText: string;
  views: string;
  likes: string;
  comments: string;
  postUrl?: string;
};
type TikTokPost = InstagramPost & { shares: string };
type YouTubePost = InstagramPost;
type XPost = InstagramPost & { retweets: string };
type LinkedInPost = InstagramPost & { reposts: string };

type PostsData = {
  Instagram: InstagramPost[];
  TikTok: TikTokPost[];
  YouTube: YouTubePost[];
  X: XPost[];
  LinkedIn: LinkedInPost[];
};

export default function Posts() {
  const [showSocialDropdown, setShowSocialDropdown] = useState(false);
  const [selectedSocial, setSelectedSocial] = useState<string | null>(null);
  const [mode, setMode] = useState<"followers" | "likers">("followers");
  const [view, setView] = useState<'list' | 'grid'>('list');

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
  const allSocialOption = {
    name: "All Social Medias",
    count: null,
    logo: "https://cdn.jsdelivr.net/gh/feathericons/feather/icons/globe.svg",
    color: "#6366f1",
    text: "white",
  };

  // Example post data for each platform (replace with your real data/fetch logic)
  const postsData: PostsData = {
    Instagram: [
      {
        username: 'selenagomez',
        userAvatar: 'https://i.pravatar.cc/150?img=12',
        postDate: '11 May 25',
        postImage: 'https://picsum.photos/seed/insta1/600/400',
        postText: 'Mothers hold their children’s hands for a short while.. but their hearts forever and ever. One of my favorites. And I love all the mothers in...',
        views: '105.4M',
        likes: '3.5M',
        comments: '16',
        postUrl: 'https://instagram.com/p/xyz',
      },
    ],
    TikTok: [
      {
        username: 'selenagomez',
        userAvatar: 'https://i.pravatar.cc/150?img=22',
        postDate: '19 Feb 25',
        postImage: 'https://picsum.photos/seed/tiktok1/600/400',
        postText: 'London! ❤️',
        views: '54.1M',
        likes: '6.9M',
        comments: '30.2K',
        shares: '50.5K',
        postUrl: 'https://tiktok.com/@selenagomez/video/xyz',
      },
    ],
    YouTube: [
      {
        username: 'selenagomez',
        userAvatar: 'https://i.pravatar.cc/150?img=32',
        postDate: '13 Feb 25',
        postImage: 'https://picsum.photos/seed/youtube1/600/400',
        postText: 'Selena Gomez, benny blanco - Scared of Loving You (Official Lyric Video)',
        views: '5.5M',
        likes: '268K',
        comments: '12.3K',
        postUrl: 'https://youtube.com/watch?v=xyz',
      },
    ],
    X: [
      {
        username: 'selenagomez',
        userAvatar: 'https://i.pravatar.cc/150?img=42',
        postDate: '5 Nov 24',
        postImage: 'https://picsum.photos/seed/x1/600/400',
        postText: 'https://t.co/6VHHZbCGaQ',
        views: '13.6M',
        likes: '73.4K',
        comments: '8.3K',
        retweets: '6.1K',
        postUrl: 'https://x.com/selenagomez/status/xyz',
      },
    ],
    LinkedIn: [
      {
        username: 'selena-gomez-...',
        userAvatar: 'https://i.pravatar.cc/150?img=52',
        postDate: '22 Jul 25',
        postImage: 'https://picsum.photos/seed/linkedin1/600/400',
        postText: 'Five years ago today – on my birthday – I launched the Rare Impact Fund with one goal: to help young people feel seen,...',
        views: '8.4K',
        likes: '320',
        comments: '148',
        reposts: '148',
        postUrl: 'https://linkedin.com/posts/xyz',
      },
    ],
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        {/* Filter Bar */}
        <div className="flex flex-col gap-2 mb-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
            {/* List/Grid Toggler */}
            <div className="flex items-center gap-1 ml-2">
              <button
                className={`p-2 rounded-md border ${view === 'list' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setView('list')}
                title="List view"
                type="button"
              >
                <FaThList size={16} />
              </button>
              <button
                className={`p-2 rounded-md border ${view === 'grid' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setView('grid')}
                title="Grid view"
                type="button"
              >
                <FaThLarge size={16} />
              </button>
            </div>
              <div className="flex flex-wrap gap-2 items-center">
                {/* Custom Social Media Dropdown */}
                <div className="relative">
                  <button
                    className="border rounded-md px-2 py-1 text-sm bg-white flex items-center min-w-[160px] pr-8 relative"
                    onClick={() => setShowSocialDropdown((v) => !v)}
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
                                  platform.color || "";
                                e.currentTarget.style.color =
                                  platform.text || "";
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
              </div>
              {/* CSV Export */}
              <button
                className="p-2 border rounded-md bg-white hover:bg-gray-100 flex items-center gap-1 text-sm font-medium"
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
          </div>
          {/* Social media filter buttons */}
        </div>
  {view === 'grid' ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
      {selectedSocial && (postsData as any)[selectedSocial as keyof PostsData]
        ? (postsData as any)[selectedSocial as keyof PostsData].map((post: any, idx: number) => {
            switch (selectedSocial) {
              case 'Instagram':
                return <InstagramPostCard key={idx} {...post} />;
              case 'TikTok':
                return <TikTokPostCard key={idx} {...post as TikTokPost} />;
              case 'YouTube':
                return <YouTubePostCard key={idx} {...post} />;
              case 'X':
                return <XPostCard key={idx} {...post as XPost} />;
              case 'LinkedIn':
                return <LinkedInPostCard key={idx} {...post as LinkedInPost} />;
              default:
                return null;
            }
          })
        : (Object.entries(postsData) as [keyof PostsData, any[]][]).flatMap(([platform, posts]) =>
            posts.map((post: any, idx: number) => {
              switch (platform) {
                case 'Instagram':
                  return <InstagramPostCard key={platform + idx} {...post} />;
                case 'TikTok':
                  return <TikTokPostCard key={platform + idx} {...post as TikTokPost} />;
                case 'YouTube':
                  return <YouTubePostCard key={platform + idx} {...post} />;
                case 'X':
                  return <XPostCard key={platform + idx} {...post as XPost} />;
                case 'LinkedIn':
                  return <LinkedInPostCard key={platform + idx} {...post as LinkedInPost} />;
                default:
                  return null;
              }
            })
          )
      }
    </div>
  ) : (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full bg-white border rounded-xl text-sm">
        <thead>
          <tr className="bg-gray-50 text-gray-700">
            <th className="py-2 px-3 text-left font-semibold">Post</th>
            <th className="py-2 px-3 text-left font-semibold">Social</th>
            <th className="py-2 px-3 text-right font-semibold">Likes</th>
            <th className="py-2 px-3 text-right font-semibold">Comments</th>
            <th className="py-2 px-3 text-right font-semibold">Shares</th>
            <th className="py-2 px-3 text-right font-semibold">Views</th>
            <th className="py-2 px-3 text-right font-semibold">Eng. rate</th>
            <th className="py-2 px-3 text-right font-semibold">Date</th>
          </tr>
        </thead>
        <tbody>
          {(selectedSocial ? [selectedSocial] : Object.keys(postsData)).map((platform) =>
            (postsData as any)[platform].map((post: any, idx: number) => {
              // Platform icon and label
              let iconUrl = '';
              let label = platform;
              switch (platform) {
                case 'Instagram':
                  iconUrl = 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg';
                  label = 'Instagram';
                  break;
                case 'TikTok':
                  iconUrl = 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/tiktok.svg';
                  label = 'TikTok';
                  break;
                case 'YouTube':
                  iconUrl = 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/youtube.svg';
                  label = 'YouTube';
                  break;
                case 'X':
                  iconUrl = 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/x.svg';
                  label = 'X';
                  break;
                case 'LinkedIn':
                  iconUrl = 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg';
                  label = 'LinkedIn';
                  break;
                default:
                  iconUrl = '';
                  label = platform;
              }
              // Shares/reposts/retweets column
              let sharesValue = '-';
              if ('shares' in post && post.shares) sharesValue = post.shares;
              else if ('reposts' in post && post.reposts) sharesValue = post.reposts;
              else if ('retweets' in post && post.retweets) sharesValue = post.retweets;
              // Likes/comments/views/date are common, fallback to dash
              return (
                <tr key={platform + idx} className="border-b hover:bg-gray-50 transition text-sm">
                  {/* Post cell: avatar + text */}
                  <td className="py-2 px-3 flex items-center gap-2 w-[320px]">
                    <img src={post.userAvatar} alt={post.username} className="w-8 h-8 rounded-full object-cover" />
                    <span className="break-words">{post.postText || '-'}</span>
                  </td>
                  {/* Social cell: icon + label */}
                  <td className="py-2 px-3">
                    <div className="flex items-center gap-1">
                      {iconUrl && <img src={iconUrl} alt={label} className="w-5 h-5" />}
                      <span className="text-xs text-gray-700">{label}</span>
                    </div>
                  </td>
                  {/* Likes */}
                  <td className="py-2 px-3 text-right">{post.likes || '-'}</td>
                  {/* Comments */}
                  <td className="py-2 px-3 text-right">{post.comments || '-'}</td>
                  {/* Shares/reposts/retweets */}
                  <td className="py-2 px-3 text-right">{sharesValue}</td>
                  {/* Views */}
                  <td className="py-2 px-3 text-right">{post.views || '-'}</td>
                  {/* Engagement rate (placeholder, not in props) */}
                  <td className="py-2 px-3 text-right">9.9%</td>
                  {/* Date */}
                  <td className="py-2 px-3 text-right whitespace-nowrap">{post.postDate || '-'}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  )}
      </div>
    </div>
  );
}
