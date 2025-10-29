import AiInsightSection from "./AiInsightSection";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const locationsData = [
  { city: "Casablanca", count: 192 },
  { city: "Rabat", count: 50 },
  { city: "Marrakech", count: 47 },
  { city: "Fez", count: 30 },
  { city: "Tangier", count: 25 },
  { city: "Agadir", count: 19 },
  { city: "Meknes", count: 19 },
  { city: "Oujda", count: 18 },
  { city: "Kenitra", count: 18 },
  { city: "Tetouan", count: 15 },
];

const totalLocations = 35;
const currentPage = 1;
const pageSize = 10;

const interpretationSentences = [
  `Casablanca leads with ${locationsData[0].count} mentions, indicating a strong audience presence in this city.`,
  `Rabat and Marrakech follow, suggesting key engagement hubs.`,
  `Targeting top cities can help maximize reach and local impact.`
];

export default function MentionsByLocationCard() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-gray-700 font-semibold">Top Locations</h3>
        <div className="relative group">
          <button
            className="text-gray-400 text-xs leading-none px-2 py-1 rounded hover:bg-gray-50"
            type="button"
          >
            ?
          </button>
          <div className="absolute left-1/2 z-20 -translate-x-1/2 mt-2 w-80 bg-slate-800 text-white text-sm rounded-xl px-4 py-3 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200"
            style={{top: '100%'}}>
            Shows the top cities by mention count. Hover over each bar to see the exact count. Use this data to identify key audience locations.
          </div>
        </div>
      </div>
      
      {/* Replace manual bars with a horizontal Bar chart so Chart.js tooltips are used */}
      <div className="relative" style={{ minHeight: locationsData.length * 44 }}>
        {
          (() => {
            const labels = locationsData.map((l) => l.city);
            const counts = locationsData.map((l) => l.count);
            const total = counts.reduce((s, v) => s + v, 0) || 1;
            const data = {
              labels,
              datasets: [
                {
                  data: counts,
                  backgroundColor: locationsData.map(() => '#F59E0B'),
                  borderRadius: 6,
                  barThickness: 12,
                },
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
                      const value = context.parsed.x ?? context.parsed;
                      const pct = total ? ((value / total) * 100).toFixed(1) : '0';
                      return `${value} mentions (${pct}%)`;
                    },
                  },
                },
              },
              maintainAspectRatio: false,
              scales: {
                x: {
                  beginAtZero: true,
                  ticks: { color: '#6b7280' },
                },
                y: {
                  ticks: { color: '#374151' },
                },
              },
            };

            return <Bar data={data} options={options} height={locationsData.length * 44} />;
          })()
        }
      </div>
      <div className="flex items-center justify-between text-xs text-gray-500 mt-4">
        <span>{`${(currentPage - 1) * pageSize + 1}-${currentPage * pageSize} of ${totalLocations} Locations`}</span>
        <div className="flex items-center gap-2">
          <button className="px-2 py-1 rounded bg-gray-100 text-gray-400" disabled>{"<"}</button>
          <button className="px-2 py-1 rounded bg-gray-100 text-gray-700" disabled>{">"}</button>
        </div>
      </div>
      {/* AI interpretation */}
      <AiInsightSection sentences={interpretationSentences} />
    </div>
  );
}
