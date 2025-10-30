import React, { useContext } from "react";
import { AudienceModeContext } from "./tabmenu/Audience";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import AiInsightSection from "./AiInsightSection";
import { useTranslations } from 'next-intl';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function FollowerCredibilityCard() {
    const mode = useContext(AudienceModeContext);
    const t = useTranslations();

    const credibility = {
    percent: 73,
    mood: "Bad",
    // Use ids for breakdown so labels can be translated via i18n keys
    breakdown: [
      { id: 'mass_followers', value: 14, color: "#eef2f7" },
      { id: 'suspicious', value: 20, color: "#35B9F4" },
      { id: 'influencers', value: 4, color: "#7B61F9" },
      { id: 'real', value: 63, color: "#F02CB9" },
    ],
  };

    // AI interpretation logic (use translations)
    const total = credibility.breakdown.reduce((sum, d) => sum + d.value, 0);
    const top = credibility.breakdown.reduce((a, b) => (b.value > a.value ? b : a), credibility.breakdown[0]);
    const topPct = total ? Math.round((top.value / total) * 100) : 0;
    const interpretationSentences = [
      t('audience.credibility.interpretation.total', { total }),
      t('audience.credibility.interpretation.top', {
        label: t(`audience.credibility.breakdown.${top.id}`),
        value: top.value,
        pct: topPct,
      }),
      t('audience.credibility.interpretation.action'),
    ];

    return (
        <div className="bg-white rounded-xl p-5 shadow-sm border">
            <div className="flex items-start justify-between">
              <h3 className="text-gray-700 font-semibold">
                {mode === "likers"
                  ? t('audience.credibility.title_likers')
                  : t('audience.credibility.title_followers')}
              </h3>
              <div className="relative group">
                <button
                  className="text-gray-400 text-xs leading-none px-2 py-1 rounded hover:bg-gray-50"
                  type="button"
                >
                  ?
                </button>
                <div className="absolute left-1/2 z-20 -translate-x-1/2 mt-2 w-80 bg-slate-800 text-white text-sm rounded-xl px-4 py-3 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200"
                  style={{top: '100%'}}>
                  {mode === "likers"
                    ? t('audience.credibility.tooltip_likers')
                    : t('audience.credibility.tooltip_followers')}
                </div>
              </div>
            </div>
            <div className="flex gap-6 mt-4 pt-4 pb-4">
              {/* donut */}
              <div className="relative w-36 h-36 flex items-center justify-center">
                <Pie
                  data={{
                    labels: credibility.breakdown.map((d) => t(`audience.credibility.breakdown.${d.id}`)),
                    datasets: [
                      {
                        data: credibility.breakdown.map((d) => d.value),
                        backgroundColor: credibility.breakdown.map((d) => d.color),
                        borderWidth: 0,
                      },
                    ],
                  }}
                  options={{
                    cutout: '70%',
                    plugins: {
                      legend: { display: false },
                      tooltip: { enabled: true },
                    },
                    maintainAspectRatio: false,
                  }}
                  width={144}
                  height={144}
                />
                {/* Center content */}
                {/* <div className="absolute flex flex-col items-center justify-center w-36 h-36 pointer-events-none">
                  <span className="text-xl font-bold text-gray-800">{credibility.percent}%</span>
                  <span className="text-xs text-gray-500">{credibility.mood}</span>
                </div> */}
              </div>

              {/* legend */}
              <div className="flex-1">
                <ul className="mt-3 space-y-2">
                  {credibility.breakdown.map((d) => (
                    <li key={d.id} className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-3">
                        <span
                          className="w-3 h-3 rounded-full inline-block"
                          style={{ backgroundColor: d.color }}
                        />
                        <span>{t(`audience.credibility.breakdown.${d.id}`)}</span>
                      </div>
                      <span className="font-medium">{d.value}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* AI interpretation */}
            <AiInsightSection sentences={interpretationSentences} />
          </div>
    );
}

