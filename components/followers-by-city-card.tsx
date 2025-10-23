import React from "react";

const cityData = [
  { label: "Casablanca", value: 12.77 },
  { label: "Marrakech", value: 8.51 },
  { label: "Rabat", value: 6.38 },
  { label: "Fes", value: 4.26 },
  { label: "Tangier", value: 4.26 },
  { label: "Algiers", value: 4.26 },
  { label: "undetermined", value: 59.56 },
];

export default function FollowersByCityCard() {
  const max = Math.max(...cityData.map((c) => c.value));

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
      {/* Header (consistent with other cards) */}
      <div className="flex items-start justify-between">
        <h3 className="text-gray-700 font-semibold">Followers by City</h3>

        {/* Tooltip: same pattern as the other cards */}
        <div className="relative group">
          <button
            type="button"
            aria-describedby="followers-city-tooltip"
            className="text-gray-400 text-xs leading-none px-2 py-1 rounded hover:bg-gray-50"
          >
            <span className="sr-only">What is this?</span>?
          </button>

          <div
            id="followers-city-tooltip"
            role="tooltip"
            aria-hidden="true"
            style={{ top: "100%" }}
            className="absolute left-1/2 z-20 -translate-x-1/2 mt-2 w-80 bg-slate-800 text-white text-sm rounded-xl px-4 py-3 shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"
          >
            The audience location by city. 
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mt-4 flex flex-col gap-3">
        {cityData.map((c) => (
          <div key={c.label} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-[120px]">
              <span className="text-gray-600 text-sm font-medium">{c.label}</span>
            </div>

            <div className="flex-1 mx-2">
              <div className="h-1.5 rounded bg-gray-200 overflow-hidden">
                <div
                  className="h-1.5 rounded bg-blue-500"
                  style={{ width: `${(c.value / max) * 100}%` }}
                />
              </div>
            </div>

            <span className="text-gray-700 text-xs font-semibold min-w-[48px] text-right">
              {c.value.toFixed(2)} %
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
