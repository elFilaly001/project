import AiInsightSection from "./AiInsightSection";

const locationsData = [
  { city: "London", count: 192 },
  { city: "Toronto", count: 50 },
  { city: "Vancouver", count: 47 },
  { city: "Subiaco", count: 30 },
  { city: "Mount Macedon", count: 25 },
  { city: "Québec", count: 19 },
  { city: "Kew East", count: 19 },
  { city: "Eveleigh", count: 18 },
  { city: "Stanmore", count: 18 },
  { city: "Sydney Central Business District", count: 15 },
];

const totalLocations = 35;
const currentPage = 1;
const pageSize = 10;

const interpretationSentences = [
  `London leads with ${locationsData[0].count} mentions, indicating a strong audience presence in this city.`,
  `Toronto and Vancouver follow, suggesting key engagement hubs.`,
  `Targeting top cities can help maximize reach and local impact.`
];

export default function MentionsByLocationCard() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-gray-700 font-semibold">Top Locations</h3>
        <div className="relative group">
          <button
            className="text-gray-400 text-xs px-2 py-1 rounded hover:bg-gray-50"
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
      
      <div className="space-y-2">
        {locationsData.map((loc) => (
          <div key={loc.city} className="flex items-center group">
            <span className="w-44 truncate text-sm text-gray-700">{loc.city}</span>
            <div className="flex-1 mx-2 relative">
              <div
                className="h-4 rounded bg-yellow-400 group-hover:bg-yellow-500 transition-all duration-150"
                style={{ width: `${(loc.count / locationsData[0].count) * 100}%` }}
                title={`${loc.count} mentions`}
              ></div>
            </div>
            <span className="text-sm text-gray-700 font-semibold">{loc.count}</span>
          </div>
        ))}
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
