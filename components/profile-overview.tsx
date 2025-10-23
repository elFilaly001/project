// Type for socialBreakdown
type SocialBreakdownItem = { name: string; percent: number; color: string };
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);
// ProfileOverview.jsx
// Next.js / React component (single-file) using Tailwind CSS
// Drop this into your components folder and import it on any page.

import React, { useState } from 'react';
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
  socialBreakdown = [
    { name: 'Instagram', percent: 40, color: '#E1306C' },
    { name: 'TikTok', percent: 20, color: '#010101' },
    { name: 'YouTube', percent: 15, color: '#FF0000' },
    { name: 'X', percent: 10, color: '#000000' },
    { name: 'LinkedIn', percent: 5, color: '#0077B5' },
    { name: 'Snapchat', percent: 5, color: '#FFFC00' },
    { name: 'Twitch', percent: 3, color: '#9147FF' },
    { name: 'Pinterest', percent: 2, color: '#E60023' },
  ],
}: {
  name?: string;
  subtitle?: string;
  description?: string;
  avatarUrl?: string | null;
  followers?: number;
  platform?: 'instagram' | 'twitter' | 'facebook';
  ringPercent?: number;
  socialBreakdown?: SocialBreakdownItem[];
}) {
  // compute a short formatted followers string
  function formatFollowers(n: number): string {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
    if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
    return String(n);
  }

  // Pie chart data for all social media percentages
  const pieData = {
    labels: socialBreakdown.map((s) => s.name),
    datasets: [
      {
        data: socialBreakdown.map((s) => s.percent),
        backgroundColor: socialBreakdown.map((s) => s.color),
        borderWidth: 0,
      },
    ],
  };

  // State for hovered segment
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const pieOptions = {
    cutout: '78%',
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    maintainAspectRatio: false,
    onHover: (_event: any, elements: any[]) => {
      if (elements && elements.length > 0) {
        setHoveredIndex(elements[0].index);
      } else {
        setHoveredIndex(null);
      }
    },
    events: [
      'mousemove',
      'mouseout',
      'touchstart',
      'touchmove',
      'touchend',
    ] as Array<
      | 'mousemove'
      | 'mouseout'
      | 'touchstart'
      | 'touchmove'
      | 'touchend'
      | 'fullscreenchange'
      | 'fullscreenerror'
      | 'abort'
      | 'animationcancel'
      | 'animationend'
      | 'animationiteration'
      | 'auxclick'
      | 'beforeinput'
      | 'blur'
      | 'cancel'
      | 'canplay'
      | 'canplaythrough'
      | 'change'
      | 'click'
      | 'close'
      | 'compositionend'
      | 'compositionstart'
      | 'compositionupdate'
      | 'contextmenu'
      | 'copy'
      | 'cuechange'
      | 'cut'
      | 'dblclick'
      | 'drag'
      | 'dragend'
      | 'dragenter'
      | 'dragleave'
      | 'dragover'
      | 'dragstart'
      | 'drop'
      | 'durationchange'
      | 'emptied'
      | 'ended'
      | 'error'
      | 'focus'
      | 'focusin'
      | 'focusout'
      | 'formdata'
      | 'gotpointercapture'
      | 'input'
      | 'invalid'
      | 'keydown'
      | 'keypress'
      | 'keyup'
      | 'load'
      | 'loadeddata'
      | 'loadedmetadata'
      | 'loadstart'
      | 'lostpointercapture'
      | 'mousedown'
      | 'mouseenter'
      | 'mouseleave'
      | 'mousemove'
      | 'mouseout'
      | 'mouseover'
      | 'mouseup'
      | 'paste'
      | 'pause'
      | 'play'
      | 'playing'
      | 'pointercancel'
      | 'pointerdown'
      | 'pointerenter'
      | 'pointerleave'
      | 'pointermove'
      | 'pointerout'
      | 'pointerover'
      | 'pointerup'
      | 'progress'
      | 'ratechange'
      | 'reset'
      | 'resize'
      | 'scroll'
      | 'securitypolicyviolation'
      | 'seeked'
      | 'seeking'
      | 'select'
      | 'selectionchange'
      | 'selectstart'
      | 'stalled'
      | 'submit'
      | 'suspend'
      | 'timeupdate'
      | 'toggle'
      | 'volumechange'
      | 'waiting'
      | 'wheel'
      | undefined
    >,
  };

  return (
    <div className="w-full px-6 lg:px-12">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 flex gap-6 items-start">
        {/* Left: avatar + text */}
        <div className="flex-1 min-w-0 flex flex-col gap-6">
          <div className="flex gap-6 items-center">
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
            </div>
          </div>

          <div className="mt-4 border-t border-gray-200 pt-4">
            <h4 className="text-gray-900 text-lg font-medium">Profile Overview</h4>
            <p className="text-gray-600 mt-3 text-sm leading-relaxed max-w-2xl">{description}</p>
          </div>
        </div>

        {/* Right: followers donut (multi-platform) */}
        <div className="w-60 flex-shrink-0 flex flex-col items-center">
          <div className="text-sm text-gray-600 mb-4">Followers Dispatch</div>
          <div className="relative w-52 h-52 flex items-center justify-center">
            <Pie data={pieData} options={pieOptions} width={208} height={208} />
            {/* Center content: show hovered platform or total */}
            <div className="absolute flex flex-col items-center justify-center w-52 h-52 pointer-events-none select-none">
              {hoveredIndex !== null && socialBreakdown[hoveredIndex] ? (
                <>
                  <span className="text-lg font-bold text-gray-900">{socialBreakdown[hoveredIndex].percent}%</span>
                  <span className="text-xs font-medium mt-1" style={{ color: socialBreakdown[hoveredIndex].color }}>{socialBreakdown[hoveredIndex].name}</span>
                </>
              ) : (
                <>
                  <span className="text-lg font-bold text-gray-900">{formatFollowers(followers)}</span>
                  <span className="text-xs text-gray-500">Total</span>
                </>
              )}
            </div>
          </div>
          {/* legend or small label */}
          <div className="mt-3 text-xs text-gray-500 text-center">All Social Platforms</div>
        </div>
      </div>
    </div>
  );
}

