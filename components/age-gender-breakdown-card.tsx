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

  // AI interpretation logic
  // Find largest age-gender group
  let maxValue = 0;
  let maxAgeIdx = 0;
  let maxGenderIdx = 0;
  ageGenderData.forEach((group, ageIdx) => {
    group.forEach((val, genderIdx) => {
      if (val > maxValue) {
        maxValue = val;
        maxAgeIdx = ageIdx;
        maxGenderIdx = genderIdx;
      }
    });
  });
  const largestGroupLabel = `${GENDERS[maxGenderIdx].label} (${AGE_LABELS[maxAgeIdx]})`;
  const interpretationSentences = [
    `${largestGroupLabel} is the largest audience segment (${maxValue}%).`,
    `Content tailored to this group may see higher engagement rates.`,
    `Consider strategies to reach other age and gender groups for broader audience growth.`
  ];

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
      {/* AI interpretation */}
      <div className="pt-3 w-full">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-9 h-9 text-cyan-400">
              <path d="M12 3c-1.657 0-3 1.343-3 3v1H8a3 3 0 0 0-3 3v1H4a1 1 0 0 0-1 1v1a4 4 0 0 0 4 4h1v1a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3v-1h1a4 4 0 0 0 4-4v-1a1 1 0 0 0-1-1h-1v-1a3 3 0 0 0-3-3h-1V6c0-1.657-1.343-3-3-3z" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 9h.01M16 9h.01M12 6v.01M10 15h4" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium mb-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">AI-powered insight</div>
            <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">
              {interpretationSentences.map((s, i) => (
                <p key={i} className="mb-1">{s}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

