import EditorialSourcesCard from "../editorial-sources-card";
import MentionsByGenderCard from "../mentions-by-gender-card";
import MentionsByLocationCard from "../mentions-by-location-card";
import MentionsBySentimentCard from "../mentions-by-sentiment-card";
import MentionsByTrendCard from "../mentions-by-trend-card";
import SocialMediaMentionsCard from "../SocialMediaMentionsCard";
import TopBlogsCard from "../top-blogs-card";
import TopSharedLinksCard from "../top-shared-links-card";
import TopMentionsCard from "../topmentions-card";

export default function Mentions() {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-4 gap-6 items-stretch">
          <div className="col-span-2 flex flex-col flex-grow">
            <MentionsByTrendCard />
          </div>
          <div className="col-span-2 flex flex-col flex-grow">
            <TopBlogsCard />
          </div>
          <div className="col-span-2 flex flex-col flex-grow">
            <MentionsByLocationCard />
          </div>
          <div className="col-span-2 flex flex-col flex-grow">
            <TopSharedLinksCard />
          </div>
          <div className="col-span-2 flex flex-col flex-grow">
            <EditorialSourcesCard />
          </div>
          <div className="col-span-2 flex flex-col flex-grow">
            <MentionsByGenderCard />
          </div>
          <div className="col-span-4">
            <TopMentionsCard />
          </div>
          <div className="col-span-4">
            <MentionsBySentimentCard />
          </div>
          <div className="col-span-4">
            <SocialMediaMentionsCard />
          </div>
        </div>
      </div>
    </div>
  );
}
