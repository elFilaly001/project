import React, { useState } from "react";
import { SocialPlatform } from "./ui/SocialDropdown";
import InlineDateRangePicker from "./tabmenu/filter/InlineDateRangePicker";
import SocialDropdown from "./ui/SocialDropdown";
import PlatformMentionsCard, { Mention } from "./PlatformMentionsCard";
import AiInsightSection from "./AiInsightSection";

type SocialMediaKey = "LinkedIn" | "X" | "YouTube" | "Facebook" | "TikTok" | "Instagram";

const SOCIAL_MEDIA: SocialPlatform[] = [
  {
    name: "LinkedIn",
    count: null,
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg",
    color: "#0077B5",
    text: "white",
  },
  {
    name: "X",
    count: null,
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/x.svg",
    color: "#000000",
    text: "white",
  },
  {
    name: "YouTube",
    count: null,
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/youtube.svg",
    color: "#FF0000",
    text: "white",
  },
  {
    name: "Facebook",
    count: null,
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg",
    color: "#1877F3",
    text: "white",
  },
  {
    name: "TikTok",
    count: null,
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/tiktok.svg",
    color: "#010101",
    text: "white",
  },
  {
    name: "Instagram",
    count: null,
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg",
    color: "#E1306C",
    text: "white",
  },
];

const ALL_SOCIAL_OPTION: SocialPlatform = {
  name: "All Social Medias",
  count: null,
  logo: "https://cdn.jsdelivr.net/gh/feathericons/feather/icons/globe.svg",
  color: "#6B7280",
  text: "white",
};

