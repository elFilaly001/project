import React from "react";

const languageData = [
  { label: "Arabic", value: 59.57 },
  { label: "French", value: 19.15 },
  { label: "English", value: 10.64 },
  { label: "Spanish", value: 2.13 },
  { label: "German", value: 2.13 },
  { label: "undetermined", value: 6.38 },
];

export default function LanguageDistributionCard() {
  const max = Math.max(...languageData.map((l) => l.value));

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
      {/* Header (consistent with other cards) */}
      <div className="flex items-start justify-between">
        <h3 className="text-gray-700 font-semibold">Language Distribution</h3>

        {/* Tooltip: same pattern used across your cards */}
        <div className="relative group">
          <button
            type="button"
            aria-describedby="language-tooltip"
            className="text-gray-400 text-xs leading-none px-2 py-1 rounded hover:bg-gray-50"
          >
            <span className="sr-only">What is this?</span>?
          </button>

          <div
            id="language-tooltip"
            role="tooltip"
            aria-hidden="true"
            style={{ top: "100%" }}
            className="absolute left-1/2 z-20 -translate-x-1/2 mt-2 w-80 bg-slate-800 text-white text-sm rounded-xl px-4 py-3 shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"
          >
            Languages spoken by the audience. 
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mt-4 flex flex-col gap-3">
        {languageData.map((l) => (
          <div key={l.label} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-[120px]">
              {/* decorative icon (microphone) kept but marked aria-hidden */}
              <span className="text-gray-500 text-lg" aria-hidden="true">🎤</span>
              <span className="text-gray-600 text-sm font-medium">{l.label}</span>
            </div>

            <div className="flex-1 mx-2">
              <div className="h-1.5 rounded bg-gray-200 overflow-hidden">
                <div
                  className="h-1.5 rounded bg-blue-500"
                  style={{ width: `${(l.value / max) * 100}%` }}
                />
              </div>
            </div>

            <span className="text-gray-700 text-xs font-semibold min-w-[48px] text-right">
              {l.value.toFixed(2)} %
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
