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

  // AI interpretation logic
  const topLanguage = languageData.reduce((a, b) => (b.value > a.value ? b : a), languageData[0]);
  const interpretationSentences = [
    `${topLanguage.label} is the most spoken language among your audience (${topLanguage.value.toFixed(2)}%).`,
    `Content tailored to this language may increase engagement.`,
    `Consider strategies to engage audiences speaking other languages for broader reach.`
  ];

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
      {/* AI interpretation */}
      <div className="pt-3 w-full">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-9 h-9 text-cyan-400">
              <path d="M12 3c-1.657 0-3 1.343-3 3v1H8a3 3 0 0 0-3 3v1H4a1 1 0 0 0-1 1v1a4 4 0 0 0 4 4h1v1a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3v-1h1a4 4 0 0 0 4-4v-1a1 1 0 0 0-1-1h-1v-1a3 3 0 0 0-3-3h-1V6c0-1.657-1.343-3-3-3z" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 9h.01M16 9h.01M12 6v.01M10 15h4" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium mb-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">AI-powered insight</div>
            <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">
              {interpretationSentences.map((s, i) => (
                <p key={i} className="mb-1">{s}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
