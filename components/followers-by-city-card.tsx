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
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 flex flex-col min-w-[260px]">
      <h3 className="text-gray-800 font-semibold text-base mb-4">Followers by City</h3>
      <div className="flex flex-col gap-3">
        {cityData.map((c) => (
          <div key={c.label} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-[90px]">
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
