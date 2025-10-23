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
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 flex flex-col min-w-[260px]">
      <h3 className="text-gray-800 font-semibold text-base mb-4">Followers by Country</h3>
      <div className="flex flex-col gap-3">
        {countryData.map((c) => (
          <div key={c.label} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-[90px]">
              {c.code ? (
                <img
                  src={`https://flagcdn.com/w20/${c.code}.png`}
                  alt={c.label + " flag"}
                  className="w-5 h-4 rounded-sm border border-gray-200 object-cover"
                  loading="lazy"
                />
              ) : null}
              <span className="text-gray-800 text-sm font-medium">{c.label}</span>
            </div>
            <div className="flex-1 mx-2">
              <div className="h-1.5 rounded bg-gray-200">
                <div
                  className="h-1.5 rounded bg-blue-500"
                  style={{ width: `${(c.value / max) * 100}%` }}
                />
              </div>
            </div>
            <span className="text-gray-800 text-xs font-semibold min-w-[48px] text-right">{c.value.toFixed(2)} %</span>
          </div>
        ))}
      </div>
    </div>
  );
}
