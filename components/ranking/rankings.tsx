"use client";

import React, { useState } from "react";
import Link from "next/link";
import DataTable, { TableColumn } from "react-data-table-component";
import { Button } from "../ui/button";
import { staticInfluencers } from "../Brandwatch/cercle";

// Local Account type (keeps this component self-contained and avoids
// depending on a missing '@/app/types' path). Matches the fields used
// in this component.
interface NetworkInfo {
    network: string;
    followers: number | string;
    score?: number | string;
}

interface Category {
    name: string;
}

interface Account {
    id: string | number;
    name: string;
    title?: string;
    description?: string;
    picture?: string;
    categories: Category[];
    networks?: NetworkInfo[];
    countryCode?: string;
}

interface Pagination {
    data: Account[];
    total: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
    nextPage: number;
    prevPage: number;
}

const DataTableInfluencersRanking = () => {
    const [perPage, setPerPage] = useState<number>(10);
    const [page, setPage] = useState<number>(1);
    const [nicheFilter, setNicheFilter] = useState<string>("");

    // generate top-N random companies for demo/testing
    const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

    // pick 4 or 5 random indices (out of the first 10) that will have TikTok
    const tiktokIndices = React.useMemo(() => {
        const total = 10;
        const pickCount = randInt(4, 5);
        const set = new Set<number>();
        while (set.size < pickCount) {
            set.add(Math.floor(Math.random() * total));
        }
        return set;
    }, []);

    const competitors: Account[] = React.useMemo(() =>
        staticInfluencers.slice(0, 10).map((s: any, i: number) => {
            const baseNetworks: NetworkInfo[] = [
                { network: "facebook", followers: randInt(1000, 500000), score: randInt(40, 99) },
                { network: "instagram", followers: randInt(1000, 500000), score: randInt(40, 99) },
                { network: "x", followers: randInt(1000, 500000), score: randInt(40, 99) },
                { network: "youtube", followers: randInt(1000, 500000), score: randInt(40, 99) },
            ];

            // only add tiktok for the selected indices
            if (tiktokIndices.has(i)) {
                baseNetworks.push({ network: "tiktok", followers: randInt(1000, 500000), score: randInt(40, 99) });
            }

                return ({
                id: s.id ?? `company-${i}`,
                name: s.name ?? s.handle ?? `Company ${i + 1}`,
                title: "",
                description: s.handle ?? "",
                picture: s.profilePic,
                    categories: (s.categories && s.categories.length) ? s.categories : [{ name: "Company" }],
                networks: baseNetworks,
            } as Account);
        }), [staticInfluencers, tiktokIndices]
    );
    // simple helpers
    const formatNumber = (n?: number | string) => {
        if (n == null) return "0";
        const num = Number(n);
        if (Number.isNaN(num)) return String(n);
        if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
        if (num >= 1000) return (num / 1000).toFixed(1) + "K";
        return String(num);
    };

    const socialIcon = (network: string) => {
        // use simpleicons CDN which returns colored SVGs when color param is provided
        // prefer canonical names: facebook, instagram, x (new twitter), twitter, youtube
        const map: Record<string, string> = {
            facebook: "https://cdn.simpleicons.org/facebook/1877F2",
            instagram: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
            twitter: "https://logos-world.net/wp-content/uploads/2023/08/X-Logo.png",
            youtube: "https://cdn.simpleicons.org/youtube/FF0000",
            tiktok: "https://cdn.simpleicons.org/tiktok/000000",
        };
        return map[network.toLowerCase()] || `https://cdn.simpleicons.org/${network}`;
    };

    const columns: TableColumn<Account>[] = [
        {
            name: "Ranking",
            sortable: true,
            id: "rank",
            width: "100px",
            selector: (row) => row.id,
            cell(row, rowIndex) {
                // show ranking index starting at 1
                const idx = rowIndex + 1;
                return (
                    <div className="flex justify-center text-whiteColor items-center gap-2">
                        {idx <= 3 ? (
                            <div className="flex items-center ">
                                {/* <img width={28} height={28} src={`https://cdn.simpleicons.org/award/FFD700`} alt={`rank-${idx}`} /> */}
                                <p className="text-lg"># {idx}</p>
                            </div>
                        ) : (
                            <p className="text-lg"># {idx}</p>
                        )}
                    </div>
                );
            },
        },
        {
            name: "Creator",
            sortable: true,
            id: "name",
            selector: (row) => row.name,
            minWidth: "390px",
            cell: (row) => (
                <Link href={`/report/${row.id}`} style={{ textDecoration: "none" }}>
                    <div className="flex items-center py-2 gap-3">
                        <div
                            className="rounded-full h-[50px] w-[50px] flex items-center justify-center overflow-hidden"
                            style={{
                                background: "linear-gradient(45deg, #4ec6fb, #ff56e3)",
                            }}
                        >
                            <img
                                src={row.picture}
                                alt={row.name}
                                className="w-[50px] h-[50px] object-contain rounded-full"
                                style={{ objectPosition: "center" }}
                            />
                        </div>
                        <div>
                            <p className="text-sm font-medium">{row.name}</p>
                            <p className="text-xs capitalize text-muted-foreground">{row.title}</p>
                            <p className="text-xs text-gray-400 max-w-[40ch]">
                                {row.description?.substring(0, 100)}{row.description && row.description.length > 100 ? ' ...' : ''}
                            </p>
                        </div>
                    </div>
                </Link>
            ),
        },
        {
            name: "Score",
            sortable: true,
            id: "growth",
            // selector returns numeric score used for sorting (prefer the primary network score or 0)
            selector: (row: Account) => {
                const s = row.networks?.[0]?.score ?? 0
                const n = Number(s)
                return Number.isNaN(n) ? 0 : n
            },
            sortFunction: (a: Account, b: Account) => {
                const an = Number(a.networks?.[0]?.score ?? 0) || 0
                const bn = Number(b.networks?.[0]?.score ?? 0) || 0
                return an - bn
            },
            cell(row) {
                const score = row.networks?.[0]?.score ?? 0;
                return (
                    <p className="text-xs bg-green-500 text-white px-3 py-1 rounded-md">
                        {Number(score).toFixed(0)} / 100
                    </p>
                );
            },
        },
        {
            name: "Niche",
            sortable: true,
            id: "niche",
            // selector returns a joined string so the table has a stable value,
            // but we provide a custom sortFunction that orders by how "niche"
            // the account is (more category parts = more niche) and then
            // alphabetically by the joined category names.
            selector: (row) => row.categories.map((c) => c.name).join(" ") || '',
            sortFunction: (a: Account, b: Account) => {
                const partsA = a.categories.flatMap((category) =>
                    String(category.name).split("&").map((p) => p.trim()).filter(Boolean)
                );
                const partsB = b.categories.flatMap((category) =>
                    String(category.name).split("&").map((p) => p.trim()).filter(Boolean)
                );

                // More parts => considered more niche; sort descending by count
                if (partsA.length !== partsB.length) return partsB.length - partsA.length;

                // Fallback: alphabetical by joined names
                const nameA = partsA.join(" ").toLowerCase();
                const nameB = partsB.join(" ").toLowerCase();
                return nameA.localeCompare(nameB);
            },
            cell(row) {
                const parts = row.categories.flatMap((category) =>
                    String(category.name).split("&").map((p) => p.trim()).filter(Boolean)
                );

                return (
                    <div className="flex flex-wrap gap-2">
                        {parts.map((name, idx) => (
                            <span
                                key={`${row.id}-cat-${idx}-${name}`}
                                className="inline-flex items-center text-xs px-3 py-1 rounded-full bg-gradient-to-r from-[#4ec6fb] to-[#ff56e3] text-white"
                            >
                                {name}
                            </span>
                        ))}
                    </div>
                );
            },
        },
        {
            name: "Country",
            sortable: true,
            id: "country",
            cell(row) {
                return (
                    <div className="flex justify-center flex-col items-center">
                        <img src={`https://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Morocco.svg`} alt="country" height={22} width={22} />
                        <p className="capitalize">Morocco</p>
                    </div>
                );
            },
        },
        {
            name: "Followers",
            sortable: true,
            id: "followers",
            // selector returns a numeric value used for sorting: the largest network follower count (numeric)
            selector: (row: Account) => {
                const networks = row.networks ?? []
                return networks.reduce((max, n) => {
                    const val = Number(n.followers) || 0
                    return Math.max(max, val)
                }, 0)
            },
            // explicit sort function as fallback (compares numeric values)
            sortFunction: (a: Account, b: Account) => {
                const an = (a.networks ?? []).reduce((m, n) => Math.max(m, Number(n.followers) || 0), 0)
                const bn = (b.networks ?? []).reduce((m, n) => Math.max(m, Number(n.followers) || 0), 0)
                return an - bn
            },
            cell(row) {
                return (
                    <div className={`flex py-2 flex-col gap-2`}>
                        {row.networks?.slice(0, 5).map((value, i) => (
                            <div className="flex gap-2 items-center" key={i}>
                                <img
                                    width={18}
                                    height={18}
                                    src={socialIcon(value.network)}
                                    alt={value.network}
                                    className="rounded-full"
                                />
                                <span className="text-sm">{formatNumber(Number(value.followers))}</span>
                                <span className="text-[11px] text-gray-400">· {Number(value.score).toFixed(0)}</span>
                            </div>
                        ))}
                    </div>
                );
            },
        },
    ];

    // Filter competitors by niche text (case-insensitive). Checks each
    // category part (split on '&') and returns rows that include the query.
    const filteredCompetitors = React.useMemo(() => {
        const q = nicheFilter.trim().toLowerCase();
        if (!q) return competitors;
        return competitors.filter((row) => {
            const parts = row.categories.flatMap((category) =>
                String(category.name).split("&").map((p) => p.trim()).filter(Boolean)
            );
            return parts.some((p) => p.toLowerCase().includes(q));
        });
    }, [competitors, nicheFilter]);

    return (
        <div className="dark-datatable w-full max-w-full pl-6 lg:pl-8 pr-4">
            {/* Sidebar-friendly container: keep padding and allow horizontal scroll inside content area */}
            <div className="bg-transparent rounded-md overflow-x-auto">
                    <div className="min-w-[320px]">
                    <DataTable
                        columns={columns}
                        data={filteredCompetitors}
                        pagination
                        paginationPerPage={perPage}
                        paginationDefaultPage={page}
                        onChangeRowsPerPage={(newPerPage) => setPerPage(newPerPage)}
                        onChangePage={(newPage) => setPage(newPage)}
                        responsive
                        highlightOnHover
                        pointerOnHover
                    />
                </div>
            </div>
        </div>
    );
};

export default DataTableInfluencersRanking;
