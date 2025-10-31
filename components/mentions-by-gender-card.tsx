import AiInsightSection from "./AiInsightSection";
import { FaMale, FaFemale } from 'react-icons/fa';

const genderData = [
  { label: "Male", value: 59, color: "#06B6D4", icon: (<FaMale size={48} color="#06B6D4" />) },
  { label: "Female", value: 41, color: "#f161f9ff", icon: (<FaFemale size={48} color="#f161f9ff" />) },
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
        <h3 className="text-gray-700 font-semibold">Number Of Mentions</h3>
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