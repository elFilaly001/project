import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import AiInsightSection from './AiInsightSection';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Example data for top occupations
const occupationData = [
  { label: 'Social Media', value: 20, color: '#F02CB9' },
  { label: 'Blogger', value: 18, color: '#35B9F4' },
  { label: 'Engineer', value: 11.6, color: '#7B61F9' },
  { label: 'Student', value: 10.5, color: '#FF4081' },
  { label: 'Author/Writer', value: 8.7, color: '#00BCD4' },
  { label: 'Artist/Art', value: 8.5, color: '#673AB7' },
  { label: 'Executive manager', value: 6.9, color: '#E91E63' },
  { label: 'Entrepreneur', value: 5.6, color: '#0097A7' },
  { label: 'Sales', value: 5.2, color: '#512DA8' },
  { label: 'Transportation', value: 5.1, color: '#C2185B' },
  { label: 'Other', value: 10, color: '#F48FB1' },
];

const data = {
  labels: occupationData.map((o) => o.label),
  datasets: [
    {
      label: 'Occupation %',
      data: occupationData.map((o) => o.value),
      backgroundColor: occupationData.map((o) => o.color),
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
      max: 25,
    },
    y: {
      grid: { display: false },
      ticks: { color: '#6B7280', font: { size: 12 } },
    },
  },
};

const interpretationSentences = [
  `Social Media and Blogger are the top occupations, accounting for 38% of keyword mentions.`,
  `Engineer and Student also show strong engagement.`,
  `Focus content on top occupations to maximize audience relevance and engagement.`
];

export default function KeywordTopOccupationsCard() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-gray-700 font-semibold">Top Occupations</h3>
        <div className="relative group">
          <button
            className="text-gray-400 text-xs px-2 py-1 rounded hover:bg-gray-50"
            type="button"
          >
            ?
          </button>
          <div className="absolute left-1/2 z-20 -translate-x-1/2 mt-2 w-72 bg-slate-800 text-white text-sm rounded-xl px-4 py-3 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200"
            style={{top: '100%'}}>
            Shows the distribution of keyword mentions by occupation. Hover over each bar to see the percentage. Use this data to target occupations with relevant keywords.
          </div>
        </div>
      </div>
      <div className="mt-6" style={{ minHeight: 320 }}>
        <Bar data={data} options={options} height={320} />
      </div>
      <div className="flex flex-wrap gap-4 justify-center mt-6">
        {occupationData.map((o) => (
          <span key={o.label} className="flex items-center gap-2 text-sm">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: o.color }}></span>
            <span>{o.label}</span>
          </span>
        ))}
      </div>
      {/* AI interpretation */}
      <AiInsightSection sentences={interpretationSentences} />
    </div>
  );
}
