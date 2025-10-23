"use client";

import React from 'react';

export default function ProfilePhoto({ src, alt, size = 80 }: { src?: string; alt?: string; size?: number }) {
    return (
        <div style={{ width: size, height: size }} className="rounded-full overflow-hidden bg-gray-100">
            {src ? <img src={src} alt={alt || 'avatar'} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-400">Avatar</div>}
        </div>
    );
}
