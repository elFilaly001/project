import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
export default function FollowerCredibilityCard() {

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

    return (
        <div className="bg-white rounded-xl p-5 shadow-sm border">
            <div className="flex items-start justify-between">
              <h3 className="text-gray-700 font-semibold">Audience Authenticity</h3>
              <div className="relative group">
                <button
                  className="text-gray-400 text-xs leading-none px-2 py-1 rounded hover:bg-gray-50"
                  type="button"
                >
                  ?
                </button>
                <div className="absolute left-1/2 z-20 -translate-x-1/2 mt-2 w-80 bg-slate-800 text-white text-sm rounded-xl px-4 py-3 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200"
                  style={{top: '100%'}}>
                  To determine the followers credibility score for historical accounts, we evaluate several factors, including the presence of a profile picture and bio, the number of posts, and the ratio between followers and following. Brands with an authentic audience typically achieve scores of 80 or higher.
                </div>
              </div>
            </div>

            <div className="flex gap-6 mt-4">
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
                <div className="absolute flex flex-col items-center justify-center w-36 h-36 pointer-events-none">
                  <span className="text-xl font-bold text-gray-800">{credibility.percent}%</span>
                  <span className="text-xs text-gray-500">{credibility.mood}</span>
                </div>
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

            <p className="mt-4 text-xs text-gray-500">
              Bots have been detected even though the overall audience remains mostly authentic.
            </p>
          </div>
    );
}

