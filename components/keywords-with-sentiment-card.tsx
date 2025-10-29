import AiInsightSection from "./AiInsightSection";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// Example data for keywords with sentiment
const keywordsData = [
  { keyword: "market", positive: 120, neutral: 80, negative: 20 },
  { keyword: "growth", positive: 100, neutral: 60, negative: 15 },
  { keyword: "report", positive: 90, neutral: 70, negative: 10 },
  { keyword: "industry", positive: 80, neutral: 50, negative: 8 },
  { keyword: "forecast", positive: 70, neutral: 40, negative: 5 },
  { keyword: "trends", positive: 65, neutral: 35, negative: 4 },
  { keyword: "analysis", positive: 60, neutral: 30, negative: 3 },
];

const interpretationSentences = [
  `"Market" and "growth" are the most positively mentioned keywords, indicating strong optimism in audience discussions.`,
  `Negative sentiment is low across all keywords, suggesting overall positive perception.`,
  `Focus content on top keywords with high positive sentiment to maximize engagement.`
];

export default function KeywordsWithSentimentCard() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-gray-700 font-semibold">Keywords with Sentiment</h3>
        <div className="relative group">
          <button
            className="text-gray-400 text-xs px-2 py-1 rounded hover:bg-gray-50"
            type="button"
          >
            ?
          </button>
          <div className="absolute left-1/2 z-20 -translate-x-1/2 mt-2 w-80 bg-slate-800 text-white text-sm rounded-xl px-4 py-3 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200"
            style={{top: '100%'}}>
            Shows the top keywords and their sentiment breakdown. Hover over each bar to see the count for positive, neutral, and negative mentions. Use this data to identify trending topics and audience mood.
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-gray-600 pb-1">Keyword</span>
        <span className="text-xs text-gray-600 px-2 py-1">Sentiment</span>
      </div>

      {/* Replace manual stacked bars with a stacked horizontal Chart.js bar so tooltips show sentiment counts + pct */}
      <div className="relative" style={{ minHeight: keywordsData.length * 44 }}>
        {
          (() => {
            const labels = keywordsData.map((k) => k.keyword);
            const positives = keywordsData.map((k) => k.positive);
            const neutrals = keywordsData.map((k) => k.neutral);
            const negatives = keywordsData.map((k) => k.negative);
            const totals = keywordsData.map((k) => k.positive + k.neutral + k.negative || 1);

            const data = {
              labels,
              datasets: [
                { label: 'Positive', data: positives, backgroundColor: '#34D399', borderRadius: 6, barThickness: 12 },
                { label: 'Neutral', data: neutrals, backgroundColor: '#D1D5DB', borderRadius: 6, barThickness: 12 },
                { label: 'Negative', data: negatives, backgroundColor: '#F87171', borderRadius: 6, barThickness: 12 },
              ],
            };

            const options = {
              indexAxis: 'y' as const,
              plugins: {
                legend: { position: 'top' as const, labels: { boxWidth: 12 } },
                tooltip: {
                  enabled: true,
                  callbacks: {
                    label: function (context: any) {
                      const datasetLabel = context.dataset.label || '';
                      const value = context.parsed.x ?? context.parsed;
                      const idx = context.dataIndex;
                      const total = totals[idx] || 1;
                      const pct = total ? ((value / total) * 100).toFixed(1) : '0';
                      return `${datasetLabel}: ${value} (${pct}%)`;
                    },
                  },
                },
              },
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: { stacked: true, beginAtZero: true, ticks: { color: '#6b7280' } },
                y: { stacked: true, ticks: { color: '#374151' } },
              },
            };

            return <Bar data={data} options={options} height={keywordsData.length * 44} />;
          })()
        }
      </div>
      {/* AI interpretation */}
      <AiInsightSection sentences={interpretationSentences} />
    </div>
  );
}
