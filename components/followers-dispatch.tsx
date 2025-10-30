import React, { useState } from "react";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartEvent, ActiveElement, TooltipItem } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

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
  showTitle?: boolean;
  showInsights?: boolean;
}

export default function FollowersDispatch({ socialBreakdown, showTitle = true, showInsights = true }: FollowersDispatchProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const total = socialBreakdown.reduce((sum, item) => sum + item.percent, 0);

  const data = {
    labels: socialBreakdown.map(p => p.name),
    datasets: [{
      data: socialBreakdown.map(p => p.percent),
      backgroundColor: socialBreakdown.map(p => {
        if (p.name === 'Instagram') {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (ctx) {
            const gradient = ctx.createLinearGradient(0, 0, 256, 256);
            gradient.addColorStop(0, '#833AB4');
            gradient.addColorStop(0.5, '#E1306C');
            gradient.addColorStop(1, '#FD1D1D');
            return gradient;
          } else {
            return p.color;
          }
        } else {
          return p.color;
        }
      }),
      borderColor: 'white',
      borderWidth: 2,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context: TooltipItem<'pie'>) => `${context.label}: ${context.parsed}%`,
        },
      },
    },
    onHover: (event: ChartEvent, activeElements: ActiveElement[]) => {
      if (activeElements.length > 0) {
        setHoveredIndex(activeElements[0].index);
      } else {
        setHoveredIndex(null);
      }
    },
    onLeave: () => {
      setHoveredIndex(null);
    },
  };

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
      {showTitle && (
        <div className="text-sm text-gray-600 mb-4 font-medium text-center w-full">
          Followers Dispatch
        </div>
      )}
  <div className={`flex ${showInsights ? 'flex-row items-center gap-4' : 'justify-center'} w-full min-w-0`}>
        {/* Insights panel */}
        {showInsights && (
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
        )}
        {/* Pie chart container (responsive, no fixed height) */}
        <div className="flex-shrink-0 w-56 h-56 md:w-64 md:h-64 relative flex items-center justify-center min-w-0 overflow-hidden">
          <Pie data={data} options={options} />
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
                  opacity: 1, // Remove hover opacity effect
                  transition: "transform 0.12s",
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
                      height: `${Math.max(6, Math.round(logoSize * 0.6))}px`,
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
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
