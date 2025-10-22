"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ProfileOverview from "../profile-overview";
import TabBar from "../tab-bar";

export default function ProfileClient() {
    const t = useTranslations();

    // Placeholder user data; wire to real data later
    const user = {
        name: t("sidebar.user_name"),
        email: t("sidebar.user_email"),
        initials: t("sidebar.avatar_initials"),
    };

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
