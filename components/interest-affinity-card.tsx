import React from "react";

const interests = [
  { label: "Friends, Family & Relationships", percent: 35 },
  { label: "Clothes, Shoes, Handbags & Accessories", percent: 28 },
  { label: "Toys, Children & Baby", percent: 26 },
  { label: "Restaurants, Food & Grocery", percent: 24 },
  { label: "Camera & Photography", percent: 23 },
];

export default function InterestAffinityCard() {
  const [showTooltip, setShowTooltip] = React.useState(false);
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 flex flex-col min-w-[260px] relative">
      <span
        className="text-gray-400 cursor-pointer absolute top-5 right-5 z-10"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <svg width="16" height="16" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" stroke="#64748b" strokeWidth="1.5"/><text x="50%" y="55%" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Arial" dy=".3em">?</text></svg>
        {showTooltip && (
          <div className="absolute right-0 top-7 z-20 bg-gray-800 text-white text-sm rounded-lg px-4 py-2 shadow-lg w-80 max-w-xs pointer-events-none select-none">
            What the audience is interested in, based on analyzing posts for caption texts, @mentions, #hashtags and location tags.
          </div>
        )}
      </span>
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-gray-800 font-semibold text-base">Audience interest affinity</h3>
      </div>
      <div className="flex flex-col divide-y divide-gray-100">
        {interests.map((i) => (
          <div key={i.label} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
            <span className="text-gray-800 text-sm font-medium flex-1">{i.label}</span>
            <span className="text-gray-800 text-xs font-semibold min-w-[32px] text-right">{i.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
