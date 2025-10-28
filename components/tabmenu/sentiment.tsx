import KeywordsWithSentimentCard from "../keywords-with-sentiment-card";
import LocationWithSentimentCard from "../mentions-by-location-sentiment-card";
import SentimentBySourceCard from "../sentiment-by-source-card";
import SentimentTrendCard from "../sentiment-trend-card";

export default function Sentiment() {
    return (
        <div className="w-full">
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">  
                    <div className="lg:col-span-2">
                        <SentimentTrendCard />
                    </div>

                    <div>
                        <KeywordsWithSentimentCard />
                    </div>

                    <div className="lg:col-span-2">
                        <SentimentBySourceCard />
                    </div>

                    <div>
                        <LocationWithSentimentCard />
                    </div>
            </div>
        </div>
        </div>
    );
}
