"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import ProfileOverview from "../profile-overview";
import TabBar from "../tab-bar";
import Loader from "../Loader";

export default function DashboardClient() {
    const t = useTranslations();
    const [loading, setLoading] = useState(true);

    // Simulate a short client-side load so the Loader is visible.
    // Replace this with real loading state from data fetching when available.
    useEffect(() => {
        const id = setTimeout(() => setLoading(false), 600);
        return () => clearTimeout(id);
    }, []);

    // Placeholder user data; wire to real data later
    const user = {
        name: t("sidebar.user_name"),
        email: t("sidebar.user_email"),
        initials: t("sidebar.avatar_initials"),
    };

    if (loading) return <Loader size={120} />;

    return (
        <div className="flex flex-col gap-4">
            <ProfileOverview
                name={user.name}
                subtitle={user.email}
            />
            <TabBar />
        </div>
    );
}
