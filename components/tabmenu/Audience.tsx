import React, { useState } from "react";

/**
 * Audience component for the TabBar.
 * - Toggle between Followers / Likers (UI only)
 * - Shows platform note
 * - Left: Followers credibility donut + legend + explanation
 * - Middle: Notable followers list
 * - Right: Audience reachability bar chart
 *
 * Replace static data with props or fetch as needed.
 */

export default function Audience() {
  const [mode, setMode] = useState("followers"); // 'followers' | 'likers'
  const platform = "instagram";

  const credibility = {
    percent: 73,
    mood: "Bad",
    breakdown: [
      { label: "Mass followers", value: 14, color: "#F59E0B" }, // amber
      { label: "Suspicious", value: 20, color: "#FB7185" }, // pink/red
      { label: "Influencers", value: 4, color: "#7C3AED" }, // purple
      { label: "Real", value: 63, color: "#10B981" }, // green
    ],
  };

  const notable = [
    { name: "Cristiano Ronaldo", handle: "@cristiano", avatar: null },
    { name: "Ariana Grande", handle: "@arianagrande", avatar: null },
    { name: "Jennifer Lopez", handle: "@jlo", avatar: null },
    // add more...
  ];

  const reachability = [
    { label: "< 500", value: 60 },
    { label: "500 - 1k", value: 20 },
    { label: "1k - 5k", value: 8 },
    { label: "> 5k", value: 12 },
  ];

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        {/* Toggle + platform note */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="bg-white border rounded-md px-1 py-1 shadow-sm flex items-center">
              <button
                onClick={() => setMode("followers")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  mode === "followers"
                    ? "bg-indigo-600 text-white shadow"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Followers
              </button>
              <button
                onClick={() => setMode("likers")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  mode === "likers"
                    ? "bg-indigo-600 text-white shadow"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Likers
              </button>
            </div>

            <div className="ml-3 text-sm text-gray-500">
              Filter by Followers or Likers
            </div>
          </div>

          <div className="text-sm text-gray-500">
            The audience data is based on{" "}
            <span className="font-medium text-indigo-600">{platform}</span>
          </div>
        </div>

        {/* Cards row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left card: Followers credibility */}
          <div className="bg-white rounded-xl p-5 shadow-sm border">
            <div className="flex items-start justify-between">
              <h3 className="text-gray-700 font-semibold">Followers credibility</h3>
              <button
                className="text-gray-400 text-xs leading-none px-2 py-1 rounded hover:bg-gray-50"
                title="More info"
              >
                ?
              </button>
            </div>

            <div className="flex gap-6 mt-4">
              {/* donut */}
              <div className="w-36 h-36 flex items-center justify-center">
                <CredibilityDonut percent={credibility.percent} mood={credibility.mood} />
              </div>

              {/* legend */}
              <div className="flex-1">
                <div className="w-full h-20 flex items-center justify-center">
                  <MiniRingBreakdown items={credibility.breakdown} />
                </div>

                <ul className="mt-3 space-y-2">
                  {credibility.breakdown.map((d) => (
                    <li key={d.label} className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-3">
                        <span
                          className="w-3 h-3 rounded-full inline-block"
                          style={{ backgroundColor: d.color }}
                        />
                        <span>{d.label}</span>
                      </div>
                      <span className="font-medium">{d.value}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="mt-4 text-xs text-gray-500">
              Bots have been detected even though the overall audience remains mostly authentic.
            </p>
          </div>

          {/* Middle card: Notable followers */}
          <div className="bg-white rounded-xl p-5 shadow-sm border">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-700 font-semibold">Notable followers</h3>
              <button className="text-gray-400 text-xs px-2 py-1 rounded hover:bg-gray-50">?</button>
            </div>

            <div className="mt-4 space-y-3">
              {notable.map((n, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-600">
                    {n.avatar ? <img src={n.avatar} alt={n.name} className="w-10 h-10 rounded-full" /> : n.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700">{n.name}</div>
                    <div className="text-xs text-gray-500">{n.handle}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right card: Audience reachability */}
          <div className="bg-white rounded-xl p-5 shadow-sm border">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-700 font-semibold">Audience reachability</h3>
              <button className="text-gray-400 text-xs px-2 py-1 rounded hover:bg-gray-50">?</button>
            </div>

            <div className="mt-6">
              <BarChart bars={reachability} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Subcomponents ---------- */

function CredibilityDonut({ percent = 73, mood = "Bad" }) {
  // Donut using SVG circle strokes
  const size = 120;
  const stroke = 14;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const filled = (percent / 100) * circumference;

  // color: red if high bot %
  const color = percent >= 70 ? "#F43F5E" : "#10B981";

  return (
    <svg width={size} height={size} className="block">
      <defs>
        <linearGradient id="donutGrad" x1="0" x2="1">
          <stop offset="0%" stopColor="#F43F5E" />
          <stop offset="100%" stopColor="#FB7185" />
        </linearGradient>
      </defs>

      {/* background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#F3F4F6"
        strokeWidth={stroke}
        fill="none"
      />

      {/* filled arc */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="url(#donutGrad)"
        strokeWidth={stroke}
        strokeDasharray={`${filled} ${circumference - filled}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        fill="none"
      />

      {/* center content */}
      <g>
        <circle cx={size / 2} cy={size / 2} r={radius - stroke - 2} fill="#ffffff" />
        <text x="50%" y="46%" dominantBaseline="middle" textAnchor="middle" fontSize="18" fill="#374151" fontWeight="700">
          {percent}%
        </text>
        <text x="50%" y="62%" dominantBaseline="middle" textAnchor="middle" fontSize="12" fill="#6B7280">
          {mood}
        </text>
      </g>
    </svg>
  );
}

type MiniRingBreakdownItem = { label: string; value: number; color: string };
function MiniRingBreakdown({ items = [] }: { items?: MiniRingBreakdownItem[] }) {
  // Draw a small ring with segments (SVG conic-like)
  const size = 80;
  const center = size / 2;
  let start = 0; // degrees
  const total = items.reduce((s, it) => s + it.value, 0) || 100;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block">
      <g transform={`translate(${center}, ${center})`}>
        {items.map((it, idx) => {
          const angle = (it.value / total) * 360;
          const large = angle > 180 ? 1 : 0;
          const rad = Math.PI / 180;
          const r = 28;
          const x1 = Math.cos((start - 90) * rad) * r;
          const y1 = Math.sin((start - 90) * rad) * r;
          const x2 = Math.cos((start + angle - 90) * rad) * r;
          const y2 = Math.sin((start + angle - 90) * rad) * r;
          const path = `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
          start += angle;
          return <path key={idx} d={path} stroke={it.color} strokeWidth="8" fill="none" strokeLinecap="round" />;
        })}

        {/* inner circle to create donut hole */}
        <circle cx="0" cy="0" r="16" fill="#ffffff" />
      </g>
    </svg>
  );
}

type BarChartBar = { label: string; value: number };
function BarChart({ bars = [] }: { bars?: BarChartBar[] }) {
  const max = Math.max(...bars.map((b) => b.value), 1);
  return (
    <div className="flex items-end gap-4">
      {bars.map((b, idx) => {
        const height = Math.round((b.value / max) * 120); // px
        return (
          <div key={idx} className="flex flex-col items-center">
            <div className="w-12 h-32 flex items-end">
              <div
                className="w-full rounded-t-md"
                style={{
                  height: `${height}px`,
                  background: "linear-gradient(180deg,#7C3AED,#A78BFA)",
                }}
              />
            </div>
            <div className="text-xs text-gray-600 mt-2">{b.label}</div>
          </div>
        );
      })}
    </div>
  );
}

