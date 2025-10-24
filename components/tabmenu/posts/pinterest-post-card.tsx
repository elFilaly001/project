import React from "react";
import { FaRegHeart, FaRegComment, FaRegEye } from "react-icons/fa";

interface PinterestPostCardProps {
  username: string;
  userAvatar: string;
  postDate: string;
  postImage: string;
  postText: string;
  views: string;
  likes: string;
  comments: string;
  postUrl?: string;
}

export default function PinterestPostCard({
  username,
  userAvatar,
  postDate,
  postImage,
  postText,
  views,
  likes,
  comments,
  postUrl,
}: PinterestPostCardProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border w-full max-w-xs">
      <div className="flex items-center justify-between mb-2">
        {/* Left group: avatar + username */}
        <div className="flex items-center gap-2">
          <img
            src={userAvatar}
            alt={username}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-semibold text-gray-800 text-sm">@{username}</span>
        </div>
        {/* Right group: Pinterest icon + label + postUrl icon */}
        <div className="flex items-center gap-2">
          <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/pinterest.svg" alt="Pinterest" className="w-5 h-5" />
          <span className="text-xs text-gray-400">Pin</span>
          {postUrl && (
            <a
              href={postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-indigo-500"
              title="Open in Pinterest"
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 20 20">
                <path
                  d="M14 3h3v3"
                  stroke="#64748b"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 10l7-7"
                  stroke="#64748b"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          )}
        </div>
      </div>
      <div className="rounded-lg overflow-hidden mb-3">
        <img
          src={postImage}
          alt="Pinterest post"
          className="w-full h-64 object-cover"
        />
      </div>
      <div className="text-xs text-gray-400 font-medium mb-1">{postDate}</div>
      <div className="text-gray-700 text-sm mb-3 line-clamp-3">{postText}</div>
      <div className="flex items-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <FaRegEye /> {views}
        </span>
        <span className="flex items-center gap-1">
          <FaRegHeart /> {likes}
        </span>
        <span className="flex items-center gap-1">
          <FaRegComment /> {comments}
        </span>
      </div>
    </div>
  );
}
