"use client";
import React from "react";

// Minimal SearchBrand component so it can be imported by `cercle.tsx`.
// Replace or expand this with the real implementation when available.
const SearchBrand = () => {
        return (
            <div className="mt-3">
                <input
                    aria-label="Search brand"
                    placeholder="Search brand"
                    className="px-3 py-2 rounded bg-white/10 text-black w-full placeholder-gray-500"
                />
            </div>
        );
};

export default SearchBrand;
