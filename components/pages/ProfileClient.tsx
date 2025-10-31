"use client";

import React, { useEffect, useState } from 'react';
import TabBar from '../tab-bar';
import AccountTab from '../profile-tabs/AccountTab';
import PreferenceTab from '../profile-tabs/PreferenceTab';
import IntegrationTab from '../profile-tabs/IntegrationTab';
import BillingTab from '../profile-tabs/BillingTab';
import Loader from '../Loader';

export default function ProfileClient() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const id = setTimeout(() => setLoading(false), 600);
        return () => clearTimeout(id);
    }, []);

    if (loading) return <Loader size={120} />;

    const tabs = [
        { id: 1, label: 'Account', content: <AccountTab /> },
        { id: 2, label: 'Preference & Settings', content: <PreferenceTab /> },
        { id: 4, label: 'Subscription & Billing', content: <BillingTab /> },
    ];

    return (
        <div className="w-full">
            <TabBar tabs={tabs} initialActiveId={1} />
        </div>
    );
}
