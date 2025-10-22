import Sidebar from "@/components/sidebar";
import DashboardContent from "@/components/dashboard-content";

export default function LangIndex({ params }: { params: { lang: string } }) {
    // simply render the same dashboard but the layout above will provide locale/messages
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <DashboardContent />
        </div>
    );
}

export function generateStaticParams() {
    return [
        { lang: 'en' },
        { lang: 'fr' },
        { lang: 'ar' }
    ];
}
