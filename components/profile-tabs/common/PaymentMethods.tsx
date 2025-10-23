"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function PaymentMethods({ initial = [] }: { initial?: Array<{ brand: string; last4: string; exp: string }> }) {
    const [cards, setCards] = useState(initial);
    const [open, setOpen] = useState(false);
    const [brand, setBrand] = useState('Visa');
    const [number, setNumber] = useState('');
    const [exp, setExp] = useState('');

    function addCard() {
        const last4 = number.slice(-4);
        setCards((s) => [...s, { brand, last4, exp }]);
        setNumber('');
        setExp('');
        setOpen(false);
    }

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
                        <label className="text-sm">Brand</label>
                        <select value={brand} onChange={(e) => setBrand(e.target.value)} className="border rounded-md px-3 py-2">
                            <option>Visa</option>
                            <option>Mastercard</option>
                            <option>Amex</option>
                        </select>

                        <label className="text-sm">Card number</label>
                        <Input value={number} onChange={(e) => setNumber(e.target.value)} />

                        <label className="text-sm">Expiry</label>
                        <Input value={exp} onChange={(e) => setExp(e.target.value)} placeholder="MM/YY" />

                        <div className="flex justify-end gap-2 mt-4">
                            <Button onClick={() => setOpen(false)} variant="outline">Cancel</Button>
                            <Button variant="gradient" onClick={addCard}>Add card</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
