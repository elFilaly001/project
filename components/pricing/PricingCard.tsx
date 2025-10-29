"use client";
import React from "react";
import { useTranslations } from "next-intl";

type Props = {
    titleKey: string;
    monthly: number;
    yearly: number;
    currencySymbol?: string;
};

export default function PricingCard({ titleKey, monthly, yearly, currencySymbol = "$" }: Props) {
    const t = useTranslations();

    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow">
            <div className="text-lg font-semibold text-gray-800 dark:text-slate-100">{t(titleKey)}</div>

            <div className="mt-4">
                <div
                    className="w-full overflow-x-auto snap-x snap-mandatory scroll-smooth"
                    style={{ WebkitOverflowScrolling: "touch" }}
                    aria-label={t("pricing.a11y.price_slider", { default: "Price slider" })}
                >
                    <div className="flex">
                        <div className="snap-center min-w-full flex items-center justify-center py-6">
                            <div className="text-4xl font-bold text-gray-900 dark:text-white">
                                {currencySymbol}{monthly}
                            </div>
                        </div>
                        <div className="snap-center min-w-full flex items-center justify-center py-6">
                            <div className="text-4xl font-bold text-gray-900 dark:text-white">
                                {currencySymbol}{yearly}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <div>{t("pricing.labels.monthly", { default: "Monthly" })}</div>
                    <div>{t("pricing.labels.yearly", { default: "Yearly" })}</div>
                </div>
            </div>
        </div>
    );
}