const MENTIONS: Record<SocialMediaKey, Mention[]> = {
  LinkedIn: [
    { user: "John Doe", text: "Great insights on LinkedIn!", sentiment: "positive", timestamp: "2h ago", avatar: "https://picsum.photos/seed/johndoe/40/40", imageUrl: "https://picsum.photos/seed/linkedin1/400/200" },
    { user: "Jane Smith", text: "Loved the recent post.", sentiment: "positive", timestamp: "4h ago", avatar: "https://picsum.photos/seed/janesmith/40/40" },
    { user: "Alex Lee", text: "Networking is key.", sentiment: "neutral", timestamp: "6h ago", avatar: "https://picsum.photos/seed/alexlee/40/40" },
    { user: "Mike Johnson", text: "Very informative article.", sentiment: "positive", timestamp: "8h ago", avatar: "https://picsum.photos/seed/mikejohnson/40/40", imageUrl: "https://picsum.photos/seed/linkedin2/400/200" },
    { user: "Sara Wilson", text: "Disagree with this point.", sentiment: "negative", timestamp: "10h ago", avatar: "https://picsum.photos/seed/sarawilson/40/40" },
    { user: "Tom Brown", text: "Interesting perspective.", sentiment: "neutral", timestamp: "12h ago", avatar: "https://picsum.photos/seed/tombrown/40/40" },
    { user: "Lisa Green", text: "Well written!", sentiment: "positive", timestamp: "14h ago", avatar: "https://picsum.photos/seed/lisagreen/40/40" },
    { user: "David Black", text: "Not convinced.", sentiment: "negative", timestamp: "16h ago", avatar: "https://picsum.photos/seed/davidblack/40/40" },
    { user: "Emma White", text: "Good read.", sentiment: "neutral", timestamp: "18h ago", avatar: "https://picsum.photos/seed/emmawhite/40/40" },
  ],
  X: [
    { user: "@user1", text: "Check out this tweet!", sentiment: "positive", timestamp: "1h ago", avatar: "https://picsum.photos/seed/user1x/40/40", imageUrl: "https://picsum.photos/seed/x1/400/200" },
    { user: "@user2", text: "X is buzzing today.", sentiment: "neutral", timestamp: "3h ago", avatar: "https://picsum.photos/seed/user2x/40/40" },
    { user: "@user3", text: "Trending topic here.", sentiment: "positive", timestamp: "5h ago", avatar: "https://picsum.photos/seed/user3x/40/40" },
    { user: "@user4", text: "This is outdated.", sentiment: "negative", timestamp: "7h ago", avatar: "https://picsum.photos/seed/user4x/40/40" },
    { user: "@user5", text: "Love the thread!", sentiment: "positive", timestamp: "9h ago", avatar: "https://picsum.photos/seed/user5x/40/40", imageUrl: "https://picsum.photos/seed/x2/400/200" },
    { user: "@user6", text: "Not sure about this.", sentiment: "neutral", timestamp: "11h ago", avatar: "https://picsum.photos/seed/user6x/40/40" },
    { user: "@user7", text: "Great take!", sentiment: "positive", timestamp: "13h ago", avatar: "https://picsum.photos/seed/user7x/40/40" },
    { user: "@user8", text: "Disagree.", sentiment: "negative", timestamp: "15h ago", avatar: "https://picsum.photos/seed/user8x/40/40" },
    { user: "@user9", text: "Interesting.", sentiment: "neutral", timestamp: "17h ago", avatar: "https://picsum.photos/seed/user9x/40/40" },
  ],
  YouTube: [
    { user: "YTUserA", text: "Awesome video!", sentiment: "positive", timestamp: "30m ago", avatar: "https://picsum.photos/seed/ytusera/40/40" },
    { user: "YTUserB", text: "Subscribed!", sentiment: "positive", timestamp: "1h ago", avatar: "https://picsum.photos/seed/ytuserb/40/40" },
    { user: "YTUserC", text: "Great content.", sentiment: "positive", timestamp: "2h ago", avatar: "https://picsum.photos/seed/ytuserc/40/40", imageUrl: "https://picsum.photos/seed/youtube1/400/200" },
    { user: "YTUserD", text: "Too long.", sentiment: "negative", timestamp: "3h ago", avatar: "https://picsum.photos/seed/ytuserd/40/40" },
    { user: "YTUserE", text: "Keep it up!", sentiment: "positive", timestamp: "4h ago", avatar: "https://picsum.photos/seed/ytusere/40/40" },
    { user: "YTUserF", text: "Average video.", sentiment: "neutral", timestamp: "5h ago", avatar: "https://picsum.photos/seed/ytuserf/40/40" },
    { user: "YTUserG", text: "Loved it!", sentiment: "positive", timestamp: "6h ago", avatar: "https://picsum.photos/seed/ytuserg/40/40" },
    { user: "YTUserH", text: "Boring.", sentiment: "negative", timestamp: "7h ago", avatar: "https://picsum.photos/seed/ytuserh/40/40" },
    { user: "YTUserI", text: "Okay.", sentiment: "neutral", timestamp: "8h ago", avatar: "https://picsum.photos/seed/ytuseri/40/40" },
  ],
  Facebook: [
    { user: "FBUser1", text: "Shared your post.", sentiment: "neutral", timestamp: "1h ago", avatar: "https://picsum.photos/seed/fbuser1/40/40" },
    { user: "FBUser2", text: "Nice update!", sentiment: "positive", timestamp: "3h ago", avatar: "https://picsum.photos/seed/fbuser2/40/40", imageUrl: "https://picsum.photos/seed/facebook1/400/200" },
    { user: "FBUser3", text: "Following your page.", sentiment: "neutral", timestamp: "5h ago", avatar: "https://picsum.photos/seed/fbuser3/40/40" },
    { user: "FBUser4", text: "This is misleading.", sentiment: "negative", timestamp: "7h ago", avatar: "https://picsum.photos/seed/fbuser4/40/40" },
    { user: "FBUser5", text: "Love your content!", sentiment: "positive", timestamp: "9h ago", avatar: "https://picsum.photos/seed/fbuser5/40/40" },
    { user: "FBUser6", text: "Meh.", sentiment: "neutral", timestamp: "11h ago", avatar: "https://picsum.photos/seed/fbuser6/40/40" },
    { user: "FBUser7", text: "Awesome!", sentiment: "positive", timestamp: "13h ago", avatar: "https://picsum.photos/seed/fbuser7/40/40" },
    { user: "FBUser8", text: "Not good.", sentiment: "negative", timestamp: "15h ago", avatar: "https://picsum.photos/seed/fbuser8/40/40" },
    { user: "FBUser9", text: "Fine.", sentiment: "neutral", timestamp: "17h ago", avatar: "https://picsum.photos/seed/fbuser9/40/40" },
  ],
  TikTok: [
    { user: "TikTokStar", text: "Loved your TikTok!", sentiment: "positive", timestamp: "15m ago", avatar: "https://picsum.photos/seed/tiktokstar/40/40" },
    { user: "DanceFan", text: "Cool moves!", sentiment: "positive", timestamp: "45m ago", avatar: "https://picsum.photos/seed/dancefan/40/40" },
    { user: "MusicLover", text: "Great sound.", sentiment: "positive", timestamp: "1h ago", avatar: "https://picsum.photos/seed/musiclover/40/40" },
    { user: "TrendSetter", text: "Outdated trend.", sentiment: "negative", timestamp: "2h ago", avatar: "https://picsum.photos/seed/trendsetter/40/40" },
    { user: "ViralFan", text: "This is fire!", sentiment: "positive", timestamp: "3h ago", avatar: "https://picsum.photos/seed/viralfan/40/40", imageUrl: "https://picsum.photos/seed/tiktok1/400/200" },
    { user: "CasualViewer", text: "Okay video.", sentiment: "neutral", timestamp: "4h ago", avatar: "https://picsum.photos/seed/casualviewer/40/40" },
    { user: "DancePro", text: "Amazing dance!", sentiment: "positive", timestamp: "5h ago", avatar: "https://picsum.photos/seed/dancepro/40/40" },
    { user: "MusicHater", text: "Bad music.", sentiment: "negative", timestamp: "6h ago", avatar: "https://picsum.photos/seed/musichater/40/40" },
    { user: "TrendFollower", text: "Nice.", sentiment: "neutral", timestamp: "7h ago", avatar: "https://picsum.photos/seed/trendfollower/40/40" },
  ],
  Instagram: [
    { user: "InstaUser1", text: "Amazing photo!", sentiment: "positive", timestamp: "20m ago", avatar: "https://picsum.photos/seed/instauser1/40/40", imageUrl: "https://picsum.photos/seed/insta1/400/200" },
    { user: "InstaUser2", text: "Nice story.", sentiment: "neutral", timestamp: "1h ago", avatar: "https://picsum.photos/seed/instauser2/40/40" },
    { user: "InstaUser3", text: "Love your feed.", sentiment: "positive", timestamp: "2h ago", avatar: "https://picsum.photos/seed/instauser3/40/40" },
    { user: "PhotoCritic", text: "Poor quality.", sentiment: "negative", timestamp: "3h ago", avatar: "https://picsum.photos/seed/photocritic/40/40" },
    { user: "ArtLover", text: "Beautiful shot!", sentiment: "positive", timestamp: "4h ago", avatar: "https://picsum.photos/seed/artlover/40/40", imageUrl: "https://picsum.photos/seed/insta2/400/200" },
    { user: "StoryViewer", text: "Interesting.", sentiment: "neutral", timestamp: "5h ago", avatar: "https://picsum.photos/seed/storyviewer/40/40" },
    { user: "PhotoFan", text: "Stunning!", sentiment: "positive", timestamp: "6h ago", avatar: "https://picsum.photos/seed/photofan/40/40" },
    { user: "CriticX", text: "Blurry.", sentiment: "negative", timestamp: "7h ago", avatar: "https://picsum.photos/seed/criticx/40/40" },
    { user: "ViewerY", text: "Okay post.", sentiment: "neutral", timestamp: "8h ago", avatar: "https://picsum.photos/seed/viewery/40/40" },
  ],
};


