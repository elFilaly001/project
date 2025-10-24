"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PaymentMethods from './common/PaymentMethods';

export default function BillingTab() {
    const savedCards = [
        { brand: 'Visa', last4: '4242', exp: '12/25' },
    ];

    return (
        <div className="space-y-6">
            <section className="bg-white p-4 rounded-lg border">
                <h4 className="text-lg font-medium mb-4">Subscription & Billing</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium">Plan name</label>
                        <div className="mt-1 text-sm text-gray-700">Pro</div>
                    </div>

                    <div>
                        <label className="text-sm font-medium">Price</label>
                        <div className="mt-1 text-sm text-gray-700">$49 / month</div>
                    </div>

                    <div>
                        <label className="text-sm font-medium">Expiration date</label>
                        <div className="mt-1 text-sm text-gray-700">2026-12-31</div>
                    </div>

                    <div>
                        <label className="text-sm font-medium">Manage Subscription</label>
                        <div className="mt-2">
                            <Button variant="gradient" className="px-4 py-2">Upgrade</Button>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium">Cancel Subscription</label>
                        <div className="mt-2">
                            <Button variant="outline" className="px-4 py-2">Cancel</Button>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <label className="text-sm font-medium">Payment Methods</label>
                        <div className="mt-2 space-y-2">
                            <PaymentMethods initial={savedCards} />
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <label className="text-sm font-medium">Billing Information</label>
                        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm">Name</label>
                                <Input className="mt-1" defaultValue="John Doe" />
                            </div>

                            <div>
                                <label className="text-sm">Billing address</label>
                                <Input className="mt-1" defaultValue="123 Main St, Casablanca" />
                            </div>

                            <div>
                                <label className="text-sm">VAT number</label>
                                <Input className="mt-1" defaultValue="VAT-123456" />
                            </div>

                            <div>
                                <label className="text-sm">Country</label>
                                <Input className="mt-1" defaultValue="Morocco" />
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <label className="text-sm font-medium">Invoice History</label>
                        <div className="mt-2 space-y-2">
                            <div className="flex justify-between text-sm text-gray-700 border rounded-md p-2">
                                <div>Invoice #12345</div>
                                <div>$49 — 2025-10-01</div>
                            </div>
                            <div className="flex justify-between text-sm text-gray-700 border rounded-md p-2">
                                <div>Invoice #12222</div>
                                <div>$49 — 2025-09-01</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
