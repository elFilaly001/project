import React from "react";

const countryData = [
  { label: "Morocco", value: 57.45, code: "ma" },
  { label: "Algeria", value: 10.64, code: "dz" },
  { label: "France", value: 8.51, code: "fr" },
  { label: "Tunisia", value: 6.38, code: "tn" },
  { label: "Egypt", value: 4.26, code: "eg" },
  { label: "Saudi Arabia", value: 2.13, code: "sa" },
  { label: "undetermined", value: 10.63, code: null },
];

export default function FollowersByCountryCard() {
  const max = Math.max(...countryData.map((c) => c.value));

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
      {/* Header matching other cards */}
      <div className="flex items-start justify-between">
        <h3 className="text-gray-700 font-semibold">Followers by Country</h3>

        {/* Tooltip: same pattern as other cards */}
        <div className="relative group">
          <button
            type="button"
            aria-describedby="followers-country-tooltip"
            className="text-gray-400 text-xs leading-none px-2 py-1 rounded hover:bg-gray-50"
          >
            <span className="sr-only">What is this?</span>?
          </button>

          <div
            id="followers-country-tooltip"
            role="tooltip"
            aria-hidden="true"
            style={{ top: "100%" }}
            className="absolute left-1/2 z-20 -translate-x-1/2 mt-2 w-80 bg-slate-800 text-white text-sm rounded-xl px-4 py-3 shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"
          >
            The audience location by country. 
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mt-4 flex flex-col gap-3">
        {countryData.map((c) => (
          <div key={c.label} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-[120px]">
              {c.code ? (
                <img
                  src={`https://flagcdn.com/w20/${c.code}.png`}
                  alt={`${c.label} flag`}
                  className="w-5 h-4 rounded-sm border border-gray-200 object-cover"
                  loading="lazy"
                />
              ) : null}
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
