import React from 'react';
import dynamic from 'next/dynamic';
import CompetitiveTable, { Competitor } from './CompetitiveTable';
import { useState } from 'react';

// Dynamically import charts with SSR disabled to avoid hydration mismatches
const ShareOfVoiceBySourceType = dynamic(() => import('./charts/ShareOfVoiceBySourceType'), { ssr: false });
const ShareOfVoiceByMentionsDonut = dynamic(() => import('./charts/ShareOfVoiceByMentionsDonut'), { ssr: false });

export default function CompetitiveIntelligence() {
    const [tableRows, setTableRows] = useState<Competitor[] | undefined>(undefined);
    const palette = ['#35B9F4', '#7FDFFF', '#9A4BF0', '#D46BF8', '#F02CB9', '#f277cfff']
    return (
        <div className="space-y-4">
            {/* Insert the competitive table component */}
            <CompetitiveTable onRowsChange={setTableRows} />

            {/* Charts below the table - full width, naturally sized vertically */}
            <div className="flex flex-col gap-4 w-full">
                <div className="w-full">
                    <ShareOfVoiceByMentionsDonut rows={tableRows?.map((r, i) => ({ label: r.handle, followers: r.followers, color: palette[i % palette.length] }))} />
                </div>
                <div className="w-full">
                    <ShareOfVoiceBySourceType rows={tableRows?.map((r, i) => ({ label: r.handle, color: palette[i % palette.length] }))} />
                </div>
            </div>
        </div>
    );
}
