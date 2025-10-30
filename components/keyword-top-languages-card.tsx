import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import AiInsightSection from './AiInsightSection';
ChartJS.register(ArcElement, Tooltip, Legend);

// Updated data for keyword top languages
const languageData = [
  { label: 'English', value: 945, color: '#1E3A8A' },
  { label: 'French', value: 437, color: '#6B7280' },
  { label: 'Arabic', value: 300, color: '#F59E42' },
  { label: 'Other', value: 100, color: '#3B82F6' },
];

const total = languageData.reduce((sum, l) => sum + l.value, 0);

const data = {
  labels: languageData.map((l) => l.label),
  datasets: [
    {
      data: languageData.map((l) => l.value),
      backgroundColor: languageData.map((l) => l.color),
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
          const pct = total ? ((value / total) * 100).toFixed(1) : '0';
          return `${label}: ${value} (${pct}%)`;
        },
      },
    },
  },
  cutout: '70%',
  maintainAspectRatio: false,
};

const interpretationSentences = [
  `English dominates with ${(languageData[0].value / total * 100).toFixed(1)}% of keyword mentions, followed by French and Arabic.`,
  `Other languages contribute a smaller share, highlighting the importance of focusing on the top three languages.`,
  `Content strategies should prioritize English, French, and Arabic for maximum engagement.`
];

export default function KeywordTopLanguagesCard() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-gray-700 font-semibold">Top Languages</h3>
        <div className="relative group">
          <button
            className="text-gray-400 text-xs px-2 py-1 rounded hover:bg-gray-50"
            type="button"
          >
            ?
          </button>
          <div className="absolute left-1/2 z-20 -translate-x-1/2 mt-2 w-72 bg-slate-800 text-white text-sm rounded-xl px-4 py-3 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200"
            style={{top: '100%'}}>
            Shows the distribution of keyword mentions by language. Hover over each segment to see the count and percentage. Use this data to identify key languages for your keyword strategy.
          </div>
        </div>
      </div>
      <div className="relative flex items-center justify-center mt-6" style={{ minHeight: 220 }}>
        <Doughnut data={data} options={options} height={220} />
        {/* Central percentage overlay for top segment */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-4xl font-bold text-[#1E3A8A]">{((languageData[0].value / total) * 100).toFixed(1)}%</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 justify-center mt-6">
        {languageData.map((l) => (
          <span key={l.label} className="flex items-center gap-2 text-sm">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: l.color }}></span>
            <span>{l.label}</span>
          </span>
        ))}
      </div>
      {/* AI interpretation */}
      <AiInsightSection sentences={interpretationSentences} />
    </div>
  );
}
