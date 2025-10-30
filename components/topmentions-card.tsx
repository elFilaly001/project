import AiInsightSection from "./AiInsightSection";


// Example data for theme groups
const emergingThemes = [
  { name: "#order", pct: 90.4 },
  { name: "توصيل", pct: 67.1 },
  { name: "refund", pct: 40.9 },
  { name: "livraison", pct: 16.3 },
];
const decreasingThemes = [
  { name: "discount", pct: 15 },
  { name: "وقت الوصول", pct: 5.7 },
];
const newThemes = [
  { name: "fast-food" },
  { name: "Kool" },
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
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px) translateX(0px); }
            16% { transform: translateY(-20px) translateX(15px); }
            32% { transform: translateY(-10px) translateX(-18px); }
            48% { transform: translateY(18px) translateX(12px); }
            64% { transform: translateY(8px) translateX(-15px); }
            80% { transform: translateY(-12px) translateX(8px); }
            100% { transform: translateY(0px) translateX(0px); }
          }
          .animate-float {
            animation: float 10s ease-in-out infinite;
          }
        `}
      </style>
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
            <span className="block text-base font-semibold text-purple-700 mb-2 text-center">Decreasing themes</span>
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
          <span className="block text-base font-semibold text-gray-500 mb-2 text-center">New themes</span>
          <div className="flex flex-wrap justify-center gap-x-2 gap-y-1">
            {newThemes.map((theme) => (
              <div key={theme.name} className="flex items-center gap-2 mb-1">
                <span className="text-sm text-gray-700">{theme.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Word cloud and AI interpretation side by side */}
      <div className="flex gap-6 mt-6">
        {/* Word cloud */}
        <div className="flex-1 relative bg-purple-50 rounded-lg min-h-[320px]" style={{height: '320px', overflow: 'hidden'}}>
          {(() => {
            const allThemes = [
              ...emergingThemes.map(t => ({...t, type: 'emerging'})),
              ...decreasingThemes.map(t => ({...t, type: 'decreasing'})),
              ...newThemes.map(t => ({...t, type: 'new'})),
            ];
            const placed: {top: number, left: number, size: number}[] = [];
            return allThemes.map((theme, idx) => {
              // Calculate base size based on text length
              const textLength = theme.name.length;
              const baseSize = Math.max(60, Math.min(120, 60 + textLength * 3));
              
              // Calculate size and color based on type and pct
              let size = baseSize;
              let backgroundColor = '#e5e7eb'; // default gray for new
              let textColor = '#374151';
              if ('pct' in theme) {
                const pct = (theme as any).pct;
                if (theme.type === 'emerging') {
                  // Blue to cyan: higher pct = more blue (darker)
                  const intensity = Math.min(pct / 90.4, 1); // normalize to 0-1
                  const green = Math.floor(255 - intensity * 155); // 255 to 100
                  const blue = 255;
                  backgroundColor = `rgb(0, ${green}, ${blue})`;
                  textColor = '#ffffff';
                  size = baseSize + (pct / 90.4) * 30; // Add importance scaling
                } else if (theme.type === 'decreasing') {
                  // Pink to purple: higher pct = darker purple
                  const intensity = Math.min(pct / 15, 1);
                  const red = Math.floor(255 - intensity * 50); // 255 to 205
                  const blue = Math.floor(150 + intensity * 105); // 150 to 255
                  backgroundColor = `rgb(${red}, 100, ${blue})`;
                  textColor = '#ffffff';
                  size = baseSize + (pct / 15) * 20; // Add importance scaling
                }
              } else {
                // New themes
                backgroundColor = '#d1d5db';
                textColor = '#374151';
                size = baseSize;
              }
              
              // Find non-overlapping position with strict overlap prevention
              let position: {top: number, left: number} | null = null;
              let attempts = 0;
              const containerWidth = 480; // Approximate container width for better calculations
              
              while (!position && attempts < 50) {
                const top = Math.floor(Math.random() * Math.max(20, 320 - size - 10)) + 10;
                const left = Math.floor(Math.random() * Math.max(20, containerWidth - size - 10)) + 10;
                const candidate = { top, left };
                
                // Check overlap with all placed circles
                const hasOverlap = placed.some(p => {
                  const dx = candidate.left - p.left;
                  const dy = candidate.top - p.top;
                  const distance = Math.sqrt(dx * dx + dy * dy);
                  
                  // To ensure less than 30% overlap, circles need to maintain distance
                  // For two circles, if distance between centers < r1 + r2, they overlap
                  // To keep overlap under 30%, we need stricter spacing
                  const r1 = size / 2;
                  const r2 = p.size / 2;
                  const minDist = (r1 + r2) * 1.1; // 10% buffer ensures minimal overlap
                  
                  return distance < minDist;
                });
                
                if (!hasOverlap) {
                  position = candidate;
                }
                attempts++;
              }
              
              if (!position) {
                // If still no position found, place it in a safe fallback area
                const fallbackY = (idx % 3) * 70 + 20;
                const fallbackX = Math.floor(idx / 3) * 100 + 20;
                position = {
                  top: Math.min(fallbackY, 320 - size),
                  left: Math.min(fallbackX, containerWidth - size)
                };
              }
              
              placed.push({ ...position, size });
              
              // Better font size calculation for readability
              const avgCharWidth = 0.6; // approximate character width ratio
              const availableWidth = size * 0.85; // 85% of circle width for padding
              const charsPerLine = Math.floor(availableWidth / (size * 0.1)); // estimate chars per line
              const estimatedLines = Math.ceil(theme.name.length / charsPerLine);
              const baseFontSize = (size * 0.85) / (estimatedLines + 1); // dynamic based on lines needed
              const adjustedFontSize = Math.max(10, Math.min(baseFontSize, size * 0.25)); // between 10px and 25% of size
              
              return (
                <div
                  key={theme.name}
                  className="absolute select-none flex items-center justify-center rounded-full font-bold shadow-sm animate-float"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 40%, transparent 70%), ${backgroundColor}`,
                    color: textColor,
                    top: `${position.top}px`,
                    left: `${position.left}px`,
                    zIndex: 2,
                    cursor: 'default',
                    fontSize: `${adjustedFontSize}px`,
                    textShadow: 'none',
                    padding: '8px',
                    wordBreak: 'break-word',
                    textAlign: 'center',
                    lineHeight: '1.2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    hyphens: 'auto',
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${5 + Math.random() * 5}s`,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                  title={`${theme.name}${'pct' in theme ? ` (${(theme as any).pct}%)` : ' (New theme)'}`}
                >
                  <span style={{
                    maxWidth: '100%', 
                    overflow: 'hidden', 
                    display: '-webkit-box', 
                    WebkitLineClamp: 3, 
                    WebkitBoxOrient: 'vertical',
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word'
                  }}>
                    {theme.name}
                  </span>
                </div>
              );
            });
          })()}
        </div>
        {/* AI interpretation */}
        <div className="flex-1">
          <AiInsightSection sentences={interpretationSentences} />
        </div>
      </div>
    </div>
  );
}