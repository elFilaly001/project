import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import AiInsightSection from './AiInsightSection';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Example data for sentiment by source type
const sourceData = [
  { source: 'X', positive: 120, neutral: 350, negative: 100 },
  { source: 'Instagram', positive: 80, neutral: 200, negative: 120 },
  { source: 'TikTok', positive: 10, neutral: 390, negative: 0 },
  { source: 'Facebook', positive: 50, neutral: 200, negative: 60 },
  { source: 'LinkedIn', positive: 200, neutral: 300, negative: 0 },
  { source: 'YouTube', positive: 180, neutral: 320, negative: 0 }
];

const options = {
  plugins: {
    legend: { display: true, position: 'bottom' as const },
    tooltip: {
      enabled: true,
      callbacks: {
        label: function (context: import('chart.js').TooltipItem<'bar'>) {
          const label = context.dataset.label || '';
          const value = context.parsed.y || 0;
          const total = sourceData[context.dataIndex].positive + sourceData[context.dataIndex].neutral + sourceData[context.dataIndex].negative;
          const pct = total ? ((value / total) * 100).toFixed(1) : '0';
          return `${label}: ${value} (${pct}%)`;
        },
      },
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'x' as const,
  scales: {
    x: {
      stacked: true,
      grid: { display: false },
      ticks: { color: '#6B7280', font: { size: 12 } },
    },
    y: {
      stacked: true,
      grid: { color: '#E5E7EB' },
      beginAtZero: true,
      ticks: {
        color: '#6B7280',
        font: { size: 12 },
        callback: function(tickValue: string | number) {
          return `${tickValue}`; // Removed percentage formatting for clarity
        }
      },
      title: { display: true, text: 'Mentions', color: '#6B7280', font: { size: 14 } },
    },
  },
};

const data = {
  labels: sourceData.map((d) => d.source),
  datasets: [
    {
      label: 'Positive',
      data: sourceData.map((d) => d.positive),
      backgroundColor: '#F02CB9',
      stack: 'sentiment',
      barPercentage: 0.7,
      categoryPercentage: 0.7,
    },
    {
      label: 'Neutral',
      data: sourceData.map((d) => d.neutral),
      backgroundColor: '#35B9F4',
      stack: 'sentiment',
      barPercentage: 0.7,
      categoryPercentage: 0.7,
    },
    {
      label: 'Negative',
      data: sourceData.map((d) => d.negative),
      backgroundColor: '#7B61F9',
      stack: 'sentiment',
      barPercentage: 0.7,
      categoryPercentage: 0.7,
    },
  ],
};

const interpretationSentences = [
  `Positive sentiment is highest in Sina Weibo, Pinterest, and Blogs, while Reddit and Comments have notable negative mentions.`,
  `Neutral mentions dominate Podcasts and Broadcast sources.`,
  `Focus on sources with high positive sentiment for better engagement.`
];

export default function SentimentBySourceCard() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-gray-700 font-semibold">Sentiment by Source Type</h3>
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
            Shows the sentiment breakdown by source type for the last 7 days. Hover over each bar to see the count and percentage for each sentiment type. Use this data to identify which sources drive positive or negative conversations.
          </div>
        </div>
      </div>
      <div className="mt-6" style={{ minHeight: 320 }}>
        <Bar data={data} options={options} height={320} />
      </div>
      {/* AI interpretation */}
      <AiInsightSection sentences={interpretationSentences} />
    </div>
  );
}
