import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AGE_LABELS = ["13 - 17", "18 - 24", "25 - 34", "35 - 44", "45 - 64"];
const GENDERS = [
  { label: "Female", color: "#e11d48" }, // rose-600
  { label: "Male", color: "#2563eb" },   // blue-600
  { label: "Unknown", color: "#6b7280" }, // gray-500
];

// Example data: each age group has an array of [female, male, unknown] percentages
const ageGenderData = [
  [6, 2, 1],   // 13-17
  [28, 13, 2], // 18-24
  [24, 17, 3], // 25-34
  [4, 6, 1],   // 35-44
  [2, 2, 0],   // 45-64
];

export default function AgeGenderBreakdownCard() {
  // No hover state needed for chartjs bar

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
      {/* header (matches other cards) */}
      <div className="flex items-start justify-between">
        <h3 className="text-gray-700 font-semibold">Age & Gender Breakdown</h3>

        {/* tooltip: same pattern as other cards */}
        <div className="relative group">
          <button
            type="button"
            aria-describedby="age-gender-tooltip"
            className="text-gray-400 text-xs leading-none px-2 py-1 rounded hover:bg-gray-50"
          >
            <span className="sr-only">What is this?</span>?
          </button>

          <div
            id="age-gender-tooltip"
            role="tooltip"
            aria-hidden="true"
            style={{ top: "100%" }}
            className="absolute left-1/2 z-20 -translate-x-1/2 mt-2 w-80 bg-slate-800 text-white text-sm rounded-xl px-4 py-3 shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"
          >
            The audience’s age distribution is estimated by analyzing the profile picture, bio text, and selfies from recent posts.
          </div>
        </div>
      </div>

      {/* body */}
      <div className="w-full flex flex-col items-center mt-4">
        <div className="relative w-full flex items-end justify-center h-56">
          <Bar
            data={{
              labels: AGE_LABELS,
              datasets: GENDERS.map((g, genderIdx) => ({
                label: g.label,
                data: ageGenderData.map((group) => group[genderIdx]),
                backgroundColor: g.color,
                borderRadius: 6,
                maxBarThickness: 18,
              })),
            }}
            options={{
              plugins: {
                legend: { position: 'top', labels: { font: { size: 13 }, color: '#64748b' } },
                tooltip: { enabled: true },
              },
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  stacked: true,
                  grid: { display: false },
                  ticks: { color: '#6B7280', font: { size: 12 } },
                },
                y: {
                  stacked: true,
                  grid: { color: '#F3F4F6' },
                  beginAtZero: true,
                  ticks: { color: '#6B7280', font: { size: 12 }, stepSize: 20 },
                  max: 100,
                },
              },
            }}
            height={220}
          />
        </div>
      </div>
    </div>
  );
}

