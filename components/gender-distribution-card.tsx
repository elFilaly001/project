import React, { useState } from "react";

const genderData = [
  { label: "Male", value: 40, color: "#2563eb" },      // blue-600
  { label: "Female", value: 55, color: "#e11d48" },   // rose-600
  { label: "Unknown", value: 5, color: "#6b7280" },   // gray-500
];

export default function GenderDistributionCard() {
  const total = genderData.reduce((sum, g) => sum + g.value, 0);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
      {/* header: matches other cards */}
      <div className="flex items-start justify-between">
        <h3 className="text-gray-700 font-semibold">Gender Distribution</h3>

        {/* tooltip: same pattern used across cards */}
        <div className="relative group">
          <button
            type="button"
            aria-describedby="gender-tooltip"
            className="text-gray-400 text-xs leading-none px-2 py-1 rounded hover:bg-gray-50"
          >
            <span className="sr-only">What is this?</span>?
          </button>

          <div
            id="gender-tooltip"
            role="tooltip"
            aria-hidden="true"
            style={{ top: "100%" }}
            className="absolute left-1/2 z-20 -translate-x-1/2 mt-2 w-80 bg-slate-800 text-white text-sm rounded-xl px-4 py-3 shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"
          >
            The audience’s gender distribution is determined by analyzing indicators such as the profile picture, name, bio text, and selfies from recent posts.
          </div>
        </div>
      </div>

      {/* body */}
      <div className="flex flex-col items-center w-full mt-4">
        <DonutChart data={genderData} hovered={hovered} setHovered={setHovered} />

        <div className="flex gap-6 mt-4">
          {genderData.map((g, idx) => (
            <div
              key={g.label}
              className="flex items-center gap-2 cursor-pointer"
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
            >
              <span
                className="w-3 h-3 rounded-full inline-block"
                style={{ backgroundColor: g.color }}
                aria-hidden="true"
              />
              <span className="text-gray-600 text-sm font-medium">{g.label}</span>
              <span className="text-gray-700 text-sm font-semibold min-w-[40px] text-right">
                {Math.round((g.value / total) * 100)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DonutChart({
  data,
  hovered,
  setHovered,
}: {
  data: { label: string; value: number; color: string }[];
  hovered: number | null;
  setHovered: (idx: number | null) => void;
}) {
  const size = 120;
  const stroke = 16;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let start = 0;

  // Center text
  let centerLabel = "";
  let centerPercent = "";
  if (hovered !== null && data[hovered]) {
    centerLabel = data[hovered].label;
    centerPercent = `${Math.round((data[hovered].value / total) * 100)}%`;
  } else {
    centerLabel = "Gender";
    centerPercent = "100%";
  }

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} className="block" role="img" aria-label="Gender distribution">
        {data.map((d, idx) => {
          const percent = d.value / total;
          const arcLength = percent * circumference;
          const dashArray = `${arcLength} ${circumference - arcLength}`;
          const rotation = (start / total) * 360;
          const style: React.CSSProperties = {
            stroke: d.color,
            strokeWidth: stroke,
            strokeDasharray: dashArray,
            fill: "none",
            opacity: hovered === null || hovered === idx ? 1 : 0.3,
            cursor: "pointer",
            transition: "opacity 0.2s",
          };
          const eventHandlers = {
            onMouseEnter: () => setHovered(idx),
            onMouseLeave: () => setHovered(null),
          };
          start += d.value;
          return (
            <circle
              key={d.label}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              style={style}
              strokeLinecap="round"
              transform={`rotate(${rotation - 90} ${size / 2} ${size / 2})`}
              {...eventHandlers}
            />
          );
        })}
        {/* inner circle for donut hole */}
        <circle cx={size / 2} cy={size / 2} r={radius - stroke} fill="#fff" />
        {/* Center text */}
        <text x="50%" y="48%" textAnchor="middle" fontSize="18" fontWeight="700" fill="#334155">
          {centerPercent}
        </text>
        <text x="50%" y="62%" textAnchor="middle" fontSize="13" fontWeight="500" fill="#64748b">
          {centerLabel}
        </text>
      </svg>
    </div>
  );
}

