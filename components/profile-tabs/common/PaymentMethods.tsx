"use client";

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function PaymentMethods({ initial = [] }: { initial?: Array<{ brand: string; last4: string; exp: string }> }) {
    const [cards, setCards] = useState(initial);
    const [open, setOpen] = useState(false);
    const [brand, setBrand] = useState('');
    const [number, setNumber] = useState('');
    const [exp, setExp] = useState('');
    const [cvv, setCvv] = useState('');
    const [cvvError, setCvvError] = useState('');

    function detectCardBrand(digits: string) {
        if (!digits) return '';
        // Visa starts with 4
        if (/^4/.test(digits)) return 'Visa';
        // Mastercard: 51-55 or 2221-2720
        if (/^(5[1-5])/.test(digits) || /^(22[2-9]|2[3-6]\d|27[01]|2720)/.test(digits)) return 'Mastercard';
        // American Express: 34 or 37
        if (/^3[47]/.test(digits)) return 'Amex';
        return 'Unknown';
    }

    function addCard() {
        const digits = number.replace(/\D/g, '');
        const last4 = digits.slice(-4);
        const cardBrand = detectCardBrand(digits) || 'Unknown';

        // Basic CVV validation before proceeding (don't store CVV)
        const requiredCvv = cardBrand === 'Amex' ? 4 : 3;
        if (cvv.replace(/\D/g, '').length !== requiredCvv) {
            setCvvError(`CVC must be ${requiredCvv} digits`);
            return;
        }

        setCards((s) => [...s, { brand: cardBrand, last4, exp }]);
        // Clear sensitive input locally; we do NOT persist CVV
        setNumber('');
        setExp('');
        setCvv('');
        setCvvError('');
        setOpen(false);
    }

    useEffect(() => {
        const digits = number.replace(/\D/g, '');
        setBrand(detectCardBrand(digits));
    }, [number]);

    // Trim cvv to the required length when brand changes
    useEffect(() => {
        const required = brand === 'Amex' ? 4 : 3;
        if (cvv.length > required) {
            setCvv(cvv.slice(0, required));
        }
        setCvvError('');
    }, [brand]);

    return (
        <div>
            <div className="space-y-2">
                {cards.map((c) => (
                    <div key={c.last4} className="flex items-center justify-between border rounded-md p-2">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-6 bg-gray-100 flex items-center justify-center rounded text-sm">{c.brand}</div>
                            <div className="text-sm">**** **** **** {c.last4}</div>
                        </div>
                        <div className="text-sm text-gray-600">Exp {c.exp}</div>
                    </div>
                ))}
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="gradient" className="mt-3">Add new payment method</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add payment method</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-1 gap-3 mt-2">
                        <label className="text-sm flex items-center justify-between">
                            <span>Card number</span>
                            <span className="text-xs text-gray-600">{brand ? brand : 'Detecting...'}</span>
                        </label>
                        <Input value={number} onChange={(e) => {
                            // keep only digits, format in groups of 4 for readability
                            const raw = e.target.value.replace(/\D/g, '');
                            const formatted = raw.replace(/(.{4})/g, '$1 ').trim();
                            setNumber(formatted);
                        }} />

                        <label className="text-sm">Expiry</label>
                        <Input value={exp} onChange={(e) => setExp(e.target.value)} placeholder="MM/YY" />

                        <label className="text-sm">CVC / CVV</label>
                        <Input
                            type="password"
                            inputMode="numeric"
                            value={cvv}
                            placeholder={brand === 'Amex' ? '4 digits' : '3 digits'}
                            onChange={(e) => {
                                const onlyDigits = e.target.value.replace(/\D/g, '');
                                const max = brand === 'Amex' ? 4 : 3;
                                setCvv(onlyDigits.slice(0, max));
                                setCvvError('');
                            }}
                        />
                        {cvvError ? <div className="text-xs text-red-500">{cvvError}</div> : null}

                        <div className="flex justify-end gap-2 mt-4">
                            <Button onClick={() => setOpen(false)} variant="outline">Cancel</Button>
                            <Button variant="gradient" onClick={addCard} disabled={(() => {
                                const digits = number.replace(/\D/g, '');
                                const requiredCvv = brand === 'Amex' ? 4 : 3;
                                return !(digits.length >= 12 && exp.trim().length > 0 && cvv.replace(/\D/g, '').length === requiredCvv);
                            })()}>Add card</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
