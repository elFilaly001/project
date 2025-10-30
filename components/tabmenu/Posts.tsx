import React, { useState } from "react";
import { FaThList, FaThLarge } from "react-icons/fa";
import InstagramPostCard from './posts/instagram-post-card';
import TikTokPostCard from './posts/tiktok-post-card';
import YouTubePostCard from './posts/youtube-post-card';
import XPostCard from './posts/x-post-card';
import LinkedInPostCard from './posts/linkedin-post-card';
import FacebookPostCard from './posts/facebook-post-card';
import SocialDropdown, { SocialPlatform } from "../ui/SocialDropdown";
import SocialPostsTable from "../SocialPostsTable";

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

type SnapchatPost = InstagramPost;
type FacebookPost = InstagramPost;

type PostsData = {
  Instagram: InstagramPost[];
  TikTok: TikTokPost[];
  YouTube: YouTubePost[];
  X: XPost[];
  LinkedIn: LinkedInPost[];
  Facebook: FacebookPost[];
};

export default function Posts() {
  const [showSocialDropdown, setShowSocialDropdown] = useState(false);
  const [selectedSocial, setSelectedSocial] = useState<string | null>(null);
  const [mode, setMode] = useState<"followers" | "likers">("followers");
  const [view, setView] = useState<'list' | 'grid'>('grid');

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
  const allSocialOption: SocialPlatform = {
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
    Facebook: [
      {
        username: 'selenagomez',
        userAvatar: 'https://i.pravatar.cc/150?img=82',
        postDate: '1 Jan 25',
        postImage: 'https://picsum.photos/seed/facebook1/600/400',
        postText: 'Happy New Year! 🎉 Wishing you all love, joy, and peace in 2025. Grateful for all the memories we created in 2024. Let’s make more...',
        views: '2.3M',
        likes: '150K',
        comments: '1.2K',
        postUrl: 'https://facebook.com/selenagomez/posts/xyz',
      },
    ]
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        {/* Filter Bar */}
        <div className="flex flex-col gap-2 mb-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            {/* Left group: CSV Export + List/Grid Toggler */}
            <div className="flex items-center gap-3">
              <button
                className="h-10 p-2 border rounded-md bg-white hover:bg-gray-100 flex items-center gap-1 text-sm font-medium"
                title="Export CSV"
                style={{ minHeight: 40 }}
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
              <div className="flex items-center gap-1 ml-2">
                <button
                  className={`h-10 p-2 rounded-md border ${view === 'list' ? 'bg-cyan-500 text-white' : 'bg-white text-gray-600 hover:bg-cyan-100'}`}
                  onClick={() => setView('list')}
                  title="List view"
                  type="button"
                  style={{ minHeight: 40 }}
                >
                  <FaThList size={16} />
                </button>
                <button
                  className={`h-10 p-2 rounded-md border ${view === 'grid' ? 'bg-cyan-500 text-white' : 'bg-white text-gray-600 hover:bg-cyan-100'}`}
                  onClick={() => setView('grid')}
                  title="Grid view"
                  type="button"
                  style={{ minHeight: 40 }}
                >
                  <FaThLarge size={16} />
                </button>
              </div>
            </div>
            {/* Right group: Sort by + Social Dropdown + Data note */}
            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500">Sort by:</span>
                <select className="h-10 border rounded-md px-2 py-1 text-sm bg-white" style={{ minHeight: 40 }}>
                  <option>Most popular</option>
                  <option>Publication date</option>
                  <option>Most liked</option>
                  <option>Most commented</option>
                  <option>Most shared</option>
                  <option>Most viewed</option>
                  <option>Social media</option>
                </select>
              </div>
              <SocialDropdown
                socialPlatforms={socialPlatforms}
                allSocialOption={allSocialOption}
                selectedSocial={selectedSocial}
                setSelectedSocial={setSelectedSocial}
              />
              <div className="text-sm text-gray-500 h-10 flex items-center" style={{ minHeight: 40 }}>
                The audience data is based on{" "}
                <span className="font-medium text-cyan-600">
                  {selectedSocial || allSocialOption.name}
                </span>
              </div>
            </div>
          </div>
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
              case 'Snapchat':
                return <FacebookPostCard key={idx} {...post as SnapchatPost} />;
              case 'Facebook':
                return <FacebookPostCard key={idx} {...post as any} />;
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
                case 'Facebook':
                  return <FacebookPostCard key={platform + idx} {...post as any} />;
                default:
                  return null;
              }
            })
          )
      }
    </div>
  ) : (
    <SocialPostsTable postsData={postsData} selectedSocial={selectedSocial} />
  )}
      </div>
    </div>
  );
}
