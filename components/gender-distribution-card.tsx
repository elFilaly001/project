import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);
import React, { useState } from "react";

const genderData = [
  { label: "Male", value: 40, color: "#2563eb" },      // blue-600
  { label: "Female", value: 55, color: "#e11d48" },   // rose-600
  { label: "Unknown", value: 5, color: "#6b7280" },   // gray-500
];

export default function GenderDistributionCard() {
  const total = genderData.reduce((sum, g) => sum + g.value, 0);
  const [hovered, setHovered] = useState<number | null>(null);

  const pieData = {
    labels: genderData.map((g) => g.label),
    datasets: [
      {
        data: genderData.map((g) => g.value),
        backgroundColor: genderData.map((g) => g.color),
        borderWidth: 0,
      },
    ],
  };

  const pieOptions = {
    cutout: '70%',
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    maintainAspectRatio: false,
    events: [], // disables all events for Pie chart itself
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
      {/* header: matches other cards */}
      <div className="flex items-start justify-between">
        <h3 className="text-gray-700 font-semibold">Gender Distribution</h3>

        {/* tooltip: same pattern used across cards */}
        <div className="relative group">
          <button
            type="button"
            aria-describedby="gender-tooltip"
            className="text-gray-400 text-xs leading-none px-2 py-1 rounded hover:bg-gray-50"
          >
            <span className="sr-only">What is this?</span>?
          </button>

          <div
            id="gender-tooltip"
            role="tooltip"
            aria-hidden="true"
            style={{ top: "100%" }}
            className="absolute left-1/2 z-20 -translate-x-1/2 mt-2 w-80 bg-slate-800 text-white text-sm rounded-xl px-4 py-3 shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"
          >
            The audience’s gender distribution is determined by analyzing indicators such as the profile picture, name, bio text, and selfies from recent posts.
          </div>
        </div>
      </div>

      {/* body */}
      <div className="flex flex-col items-center w-full mt-4">
        <div className="relative w-36 h-36 flex items-center justify-center">
          <Pie data={pieData} options={pieOptions} width={144} height={144} />
          {/* Center content */}
          <div className="absolute flex flex-col items-center justify-center w-36 h-36 pointer-events-none">
            <span className="text-xl font-bold text-gray-800">
              {hovered !== null && genderData[hovered] ? `${Math.round((genderData[hovered].value / total) * 100)}%` : '100%'}
            </span>
            <span className="text-xs text-gray-500">
              {hovered !== null && genderData[hovered] ? genderData[hovered].label : 'Gender'}
            </span>
          </div>
        </div>
        <div className="flex gap-6 mt-4 flex-wrap justify-center">
          {genderData.map((g, idx) => (
            <div
              key={g.label}
              className="flex items-center gap-2 cursor-pointer"
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
            >
              <span
                className="w-3 h-3 rounded-full inline-block"
                style={{ backgroundColor: g.color }}
                aria-hidden="true"
              />
              <span className="text-gray-600 text-sm font-medium">{g.label}</span>
              <span className="text-gray-700 text-sm font-semibold min-w-[40px] text-right">
                {Math.round((g.value / total) * 100)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

