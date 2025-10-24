// Type for socialBreakdown
import React, { useState } from 'react';

type SocialBreakdownItem = { 
  name: string; 
  percent: number; 
  color: string; 
  logo?: string;
  gradient?: string;
};

export default function ProfileOverview({
  name = 'Glovo Maroc',
  subtitle = 'Your Local Delivery Partner for Everything',
  description = `Glovo Maroc is a delivery service that connects customers with local businesses, offering a wide range of products from food to groceries. Their social media presence emphasizes partnerships with local merchants, showcasing success stories and community engagement. Content themes include Ramadan promotions, customer support, and highlighting the convenience of their service.`,
  avatarUrl = null,
  followers = 111100,
  platform = 'instagram' as 'instagram' | 'twitter' | 'facebook',
  ringPercent = 75,
  socialBreakdown = [
    {
      name: "Instagram",
      percent: 40,
      color: "#E1306C",
      gradient: "linear-gradient(135deg, #833AB4 0%, #E1306C 50%, #FD1D1D 100%)",
      logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg",
    },
    {
      name: "TikTok",
      percent: 20,
      color: "#010101",
      logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/tiktok.svg",
    },
    {
      name: "YouTube",
      percent: 15,
      color: "#FF0000",
      logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/youtube.svg",
    },
    {
      name: "X",
      percent: 10,
      color: "#000000",
      logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/x.svg",
    },
    {
      name: "LinkedIn",
      percent: 5,
      color: "#0077B5",
      logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg",
    },
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  function formatFollowers(n: number): string {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
    if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
    return String(n);
  }

  const total = socialBreakdown.reduce((sum, item) => sum + item.percent, 0);

  return (
    <div className="w-full px-6 lg:px-12">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 flex gap-6 items-start">
        {/* Left: avatar + text */}
        <div className="flex-1 min-w-0 flex flex-col gap-6">
          <div className="flex gap-6 items-center">
            <div className="flex-shrink-0">
              <div className="w-28 h-28 rounded-full bg-yellow-400 flex items-center justify-center text-3xl font-bold text-white">
                {avatarUrl ? (
                  <img src={avatarUrl} alt={name} className="w-full h-full rounded-full object-cover" />
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

        {/* Right: followers pie chart */}
        <div className="w-72 flex-shrink-0 flex flex-col items-center">
          <div className="text-sm text-gray-600 mb-4 font-medium">Followers Dispatch</div>
          
          <div className="relative w-64 h-64 flex items-center justify-center">
            <svg width="256" height="256" viewBox="0 0 256 256" className="transform -rotate-90">
              <defs>
                <linearGradient id="instagramGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#833AB4" />
                  <stop offset="50%" stopColor="#E1306C" />
                  <stop offset="100%" stopColor="#FD1D1D" />
                </linearGradient>
              </defs>
              
              {socialBreakdown.map((platform, index) => {
                const startAngle = socialBreakdown.slice(0, index).reduce((sum, item) => sum + (item.percent / total) * 360, 0);
                const endAngle = startAngle + (platform.percent / total) * 360;
                
                const startRad = (startAngle * Math.PI) / 180;
                const endRad = (endAngle * Math.PI) / 180;
                
                const radius = 100;
                const centerX = 128;
                const centerY = 128;
                
                const x1 = centerX + radius * Math.cos(startRad);
                const y1 = centerY + radius * Math.sin(startRad);
                const x2 = centerX + radius * Math.cos(endRad);
                const y2 = centerY + radius * Math.sin(endRad);
                
                const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
                
                const pathData = [
                  `M ${centerX} ${centerY}`,
                  `L ${x1} ${y1}`,
                  `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                  'Z'
                ].join(' ');
                
                return (
                  <path
                    key={index}
                    d={pathData}
                    fill={platform.name === "Instagram" ? "url(#instagramGradient)" : platform.color}
                    stroke="white"
                    strokeWidth="2"
                    style={{
                      cursor: 'pointer',
                      opacity: hoveredIndex === null || hoveredIndex === index ? 1 : 0.6,
                      transition: 'opacity 0.2s'
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  />
                );
              })}
            </svg>
            
            {/* Platform logos / dots */}
            {socialBreakdown.map((platform, index) => {
              const startAngle = socialBreakdown.slice(0, index).reduce((sum, item) => sum + (item.percent / total) * 360, 0);
              const endAngle = startAngle + (platform.percent / total) * 360;
              const midAngle = (startAngle + endAngle) / 2 - 90;

              // --- NEW: compute logo size (10..28px) based on percent ---
              // small slices -> smaller icons
              const computedSize = Math.round(10 + (platform.percent / Math.max(1, total)) * 18); // 10..28
              const logoSize = Math.max(10, Math.min(28, computedSize));

              // --- NEW: push very small slices further out so they don't collide ---
              // base radius for icons
              const baseRadius = 68;
              // if percent is small (<6) push out more (the smaller the percent, the larger the push)
              const pushMultiplier = Math.max(0, (6 - platform.percent)); // e.g. percent=2 -> 4
              const extraPush = pushMultiplier * 6; // tweak this multiplier to taste
              const iconRadius = baseRadius + extraPush;

              const x = iconRadius * Math.cos((midAngle * Math.PI) / 180);
              const y = iconRadius * Math.sin((midAngle * Math.PI) / 180);

              // --- NEW: fallback for extremely small slices: render a small colored dot instead of logo ---
              const shouldRenderDot = platform.percent < 3; // threshold (tweak as needed)

              return (
                <div
                  key={index}
                  className="absolute bg-white rounded-full p-1 shadow-sm pointer-events-none"
                  style={{
                    top: `calc(50% + ${y}px)`,
                    left: `calc(50% + ${x}px)`,
                    transform: 'translate(-50%, -50%)',
                    opacity: hoveredIndex === null || hoveredIndex === index ? 1 : 0.6,
                    transition: 'opacity 0.2s, transform 0.12s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    // reduce container size slightly to avoid overlap while centering
                    width: `${logoSize + 8}px`,
                    height: `${logoSize + 8}px`,
                    padding: 0,
                    borderRadius: '999px',
                  }}
                >
                  {shouldRenderDot ? (
                    // small colored dot instead of logo for extremely tiny segments
                    <div
                      style={{
                        width: `${Math.max(6, Math.round(logoSize * 0.6))}px`,
                        height: `${Math.max(6, Math.round(logoSize * 0.6))}px`,
                        borderRadius: '50%',
                        background: platform.color,
                        boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
                      }}
                      title={`${platform.name}: ${platform.percent}%`}
                    />
                  ) : (
                    <img
                      src={platform.logo}
                      alt={platform.name}
                      className="block"
                      style={{
                        width: `${logoSize}px`,
                        height: `${logoSize}px`,
                        objectFit: 'contain',
                        filter: platform.color === '#010101' ? 'brightness(0) invert(1)' : undefined,
                      }}
                    />
                  )}

                  {hoveredIndex === index && (
                    <div className="absolute bg-gray-800 text-white text-xs rounded px-2 py-1" style={{
                      top: '-30px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      whiteSpace: 'nowrap'
                    }}>
                      {platform.name}: {platform.percent}%
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
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
