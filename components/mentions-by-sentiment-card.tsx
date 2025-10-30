import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import AiInsightSection from './AiInsightSection';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Example data for sentiment over time
const sentimentData = [
  { date: '2022-07-25', positive: 120, neutral: 65, negative: 75 },
  { date: '2022-07-26', positive: 100, neutral: 80, negative: 60 },
  { date: '2022-07-27', positive: 140, neutral: 90, negative: 70 },
  { date: '2022-07-28', positive: 110, neutral: 60, negative: 80 },
  { date: '2022-07-29', positive: 160, neutral: 100, negative: 90 },
  { date: '2022-07-30', positive: 180, neutral: 120, negative: 100 },
  { date: '2022-07-31', positive: 200, neutral: 130, negative: 110 },
  { date: '2022-08-01', positive: 220, neutral: 140, negative: 120 },
  { date: '2022-08-02', positive: 210, neutral: 135, negative: 115 },
  { date: '2022-08-03', positive: 190, neutral: 125, negative: 105 },
  { date: '2022-08-04', positive: 170, neutral: 115, negative: 95 },
  { date: '2022-08-05', positive: 160, neutral: 110, negative: 90 },
  { date: '2022-08-06', positive: 180, neutral: 120, negative: 100 },
  { date: '2022-08-07', positive: 200, neutral: 130, negative: 110 },
  { date: '2022-08-08', positive: 220, neutral: 140, negative: 120 },
  { date: '2022-08-09', positive: 210, neutral: 135, negative: 115 },
  { date: '2022-08-10', positive: 190, neutral: 125, negative: 105 },
];

const data = {
  labels: sentimentData.map((d) => d.date),
  datasets: [
    {
      label: 'Positive',
      data: sentimentData.map((d) => d.positive),
      backgroundColor: '#F02CB9',
      stack: 'sentiment',
      barPercentage: 0.7,
      categoryPercentage: 0.7,
    },
    {
      label: 'Neutral',
      data: sentimentData.map((d) => d.neutral),
      backgroundColor: '#35B9F4',
      stack: 'sentiment',
      barPercentage: 0.7,
      categoryPercentage: 0.7,
    },
    {
      label: 'Negative',
      data: sentimentData.map((d) => d.negative),
      backgroundColor: '#7B61F9',
      stack: 'sentiment',
      barPercentage: 0.7,
      categoryPercentage: 0.7,
    },
  ],
};

const options = {
  plugins: {
    legend: { display: true, position: 'top' as const },
    tooltip: {
      enabled: true,
      callbacks: {
        title: function (context: import('chart.js').TooltipItem<'bar'>[]) {
          return new Date(context[0].label as string).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
        },
        label: function (context: import('chart.js').TooltipItem<'bar'>) {
          const label = context.dataset.label || '';
          const value = context.parsed.y || 0;
          const total = sentimentData[context.dataIndex].positive + sentimentData[context.dataIndex].neutral + sentimentData[context.dataIndex].negative;
          const pct = total ? ((value / total) * 100).toFixed(1) : '0';
          return `${label}: ${value} (${pct}%)`;
        },
        afterBody: function (context: import('chart.js').TooltipItem<'bar'>[]) {
          const idx = context[0].dataIndex;
          const total = sentimentData[idx].positive + sentimentData[idx].neutral + sentimentData[idx].negative;
          return [`Total mentions: ${total}`];
        },
      },
    },
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
      ticks: { color: '#6B7280', font: { size: 12 } },
    },
  },
};

const interpretationSentences = [
  `Positive sentiment dominates most days, with notable spikes in neutral and negative mentions.`,
  `Monitor sentiment trends to identify periods of increased negative feedback or positive engagement.`,
  `Clear sentiment distribution helps in understanding audience reactions over time.`
];

export default function MentionsBySentimentCard() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-gray-700 font-semibold">Mentions by Sentiment</h3>
        <div className="relative group">
          <button
            className="text-gray-400 text-xs px-2 py-1 rounded hover:bg-gray-50"
            type="button"
          >
            ?
          </button>
          <div className="absolute left-1/2 z-20 -translate-x-1/2 mt-2 w-80 bg-slate-800 text-white text-sm rounded-xl px-4 py-3 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200"
            style={{top: '100%'}}>
            Shows the sentiment breakdown of mentions over time. Hover over each bar to see the count and percentage for each sentiment type. Use this data to track audience mood and respond proactively.
          </div>
        </div>
      </div>
      <div className="mt-6" style={{ minHeight: 260 }}>
        <Bar data={data} options={options} height={260} />
      </div>
      {/* AI interpretation */}
      <AiInsightSection sentences={interpretationSentences} />
    </div>
  );
}
