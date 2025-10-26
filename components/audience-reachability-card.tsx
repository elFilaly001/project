import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
export default function AudienceReachabilityCard() {
  const reachability = [
    { label: "< 500", value: 60 },
    { label: "500 - 1k", value: 20 },
    { label: "1k - 1.5k", value: 8 },
    { label: "> 1.5k", value: 12 },
  ];

  const data = {
    labels: reachability.map((r) => r.label),
    datasets: [
      {
        label: 'Audience %',
        data: reachability.map((r) => r.value),
        backgroundColor: 'linear-gradient(180deg,#7C3AED,#A78BFA)',
        borderRadius: 6,
        borderSkipped: false,
        maxBarThickness: 40,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#6B7280', font: { size: 12 } },
      },
      y: {
        grid: { color: '#F3F4F6' },
        beginAtZero: true,
        ticks: { color: '#6B7280', font: { size: 12 }, stepSize: 20 },
        max: 100,
      },
    },
  };

  // AI interpretation logic
  const top = reachability.reduce((a, b) => (b.value > a.value ? b : a), reachability[0]);
  const total = reachability.reduce((sum, r) => sum + r.value, 0);
  const topPct = total ? Math.round((top.value / total) * 100) : 0;
  const interpretationSentences = [
    `Most followers (${top.value}%) follow fewer than 500 accounts, representing ${topPct}% of the audience.`,
    `Followers with fewer connections are more likely to see your content.`,
    `Consider targeting this segment for higher reach and engagement.`
  ];

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-700 font-semibold">Audience Reach Distribution</h3>
        <div className="relative group">
          <button
            className="text-gray-400 text-xs px-2 py-1 rounded hover:bg-gray-50"
            type="button"
          >
            ?
          </button>
          <div className="absolute left-1/2 z-20 -translate-x-1/2 mt-2 w-80 bg-slate-800 text-white text-sm rounded-xl px-4 py-3 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200"
            style={{top: '100%'}}>
            Shows the percentage of followers segmented by the number of accounts they follow, over 1,500, between 1,000-1,500, 500-1,000, and under 500. Followers who follow more than 1,500 accounts are less likely to see sponsored content.
          </div>
        </div>
      </div>

      <div className="mt-6" style={{ minHeight: 180 }}>
        <Bar data={data} options={options} height={180} />
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

