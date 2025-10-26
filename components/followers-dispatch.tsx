import React, { useState } from "react";

export type SocialBreakdownItem = {
  name: string;
  percent: number;
  followersCount: number;
  color: string;
  logo?: string;
  coloredLogo?: string;
  gradient?: string;
};

interface FollowersDispatchProps {
  socialBreakdown: SocialBreakdownItem[];
}

export default function FollowersDispatch({ socialBreakdown }: FollowersDispatchProps) {
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
    <div className="w-full min-w-0">
      <div className="text-sm text-gray-600 mb-4 font-medium text-center w-full">
        Followers Dispatch
      </div>
  <div className="flex flex-row items-center gap-4 w-full min-w-0">
        {/* Insights panel */}
        <div className="w-full md:w-44 lg:w-56 p-4 flex items-center min-w-0 overflow-hidden">
          <ul className="text-sm text-gray-600 space-y-2 w-full">
            {socialBreakdown.map((platform, index) => (
              <li key={index} className="flex items-center gap-2 w-full">
                <span className="flex items-center gap-2 min-w-0">
                  <img
                    src={platform.coloredLogo}
                    alt={platform.name}
                    className="w-5 h-5 flex-shrink-0"
                  />
                </span>
                <span className="font-medium text-gray-400">
                  {platform.followersCount}
                </span>
              </li>
            ))}
          </ul>
        </div>
        {/* Pie chart container (responsive, no fixed height) */}
        <div className="flex-shrink-0 w-56 h-56 md:w-64 md:h-64 relative flex items-center justify-center min-w-0 overflow-hidden">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 256 256"
            className="transform -rotate-90"
            style={{ maxWidth: "256px", maxHeight: "256px" }}
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
  );
}
