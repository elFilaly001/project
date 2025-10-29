// Simple static data list for API integrations.
// This file exports a small list of integrations so the page can be rendered
// without a backend. Consumers can replace this with a real API call later.

export type ApiIntegration = {
    id: string;
    name: string;
    domain?: string;
    description?: string;
    logo?: string; // url to logo image
    enabled?: boolean;
    category?: 'All' | 'Enterprise' | 'Custom' | 'Favourites';
};

export const sampleIntegrations: ApiIntegration[] = [
    {
        id: 'google-map',
        name: 'Google Map',
        domain: 'google.com',
        description: 'Data bundle of google reviews, location, ratings etc',
        // fetch logo from the internet (Clearbit). If that fails the component will fall back to a local SVG.
        logo: 'https://logo.clearbit.com/google.com',
        enabled: true,
        category: 'All',
    },
    {
        id: 'linear',
        name: 'Linear',
        domain: 'linearapp.com',
        description: 'Access to issue tracking and project management capabilities',
        logo: 'https://logo.clearbit.com/linear.app',
        enabled: true,
        category: 'Enterprise',
    },
    {
        id: 'amazon',
        name: 'Amazon US',
        domain: 'amazon.com',
        description: 'Data bundle of review, rating, location, ratings, price etc',
        // fetch logo from the internet (Clearbit). If that fails the component will fall back to a local SVG.
        logo: 'https://logo.clearbit.com/amazon.com',
        enabled: false,
        category: 'Custom',
    },
    {
        id: 'mailchimp',
        name: 'Mailchimp',
        domain: 'mailchimp.com',
        description: 'Data bundle of user details, email id datas etc',
        logo: 'https://logo.clearbit.com/mailchimp.com',
        enabled: true,
        category: 'Favourites',
    },
    {
        id: 'asana',
        name: 'Asana',
        domain: 'asana.com',
        description: 'Data bundle of Task name, ID, Task name etc',
        logo: 'https://logo.clearbit.com/asana.com',
        enabled: false,
        category: 'All',
    },
    {
        id: 'stripe',
        name: 'Stripe',
        domain: 'stripe.com',
        description: 'Data bundle of payments, customers, subscriptions, invoices, disputes, etc',
        logo: 'https://logo.clearbit.com/stripe.com',
        enabled: true,
        category: 'Enterprise',
    },
];

export default sampleIntegrations;
