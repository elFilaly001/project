import AiInsightSection from "./AiInsightSection";

const genderData = [
  { label: "Male", value: 59, color: "#06B6D4", icon: (
    <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><circle cx="24" cy="14" r="8" fill="#06B6D4"/><rect x="16" y="24" width="16" height="18" rx="8" fill="#06B6D4"/></svg>
  ) },
  { label: "Female", value: 41, color: "#EF4444", icon: (
    <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><circle cx="24" cy="14" r="8" fill="#EF4444"/><rect x="16" y="24" width="16" height="12" rx="8" fill="#EF4444"/><rect x="22" y="36" width="4" height="8" rx="2" fill="#EF4444"/></svg>
  ) },
];

const interpretationSentences = [
  `Male mentions account for 59% while female mentions are at 41%.`,
  `The audience is slightly more male-dominated in this period.`,
  `Consider tailoring content to appeal to both genders for balanced engagement.`
];

export default function MentionsByGenderCard() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border flex flex-col items-center">
      <div className="w-full flex items-center justify-between mb-2">
        <span className="text-xs text-gray-500 font-semibold">NUMBER OF MENTIONS</span>
        <span className="text-xs text-gray-400">29 AUG - 29 SEP</span>
        <div className="relative group">
          <button
            className="text-gray-400 text-xs px-2 py-1 rounded hover:bg-gray-50"
            type="button"
          >
            ?
          </button>
          <div className="absolute left-1/2 z-20 -translate-x-1/2 mt-2 w-64 bg-slate-800 text-white text-sm rounded-xl px-4 py-3 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200"
            style={{top: '100%'}}>
            Shows the percentage of mentions by gender. Use this data to understand audience composition and optimize your messaging.
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-6 mt-6 mb-4">
        {genderData.map((g) => (
          <div key={g.label} className="flex items-center gap-4">
            <span>{g.icon}</span>
            <span className={`text-2xl font-bold`} style={{ color: g.color }}>{g.label} <span className="ml-2" style={{ color: g.color }}>{g.value}%</span></span>
          </div>
        ))}
      </div>
      {/* AI interpretation */}
      <AiInsightSection sentences={interpretationSentences} />
    </div>
  );
}
