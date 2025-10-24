import '../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import LayoutContent from '@/components/layout-content';
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
                    <LayoutContent user={user}>
                        {children}
                    </LayoutContent>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}

// required for `output: 'export'` so Next can prerender all language routes
export function generateStaticParams() {
    return [
        { lang: 'en' },
        { lang: 'fr' },
        { lang: 'ar' },
    ];
}
