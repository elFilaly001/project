import React from "react";

const brands = [
  {
    name: "Walt Disney",
    percent: 8,
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/df/Walt_Disney_Pictures_2011_logo.svg",
  },
  {
    name: "Apple",
    percent: 7,
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  },
  {
    name: "Starbucks",
    percent: 4,
    logo: "https://upload.wikimedia.org/wikipedia/sco/4/45/Starbucks_Coffee_Logo.svg",
  },
  {
    name: "Nike",
    percent: 4,
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
  },
  {
    name: "Adidas",
    percent: 3,
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
  },
];

export default function BrandAffinityCard() {
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
            What the audience favorite brands are, based on analyzing posts for caption texts, @mentions, #hastags and location tags.
          </div>
        )}
      </span>
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-gray-800 font-semibold text-base">Top Brand Connections</h3>
      </div>
      <div className="flex flex-col gap-3">
        {brands.map((b) => (
          <div key={b.name} className="flex items-center gap-3 py-1 border-b last:border-b-0 border-gray-100">
            <div className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-md border border-gray-200 overflow-hidden">
              <img src={b.logo} alt={b.name + ' logo'} className="w-8 h-8 object-contain" loading="lazy" />
            </div>
            <span className="text-gray-800 text-sm font-medium flex-1">{b.name}</span>
            <span className="text-gray-800 text-xs font-semibold min-w-[32px] text-right">{b.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
