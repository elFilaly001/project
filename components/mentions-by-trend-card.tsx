import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import AiInsightSection from './AiInsightSection';
ChartJS.register(ArcElement, Tooltip, Legend);

const mentionsData = [
  { label: 'Instagram', value: 910, color: '#A78BFA' },
  { label: 'Facebook', value: 220, color: '#60A5FA' },
  { label: 'LinkedIn', value: 290, color: '#38BDF8' },
  { label: 'X', value: 130, color: '#FBBF24' },
  { label: 'Threads', value: 80, color: '#A3A3A3' },
];

const totalMentions = mentionsData.reduce((sum, m) => sum + m.value, 0);

const data = {
  labels: mentionsData.map((m) => m.label),
  datasets: [
    {
      data: mentionsData.map((m) => m.value),
      backgroundColor: mentionsData.map((m) => m.color),
      borderWidth: 2,
      borderColor: '#fff',
    },
  ],
};

const options = {
  plugins: {
    legend: { display: false },
    tooltip: {
      enabled: true,
      callbacks: {
        label: function (context: import('chart.js').TooltipItem<'doughnut'>) {
          const label = context.label || '';
          const value = context.parsed || 0;
          const pct = totalMentions ? ((value / totalMentions) * 100).toFixed(2) : '0';
          return `${label}: ${value} (${pct}%)`;
        },
      },
    },
  },
  cutout: '70%',
  maintainAspectRatio: false,
};

const interpretationSentences = [
  `Instagram leads with ${mentionsData[0].value} mentions, representing ${(mentionsData[0].value / totalMentions * 100).toFixed(1)}% of total mentions.`,
  `Facebook, LinkedIn, X, and Threads follow with lower shares, indicating platform-specific trends.`,
  `Focus your engagement strategy on platforms with the highest mention rates for maximum impact.`
];

export default function MentionsByTrendCard() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-700 font-semibold">Mentions by Trend</h3>
        <div className="relative group">
          <button
            className="text-gray-400 text-xs px-2 py-1 rounded hover:bg-gray-50"
            type="button"
          >
            ?
          </button>
          <div className="absolute left-1/2 z-20 -translate-x-1/2 mt-2 w-80 bg-slate-800 text-white text-sm rounded-xl px-4 py-3 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200"
            style={{top: '100%'}}>
            Shows the total mentions segmented by platform. Hover over each segment to see the count and percentage. The central number represents the total mentions.
          </div>
        </div>
      </div>
      <div className="relative flex items-center justify-center mt-6" style={{ minHeight: 220 }}>
        <Doughnut data={data} options={options} height={220} />
        {/* Central total number overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-4xl font-bold text-black border-4 border-red-500 rounded-full px-6 py-2 bg-white">{totalMentions}</span>
          <span className="text-lg text-red-600 font-semibold mt-2">Total des mentions</span>
        </div>
      </div>
      {/* AI interpretation */}
      <AiInsightSection sentences={interpretationSentences} />
    </div>
  );
}
