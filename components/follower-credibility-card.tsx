export default function FollowerCredibilityCard() {

    const credibility = {
    percent: 73,
    mood: "Bad",
    breakdown: [
      { label: "Mass followers", value: 14, color: "#F59E0B" }, // amber
      { label: "Suspicious", value: 20, color: "#FB7185" }, // pink/red
      { label: "Influencers", value: 4, color: "#7C3AED" }, // purple
      { label: "Real", value: 63, color: "#10B981" }, // green
    ],
  };

    return (
        <div className="bg-white rounded-xl p-5 shadow-sm border">
            <div className="flex items-start justify-between">
              <h3 className="text-gray-700 font-semibold">Audience Authenticity</h3>
              <div className="relative group">
                <button
                  className="text-gray-400 text-xs leading-none px-2 py-1 rounded hover:bg-gray-50"
                  type="button"
                >
                  ?
                </button>
                <div className="absolute left-1/2 z-20 -translate-x-1/2 mt-2 w-80 bg-slate-800 text-white text-sm rounded-xl px-4 py-3 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200"
                  style={{top: '100%'}}>
                  To determine the followers credibility score for historical accounts, we evaluate several factors, including the presence of a profile picture and bio, the number of posts, and the ratio between followers and following. Brands with an authentic audience typically achieve scores of 80 or higher.
                </div>
              </div>
            </div>

            <div className="flex gap-6 mt-4">
              {/* donut */}
              <div className="w-36 h-36 flex items-center justify-center">
                <CredibilityDonut percent={credibility.percent} mood={credibility.mood} />
              </div>

              {/* legend */}
              <div className="flex-1">
                <div className="w-full h-20 flex items-center justify-center">
                  <MiniRingBreakdown items={credibility.breakdown} />
                </div>

                <ul className="mt-3 space-y-2">
                  {credibility.breakdown.map((d) => (
                    <li key={d.label} className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-3">
                        <span
                          className="w-3 h-3 rounded-full inline-block"
                          style={{ backgroundColor: d.color }}
                        />
                        <span>{d.label}</span>
                      </div>
                      <span className="font-medium">{d.value}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="mt-4 text-xs text-gray-500">
              Bots have been detected even though the overall audience remains mostly authentic.
            </p>
          </div>
    );
}



function CredibilityDonut({ percent = 73, mood = "Bad" }) {
  // Donut using SVG circle strokes
  const size = 120;
  const stroke = 14;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const filled = (percent / 100) * circumference;

  // color: red if high bot %
  const color = percent >= 70 ? "#F43F5E" : "#10B981";

  return (
    <svg width={size} height={size} className="block">
      <defs>
        <linearGradient id="donutGrad" x1="0" x2="1">
          <stop offset="0%" stopColor="#F43F5E" />
          <stop offset="100%" stopColor="#FB7185" />
        </linearGradient>
      </defs>

      {/* background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#F3F4F6"
        strokeWidth={stroke}
        fill="none"
      />

      {/* filled arc */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="url(#donutGrad)"
        strokeWidth={stroke}
        strokeDasharray={`${filled} ${circumference - filled}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        fill="none"
      />

      {/* center content */}
      <g>
        <circle cx={size / 2} cy={size / 2} r={radius - stroke - 2} fill="#ffffff" />
        <text x="50%" y="46%" dominantBaseline="middle" textAnchor="middle" fontSize="18" fill="#374151" fontWeight="700">
          {percent}%
        </text>
        <text x="50%" y="62%" dominantBaseline="middle" textAnchor="middle" fontSize="12" fill="#6B7280">
          {mood}
        </text>
      </g>
    </svg>
  );
}

type MiniRingBreakdownItem = { label: string; value: number; color: string };
function MiniRingBreakdown({ items = [] }: { items?: MiniRingBreakdownItem[] }) {
  // Draw a small ring with segments (SVG conic-like)
  const size = 80;
  const center = size / 2;
  let start = 0; // degrees
  const total = items.reduce((s, it) => s + it.value, 0) || 100;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block">
      <g transform={`translate(${center}, ${center})`}>
        {items.map((it, idx) => {
          const angle = (it.value / total) * 360;
          const large = angle > 180 ? 1 : 0;
          const rad = Math.PI / 180;
          const r = 28;
          const x1 = Math.cos((start - 90) * rad) * r;
          const y1 = Math.sin((start - 90) * rad) * r;
          const x2 = Math.cos((start + angle - 90) * rad) * r;
          const y2 = Math.sin((start + angle - 90) * rad) * r;
          const path = `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
          start += angle;
          return <path key={idx} d={path} stroke={it.color} strokeWidth="8" fill="none" strokeLinecap="round" />;
        })}

        {/* inner circle to create donut hole */}
        <circle cx="0" cy="0" r="16" fill="#ffffff" />
      </g>
    </svg>
  );
}