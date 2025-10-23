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
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 flex flex-col min-w-[260px]">
      <h3 className="text-gray-800 font-semibold text-base mb-4">Language Distribution</h3>
      <div className="flex flex-col gap-3">
        {languageData.map((l) => (
          <div key={l.label} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-[90px]">
              <span className="text-gray-700 text-lg">\uD83C\uDFA4</span>
              <span className="text-gray-800 text-sm font-medium">{l.label}</span>
            </div>
            <div className="flex-1 mx-2">
              <div className="h-1.5 rounded bg-gray-200">
                <div
                  className="h-1.5 rounded bg-blue-500"
                  style={{ width: `${(l.value / max) * 100}%` }}
                />
              </div>
            </div>
            <span className="text-gray-800 text-xs font-semibold min-w-[48px] text-right">{l.value.toFixed(2)} %</span>
          </div>
        ))}
      </div>
    </div>
  );
}
