import AiInsightSection from "./AiInsightSection";

const linksData = [
  { rank: 1, url: "techcrunch.com/glovo-expands-into-africa", mentions: 128 },
  { rank: 2, url: "blog.glovoapp.com/how-we-deliver-sustainably", mentions: 128 },
  { rank: 3, url: "medium.com/startups-insider/the-glovo-model", mentions: 128 },
  { rank: 4, url: "reuters.com/business/glovo-growth-report-2025", mentions: 128 },
  { rank: 5, url: "linkedin.com/company/glovo/posts", mentions: 128 },
  { rank: 6, url: "wired.co.uk/article/glovo-logistics-ai", mentions: 128 },
  { rank: 7, url: "theguardian.com/business/glovo-expansion-news", mentions: 128 },
];

const totalLinks = 30;
const currentPage = 1;
const pageSize = 7;

const interpretationSentences = [
  `The top shared link is ln.pinterest.com/valuatesreports with 128 mentions, indicating high engagement with this resource.`,
  `Other links from valuates.com are also frequently shared, showing strong interest in market reports.`,
  `Promoting popular links can help amplify reach and drive more traffic.`
];

export default function TopSharedLinksCard() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-gray-700 font-semibold">Top Shared Links</h3>
        <div className="relative group">
          <button
            className="text-gray-400 text-xs px-2 py-1 rounded hover:bg-gray-50"
            type="button"
          >
            ?
          </button>
          <div className="absolute left-1/2 z-20 -translate-x-1/2 mt-2 w-80 bg-slate-800 text-white text-sm rounded-xl px-4 py-3 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200"
            style={{top: '100%'}}>
            Shows the top shared links by mention count. Hover over each row to see the exact count. Use this data to identify which resources are most popular and widely shared.
          </div>
        </div>
      </div>
      <div className="flex items-center mb-4 justify-between">
        <span className="text-xs text-gray-600 pb-1">Links</span>
        <span className="text-xs text-gray-600 px-2 py-1">Mentions</span>
      </div>
      <div className="divide-y divide-gray-100">
        {linksData.map((link) => (
          <div key={link.rank} className="flex items-center py-2 group hover:bg-orange-50 transition-all duration-150">
            <span className="w-6 text-center text-gray-400 text-xs font-bold">{link.rank}</span>
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-lg font-bold mr-2">
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="#D1D5DB"/><path d="M7 10a3 3 0 013-3h3a3 3 0 110 6h-3a3 3 0 01-3-3z" stroke="#6B7280" strokeWidth="1.5"/></svg>
            </span>
            <span className="flex-1 truncate text-sm text-gray-700">{link.url}</span>
            <span className="text-sm text-gray-700 font-semibold ml-2">{link.mentions}</span>
            <a href={`https://${link.url}`} target="_blank" rel="noopener noreferrer" className="ml-2 text-gray-400 hover:text-gray-700">
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M10.5 5.5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M6 5.5h4.5V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </a>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between text-xs text-gray-500 mt-4">
        <span>{`${(currentPage - 1) * pageSize + 1}-${currentPage * pageSize} of ${totalLinks} Links`}</span>
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
