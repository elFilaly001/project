import React from "react";

const interests = [
  { label: "Friends, Family & Relationships", percent: 35 },
  { label: "Clothes, Shoes, Handbags & Accessories", percent: 28 },
  { label: "Toys, Children & Baby", percent: 26 },
  { label: "Restaurants, Food & Grocery", percent: 24 },
  { label: "Camera & Photography", percent: 23 },
];

export default function InterestAffinityCard() {
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
    </div>
  );
}
