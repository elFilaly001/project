import React from "react";
import DashboardClient from "../../../components/pages/DashboardClient";

type Params = { lang: string };

export async function generateStaticParams(): Promise<Params[]> {
    // Return supported locales for static export. Keep this in sync with translation files.
    return [
        { lang: "en" },
        { lang: "fr" },
        { lang: "ar" },
    ];
}

export default function DashboardPage({ params }: { params: Params }) {
    return (
        <React.Suspense
            fallback={
                <div className="min-h-[200px] flex items-center justify-center">Loading...</div>
            }
        >
            <DashboardClient />
        </React.Suspense>
    );
}
