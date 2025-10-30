import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import AiInsightSection from './AiInsightSection';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Example data for sentiment trend (last 7 days)
const trendData = [
  { date: 'Oct 16', positive: 1100, neutral: 1800, negative: 120 },
  { date: 'Oct 17', positive: 1000, neutral: 1500, negative: 115 },
  { date: 'Oct 18', positive: 600, neutral: 900, negative: 110 },
  { date: 'Oct 19', positive: 500, neutral: 700, negative: 105 },
  { date: 'Oct 20', positive: 550, neutral: 800, negative: 110 },
  { date: 'Oct 21', positive: 900, neutral: 1600, negative: 130 },
  { date: 'Oct 22', positive: 200, neutral: 400, negative: 100 },
];

const data = {
  labels: trendData.map((d) => d.date),
  datasets: [
    {
      label: 'Positive',
      data: trendData.map((d) => d.positive),
      borderColor: '#F02CB9',
      backgroundColor: '#F02CB9',
      pointRadius: 3,
      fill: false,
      tension: 0.3,
    },
    {
      label: 'Neutral',
      data: trendData.map((d) => d.neutral),
      borderColor: '#35B9F4',
      backgroundColor: '#35B9F4',
      pointRadius: 3,
      fill: false,
      tension: 0.3,
    },
    {
      label: 'Negative',
      data: trendData.map((d) => d.negative),
      borderColor: '#7B61F9',
      backgroundColor: '#7B61F9',
      pointRadius: 3,
      fill: false,
      tension: 0.3,
    },
  ],
};

const options = {
  plugins: {
    legend: { display: true, position: 'bottom' as const },
    tooltip: {
      enabled: true,
      callbacks: {
        label: function (context: import('chart.js').TooltipItem<'line'>) {
          const label = context.dataset.label || '';
          const value = context.parsed.y || 0;
          return `${label}: ${value} mentions`;
        },
      },
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: '#6B7280', font: { size: 12 } },
    },
    y: {
      grid: { color: '#E5E7EB' },
      beginAtZero: true,
      ticks: { color: '#6B7280', font: { size: 12 } },
      title: { display: true, text: 'Mentions', color: '#6B7280', font: { size: 14 } },
    },
  },
};

const interpretationSentences = [
  `Positive sentiment shows a spike on Oct 21.`,
  `Negative mentions remain low and stable, while neutral sentiment fluctuates.`,
  `Monitor spikes in positive mentions to identify key events or campaigns.`
];

export default function SentimentTrendCard() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-gray-700 font-semibold">Sentiment Trend</h3>
        </div>
        <div className="relative group">
          <button
            className="text-gray-400 text-xs px-2 py-1 rounded hover:bg-gray-50"
            type="button"
          >
            ?
          </button>
          <div className="absolute left-1/2 z-20 -translate-x-1/2 mt-2 w-72 bg-slate-800 text-white text-sm rounded-xl px-4 py-3 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200"
            style={{top: '100%'}}>
            Shows the sentiment trend for the last 7 days. Hover over each point to see the number of mentions for each sentiment type. Use this data to track changes in audience mood and identify key events.
          </div>
        </div>
      </div>
      <div className="mt-6" style={{ minHeight: 260 }}>
        <Line data={data} options={options} height={260} />
      </div>
      {/* AI interpretation */}
      <AiInsightSection sentences={interpretationSentences} />
    </div>
  );
}
