"use client";

import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AddPaymentDialog({ onAdd }: { onAdd: (card: { brand: string; last4: string; exp: string }) => void }) {
    const [open, setOpen] = useState(false);
    const [number, setNumber] = useState('');
    const [name, setName] = useState('');
    const [exp, setExp] = useState('');
    const [cvc, setCvc] = useState('');

    function handleSave() {
        // naive parsing: last 4 digits
        const last4 = number.replace(/\D/g, '').slice(-4).padStart(4, '0');
        onAdd({ brand: 'Card', last4, exp });
        setOpen(false);
        setNumber(''); setName(''); setExp(''); setCvc('');
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="gradient">Add new payment method</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add payment method</DialogTitle>
                </DialogHeader>

                <div className="grid gap-3">
                    <Input placeholder="Card number" value={number} onChange={(e) => setNumber(e.target.value)} />
                    <Input placeholder="Name on card" value={name} onChange={(e) => setName(e.target.value)} />
                    <div className="grid grid-cols-2 gap-2">
                        <Input placeholder="MM/YY" value={exp} onChange={(e) => setExp(e.target.value)} />
                        <Input placeholder="CVC" value={cvc} onChange={(e) => setCvc(e.target.value)} />
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <Button onClick={() => setOpen(false)} variant="outline">Cancel</Button>
                        <Button variant="gradient" onClick={handleSave}>Add card</Button>
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    );
}
