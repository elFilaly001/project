"use client";

import React, { useState } from "react";
import Link from "next/link";
import DataTable, { TableColumn } from "react-data-table-component";
import { Button } from "../ui/button";

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

    // Static competitor data (replaces remote fetch)
    const competitors: Account[] = [
        {
            id: "jumia-food",
            name: "Jumia Food",
            picture: "https://logo.clearbit.com/jumia.com?size=128",
            title: "Online Food Delivery",
            description: "One of the largest food delivery platforms in the region.",
            networks: [
                { network: "facebook", followers: "120000", score: 88 },
                { network: "instagram", followers: "82000", score: 78 },
                { network: "twitter", followers: "15000", score: 64 },
            ],
            categories: [{ name: "Food Delivery" }, { name: "E-commerce" }],
        } as unknown as Account,
        {
            id: "yassir",
            name: "Yassir",
            picture: "https://cdn.aptoide.com/imgs/4/6/4/4647976c17c3b7518223d660f99d16c0_icon.jpg?w=128",
            title: "Mobility & Delivery Super App",
            description: "Yassir provides ride-hailing, delivery and financial services across several countries.",
            networks: [
                { network: "facebook", followers: "30000", score: 74 },
                { network: "instagram", followers: "22000", score: 70 },
            ],
            categories: [{ name: "Mobility" }, { name: "Delivery" }],
        } as unknown as Account,
        {
            id: "kool",
            name: "Kool",
            picture: "https://play-lh.googleusercontent.com/iT7fPfobm4I1fv56GEvWxdgx41FX24dYQaP37XWE82-4hkSQPHt3mf0JPlPz9IV407KX=w480-h960-rw",
            title: "Fast city deliveries",
            description: "On-demand deliveries and courier services.",
            networks: [
                { network: "instagram", followers: "18000", score: 69 },
                { network: "facebook", followers: "11000", score: 62 },
            ],
            categories: [{ name: "Courier" }, { name: "Delivery" }],
        } as unknown as Account,
    ];

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
        const map: Record<string, string> = {
            facebook: "https://cdn.simpleicons.org/facebook/1877F2",
            instagram: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
            twitter: "https://logos-world.net/wp-content/uploads/2023/08/X-Logo.png",
            youtube: "https://cdn.simpleicons.org/youtube/FF0000",
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
            selector: (row) => row.title || '',
            cell(row) {
                return (
                    <div className="flex flex-wrap gap-2">
                        {row.categories.map((category) => (
                            <span
                                key={category.name}
                                className="inline-flex items-center text-xs px-3 py-1 rounded-full bg-gradient-to-r from-[#4ec6fb] to-[#ff56e3] text-white"
                            >
                                {category.name}
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
            cell(row) {
                return (
                    <div className={`flex py-2 flex-col gap-2`}>
                        {row.networks?.slice(0, 4).map((value, i) => (
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

    return (
        <div className="dark-datatable w-full max-w-full pl-6 lg:pl-8 pr-4">
            {/* Sidebar-friendly container: keep padding and allow horizontal scroll inside content area */}
            <div className="bg-transparent rounded-md overflow-x-auto">
                <div className="min-w-[320px]">
                    <DataTable
                        columns={columns}
                        data={competitors}
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
