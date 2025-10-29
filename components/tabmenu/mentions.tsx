import EditorialSourcesCard from "../editorial-sources-card";
import MentionsByGenderCard from "../mentions-by-gender-card";
import MentionsByLocationCard from "../mentions-by-location-card";
import MentionsBySentimentCard from "../mentions-by-sentiment-card";
import MentionsByTrendCard from "../mentions-by-trend-card";
import TopBlogsCard from "../top-blogs-card";
import TopSharedLinksCard from "../top-shared-links-card";
import TopMentionsCard from "../topmentions-card";

export default function Mentions() {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <MentionsByTrendCard />
          <MentionsByLocationCard />
          <TopBlogsCard />

          <TopSharedLinksCard />
          <EditorialSourcesCard />
          <MentionsByGenderCard />
          <div className="col-span-1 lg:col-span-3">
            <TopMentionsCard />
          </div>
          <div className="col-span-1 lg:col-span-3">
            <MentionsBySentimentCard />
          </div>
        </div>
      </div>
    </div>
  );
}
