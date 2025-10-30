import React, { useState, useRef, useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { SiInstagram, SiTiktok, SiYoutube } from 'react-icons/si'
import { FaFacebook, FaLinkedin } from 'react-icons/fa'
import { FiChevronDown } from 'react-icons/fi'
import DataTable, { TableColumn } from 'react-data-table-component'
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
    const dropdownButtonRef = useRef<HTMLButtonElement | null>(null)
    const menuRef = useRef<HTMLUListElement | null>(null)
    const [menuPos, setMenuPos] = useState<{ top: number; left: number } | null>(null)

    useEffect(() => {
        function onDocClick(e: MouseEvent) {
            const target = e.target as Node
            // if click is inside the header button or the portal menu, keep it open
            if (dropdownButtonRef.current && dropdownButtonRef.current.contains(target)) return
            if (menuRef.current && menuRef.current.contains(target)) return
            if (!dropdownRef.current) return
            if (!dropdownRef.current.contains(target)) {
                setOpen(false)
                setMenuPos(null)
            }
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
    // DataTable columns (uses selectedPlatform for icon rendering)
    const columns: TableColumn<any>[] = useMemo(() => {
        return [
            {
                name: (
                    <div className="relative inline-block" ref={dropdownRef}>
                        <button
                            type="button"
                            ref={dropdownButtonRef}
                            onClick={(e) => {
                                e.stopPropagation()
                                const btn = e.currentTarget as HTMLElement
                                const rect = btn.getBoundingClientRect()
                                setMenuPos({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX })
                                setOpen(o => !o)
                            }}
                            className="flex items-center justify-between gap-2 text-sm font-medium text-gray-600 bg-transparent px-3 py-2 w-48"
                            aria-haspopup="listbox"
                            aria-expanded={open}
                        >
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
                                    if (p.includes('facebook'))
                                        return (
                                            <img
                                                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                                                alt="Facebook logo"
                                                className="w-4 h-4 object-contain"
                                            />
                                        )
                                    if (p.includes('linkedin'))
                                        return (
                                            <img
                                                src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg"
                                                alt="LinkedIn logo"
                                                className="w-4 h-4 object-contain"
                                            />
                                        )
                                    return null
                                })()}
                            </span>
                            <span className="flex-1 text-sm font-medium text-gray-600 truncate text-left">{selectedPlatform}</span>
                            <FiChevronDown className="w-4 h-4 text-gray-400" />
                        </button>

                        {/* menu is rendered via portal so it isn't blocked by DataTable header DOM */}
                    </div>
                ),
                cell: row => (
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-700">
                            {(() => {
                                const p = selectedPlatform.toLowerCase()
                                if (p.includes('instagram')) return <SiInstagram className="text-pink-500 w-5 h-5" />
                                if (p.includes('tiktok')) return <SiTiktok className="text-black w-5 h-5" />
                                if (p === 'x' || p.includes('twitter'))
                                    return (
                                        <img
                                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/X_logo_2023_original.svg"
                                            alt="X logo"
                                            className="w-5 h-5 object-contain"
                                        />
                                    )
                                if (p.includes('youtube')) return <SiYoutube className="text-red-500 w-5 h-5" />
                                if (p.includes('facebook'))
                                    return (
                                        <img
                                            src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                                            alt="Facebook logo"
                                            className="w-5 h-5 object-contain"
                                        />
                                    )
                                if (p.includes('linkedin'))
                                    return (
                                        <img
                                            src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg"
                                            alt="LinkedIn logo"
                                            className="w-5 h-5 object-contain"
                                        />
                                    )
                                return <div className="text-xs">{selectedPlatform.slice(0, 2)}</div>
                            })()}
                        </div>
                        <div>
                            <div className="font-medium text-gray-800">{row.handle}</div>
                            <div className="text-xs text-gray-500">@{row.handle.toLowerCase()}</div>
                        </div>
                    </div>
                ),
                sortable: false,
                grow: 2,
                width: '260px'
            },
            { name: 'Followers', selector: row => row.followers, sortable: true, width: '120px' },
            { name: 'Growth (30 days)', selector: row => row.growth, sortable: true, width: '140px', cell: row => <div className="text-green-500">{row.growth}</div> },
            { name: 'Last Activity', selector: row => row.lastActivity, sortable: true, width: '120px' },
            { name: 'Activity (30 days)', selector: row => row.activity, sortable: false, width: '160px' },
            { name: 'Eng. Rate (30 days)', selector: row => row.engRate, sortable: true, width: '140px', cell: row => <div className="text-green-500">{row.engRate}</div> },
            { name: 'Avg. Eng. (30 days)', selector: row => row.avgEng, sortable: false, width: '140px', cell: row => <div className="text-green-600">{row.avgEng}</div> },
            { name: 'Avg Views (30 days)', selector: row => row.avgViews, sortable: false, width: '140px', cell: row => <div className="text-green-600">{row.avgViews}</div> },
            { name: 'Posting Habits', selector: row => row.posting, sortable: false, width: '180px' }
        ]
    }, [selectedPlatform, open])

    const customStyles = useMemo(() => ({
        rows: { style: { minHeight: '10px' } }, // slightly increase row height
        headCells: { style: { backgroundColor: 'transparent', paddingLeft: '16px', paddingRight: '16px', fontWeight: 600, color: '#4B5563' } },
        cells: { style: { paddingLeft: '16px', paddingRight: '16px', paddingTop: '12px', paddingBottom: '12px' } }
    }), [])

    const conditionalRowStyles = [
        {
            when: (row: any) => row.handle === 'Glovo',
            style: {
                background: 'linear-gradient(90deg, rgba(240,44,185,0.18), rgba(53,185,244,0.18))'
            }
        }
    ]

    return (
        <div className="w-full bg-white rounded-lg shadow-sm border">
            <div className="p-2">
                {/* header dropdown moved into the first column header — external dropdown removed */}

                <DataTable
                    columns={columns}
                    data={rows}
                    customStyles={customStyles}
                    conditionalRowStyles={conditionalRowStyles}
                    highlightOnHover
                    responsive
                    noHeader
                />
                {open && menuPos && typeof document !== 'undefined' && createPortal(
                    <ul
                        ref={menuRef}
                        role="listbox"
                        aria-label="Select social media for table"
                        className="absolute z-50 bg-white border border-gray-200 rounded-md shadow-md py-1"
                        style={{ top: menuPos.top, left: menuPos.left, width: 192 }}
                    >
                        {options.map(opt => (
                            <li
                                key={opt.value}
                                role="option"
                                aria-selected={selectedPlatform === opt.value}
                                onClick={(e) => { e.stopPropagation(); setSelectedPlatform(opt.value); setOpen(false); setMenuPos(null) }}
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
                                        if (p.includes('facebook'))
                                            return (
                                                <img
                                                    src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                                                    alt="Facebook logo"
                                                    className="w-4 h-4 object-contain"
                                                />
                                            )
                                        if (p.includes('linkedin'))
                                            return (
                                                <img
                                                    src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg"
                                                    alt="LinkedIn logo"
                                                    className="w-4 h-4 object-contain"
                                                />
                                            )
                                        return null
                                    })()}
                                </span>
                                <span className="truncate">{opt.label}</span>
                            </li>
                        ))}
                    </ul>,
                    document.body
                )}
            </div>

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
