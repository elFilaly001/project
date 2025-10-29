import React, { useState, useRef, useEffect, useMemo } from 'react'
import { SiInstagram, SiTiktok, SiYoutube } from 'react-icons/si'
import { FaFacebook, FaLinkedin } from 'react-icons/fa'
import { FiChevronDown } from 'react-icons/fi'
import AiInsightSection from '@/components/AiInsightSection'

export default function CompetitiveTable() {
    // Competitors for Glovo in the region
    const initialCompetitors = [
        {
            platform: 'App',
            handle: 'JumiaFood',
            score: '90.1/100',
            followers: '480K',
            growth: '+0.55%',
            lastActivity: 'Yesterday',
            activity: '12 Orders / month',
            engRate: '2.4%',
            avgEng: '11.5K',
            avgViews: '60K',
            posting: 'campaigns monthly'
        },
        {
            platform: 'App',
            handle: 'CareemNow',
            score: '88.3/100',
            followers: '210K',
            growth: '+0.30%',
            lastActivity: '2 days ago',
            activity: '8 Orders / month',
            engRate: '1.9%',
            avgEng: '4.0K',
            avgViews: '22K',
            posting: 'weekly promos'
        },
        {
            platform: 'App',
            handle: 'Chari',
            score: '85.6/100',
            followers: '95K',
            growth: '+0.20%',
            lastActivity: 'Today',
            activity: '5 Orders / month',
            engRate: '2.2%',
            avgEng: '2.1K',
            avgViews: '12K',
            posting: 'B2B updates weekly'
        },
        {
            platform: 'App',
            handle: 'Wolt',
            score: '84.9/100',
            followers: '130K',
            growth: '+0.40%',
            lastActivity: '3 days ago',
            activity: '6 Orders / month',
            engRate: '2.0%',
            avgEng: '3.2K',
            avgViews: '18K',
            posting: 'regional promos'
        },
        {
            platform: 'App',
            handle: 'Yassir',
            score: '82.0/100',
            followers: '75K',
            growth: '+0.10%',
            lastActivity: '1 week ago',
            activity: '3 Orders / month',
            engRate: '1.5%',
            avgEng: '1.1K',
            avgViews: '6K',
            posting: 'occasional promos'
        }
    ]

    // rows will be populated on mount so we can insert "ME" at a random position
    const [rows, setRows] = useState<any[]>([])

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

    // Insert the "Glovo" row at a random index among the competitors on first render
    useEffect(() => {
        const competitors = [...initialCompetitors]
        const glovo = {
            platform: 'App',
            handle: 'Glovo',
            score: '89.4/100',
            followers: '390K',
            growth: '+0.75%',
            lastActivity: 'Today',
            activity: '14 Orders / month',
            engRate: '3.0%',
            avgEng: '11.7K',
            avgViews: '65K',
            posting: 'daily promos at 7PM'
        }

        // random index between 0 and competitors.length (inclusive) so Glovo can be first/last or anywhere in between
        const idx = Math.floor(Math.random() * (competitors.length + 1))
        competitors.splice(idx, 0, glovo)
        setRows(competitors)
    }, [])

    const options = [
        { value: 'Instagram', label: 'Instagram' },
        { value: 'TikTok', label: 'TikTok' },
        { value: 'X', label: 'X' },
        { value: 'YouTube', label: 'YouTube' },
        { value: 'Facebook', label: 'Facebook' },
        { value: 'LinkedIn', label: 'LinkedIn' }
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
                                        className="flex items-center justify-between gap-2 text-sm font-medium text-gray-600 bg-transparent px-3 py-2 w-48"
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
                                                if (p.includes('youtube')) return <SiYoutube className="text-red-500 w-4 h-4" />
                                                if (p.includes('facebook')) return <FaFacebook className="text-blue-600 w-4 h-4" />
                                                if (p.includes('linkedin')) return <FaLinkedin className="text-blue-700 w-4 h-4" />
                                                return null
                                            })()}
                                        </span>
                                        {/* label beside the icon */}
                                        <span className="flex-1 text-sm font-medium text-gray-600 truncate text-left">{selectedPlatform}</span>
                                        <FiChevronDown className="w-4 h-4 text-gray-400" />
                                    </button>

                                    {open && (
                                        <ul
                                            role="listbox"
                                            aria-label="Select social media for table"
                                            className="absolute z-10 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-md py-1"
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
                                                            if (p.includes('youtube')) return <SiYoutube className="text-red-500 w-4 h-4" />
                                                            if (p.includes('facebook')) return <FaFacebook className="text-blue-600 w-4 h-4" />
                                                            if (p.includes('linkedin')) return <FaLinkedin className="text-blue-700 w-4 h-4" />
                                                            return null
                                                        })()}
                                                    </span>
                                                    <span className="truncate">{opt.label}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </th>

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
                            <tr
                                key={idx}
                                className="hover:bg-gray-50"
                                style={
                                    r.handle === 'Glovo'
                                        ? { background: 'linear-gradient(90deg, rgba(240,44,185,0.18), rgba(53,185,244,0.18))' }
                                        : undefined
                                }
                            >
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
            {/* AI Interpretation - mirrors other components' usage of AiInsightSection */}
            <div className="p-4">
                <AiInsightSection
                    sentences={useMemo(() => {
                        if (!rows || rows.length === 0) return ["No data available for AI interpretation."]

                        // Find top followers (simple numeric compare, keeps units as-is for display)
                        let top = rows[0]
                        for (const r of rows) {
                            try {
                                const a = parseFloat(String(r.followers).replace(/[^0-9.]/g, '')) || 0
                                const b = parseFloat(String(top.followers).replace(/[^0-9.]/g, '')) || 0
                                if (a > b) top = r
                            } catch (e) {
                                // ignore parsing errors
                            }
                        }

                        const glovo = rows.find(r => r.handle === 'Glovo')

                        const sentences: string[] = []
                        sentences.push(`${top.handle} is the largest handle by follower count (${top.followers}), making them a primary competitor to monitor.`)
                        if (glovo) {
                            sentences.push(`Glovo shows ${glovo.engRate} engagement and ${glovo.avgViews} average views — strong signals compared to many competitors.`)
                        } else {
                            sentences.push(`Glovo is not present in the current competitor list.`)
                        }

                        sentences.push('Consider monitoring posting habits and engagement trends to identify quick growth opportunities.')
                        return sentences
                    }, [rows])}
                />
            </div>
        </div>
    )
}
