import SupportPage from '@/components/support-page';

export default function Page({ params }: { params: { lang?: string } }) {
	const lang = (params && params.lang) || 'en';
	return <SupportPage lang={lang} />;
}

