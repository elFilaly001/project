import '../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'Modern dashboard application',
};

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: { lang: string } }) {
    const locale = params.lang;
    let messages = {};
    try {
        // dynamic import of our translation files
        // path is relative to this file: ../../translation/${locale}.json
        messages = (await import(`../../translation/${locale}.json`)).default;
    } catch (e) {
        messages = (await import(`../../translation/en.json`)).default;
    }

    const user = {
        name: 'Zakaria',
        email: 'z.mouchtati@gmail.com',
    };

    return (
        <html lang={locale}>
            <body className={inter.className}>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <div className="min-h-screen flex ">
                        <Sidebar />
                        <div className="flex-1 flex flex-col">
                            <Header user={user} />
                            <div className="mt-4 flex-1">
                                <main>{children}</main>
                            </div>
                        </div>
                    </div>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
