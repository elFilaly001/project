import AiInsightSection from "./AiInsightSection";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// Example data for locations with sentiment
const locationsData = [
  { location: "Casablanca", positive: 4000, neutral: 500, negative: 100 },
  { location: "Rabat", positive: 800, neutral: 200, negative: 50 },
  { location: "Marrakech", positive: 100, neutral: 200, negative: 30 },
  { location: "Fes", positive: 300, neutral: 100, negative: 20 },
  { location: "Tangier", positive: 250, neutral: 80, negative: 15 },
  { location: "Agadir", positive: 200, neutral: 60, negative: 10 },
  { location: "Oujda", positive: 150, neutral: 50, negative: 8 },
  { location: "Tetouan", positive: 120, neutral: 40, negative: 5 },
  { location: "Safi", positive: 100, neutral: 30, negative: 3 },
  { location: "El Jadida", positive: 80, neutral: 20, negative: 2 },
];

const interpretationSentences = [
  `Casablanca leads in mentions, with a strong positive sentiment.`,
  `Other cities show varied sentiment, with neutral mentions present.`,
  `Focus on cities with high positive sentiment for targeted campaigns.`
];

export default function LocationWithSentimentCard() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-gray-700 font-semibold">Top Locations with Sentiment</h3>
          <span className="text-xs text-gray-500">Last 7 days</span>
        </div>
        <div className="relative group">
          <button
            className="text-gray-400 text-xs leading-none px-2 py-1 rounded hover:bg-gray-50"
            type="button"
          >
            ?
          </button>
          <div className="absolute left-1/2 z-20 -translate-x-1/2 mt-2 w-72 bg-slate-800 text-white text-sm rounded-xl px-4 py-3 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200"
            style={{top: '100%'}}>
            Shows the sentiment breakdown for top locations. Hover over each bar to see the count for positive, neutral, and negative mentions. Use this data to identify key regions and audience mood.
          </div>
        </div>
      </div>
      <div className="flex items-center mb-4">
        <span className="text-xs text-gray-500 font-semibold">Mentions</span>
      </div>
      {/* Use a stacked horizontal Bar chart so Chart.js tooltips show counts and percentages */}
      <div className="relative" style={{ minHeight: locationsData.length * 44 }}>
        {
          (() => {
            const labels = locationsData.map((l) => l.location);
            const positives = locationsData.map((l) => l.positive);
            const neutrals = locationsData.map((l) => l.neutral);
            const negatives = locationsData.map((l) => l.negative);
            const totals = locationsData.map((l) => l.positive + l.neutral + l.negative || 1);

            const data = {
              labels,
              datasets: [
                { label: 'Positive', data: positives, backgroundColor: '#F02CB9', borderRadius: 6, barThickness: 12 },
                { label: 'Neutral', data: neutrals, backgroundColor: '#35B9F4', borderRadius: 6, barThickness: 12 },
                { label: 'Negative', data: negatives, backgroundColor: '#7B61F9', borderRadius: 6, barThickness: 12 },
              ],
            };

            const options = {
              indexAxis: 'y' as const,
              plugins: {
                legend: { display: false },
                tooltip: {
                  enabled: true,
                  callbacks: {
                    label: function (context: any) {
                      const label = context.dataset.label || '';
                      const value = context.parsed.x ?? context.parsed;
                      const idx = context.dataIndex;
                      const total = totals[idx] || 1;
                      const pct = total ? ((value / total) * 100).toFixed(1) : '0';
                      return `${label}: ${value} (${pct}%)`;
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

            return <Bar data={data} options={options} height={locationsData.length * 44} />;
          })()
        }
      </div>
      <div className="flex items-center gap-6 mt-4 text-sm">
        <span className="flex items-center gap-2"><span className="w-3 h-3 rounded" style={{ backgroundColor: '#F02CB9' }}></span> Positive</span>
        <span className="flex items-center gap-2"><span className="w-3 h-3 rounded" style={{ backgroundColor: '#35B9F4' }}></span> Neutral</span>
        <span className="flex items-center gap-2"><span className="w-3 h-3 rounded" style={{ backgroundColor: '#7B61F9' }}></span> Negative</span>
      </div>
      {/* AI interpretation */}
      <AiInsightSection sentences={interpretationSentences} />
    </div>
  );
}
