import React from "react";

// Define types locally for SocialPostsTable
export type InstagramPost = {
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
export type TikTokPost = InstagramPost & { shares: string };
export type YouTubePost = InstagramPost;
export type XPost = InstagramPost & { retweets: string };
export type LinkedInPost = InstagramPost & { reposts: string };
export type SnapchatPost = InstagramPost;

export type SocialPostsTableProps = {
  postsData: {
    Instagram: InstagramPost[];
    TikTok: TikTokPost[];
    YouTube: YouTubePost[];
    X: XPost[];
    LinkedIn: LinkedInPost[];
    Snapchat: SnapchatPost[];
    Facebook: InstagramPost[];
  };
  selectedSocial: string | null;
};

const SocialPostsTable: React.FC<SocialPostsTableProps> = ({ postsData, selectedSocial }) => {
  return (
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
                case 'Snapchat':
                  iconUrl = 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/snapchat.svg';
                  label = 'Snapchat';
                  break;
                case 'Facebook':
                  iconUrl = 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg';
                  label = 'Facebook';
                  break;
                default:
                  iconUrl = '';
                  label = platform;
              }
              let sharesValue = '-';
              if ('shares' in post && post.shares) sharesValue = post.shares;
              else if ('reposts' in post && post.reposts) sharesValue = post.reposts;
              else if ('retweets' in post && post.retweets) sharesValue = post.retweets;
              return (
                <tr key={platform + idx} className="border-b hover:bg-gray-50 transition text-sm">
                  <td className="py-2 px-3 flex items-center gap-2 w-[320px]">
                    <img src={post.userAvatar} alt={post.username} className="w-8 h-8 rounded-full object-cover" />
                    <span className="break-words">{post.postText || '-'}</span>
                  </td>
                  <td className="py-2 px-3">
                    <div className="flex items-center gap-1">
                      {iconUrl && <img src={iconUrl} alt={label} className="w-5 h-5" />}
                      <span className="text-xs text-gray-700">{label}</span>
                    </div>
                  </td>
                  <td className="py-2 px-3 text-right">{post.likes || '-'}</td>
                  <td className="py-2 px-3 text-right">{post.comments || '-'}</td>
                  <td className="py-2 px-3 text-right">{sharesValue}</td>
                  <td className="py-2 px-3 text-right">{post.views || '-'}</td>
                  <td className="py-2 px-3 text-right">9.9%</td>
                  <td className="py-2 px-3 text-right whitespace-nowrap">{post.postDate || '-'}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SocialPostsTable;
