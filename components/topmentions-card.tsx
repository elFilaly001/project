import AiInsightSection from "./AiInsightSection";

// Example data for word cloud and themes
const themes = [
  { name: "Market", count: 120 },
  { name: "Report", count: 95 },
  { name: "Growth", count: 80 },
  { name: "Forecast", count: 70 },
  { name: "Industry", count: 65 },
  { name: "Trends", count: 60 },
  { name: "Analysis", count: 55 },
  { name: "Valuates", count: 50 },
  { name: "Insights", count: 45 },
  { name: "Global", count: 40 },
];

const interpretationSentences = [
  `The most mentioned themes are Market, Report, and Growth, indicating strong interest in industry analysis and forecasts.`,
  `Word cloud highlights trending topics and keywords in your audience's conversations.`,
  `Leverage these insights to tailor your content and messaging for maximum relevance.`
];

export default function TopMentionsCard() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-gray-700 font-semibold">Top Mentions</h3>
        <div className="relative group">
          <button
            className="text-gray-400 text-xs px-2 py-1 rounded hover:bg-gray-50"
            type="button"
          >
            ?
          </button>
          <div className="absolute left-1/2 z-20 -translate-x-1/2 mt-2 w-80 bg-slate-800 text-white text-sm rounded-xl px-4 py-3 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200"
            style={{top: '100%'}}>
            Shows the top themes and keywords mentioned in your audience. The word cloud visualizes the most frequent words. Use this data to identify trending topics and optimize your content strategy.
          </div>
        </div>
      </div>
      <div className="flex items-center mb-4 justify-between">
        <span className="text-xs text-purple-600 font-semibold border-b-2 border-purple-400 pb-1">Themes</span>
        <span className="text-xs text-purple-600 font-semibold border border-purple-400 rounded px-2 py-1">Word Cloud</span>
      </div>
      <div className="flex gap-6">
        {/* Themes list */}
        <div className="flex-1 space-y-2">
          {themes.map((theme, idx) => (
            <div key={theme.name} className="flex items-center group">
              <span className="w-32 truncate text-sm text-gray-700">{theme.name}</span>
              <div className="flex-1 mx-2 relative">
                <div
                  className="h-4 rounded bg-purple-400 group-hover:bg-purple-500 transition-all duration-150"
                  style={{ width: `${(theme.count / themes[0].count) * 100}%` }}
                  title={`${theme.count} mentions`}
                ></div>
              </div>
              <span className="text-sm text-gray-700 font-semibold">{theme.count}</span>
            </div>
          ))}
        </div>
        {/* Word cloud (simple text-based) */}
        <div className="flex-1 flex flex-wrap items-center justify-center gap-2 p-4 bg-purple-50 rounded-lg min-h-[120px]">
          {themes.map((theme, idx) => (
            <span
              key={theme.name}
              className={`text-purple-700 font-bold`}
              style={{ fontSize: `${16 + theme.count / 4}px` }}
              title={`${theme.count} mentions`}
            >
              {theme.name}
            </span>
          ))}
        </div>
      </div>
      {/* AI interpretation */}
      <AiInsightSection sentences={interpretationSentences} />
    </div>
  );
}
