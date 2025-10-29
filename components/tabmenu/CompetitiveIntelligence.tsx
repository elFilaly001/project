import React from 'react';
import dynamic from 'next/dynamic';
import CompetitiveTable from './CompetitiveTable';

// Dynamically import charts with SSR disabled to avoid hydration mismatches
const ShareOfVoiceBySourceType = dynamic(() => import('./charts/ShareOfVoiceBySourceType'), { ssr: false });
const ShareOfVoiceByMentionsDonut = dynamic(() => import('./charts/ShareOfVoiceByMentionsDonut'), { ssr: false });

export default function CompetitiveIntelligence() {
    return (
        <div className="space-y-4">
            {/* Insert the competitive table component */}
            <CompetitiveTable />

            {/* Charts below the table - full width, naturally sized vertically */}
            <div className="flex flex-col gap-4 w-full">
                <div className="w-full">
                    <ShareOfVoiceByMentionsDonut />
                </div>
                <div className="w-full">
                    <ShareOfVoiceBySourceType />
                </div>
            </div>
        </div>
    );
}
