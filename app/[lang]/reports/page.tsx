'use client';

import ReportsCard from '@/components/ReportsCard';
import { useTranslations } from 'next-intl';

export const dynamic = 'force-dynamic';

export default function ReportsPage() {
  const t = useTranslations(); // Adjusted to ensure proper type inference

  const reports = [
    {
      image: '/images/overview-report.png',
      titleIcon: 'overview',
      title: t('reports.overview.title'),
      description: t('reports.overview.description'),
      onCreateClick: () => alert(t('reports.overview.title')),
    },
    {
      image: '/images/mentions-report.png',
      titleIcon: 'mentions',
      title: t('reports.mentions.title'),
      description: t('reports.mentions.description'),
      onCreateClick: () => alert(t('reports.mentions.title')),
    },
    {
      image: '/images/sentiment-report.png',
      titleIcon: 'sentiment',
      title: t('reports.sentiment.title'),
      description: t('reports.sentiment.description'),
      onCreateClick: () => alert(t('reports.sentiment.title')),
    },
    {
      image: '/images/keyword-report.png',
      titleIcon: 'keyword',
      title: t('reports.keyword.title'),
      description: t('reports.keyword.description'),
      onCreateClick: () => alert(t('reports.keyword.title')),
    },
    {
      image: '/images/competitive-intelligence-report.png',
      titleIcon: 'competitive',
      title: t('reports.competitive.title'),
      description: t('reports.competitive.description'),
      onCreateClick: () => alert(t('reports.competitive.title')),
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Reports</h1>
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
    </div>
  );
}