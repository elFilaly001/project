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
        username: 'glovoapp',
        userAvatar: 'https://www.lenouvelliste.ma/wp-content/uploads/2025/07/GLOVO-1-1.jpg',
        postDate: '15 Oct 25',
        postImage: 'https://www.jadid-alwadifa.com/wp-content/uploads/2020/10/glovo.jpg',
        postText: 'Craving something delicious? 🍕🍔 Let Glovo deliver your favorite meals right to your door! Order now and enjoy fast, reliable delivery. #Glovo #FoodDelivery #OrderNow',
        views: '250.3K',
        likes: '12.5K',
        comments: '234',
        postUrl: 'https://www.jadid-alwadifa.com/wp-content/uploads/2020/10/glovo.jpg',
      },
    ],
    TikTok: [
      {
        username: 'glovoapp',
        userAvatar: 'https://www.lenouvelliste.ma/wp-content/uploads/2025/07/GLOVO-1-1.jpg',
        postDate: '10 Oct 25',
        postImage: 'https://www.dimajadid.com/wp-content/uploads/2023/12/image-15.png',
        postText: 'Watch how easy it is to order food with Glovo! 🚀 From your favorite restaurant to your doorstep in minutes. Try it now! #Glovo #FoodDelivery #TikTokFood',
        views: '1.2M',
        likes: '45.6K',
        comments: '1.8K',
        shares: '15.3K',
        postUrl: 'https://tiktok.com/@glovoapp/video/glovo1',
      },
    ],
    YouTube: [
      {
        username: 'Glovo',
        userAvatar: 'https://www.lenouvelliste.ma/wp-content/uploads/2025/07/GLOVO-1-1.jpg',
        postDate: '5 Oct 25',
        postImage: 'https://mir-s3-cdn-cf.behance.net/projects/404/acb33c211337789.Y3JvcCw4MDgsNjMyLDAsMA.png',
        postText: 'Glovo: Revolutionizing Food Delivery | How We Make Ordering Easy',
        views: '150K',
        likes: '8.9K',
        comments: '567',
        postUrl: 'https://youtube.com/watch?v=glovo1',
      },
    ],
    X: [
      {
        username: 'glovoapp',
        userAvatar: 'https://www.lenouvelliste.ma/wp-content/uploads/2025/07/GLOVO-1-1.jpg',
        postDate: '20 Oct 25',
        postImage: 'https://www.dreamjob.ma/wp-content/uploads/2020/10/Glovo-Emploi-Recrutement-360x180.jpg',
        postText: 'New restaurants joining Glovo every day! 🌟 Discover amazing cuisines from around the world. What are you craving today? #Glovo #Foodie #Delivery',
        views: '89.7K',
        likes: '3.4K',
        comments: '156',
        retweets: '892',
        postUrl: 'https://x.com/glovoapp/status/glovo1',
      },
    ],
    LinkedIn: [
      {
        username: 'glovo-official',
        userAvatar: 'https://www.lenouvelliste.ma/wp-content/uploads/2025/07/GLOVO-1-1.jpg',
        postDate: '1 Oct 25',
        postImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXr07xPihxeE7d0X-YwuMIruKeB16ein5r1A&s',
        postText: 'At Glovo, we\'re committed to connecting people with their favorite foods while supporting local businesses. Join our mission to make food delivery sustainable and accessible for everyone. #Glovo #Sustainability #FoodTech',
        views: '25.6K',
        likes: '1.2K',
        comments: '89',
        reposts: '234',
        postUrl: 'https://linkedin.com/posts/glovo-official',
      },
    ],
    Facebook: [
      {
        username: 'Glovo',
        userAvatar: 'https://www.lenouvelliste.ma/wp-content/uploads/2025/07/GLOVO-1-1.jpg',
        postDate: '25 Oct 25',
        postImage: 'https://cdn.dribbble.com/userupload/42571436/file/original-3f960ada734f789e9f22bdcb3c08d67c.png?resize=400x0',
        postText: 'Weekend vibes with Glovo! 🎉 Order your favorite comfort food and relax. Use code GLOVO20 for 20% off your first order. Limited time offer! #Glovo #WeekendEats #FoodDelivery',
        views: '180K',
        likes: '9.8K',
        comments: '445',
        postUrl: 'https://facebook.com/glovo/posts/glovo1',
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
