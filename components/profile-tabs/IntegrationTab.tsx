"use client";

import React from 'react';
import { Button } from '@/components/ui/button';

export default function IntegrationTab() {
    return (
        <div className="space-y-6">
            <section className="bg-white p-4 rounded-lg border">
                <h4 className="text-lg font-medium mb-4">Integration</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium">Connect to Google</label>
                        <p className="text-sm text-gray-500 mt-2">Connect your Google account to sync calendars, notifications and more.</p>
                        <div className="mt-2">
                            <Button variant="gradient" className="px-4 py-2">Connect Google</Button>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium">API Integration</label>
                        <p className="text-sm text-gray-500 mt-2">Generate and manage API keys for programmatic access.</p>
                        <div className="mt-2">
                            <Button variant="gradient" className="px-4 py-2">View API Keys</Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
