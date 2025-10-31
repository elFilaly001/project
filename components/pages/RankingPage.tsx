"use client";

import React, { useEffect, useState } from 'react';
import Rankings from '../ranking/rankings';
import RankingTicker from '../ranking/RankingTicker';
import Loader from '../Loader';

export default function RankingPage() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const id = setTimeout(() => setLoading(false), 600);
        return () => clearTimeout(id);
    }, []);

    if (loading) return <Loader size={120} />;

    return (
        <div>
            {/* ticker / slider above the rankings table */}
            <RankingTicker />
            <Rankings />
        </div>
    );
}