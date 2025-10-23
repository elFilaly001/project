import ProfileClient from "@/components/pages/ProfileClient";
    
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
