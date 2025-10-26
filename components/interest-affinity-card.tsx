import React from "react";

const interests = [
  { label: "Friends, Family & Relationships", percent: 35 },
  { label: "Clothes, Shoes, Handbags & Accessories", percent: 28 },
  { label: "Toys, Children & Baby", percent: 26 },
  { label: "Restaurants, Food & Grocery", percent: 24 },
  { label: "Camera & Photography", percent: 23 },
];

export default function InterestAffinityCard() {
  // AI interpretation logic
  const top = interests.reduce((a, b) => (b.percent > a.percent ? b : a), interests[0]);
  const interpretationSentences = [
    `Top audience interest: ${top.label} (${top.percent}%).`,
    `Consider tailoring content to match this interest for higher engagement.`,
    `Diversifying content may help reach other segments as well.`
  ];

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
      {/* header (same look as other cards) */}
      <div className="flex items-start justify-between">
        <h3 className="text-gray-700 font-semibold">Audience interest affinity</h3>

        {/* tooltip (same pattern as FollowerCredibilityCard / BrandAffinityCard) */}
        <div className="relative group">
          <button
            type="button"
            aria-describedby="interest-tooltip"
            className="text-gray-400 text-xs leading-none px-2 py-1 rounded hover:bg-gray-50"
          >
            <span className="sr-only">What is this?</span>?
          </button>

          <div
            id="interest-tooltip"
            role="tooltip"
            aria-hidden="true"
            style={{ top: "100%" }}
            className="absolute left-1/2 z-20 -translate-x-1/2 mt-2 w-80 bg-slate-800 text-white text-sm rounded-xl px-4 py-3 shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"
          >
            What the audience is interested in, based on analyzing posts for caption texts,
            @mentions, #hashtags and location tags.
          </div>
        </div>
      </div>

      {/* body */}
      <div className="mt-4 flex flex-col divide-y divide-gray-100">
        {interests.map((i) => (
          <div key={i.label} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
            <span className="text-gray-600 text-sm font-medium flex-1">{i.label}</span>
            <span className="text-gray-600 text-xs font-semibold min-w-[32px] text-right">
              {i.percent}%
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
