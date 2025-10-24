"use client";

import React from 'react';

export default function BannerWithAvatar({
    bannerSrc,
    avatarSrc,
    alt = 'avatar',
    bannerSize,
    avatarSize = 112,
    badge,
}: {
    bannerSrc?: string;
    avatarSrc?: string;
    alt?: string;
    // bannerSize optional: if provided (number) the component uses fixed px size,
    // otherwise it fills the parent (w-full + aspect-square)
    bannerSize?: number;
    avatarSize?: number;
    badge?: React.ReactNode;
}) {
    const padding = 12; // spacing from the banner edge for the avatar

    const wrapperStyle = bannerSize ? { width: bannerSize, height: bannerSize } : undefined;
    const wrapperClasses = bannerSize ? 'relative inline-block' : 'relative w-full aspect-square';

    return (
        <div className={wrapperClasses} style={wrapperStyle} aria-hidden={false}>
            {/* Banner (square) */}
            <div className="w-full h-full overflow-hidden rounded-md bg-gray-100">
                {bannerSrc ? (
                    <img src={bannerSrc} alt="banner" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">Banner</div>
                )}
            </div>

            {/* Avatar positioned at top-left inside the banner */}
            <div
                className="absolute"
                style={{ top: padding, left: padding, width: avatarSize, height: avatarSize }}
            >
                <div
                    className="rounded-full overflow-hidden border-4 border-white shadow"
                    style={{ width: '100%', height: '100%' }}
                >
                    {avatarSrc ? (
                        <img src={avatarSrc} alt={alt} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">Avatar</div>
                    )}
                </div>

                {/* optional badge on avatar (bottom-right) */}
                {badge && (
                    <span
                        className="absolute inline-flex items-center justify-center rounded-full bg-green-500 text-white text-xs"
                        style={{ width: 28, height: 28, right: 3, bottom: 4, border: '2px solid white' }}
                    >
                        {badge}
                    </span>
                )}
            </div>
        </div>
    );
}
