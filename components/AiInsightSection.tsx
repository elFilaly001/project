import React from "react";

interface AiInsightSectionProps {
  sentences: string[];
}

export default function AiInsightSection({ sentences }: AiInsightSectionProps) {
  return (
    <div className="pt-3 w-full">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-9 h-9 text-cyan-400">
            <path d="M12 3c-1.657 0-3 1.343-3 3v1H8a3 3 0 0 0-3 3v1H4a1 1 0 0 0-1 1v1a4 4 0 0 0 4 4h1v1a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3v-1h1a4 4 0 0 0 4-4v-1a1 1 0 0 0-1-1h-1v-1a3 3 0 0 0-3-3h-1V6c0-1.657-1.343-3-3-3z" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 9h.01M16 9h.01M12 6v.01M10 15h4" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium mb-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">AI-powered insight</div>
          <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">
            {sentences.map((s, i) => (
              <p key={i} className="mb-1">{s}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
