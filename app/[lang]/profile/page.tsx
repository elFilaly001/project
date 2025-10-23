import React from "react";
import ProfileClient from "../../../components/pages/ProfileClient";

type Params = { lang: string };

export async function generateStaticParams(): Promise<Params[]> {
    // Return supported locales for static export. Keep this in sync with translation files.
    return [
        { lang: "en" },
        { lang: "fr" },
        { lang: "ar" },
    ];
}

export default function ProfilePage({ params }: { params: Params }) {
    return <ProfileClient />;
}