function parseTimestampToMinutesAgo(timestamp?: string): number {
  if (!timestamp) return Infinity;
  if (timestamp.endsWith('m ago')) {
    return parseInt(timestamp) || 0;
  }
  if (timestamp.endsWith('h ago')) {
    return (parseInt(timestamp) || 0) * 60;
  }
  return Infinity;
}

function SocialMediaMentionsCard() {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [selectedSentiment, setSelectedSentiment] = useState<'all' | 'positive' | 'negative' | 'neutral'>('all');
  const [dateRange, setDateRange] = useState<{ minMinutesAgo: number; maxMinutesAgo: number } | null>(null);

  // Handler to convert date range to minutes ago
  function handleDateRangeChange(range: { from?: Date; to?: Date }) {
    if (!range.from || !range.to) {
      setDateRange(null);
      return;
    }
    const now = new Date();
    const minMinutesAgo = Math.floor((now.getTime() - range.to.getTime()) / 60000);
    const maxMinutesAgo = Math.ceil((now.getTime() - range.from.getTime()) / 60000);
    setDateRange({ minMinutesAgo, maxMinutesAgo });
  }

  // Determine if 'All Social Medias' is selected
  const isAllSocialSelected = selectedPlatform === ALL_SOCIAL_OPTION.name || selectedPlatform === null;

  // Filtering function
  function filterMention(mention: Mention) {
    const sentimentMatch = selectedSentiment === 'all' || mention.sentiment === selectedSentiment;
    let dateMatch = true;
    if (dateRange) {
      const minutesAgo = parseTimestampToMinutesAgo(mention.timestamp);
      dateMatch = minutesAgo >= dateRange.minMinutesAgo && minutesAgo <= dateRange.maxMinutesAgo;
    }
    return sentimentMatch && dateMatch;
  }

  // Collect all mentions if 'All Social Medias' is selected, and add platform info
  let mixedMentions: (Mention & { platformName?: SocialMediaKey })[] = [];
  if (isAllSocialSelected) {
    mixedMentions = Object.entries(MENTIONS)
      .flatMap(([platformName, mentions]) =>
        mentions
          .filter(filterMention)
          .map((mention) => ({ ...mention, platformName: platformName as SocialMediaKey }))
      );
    // Shuffle the array
    for (let i = mixedMentions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [mixedMentions[i], mixedMentions[j]] = [mixedMentions[j], mixedMentions[i]];
    }
    // Do NOT slice to 9 here; let PlatformMentionsCard handle pagination
  }

  // AI interpretation sentences for the bottom
  const aiInterpretationSentences = [
    "The most recent mentions are shown below, filtered by your selected platform, sentiment, and date range.",
    "Use these insights to understand how your brand is being discussed and perceived across social media.",
    "AI highlights engagement and sentiment trends to help you optimize your social strategy."
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4 relative">
      {/* Title and tooltip */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Social Media Mentions</h2>
        <div className="relative group">
          <button
            className="text-gray-400 text-xs px-2 py-1 rounded hover:bg-gray-50"
            type="button"
            aria-label="Info"
          >
            ?
          </button>
          <div className="absolute right-0 z-20 mt-2 w-80 bg-slate-800 text-white text-sm rounded-xl px-4 py-3 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200"
            style={{top: '100%'}}>
            Shows recent mentions from selected social media platforms. Filter by sentiment or date range to analyze audience conversations and engagement. Use this data to identify trends and optimize your social strategy.
          </div>
        </div>
      </div>

      {/* Social Media Dropdown and filters */}
      <div className="flex justify-between mb-4">
        <div className="flex gap-2">
        </div>
        <div className="flex gap-2">
          <SocialDropdown
            socialPlatforms={SOCIAL_MEDIA}
            allSocialOption={ALL_SOCIAL_OPTION}
            selectedSocial={selectedPlatform}
            setSelectedSocial={setSelectedPlatform}
          />
          <select
            value={selectedSentiment}
            onChange={(e) => setSelectedSentiment(e.target.value as 'all' | 'positive' | 'negative' | 'neutral')}
            className="px-3 py-1 border rounded text-sm bg-white"
          >
            <option value="all">All Sentiments</option>
            <option value="positive">Positive</option>
            <option value="negative">Negative</option>
            <option value="neutral">Neutral</option>
          </select>
          <InlineDateRangePicker onChange={handleDateRangeChange} />
        </div>
      </div>

      {/* show platforms based on selection */}
      <div className="grid grid-cols-1 gap-4">
        {isAllSocialSelected ? (
          <PlatformMentionsCard platform={ALL_SOCIAL_OPTION} mentions={mixedMentions} isMixed={true} />
        ) : (
          SOCIAL_MEDIA.filter(p => p.name === selectedPlatform).map((platform) => {
            const key = platform.name as SocialMediaKey;
            const filteredMentions = MENTIONS[key].filter(filterMention);
            return (
              <PlatformMentionsCard key={key} platform={platform} mentions={filteredMentions} />
            );
          })
        )}
      </div>

      {/* AI interpretation section at the bottom, styled like TopMentionsCard */}
      <div className="mt-6 flex flex-col">
        <div className="bg-gray-50 rounded-lg p-4">
          <AiInsightSection sentences={aiInterpretationSentences} />
        </div>
      </div>
    </div>
  );
}

export default SocialMediaMentionsCard;