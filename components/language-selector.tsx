"use client";

import React from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

type Props = {
    className?: string;
};

export default function LanguageSelector({ className }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const locales = ["en", "fr", "ar"];

    const currentLocale = (() => {
        const segs = (pathname || '/').split('/').filter(Boolean);
        if (segs.length > 0 && locales.includes(segs[0])) return segs[0];
        return 'en';
    })();

    const changeLocale = (locale: string) => {
        const segs = (pathname || '/').split('/').filter(Boolean);
        if (segs.length > 0 && locales.includes(segs[0])) segs[0] = locale;
        else segs.unshift(locale);
        const newPath = '/' + segs.join('/');
        const search = searchParams?.toString();
        router.push(newPath + (search ? `?${search}` : ''));
    };

    return (
        <div className={`flex items-center gap-2 ${className || ''}`}>
            <Label className="text-sm">Language</Label>
            <Select value={currentLocale} onValueChange={(v) => changeLocale(v)}>
                <SelectTrigger className="w-[140px]">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="ar">العربية</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
