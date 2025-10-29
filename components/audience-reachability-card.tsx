import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import AiInsightSection from './AiInsightSection';
import { useTranslations } from 'next-intl';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
export default function AudienceReachabilityCard() {
  const t = useTranslations();
  const reachability = [
    { id: 'lt500', value: 60 },
    { id: '500_1k', value: 20 },
    { id: '1k_1_5k', value: 8 },
    { id: 'gt1_5k', value: 12 },
  ];

  const data = {
    labels: reachability.map((r) => t(`audience.reachability.labels.${r.id}`)),
    datasets: [
      {
        label: t('audience.reachability.dataset_label'),
        data: reachability.map((r) => r.value),
        backgroundColor: 'linear-gradient(180deg,#7C3AED,#A78BFA)',
        borderRadius: 6,
        borderSkipped: false,
        maxBarThickness: 40,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
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
        ticks: { color: '#6B7280', font: { size: 12 }, stepSize: 20 },
        max: 100,
      },
    },
  };

  // AI interpretation logic
  const top = reachability.reduce((a, b) => (b.value > a.value ? b : a), reachability[0]);
  const total = reachability.reduce((sum, r) => sum + r.value, 0);
  const topPct = total ? Math.round((top.value / total) * 100) : 0;
  const interpretationSentences = [
    t('audience.reachability.interpretation.top', {
      value: top.value,
      pct: topPct,
      label: t(`audience.reachability.labels.${top.id}`),
    }),
    t('audience.reachability.interpretation.visibility'),
    t('audience.reachability.interpretation.action'),
  ];

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-700 font-semibold">{t('audience.reachability.title')}</h3>
        <div className="relative group">
          <button
            className="text-gray-400 text-xs px-2 py-1 rounded hover:bg-gray-50"
            type="button"
          >
            ?
          </button>
          <div className="absolute left-1/2 z-20 -translate-x-1/2 mt-2 w-80 bg-slate-800 text-white text-sm rounded-xl px-4 py-3 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200"
            style={{top: '100%'}}>
            {t('audience.reachability.tooltip')}
          </div>
        </div>
      </div>

      <div className="mt-6" style={{ minHeight: 180 }}>
        <Bar data={data} options={options} height={180} />
      </div>

      {/* AI interpretation */}
      <AiInsightSection sentences={interpretationSentences} />
    </div>
  );
}