// PlatformBadge now supports all platforms
function PlatformBadge({ platform, size = 18 }: { platform: string; size?: number }) {
  // SVGs or icons for each platform
  if (platform === 'Instagram') {
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
  if (platform === 'TikTok') {
    return (
      <div style={{ width: size, height: size }} className="rounded-full flex items-center justify-center bg-black" aria-hidden>
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M16.5 3v10.38a4.12 4.12 0 11-4.12-4.12" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12.38" cy="17.5" r="1.5" fill="#fff"/></svg>
      </div>
    );
  }
  if (platform === 'YouTube') {
    return (
      <div style={{ width: size, height: size }} className="rounded-full flex items-center justify-center bg-[#FF0000]" aria-hidden>
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="12" fill="#FF0000"/><polygon points="10,8 16,12 10,16" fill="#fff"/></svg>
      </div>
    );
  }
  if (platform === 'X') {
    return (
      <div style={{ width: size, height: size }} className="rounded-full flex items-center justify-center bg-black" aria-hidden>
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M7 7l10 10M7 17L17 7" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
      </div>
    );
  }
  if (platform === 'LinkedIn') {
    return (
      <div style={{ width: size, height: size }} className="rounded-full flex items-center justify-center bg-[#0077B5]" aria-hidden>
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="12" fill="#0077B5"/><text x="12" y="16" textAnchor="middle" fontSize="10" fill="#fff">in</text></svg>
      </div>
    );
  }
  if (platform === 'Snapchat') {
    return (
      <div style={{ width: size, height: size }} className="rounded-full flex items-center justify-center bg-[#FFFC00]" aria-hidden>
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="12" fill="#FFFC00"/><circle cx="12" cy="12" r="6" stroke="#000" strokeWidth="2" fill="none"/></svg>
      </div>
    );
  }
  if (platform === 'Twitch') {
    return (
      <div style={{ width: size, height: size }} className="rounded-full flex items-center justify-center bg-[#9147FF]" aria-hidden>
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="12" fill="#9147FF"/><text x="12" y="16" textAnchor="middle" fontSize="10" fill="#fff">T</text></svg>
      </div>
    );
  }
  if (platform === 'Pinterest') {
    return (
      <div style={{ width: size, height: size }} className="rounded-full flex items-center justify-center bg-[#E60023]" aria-hidden>
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="12" fill="#E60023"/><text x="12" y="16" textAnchor="middle" fontSize="10" fill="#fff">P</text></svg>
      </div>
    );
  }
  // fallback
  return (
    <div style={{ width: size, height: size }} className="rounded-full bg-gray-400" />
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
