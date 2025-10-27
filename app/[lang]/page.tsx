import ProfileClient from "@/components/pages/DashboardClient";

// For static export (output: 'export') Next.js requires generateStaticParams
// for dynamic segments so all routes are pre-rendered. Return the supported
// locales here. We keep them inline to avoid importing during build issues.
export function generateStaticParams() {
    return [
        { lang: 'en' },
        { lang: 'fr' },
        { lang: 'ar' },
    ];
}

export default function LangIndex({ params }: { params: { lang: string } }) {
    return (
        <ProfileClient />
    );
}
