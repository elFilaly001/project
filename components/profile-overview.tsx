// ProfileOverview.jsx
// Next.js / React component (single-file) using Tailwind CSS
// Drop this into your components folder and import it on any page.

import React from 'react';
import Image from 'next/image';

/**
 * Props:
 * - name: string
 * - subtitle: string
 * - description: string
 * - avatarUrl: string (optional)
 * - followers: number
 * - platform: 'instagram' | 'twitter' | 'facebook' (used for small badge)
 * - ringPercent: number (0-100) how full the donut is
 */

export default function ProfileOverview({
  name = 'Glovo Maroc',
  subtitle = 'Your Local Delivery Partner for Everything',
  description = `Glovo Maroc is a delivery service that connects customers with local businesses, offering a wide range of products from food to groceries. Their social media presence emphasizes partnerships with local merchants, showcasing success stories and community engagement. Content themes include Ramadan promotions, customer support, and highlighting the convenience of their service.`,
  avatarUrl = null,
  followers = 111100,
  platform = 'instagram' as 'instagram' | 'twitter' | 'facebook',
  ringPercent = 75,
}: {
  name?: string;
  subtitle?: string;
  description?: string;
  avatarUrl?: string | null;
  followers?: number;
  platform?: 'instagram' | 'twitter' | 'facebook';
  ringPercent?: number;
}) {
  // compute a short formatted followers string
  function formatFollowers(n: number): string {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
    if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
    return String(n);
  }

  // donut style (conic gradient) using ringPercent
  const angle = Math.max(0, Math.min(100, ringPercent)) * 3.6; // percent -> degrees
  const gradient = `conic-gradient(
    rgba(236,72,153,1) 0deg ${angle}deg,
    rgba(59,130,246,0.12) ${angle}deg 360deg
  )`;

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 flex gap-6 items-start">
        {/* Left: avatar + text */}
        <div className="flex-1 min-w-0 flex gap-6">
          <div className="flex-shrink-0">
            <div className="w-28 h-28 rounded-full bg-yellow-400 flex items-center justify-center text-3xl font-bold text-white">
              {/* fallback avatar initials */}
              {avatarUrl ? (
                <Image src={avatarUrl} alt={name} width={112} height={112} className="rounded-full object-cover" />
              ) : (
                <span>G</span>
              )}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-gray-900 text-2xl font-semibold leading-tight">{name}</h3>
            <p className="text-[13px] text-gray-600 mt-1">{subtitle}</p>

            <div className="mt-4 border-t border-gray-200 pt-4">
              <h4 className="text-gray-900 text-lg font-medium">Profile Overview</h4>
              <p className="text-gray-600 mt-3 text-sm leading-relaxed max-w-2xl">{description}</p>
            </div>
          </div>
        </div>

        {/* Right: followers donut */}
        <div className="w-48 flex-shrink-0 flex flex-col items-center">
          <div className="text-sm text-gray-600 mb-4">Followers Dispatch</div>

          <div className="relative w-36 h-36 rounded-full" aria-hidden>
            {/* outer ring using conic gradient */}
            <div
              className="w-36 h-36 rounded-full p-2"
              style={{ background: gradient }}
            >
              {/* inner circle to create donut hole */}
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                <div className="flex flex-col items-center">
                  {/* small platform icon placeholder */}
                  <div className="text-xs text-gray-600 mb-1 flex items-center gap-2">
                    <PlatformBadge platform={platform} />
                    <span className="font-medium text-gray-900">{formatFollowers(followers)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* legend or small label */}
          <div className="mt-3 text-xs text-gray-500 text-center">Shown on {platform}</div>
        </div>
      </div>
    </div>
  );
}

function PlatformBadge({ platform }: { platform: 'instagram' | 'twitter' | 'facebook' }) {
  const size = 18;
  if (platform === 'instagram') {
    // small instagram-like gradient circle with camera icon (svg)
    return (
      <div style={{ width: size, height: size }} className="rounded-full flex items-center justify-center" aria-hidden>
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="igGrad" x1="0" x2="1">
              <stop offset="0" stopColor="#f58529" />
              <stop offset="0.5" stopColor="#dd2a7b" />
              <stop offset="1" stopColor="#8134af" />
            </linearGradient>
          </defs>
          <circle cx="12" cy="12" r="10" fill="url(#igGrad)" />
          <path d="M12 7a5 5 0 100 10 5 5 0 000-10z" fill="#0b0b0d" />
        </svg>
      </div>
    );
  }
  // default placeholder
  return (
    <div className="w-4 h-4 bg-gray-500 rounded-full" />
  );
}

/*
USAGE example (Next.js page):

import ProfileOverview from '@/components/ProfileOverview';

export default function Page() {
  return (
    <div className="min-h-screen bg-[#09090b] p-8">
      <ProfileOverview
        name="Glovo Maroc"
        subtitle="Glovo Maroc: Your Local Delivery Partner for Everything"
        followers={111100}
        ringPercent={88}
      />
    </div>
  );
}

Notes:
- This component uses Tailwind CSS utility classes. Make sure Tailwind is configured in your Next.js project.
- The donut uses a CSS conic-gradient. For older browsers you may need a fallback.
- Customize spacing, colors, and borders to match your exact design system.
*/
