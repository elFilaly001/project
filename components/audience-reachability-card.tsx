export default function AudienceReachabilityCard() {
  const reachability = [
    { label: "< 500", value: 60 },
    { label: "500 - 1k", value: 20 },
    { label: "1k - 5k", value: 8 },
    { label: "> 5k", value: 12 },
  ];

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-700 font-semibold">Audience Reach Distribution</h3>
              <div className="relative group">
                <button
                  className="text-gray-400 text-xs px-2 py-1 rounded hover:bg-gray-50"
                  type="button"
                >
                  ?
                </button>
                <div className="absolute left-1/2 z-20 -translate-x-1/2 mt-2 w-80 bg-slate-800 text-white text-sm rounded-xl px-4 py-3 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200"
                  style={{top: '100%'}}>
                  Shows percentage of followers that follow more than 1500 accounts, between 1000-1500, 500-1000 and below 500. Accounts following more than 1.5K accounts will most likely not see the sponsored posts.
                </div>
              </div>
            </div>

            <div className="mt-6">
              <BarChart bars={reachability} />
            </div>
          </div>
  );
}


type BarChartBar = { label: string; value: number };
import React, { useState } from "react";

function BarChart({ bars = [] }: { bars?: BarChartBar[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const max = Math.max(...bars.map((b) => b.value), 1);
  const total = bars.reduce((sum, b) => sum + b.value, 0);
  return (
    <div className="flex items-end gap-4 relative">
      {bars.map((b, idx) => {
        const height = Math.round((b.value / max) * 120); // px
        const percent = total ? Math.round((b.value / total) * 100) : 0;
        return (
          <div key={idx} className="flex flex-col items-center relative"
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="w-12 h-32 flex items-end">
              <div
                className="w-full rounded-t-md cursor-pointer"
                style={{
                  height: `${height}px`,
                  background: "linear-gradient(180deg,#7C3AED,#A78BFA)",
                }}
              />
              {/* Tooltip */}
              {hovered === idx && (
                <div className="absolute left-1/2 -translate-x-1/2 -top-14 z-30 bg-white text-gray-900 text-sm rounded-xl px-4 py-2 shadow-lg border border-gray-200 flex flex-col items-center min-w-[60px]">
                  <span className="font-medium">{b.label}</span>
                  <span className="font-semibold">{percent}%</span>
                </div>
              )}
            </div>
            <div className="text-xs text-gray-600 mt-2">{b.label}</div>
          </div>
        );
      })}
    </div>
  );
}