"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function ProfileClient() {
    const t = useTranslations();

    // Placeholder user data; wire to real data later
    const user = {
        name: t("sidebar.user_name"),
        email: t("sidebar.user_email"),
        initials: t("sidebar.avatar_initials"),
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-semibold mb-4">{t("profile.title")}</h1>

            <div className="flex items-center gap-4 mb-6">
                <Avatar className="w-16 h-16">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-gradient-to-r from-[#F02CB9] to-[#35B9F4] text-white text-lg">
                        {user.initials}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <div className="font-medium text-lg">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                </div>
            </div>

            <section className="space-y-3">
                <div className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                        <div className="text-sm text-gray-500">{t("profile.language_label")}</div>
                        <div className="font-medium">{t("profile.language")}</div>
                    </div>
                    <Button variant="outline">{t("profile.change")}</Button>
                </div>

                <div className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                        <div className="text-sm text-gray-500">{t("profile.email_label")}</div>
                        <div className="font-medium">{user.email}</div>
                    </div>
                    <Button variant="outline">{t("profile.edit")}</Button>
                </div>
            </section>
        </div>
    );
}
