"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

export default function PreferenceTab() {
    return (
        <div className="space-y-6">
            <section className="bg-white p-4 rounded-lg border">
                <h4 className="text-lg font-medium mb-4">Preferences & Settings</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium">Change Password</label>
                        <div className="flex gap-2 mt-2">
                            <Input className="flex-1" placeholder="Current password" type="password" />
                            <Input className="flex-1" placeholder="New password" type="password" />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium">Multi Brand Management</label>
                        <p className="text-sm text-gray-500 mt-2">Manage brands and access for your account.</p>
                        <div className="mt-2">
                            <Button variant="gradient" className="px-4 py-2">Manage Brands</Button>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium">Notifications</label>
                        <div className="mt-2 flex flex-col gap-2">
                            <label className="flex items-center gap-2"><Checkbox defaultChecked /> Alerts</label>
                            <label className="flex items-center gap-2"><Checkbox defaultChecked /> Ranking drops</label>
                            <label className="flex items-center gap-2"><Checkbox defaultChecked /> Sentiment spike</label>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium">Manage Subscription</label>
                        <p className="text-sm text-gray-500 mt-2">Change or view subscription details.</p>
                        <div className="mt-2">
                            <Button variant="gradient" className="px-4 py-2">Manage Subscription</Button>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium">Theme</label>
                        <div className="mt-2 flex gap-2">
                            <button className="px-3 py-2 border rounded-md">Light</button>
                            <button className="px-3 py-2 border rounded-md">Dark</button>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium">Add users</label>
                        <p className="text-sm text-gray-500 mt-2">Invite new team members and set roles.</p>
                        <div className="mt-2">
                            <Button variant="gradient" className="px-4 py-2">Invite user</Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
