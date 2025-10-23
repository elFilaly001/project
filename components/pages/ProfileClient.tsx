import React from 'react';
import TabBar from '../tab-bar';
import AccountTab from '../profile-tabs/AccountTab';
import PreferenceTab from '../profile-tabs/PreferenceTab';
import IntegrationTab from '../profile-tabs/IntegrationTab';
import BillingTab from '../profile-tabs/BillingTab';

export default function ProfileClient() {
    const tabs = [
        { id: 1, label: 'Account', content: <AccountTab /> },
        { id: 2, label: 'Preference & Settings', content: <PreferenceTab /> },
        { id: 3, label: 'Integration', content: <IntegrationTab /> },
        { id: 4, label: 'Subscription & Billing', content: <BillingTab /> },
    ];

    return (
        <div className="w-full">
            <TabBar tabs={tabs} initialActiveId={1} />
        </div>
    );
}
