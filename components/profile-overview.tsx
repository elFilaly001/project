import React, { useState } from "react";

type SocialBreakdownItem = {
  name: string;
  percent: number;
  followersCount: number;
  color: string;
  logo?: string;
  coloredLogo?: string;
  gradient?: string;
};

export default function ProfileOverview({
  name = "Glovo Maroc",
  subtitle = "Your Local Delivery Partner for Everything",
  description = `Glovo Maroc is a delivery service that connects customers with local businesses, offering a wide range of products from food to groceries. Their social media presence emphasizes partnerships with local merchants, showcasing success stories and community engagement. Content themes include Ramadan promotions, customer support, and highlighting the convenience of their service.`,
  avatarUrl = null,
  followers = 111100,
  platform = "instagram" as "instagram" | "twitter" | "facebook",
  ringPercent = 75,
  socialBreakdown = [
    {
      name: "Instagram",
      percent: 40,
      followersCount: 4300.32,
      color: "#E1306C",
      gradient:
        "linear-gradient(135deg, #833AB4 0%, #E1306C 50%, #FD1D1D 100%)",
      logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg",
      coloredLogo:
        "https://upload.wikimedia.org/wikipedia/commons/2/21/Instagram_Glyph_Gradient_RGB_logo.svg",
    },
    {
      name: "TikTok",
      percent: 20,
      followersCount: 2100,
      color: "#010101",
      logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/tiktok.svg",
      coloredLogo:
        "https://upload.wikimedia.org/wikipedia/commons/a/a6/Tiktok_icon.svg",
    },
    {
      name: "YouTube",
      percent: 15,
      followersCount: 1380,
      color: "#FF0000",
      logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/youtube.svg",
      coloredLogo:
        "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg",
    },
    {
      name: "X",
      percent: 10,
      followersCount: 890.33,
      color: "#000000",
      logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/x.svg",
      coloredLogo:
        "https://upload.wikimedia.org/wikipedia/commons/5/53/X_logo_2023_original.svg",
    },
    {
      name: "LinkedIn",
      percent: 5,
      followersCount: 500,
      color: "#0077B5",
      logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg",
      coloredLogo:
        "https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg",
    },
  ],
}: {
  name?: string;
  subtitle?: string;
  description?: string;
  avatarUrl?: string | null;
  followers?: number;
  platform?: "instagram" | "twitter" | "facebook";
  ringPercent?: number;
  socialBreakdown?: SocialBreakdownItem[];
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const total = socialBreakdown.reduce((sum, item) => sum + item.percent, 0);

  function isHexColorDark(hex: string) {
    try {
      const cleaned = hex.replace("#", "");
      const bigint = parseInt(
        cleaned.length === 3
          ? cleaned
              .split("")
              .map((c) => c + c)
              .join("")
          : cleaned,
        16
      );
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
      return luminance < 0.55;
    } catch (e) {
      return false;
    }
  }

  return (
    <div className="w-full px-6 lg:px-12">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 flex gap-6 items-start">
        {/* Left: avatar + text */}
        <div className="flex-1 min-w-0 flex flex-col gap-6">
          <div className="flex gap-6 items-center">
            <div className="flex-shrink-0">
              <div className="w-28 h-28 rounded-full bg-yellow-400 flex items-center justify-center text-3xl font-bold text-white">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span>G</span>
                )}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-gray-900 text-2xl font-semibold leading-tight">
                {name}
              </h3>
              <p className="text-[13px] text-gray-600 mt-1">{subtitle}</p>
            </div>
          </div>

          <div className="mt-4 border-t border-gray-200 pt-4">
            <h4 className="text-gray-900 text-lg font-medium">
              Profile Overview
            </h4>
            <p className="text-gray-600 mt-3 text-sm leading-relaxed max-w-2xl">
              {description}
            </p>
          </div>
        </div>

        {/* Right: chart + insights (now side-by-side on md+) */}
        <div className="w-full md:w-80 flex-shrink-0">
          <div className="text-sm text-gray-600 mb-4 font-medium text-center">
            Followers Dispatch
          </div>

          {/* Layout: stack on small screens, row on md+ */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            {/* Insights panel (beside chart on md+) */}
            <div className="w-full md:w-44 lg:w-56 p-4 h-64 flex items-center">
              <ul className="text-sm text-gray-600 space-y-2">
                {socialBreakdown.map((platform, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span className="flex items-center gap-2 min-w-0">
                      <img
                        src={platform.coloredLogo}
                        alt={platform.name}
                        className="w-5 h-5 flex-shrink-0"
                      />
                    </span>
                    <span className="font-medium text-gray-400 ml-3">
                      {platform.followersCount}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Pie chart container (fixed square) */}
            <div className="flex-shrink-0 w-64 h-64 relative flex items-center justify-center">
              <svg
                width="256"
                height="256"
                viewBox="0 0 256 256"
                className="transform -rotate-90"
              >
                <defs>
                  <linearGradient
                    id="instagramGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#833AB4" />
                    <stop offset="50%" stopColor="#E1306C" />
                    <stop offset="100%" stopColor="#FD1D1D" />
                  </linearGradient>
                </defs>

                {socialBreakdown.map((platform, index) => {
                  const startAngle = socialBreakdown
                    .slice(0, index)
                    .reduce(
                      (sum, item) => sum + (item.percent / total) * 360,
                      0
                    );
                  const endAngle =
                    startAngle + (platform.percent / total) * 360;

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
                    "Z",
                  ].join(" ");

                  return (
                    <path
                      key={index}
                      d={pathData}
                      fill={
                        platform.name === "Instagram"
                          ? "url(#instagramGradient)"
                          : platform.color
                      }
                      stroke="white"
                      strokeWidth="2"
                      style={{
                        cursor: "pointer",
                        opacity:
                          hoveredIndex === null || hoveredIndex === index
                            ? 1
                            : 0.6,
                        transition: "opacity 0.2s",
                      }}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    />
                  );
                })}
              </svg>

              {/* Logos/dots positioned around the pie */}
              {socialBreakdown.map((platform, index) => {
                const startAngle = socialBreakdown
                  .slice(0, index)
                  .reduce((sum, item) => sum + (item.percent / total) * 360, 0);
                const endAngle = startAngle + (platform.percent / total) * 360;
                const midAngle = (startAngle + endAngle) / 2 - 90;

                const computedSize = Math.round(
                  10 + (platform.percent / Math.max(1, total)) * 18
                ); // 10..28
                const logoSize = Math.max(10, Math.min(28, computedSize));

                const baseRadius = 68;
                const pushMultiplier = Math.max(0, 6 - platform.percent);
                const extraPush = pushMultiplier * 6;
                const iconRadius = baseRadius + extraPush;

                const x = iconRadius * Math.cos((midAngle * Math.PI) / 180);
                const y = iconRadius * Math.sin((midAngle * Math.PI) / 180);

                const shouldRenderDot = platform.percent < 3;
                const logoNeedsInvert = isHexColorDark(platform.color);

                return (
                  <div
                    key={index}
                    className="absolute rounded-full pointer-events-auto"
                    style={{
                      top: `calc(50% + ${y}px)`,
                      left: `calc(50% + ${x}px)`,
                      transform: "translate(-50%, -50%)",
                      opacity:
                        hoveredIndex === null || hoveredIndex === index
                          ? 1
                          : 0.6,
                      transition: "opacity 0.2s, transform 0.12s",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: `${logoSize + 8}px`,
                      height: `${logoSize + 8}px`,
                      padding: 0,
                      borderRadius: "999px",
                      background: "transparent",
                    }}
                  >
                    {shouldRenderDot ? (
                      <div
                        style={{
                          width: `${Math.max(6, Math.round(logoSize * 0.6))}px`,
                          height: `${Math.max(
                            6,
                            Math.round(logoSize * 0.6)
                          )}px`,
                          borderRadius: "50%",
                          background: platform.color,
                          boxShadow: "0 1px 2px rgba(0,0,0,0.15)",
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
                          objectFit: "contain",
                          filter: logoNeedsInvert
                            ? "invert(1) brightness(2) drop-shadow(0 1px 1px rgba(0,0,0,0.35))"
                            : "drop-shadow(0 1px 1px rgba(0,0,0,0.12))",
                        }}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      />
                    )}

                    {hoveredIndex === index && (
                      <div
                        className="absolute bg-gray-800 text-white text-xs rounded px-2 py-1"
                        style={{
                          top: "-30px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          whiteSpace: "nowrap",
                          pointerEvents: "none",
                        }}
                      >
                        {platform.name}: {platform.percent}%
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
