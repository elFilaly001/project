import AiInsightSection from "./AiInsightSection";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// Example data for locations with sentiment
const locationsData = [
  { location: "United States", positive: 4000, neutral: 500, notRated: 500, negative: 100 },
  { location: "United Kingdom", positive: 800, neutral: 200, notRated: 100, negative: 50 },
  { location: "Unknown Region", positive: 100, neutral: 200, notRated: 150, negative: 30 },
  { location: "Australia", positive: 300, neutral: 100, notRated: 50, negative: 20 },
  { location: "India", positive: 250, neutral: 80, notRated: 40, negative: 15 },
  { location: "Canada", positive: 200, neutral: 60, notRated: 30, negative: 10 },
  { location: "Germany", positive: 150, neutral: 50, notRated: 20, negative: 8 },
  { location: "China", positive: 120, neutral: 40, notRated: 15, negative: 5 },
  { location: "United Arab Emirates", positive: 100, neutral: 30, notRated: 10, negative: 3 },
  { location: "Ireland", positive: 80, neutral: 20, notRated: 8, negative: 2 },
];

const interpretationSentences = [
  `United States leads in mentions, with a strong positive sentiment.`,
  `Other regions show varied sentiment, with neutral and not rated mentions present.`,
  `Focus on regions with high positive sentiment for targeted campaigns.`
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
            Shows the sentiment breakdown for top locations. Hover over each bar to see the count for positive, neutral, not rated, and negative mentions. Use this data to identify key regions and audience mood.
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
            const notRated = locationsData.map((l) => l.notRated);
            const negatives = locationsData.map((l) => l.negative);
            const totals = locationsData.map((l) => l.positive + l.neutral + l.notRated + l.negative || 1);

            const data = {
              labels,
              datasets: [
                { label: 'Positive', data: positives, backgroundColor: '#10B981', borderRadius: 6, barThickness: 12 },
                { label: 'Neutral', data: neutrals, backgroundColor: '#D1D5DB', borderRadius: 6, barThickness: 12 },
                { label: 'Not rated', data: notRated, backgroundColor: '#9CA3AF', borderRadius: 6, barThickness: 12 },
                { label: 'Negative', data: negatives, backgroundColor: '#EF4444', borderRadius: 6, barThickness: 12 },
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
        <span className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-green-500 inline-block"></span> Positive</span>
        <span className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-gray-300 inline-block"></span> Neutral</span>
        <span className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-gray-400 inline-block"></span> Not rated</span>
        <span className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-red-500 inline-block"></span> Negative</span>
      </div>
      {/* AI interpretation */}
      <AiInsightSection sentences={interpretationSentences} />
    </div>
  );
}
