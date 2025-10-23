import ProfileClient from "@/components/pages/DashboardClient";

export default function LangIndex({ params }: { params: { lang: string } }) {
    return (
        <ProfileClient />
    );
}

export function generateStaticParams() {
    return [
        { lang: 'en' },
        { lang: 'fr' },
        { lang: 'ar' }
    ];
}
