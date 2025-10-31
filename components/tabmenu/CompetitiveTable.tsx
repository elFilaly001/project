import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { SiInstagram, SiTiktok, SiYoutube } from 'react-icons/si'
import { FaFacebook, FaLinkedin } from 'react-icons/fa'
import { FiChevronDown } from 'react-icons/fi'
import DataTable, { TableColumn } from 'react-data-table-component'
import AiInsightSection from '@/components/AiInsightSection'

export type Competitor = {
    platform: string
    handle: string
    avatar: string
    score: string
    followers: string
    growth: string
    lastActivity: string
    activity: string
    engRate: string
    avgEng: string
    avgViews: string
    posting: string
}

// parse follower strings like "480K", "1.2M", "64K" into numbers (ints)
function parseFollowers(s: string | undefined): number {
    if (!s) return 0
    const v = String(s).trim().toUpperCase()
    // remove commas and spaces
    const clean = v.replace(/[,\s]/g, '')
    // match numeric part and suffix
    const m = clean.match(/^([0-9]*\.?[0-9]+)\s*([KM]?)$/)
    if (!m) return Number(clean) || 0
    const num = parseFloat(m[1])
    const suffix = m[2]
    if (suffix === 'M') return Math.round(num * 1_000_000)
    if (suffix === 'K') return Math.round(num * 1_000)
    return Math.round(num)
}

