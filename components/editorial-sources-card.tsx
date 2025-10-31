import AiInsightSection from "./AiInsightSection";

const sourcesData = [
  { rank: 1, name: "Forbes Business Europe", mentions: 14, icon: "📱" },
  { rank: 2, name: "Startup Daily", mentions: 7, icon: "M" },
  { rank: 3, name: "Food Delivery Insider", mentions: 6, icon: "MF" },
  { rank: 4, name: "Le Business des Applications", mentions: 6, icon: "RA" },
  { rank: 5, name: "Commerce News", mentions: 5, icon: "C" },
  { rank: 6, name: "Food & Sens", mentions: 5, icon: "G" },
  { rank: 7, name: "Foods", mentions: 4, icon: "🌍" },
];

const totalSources = 30;
const currentPage = 1;
const pageSize = 7;

const interpretationSentences = [
  `Smartphone Magazine is the top editorial source with 14 mentions, indicating strong media coverage.`,
  `MSN.com and other sources contribute to the overall editorial presence.`,
  `Focus PR efforts on top publications to maximize visibility and mentions.`
];

export default function EditorialSourcesCard() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-gray-700 font-semibold">Top Editorial Sources</h3>
        <div className="relative group">
          <button
            className="text-gray-400 text-xs px-2 py-1 rounded hover:bg-gray-50"
            type="button"
          >
            ?
          </button>
          <div className="absolute left-1/2 z-20 -translate-x-1/2 mt-2 w-80 bg-slate-800 text-white text-sm rounded-xl px-4 py-3 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200"
            style={{top: '100%'}}>
            Shows the top editorial sources by mention count. Hover over each row to see the exact count. Use this data to identify key publications for PR and outreach.
          </div>
        </div>
      </div>
      <div className="flex items-center mb-4 justify-between">
        <span className="text-xs text-gray-700 pb-1">Publication</span>
        <span className="text-xs text-gray-700 px-2 py-1">Mentions</span>
      </div>
      <div className="divide-y divide-gray-100">
        {sourcesData.map((src) => (
          <div key={src.rank} className="flex items-center py-2 group hover:bg-yellow-50 transition-all duration-150">
            <span className="w-6 text-center text-gray-400 text-xs font-bold">{src.rank}</span>
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-lg font-bold mr-2">{src.icon}</span>
            <span className="flex-1 truncate text-sm text-gray-700">{src.name}</span>
            <span className="text-sm text-gray-700 font-semibold ml-2">{src.mentions}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between text-xs text-gray-500 mt-4">
        <span>{`${(currentPage - 1) * pageSize + 1}-${currentPage * pageSize} of ${totalSources} Editorial Sources`}</span>
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
