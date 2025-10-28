import AiInsightSection from "./AiInsightSection";


// Example data for theme groups
const emergingThemes = [
  { name: "#CHANELFallWinter", pct: 90.4 },
  { name: "#CHANELGroundControl", pct: 67.1 },
  { name: "#louisvuitton", pct: 40.9 },
  { name: "#dior", pct: 16.3 },
];
const decreasingThemes = [
  { name: "#PFW", pct: 15 },
  { name: "Whatsapp", pct: 5.7 },
];
const newThemes = [
  { name: "Frank" },
  { name: "Ocean" },
];

// Word cloud data (can reuse previous themes)
const wordCloudThemes = [
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
      {/* Themes section */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex flex-row gap-8 flex-wrap justify-center">
          {/* Emerging themes group */}
          <div className="flex-1 min-w-[160px] flex flex-col items-center">
            <span className="block text-base font-semibold text-blue-700 mb-2 text-center">Emerging themes</span>
            <div className="flex flex-wrap justify-center gap-x-2 gap-y-1">
              {emergingThemes.map((theme) => (
                <div key={theme.name} className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-gray-700">{theme.name}</span>
                  <span className="flex items-center gap-1 text-green-600 font-semibold">
                    <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M8 12V4M8 4l-4 4M8 4l4 4" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    {theme.pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* Decreasing themes group */}
          <div className="flex-1 min-w-[160px] flex flex-col items-center">
            <span className="block text-base font-semibold text-blue-700 mb-2 text-center">Decreasing themes</span>
            <div className="flex flex-wrap justify-center gap-x-2 gap-y-1">
              {decreasingThemes.map((theme) => (
                <div key={theme.name} className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-gray-700">{theme.name}</span>
                  <span className="flex items-center gap-1 text-red-600 font-semibold">
                    <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M8 4v8M8 12l-4-4M8 12l4-4" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    {theme.pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* New themes group below */}
        <div className="flex flex-col items-center mt-2">
          <span className="block text-base font-semibold text-blue-700 mb-2 text-center">New themes</span>
          <div className="flex flex-wrap justify-center gap-x-2 gap-y-1">
            {newThemes.map((theme) => (
              <div key={theme.name} className="flex items-center gap-2 mb-1">
                <span className="text-sm text-gray-700">{theme.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Word cloud (randomized style, only themes from sections) */}
      <div className="w-full relative bg-purple-50 rounded-lg min-h-[180px] mt-6" style={{height: '180px', overflow: 'hidden'}}>
        {[
          ...emergingThemes.map(t => ({...t, type: 'emerging'})),
          ...decreasingThemes.map(t => ({...t, type: 'decreasing'})),
          ...newThemes.map(t => ({...t, type: 'new'})),
        ].map((theme, idx) => {
          // Color and size based on type
          let color = 'text-purple-700';
          let baseSize = 16;
          let styleColor = undefined;
          if (theme.type === 'emerging') {
            color = 'text-green-600';
            baseSize = 18;
          } else if (theme.type === 'decreasing') {
            color = 'text-red-500';
            baseSize = 15;
          } else if (theme.type === 'new') {
            // Random purple shade for new themes
            const purples = ['#7c3aed', '#a78bfa', '#c4b5fd', '#6d28d9'];
            styleColor = purples[Math.floor(Math.random() * purples.length)];
          }
          // Randomize size and position
          const fontSize = baseSize + Math.floor(Math.random() * 18);
          const top = Math.floor(Math.random() * 120) + 10;
          const left = Math.floor(Math.random() * 70) + idx * 10;
          return (
            <span
              key={theme.name}
              className={`absolute select-none ${color} font-bold`}
              style={{
                fontSize: `${fontSize}px`,
                top: `${top}px`,
                left: `${left}%`,
                color: styleColor || undefined,
                zIndex: 2,
                whiteSpace: 'nowrap',
                cursor: 'default',
                textShadow: '0 2px 8px rgba(139,92,246,0.10)'
              }}
              title={'pct' in theme ? `${(theme as any).pct}%` : 'New theme'}
            >
              {theme.name}
            </span>
          );
        })}
      </div>
      {/* AI interpretation directly under themes section */}
      <AiInsightSection sentences={interpretationSentences} />
    </div>
  );
}
