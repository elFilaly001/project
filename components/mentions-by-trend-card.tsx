import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import FollowersDispatch, { SocialBreakdownItem } from './followers-dispatch';
import AiInsightSection from './AiInsightSection';
ChartJS.register(ArcElement, Tooltip, Legend);

const socialBreakdown: SocialBreakdownItem[] = [
  {
    name: "Instagram",
    percent: 40,
    followersCount: 4300.32,
    color: "#E1306C",
    gradient:
      "linear-gradient(135deg, #833AB4 0%, #E1306C 50%, #FD1D1D 100%)",
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg",
    coloredLogo:
      "https://upload.wikimedia.org/wikipedia/commons/2/21/Instagram_Glyph_Gradient_RGB_logo.svg",
  },
  {
    name: "TikTok",
    percent: 20,
    followersCount: 2100,
    color: "#010101",
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/tiktok.svg",
    coloredLogo:
      "https://upload.wikimedia.org/wikipedia/commons/a/a6/Tiktok_icon.svg",
  },
  {
    name: "YouTube",
    percent: 15,
    followersCount: 1380,
    color: "#FF0000",
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/youtube.svg",
    coloredLogo:
      "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg",
  },
  {
    name: "X",
    percent: 10,
    followersCount: 890.33,
    color: "#000000",
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/x.svg",
    coloredLogo:
      "https://upload.wikimedia.org/wikipedia/commons/5/53/X_logo_2023_original.svg",
  },
  {
    name: "LinkedIn",
    percent: 5,
    followersCount: 500,
    color: "#0077B5",
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg",
    coloredLogo:
      "https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg",
  },
];

const totalMentions = socialBreakdown.reduce((sum, item) => sum + item.followersCount, 0);

const interpretationSentences = [
  `Instagram leads with ${socialBreakdown[0].followersCount} mentions, representing ${(socialBreakdown[0].followersCount / totalMentions * 100).toFixed(1)}% of total mentions.`,
  `TikTok, YouTube, X, and LinkedIn follow with lower shares, indicating platform-specific trends.`,
  `Focus your engagement strategy on platforms with the highest mention rates for maximum impact.`
];

export default function MentionsByTrendCard() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-700 font-semibold">Mentions by Source</h3>
        <div className="relative group">
          <button
            className="text-gray-400 text-xs leading-none px-2 py-1 rounded hover:bg-gray-50"
            type="button"
          >
            ?
          </button>
          <div className="absolute left-1/2 z-20 -translate-x-1/2 mt-2 w-80 bg-slate-800 text-white text-sm rounded-xl px-4 py-3 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200"
            style={{top: '100%'}}>
            Shows the total mentions segmented by platform. Hover over each segment to see the count and percentage. The central number represents the total mentions.
          </div>
        </div>
      </div>
      <div className="relative flex items-center justify-center mt-6" style={{ minHeight: 220 }}>
        <FollowersDispatch socialBreakdown={socialBreakdown} showTitle={false} showInsights={false} />
      </div>
      {/* AI interpretation */}
      <AiInsightSection sentences={interpretationSentences} />
    </div>
  );
}
