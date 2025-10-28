import AiInsightSection from "./AiInsightSection";

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
            className="text-gray-400 text-xs px-2 py-1 rounded hover:bg-gray-50"
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
      <div className="space-y-2">
        {locationsData.map((loc) => {
          const total = loc.positive + loc.neutral + loc.notRated + loc.negative;
          return (
            <div key={loc.location} className="flex items-center group">
              <span className="w-48 truncate text-sm text-gray-700">{loc.location}</span>
              <div className="flex-1 mx-2 flex h-5 rounded overflow-hidden">
                <div
                  className="bg-green-500 group-hover:bg-green-600 transition-all duration-150"
                  style={{ width: `${(loc.positive / total) * 100}%` }}
                  title={`Positive: ${loc.positive}`}
                ></div>
                <div
                  className="bg-gray-300 group-hover:bg-gray-400 transition-all duration-150"
                  style={{ width: `${(loc.neutral / total) * 100}%` }}
                  title={`Neutral: ${loc.neutral}`}
                ></div>
                <div
                  className="bg-gray-400 group-hover:bg-gray-500 transition-all duration-150"
                  style={{ width: `${(loc.notRated / total) * 100}%` }}
                  title={`Not rated: ${loc.notRated}`}
                ></div>
                <div
                  className="bg-red-500 group-hover:bg-red-600 transition-all duration-150"
                  style={{ width: `${(loc.negative / total) * 100}%` }}
                  title={`Negative: ${loc.negative}`}
                ></div>
              </div>
              <span className="text-xs text-gray-700 font-semibold ml-2">{total}</span>
            </div>
          );
        })}
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
