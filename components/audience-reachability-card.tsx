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
          </div>
  );
}

