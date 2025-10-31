import React from "react";
import DashboardClient from "../../../components/pages/DashboardClient";
import Loader from '@/components/Loader';

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
        <React.Suspense fallback={<Loader />}>
            <DashboardClient />
        </React.Suspense>
    );
}
