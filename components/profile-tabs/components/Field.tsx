"use client";

import React from 'react';

export default function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div>
            <label className="text-sm font-medium block mb-1">{label}</label>
            <div>{children}</div>
        </div>
    );
}
