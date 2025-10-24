"use client";

import React from 'react';
import AvatarWithBadge from './common/AvatarWithBadge';
import BannerWithAvatar from './common/BannerWithAvatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

export default function AccountTab() {
    return (
        <div className="space-y-6">
            <section className="bg-white p-4 rounded-lg border">
                <h4 className="text-lg font-medium mb-4">My personal information</h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start ">
                    {/* <div className="flex flex-col items-center md:items-start md:col-span-1">
                        <BannerWithAvatar avatarSize={112} badge={<>✓</>} />
                        <p className="text-sm text-gray-500 mt-2">Profile Photo</p>
                    </div> */}

                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto w-full">
                        <div>
                            <label className="text-sm font-medium text-gray-700">Full name</label>
                            <Input className="mt-1" defaultValue="John Doe" />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700">Email address</label>
                            <Input className="mt-1" defaultValue="john.doe@example.com" />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700">Company name</label>
                            <Input className="mt-1" defaultValue="Acme Corp" />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700">Job title</label>
                            <Input className="mt-1" defaultValue="Product Manager" />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700">Website</label>
                            <Input className="mt-1" defaultValue="https://example.com" />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700">Country</label>
                            <Input className="mt-1" defaultValue="Morocco" />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700">Language</label>
                            <select className="mt-1 block w-full border rounded-md px-3 py-2" defaultValue="en">
                                <option value="en">English</option>
                                <option value="fr">Français</option>
                                <option value="ar">العربية</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex justify-end">
                    <Button variant="gradient">Save</Button>
                </div>
            </section>
        </div>
    );
}
