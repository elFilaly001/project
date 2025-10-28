import React, { useState, useRef, useEffect } from 'react'
import { SiInstagram, SiTiktok, SiYoutube } from 'react-icons/si'

export default function CompetitiveTable() {
    const [rows, setRows] = useState([
        {
            platform: 'Instagram',
            handle: 'IShowSpeed',
            score: '99.7/100',
            followers: '41.7M',
            growth: '+2.53%',
            lastActivity: 'This week',
            activity: '5 Posts / month',
            engRate: '5.31%',
            avgEng: '2.2M',
            avgViews: '43M',
            posting: 'once a week at 11PM'
        },
        {
            platform: 'TikTok',
            handle: 'IShowSpeed',
            score: '98.8/100',
            followers: '42.4M',
            growth: '+2.58%',
            lastActivity: '12 days ago',
            activity: '0.6 Videos / week',
            engRate: '17.24%',
            avgEng: '7.3M',
            avgViews: '60.4M',
            posting: 'once a week at 11PM'
        },
        {
            platform: 'X',
            handle: 'Speed⭐',
            score: '96.8/100',
            followers: '3.7M',
            growth: '+0.69%',
            lastActivity: 'This week',
            activity: '1.3 Tweets / week',
            engRate: '6.06%',
            avgEng: '226.9K',
            avgViews: '8.4M',
            posting: 'once a week at 10PM'
        }
    ])

    const [selectedPlatform, setSelectedPlatform] = useState('Instagram')
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        function onDocClick(e: MouseEvent) {
            if (!dropdownRef.current) return
            if (!dropdownRef.current.contains(e.target as Node)) setOpen(false)
        }
        document.addEventListener('click', onDocClick)
        return () => document.removeEventListener('click', onDocClick)
    }, [])

    const options = [
        { value: 'Instagram', label: 'Instagram' },
        { value: 'TikTok', label: 'TikTok' },
        { value: 'X', label: 'X' }
    ]

    return (
        <div className="w-full bg-white rounded-lg shadow-sm border">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left font-medium text-gray-600">
                                {/* Custom header dropdown with icons in options */}
                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        type="button"
                                        onClick={() => setOpen(o => !o)}
                                        className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-transparent px-0 py-0"
                                        aria-haspopup="listbox"
                                        aria-expanded={open}
                                    >
                                        {/* show icon for selected */}
                                        <span className="inline-flex items-center justify-center w-5 h-5">
                                            {(() => {
                                                const p = selectedPlatform.toLowerCase()
                                                if (p.includes('instagram')) return <SiInstagram className="text-pink-500 w-4 h-4" />
                                                if (p.includes('tiktok')) return <SiTiktok className="text-black w-4 h-4" />
                                                if (p === 'x' || p.includes('twitter'))
                                                    return (
                                                        <img
                                                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/X_logo_2023_original.svg"
                                                            alt="X logo"
                                                            className="w-4 h-4 object-contain"
                                                        />
                                                    )
                                                return null
                                            })()}
                                        </span>
                                        {/* label beside the icon */}
                                        <span className="text-sm font-medium text-gray-600">{selectedPlatform}</span>
                                    </button>

                                    {open && (
                                        <ul
                                            role="listbox"
                                            aria-label="Select social media for table"
                                            className="absolute z-10 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-md py-1"
                                        >
                                            {options.map(opt => (
                                                <li
                                                    key={opt.value}
                                                    role="option"
                                                    aria-selected={selectedPlatform === opt.value}
                                                    onClick={() => {
                                                        setSelectedPlatform(opt.value)
                                                        setOpen(false)
                                                    }}
                                                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                                                >
                                                    <span className="inline-flex items-center justify-center w-5 h-5">
                                                        {(() => {
                                                            const p = opt.value.toLowerCase()
                                                            if (p.includes('instagram')) return <SiInstagram className="text-pink-500 w-4 h-4" />
                                                            if (p.includes('tiktok')) return <SiTiktok className="text-black w-4 h-4" />
                                                            if (p === 'x')
                                                                return (
                                                                    <img
                                                                        src="https://upload.wikimedia.org/wikipedia/commons/5/53/X_logo_2023_original.svg"
                                                                        alt="X logo"
                                                                        className="w-4 h-4 object-contain"
                                                                    />
                                                                )
                                                            return null
                                                        })()}
                                                    </span>
                                                    <span>{opt.label}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </th>
                            <th className="px-4 py-3 text-left font-medium text-gray-600">Score</th>
                            <th className="px-4 py-3 text-left font-medium text-gray-600">Followers</th>
                            <th className="px-4 py-3 text-left font-medium text-gray-600">Growth (30 days)</th>
                            <th className="px-4 py-3 text-left font-medium text-gray-600">Last Activity</th>
                            <th className="px-4 py-3 text-left font-medium text-gray-600">Activity (30 days)</th>
                            <th className="px-4 py-3 text-left font-medium text-gray-600">Eng. Rate (30 days)</th>
                            <th className="px-4 py-3 text-left font-medium text-gray-600">Avg. Eng. (30 days)</th>
                            <th className="px-4 py-3 text-left font-medium text-gray-600">Avg Views (30 days)</th>
                            <th className="px-4 py-3 text-left font-medium text-gray-600">Posting Habits</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {rows.map((r, idx) => (
                            <tr key={idx} className="hover:bg-gray-50">
                                <td className="px-4 py-4 align-middle">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-700">
                                            {(() => {
                                                const p = selectedPlatform.toLowerCase()
                                                if (p.includes('instagram')) return <SiInstagram className="text-pink-500 w-5 h-5" />
                                                if (p.includes('tiktok')) return <SiTiktok className="text-black w-5 h-5" />
                                                // Use the official X logo image (same as used in Audience.tsx)
                                                if (p === 'x' || p.includes('twitter'))
                                                    return (
                                                        <img
                                                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/X_logo_2023_original.svg"
                                                            alt="X logo"
                                                            className="w-5 h-5 object-contain"
                                                        />
                                                    )
                                                if (p.includes('youtube')) return <SiYoutube className="text-red-500 w-5 h-5" />
                                                return <div className="text-xs">{selectedPlatform.slice(0, 2)}</div>
                                            })()}
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-800">{r.handle}</div>
                                            <div className="text-xs text-gray-500">@{r.handle.toLowerCase()}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-green-600 font-medium">{r.score}</td>
                                <td className="px-4 py-4 text-gray-700">{r.followers}</td>
                                <td className="px-4 py-4 text-green-500">{r.growth}</td>
                                <td className="px-4 py-4 text-sm text-gray-600">{r.lastActivity}</td>
                                <td className="px-4 py-4 text-sm text-gray-600">{r.activity}</td>
                                <td className="px-4 py-4 text-sm text-green-500">{r.engRate}</td>
                                <td className="px-4 py-4 text-sm text-green-600">{r.avgEng}</td>
                                <td className="px-4 py-4 text-sm text-green-600">{r.avgViews}</td>
                                <td className="px-4 py-4 text-sm text-gray-600">{r.posting}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
