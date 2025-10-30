"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import PricingCard from "../pricing/PricingCard";
import Loader from "../Loader";

export default function PricingPage() {
    const t = useTranslations();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const id = setTimeout(() => setLoading(false), 600);
        return () => clearTimeout(id);
    }, []);

    const plans = [
        { key: "pricing.plans.basic", monthly: 19, yearly: 190 },
        { key: "pricing.plans.pro", monthly: 49, yearly: 490 },
        { key: "pricing.plans.enterprise", monthly: 99, yearly: 990 },
    ];

    if (loading) return <Loader size={120} />;

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-6">{t("pricing.title", { default: "Pricing" })}</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((p) => (
                    <PricingCard
                        key={p.key}
                        titleKey={p.key}
                        monthly={p.monthly}
                        yearly={p.yearly}
                        currencySymbol="$"
                    />
                ))}
            </div>
        </main>
    );
}
