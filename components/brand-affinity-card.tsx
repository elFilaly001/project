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
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
      {/* header: same classes as FollowerCredibilityCard */}
      <div className="flex items-start justify-between">
        <h3 className="text-gray-700 font-semibold">Top Brand Connections</h3>

        {/* tooltip: uses same structure / classes as the previous component */}
        <div className="relative group">
          <button
            type="button"
            aria-describedby="brand-affinity-tooltip"
            className="text-gray-400 text-xs leading-none px-2 py-1 rounded hover:bg-gray-50"
          >
            <span className="sr-only">What is this?</span>?
          </button>

          <div
            id="brand-affinity-tooltip"
            role="tooltip"
            aria-hidden="true"
            style={{ top: "100%" }}
            className="absolute left-1/2 z-20 -translate-x-1/2 mt-2 w-80 bg-slate-800 text-white text-sm rounded-xl px-4 py-3 shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"
          >
            Audience’s top brands detected from captions, hashtags, and mentions.
          </div>
        </div>
      </div>

      {/* body */}
      <div className="mt-4 flex flex-col gap-3">
        {brands.map((b) => (
          <div
            key={b.name}
            className="flex items-center gap-3 py-1 border-b last:border-b-0 border-gray-100"
          >
            <div className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-md border border-gray-200 overflow-hidden">
              <img
                src={b.logo}
                alt={`${b.name} logo`}
                className="w-8 h-8 object-contain"
                loading="lazy"
              />
            </div>

            <span className="text-gray-600 text-sm font-medium flex-1">{b.name}</span>

            <span className="text-gray-600 text-xs font-semibold min-w-[32px] text-right">
              {b.percent}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
