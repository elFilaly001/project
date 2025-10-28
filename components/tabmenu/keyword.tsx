import KeywordByAgeCard from "../keyword-by-age-card";
import KeywordByLocationCard from "../keyword-by-location-card";
import KeywordTopInterestsCard from "../keyword-top-interests-card";
import KeywordTopLanguagesCard from "../keyword-top-languages-card";
import KeywordTopOccupationsCard from "../keyword-top-occupations-card";

export default function Keyword() {
    return (
        <div className="w-full">
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">  
                    <KeywordByLocationCard />
                    <KeywordByAgeCard />
                    <KeywordTopLanguagesCard />
                    <div className="lg:col-span-3">
                        <KeywordTopInterestsCard />
                    </div>
                    <div className="lg:col-span-3">
                        <KeywordTopOccupationsCard />
                    </div>
            </div>
        </div>
        </div>
    );
}