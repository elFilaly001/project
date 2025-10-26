import React, { useContext } from "react";
import { AudienceModeContext } from "./tabmenu/Audience";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function FollowerCredibilityCard() {
    const mode = useContext(AudienceModeContext);
    const credibility = {
    percent: 73,
    mood: "Bad",
    breakdown: [
      { label: "Mass followers", value: 14, color: "#F59E0B" }, // amber
      { label: "Suspicious", value: 20, color: "#FB7185" }, // pink/red
      { label: "Influencers", value: 4, color: "#7C3AED" }, // purple
      { label: "Real", value: 63, color: "#10B981" }, // green
    ],
  };

    // AI interpretation logic
    const total = credibility.breakdown.reduce((sum, d) => sum + d.value, 0);
    const top = credibility.breakdown.reduce((a, b) => (b.value > a.value ? b : a), credibility.breakdown[0]);
    const topPct = total ? Math.round((top.value / total) * 100) : 0;
    const interpretationSentences = [
      `Total audience analyzed: ${total}.`,
      `${top.label} is the largest segment (${top.value}%, ${topPct}%).`,
      `Focus on increasing the proportion of 'Real' followers for better credibility.`,
    ];

    return (
        <div className="bg-white rounded-xl p-5 shadow-sm border">
            <div className="flex items-start justify-between">
              <h3 className="text-gray-700 font-semibold">
                {mode === "likers" ? "Likers Authenticity" : "Audience Authenticity"}
              </h3>
              <div className="relative group">
                <button
                  className="text-gray-400 text-xs leading-none px-2 py-1 rounded hover:bg-gray-50"
                  type="button"
                >
                  ?
                </button>
                <div className="absolute left-1/2 z-20 -translate-x-1/2 mt-2 w-80 bg-slate-800 text-white text-sm rounded-xl px-4 py-3 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200"
                  style={{top: '100%'}}>
                  {mode === "likers"
                    ? "To determine the credibility score of historical likers, we evaluate several factors such as the account’s profile picture and bio, number of followers and posts, and the follower-to-following ratio. Brands with a genuinely engaged audience typically achieve scores of 80 or higher."
                    : "To determine the followers credibility score for historical accounts, we evaluate several factors, including the presence of a profile picture and bio, the number of posts, and the ratio between followers and following. Brands with an authentic audience typically achieve scores of 80 or higher."}
                </div>
              </div>
            </div>
            <div className="flex gap-6 mt-4 pt-4 pb-4">
              {/* donut */}
              <div className="relative w-36 h-36 flex items-center justify-center">
                <Pie
                  data={{
                    labels: credibility.breakdown.map((d) => d.label),
                    datasets: [
                      {
                        data: credibility.breakdown.map((d) => d.value),
                        backgroundColor: credibility.breakdown.map((d) => d.color),
                        borderWidth: 0,
                      },
                    ],
                  }}
                  options={{
                    cutout: '70%',
                    plugins: {
                      legend: { display: false },
                      tooltip: { enabled: true },
                    },
                    maintainAspectRatio: false,
                  }}
                  width={144}
                  height={144}
                />
                {/* Center content */}
                {/* <div className="absolute flex flex-col items-center justify-center w-36 h-36 pointer-events-none">
                  <span className="text-xl font-bold text-gray-800">{credibility.percent}%</span>
                  <span className="text-xs text-gray-500">{credibility.mood}</span>
                </div> */}
              </div>

              {/* legend */}
              <div className="flex-1">
                <ul className="mt-3 space-y-2">
                  {credibility.breakdown.map((d) => (
                    <li key={d.label} className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-3">
                        <span
                          className="w-3 h-3 rounded-full inline-block"
                          style={{ backgroundColor: d.color }}
                        />
                        <span>{d.label}</span>
                      </div>
                      <span className="font-medium">{d.value}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* AI interpretation */}
            <div className="pt-10 w-full">
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

