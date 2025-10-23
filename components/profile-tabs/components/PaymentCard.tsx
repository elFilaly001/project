"use client";

import React from 'react';
import { Button } from '@/components/ui/button';

export default function PaymentCard({ card, onRemove }: { card: { brand: string; last4: string; exp: string }, onRemove?: () => void }) {
    return (
        <div className="flex items-center justify-between border rounded-md p-3">
            <div className="flex items-center gap-3">
                <div className="w-12 h-8 bg-gray-100 flex items-center justify-center rounded text-sm font-medium">{card.brand}</div>
                <div>
                    <div className="text-sm">**** **** **** {card.last4}</div>
                    <div className="text-xs text-gray-500">Exp {card.exp}</div>
                </div>
            </div>
            <div className="flex items-center gap-2">
                {onRemove && <Button variant="ghost" size="sm" onClick={onRemove}>Remove</Button>}
            </div>
        </div>
    );
}
