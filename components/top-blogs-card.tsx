import AiInsightSection from "./AiInsightSection";

const blogsData = [
  { rank: 1, url: "anildkotekar4sme.com", mentions: 1 },
  { rank: 2, url: "home.blog", mentions: 1 },
  { rank: 3, url: "websbee.blogspot.com/", mentions: 1 },
  { rank: 4, url: "nhqjs.com/", mentions: 1 },
  { rank: 5, url: "engadget.com/", mentions: 1 },
];

const totalBlogs = 30;
const currentPage = 1;
const pageSize = 5;

const interpretationSentences = [
  `Each top blog received 1 mention, indicating a distributed engagement across multiple blogs.`,
  `No single blog dominates, suggesting a broad reach in the blogosphere.`,
  `Consider targeting blogs with higher engagement for future campaigns.`
];

export default function TopBlogsCard() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-gray-700 font-semibold">Top Blogs</h3>
        <div className="relative group">
          <button
            className="text-gray-400 text-xs px-2 py-1 rounded hover:bg-gray-50"
            type="button"
          >
            ?
          </button>
          <div className="absolute left-1/2 z-20 -translate-x-1/2 mt-2 w-80 bg-slate-800 text-white text-sm rounded-xl px-4 py-3 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200"
            style={{top: '100%'}}>
            Shows the top blogs by mention count. Hover over each row to see the exact count. Use this data to identify which blogs are most referenced in your audience.
          </div>
        </div>
      </div>
      <div className="flex items-center mb-4 justify-between">
        <span className="text-xs text-gray-600 pb-1">Blog URL</span>
        <span className="text-xs text-gray-600 px-2 py-1">Mentions</span>
      </div>
      <div className="divide-y divide-gray-100">
        {blogsData.map((blog) => (
          <div key={blog.rank} className="flex items-center py-2 group hover:bg-blue-50 transition-all duration-150">
            <span className="w-6 text-center text-gray-400 text-xs font-bold">{blog.rank}</span>
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-lg font-bold mr-2">
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="#BFDBFE"/><path d="M7 10a3 3 0 013-3h3a3 3 0 110 6h-3a3 3 0 01-3-3z" stroke="#2563EB" strokeWidth="1.5"/></svg>
            </span>
            <span className="flex-1 truncate text-sm text-gray-700">{blog.url}</span>
            <span className="text-sm text-gray-700 font-semibold ml-2">{blog.mentions}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between text-xs text-gray-500 mt-4">
        <span>{`${(currentPage - 1) * pageSize + 1}-${currentPage * pageSize} of ${totalBlogs} Blogs`}</span>
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
