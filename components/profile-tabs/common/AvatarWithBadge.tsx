"use client";

import React from 'react';

export default function AvatarWithBadge({ src, alt = 'avatar', size = 112, badge }: { src?: string; alt?: string; size?: number; badge?: React.ReactNode }) {
    return (
        <div className="relative inline-flex">
            <img
                src={src || '/logo-intalks.png'}
                alt={alt}
                width={size}
                height={size}
                className="rounded-full object-cover"
                style={{ width: size, height: size }}
            />
            {badge && (
                <span className="absolute bottom-0 right-0 inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-500 text-white text-xs border-2 border-white">
                    {badge}
                </span>
            )}
        </div>
    );
}