const platformDatasets: Record<string, Competitor[]> = {
    Instagram: [
        { platform: 'App', handle: 'JumiaFood', avatar: '/jumia.png', score: '90.1/100', followers: '480K', growth: '+0.55%', lastActivity: 'Yesterday', activity: '12 Posts / month', engRate: '2.4%', avgEng: '11.5K', avgViews: '60K', posting: 'campaigns monthly' },
        { platform: 'App', handle: 'CareemNow', avatar: '/careem.png', score: '88.3/100', followers: '210K', growth: '+0.30%', lastActivity: '2 days ago', activity: '8 Posts / month', engRate: '1.9%', avgEng: '4.0K', avgViews: '22K', posting: 'weekly promos' },
        { platform: 'App', handle: 'Yassir', avatar: '/yassir.png', score: '82.0/100', followers: '75K', growth: '+0.10%', lastActivity: '1 week ago', activity: '3 Posts / month', engRate: '1.5%', avgEng: '1.1K', avgViews: '6K', posting: 'occasional promos' },
        { platform: 'App', handle: 'Koul', avatar: 'https://play-lh.googleusercontent.com/iT7fPfobm4I1fv56GEvWxdgx41FX24dYQaP37XWE82-4hkSQPHt3mf0JPlPz9IV407KX=w240-h480-rw', score: '85.6/100', followers: '120K', growth: '+0.20%', lastActivity: 'Today', activity: '6 Posts / month', engRate: '1.8%', avgEng: '2.3K', avgViews: '12K', posting: 'regular promos' },
        { platform: 'App', handle: 'Livry', avatar: 'https://media.licdn.com/dms/image/v2/C4D0BAQFexnvwu4etlg/company-logo_200_200/company-logo_200_200/0/1630518889539?e=1763596800&v=beta&t=PRidNFjYjeSVskPTem8I_JWZfEx3Xe1LdfktacScUfI', score: '80.4/100', followers: '64K', growth: '+0.05%', lastActivity: '3 days ago', activity: '4 Posts / month', engRate: '1.2%', avgEng: '900', avgViews: '5K', posting: 'occasional updates' }
    ],
    TikTok: [
        { platform: 'App', handle: 'JumiaFood', avatar: '/jumia.png', score: '88.9/100', followers: '1.2M', growth: '+1.2%', lastActivity: 'Yesterday', activity: '30 Videos / month', engRate: '3.8%', avgEng: '45K', avgViews: '300K', posting: 'viral clips' },
        { platform: 'App', handle: 'CareemNow', avatar: '/careem.png', score: '84.2/100', followers: '400K', growth: '+0.8%', lastActivity: '2 days ago', activity: '12 Videos / month', engRate: '2.7%', avgEng: '10K', avgViews: '60K', posting: 'campaigns' },
        { platform: 'App', handle: 'Yassir', avatar: '/yassir.png', score: '81.7/100', followers: '120K', growth: '+0.25%', lastActivity: '3 days ago', activity: '9 Videos / month', engRate: '1.6%', avgEng: '1.5K', avgViews: '8K', posting: 'community clips' },
        { platform: 'App', handle: 'Koul', avatar: 'https://play-lh.googleusercontent.com/iT7fPfobm4I1fv56GEvWxdgx41FX24dYQaP37XWE82-4hkSQPHt3mf0JPlPz9IV407KX=w240-h480-rw', score: '79.5/100', followers: '90K', growth: '+0.4%', lastActivity: 'Today', activity: '8 Videos / month', engRate: '2.0%', avgEng: '1.8K', avgViews: '9K', posting: 'local promos' },
        { platform: 'App', handle: 'Livry', avatar: 'https://media.licdn.com/dms/image/v2/C4D0BAQFexnvwu4etlg/company-logo_200_200/company-logo_200_200/0/1630518889539?e=1763596800&v=beta&t=PRidNFjYjeSVskPTem8I_JWZfEx3Xe1LdfktacScUfI', score: '76.0/100', followers: '40K', growth: '+0.02%', lastActivity: '4 days ago', activity: '3 Videos / month', engRate: '0.9%', avgEng: '600', avgViews: '3K', posting: 'sporadic clips' }
    ],
    X: [
        { platform: 'App', handle: 'JumiaFood', avatar: '/jumia.png', score: '75.3/100', followers: '220K', growth: '+0.10%', lastActivity: 'Yesterday', activity: '40 Tweets / month', engRate: '0.6%', avgEng: '1.3K', avgViews: '8K', posting: 'news & promos' },
        { platform: 'App', handle: 'CareemNow', avatar: '/careem.png', score: '70.1/100', followers: '180K', growth: '+0.05%', lastActivity: '1 day ago', activity: '22 Tweets / month', engRate: '0.5%', avgEng: '900', avgViews: '5K', posting: 'customer updates' },
        { platform: 'App', handle: 'Yassir', avatar: '/yassir.png', score: '68.0/100', followers: '95K', growth: '+0.02%', lastActivity: '2 days ago', activity: '18 Tweets / month', engRate: '0.4%', avgEng: '400', avgViews: '2.1K', posting: 'local updates' },
        { platform: 'App', handle: 'Koul', avatar: 'https://play-lh.googleusercontent.com/iT7fPfobm4I1fv56GEvWxdgx41FX24dYQaP37XWE82-4hkSQPHt3mf0JPlPz9IV407KX=w240-h480-rw', score: '64.5/100', followers: '45K', growth: '+0.01%', lastActivity: '3 days ago', activity: '10 Tweets / month', engRate: '0.3%', avgEng: '120', avgViews: '900', posting: 'support & promos' },
        { platform: 'App', handle: 'Livry', avatar: 'https://media.licdn.com/dms/image/v2/C4D0BAQFexnvwu4etlg/company-logo_200_200/company-logo_200_200/0/1630518889539?e=1763596800&v=beta&t=PRidNFjYjeSVskPTem8I_JWZfEx3Xe1LdfktacScUfI', score: '60.2/100', followers: '22K', growth: '-0.02%', lastActivity: '7 days ago', activity: '5 Tweets / month', engRate: '0.2%', avgEng: '80', avgViews: '400', posting: 'sporadic announcements' }
    ],
    YouTube: [
        { platform: 'App', handle: 'JumiaFood', avatar: '/jumia.png', score: '91.0/100', followers: '2.1M', growth: '+0.9%', lastActivity: 'Yesterday', activity: '6 Videos / month', engRate: '4.2%', avgEng: '90K', avgViews: '500K', posting: 'long-form reviews' },
        { platform: 'App', handle: 'CareemNow', avatar: '/careem.png', score: '86.4/100', followers: '420K', growth: '+0.5%', lastActivity: '2 days ago', activity: '4 Videos / month', engRate: '3.0%', avgEng: '12K', avgViews: '70K', posting: 'promo videos' },
        { platform: 'App', handle: 'Yassir', avatar: '/yassir.png', score: '74.0/100', followers: '85K', growth: '+0.15%', lastActivity: '1 week ago', activity: '2 Videos / month', engRate: '1.2%', avgEng: '1.1K', avgViews: '5K', posting: 'how-to content' },
        { platform: 'App', handle: 'Koul', avatar: 'https://play-lh.googleusercontent.com/iT7fPfobm4I1fv56GEvWxdgx41FX24dYQaP37XWE82-4hkSQPHt3mf0JPlPz9IV407KX=w240-h480-rw', score: '69.8/100', followers: '38K', growth: '+0.05%', lastActivity: '4 days ago', activity: '1 Video / month', engRate: '0.9%', avgEng: '350', avgViews: '1.2K', posting: 'local promos' },
        { platform: 'App', handle: 'Livry', avatar: 'https://media.licdn.com/dms/image/v2/C4D0BAQFexnvwu4etlg/company-logo_200_200/company-logo_200_200/0/1630518889539?e=1763596800&v=beta&t=PRidNFjYjeSVskPTem8I_JWZfEx3Xe1LdfktacScUfI', score: '62.0/100', followers: '18K', growth: '-0.01%', lastActivity: '2 weeks ago', activity: '0 Videos / month', engRate: '0.3%', avgEng: '60', avgViews: '500', posting: 'minimal presence' }
    ],
    Facebook: [
        { platform: 'App', handle: 'JumiaFood', avatar: '/jumia.png', score: '78.5/100', followers: '600K', growth: '+0.12%', lastActivity: 'Yesterday', activity: '10 Posts / month', engRate: '1.1%', avgEng: '6K', avgViews: '30K', posting: 'product posts' },
        { platform: 'App', handle: 'CareemNow', avatar: '/careem.png', score: '75.0/100', followers: '220K', growth: '+0.04%', lastActivity: '3 days ago', activity: '6 Posts / month', engRate: '0.9%', avgEng: '2K', avgViews: '12K', posting: 'promotional posts' },
        { platform: 'App', handle: 'Yassir', avatar: '/yassir.png', score: '70.2/100', followers: '45K', growth: '+0.03%', lastActivity: '1 week ago', activity: '4 Posts / month', engRate: '0.7%', avgEng: '300', avgViews: '2.5K', posting: 'local stories' },
        { platform: 'App', handle: 'Koul', avatar: 'https://play-lh.googleusercontent.com/iT7fPfobm4I1fv56GEvWxdgx41FX24dYQaP37XWE82-4hkSQPHt3mf0JPlPz9IV407KX=w240-h480-rw', score: '68.9/100', followers: '30K', growth: '+0.02%', lastActivity: '2 days ago', activity: '3 Posts / month', engRate: '0.6%', avgEng: '180', avgViews: '1.1K', posting: 'regional updates' },
        { platform: 'App', handle: 'Livry', avatar: 'https://media.licdn.com/dms/image/v2/C4D0BAQFexnvwu4etlg/company-logo_200_200/company-logo_200_200/0/1630518889539?e=1763596800&v=beta&t=PRidNFjYjeSVskPTem8I_JWZfEx3Xe1LdfktacScUfI', score: '60.5/100', followers: '12K', growth: '-0.03%', lastActivity: '10 days ago', activity: '1 Post / month', engRate: '0.2%', avgEng: '30', avgViews: '200', posting: 'low activity' }
    ],
    LinkedIn: [
        { platform: 'App', handle: 'CareemNow', avatar: '/careem.png', score: '68.0/100', followers: '55K', growth: '+0.02%', lastActivity: '1 week ago', activity: '2 Posts / month', engRate: '0.4%', avgEng: '200', avgViews: '1K', posting: 'company updates' }
    ]
}

