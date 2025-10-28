import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import AiInsightSection from './AiInsightSection';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Example data for keyword by age
const ageData = [
  { label: '13-17', value: 6.4, color: '#A3E635' },
  { label: '18-24', value: 40, color: '#22C55E' },
  { label: '25-34', value: 41.4, color: '#F87171' },
  { label: '35-44', value: 11.2, color: '#2563EB' },
  { label: '45-54', value: 0.5, color: '#FACC15' },
  { label: '55-64', value: 0.3, color: '#F59E42' },
  { label: '65+', value: 0.2, color: '#A3A3A3' },
];

const data = {
  labels: ageData.map((a) => a.label),
  datasets: [
    {
      label: 'Age %',
      data: ageData.map((a) => a.value),
      backgroundColor: ageData.map((a) => a.color),
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
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: '#6B7280', font: { size: 12 } },
    },
    y: {
      grid: { color: '#F3F4F6' },
      beginAtZero: true,
      ticks: { color: '#6B7280', font: { size: 12 }, callback: function(tickValue: string | number) { return `${tickValue}%`; } },
      max: 50,
    },
  },
};

const interpretationSentences = [
  `The 18-24 and 25-34 age groups dominate keyword mentions, accounting for over 80% combined.`,
  `Younger audiences (13-17) and older groups (35+) show minimal engagement.`,
  `Focus keyword strategies on the 18-34 demographic for maximum impact.`
];

export default function KeywordByAgeCard() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-gray-700 font-semibold">Keyword by Age</h3>
        <div className="relative group">
          <button
            className="text-gray-400 text-xs px-2 py-1 rounded hover:bg-gray-50"
            type="button"
          >
            ?
          </button>
          <div className="absolute left-1/2 z-20 -translate-x-1/2 mt-2 w-72 bg-slate-800 text-white text-sm rounded-xl px-4 py-3 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200"
            style={{top: '100%'}}>
            Shows the distribution of keyword mentions by age group. Hover over each bar to see the percentage. Use this data to target age groups with relevant keywords.
          </div>
        </div>
      </div>
      <div className="mt-6" style={{ minHeight: 220 }}>
        <Bar data={data} options={options} height={220} />
      </div>
      <div className="flex flex-wrap gap-4 justify-center mt-6">
        {ageData.map((a) => (
          <span key={a.label} className="flex items-center gap-2 text-sm">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: a.color }}></span>
            <span>{a.label}</span>
          </span>
        ))}
      </div>
      {/* AI interpretation */}
      <AiInsightSection sentences={interpretationSentences} />
    </div>
  );
}
