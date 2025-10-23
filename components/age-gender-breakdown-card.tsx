import React, { useState } from "react";

const AGE_LABELS = ["13 - 17", "18 - 24", "25 - 34", "35 - 44", "45 - 64"];
const GENDERS = [
  { label: "Female", color: "#e11d48" }, // rose-600
  { label: "Male", color: "#2563eb" },   // blue-600
  { label: "Unknown", color: "#6b7280" }, // gray-500
];

// Example data: each age group has an array of [female, male, unknown] percentages
const ageGenderData = [
  [6, 2, 1],   // 13-17
  [28, 13, 2], // 18-24
  [24, 17, 3], // 25-34
  [4, 6, 1],   // 35-44
  [2, 2, 0],   // 45-64
];

export default function AgeGenderBreakdownCard() {
  const [hovered, setHovered] = useState<{ ageIdx: number; genderIdx: number } | null>(null);

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
      {/* header (matches other cards) */}
      <div className="flex items-start justify-between">
        <h3 className="text-gray-700 font-semibold">Age & Gender Breakdown</h3>

        {/* tooltip: same pattern as other cards */}
        <div className="relative group">
          <button
            type="button"
            aria-describedby="age-gender-tooltip"
            className="text-gray-400 text-xs leading-none px-2 py-1 rounded hover:bg-gray-50"
          >
            <span className="sr-only">What is this?</span>?
          </button>

          <div
            id="age-gender-tooltip"
            role="tooltip"
            aria-hidden="true"
            style={{ top: "100%" }}
            className="absolute left-1/2 z-20 -translate-x-1/2 mt-2 w-80 bg-slate-800 text-white text-sm rounded-xl px-4 py-3 shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"
          >
            The audience’s age distribution is estimated by analyzing the profile picture, bio text, and selfies from recent posts.
          </div>
        </div>
      </div>

      {/* body */}
      <div className="w-full flex flex-col items-center mt-4">
        <div className="relative w-full flex items-end justify-center h-48">
          {/* Chart */}
          <div className="flex w-full justify-between items-end h-full px-2">
            {ageGenderData.map((group, ageIdx) => (
              <div key={AGE_LABELS[ageIdx]} className="flex flex-col items-center w-16 relative">
                {/* Bars */}
                <div className="flex gap-1 w-full h-36 items-end">
                  {group.map((val, genderIdx) => {
                    const color = GENDERS[genderIdx].color;
                    // scale by 120px as max height (kept from your original)
                    const barHeight = Math.round((val / 100) * 120);
                    return (
                      <div
                        key={GENDERS[genderIdx].label}
                        role="button"
                        tabIndex={0}
                        aria-label={`${AGE_LABELS[ageIdx]} — ${GENDERS[genderIdx].label}: ${val}%`}
                        className="w-3 rounded-t-md cursor-pointer outline-none"
                        style={{
                          height: `${barHeight}px`,
                          background: color,
                          opacity: val === 0 ? 0.15 : 1,
                          transition: "opacity 0.15s, transform 0.15s",
                        }}
                        onMouseEnter={() => setHovered({ ageIdx, genderIdx })}
                        onMouseLeave={() => setHovered(null)}
                        onFocus={() => setHovered({ ageIdx, genderIdx })}
                        onBlur={() => setHovered(null)}
                      />
                    );
                  })}
                </div>

                {/* Hover tooltip that shows breakdown for the whole age group */}
                {hovered && hovered.ageIdx === ageIdx && (
                  <div className="absolute -top-20 left-1/2 -translate-x-1/2 z-30 bg-white text-gray-900 text-sm rounded-xl px-4 py-2 shadow-lg border border-gray-200 min-w-[120px] flex flex-col items-center">
                    <span className="font-medium mb-1 text-xs">{AGE_LABELS[ageIdx]}</span>
                    {GENDERS.map((g, genderIdx) => (
                      <div key={g.label} className="flex items-center gap-2 text-xs mb-0.5">
                        <span
                          className="w-2 h-2 rounded-full inline-block"
                          style={{ backgroundColor: g.color }}
                          aria-hidden="true"
                        />
                        <span className="font-medium text-gray-700">{g.label}</span>
                        <span className="font-semibold text-gray-900">{ageGenderData[ageIdx][genderIdx]}%</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Age label */}
                <div className="text-xs text-gray-500 mt-2">{AGE_LABELS[ageIdx]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-6 mt-4">
          {GENDERS.map((g) => (
            <div key={g.label} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full inline-block"
                style={{ backgroundColor: g.color }}
                aria-hidden="true"
              />
              <span className="text-sm font-medium text-gray-600">{g.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

