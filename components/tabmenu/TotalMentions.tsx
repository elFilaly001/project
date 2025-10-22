import React from 'react';

type Props = {
    total?: number;
    subtitle?: string;
};

export default function TotalMentions({ total = 5240, subtitle = 'Total Mentions' }: Props) {
    return (
        <div className="p-6 bg-white border rounded-md shadow-sm h-full flex flex-col items-start justify-center">
            <div className="text-sm text-gray-500 mb-2">{subtitle}</div>
            <div className="text-4xl font-bold text-[#F02CB9]">{Intl.NumberFormat().format(total)}</div>
            <div className="text-xs text-gray-400 mt-1">across selected period</div>
        </div>
    );
}