type CompetitiveTableProps = {
    onRowsChange?: (rows: Competitor[]) => void
}

export default function CompetitiveTable({ onRowsChange }: CompetitiveTableProps): React.ReactElement {
    const [selectedPlatform, setSelectedPlatform] = useState<string>('Instagram')
    const [rows, setRows] = useState<Competitor[]>([])
    // global text filter for the table
    const [filterText, setFilterText] = useState<string>('')

    const [open, setOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement | null>(null)
    const dropdownButtonRef = useRef<HTMLButtonElement | null>(null)
    const menuRef = useRef<HTMLUListElement | null>(null)
    const [menuPos, setMenuPos] = useState<{ top: number; left: number } | null>(null)

    useEffect(() => {
        function onDocClick(e: MouseEvent) {
            const target = e.target as Node
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

    useEffect(() => {
        const base = platformDatasets[selectedPlatform] ?? platformDatasets.Instagram
        const competitors = [...base]
        const glovo: Competitor = { platform: 'App', handle: 'Glovo', avatar: '/glovo.png', score: '89.4/100', followers: '390K', growth: '+0.75%', lastActivity: 'Today', activity: '14 Orders / month', engRate: '3.0%', avgEng: '11.7K', avgViews: '65K', posting: 'daily promos at 7PM' }

        const idx = Math.floor(Math.random() * (competitors.length + 1))
        competitors.splice(idx, 0, glovo)
        setRows(competitors)
        if (onRowsChange) onRowsChange(competitors)
    }, [selectedPlatform])

    const options = ['Instagram', 'TikTok', 'X', 'YouTube', 'Facebook', 'LinkedIn']

    const columns: TableColumn<Competitor>[] = useMemo(() => {
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
                                setOpen((o) => !o)
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
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/X_logo_2023_original.svg" alt="X logo" className="w-4 h-4 object-contain" />
                                        )
                                    if (p.includes('youtube')) return <SiYoutube className="text-red-500 w-4 h-4" />
                                    if (p.includes('facebook'))
                                        return (
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook logo" className="w-4 h-4 object-contain" />
                                        )
                                    if (p.includes('linkedin'))
                                        return (
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg" alt="LinkedIn logo" className="w-4 h-4 object-contain" />
                                        )
                                    return null
                                })()}
                            </span>
                            <span className="flex-1 text-sm font-medium text-gray-600 truncate text-left">{selectedPlatform}</span>
                            <FiChevronDown className="w-4 h-4 text-gray-400" />
                        </button>

                        {/* portal menu */}
                    </div>
                ),
                cell: (row) => (
                    <div className="flex items-center gap-3 py-2">
                        <img src={row.avatar} alt={row.handle} className="w-10 h-10 rounded-full object-cover" />
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
            { name: 'Followers', selector: (row) => row.followers, sortable: true, width: '120px', sortFunction: (a, b) => parseFollowers(a.followers) - parseFollowers(b.followers) },
            { name: 'Growth (30 days)', selector: (row) => row.growth, sortable: true, width: '140px', cell: (row) => <div className="text-green-500">{row.growth}</div> },
            { name: 'Last Activity', selector: (row) => row.lastActivity, sortable: true, width: '120px' },
            { name: 'Activity (30 days)', selector: (row) => row.activity, sortable: false, width: '160px' },
            { name: 'Eng. Rate (30 days)', selector: (row) => row.engRate, sortable: true, width: '140px', cell: (row) => <div className="text-green-500">{row.engRate}</div> },
            { name: 'Avg. Eng. (30 days)', selector: (row) => row.avgEng, sortable: false, width: '140px', cell: (row) => <div className="text-green-600">{row.avgEng}</div> },
            { name: 'Avg Views (30 days)', selector: (row) => row.avgViews, sortable: false, width: '140px', cell: (row) => <div className="text-green-600">{row.avgViews}</div> },
            { name: 'Posting Habits', selector: (row) => row.posting, sortable: false, width: '180px' }
        ]
    }, [selectedPlatform, open])

    const customStyles = useMemo(() => ({ rows: { style: { minHeight: '10px' } }, headCells: { style: { backgroundColor: 'transparent', paddingLeft: '16px', paddingRight: '16px', fontWeight: 600, color: '#4B5563' } } }), [])

    const menu = open && menuPos ? (
        createPortal(
            <ul ref={menuRef} className="bg-white border rounded shadow-lg p-2 text-sm" style={{ position: 'absolute', top: menuPos.top + 'px', left: menuPos.left + 'px', zIndex: 9999, minWidth: 160 }} role="listbox">
                {options.map((opt) => (
                    <li
                        key={opt}
                        onClick={() => { setSelectedPlatform(opt); setOpen(false); setMenuPos(null) }}
                        className="px-3 py-1 hover:bg-gray-100 rounded cursor-pointer flex items-center gap-2"
                        role="option"
                        aria-selected={selectedPlatform === opt}
                    >
                        <span className="inline-flex items-center justify-center w-5 h-5">
                            {(() => {
                                const p = opt.toLowerCase()
                                if (p.includes('instagram')) return <SiInstagram className="text-pink-500 w-4 h-4" />
                                if (p.includes('tiktok')) return <SiTiktok className="text-black w-4 h-4" />
                                if (p === 'x' || p.includes('twitter')) return <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/X_logo_2023_original.svg" alt="X logo" className="w-4 h-4 object-contain" />
                                if (p.includes('youtube')) return <SiYoutube className="text-red-500 w-4 h-4" />
                                if (p.includes('facebook')) return <FaFacebook className="w-4 h-4 text-blue-600" />
                                if (p.includes('linkedin')) return <FaLinkedin className="w-4 h-4 text-blue-700" />
                                return null
                            })()}
                        </span>
                        <span className="ml-2">{opt}</span>
                    </li>
                ))}
            </ul>,
            document.body
        )
    ) : null

    const aiSentences = useMemo(() => {
        if (!rows || rows.length === 0) return []
        const topFollower = rows.reduce((a, b) => (parseFollowers(a.followers) || 0) > (parseFollowers(b.followers) || 0) ? a : b)
        const fastestGrowth = rows.reduce((a, b) => (parseFloat(a.growth.replace('%', '')) || -999) > (parseFloat(b.growth.replace('%', '')) || -999) ? a : b)
        return [
            `${topFollower.handle} has the largest audience (~${topFollower.followers}) on ${selectedPlatform}.`,
            `${fastestGrowth.handle} shows the strongest short-term growth (${fastestGrowth.growth}).`
        ]
    }, [rows, selectedPlatform])

    // client-side filtered rows (global search)
    const displayedRows = useMemo(() => {
        if (!filterText) return rows
        const q = filterText.trim().toLowerCase()
        return rows.filter((r) => {
            return (
                r.handle.toLowerCase().includes(q) ||
                r.posting.toLowerCase().includes(q) ||
                r.followers.toLowerCase().includes(q) ||
                r.score.toLowerCase().includes(q) ||
                r.activity.toLowerCase().includes(q)
            )
        })
    }, [rows, filterText])

    return (
        <div className="w-full">
            <div className="bg-white rounded shadow-sm">
                <DataTable columns={columns} data={displayedRows} customStyles={customStyles} noHeader dense pagination />
            </div>
            {menu}
            <div className="mt-4">
                <AiInsightSection sentences={aiSentences} />
            </div>
        </div>
    )
}


