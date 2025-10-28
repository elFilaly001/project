import AiInsightSection from "./AiInsightSection";

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
      <div className="flex items-center mb-4 justify-between">
        <span className="text-xs text-green-600 font-semibold border-b-2 border-green-400 pb-1">Keyword</span>
        <span className="text-xs text-green-600 font-semibold border border-green-400 rounded px-2 py-1">Sentiment</span>
      </div>
      <div className="space-y-2">
        {keywordsData.map((kw) => {
          const total = kw.positive + kw.neutral + kw.negative;
          return (
            <div key={kw.keyword} className="flex items-center group">
              <span className="w-32 truncate text-sm text-gray-700">{kw.keyword}</span>
              <div className="flex-1 mx-2 flex h-5 rounded overflow-hidden">
                <div
                  className="bg-green-400 group-hover:bg-green-500 transition-all duration-150"
                  style={{ width: `${(kw.positive / total) * 100}%` }}
                  title={`Positive: ${kw.positive}`}
                ></div>
                <div
                  className="bg-gray-300 group-hover:bg-gray-400 transition-all duration-150"
                  style={{ width: `${(kw.neutral / total) * 100}%` }}
                  title={`Neutral: ${kw.neutral}`}
                ></div>
                <div
                  className="bg-red-400 group-hover:bg-red-500 transition-all duration-150"
                  style={{ width: `${(kw.negative / total) * 100}%` }}
                  title={`Negative: ${kw.negative}`}
                ></div>
              </div>
              <span className="text-xs text-green-600 font-semibold ml-2">{total} mentions</span>
            </div>
          );
        })}
      </div>
      {/* AI interpretation */}
      <AiInsightSection sentences={interpretationSentences} />
    </div>
  );
}
