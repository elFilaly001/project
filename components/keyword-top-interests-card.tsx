import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import AiInsightSection from './AiInsightSection';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Example data for top interests
const interestData = [
  { label: 'Sports', value: 21, color: '#84CC16' },
  { label: 'Family and Parenting', value: 13.9, color: '#F59E42' },
  { label: 'Music & Audio', value: 13.7, color: '#D97706' },
  { label: 'Celebrities & Entertainment News', value: 10.3, color: '#FACC15' },
  { label: 'Food & Drinks', value: 9.6, color: '#EF4444' },
  { label: 'Travel', value: 8.5, color: '#F472B6' },
  { label: 'Movies', value: 7.5, color: '#A21CAF' },
  { label: 'Colleges & Universities', value: 5.4, color: '#2563EB' },
  { label: 'Automotives General', value: 5.1, color: '#0EA5E9' },
  { label: 'Literature/Books', value: 4.7, color: '#8B5CF6' },
];

const data = {
  labels: interestData.map((i) => i.label),
  datasets: [
    {
      label: 'Interest %',
      data: interestData.map((i) => i.value),
      backgroundColor: interestData.map((i) => i.color),
      borderRadius: 6,
      borderSkipped: false,
      maxBarThickness: 40,
    },
  ],
};

const options = {
  plugins: {
    legend: { display: false },
    tooltip: {
      enabled: true,
      callbacks: {
        label: function (context: import('chart.js').TooltipItem<'bar'>) {
          const label = context.label || '';
          const value = context.parsed.y || 0;
          return `${label}: ${value}%`;
        },
      },
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'y' as const,
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: '#6B7280', font: { size: 12 }, callback: function(tickValue: string | number) { return `${tickValue}%`; } },
      max: 30,
    },
    y: {
      grid: { display: false },
      ticks: { color: '#6B7280', font: { size: 12 } },
    },
  },
};

const interpretationSentences = [
  `Sports is the top interest, accounting for 21% of keyword mentions.`,
  `Family, parenting, and music also show strong engagement.`,
  `Focus content on top interests to maximize audience relevance and engagement.`
];

export default function KeywordTopInterestsCard() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-gray-700 font-semibold">Top Interests</h3>
        <div className="relative group">
          <button
            className="text-gray-400 text-xs px-2 py-1 rounded hover:bg-gray-50"
            type="button"
          >
            ?
          </button>
          <div className="absolute left-1/2 z-20 -translate-x-1/2 mt-2 w-72 bg-slate-800 text-white text-sm rounded-xl px-4 py-3 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200"
            style={{top: '100%'}}>
            Shows the distribution of keyword mentions by interest. Hover over each bar to see the percentage. Use this data to target interests with relevant keywords.
          </div>
        </div>
      </div>
      <div className="mt-6" style={{ minHeight: 320 }}>
        <Bar data={data} options={options} height={320} />
      </div>
      <div className="flex flex-wrap gap-4 justify-center mt-6">
        {interestData.map((i) => (
          <span key={i.label} className="flex items-center gap-2 text-sm">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: i.color }}></span>
            <span>{i.label}</span>
          </span>
        ))}
      </div>
      {/* AI interpretation */}
      <AiInsightSection sentences={interpretationSentences} />
    </div>
  );
}
