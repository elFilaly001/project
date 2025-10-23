import '../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'Modern dashboard application',
};

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }): Promise<React.ReactNode> {
    const resolvedParams = await params;
    const locale = resolvedParams.lang;
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
        <html lang={locale} className="overflow-x-hidden">
            <body className={`${inter.className} overflow-x-hidden`}>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <div className="min-h-screen">
                        <Sidebar />
                        {/* Reserve space for fixed sidebar on large screens; no left padding on small screens */}
                        <div className="flex-1 flex flex-col pl-0 lg:pl-[264px]">
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
