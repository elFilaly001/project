"use client";

import React, { useEffect, useState } from "react";
import ReportsCard from "@/components/ReportsCard";
import InlineDateRangePicker from "@/components/tabmenu/filter/InlineDateRangePicker";
import { useTranslations } from "next-intl";
import Loader from "@/components/Loader";

export const dynamic = "force-dynamic";

export default function ReportsPage() {
  const t = useTranslations(); // Adjusted to ensure proper type inference

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(id);
  }, []);

  if (loading) return <Loader size={120} />;

  const reports = [
    {
      image: "/image-report.png",
      titleIcon: "overview",
      title: t("reports.overview.title"),
      description: t("reports.overview.description"),
      onCreateClick: () => alert(t("reports.overview.title")),
    },
    {
      image: "/image-report.png",
      titleIcon: "mentions",
      title: t("reports.mentions.title"),
      description: t("reports.mentions.description"),
      onCreateClick: () => alert(t("reports.mentions.title")),
    },
    {
      image: "/image-report.png",
      titleIcon: "sentiment",
      title: t("reports.sentiment.title"),
      description: t("reports.sentiment.description"),
      onCreateClick: () => alert(t("reports.sentiment.title")),
    },
    {
      image: "/image-report.png",
      titleIcon: "keyword",
      title: t("reports.keyword.title"),
      description: t("reports.keyword.description"),
      onCreateClick: () => alert(t("reports.keyword.title")),
    },
    {
      image: "/image-report.png",
      titleIcon: "competitive",
      title: t("reports.competitive.title"),
      description: t("reports.competitive.description"),
      onCreateClick: () => alert(t("reports.competitive.title")),
    },
  ];

  return (
    <main className="py-12 px-6 md:px-12 lg:px-20">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Reports</h1>
          <p className="text-sm text-gray-500">
            Generate and download detailed reports on your social media performance, audience insights, and more.
          </p>
        </div>
        <div className="flex-shrink-0 w-64">
          <InlineDateRangePicker />
        </div>
      </header>
      <section className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report, index) => (
            <ReportsCard
              key={index}
              image={report.image}
              titleIcon={report.titleIcon}
              title={report.title}
              description={report.description}
              onCreateClick={report.onCreateClick}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
